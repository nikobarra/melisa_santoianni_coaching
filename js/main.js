/**
 * COACHING FLORAL - MAIN JAVASCRIPT
 * Melisa Santoianni - Professional Website
 * Enhanced user experience and interactivity
 */

// ===============================================
// INITIALIZATION & DOM CONTENT LOADED
// ===============================================

document.addEventListener("DOMContentLoaded", function () {
    // Initialize preloader first
    initializePreloader();

    // Initialize background system
    initializeBackground();

    // Initialize dynamic year in footer
    initializeDynamicYear();

    // Wait for content loader to initialize first
    setTimeout(() => {
        // Initialize all components
        initializeNavigation();
        initializeScrollEffects();
        initializeAnimations();
        initializeSmoothScrolling();
        initializeContactForm();
        initializePerformanceOptimizations();

        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== "undefined") {
            AOS.init({
                duration: 900,
                easing: "ease-in-out",
                once: true,
                offset: 120,
                disable: function () {
                    // Disable animations on mobile devices with reduced performance
                    return (
                        window.innerWidth < 768 &&
                        navigator.connection &&
                        navigator.connection.effectiveType === "slow-2g"
                    );
                },
            });
        }
    }, 100); // Small delay to ensure content is loaded first
});

// ===============================================
// DYNAMIC YEAR FUNCTIONALITY
// ===============================================

/**
 * Initialize preloader with elegant animations
 */
function initializePreloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    // Preload critical resources for smoother experience
    const criticalResources = [
        "img/logo.webp",
        "img/background.webp",
        "css/styles.css",
    ];

    let loadedResources = 0;
    const totalResources = criticalResources.length;

    // Function to update progress
    function updateProgress() {
        loadedResources++;
        const progress = (loadedResources / totalResources) * 100;

        // Update progress bar if needed
        const progressBar = preloader.querySelector(".progress-bar::before");

        // Check if all resources are loaded
        if (loadedResources >= totalResources) {
            // Wait for animations to complete, then hide preloader
            setTimeout(() => {
                hidePreloader();
            }, 3000); // 3 seconds total duration
        }
    }

    // Preload resources
    criticalResources.forEach((resource) => {
        if (resource.endsWith(".png") || resource.endsWith(".jpg")) {
            const img = new Image();
            img.onload = updateProgress;
            img.onerror = updateProgress; // Count errors as loaded to prevent hanging
            img.src = resource;
        } else {
            // For CSS and other resources, just simulate loading
            setTimeout(updateProgress, 500);
        }
    });

    // Hide preloader function
    function hidePreloader() {
        preloader.classList.add("fade-out");

        // Enable scrolling and show main content
        document.body.style.overflow = "visible";

        // Remove preloader from DOM after animation completes
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }

            // Trigger any post-load animations
            document.body.classList.add("preloader-finished");

            console.log("🌸 Preloader animation completed successfully");
        }, 800); // Match CSS transition duration
    }

    // Disable scrolling during preloader
    document.body.style.overflow = "hidden";

    // Fallback: Hide preloader after maximum time regardless of loading state
    setTimeout(() => {
        if (preloader && !preloader.classList.contains("fade-out")) {
            console.warn("⚠️ Preloader timeout reached, forcing hide");
            hidePreloader();
        }
    }, 6000); // 6 seconds maximum

    // Add keyboard accessibility
    preloader.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            hidePreloader();
        }
    });

    // Optional: Click to skip (for development/testing)
    const isDevelopment =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.includes("vercel.app");

    if (isDevelopment) {
        preloader.addEventListener("click", () => {
            console.log("🔧 Development mode: Preloader skipped by click");
            hidePreloader();
        });

        // Add visual indicator in development
        const skipText = document.createElement("div");
        skipText.textContent = "Click to skip (dev mode)";
        skipText.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.8rem;
            opacity: 0.6;
            color: var(--text-light);
        `;
        preloader.appendChild(skipText);
    }
}

/**
 * Initialize background system with optimization
 */
function initializeBackground() {
    // Delay background initialization until preloader is finishing
    const initDelay = document.getElementById("preloader") ? 2500 : 0;

    setTimeout(() => {
        // Preload background image for better performance
        const backgroundImg = new Image();
        backgroundImg.onload = function () {
            // Add class to trigger fade-in animation
            document.body.classList.add("background-loaded");
            console.log("🎨 Background image loaded successfully");
        };

        backgroundImg.onerror = function () {
            // Fallback: still show the gradient overlay
            document.body.classList.add("background-loaded");
            console.warn("⚠️ Background image failed to load, using fallback");
        };

        // Start loading the background image
        backgroundImg.src = "img/background.webp";

        // Add loading class immediately
        document.body.classList.add("background-loading");

        // Mobile: lighter background attachment for performance
        if (window.innerWidth <= 768) {
            const style = document.createElement("style");
            style.textContent = `
            body::before {
                background-size: cover;
                background-attachment: scroll;
            }
        `;
            document.head.appendChild(style);
        }
    }, initDelay); // Close the setTimeout
}

function initializeDynamicYear() {
    const currentYearElement = document.getElementById("current-year");
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;

        // Optional: Update year automatically if page stays open past New Year
        // This is useful for long-running single page applications
        const now = new Date();
        const nextYear = new Date(now.getFullYear() + 1, 0, 1); // January 1st of next year
        const timeUntilNextYear = nextYear - now;

        // If less than 24 hours until new year, set up auto-update
        if (timeUntilNextYear < 24 * 60 * 60 * 1000) {
            setTimeout(() => {
                const newYear = new Date().getFullYear();
                currentYearElement.textContent = newYear;
                console.log(
                    `🎉 ¡Feliz Año Nuevo ${newYear}! Footer actualizado automáticamente.`
                );
            }, timeUntilNextYear);
        }
    }
}

// ===============================================
// NAVIGATION FUNCTIONALITY
// ===============================================

function initializeNavigation() {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", debounce(handleNavbarScroll, 10));

    // Active section highlighting
    window.addEventListener("scroll", debounce(updateActiveSection, 50));

    function handleNavbarScroll() {
        const currentScrollY = window.scrollY;

        // Add scrolled class for styling
        if (currentScrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Hide/show navbar on scroll (optional enhancement)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = "translateY(-100%)";
        } else {
            navbar.style.transform = "translateY(0)";
        }

        lastScrollY = currentScrollY;
    }

    function updateActiveSection() {
        const sections = document.querySelectorAll("section[id]");
        const scrollPos = window.scrollY + 100;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            const correspondingLink = document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );

            if (
                scrollPos >= sectionTop &&
                scrollPos < sectionTop + sectionHeight
            ) {
                navLinks.forEach((link) => link.classList.remove("active"));
                if (correspondingLink) {
                    correspondingLink.classList.add("active");
                }
            }
        });
    }
}

// ===============================================
// SCROLL EFFECTS & ANIMATIONS
// ===============================================

function initializeScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector(".hero");
    const heroImage = document.querySelector(".hero-image img");

    if (hero && heroImage) {
        window.addEventListener(
            "scroll",
            debounce(function () {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;

                // Only apply parallax on desktop to avoid performance issues
                if (window.innerWidth > 768) {
                    heroImage.style.transform = `translateY(${rate}px)`;
                }
            }, 16)
        );
    }

    // Scroll progress indicator (optional enhancement)
    createScrollProgressIndicator();

    // Intersection Observer for fade-in animations
    initializeIntersectionObserver();
}

function createScrollProgressIndicator() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';

    const style = document.createElement("style");
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(201, 178, 159, 0.2);
            z-index: 9999;
        }
        .scroll-progress-bar {
            height: 100%;
            width: 100%;
            background: linear-gradient(90deg, var(--accent-color), var(--tertiary-color));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.1s ease;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(progressBar);

    const progressBarFill = progressBar.querySelector(".scroll-progress-bar");

    window.addEventListener(
        "scroll",
        debounce(function () {
            const scrollTop = window.pageYOffset;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            progressBarFill.style.transform = `scaleX(${scrollPercent})`;
        }, 10)
    );
}

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-in");

                // Special animations for specific elements
                if (entry.target.classList.contains("timeline-item")) {
                    setTimeout(() => {
                        entry.target.classList.add("timeline-animate");
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        ".benefit-item, .target-item, .testimonial-card, .timeline-item"
    );

    animateElements.forEach((el) => {
        observer.observe(el);
    });
}

// ===============================================
// SMOOTH SCROLLING & ENHANCED UX
// ===============================================

function initializeSmoothScrolling() {
    // Enhanced smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbarHeight =
                    document.getElementById("navbar").offsetHeight;
                const targetPosition =
                    targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });

                // Update URL without jumping
                history.pushState(null, null, `#${targetId}`);

                // Focus management for accessibility
                setTimeout(() => {
                    targetElement.setAttribute("tabindex", "-1");
                    targetElement.focus();
                    targetElement.removeAttribute("tabindex");
                }, 500);
            }
        });
    });

    // Back to top button
    createBackToTopButton();
}

