# Guía Técnica - Corbenz Engine

Este documento proporciona detalles técnicos sobre la implementación del diseño y la interactividad del sitio web.

## 🎨 Sistema de Diseño (CSS Variables)

El proyecto utiliza un conjunto robusto de variables CSS para mantener la consistencia en todo el sitio:

```css
:root {
    --primary-color: #0d2c40;    /* Deep Navy */
    --secondary-color: #1a73e8;  /* Vibrant Blue */
    --accent-color: #00b8d4;     /* Technical Cyan */
    --dark-bg: #0a1924;          /* Deep Dark Navy */
    --light-bg: #f8f9fa;         /* Off-White */
    --text-color: #333333;
    --light-text: #ffffff;
}
```

## 🧠 Lógica de JavaScript

### 1. Animación Parallax del Hero
Se utiliza un cálculo de posición relativa del mouse para rotar la imagen del motor central:
```javascript
const xPos = (clientX / innerWidth) - 0.5;
const yPos = (clientY / innerHeight) - 0.5;
engineImage.style.transform = `perspective(1000px) rotateX(${yPos * -20}deg) rotateY(${xPos * 20}deg) scale(1.05)`;
```

### 2. Animaciones al Hacer Scroll
Implementado con `IntersectionObserver` para detectar cuándo las secciones entran en el viewport:
- **Reveal Active**: Clase que dispara las transiciones CSS de opacidad y desplazamiento (translateY).

### 3. Header Pegajoso y Nav Suave
- El header añade la clase `.sticky` tras 50px de scroll.
- Se previene el comportamiento por defecto de los enlaces ancla para usar `scrollIntoView({ behavior: 'smooth' })`.

## 📱 Diseño Responsivo

El diseño se adapta mediante Media Queries estratégicos:
- `992px`: Ajuste del layout del Hero (de flex-row a flex-column).
- `768px`: Activación del menú móvil lateral con efecto de desenfoque (`backdrop-filter`).

## 🛠️ Notas de Mantenimiento

- **Imágenes**: La mayoría de las imágenes utilizan `filter: drop-shadow` para mejorar la profundidad sin sacrificar rendimiento.
- **Botones**: Los botones tienen un pseudo-elemento `::after` para el efecto de expansión al pasar el cursor.
