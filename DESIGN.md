---
name: Melisa Santoianni - Coaching Ontológico y Sistémico
description: Coaching ontológico, sistémico y de duelo, acompañado, no solo/a
colors:
  terracota-cocida: "#B5582F"
  salvia-apagada: "#64754A"
  arena: "#EFE4D0"
  lino: "#FAF5EA"
  espresso-tibio: "#2E2419"
  ink-soft: "#6B5D4C"
  surface-white: "#FFFFFF"
typography:
  display:
    fontFamily: "Zilla Slab, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(3rem, 6vw, 5rem)"
    fontWeight: 700
    lineHeight: 1
  headline:
    fontFamily: "Zilla Slab, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
  body:
    fontFamily: "Karla, Segoe UI, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  sm: "2px"
  md: "12px"
  pill: "50px"
  circle: "50%"
spacing:
  section: "80px 0"
  container: "0 20px"
  card: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.terracota-cocida}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "1rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.salvia-apagada}"
    textColor: "{colors.surface-white}"
  card:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.md}"
    padding: "{spacing.card}"
---

# Design System: Melisa Santoianni - Coaching Ontológico y Sistémico

## Overview

**Creative North Star: "El Sendero Compartido"**

El sistema entero parte de una sola imagen: dos trazos que caminan el mismo camino sin fundirse nunca en uno solo. Terracota y salvia no son un acento y un secundario, son dos presencias que aparecen juntas, casi siempre en el mismo gradiente de 135°, porque el acompañamiento es el producto, no un adjetivo del producto.

La superficie es cálida (arena, lino) y el texto nunca llega a negro puro; hasta la sombra de las tarjetas está tintada de espresso, no de gris neutro. Esa decisión no es decorativa: parte de la audiencia atraviesa un duelo activo, y un sistema visual frío o clínico se siente fuera de lugar en ese momento. Al mismo tiempo, el sistema se aleja deliberadamente del registro anterior (pastel floral, cursiva ornamental) porque ese registro leía como delicado en un momento en que el pedido es sostén, no ornamento.

Se rechaza explícitamente: la paleta pastel/floral y la tipografía cursiva del posicionamiento anterior (`Playfair Display`, `Dancing Script`); cualquier ícono o imagen que reduzca la marca a "flores"; sombras grises neutras (siempre tintadas del color de texto).

**Key Characteristics:**
- Terracota y salvia aparecen juntos, casi nunca solos, en el gradiente de acento.
- Superficies cálidas, nunca blanco frío ni gris neutro.
- Elevación ambiental, ligera, que responde al hover, no una jerarquía de profundidad fija.
- Formas: botones en píldora (curva completa), tarjetas con esquina suave (12px), nunca esquina viva.

## Colors

La paleta es de tierra: dos acentos que se combinan en vez de competir, sobre una base cálida que nunca llega a blanco puro ni a negro puro.

### Primary
- **Terracota Cocida** (`#B5582F`): acento principal. Aparece en botones CTA, íconos activos, y como primer color del gradiente de acento. Evoca calidez horneada, artesanal, no corporativa.

### Secondary
- **Salvia Apagada** (`#64754A`): acompaña a la terracota casi siempre en el mismo gradiente de 135°, nunca aparece completamente solo como fondo grande. Representa el vínculo y lo sistémico frente a lo puramente individual de la terracota.

### Neutral
- **Arena** (`#EFE4D0`): fondo base del sitio (`body`, hero).
- **Lino** (`#FAF5EA`): superficie secundaria (fondos alternos de sección, `alt-bg`).
- **Espresso Tibio** (`#2E2419`): texto principal. Deliberadamente no es negro puro; mantiene la calidez incluso en el contraste más alto.
- **Ink Soft** (`#6B5D4C`): texto secundario, subtítulos, metadata.
- **Blanco** (`#FFFFFF`): fondo de tarjetas e íconos sobre el gradiente de acento (texto de botón, iconografía sobre color).

### Named Rules
**La Regla del Dúo.** La terracota no aparece nunca completamente sola en un elemento grande (botón, banda, gradiente); casi siempre comparte el espacio con la salvia en el mismo gradiente de 135°. Un acento solitario contradice la premisa de la marca: nada se hace en soledad.

**La Regla de la Sombra Tibia.** Ninguna sombra usa negro o gris neutro. Toda `box-shadow` se construye tinendo el color de texto (`--shadow`, `--shadow-hover`), nunca `rgba(0,0,0,...)`.

## Typography

**Display / Headline Font:** Zilla Slab (con Iowan Old Style, Georgia como fallback serif)
**Body Font:** Karla (con Segoe UI, system-ui como fallback sans)

**Character:** Zilla Slab es una slab serif: su base plana (los "pies" de la letra) funciona como metáfora tipográfica de estar parado en el suelo, coherente con el norte creativo de "sendero compartido" y con el compromiso de sonar sólido sin sonar frío. Karla la acompaña como una sans humanista cálida y muy legible, sin la formalidad corporativa de una grotesca neutra.