function createBackToTopButton() {
    const backToTopButton = document.createElement("button");
    backToTopButton.className = "back-to-top";
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.setAttribute("aria-label", "Volver al inicio");

    const style = document.createElement("style");
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--accent-color), var(--tertiary-color));
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            box-shadow: 0 4px 15px var(--shadow);
            /* Asegurar que esté siempre dentro del viewport */
            max-width: calc(100vw - 4rem);
            max-height: calc(100vh - 4rem);
            box-sizing: border-box;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        .back-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px var(--shadow-hover);
        }
        .back-to-top:focus {
            outline: 2px solid var(--accent-color);
            outline-offset: 2px;
        }
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 1rem;
                right: 1rem;
                width: 45px;
                height: 45px;
            }
        }
        /* Específico para resoluciones ultra-anchas como 2992x1224 */
        @media (min-width: 1200px) and (max-width: 3100px) and (min-height: 1200px) and (max-height: 1400px) {
            .back-to-top {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                max-width: calc(100vw - 4rem);
                max-height: calc(100vh - 4rem);
                z-index: 1001;
                box-sizing: border-box;
            }
        }
        /* Para pantallas extremadamente anchas */
        @media (min-width: 2800px) {
            .back-to-top {
                right: calc(2rem + ((100vw - 2800px) / 2));
                bottom: 2rem;
                position: fixed;
                z-index: 1001;
            }
        }
        /* Fallback para cualquier resolución problemática */
        @media (min-aspect-ratio: 2/1) {
            .back-to-top {
                right: min(2rem, 5vw);
                bottom: min(2rem, 5vh);
                position: fixed;
                max-width: calc(100vw - min(4rem, 10vw));
                max-height: calc(100vh - min(4rem, 10vh));
                box-sizing: border-box;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button
    window.addEventListener(
        "scroll",
        debounce(function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add("visible");
            } else {
                backToTopButton.classList.remove("visible");
            }
        }, 100)
    );

    // Back to top functionality
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

// ===============================================
// CONTACT FORM & INTERACTIONS
// ===============================================

function initializeContactForm() {
    const contactButton = document.getElementById("contact-button");
    const socialLinks = document.querySelectorAll(".social-link");

    // Contact button click tracking (follows its WhatsApp link directly)
    if (contactButton) {
        contactButton.addEventListener("click", function () {
            // Analytics tracking (if implemented)
            if (typeof gtag !== "undefined") {
                gtag("event", "contact_button_click", {
                    event_category: "engagement",
                    event_label: "hero_cta",
                });
            }
        });
    }

    // Social links enhancement
    socialLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            // Add click animation
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "";
            }, 150);

            // Analytics tracking
            if (typeof gtag !== "undefined") {
                const platform = this.classList.contains("instagram")
                    ? "instagram"
                    : "youtube";
                gtag("event", "social_link_click", {
                    event_category: "social",
                    event_label: platform,
                });
            }
        });
    });
}

// ===============================================
// ANIMATIONS & MICRO-INTERACTIONS
// ===============================================

function initializeAnimations() {
    // Hover animations for cards
    const cards = document.querySelectorAll(".benefit-item, .target-item");

    cards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            if (window.innerWidth > 768) {
                // Only on desktop
                this.style.transform = "translateY(-8px) scale(1.02)";
            }
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "";
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll(".cta-button");

    buttons.forEach((button) => {
        button.addEventListener("click", createRippleEffect);
    });

    // Typing animation for hero tagline
    initializeTypingAnimation();

    // Floating animation for floral elements
    initializeFloatingAnimation();
}

