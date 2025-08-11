/**
 * VERCEL ANALYTICS INTEGRATION - Vanilla JS Version
 * Sistema de analytics web para métricas de rendimiento y uso
 * Compatible con HTML directo sin build process
 */

(function() {
    'use strict';

    /**
     * Cargar Vercel Analytics de forma dinámica
     */
    function loadVercelAnalytics() {
        // Script para Analytics básico
        const analyticsScript = document.createElement('script');
        analyticsScript.src = 'https://va.vercel-scripts.com/v1/script.js';
        analyticsScript.defer = true;
        analyticsScript.setAttribute('data-website-id', 'auto');
        
        // Script para Speed Insights
        const speedScript = document.createElement('script');
        speedScript.src = 'https://va.vercel-scripts.com/v1/speed-insights/script.js';
        speedScript.defer = true;
        
        // Agregar al head
        document.head.appendChild(analyticsScript);
        document.head.appendChild(speedScript);
        
        console.log('📊 Vercel Analytics scripts loaded');
    }

    /**
     * Función para tracking de eventos personalizados
     */
    function trackEvent(eventName, properties = {}) {
        // Esperar a que Vercel Analytics esté disponible
        if (typeof window.va === 'function') {
            window.va('track', eventName, properties);
            console.log(`📈 Event tracked: ${eventName}`, properties);
        } else {
            // Intentar de nuevo después de un delay
            setTimeout(() => {
                if (typeof window.va === 'function') {
                    window.va('track', eventName, properties);
                    console.log(`📈 Event tracked (delayed): ${eventName}`, properties);
                }
            }, 1000);
        }
    }

    /**
     * Configurar tracking específico para Coaching Floral
     */
    function setupCoachingTracking() {
        // Track clicks en botones CTA
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function(e) {
                const buttonText = this.textContent.trim();
                const section = this.closest('section');
                const sectionId = section ? section.id : 'unknown';
                
                trackEvent('CTA_Click', {
                    button_text: buttonText,
                    section: sectionId,
                    timestamp: new Date().toISOString()
                });
            });
        });

        // Track clicks en WhatsApp
        document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(link => {
            link.addEventListener('click', function() {
                trackEvent('WhatsApp_Click', {
                    phone: '+542266440618',
                    source: 'website',
                    timestamp: new Date().toISOString()
                });
            });
        });

        // Track clicks en email
        document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
            link.addEventListener('click', function() {
                trackEvent('Email_Click', {
                    email: 'melisantoianni@gmail.com',
                    source: 'website',
                    timestamp: new Date().toISOString()
                });
            });
        });

        // Track navegación
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetSection = href.replace('#', '');
                    trackEvent('Navigation_Click', {
                        target_section: targetSection,
                        source: 'navbar',
                        timestamp: new Date().toISOString()
                    });
                }
            });
        });

        // Track modal de contacto
        const originalShowContactModal = window.showContactModal;
        if (typeof originalShowContactModal === 'function') {
            window.showContactModal = function() {
                trackEvent('Contact_Modal_Open', {
                    source: 'contact_button',
                    timestamp: new Date().toISOString()
                });
                return originalShowContactModal.apply(this, arguments);
            };
        }

        console.log('🎯 Coaching-specific tracking configured');
    }

    /**
     * Configurar tracking de performance
     */
    function setupPerformanceTracking() {
        // Track Core Web Vitals manualmente si es necesario
        if ('PerformanceObserver' in window) {
            try {
                // Largest Contentful Paint
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    trackEvent('Core_Web_Vitals', {
                        metric: 'LCP',
                        value: Math.round(lastEntry.startTime),
                        rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
                    });
                }).observe({ entryTypes: ['largest-contentful-paint'] });

                // First Input Delay
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        trackEvent('Core_Web_Vitals', {
                            metric: 'FID',
                            value: Math.round(entry.processingStart - entry.startTime),
                            rating: entry.processingStart - entry.startTime < 100 ? 'good' : entry.processingStart - entry.startTime < 300 ? 'needs-improvement' : 'poor'
                        });
                    });
                }).observe({ entryTypes: ['first-input'] });

                console.log('📊 Performance tracking configured');
            } catch (error) {
                console.warn('⚠️ Performance tracking setup failed:', error);
            }
        }

        // Track tiempo de carga del preloader
        const preloader = document.getElementById('preloader');
        if (preloader) {
            const startTime = performance.now();
            
            const checkPreloaderEnd = () => {
                if (preloader.classList.contains('fade-out') || !preloader.parentNode) {
                    const endTime = performance.now();
                    const duration = Math.round(endTime - startTime);
                    
                    trackEvent('Preloader_Performance', {
                        duration_ms: duration,
                        duration_seconds: Math.round(duration / 1000)
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
        const isProduction = window.location.hostname.includes('vercel.app') || 
                           window.location.hostname.includes('.com') ||
                           (window.location.hostname !== 'localhost' && 
                            window.location.hostname !== '127.0.0.1');

        if (isProduction) {
            loadVercelAnalytics();
            
            // Configurar tracking después de que se cargue el DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    setTimeout(() => {
                        setupCoachingTracking();
                        setupPerformanceTracking();
                    }, 1500); // Esperar a que todo se inicialice
                });
            } else {
                setTimeout(() => {
                    setupCoachingTracking();
                    setupPerformanceTracking();
                }, 1500);
            }

            console.log('✅ Vercel Analytics initialized for production');
        } else {
            console.log('🔧 Analytics disabled in development mode');
        }
    }

    // Exponer función de tracking globalmente
    window.trackCoachingEvent = trackEvent;

    // Inicializar cuando el script se carga
    initializeAnalytics();

})();