### Hierarchy
- **Display** (700, `clamp(3rem, 6vw, 5rem)`, line-height 1): nombre "Melisa Santoianni" en el hero.
- **Headline** (700, `clamp(2.5rem, 5vw, 4rem)`, línea 1): títulos de sección principales.
- **Title** (700, `clamp(1.5rem, 3vw, 2.5rem)`): subtítulos de sección, título del hero.
- **Body** (400, `1.1rem`, línea 1.7): texto de contenido; sin límite de ancho de línea explícito en CSS, pero el grid de contenido lo mantiene razonable.
- **Label** (600, `1.1rem`): texto de botones y CTAs.

### Named Rules
**La Regla de la Cursiva Retirada.** No se usa tipografía script/cursiva en ningún punto del sistema. Es una ruptura deliberada con el posicionamiento anterior (`Dancing Script`), que leía como delicado/ornamental en vez de sólido.

## Layout

Contenedor centrado con `max-width: 1200px` y padding lateral de 20px. Ritmo de sección regular: `padding: 80px 0` por sección (`--section-padding`). Grids de contenido (`.content-grid`, `.hero-content`) usan 2 columnas iguales (`1fr 1fr`) en desktop con `gap: 4rem`, y grids de beneficios/targets usan `repeat(2, 1fr)` con `gap: 2rem`.

Breakpoints observados: 1024px, 768px, 480px, 360px, con reflow progresivo del grid a una columna y ajuste de la navegación en los tramos más chicos.

## Elevation & Depth

El sistema es mayormente plano en reposo: las tarjetas (`.fusion-card`, `.benefit-item`, `.testimonial-card`, `.info-card`) llevan una sombra ambiental suave (`0 4px 20px var(--shadow)`) todo el tiempo, no como respuesta a estado, pero esa sombra es deliberadamente sutil y tintada, casi textural más que estructural. La profundidad real aparece en el hover: la tarjeta o botón se eleva (`translateY(-3px)` a `-5px`) y la sombra se profundiza y agranda (`var(--shadow-hover)`), comunicando interactividad sin depender de una jerarquía de capas fija.

### Shadow Vocabulary
- **Ambiental** (`box-shadow: 0 4px 20px var(--shadow)`): reposo, en tarjetas y contenedores.
- **Hover / interactiva** (`box-shadow: 0 8px 25px var(--shadow-hover)` a `0 8px 30px`): estado activo, siempre acompañada de una elevación (`translateY`).

### Named Rules
**La Regla del Levante.** Ningún elemento cambia de sombra sin moverse también. Sombra y `transform: translateY(...)` van siempre juntas; la sombra sola sin movimiento se siente muerta.

## Shapes

Dos lenguajes de forma conviven a propósito: **píldora completa** (`border-radius: 50px`) para todo lo accionable (botones CTA, links de navegación), y **esquina suave** (`border-radius: 12px`, `--border-radius`) para contenedores de contenido (tarjetas, cajas de highlight). Los elementos circulares (`border-radius: 50%`) se reservan para avatares, íconos contenedores y el indicador de scroll. No hay esquinas vivas (0px) en ningún componente interactivo ni de contenido.

## Components

### Buttons (CTA)
- **Shape:** píldora completa (radius 50px).
- **Primary:** gradiente 135° de terracota (`--accent-color`) a salvia (`--tertiary-color`), texto blanco, `padding: 1rem 2rem`, `font-weight: 600`.
- **Hover:** se eleva 3px, la sombra pasa de `--shadow` a `--shadow-hover`.
- **Variante grande** (`.cta-button.large`): mismo tratamiento, `padding: 1.25rem 2.5rem`.

### Cards / Containers
- **Corner Style:** 12px (`--border-radius`).
- **Background:** blanco (`--white`) sobre el fondo cálido de la sección.
- **Shadow Strategy:** ambiental en reposo, se profundiza y el elemento se eleva al hover (ver Elevation & Depth).
- **Internal Padding:** `2rem` a `2.5rem` según el tipo de tarjeta.

### Navigation
- Fondo con `backdrop-filter: blur(10px)` sobre la barra fija.
- Links en píldora (`border-radius: 25px`) con transición suave al hover.
- El link de contacto (`.cta-nav`) lleva peso 600 y tratamiento visualmente distinto al resto de los links, marcándolo como la acción principal de la navegación.

## Do's and Don'ts

### Do:
- **Do** usar terracota y salvia juntos en el mismo gradiente de 135° para cualquier elemento de acento grande (La Regla del Dúo).
- **Do** tintar toda sombra con el color de texto (`--text-dark` en rgba), nunca negro o gris puro.
- **Do** acompañar todo cambio de sombra con una elevación (`translateY`), nunca solo uno de los dos.
- **Do** usar píldora completa para lo accionable y esquina de 12px para contenedores de contenido; mantener esa distinción consistente.

### Don't:
- **Don't** usar tipografía script/cursiva en ningún punto del sistema.
- **Don't** dejar la terracota sola como fondo grande sin la salvia acompañándola en el gradiente.
- **Don't** usar esquinas vivas (0px) en botones, tarjetas o cualquier contenedor de contenido.
- **Don't** introducir gris neutro o negro puro en sombras, bordes o texto; toda variación oscura parte del espresso tibio (`#2E2419`).