function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    // Add ripple animation if not already present
    if (!document.querySelector("#ripple-animation")) {
        const style = document.createElement("style");
        style.id = "ripple-animation";
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initializeTypingAnimation() {
    const tagline = document.querySelector(".hero-tagline");
    if (!tagline) return;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let hasTyped = false;

    const runTypewriter = (text) => {
        if (hasTyped || !text) return;
        hasTyped = true;

        if (prefersReducedMotion) {
            tagline.textContent = text;
            return;
        }

        tagline.textContent = "";
        tagline.style.borderRight = "2px solid var(--accent-color)";

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    tagline.style.borderRight = "none";
                }, 1000);
            }
        };

        setTimeout(typeWriter, 1000);
    };

    // Preferred path: wait for content-loader.js to confirm the real
    // tagline text so the typewriter never races against content.json
    // overwriting .hero-tagline mid-animation (which used to be able to
    // truncate or duplicate the text on slow connections).
    document.addEventListener(
        "hero-content-ready",
        (event) => runTypewriter(event.detail && event.detail.tagline),
        { once: true }
    );

    // Fallback in case content-loader.js never fires the event (e.g. the
    // fetch to content.json failed) — type out whatever is already in the
    // static HTML.
    setTimeout(() => runTypewriter(tagline.textContent), 3000);
}

function initializeFloatingAnimation() {
    // Create floating floral elements
    const floralElements = [
        { icon: "fas fa-leaf", delay: 0 },
        { icon: "fas fa-seedling", delay: 2000 },
        { icon: "fas fa-spa", delay: 4000 },
    ];

    floralElements.forEach((element, index) => {
        setTimeout(() => {
            createFloatingElement(element.icon);
        }, element.delay);
    });
}

function createFloatingElement(iconClass) {
    const element = document.createElement("div");
    element.className = "floating-element";
    element.innerHTML = `<i class="${iconClass}"></i>`;

    const style = document.createElement("style");
    style.textContent = `
        .floating-element {
            position: fixed;
            color: var(--accent-color);
            font-size: 1.5rem;
            opacity: 0.3;
            pointer-events: none;
            z-index: -1;
            animation: float 20s infinite linear;
        }
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;

    if (!document.querySelector("#floating-animation")) {
        style.id = "floating-animation";
        document.head.appendChild(style);
    }

    element.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(element);

    setTimeout(() => {
        element.remove();
    }, 20000);
}

// ===============================================
// PERFORMANCE OPTIMIZATIONS
// ===============================================

function initializePerformanceOptimizations() {
    // Lazy loading for images
    if ("IntersectionObserver" in window) {
        const images = document.querySelectorAll("img[data-src]");
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove("lazy");
                    observer.unobserve(img);
                }
            });
        });

        images.forEach((img) => imageObserver.observe(img));
    }

    // Preload critical resources
    preloadCriticalResources();

    // Service Worker registration (for PWA features)
    registerServiceWorker();
}

function preloadCriticalResources() {
    const criticalResources = [
        "css/styles.css",
        "img/logo.webp",
        "img/melisa_santoianni.webp",
    ];

    criticalResources.forEach((resource) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = resource.endsWith(".css") ? "style" : "image";
        link.href = resource;
        document.head.appendChild(link);
    });
}

function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => {
                    console.log("SW registered: ", registration);
                })
                .catch((registrationError) => {
                    console.log("SW registration failed: ", registrationError);
                });
        });
    }
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===============================================
// ERROR HANDLING & ANALYTICS
// ===============================================

// Global error handler
window.addEventListener("error", function (e) {
    console.error("JavaScript error:", e.error);

    // Send error to analytics if available
    if (typeof gtag !== "undefined") {
        gtag("event", "exception", {
            description: e.error.message,
            fatal: false,
        });
    }
});

// Performance monitoring
window.addEventListener("load", function () {
    // Measure page load performance
    if ("performance" in window) {
        const loadTime =
            performance.timing.loadEventEnd -
            performance.timing.navigationStart;

        if (typeof gtag !== "undefined") {
            gtag("event", "timing_complete", {
                name: "load",
                value: loadTime,
            });
        }

        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// ===============================================
// ACCESSIBILITY ENHANCEMENTS
// ===============================================

// Skip to main content link
document.addEventListener("DOMContentLoaded", function () {
    const skipLink = document.createElement("a");
    skipLink.href = "#hero";
    skipLink.textContent = "Saltar al contenido principal";
    skipLink.className = "skip-link";

    const skipStyle = document.createElement("style");
    skipStyle.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--text-dark);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10001;
        }
        .skip-link:focus {
            top: 6px;
        }
    `;

    document.head.appendChild(skipStyle);
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Announce page changes for screen readers
function announcePageChange(message) {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Screen reader only class
const srOnlyStyle = document.createElement("style");
srOnlyStyle.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(srOnlyStyle);
