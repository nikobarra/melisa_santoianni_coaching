/**
 * VERCEL ANALYTICS INTEGRATION
 * Sistema de analytics web para métricas de rendimiento y uso
 * Documentación: https://vercel.com/docs/concepts/analytics
 */

// Importar y configurar Vercel Analytics
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

/**
 * Inicializar Vercel Analytics
 */
function initializeVercelAnalytics() {
    try {
        // Inyectar analytics básico
        inject({
            mode: "production", // Solo en producción
            debug: false, // Cambiar a true para debugging
        });

        // Inyectar Speed Insights para Core Web Vitals
        injectSpeedInsights({
            framework: "vanilla",
            route: "/",
        });

        console.log("✅ Vercel Analytics initialized successfully");
    } catch (error) {
        console.warn("⚠️ Vercel Analytics initialization failed:", error);
    }
}

/**
 * Tracking de eventos personalizados
 */
function trackCustomEvent(eventName, properties = {}) {
    if (typeof window !== "undefined" && window.va) {
        window.va("track", eventName, properties);
        console.log(`📊 Event tracked: ${eventName}`, properties);
    }
}

/**
 * Tracking específico para Coaching Floral
 */
function trackCoachingEvents() {
    // Track clicks en botones CTA
    document.querySelectorAll(".cta-button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const buttonText = e.target.textContent.trim();
            trackCustomEvent("CTA Click", {
                button_text: buttonText,
                section: e.target.closest("section")?.id || "unknown",
            });
        });
    });

    // Track apertura del modal de contacto
    const contactButtons = document.querySelectorAll(
        '[onclick*="showContactModal"]'
    );
    contactButtons.forEach((button) => {
        button.addEventListener("click", () => {
            trackCustomEvent("Contact Modal Opened", {
                source: "contact_button",
            });
        });
    });

    // Track clicks en enlaces de WhatsApp
    document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
        link.addEventListener("click", () => {
            trackCustomEvent("WhatsApp Click", {
                phone: "+542266440618",
                source: "website",
            });
        });
    });

    // Track clicks en enlaces de email
    document.querySelectorAll('a[href*="mailto:"]').forEach((link) => {
        link.addEventListener("click", () => {
            trackCustomEvent("Email Click", {
                email: "melisantoianni@gmail.com",
                source: "website",
            });
        });
    });

    // Track navegación entre secciones
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetSection = e.target
                .getAttribute("href")
                ?.replace("#", "");
            if (targetSection) {
                trackCustomEvent("Section Navigation", {
                    target_section: targetSection,
                    source: "navigation",
                });
            }
        });
    });

    // Track tiempo de permanencia en secciones (Intersection Observer)
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const timestamp = Date.now();

                    // Guardar timestamp de entrada
                    entry.target.dataset.entryTime = timestamp;

                    trackCustomEvent("Section View", {
                        section: sectionId,
                        visibility_ratio: entry.intersectionRatio,
                    });
                } else {
                    // Calcular tiempo de permanencia al salir
                    const entryTime = entry.target.dataset.entryTime;
                    if (entryTime) {
                        const timeSpent = Date.now() - parseInt(entryTime);
                        trackCustomEvent("Section Time Spent", {
                            section: entry.target.id,
                            time_spent_ms: timeSpent,
                            time_spent_seconds: Math.round(timeSpent / 1000),
                        });
                    }
                }
            });
        },
        {
            threshold: 0.5, // 50% de la sección visible
        }
    );

    // Observar todas las secciones principales
    document.querySelectorAll("section[id]").forEach((section) => {
        sectionObserver.observe(section);
    });
}

/**
 * Tracking de performance personalizado
 */
function trackPerformanceMetrics() {
    // Track tiempo de carga del preloader
    const preloader = document.getElementById("preloader");
    if (preloader) {
        const preloaderStartTime = performance.now();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "class" &&
                    preloader.classList.contains("fade-out")
                ) {
                    const preloaderEndTime = performance.now();
                    const preloaderDuration =
                        preloaderEndTime - preloaderStartTime;

                    trackCustomEvent("Preloader Performance", {
                        duration_ms: Math.round(preloaderDuration),
                        duration_seconds: Math.round(preloaderDuration / 1000),
                    });

                    observer.disconnect();
                }
            });
        });

        observer.observe(preloader, { attributes: true });
    }

    // Track tiempo hasta interactividad
    document.addEventListener("DOMContentLoaded", () => {
        const domLoadTime = performance.now();
        trackCustomEvent("DOM Load Time", {
            load_time_ms: Math.round(domLoadTime),
        });
    });

    // Track errores JavaScript
    window.addEventListener("error", (e) => {
        trackCustomEvent("JavaScript Error", {
            message: e.message,
            filename: e.filename,
            line: e.lineno,
            column: e.colno,
        });
    });
}

/**
 * Inicialización principal
 */
document.addEventListener("DOMContentLoaded", () => {
    // Solo inicializar en producción (Vercel)
    if (
        window.location.hostname.includes("vercel.app") ||
        window.location.hostname !== "localhost"
    ) {
        initializeVercelAnalytics();

        // Esperar a que el contenido se cargue completamente
        setTimeout(() => {
            trackCoachingEvents();
            trackPerformanceMetrics();
        }, 1000);
    } else {
        console.log("🔧 Analytics disabled in development mode");
    }
});

// Exportar funciones para uso global
window.trackCustomEvent = trackCustomEvent;
