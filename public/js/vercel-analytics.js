/**
 * VERCEL ANALYTICS INTEGRATION - Vanilla JS Version
 * Sistema de analytics web para métricas de rendimiento y uso
 * Compatible con HTML directo sin build process
 */

(function () {
    "use strict";

    /**
     * Verificar si Vercel Analytics está disponible
     */
    function isAnalyticsReady() {
        return typeof window.va === "function";
    }

    /**
     * Función para tracking de eventos personalizados
     */
    function trackEvent(eventName, properties = {}) {
        // Usar la función va de Vercel (definida en el script oficial)
        if (isAnalyticsReady()) {
            window.va("track", eventName, properties);
            console.log(`📈 Event tracked: ${eventName}`, properties);
        } else {
            // Si no está listo, usar la cola vaq
            window.va("track", eventName, properties);
            console.log(`📈 Event queued: ${eventName}`, properties);
        }
    }

    /**
     * Configurar tracking específico para Coaching Floral
     */
    function setupCoachingTracking() {
        // Track clicks en botones CTA
        document.querySelectorAll(".cta-button").forEach((button) => {
            button.addEventListener("click", function (e) {
                const buttonText = this.textContent.trim();
                const section = this.closest("section");
                const sectionId = section ? section.id : "unknown";

                trackEvent("CTA_Click", {
                    button_text: buttonText,
                    section: sectionId,
                    timestamp: new Date().toISOString(),
                });
            });
        });

        // Track clicks en WhatsApp
        document
            .querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]')
            .forEach((link) => {
                link.addEventListener("click", function () {
                    trackEvent("WhatsApp_Click", {
                        phone: "+542266440618",
                        source: "website",
                        timestamp: new Date().toISOString(),
                    });
                });
            });

        // Track clicks en email
        document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
            link.addEventListener("click", function () {
                trackEvent("Email_Click", {
                    email: "melisantoianni@gmail.com",
                    source: "website",
                    timestamp: new Date().toISOString(),
                });
            });
        });

        // Track navegación
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", function (e) {
                const href = this.getAttribute("href");
                if (href && href.startsWith("#")) {
                    const targetSection = href.replace("#", "");
                    trackEvent("Navigation_Click", {
                        target_section: targetSection,
                        source: "navbar",
                        timestamp: new Date().toISOString(),
                    });
                }
            });
        });

        // Track modal de contacto
        const originalShowContactModal = window.showContactModal;
        if (typeof originalShowContactModal === "function") {
            window.showContactModal = function () {
                trackEvent("Contact_Modal_Open", {
                    source: "contact_button",
                    timestamp: new Date().toISOString(),
                });
                return originalShowContactModal.apply(this, arguments);
            };
        }

        console.log("🎯 Coaching-specific tracking configured");
    }

    /**
     * Configurar tracking de performance
     */
    function setupPerformanceTracking() {
        // Track Core Web Vitals manualmente si es necesario
        if ("PerformanceObserver" in window) {
            try {
                // Largest Contentful Paint
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    trackEvent("Core_Web_Vitals", {
                        metric: "LCP",
                        value: Math.round(lastEntry.startTime),
                        rating:
                            lastEntry.startTime < 2500
                                ? "good"
                                : lastEntry.startTime < 4000
                                ? "needs-improvement"
                                : "poor",
                    });
                }).observe({ entryTypes: ["largest-contentful-paint"] });

                // First Input Delay
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        trackEvent("Core_Web_Vitals", {
                            metric: "FID",
                            value: Math.round(
                                entry.processingStart - entry.startTime
                            ),
                            rating:
                                entry.processingStart - entry.startTime < 100
                                    ? "good"
                                    : entry.processingStart - entry.startTime <
                                      300
                                    ? "needs-improvement"
                                    : "poor",
                        });
                    });
                }).observe({ entryTypes: ["first-input"] });

                console.log("📊 Performance tracking configured");
            } catch (error) {
                console.warn("⚠️ Performance tracking setup failed:", error);
            }
        }

        // Track tiempo de carga del preloader
        const preloader = document.getElementById("preloader");
        if (preloader) {
            const startTime = performance.now();

            const checkPreloaderEnd = () => {
                if (
                    preloader.classList.contains("fade-out") ||
                    !preloader.parentNode
                ) {
                    const endTime = performance.now();
                    const duration = Math.round(endTime - startTime);

                    trackEvent("Preloader_Performance", {
                        duration_ms: duration,
                        duration_seconds: Math.round(duration / 1000),
                    });
                } else {
                    setTimeout(checkPreloaderEnd, 100);
                }
            };

            setTimeout(checkPreloaderEnd, 100);
        }
    }

    /**
     * Inicialización principal
     */
    function initializeAnalytics() {
        // Solo cargar en producción
        const isProduction =
            window.location.hostname.includes("vercel.app") ||
            window.location.hostname.includes(".com") ||
            (window.location.hostname !== "localhost" &&
                window.location.hostname !== "127.0.0.1");

        if (isProduction) {
            // El script oficial de Vercel ya está cargado en el HTML
            // Solo configuramos el tracking personalizado

            // Configurar tracking después de que se cargue el DOM
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", () => {
                    setTimeout(() => {
                        setupCoachingTracking();
                        setupPerformanceTracking();
                    }, 2000); // Esperar a que Vercel Analytics se inicialice
                });
            } else {
                setTimeout(() => {
                    setupCoachingTracking();
                    setupPerformanceTracking();
                }, 2000);
            }

            console.log("✅ Vercel Analytics custom tracking initialized");
        } else {
            console.log("🔧 Analytics disabled in development mode");
        }
    }

    // Exponer función de tracking globalmente
    window.trackCoachingEvent = trackEvent;

    // Inicializar cuando el script se carga
    initializeAnalytics();
})();
