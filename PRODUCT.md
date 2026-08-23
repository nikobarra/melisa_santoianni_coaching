# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Personas que se sienten estancadas, agobiadas o con dificultad para gestionar sus emociones; personas atravesando un duelo (pérdida, ruptura, cambio de vida); personas que buscan trabajar sus vínculos o su sistema familiar. Buscan una solución profunda y sostenible, no un alivio superficial. Su job-to-be-done: reservar una sesión de descubrimiento gratuita por WhatsApp y, si el encaje es bueno, avanzar a sesiones de coaching pagas.

## Product Purpose

Acompañar procesos de transformación personal, vínculos y duelo a través de coaching ontológico y sistémico, con Flores de Bach disponible como complemento opcional (ya no como mecanismo central). Éxito para el negocio: más reservas de sesión de descubrimiento. Éxito para el cliente: mayor autoconfianza, claridad mental y bienestar duradero, no solo alivio de síntomas.

## Positioning

Combina coaching ontológico + coaching sistémico + especialización en coaching de duelo, en formato de acompañamiento personalizado 1 a 1. Relevamiento de referentes en Instagram (@asersentido, @portal.maestro, @stella.lifecoach, @aprendeaamartesinlimites) no encontró ningún competidor que ocupe esta combinación exacta: los referentes de coaching ontológico son escuelas o entrenamientos grupales/masivos, no acompañamiento individual; los referentes más espirituales trabajan sanación emocional y amor propio sin marco ontológico-sistémico ni especialización en duelo. Ese es el hueco que la marca ocupa.

## Operating Context

Sitio one-page en español (Argentina). Canal de contacto principal: WhatsApp (+542266440618); secundario: email (melisantoianni@gmail.com). CTA principal en todo el sitio: reservar sesión de descubrimiento gratuita vía WhatsApp. Proceso documentado en 4 pasos: sesión de descubrimiento gratuita → sesiones de coaching ontológico → preparación de esencias florales (donde aplique) → resultados y bienestar sostenible. Analítica vía Vercel Analytics con eventos personalizados (clicks en WhatsApp, email, botones CTA, navegación entre secciones).

## Capabilities and Constraints

Sitio estático: HTML/CSS/JS vanilla, sin framework ni build step (`package.json` build script es un no-op). Contenido de las secciones principales se carga dinámicamente desde `structure/content.json` vía `js/content-loader.js` (fetch con polling cada 2s para detectar cambios; el HTML estático es solo el esqueleto/fallback inicial, `content.json` es la autoridad real del copy en runtime). Desplegado en Vercel directo desde la raíz del repo (la carpeta `public/` duplicada que existía fue eliminada; `vercel.json`/`​.vercelignore` ya no la referencian). Dominio confirmado: `melisantoianni.com`.

Coaching sistémico y coaching de duelo son líneas de servicio nuevas: **no tienen contenido propio en el sitio todavía** (no hay sección, ni "para quién es", ni proceso específico; son secciones a crear, no a inferir). Duelo sí tiene un ítem reconocido en "Esto es para ti si..." desde 2026-08-23. Flores de Bach pasa a ser un complemento secundario; ningún copy nuevo debe volver a presentarlo como el eje central de la propuesta.

**El sitio es una landing page, no un sitio de contenido extenso.** Decisión confirmada 2026-08-23: una sola página de scroll orientada a una sola acción (reservar por WhatsApp), no un sitio de folleto con secciones profundas por tema. Consecuencia concreta: se eliminó por completo la sección "Historia de las Flores de Bach" (biografía de Edward Bach) y "Flores de Bach para Mascotas" se redujo de sección propia a una sola línea dentro del bloque de Flores de Bach como complemento. La navegación mobile también se simplificó: no hay menú hamburguesa, solo un botón "Reservar" siempre visible.

**Flores de Bach para mascotas sigue siendo un servicio real que ofrece Melisa**, pero en la landing se comunica como una línea breve, no como sección dedicada. Cualquier trabajo futuro que quiera expandirla debe confirmar primero si eso sigue siendo landing page o si amerita una página aparte.

## Brand Commitments

- **Nombre**: "Melisa Santoianni", nombre propio de la fundadora, no un nombre de marca separado. Descriptor: "Coaching Ontológico y Sistémico" (duelo se comunica como especialización dentro de eso, no como tercer nombre en la marca).
- **Logo**: mark "Sendero", dos trazos (terracota + salvia) que recorren un camino juntos sin fundirse nunca en uno solo; simboliza acompañamiento ("no se recorre solo/a"). Archivos en `img/logo.webp` (transparente, uso en página) e `img/logo-192.png` / `img/logo-512.png` (opacos, para manifest/PWA).
- **Paleta**: terracota `#B5582F` (acento principal), salvia `#64754A` (secundario), arena `#EFE4D0` (fondo), lino `#FAF5EA` (superficie), espresso `#2E2419` (texto).
- **Tipografía**: Zilla Slab (títulos), Karla (texto de cuerpo). Se retiraron Playfair Display y Dancing Script (registro floral/delicado del posicionamiento anterior).
- **Tono**: cálido pero profesional. Explícitamente se evita el registro esotérico/new-age genérico ("vibracional", "energético") porque parte de la audiencia está atravesando un duelo activo y ese registro puede sentirse poco serio en ese momento.

## Evidence on Hand

- Foto real de la fundadora: `img/melisa_santoianni.webp`.
- Historia personal real de Melisa (Buenos Aires → Balcarce → terapeuta floral/aromaterapeuta → coach ontológica), ya escrita en `structure/content.json` (sección `about-me`).
- 2 testimonios reales (Laura G. y Ana P.), **marcados para reencuadre**: son válidos y reales, pero el texto actual centra el resultado en "Flores de Bach + coaching"; hay que reescribirlos (no inventarlos de nuevo) para que el eje sea el coaching antes de volver a publicarlos.
- **Sin evidencia** (testimonios, casos, certificaciones, cifras) para coaching de duelo. No inventar ninguna hasta que exista de verdad.
- **Sin evidencia** propia para coaching sistémico más allá de la formación general en coaching ontológico ya documentada.

## Product Principles

1. El acompañamiento personalizado 1 a 1 es la diferenciación central: no competir en el terreno de "escuela" o entrenamiento grupal que ya ocupan Asersentido y Portal Maestro.
2. Las Flores de Bach son un complemento, nunca el titular: todo copy nuevo lidera con coaching ontológico, sistémico o de duelo.
3. El tono debe poder sostener a alguien en duelo activo sin caer en lo esotérico ni en lo clínico-frío.
4. No inventar evidencia (testimonios, casos, cifras) para líneas de servicio que todavía no la tienen. Mejor una sección incompleta que una inventada.
5. El objetivo de negocio que orienta cualquier decisión de diseño es aumentar las reservas de sesión de descubrimiento gratuita.

## Accessibility & Inclusion

Estándar objetivo: WCAG 2.1 AA.
