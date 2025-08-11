# Sistema de Contenido Dinámico

## 📋 Descripción

Tu web de Coaching Floral ahora cuenta con un **sistema de contenido dinámico** que permite que la página se actualice automáticamente cuando modificas el archivo `structure/content.json`.

## 🚀 Características

### ✅ **Carga Dinámica**

-   La página lee automáticamente el contenido desde `content.json`
-   No necesitas modificar el HTML para cambiar textos, títulos o descripciones
-   Todo el contenido se renderiza dinámicamente

### ✅ **Auto-Actualización**

-   **Detección automática**: El sistema verifica cambios cada 2 segundos
-   **Actualización en tiempo real**: Los cambios se reflejan inmediatamente
-   **Notificación visual**: Aparece una notificación cuando el contenido se actualiza

### ✅ **Secciones Dinámicas**

El sistema maneja automáticamente estas secciones:

-   **Hero** (Portada principal)
-   **Historia de las Flores de Bach**
-   **Coaching Ontológico**
-   **Qué es Coaching Floral**
-   **Flores para Mascotas**
-   **Para quién es**
-   **Proceso**
-   **Testimonios**
-   **Contacto**

## 🔧 Cómo Usar

### 1. **Editar Contenido**

Simplemente modifica el archivo `structure/content.json`:

```json
{
    "sections": [
        {
            "id": "hero",
            "title": "Bienvenida y Propuesta de Valor",
            "content": {
                "heading": "Melisa Santoianni",
                "subheading": "COACHING FLORAL",
                "tagline": "Tu nuevo tagline aquí",
                "description": "Nueva descripción aquí..."
            }
        }
    ]
}
```

### 2. **Guardar Cambios**

-   Guarda el archivo `content.json`
-   La página se actualizará automáticamente en **2 segundos**
-   Verás una notificación: "✅ Contenido actualizado"

### 3. **Ver Resultados**

Los cambios aparecerán inmediatamente en la web sin necesidad de:

-   Recargar la página
-   Modificar HTML
-   Reiniciar el servidor

## 📝 Estructura del JSON

### Sección Hero

```json
{
    "id": "hero",
    "content": {
        "heading": "Nombre",
        "subheading": "Título",
        "tagline": "Frase principal",
        "description": "Descripción completa",
        "cta_button": {
            "text": "Texto del botón",
            "link": "#seccion-destino"
        }
    }
}
```

### Testimonios

```json
{
    "id": "testimonios",
    "content": {
        "introduction": "Descripción de los testimonios",
        "testimonials": [
            {
                "quote": "Testimonio completo aquí...",
                "author": "Nombre del Cliente"
            }
        ]
    }
}
```

### Proceso (Timeline)

```json
{
    "id": "proceso",
    "content": {
        "introduction": "Descripción del proceso",
        "steps": [
            {
                "heading": "Paso 1",
                "description": "Descripción del paso"
            }
        ]
    }
}
```

## ⚡ Ventajas

### **Para el Cliente/Usuario:**

-   **Actualización instantánea**: Cambios en tiempo real
-   **Sin conocimientos técnicos**: Solo editar JSON
-   **Sin riesgo**: No tocar HTML/CSS/JS

### **Para el Desarrollador:**

-   **Mantenimiento fácil**: Contenido separado del código
-   **Escalabilidad**: Fácil agregar nuevas secciones
-   **Debugging**: Logs en consola para seguimiento

## 🔍 Monitoreo

### Consola del Navegador

Abre las **Herramientas de Desarrollador** (F12) y ve a la **Consola**:

```
✅ Content Loader inicializado correctamente
🔄 Contenido actualizado, re-renderizando...
```

### Notificaciones Visuales

Cuando el contenido se actualiza, aparece una notificación en la esquina superior derecha:

```
🔄 Contenido actualizado
```

## 🛠️ Configuración

### Intervalo de Verificación

En `js/content-loader.js`, línea 8:

```javascript
this.checkInterval = 2000; // 2 segundos (modificable)
```

### Deshabilitar Auto-Actualización

Para deshabilitar temporalmente:

```javascript
// Comentar esta línea en content-loader.js
// this.startAutoReload();
```

## 🚨 Importante

1. **Formato JSON**: Asegúrate de que el JSON sea válido
2. **Estructura**: Respeta la estructura existente de secciones
3. **Servidor Local**: Funciona mejor con live-server o servidor local
4. **Navegadores Modernos**: Requiere soporte para fetch() y ES6

## 📱 Ejemplo de Uso

1. **Cambiar el tagline del hero:**

    ```json
    "tagline": "Tu nuevo camino hacia la transformación personal"
    ```

2. **Actualizar un testimonio:**

    ```json
    "quote": "Melisa cambió mi vida completamente. Su metodología es excepcional."
    ```

3. **Modificar descripción de proceso:**
    ```json
    "introduction": "Un viaje personalizado de 4 pasos hacia tu bienestar integral"
    ```

¡Los cambios se verán automáticamente en la web! 🎉
