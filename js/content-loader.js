class ContentLoader {
    constructor() {
        (this.contentData = null),
            (this.lastModified = null),
            (this.checkInterval = 2e3),
            (this.isLoading = !1);
    }
    async init() {
        try {
            await this.loadContent(),
                this.renderAllSections(),
                this.startAutoReload(),
                console.log("✅ Content Loader inicializado correctamente");
        } catch (t) {
            console.error("❌ Error inicializando Content Loader:", t);
        }
    }
    async loadContent() {
        if (!this.isLoading) {
            this.isLoading = !0;
            try {
                let t = await fetch("structure/content.json?" + Date.now());
                if (!t.ok) throw Error(`HTTP error! status: ${t.status}`);
                let e = t.headers.get("Last-Modified");
                if (this.lastModified && e === this.lastModified)
                    return (this.isLoading = !1), !1;
                return (
                    (this.contentData = await t.json()),
                    (this.lastModified = e),
                    (this.isLoading = !1),
                    !0
                );
            } catch (o) {
                return (
                    console.error("Error cargando contenido:", o),
                    (this.isLoading = !1),
                    !1
                );
            }
        }
    }
    renderAllSections() {
        if (!this.contentData || !this.contentData.sections) {
            console.warn("No hay datos de contenido para renderizar");
            return;
        }
        this.contentData.sections.forEach((t) => {
            switch (t.id) {
                case "hero":
                    this.renderHeroSection(t);
                    break;
                case "historia-flores-bach":
                    this.renderHistoriaSection(t);
                    break;
                case "about-me":
                    this.renderAboutMeSection(t);
                    break;
                case "coaching-ontologico":
                    this.renderCoachingSection(t);
                    break;
                case "que-es":
                    this.renderQueEsSection(t);
                    break;
                case "flores-para-mascotas":
                    this.renderMascotasSection(t);
                    break;
                case "para-quien-es":
                    this.renderParaQuienSection(t);
                    break;
                case "proceso":
                    this.renderProcesoSection(t);
                    break;
                case "testimonios":
                    this.renderTestimoniosSection(t);
                    break;
                case "contacto":
                    this.renderContactoSection(t);
            }
        }),
            "undefined" != typeof AOS && AOS.refresh(),
            this.updateContactModal();
    }
    renderHeroSection(t) {
        let e = t.content,
            o = document.querySelector(".hero-name"),
            n = document.querySelector(".hero-title"),
            i = document.querySelector(".hero-tagline"),
            r = document.querySelector(".hero-description"),
            a = document.querySelector(".hero .cta-button");
        if (
            (o && (o.textContent = e.heading || ""),
            n && (n.textContent = e.subheading || ""),
            i && (i.textContent = e.tagline || ""),
            r && (r.textContent = e.description || ""),
            a && e.cta_button)
        ) {
            a.href = e.cta_button.link || "#";
            let c = a.querySelector(":not(i)");
            c &&
                (a.innerHTML = `<i class="fas fa-leaf" aria-hidden="true"></i> ${e.cta_button.text}`);
        }
    }
    renderHistoriaSection(t) {
        let e = t.content,
            o = document.getElementById("historia-flores-bach");
        if (!o) return;
        let n = o.querySelector("h2");
        n && (n.textContent = e.heading || "");
        let i = o.querySelector(".content-text p:first-child");
        i && (i.textContent = e.description || "");
        let r = o.querySelector(".highlight-box p");
        r && (r.textContent = e.discovery || "");
        let a = o.querySelector(".info-card p");
        a && (a.textContent = e.system_principles || "");
    }
    renderAboutMeSection(t) {
        let e = t.content,
            o = document.getElementById("about-me");
        if (!o) return;
        let n = o.querySelector("h2");
        if ((n && (n.textContent = e.heading || ""), e.photo)) {
            let i = o.querySelector(".melisa-photo"),
                r = o.querySelector(".photo-caption h4"),
                a = o.querySelector(".photo-caption p");
            i && ((i.src = e.photo.src || ""), (i.alt = e.photo.alt || "")),
                r && (r.textContent = e.photo.caption_name || ""),
                a && (a.textContent = e.photo.caption_title || "");
        }
        if (e.story) {
            let c = e.story.split("\n\n"),
                s = o.querySelector(".about-story");
            s &&
                ((s.innerHTML = ""),
                c.forEach((t, e) => {
                    let o = document.createElement("p");
                    (o.className =
                        e === c.length - 1
                            ? "story-text highlight"
                            : "story-text"),
                        (o.textContent = t),
                        s.appendChild(o);
                }));
        }
        if (e.highlights) {
            let l = o.querySelector(".about-highlights");
            l &&
                ((l.innerHTML = ""),
                e.highlights.forEach((t, e) => {
                    let o = document.createElement("div");
                    (o.className = "highlight-item"),
                        o.setAttribute("data-aos", "fade-up"),
                        o.setAttribute("data-aos-delay", (e + 1) * 100),
                        (o.innerHTML = `
                        <div class="highlight-icon">
                            <i class="${t.icon}"></i>
                        </div>
                        <h3>${t.title}</h3>
                        <p>${t.description}</p>
                    `),
                        l.appendChild(o);
                }));
        }
    }
    renderCoachingSection(t) {
        let e = t.content,
            o = document.getElementById("coaching-ontologico");
        if (!o) return;
        let n = o.querySelector("h3");
        n && (n.textContent = e.heading || "");
        let i = o.querySelector(".content-text p");
        i && (i.textContent = e.description || "");
    }
    renderQueEsSection(t) {
        let e = t.content,
            o = document.getElementById("que-es");
        if (!o) return;
        let n = o.querySelector(".fusion-intro .lead");
        n && (n.textContent = e.introduction || "");
        let i = o.querySelector(".fusion-card:last-child p");
        i && (i.textContent = e.synergy_description || "");
        let r = o.querySelector(".result-card p");
        r && (r.textContent = e.benefits || "");
    }
    renderMascotasSection(t) {
        let e = t.content,
            o = document.getElementById("flores-para-mascotas");
        if (!o) return;
        let n = o.querySelector(".pets-intro p");
        if (
            (n && (n.textContent = e.introduction || ""),
            e.key_behaviors && e.key_behaviors.list_items)
        ) {
            let i = o.querySelector(".behaviors-list");
            i &&
                (i.innerHTML = e.key_behaviors.list_items
                    .map(
                        (t) =>
                            `<li><i class="fas fa-check-circle"></i> ${t}</li>`
                    )
                    .join(""));
        }
        if (e.rescue_remedy) {
            let r = o.querySelector(".remedy-card p");
            if (
                (r && (r.textContent = e.rescue_remedy.description || ""),
                e.rescue_remedy.components)
            ) {
                let a = o.querySelectorAll(".component span");
                e.rescue_remedy.components.forEach((t, e) => {
                    a[e] && (a[e].textContent = t);
                });
            }
        }
        let c = o.querySelector(".disclaimer-box p");
        c &&
            (c.innerHTML = `<strong>Importante:</strong> ${
                e.disclaimer || ""
            }`);
    }
    renderParaQuienSection(t) {
        let e = t.content,
            o = document.getElementById("para-quien-es");
        if (!o) return;
        let n = o.querySelector(".target-intro .lead");
        if ((n && (n.textContent = e.introduction || ""), e.list_items)) {
            let i = o.querySelectorAll(".target-item p");
            e.list_items.forEach((t, e) => {
                i[e] && (i[e].textContent = t);
            });
        }
    }
    renderProcesoSection(t) {
        let e = t.content,
            o = document.getElementById("proceso");
        if (!o) return;
        let n = o.querySelector(".section-subtitle");
        if ((n && (n.textContent = e.introduction || ""), e.steps)) {
            let i = o.querySelectorAll(".timeline-item");
            e.steps.forEach((t, e) => {
                if (i[e]) {
                    let o = i[e].querySelector("h3"),
                        n = i[e].querySelector("p");
                    o && (o.textContent = t.heading || ""),
                        n && (n.textContent = t.description || "");
                }
            });
        }
    }
    renderTestimoniosSection(t) {
        let e = t.content,
            o = document.getElementById("testimonios");
        if (!o) return;
        let n = o.querySelector(".section-subtitle");
        if ((n && (n.textContent = e.introduction || ""), e.testimonials)) {
            let i = o.querySelectorAll(".testimonial-card");
            e.testimonials.forEach((t, e) => {
                if (i[e]) {
                    let o = i[e].querySelector("blockquote"),
                        n = i[e].querySelector("cite");
                    o && (o.textContent = t.quote || ""),
                        n && (n.textContent = `— ${t.author || ""}`);
                }
            });
        }
    }
    renderContactoSection(t) {
        let e = t.content,
            o = document.getElementById("contacto");
        if (!o) return;
        let n = o.querySelector("h2"),
            i = o.querySelector(".section-subtitle");
        if (
            (n && (n.textContent = e.heading || ""),
            i && (i.textContent = e.description || ""),
            e.contact_info)
        ) {
            let r = o.querySelector("#contact-email"),
                a = o.querySelector("#contact-whatsapp");
            r &&
                e.contact_info.email &&
                ((r.href = `mailto:${e.contact_info.email}`),
                (r.textContent = e.contact_info.email)),
                a &&
                    e.contact_info.whatsapp &&
                    ((a.href = `https://wa.me/${e.contact_info.whatsapp.replace(
                        /\s+/g,
                        ""
                    )}`),
                    (a.textContent =
                        e.contact_info.phone || e.contact_info.whatsapp));
        }
        if (e.cta_button) {
            let c = o.querySelector("#contact-button");
            c &&
                ((c.href = e.cta_button.link || "#"),
                (c.innerHTML = `<i class="fas fa-calendar-alt"></i> ${
                    e.cta_button.text || ""
                }`));
        }
        e.social_media &&
            e.social_media.forEach((t) => {
                let e = o.querySelector(
                    `.social-link.${t.platform.toLowerCase()}`
                );
                e && (e.href = t.url || "#");
            });
    }
    startAutoReload() {
        setInterval(async () => {
            let t = await this.loadContent();
            t &&
                (console.log(
                    "\uD83D\uDD04 Contenido actualizado, re-renderizando..."
                ),
                this.renderAllSections(),
                this.showUpdateNotification());
        }, this.checkInterval);
    }
    showUpdateNotification() {
        let t = document.createElement("div");
        if (
            ((t.className = "update-notification"),
            (t.innerHTML = `
            <i class="fas fa-sync-alt"></i>
            <span>Contenido actualizado</span>
        `),
            (t.style.cssText = `
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
        `),
            !document.querySelector("#update-notification-styles"))
        ) {
            let e = document.createElement("style");
            (e.id = "update-notification-styles"),
                (e.textContent = `
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
            `),
                document.head.appendChild(e);
        }
        document.body.appendChild(t),
            setTimeout(() => {
                (t.style.animation = "slideOutRight 0.3s ease-in"),
                    setTimeout(() => {
                        t.parentNode && t.parentNode.removeChild(t);
                    }, 300);
            }, 3e3);
    }
    updateContactModal() {
        let t = document.querySelector(".contact-modal");
        if (!t) return;
        let e = this.contentData.sections.find((t) => "contacto" === t.id);
        if (!e || !e.content.contact_info) return;
        let o = e.content.contact_info,
            n = t.querySelector('.contact-option[href^="mailto:"]'),
            i = t.querySelector('.contact-option[href^="https://wa.me/"]');
        n &&
            ((n.href = `mailto:${o.email}`),
            (n.querySelector("span").textContent = o.email)),
            i &&
                ((i.href = `https://wa.me/${o.whatsapp.replace(
                    /\s+/g,
                    ""
                )}?text=Hola%20Melisa,%20me%20interesa%20reservar%20una%20sesi\xf3n%20de%20descubrimiento%20gratuita`),
                (i.querySelector("span").textContent = `WhatsApp: ${
                    o.phone || o.whatsapp
                }`));
    }
}
document.addEventListener("DOMContentLoaded", () => {
    (window.contentLoader = new ContentLoader()), window.contentLoader.init();
});
