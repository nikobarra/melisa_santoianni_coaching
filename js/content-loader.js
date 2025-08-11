/**
 * COACHING FLORAL - DYNAMIC CONTENT LOADER
 * Sistema de carga dinámica de contenido desde content.json
 * Auto-actualización cuando el archivo JSON cambia
 */

class ContentLoader {
    constructor() {
        this.contentData = null;
        this.lastModified = null;
        this.checkInterval = 2000; // Verificar cambios cada 2 segundos
        this.isLoading = false;
    }

    /**
     * Inicializar el cargador de contenido
     */
    async init() {
        try {
            await this.loadContent();
            this.renderAllSections();
            this.startAutoReload();
            console.log("✅ Content Loader inicializado correctamente");
        } catch (error) {
            console.error("❌ Error inicializando Content Loader:", error);
        }
    }

    /**
     * Cargar contenido desde content.json
     */
    async loadContent() {
        if (this.isLoading) return;

        this.isLoading = true;
        try {
            const response = await fetch(
                "structure/content.json?" + Date.now()
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const lastModified = response.headers.get("Last-Modified");

            // Solo actualizar si el archivo ha cambiado
            if (this.lastModified && lastModified === this.lastModified) {
                this.isLoading = false;
                return false;
            }

            this.contentData = await response.json();
            this.lastModified = lastModified;
            this.isLoading = false;
            return true;
        } catch (error) {
            console.error("Error cargando contenido:", error);
            this.isLoading = false;
            return false;
        }
    }

    /**
     * Renderizar todas las secciones
     */
    renderAllSections() {
        if (!this.contentData || !this.contentData.sections) {
            console.warn("No hay datos de contenido para renderizar");
            return;
        }

        this.contentData.sections.forEach((section) => {
            switch (section.id) {
                case "hero":
                    this.renderHeroSection(section);
                    break;
                case "historia-flores-bach":
                    this.renderHistoriaSection(section);
                    break;
                case "coaching-ontologico":
                    this.renderCoachingSection(section);
                    break;
                case "que-es":
                    this.renderQueEsSection(section);
                    break;
                case "flores-para-mascotas":
                    this.renderMascotasSection(section);
                    break;
                case "para-quien-es":
                    this.renderParaQuienSection(section);
                    break;
                case "proceso":
                    this.renderProcesoSection(section);
                    break;
                case "testimonios":
                    this.renderTestimoniosSection(section);
                    break;
                case "contacto":
                    this.renderContactoSection(section);
                    break;
            }
        });

        // Reinicializar AOS después de renderizar
        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }

        // Actualizar modal de contacto si está abierto
        this.updateContactModal();
    }

    /**
     * Renderizar sección Hero
     */
    renderHeroSection(section) {
        const content = section.content;

        // Actualizar contenido del hero
        const heroName = document.querySelector(".hero-name");
        const heroTitle = document.querySelector(".hero-title");
        const heroTagline = document.querySelector(".hero-tagline");
        const heroDescription = document.querySelector(".hero-description");
        const heroButton = document.querySelector(".hero .cta-button");

        if (heroName) heroName.textContent = content.heading || "";
        if (heroTitle) heroTitle.textContent = content.subheading || "";
        if (heroTagline) heroTagline.textContent = content.tagline || "";
        if (heroDescription)
            heroDescription.textContent = content.description || "";

        if (heroButton && content.cta_button) {
            heroButton.href = content.cta_button.link || "#";
            const buttonText = heroButton.querySelector(":not(i)");
            if (buttonText) {
                heroButton.innerHTML = `<i class="fas fa-leaf" aria-hidden="true"></i> ${content.cta_button.text}`;
            }
        }
    }

    /**
     * Renderizar sección Historia de las Flores de Bach
     */
    renderHistoriaSection(section) {
        const content = section.content;
        const sectionEl = document.getElementById("historia-flores-bach");

        if (!sectionEl) return;

        // Actualizar título
        const heading = sectionEl.querySelector("h2");
        if (heading) heading.textContent = content.heading || "";

        // Actualizar descripción principal
        const mainText = sectionEl.querySelector(".content-text p:first-child");
        if (mainText) mainText.textContent = content.description || "";

        // Actualizar caja de descubrimiento
        const discoveryBox = sectionEl.querySelector(".highlight-box p");
        if (discoveryBox) discoveryBox.textContent = content.discovery || "";

        // Actualizar sistema de remedios
        const systemText = sectionEl.querySelector(".info-card p");
        if (systemText)
            systemText.textContent = content.system_principles || "";
    }

