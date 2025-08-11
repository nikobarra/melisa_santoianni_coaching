/**
 * CONFIGURACIÓN DE VERCEL ANALYTICS
 * Configuración específica para el proyecto de Coaching Floral
 */

export const analyticsConfig = {
    // Configuración básica
    projectId: "melisa-santoianni-coaching",
    environment: "production",

    // Eventos personalizados para trackear
    customEvents: {
        // Eventos de conversión
        CONTACT_WHATSAPP: "contact_whatsapp_click",
        CONTACT_EMAIL: "contact_email_click",
        CONTACT_MODAL: "contact_modal_open",

        // Eventos de navegación
        SECTION_VIEW: "section_view",
        CTA_CLICK: "cta_click",
        NAV_CLICK: "navigation_click",

        // Eventos de engagement
        PRELOADER_COMPLETE: "preloader_complete",
        SCROLL_DEPTH: "scroll_depth",
        TIME_ON_PAGE: "time_on_page",

        // Eventos de performance
        CORE_WEB_VITALS: "core_web_vitals",
        PAGE_LOAD: "page_load_complete",
    },

    // Configuración de Web Vitals
    webVitals: {
        trackLCP: true, // Largest Contentful Paint
        trackFID: true, // First Input Delay
        trackCLS: true, // Cumulative Layout Shift
        trackFCP: true, // First Contentful Paint
        trackTTFB: true, // Time to First Byte
    },

    // Configuración de tracking automático
    autoTracking: {
        pageViews: true,
        clicks: true,
        scrollDepth: [25, 50, 75, 90, 100],
        timeOnPage: true,
        outboundLinks: true,
    },

    // Elementos específicos para trackear
    trackingSelectors: {
        ctaButtons: ".cta-button",
        contactLinks: 'a[href*="wa.me"], a[href*="mailto:"]',
        navigationLinks: ".nav-link",
        socialLinks: ".social-link",
        sections: "section[id]",
    },
};

export default analyticsConfig;
