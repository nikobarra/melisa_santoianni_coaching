function initializePreloader() {
    let e = document.getElementById("preloader");
    if (!e) return;
    let t = ["img/logo.png", "img/background.png", "css/styles.css"],
        n = 0,
        i = t.length;
    function a() {
        n++,
            e.querySelector(".progress-bar::before"),
            n >= i &&
                setTimeout(() => {
                    o();
                }, 3e3);
    }
    function o() {
        e.classList.add("fade-out"),
            (document.body.style.overflow = "visible"),
            setTimeout(() => {
                e.parentNode && e.parentNode.removeChild(e),
                    document.body.classList.add("preloader-finished"),
                    console.log(
                        "\uD83C\uDF38 Preloader animation completed successfully"
                    );
            }, 800);
    }
    t.forEach((e) => {
        if (e.endsWith(".png") || e.endsWith(".jpg")) {
            let t = new Image();
            (t.onload = a), (t.onerror = a), (t.src = e);
        } else setTimeout(a, 500);
    }),
        (document.body.style.overflow = "hidden"),
        setTimeout(() => {
            e &&
                !e.classList.contains("fade-out") &&
                (console.warn("⚠️ Preloader timeout reached, forcing hide"),
                o());
        }, 6e3),
        e.addEventListener("keydown", (e) => {
            ("Enter" === e.key || " " === e.key) && o();
        });
    let r =
        "localhost" === window.location.hostname ||
        "127.0.0.1" === window.location.hostname ||
        window.location.hostname.includes("vercel.app");
    if (r) {
        e.addEventListener("click", () => {
            console.log(
                "\uD83D\uDD27 Development mode: Preloader skipped by click"
            ),
                o();
        });
        let l = document.createElement("div");
        (l.textContent = "Click to skip (dev mode)"),
            (l.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.8rem;
            opacity: 0.6;
            color: var(--text-light);
        `),
            e.appendChild(l);
    }
}
function initializeBackground() {
    let e = document.getElementById("preloader") ? 2500 : 0;
    setTimeout(() => {
        let e = new Image();
        if (
            ((e.onload = function () {
                document.body.classList.add("background-loaded"),
                    console.log(
                        "\uD83C\uDFA8 Background image loaded successfully"
                    );
            }),
            (e.onerror = function () {
                document.body.classList.add("background-loaded"),
                    console.warn(
                        "⚠️ Background image failed to load, using fallback"
                    );
            }),
            (e.src = "img/background.png"),
            document.body.classList.add("background-loading"),
            window.innerWidth <= 768)
        ) {
            let t = document.createElement("style");
            (t.textContent = `
            body::before {
                background-size: cover;
                background-attachment: scroll;
                will-change: auto;
            }
        `),
                document.head.appendChild(t);
        }
        if (window.innerWidth > 768) {
            let n = !1;
            function i() {
                let e = window.pageYOffset;
                document.documentElement.style.setProperty(
                    "--bg-y-pos",
                    `${-(0.3 * e)}px`
                ),
                    (n = !1);
            }
            let a = document.createElement("style");
            (a.textContent = `
            :root {
                --bg-y-pos: 0px;
            }
            body::before {
                background-position: center calc(50% + var(--bg-y-pos));
            }
        `),
                document.head.appendChild(a),
                window.addEventListener(
                    "scroll",
                    function e() {
                        n || (requestAnimationFrame(i), (n = !0));
                    },
                    { passive: !0 }
                );
        }
    }, e);
}
function initializeDynamicYear() {
    let e = document.getElementById("current-year");
    if (e) {
        let t = new Date().getFullYear();
        e.textContent = t;
        let n = new Date(),
            i = new Date(n.getFullYear() + 1, 0, 1),
            a = i - n;
        a < 864e5 &&
            setTimeout(() => {
                let t = new Date().getFullYear();
                (e.textContent = t),
                    console.log(
                        `🎉 \xa1Feliz A\xf1o Nuevo ${t}! Footer actualizado autom\xe1ticamente.`
                    );
            }, a);
    }
}
function initializeNavigation() {
    let e = document.getElementById("navbar"),
        t = document.getElementById("nav-toggle"),
        n = document.getElementById("nav-menu"),
        i = document.querySelectorAll(".nav-link");
    function a() {
        let e = window.innerWidth,
            t = window.innerHeight;
        (e >= 2900 && e <= 3100 && t >= 1200 && t <= 1300) ||
        (e >= 1200 && e <= 1300 && t >= 2900 && t <= 3100) ||
        (e > 1200 && e < 3e3 && t > 1200 && t < 1400)
            ? (document.body.classList.add("force-mobile-menu"),
              console.log(`🔧 Forced mobile menu for resolution: ${e}x${t}`))
            : document.body.classList.remove("force-mobile-menu");
    }
    a(),
        window.addEventListener("resize", a),
        t &&
            n &&
            (t.addEventListener("click", r),
            t.addEventListener("keydown", function (e) {
                ("Enter" === e.key || " " === e.key) &&
                    (e.preventDefault(), r());
            })),
        i.forEach((e) => {
            e.addEventListener("click", l);
        }),
        document.addEventListener("click", function (t) {
            !e.contains(t.target) && n.classList.contains("active") && l();
        });
    let o = window.scrollY;
    function r() {
        n.classList.toggle("active"),
            t.classList.toggle("active"),
            t.setAttribute(
                "aria-expanded",
                t.classList.contains("active") ? "true" : "false"
            ),
            (document.body.style.overflow = n.classList.contains("active")
                ? "hidden"
                : "");
    }
    function l() {
        n.classList.remove("active"),
            t.classList.remove("active"),
            t.setAttribute("aria-expanded", "false"),
            (document.body.style.overflow = "");
    }
    window.addEventListener(
        "scroll",
        debounce(function t() {
            let n = window.scrollY;
            n > 50
                ? e.classList.add("scrolled")
                : e.classList.remove("scrolled"),
                n > o && n > 100
                    ? (e.style.transform = "translateY(-100%)")
                    : (e.style.transform = "translateY(0)"),
                (o = n);
        }, 10)
    ),
        window.addEventListener(
            "scroll",
            debounce(function e() {
                let t = document.querySelectorAll("section[id]"),
                    n = window.scrollY + 100;
                t.forEach((e) => {
                    let t = e.offsetTop,
                        a = e.offsetHeight,
                        o = e.getAttribute("id"),
                        r = document.querySelector(`.nav-link[href="#${o}"]`);
                    n >= t &&
                        n < t + a &&
                        (i.forEach((e) => e.classList.remove("active")),
                        r && r.classList.add("active"));
                });
            }, 50)
        );
}
function initializeScrollEffects() {
    let e = document.querySelector(".hero"),
        t = document.querySelector(".hero-image img");
    e &&
        t &&
        window.addEventListener(
            "scroll",
            debounce(function () {
                let e = window.pageYOffset;
                window.innerWidth > 768 &&
                    (t.style.transform = `translateY(${-0.3 * e}px)`);
            }, 16)
        ),
        createScrollProgressIndicator(),
        initializeIntersectionObserver();
}
function createScrollProgressIndicator() {
    let e = document.createElement("div");
    (e.className = "scroll-progress"),
        (e.innerHTML = '<div class="scroll-progress-bar"></div>');
    let t = document.createElement("style");
    (t.textContent = `
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
            background: linear-gradient(90deg, var(--accent-color), var(--tertiary-color));
            width: 0%;
            transition: width 0.1s ease;
        }
    `),
        document.head.appendChild(t),
        document.body.appendChild(e);
    let n = e.querySelector(".scroll-progress-bar");
    window.addEventListener(
        "scroll",
        debounce(function () {
            let e = window.pageYOffset,
                t = document.documentElement.scrollHeight - window.innerHeight;
            n.style.width = (e / t) * 100 + "%";
        }, 10)
    );
}
function initializeIntersectionObserver() {
    let e = new IntersectionObserver(
            function (e) {
                e.forEach((e) => {
                    e.isIntersecting &&
                        (e.target.classList.add("animate-in"),
                        e.target.classList.contains("timeline-item") &&
                            setTimeout(() => {
                                e.target.classList.add("timeline-animate");
                            }, 200));
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        ),
        t = document.querySelectorAll(
            ".benefit-item, .target-item, .testimonial-card, .timeline-item, .fusion-card"
        );
    t.forEach((t) => {
        e.observe(t);
    });
}
function initializeSmoothScrolling() {
    let e = document.querySelectorAll('a[href^="#"]');
    e.forEach((e) => {
        e.addEventListener("click", function (e) {
            e.preventDefault();
            let t = this.getAttribute("href").substring(1),
                n = document.getElementById(t);
            if (n) {
                let i = document.getElementById("navbar").offsetHeight,
                    a = n.offsetTop - i - 20;
                window.scrollTo({ top: a, behavior: "smooth" }),
                    history.pushState(null, null, `#${t}`),
                    setTimeout(() => {
                        n.setAttribute("tabindex", "-1"),
                            n.focus(),
                            n.removeAttribute("tabindex");
                    }, 500);
            }
        });
    }),
        createBackToTopButton();
}
function createBackToTopButton() {
    let e = document.createElement("button");
    (e.className = "back-to-top"),
        (e.innerHTML = '<i class="fas fa-chevron-up"></i>'),
        e.setAttribute("aria-label", "Volver al inicio");
    let t = document.createElement("style");
    (t.textContent = `
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
            /* Asegurar que est\xe9 siempre dentro del viewport */
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
        /* Espec\xedfico para resoluciones ultra-anchas como 2992x1224 */
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
        /* Fallback para cualquier resoluci\xf3n problem\xe1tica */
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
    `),
        document.head.appendChild(t),
        document.body.appendChild(e),
        window.addEventListener(
            "scroll",
            debounce(function () {
                window.pageYOffset > 300
                    ? e.classList.add("visible")
                    : e.classList.remove("visible");
            }, 100)
        ),
        e.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}