    /**
     * Renderizar sección Coaching Ontológico
     */
    renderCoachingSection(section) {
        const content = section.content;
        const sectionEl = document.getElementById("coaching-ontologico");

        if (!sectionEl) return;

        // Actualizar subtítulo
        const subtitle = sectionEl.querySelector("h3");
        if (subtitle) subtitle.textContent = content.heading || "";

        // Actualizar descripción
        const description = sectionEl.querySelector(".content-text p");
        if (description) description.textContent = content.description || "";
    }

    /**
     * Renderizar sección Qué es Coaching Floral
     */
    renderQueEsSection(section) {
        const content = section.content;
        const sectionEl = document.getElementById("que-es");

        if (!sectionEl) return;

        // Actualizar introducción
        const intro = sectionEl.querySelector(".fusion-intro .lead");
        if (intro) intro.textContent = content.introduction || "";

        // Actualizar descripción de sinergia
        const synergyDesc = sectionEl.querySelector(
            ".fusion-card:last-child p"
        );
        if (synergyDesc)
            synergyDesc.textContent = content.synergy_description || "";

        // Actualizar resultado
        const result = sectionEl.querySelector(".result-card p");
        if (result) result.textContent = content.benefits || "";
    }

    /**
     * Renderizar sección Mascotas
     */
    renderMascotasSection(section) {
        const content = section.content;
        const sectionEl = document.getElementById("flores-para-mascotas");

        if (!sectionEl) return;

        // Actualizar introducción
        const intro = sectionEl.querySelector(".pets-intro p");
        if (intro) intro.textContent = content.introduction || "";

        // Actualizar lista de comportamientos
        if (content.key_behaviors && content.key_behaviors.list_items) {
            const behaviorsList = sectionEl.querySelector(".behaviors-list");
            if (behaviorsList) {
                behaviorsList.innerHTML = content.key_behaviors.list_items
                    .map(
                        (item) =>
                            `<li><i class="fas fa-check-circle"></i> ${item}</li>`
                    )
                    .join("");
            }
        }

        // Actualizar remedio de rescate
        if (content.rescue_remedy) {
            const remedyDesc = sectionEl.querySelector(".remedy-card p");
            if (remedyDesc)
                remedyDesc.textContent =
                    content.rescue_remedy.description || "";

            // Actualizar componentes
            if (content.rescue_remedy.components) {
                const components =
                    sectionEl.querySelectorAll(".component span");
                content.rescue_remedy.components.forEach((comp, index) => {
                    if (components[index]) {
                        components[index].textContent = comp;
                    }
                });
            }
        }

        // Actualizar disclaimer
        const disclaimer = sectionEl.querySelector(".disclaimer-box p");
        if (disclaimer) {
            disclaimer.innerHTML = `<strong>Importante:</strong> ${
                content.disclaimer || ""
            }`;
        }
    }

    /**
     * Renderizar sección Para Quién Es
     */
    renderParaQuienSection(section) {
        const content = section.content;
        const sectionEl = document.getElementById("para-quien-es");

        if (!sectionEl) return;

        // Actualizar introducción
        const intro = sectionEl.querySelector(".target-intro .lead");
        if (intro) intro.textContent = content.introduction || "";

        // Actualizar lista de items (los títulos de las tarjetas se mantienen, solo descripción)
        if (content.list_items) {
            const targetItems = sectionEl.querySelectorAll(".target-item p");
            content.list_items.forEach((item, index) => {
                if (targetItems[index]) {
                    targetItems[index].textContent = item;
                }
            });
        }
    }

    /**
     * Renderizar sección Proceso
     */
    renderProcesoSection(section) {
        const content = section.content;
        const sectionEl = document.getElementById("proceso");

        if (!sectionEl) return;

        // Actualizar introducción
        const subtitle = sectionEl.querySelector(".section-subtitle");
        if (subtitle) subtitle.textContent = content.introduction || "";

        // Actualizar pasos del proceso
        if (content.steps) {
            const timelineItems = sectionEl.querySelectorAll(".timeline-item");
            content.steps.forEach((step, index) => {
                if (timelineItems[index]) {
                    const heading = timelineItems[index].querySelector("h3");
                    const description = timelineItems[index].querySelector("p");

                    if (heading) heading.textContent = step.heading || "";
                    if (description)
                        description.textContent = step.description || "";
                }
            });
        }
    }

