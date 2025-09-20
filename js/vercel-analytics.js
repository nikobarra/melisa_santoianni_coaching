!(function () {
    "use strict";
    function t(t, e = {}) {
        "function" == typeof window.va
            ? (window.va("track", t, e),
              console.log(`📈 Event tracked: ${t}`, e))
            : (window.va("track", t, e),
              console.log(`📈 Event queued: ${t}`, e));
    }
    function e() {
        document.querySelectorAll(".cta-button").forEach((e) => {
            e.addEventListener("click", function (e) {
                let n = this.textContent.trim(),
                    o = this.closest("section"),
                    i = o ? o.id : "unknown";
                t("CTA_Click", {
                    button_text: n,
                    section: i,
                    timestamp: new Date().toISOString(),
                });
            });
        }),
            document
                .querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]')
                .forEach((e) => {
                    e.addEventListener("click", function () {
                        t("WhatsApp_Click", {
                            phone: "+542266440618",
                            source: "website",
                            timestamp: new Date().toISOString(),
                        });
                    });
                }),
            document.querySelectorAll('a[href^="mailto:"]').forEach((e) => {
                e.addEventListener("click", function () {
                    t("Email_Click", {
                        email: "melisantoianni@gmail.com",
                        source: "website",
                        timestamp: new Date().toISOString(),
                    });
                });
            }),
            document.querySelectorAll(".nav-link").forEach((e) => {
                e.addEventListener("click", function (e) {
                    let n = this.getAttribute("href");
                    if (n && n.startsWith("#")) {
                        let o = n.replace("#", "");
                        t("Navigation_Click", {
                            target_section: o,
                            source: "navbar",
                            timestamp: new Date().toISOString(),
                        });
                    }
                });
            });
        let e = window.showContactModal;
        "function" == typeof e &&
            (window.showContactModal = function () {
                return (
                    t("Contact_Modal_Open", {
                        source: "contact_button",
                        timestamp: new Date().toISOString(),
                    }),
                    e.apply(this, arguments)
                );
            }),
            console.log("\uD83C\uDFAF Coaching-specific tracking configured");
    }
    function n() {
        if ("PerformanceObserver" in window)
            try {
                new PerformanceObserver((e) => {
                    let n = e.getEntries(),
                        o = n[n.length - 1];
                    t("Core_Web_Vitals", {
                        metric: "LCP",
                        value: Math.round(o.startTime),
                        rating:
                            o.startTime < 2500
                                ? "good"
                                : o.startTime < 4e3
                                ? "needs-improvement"
                                : "poor",
                    });
                }).observe({ entryTypes: ["largest-contentful-paint"] }),
                    new PerformanceObserver((e) => {
                        let n = e.getEntries();
                        n.forEach((e) => {
                            t("Core_Web_Vitals", {
                                metric: "FID",
                                value: Math.round(
                                    e.processingStart - e.startTime
                                ),
                                rating:
                                    e.processingStart - e.startTime < 100
                                        ? "good"
                                        : e.processingStart - e.startTime < 300
                                        ? "needs-improvement"
                                        : "poor",
                            });
                        });
                    }).observe({ entryTypes: ["first-input"] }),
                    console.log("\uD83D\uDCCA Performance tracking configured");
            } catch (e) {
                console.warn("⚠️ Performance tracking setup failed:", e);
            }
        let n = document.getElementById("preloader");
        if (n) {
            let o = performance.now(),
                i = () => {
                    if (n.classList.contains("fade-out") || !n.parentNode) {
                        let e = performance.now(),
                            a = Math.round(e - o);
                        t("Preloader_Performance", {
                            duration_ms: a,
                            duration_seconds: Math.round(a / 1e3),
                        });
                    } else setTimeout(i, 100);
                };
            setTimeout(i, 100);
        }
    }
    (window.trackCoachingEvent = t),
        (function t() {
            let o =
                window.location.hostname.includes("vercel.app") ||
                window.location.hostname.includes(".com") ||
                ("localhost" !== window.location.hostname &&
                    "127.0.0.1" !== window.location.hostname);
            o
                ? ("loading" === document.readyState
                      ? document.addEventListener("DOMContentLoaded", () => {
                            setTimeout(() => {
                                e(), n();
                            }, 2e3);
                        })
                      : setTimeout(() => {
                            e(), n();
                        }, 2e3),
                  console.log(
                      "✅ Vercel Analytics custom tracking initialized"
                  ))
                : console.log(
                      "\uD83D\uDD27 Analytics disabled in development mode"
                  );
        })();
})();