function initializeContactForm() {
    let e = document.getElementById("contact-button"),
        t = document.querySelectorAll(".social-link");
    e &&
        e.addEventListener("click", function (e) {
            e.preventDefault(),
                (this.style.transform = "scale(0.95)"),
                setTimeout(() => {
                    this.style.transform = "";
                }, 150),
                showContactModal(),
                "undefined" != typeof gtag &&
                    gtag("event", "contact_button_click", {
                        event_category: "engagement",
                        event_label: "hero_cta",
                    });
        }),
        t.forEach((e) => {
            e.addEventListener("click", function (e) {
                if (
                    ((this.style.transform = "scale(0.95)"),
                    setTimeout(() => {
                        this.style.transform = "";
                    }, 150),
                    "undefined" != typeof gtag)
                ) {
                    let t = this.classList.contains("instagram")
                        ? "instagram"
                        : "youtube";
                    gtag("event", "social_link_click", {
                        event_category: "social",
                        event_label: t,
                    });
                }
            });
        });
}
function showContactModal() {
    let e = { email: "melisantoianni@gmail.com", whatsapp: "+542266440618" };
    if (window.contentLoader && window.contentLoader.contentData) {
        let t = window.contentLoader.contentData.sections.find(
            (e) => "contacto" === e.id
        );
        t && t.content.contact_info && (e = t.content.contact_info);
    }
    let n = document.createElement("div");
    (n.className = "contact-modal"),
        (n.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-calendar-alt"></i> Reserva tu Sesi\xf3n</h3>
                <button class="modal-close" aria-label="Cerrar modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>\xa1Est\xe1s a un paso de comenzar tu transformaci\xf3n!</p>
                <p>Para reservar tu sesi\xf3n de descubrimiento gratuita, puedes contactarme a trav\xe9s de:</p>
                <div class="contact-options">
                    <a href="mailto:${e.email}" class="contact-option">
                        <i class="fas fa-envelope"></i>
                        <span>${e.email}</span>
                    </a>
                    <a href="https://wa.me/${e.whatsapp.replace(
                        /\s+/g,
                        ""
                    )}?text=Hola%20Melisa,%20me%20interesa%20reservar%20una%20sesi\xf3n%20de%20descubrimiento%20gratuita" class="contact-option" target="_blank">
                        <i class="fab fa-whatsapp"></i>
                        <span>WhatsApp: ${e.phone || e.whatsapp}</span>
                    </a>
                </div>
                <div class="modal-footer">
                    <p><small>Te responder\xe9 lo antes posible para coordinar tu sesi\xf3n personalizada</small></p>
                </div>
            </div>
        </div>
    `);
    let i = document.createElement("style");
    (i.textContent = `
        .contact-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        }
        .modal-content {
            background: white;
            border-radius: var(--border-radius);
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            transform: translateY(20px);
            animation: slideUp 0.3s ease forwards;
        }
        .modal-header {
            padding: 2rem 2rem 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--secondary-color);
        }
        .modal-header h3 {
            color: var(--text-dark);
            margin: 0;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-light);
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: var(--transition);
        }
        .modal-close:hover {
            background: var(--secondary-color);
            color: var(--text-dark);
        }
        .modal-body {
            padding: 2rem;
        }
        .modal-body p {
            margin-bottom: 1.5rem;
            color: var(--text-dark);
        }
        .contact-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .contact-option {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 1rem;
            background: var(--primary-color);
            border-radius: var(--border-radius);
            color: var(--text-dark);
            transition: var(--transition);
            text-decoration: none;
        }
        .contact-option:hover {
            background: var(--secondary-color);
            transform: translateY(-2px);
        }
        .contact-option i {
            font-size: 1.2rem;
            color: var(--accent-color);
            width: 20px;
        }
        .modal-footer {
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid var(--secondary-color);
            text-align: center;
        }
        .modal-footer p {
            margin: 0;
            color: var(--text-light);
        }
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        @keyframes slideUp {
            to { transform: translateY(0); }
        }
    `),
        document.head.appendChild(i),
        document.body.appendChild(n);
    let a = () => {
        (n.style.opacity = "0"),
            setTimeout(() => {
                document.body.removeChild(n), document.head.removeChild(i);
            }, 300);
    };
    n.querySelector(".modal-close").addEventListener("click", a),
        n.addEventListener("click", function (e) {
            e.target === n && a();
        }),
        document.addEventListener("keydown", function e(t) {
            "Escape" === t.key &&
                (a(), document.removeEventListener("keydown", e));
        });
}
function initializeAnimations() {
    let e = document.querySelectorAll(
        ".benefit-item, .target-item, .testimonial-card, .info-card, .remedy-card"
    );
    e.forEach((e) => {
        e.addEventListener("mouseenter", function () {
            window.innerWidth > 768 &&
                (this.style.transform = "translateY(-8px) scale(1.02)");
        }),
            e.addEventListener("mouseleave", function () {
                this.style.transform = "";
            });
    });
    let t = document.querySelectorAll(".cta-button");
    t.forEach((e) => {
        e.addEventListener("click", createRippleEffect);
    }),
        initializeTypingAnimation(),
        initializeFloatingAnimation();
}
function createRippleEffect(e) {
    let t = e.currentTarget,
        n = document.createElement("span"),
        i = t.getBoundingClientRect(),
        a = Math.max(i.width, i.height),
        o = e.clientX - i.left - a / 2,
        r = e.clientY - i.top - a / 2;
    if (
        ((n.style.cssText = `
        position: absolute;
        width: ${a}px;
        height: ${a}px;
        left: ${o}px;
        top: ${r}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `),
        !document.querySelector("#ripple-animation"))
    ) {
        let l = document.createElement("style");
        (l.id = "ripple-animation"),
            (l.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `),
            document.head.appendChild(l);
    }
    (t.style.position = "relative"),
        (t.style.overflow = "hidden"),
        t.appendChild(n),
        setTimeout(() => {
            n.remove();
        }, 600);
}
function initializeTypingAnimation() {
    let e = document.querySelector(".hero-tagline");
    if (!e) return;
    let t = e.textContent;
    (e.textContent = ""),
        (e.style.borderRight = "2px solid var(--accent-color)");
    let n = 0,
        i = () => {
            n < t.length
                ? ((e.textContent += t.charAt(n)), n++, setTimeout(i, 100))
                : setTimeout(() => {
                      e.style.borderRight = "none";
                  }, 1e3);
        };
    setTimeout(i, 1e3);
}
function initializeFloatingAnimation() {
    [
        { icon: "fas fa-leaf", delay: 0 },
        { icon: "fas fa-seedling", delay: 2e3 },
        { icon: "fas fa-spa", delay: 4e3 },
    ].forEach((e, t) => {
        setTimeout(() => {
            createFloatingElement(e.icon);
        }, e.delay);
    });
}
function createFloatingElement(e) {
    let t = document.createElement("div");
    (t.className = "floating-element"), (t.innerHTML = `<i class="${e}"></i>`);
    let n = document.createElement("style");
    (n.textContent = `
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
    `),
        document.querySelector("#floating-animation") ||
            ((n.id = "floating-animation"), document.head.appendChild(n)),
        (t.style.left = 100 * Math.random() + "vw"),
        document.body.appendChild(t),
        setTimeout(() => {
            t.remove();
        }, 2e4);
}
function initializePerformanceOptimizations() {
    if ("IntersectionObserver" in window) {
        let e = document.querySelectorAll("img[data-src]"),
            t = new IntersectionObserver((e, t) => {
                e.forEach((e) => {
                    if (e.isIntersecting) {
                        let n = e.target;
                        (n.src = n.dataset.src),
                            n.classList.remove("lazy"),
                            t.unobserve(n);
                    }
                });
            });
        e.forEach((e) => t.observe(e));
    }
    preloadCriticalResources(), registerServiceWorker();
}
function preloadCriticalResources() {
    ["css/styles.css", "img/logo.png", "img/producto.png"].forEach((e) => {
        let t = document.createElement("link");
        (t.rel = "preload"),
            (t.as = e.endsWith(".css") ? "style" : "image"),
            (t.href = e),
            document.head.appendChild(t);
    });
}
function registerServiceWorker() {
    "serviceWorker" in navigator &&
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/sw.js")
                .then((e) => {
                    console.log("SW registered: ", e);
                })
                .catch((e) => {
                    console.log("SW registration failed: ", e);
                });
        });
}
function debounce(e, t, n) {
    let i;
    return function a() {
        let o = this,
            r = arguments,
            l = function () {
                (i = null), n || e.apply(o, r);
            },
            s = n && !i;
        clearTimeout(i), (i = setTimeout(l, t)), s && e.apply(o, r);
    };
}
function throttle(e, t) {
    let n;
    return function () {
        let i = arguments;
        n || (e.apply(this, i), (n = !0), setTimeout(() => (n = !1), t));
    };
}
function isInViewport(e) {
    let t = e.getBoundingClientRect();
    return (
        t.top >= 0 &&
        t.left >= 0 &&
        t.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        t.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
function announcePageChange(e) {
    let t = document.createElement("div");
    t.setAttribute("aria-live", "polite"),
        t.setAttribute("aria-atomic", "true"),
        (t.className = "sr-only"),
        (t.textContent = e),
        document.body.appendChild(t),
        setTimeout(() => {
            document.body.removeChild(t);
        }, 1e3);
}
document.addEventListener("DOMContentLoaded", function () {
    initializePreloader(),
        initializeBackground(),
        initializeDynamicYear(),
        setTimeout(() => {
            initializeNavigation(),
                initializeScrollEffects(),
                initializeAnimations(),
                initializeSmoothScrolling(),
                initializeContactForm(),
                initializePerformanceOptimizations(),
                "undefined" != typeof AOS &&
                    AOS.init({
                        duration: 800,
                        easing: "ease-in-out",
                        once: !0,
                        offset: 100,
                        disable: function () {
                            return (
                                window.innerWidth < 768 &&
                                navigator.connection &&
                                "slow-2g" === navigator.connection.effectiveType
                            );
                        },
                    });
        }, 100);
}),
    window.addEventListener("error", function (e) {
        console.error("JavaScript error:", e.error),
            "undefined" != typeof gtag &&
                gtag("event", "exception", {
                    description: e.error.message,
                    fatal: !1,
                });
    }),
    window.addEventListener("load", function () {
        if ("performance" in window) {
            let e =
                performance.timing.loadEventEnd -
                performance.timing.navigationStart;
            "undefined" != typeof gtag &&
                gtag("event", "timing_complete", { name: "load", value: e }),
                console.log(`Page loaded in ${e}ms`);
        }
    }),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.createElement("a");
        (e.href = "#hero"),
            (e.textContent = "Saltar al contenido principal"),
            (e.className = "skip-link");
        let t = document.createElement("style");
        (t.textContent = `
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
    `),
            document.head.appendChild(t),
            document.body.insertBefore(e, document.body.firstChild);
    }),
    document.addEventListener("keydown", function (e) {
        if ("Escape" === e.key) {
            let t = document.querySelector(".contact-modal"),
                n = document.querySelector(".nav-menu.active");
            t && t.querySelector(".modal-close").click(),
                n && document.getElementById("nav-toggle").click();
        }
    });
const srOnlyStyle = document.createElement("style");
(srOnlyStyle.textContent = `
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
`),
    document.head.appendChild(srOnlyStyle);
