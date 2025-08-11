# 🌸 Coaching Floral - Melisa Santoianni

Sitio web profesional one-page para servicios de Coaching Floral que combina coaching ontológico con Flores de Bach.

## 🚀 Características

-   **Diseño Responsive**: Adaptado a todos los dispositivos
-   **SEO Optimizado**: Meta tags, structured data y performance optimizada
-   **Accesibilidad**: Cumple con estándares WCAG
-   **Animaciones Suaves**: Experiencia de usuario mejorada con AOS
-   **Performance**: Carga rápida y optimizada
-   **PWA Ready**: Preparado para Progressive Web App

## 🛠️ Tecnologías Utilizadas

-   **HTML5** semántico con microdata
-   **CSS3** con variables personalizadas y Grid/Flexbox
-   **JavaScript ES6+** vanilla para interactividad
-   **AOS (Animate On Scroll)** para animaciones
-   **Font Awesome** para iconografía
-   **Google Fonts** para tipografía

## 📦 Instalación y Uso

### Prerrequisitos

-   Node.js (versión 14 o superior)
-   npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/nikobarra/melisa_santoianni_coaching

# Navegar al directorio
cd coaching-floral-web

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional)
# Crear archivo .env con tus datos reales:
# CONTACT_EMAIL=melisantoianni@gmail.com
# CONTACT_WHATSAPP=+542266440618
# INSTAGRAM_URL=https://instagram.com/tu_usuario
# YOUTUBE_URL=https://youtube.com/tu_canal
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El sitio estará disponible en http://localhost:3000
```

### Producción

```bash
# Construir para producción
npm run build

# Los archivos optimizados estarán en la carpeta dist/
```

## 📁 Estructura del Proyecto

```
coaching-floral-web/
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   ├── main.js            # JavaScript principal
│   └── content-loader.js   # Sistema de contenido dinámico
├── img/
│   ├── logo.png           # Logo del sitio
│   └── producto.png       # Imagen de productos
├── structure/
│   ├── content.json       # Contenido del sitio (dinámico)
│   └── paleta.json        # Paleta de colores
├── index.html             # Página principal
├── package.json           # Dependencias y scripts
├── .gitignore             # Archivos ignorados por Git
├── .env                   # Variables de entorno (no versionado)
├── manifest.json          # PWA manifest
├── robots.txt             # Directrices para crawlers
├── sitemap.xml            # Mapa del sitio
├── DYNAMIC_CONTENT.md     # Documentación del sistema dinámico
├── MODAL_CONTACT_UPDATE.md # Documentación del modal
└── README.md             # Este archivo
```

## 🎨 Personalización

### Colores

Los colores están definidos en `css/styles.css` usando variables CSS:

```css
:root {
    --primary-color: #f7f2eb;
    --secondary-color: #eae0d6;
    --tertiary-color: #c9b29f;
    --accent-color: #f6c8c7;
    --text-dark: #3c3a3b;
    --text-light: #7e7b7a;
}
```

### Contenido

El contenido se gestiona desde `structure/content.json`. Modifica este archivo para cambiar textos, títulos y descripciones.

### Imágenes

Reemplaza las imágenes en la carpeta `img/` manteniendo los mismos nombres de archivo.

## 🔧 Configuración

### Variables de Entorno

Configura el archivo `.env` con tus datos:

```env
CONTACT_EMAIL=tu-email@ejemplo.com
WHATSAPP_NUMBER=5491123456789
INSTAGRAM_URL=https://instagram.com/tu-usuario
YOUTUBE_URL=https://youtube.com/@tu-canal
BOOKING_URL=https://calendly.com/tu-usuario/sesion
```

### Google Analytics

Para habilitar Google Analytics, agrega tu tracking ID en `.env`:

```env
GA_TRACKING_ID=G-XXXXXXXXXX
```

## 📱 Responsive Design

El sitio está optimizado para:

-   **Desktop**: 1200px+
-   **Tablet**: 768px - 1199px
-   **Mobile**: 320px - 767px

## ♿ Accesibilidad

-   Navegación por teclado completa
-   Textos alternativos en imágenes
-   Contraste de colores adecuado
-   Estructura semántica HTML5
-   Soporte para lectores de pantalla

## 🚀 Performance

-   **Lazy loading** de imágenes
-   **Minificación** de CSS y JS
-   **Compresión** de imágenes
-   **Caching** estratégico
-   **Critical CSS** inline

## 📈 SEO

-   Meta tags optimizados
-   Structured data (JSON-LD)
-   URLs amigables
-   Sitemap automático
-   Open Graph y Twitter Cards

## 🔒 Seguridad

-   Headers de seguridad configurados
-   Validación de formularios
-   Protección XSS
-   HTTPS recomendado

## 📝 Control de Versiones

### Git Ignore

El proyecto incluye un `.gitignore` completo que excluye:

-   **Node modules**: `node_modules/` y archivos de lock
-   **Variables de entorno**: `.env*` files
-   **Archivos IDE**: `.vscode/`, `.idea/`
-   **Archivos del sistema**: `.DS_Store`, `Thumbs.db`
-   **Logs y cache**: `*.log`, `.cache/`
-   **Archivos temporales**: `tmp/`, `*.bak`

### Comandos Git Útiles

```bash
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "feat: initial commit - coaching floral website"

# Conectar con repositorio remoto
git remote add origin https://github.com/tu-usuario/coaching-floral.git

# Push inicial
git push -u origin main
```

### Estructura de Commits

Seguimos la convención de commits convencionales:

-   `feat:` - Nueva funcionalidad
-   `fix:` - Corrección de bugs
-   `docs:` - Cambios en documentación
-   `style:` - Cambios de formato/estilo
-   `refactor:` - Refactoring de código
-   `test:` - Agregar o modificar tests
-   `chore:` - Tareas de mantenimiento

## 🧪 Testing

```bash
# Ejecutar tests (cuando se implementen)
npm test

# Validar HTML
npm run validate-html

# Auditoría de performance
npm run lighthouse
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

**Melisa Santoianni** - Coaching Floral

-   Email: melisantoianni@gmail.com

---

## 📋 Checklist de Despliegue

-   [ ] Configurar variables de entorno de producción
-   [ ] Optimizar imágenes para web
-   [ ] Configurar Google Analytics
-   [ ] Configurar certificado SSL
-   [ ] Configurar dominio personalizado
-   [ ] Probar en diferentes dispositivos
-   [ ] Validar formularios de contacto
-   [ ] Configurar backup automático
-   [ ] Configurar monitoreo de uptime
-   [ ] Probar velocidad de carga

## 🔄 Actualizaciones

Para mantener el sitio actualizado:

1. Revisar dependencias regularmente
2. Actualizar contenido según necesidades
3. Optimizar imágenes nuevas
4. Monitorear performance
5. Revisar analytics y ajustar SEO

---

_Desarrollado con ❤️ para el bienestar emocional y la transformación personal_