    /**
     * Renderizar sección Testimonios
     */
    renderTestimoniosSection(section) {
        const content = section.content;
        const sectionEl = document.getElementById("testimonios");

        if (!sectionEl) return;

        // Actualizar subtítulo
        const subtitle = sectionEl.querySelector(".section-subtitle");
        if (subtitle) subtitle.textContent = content.introduction || "";

        // Actualizar testimonios
        if (content.testimonials) {
            const testimonialCards =
                sectionEl.querySelectorAll(".testimonial-card");
            content.testimonials.forEach((testimonial, index) => {
                if (testimonialCards[index]) {
                    const quote =
                        testimonialCards[index].querySelector("blockquote");
                    const author =
                        testimonialCards[index].querySelector("cite");

                    if (quote) quote.textContent = testimonial.quote || "";
                    if (author)
                        author.textContent = `— ${testimonial.author || ""}`;
                }
            });
        }
    }

    /**
     * Renderizar sección Contacto
     */
    renderContactoSection(section) {
        const content = section.content;
        const sectionEl = document.getElementById("contacto");

        if (!sectionEl) return;

        // Actualizar título y descripción
        const heading = sectionEl.querySelector("h2");
        const description = sectionEl.querySelector(".section-subtitle");

        if (heading) heading.textContent = content.heading || "";
        if (description) description.textContent = content.description || "";

        // Actualizar información de contacto
        if (content.contact_info) {
            const emailLink = sectionEl.querySelector("#contact-email");
            const whatsappLink = sectionEl.querySelector("#contact-whatsapp");

            if (emailLink && content.contact_info.email) {
                emailLink.href = `mailto:${content.contact_info.email}`;
                emailLink.textContent = content.contact_info.email;
            }

            if (whatsappLink && content.contact_info.whatsapp) {
                whatsappLink.href = `https://wa.me/${content.contact_info.whatsapp.replace(
                    /\s+/g,
                    ""
                )}`;
                whatsappLink.textContent =
                    content.contact_info.phone || content.contact_info.whatsapp;
            }
        }

        // Actualizar botón CTA
        if (content.cta_button) {
            const ctaButton = sectionEl.querySelector("#contact-button");
            if (ctaButton) {
                ctaButton.href = content.cta_button.link || "#";
                ctaButton.innerHTML = `<i class="fas fa-calendar-alt"></i> ${
                    content.cta_button.text || ""
                }`;
            }
        }

        // Actualizar enlaces de redes sociales
        if (content.social_media) {
            content.social_media.forEach((social) => {
                const socialLink = sectionEl.querySelector(
                    `.social-link.${social.platform.toLowerCase()}`
                );
                if (socialLink) {
                    socialLink.href = social.url || "#";
                }
            });
        }
    }

    /**
     * Iniciar sistema de auto-recarga
     */
    startAutoReload() {
        setInterval(async () => {
            const hasChanged = await this.loadContent();
            if (hasChanged) {
                console.log("🔄 Contenido actualizado, re-renderizando...");
                this.renderAllSections();

                // Mostrar notificación visual
                this.showUpdateNotification();
            }
        }, this.checkInterval);
    }

    /**
     * Mostrar notificación de actualización
     */
    showUpdateNotification() {
        // Crear notificación temporal
        const notification = document.createElement("div");
        notification.className = "update-notification";
        notification.innerHTML = `
            <i class="fas fa-sync-alt"></i>
            <span>Contenido actualizado</span>
        `;

        // Estilos inline para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color);
            color: var(--text-dark);
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: var(--body-font);
            font-size: 14px;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
            transition: all 0.3s ease;
        `;

        // Agregar animación CSS
        if (!document.querySelector("#update-notification-styles")) {
            const style = document.createElement("style");
            style.id = "update-notification-styles";
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = "slideOutRight 0.3s ease-in";
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Actualizar modal de contacto si está abierto
     */
    updateContactModal() {
        const existingModal = document.querySelector(".contact-modal");
        if (!existingModal) return;

        const contactSection = this.contentData.sections.find(
            (section) => section.id === "contacto"
        );
        if (!contactSection || !contactSection.content.contact_info) return;

        const contactInfo = contactSection.content.contact_info;

        // Actualizar enlaces de contacto en el modal
        const emailOption = existingModal.querySelector(
            '.contact-option[href^="mailto:"]'
        );
        const whatsappOption = existingModal.querySelector(
            '.contact-option[href^="https://wa.me/"]'
        );

        if (emailOption) {
            emailOption.href = `mailto:${contactInfo.email}`;
            emailOption.querySelector("span").textContent = contactInfo.email;
        }

        if (whatsappOption) {
            whatsappOption.href = `https://wa.me/${contactInfo.whatsapp.replace(
                /\s+/g,
                ""
            )}?text=Hola%20Melisa,%20me%20interesa%20reservar%20una%20sesión%20de%20descubrimiento%20gratuita`;
            whatsappOption.querySelector("span").textContent = `WhatsApp: ${
                contactInfo.phone || contactInfo.whatsapp
            }`;
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    window.contentLoader = new ContentLoader();
    window.contentLoader.init();
});
