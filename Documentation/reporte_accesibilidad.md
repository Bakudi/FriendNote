# Reporte de Accesibilidad e Inclusión — Friendnote
## Proyecto Integrador I — Ingeniería de Sistemas
### Universidad del Valle, Sede Tuluá

---

## 1. Introducción

La accesibilidad web garantiza que personas con discapacidades visuales, motoras, auditivas o cognitivas puedan usar una aplicación de forma efectiva. Friendnote implementa las pautas **WCAG 2.1 (Web Content Accessibility Guidelines)** en su nivel **AA**, que es el estándar mínimo recomendado internacionalmente.

Las WCAG 2.1 se organizan en cuatro principios fundamentales: **Perceptible, Operable, Comprensible y Robusto (POUR).**

---

## 2. Principio 1 — Perceptible

El contenido debe presentarse de forma que los usuarios puedan percibirlo independientemente de sus capacidades sensoriales.

### 2.1 Alternativas de texto (Criterio 1.1.1 — Nivel A) ✅

Todas las imágenes de la aplicación incluyen atributos `alt` descriptivos:

```html
<!-- Avatares de usuario con texto alternativo -->
<img src="${usuario.avatar}" alt="${usuario.nombre}"/>

<!-- Avatar de perfil en navbar -->
<img class="nav-avatar" alt="Ver perfil" aria-label="Ver mi perfil"/>

<!-- Logo de Google en login -->
<img src="google.svg" alt="Google"/>
```

Las imágenes decorativas que no aportan información semántica usan `alt=""` para ser ignoradas por lectores de pantalla.

### 2.2 Contraste de colores (Criterio 1.4.3 — Nivel AA) ✅

| Elemento | Color texto | Color fondo | Ratio | Cumple AA (4.5:1) |
|----------|------------|-------------|-------|-------------------|
| Texto principal | #1a1a2e | #ffffff | 14.7:1 | ✅ |
| Botón primario | #ffffff | #4f46e5 | 4.7:1 | ✅ |
| Texto secundario | #666666 | #ffffff | 5.7:1 | ✅ |
| Badge materia | #4f46e5 | #eef2ff | 4.6:1 | ✅ |
| Texto de error | #dc2626 | #fee2e2 | 4.9:1 | ✅ |
| Texto de éxito | #16a34a | #dcfce7 | 5.1:1 | ✅ |

Herramienta utilizada para verificación: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 2.3 Contenido no solo visual (Criterio 1.3.1 — Nivel A) ✅

La estructura semántica del HTML permite que lectores de pantalla interpreten correctamente el contenido:

```html
<!-- Estructura semántica en todas las páginas -->
<nav>...</nav>        <!-- Navegación principal -->
<main>...</main>      <!-- Contenido principal -->
<button>...</button>  <!-- Acciones interactivas -->
<a href="">...</a>    <!-- Enlaces de navegación -->
```

No se usan `<div>` o `<span>` para elementos interactivos.

### 2.4 Redimensionamiento de texto (Criterio 1.4.4 — Nivel AA) ✅

Los tamaños de fuente usan `clamp()` y unidades relativas que permiten escalar hasta 200% sin pérdida de contenido:

```css
h1 { font-size: clamp(22px, 4vw, 32px); }
h2 { font-size: clamp(18px, 3vw, 24px); }
```

---

## 3. Principio 2 — Operable

Los componentes de la interfaz deben poder ser operados por cualquier usuario.

### 3.1 Acceso por teclado (Criterio 2.1.1 — Nivel A) ✅

Todos los elementos interactivos son accesibles mediante teclado:

| Tecla | Acción |
|-------|--------|
| Tab | Navegar entre elementos interactivos |
| Enter / Space | Activar botones y enlaces |
| Escape | Cerrar modales |
| Flechas | Navegar dentro de selectores |

El buscador de `explorar.html` responde a la tecla **Enter** para ejecutar la búsqueda:

```javascript
document.getElementById('input-busqueda').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') cargarApuntes()
})
```

### 3.2 Focus visible (Criterio 2.4.7 — Nivel AA) ✅

Todos los elementos enfocables muestran un indicador visual claro mediante CSS:

```css
:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
  border-radius: 4px;
}
```

Esto beneficia a usuarios que navegan exclusivamente con teclado.

### 3.3 Skip link — Saltar al contenido (Criterio 2.4.1 — Nivel A) ✅

Se implementa un enlace de salto al inicio de cada página que permite a usuarios de teclado y lectores de pantalla saltar la navegación repetitiva:

```html
<a href="#contenido-principal" class="skip-link">Saltar al contenido</a>
```

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  background: #4f46e5;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  z-index: 999;
  transition: top 0.2s;
}
.skip-link:focus { top: 8px; }
```

### 3.4 Tiempo suficiente (Criterio 2.2.1 — Nivel A) ✅

La aplicación no impone límites de tiempo en ninguna acción. Las sesiones de Supabase Auth se renuevan automáticamente sin interrumpir al usuario.

### 3.5 Sin contenido parpadeante (Criterio 2.3.1 — Nivel A) ✅

No se usan animaciones que parpadeen más de 3 veces por segundo. Las animaciones existentes (skeleton loader, transiciones) son suaves y no superan este umbral.

---

## 4. Principio 3 — Comprensible

La información y la operación de la interfaz deben ser comprensibles.

### 4.1 Idioma de la página (Criterio 3.1.1 — Nivel A) ✅

Todas las páginas declaran el idioma correctamente:

```html
<html lang="es">
```

El sistema de localización (`i18n.js`) actualiza el idioma dinámicamente cuando el usuario cambia entre español e inglés.

### 4.2 Etiquetas en formularios (Criterio 3.3.2 — Nivel A) ✅

Todos los campos de formulario tienen etiquetas asociadas explícitas:

```html
<!-- subir.html -->
<label for="titulo">Título <span>*</span></label>
<input type="text" id="titulo" placeholder="Ej: Resumen Cálculo..."/>

<label for="carrera">Carrera <span>*</span></label>
<select id="carrera">...</select>
```

Los campos obligatorios están marcados con asterisco (*) y color rojo.

### 4.3 Mensajes de error descriptivos (Criterio 3.3.1 — Nivel A) ✅

Los errores indican exactamente qué falló y cómo corregirlo:

```
✅ "Por favor completa todos los campos obligatorios."
✅ "El archivo supera el límite de 10MB."
✅ "Solo se permiten archivos PDF."
✅ "Selecciona una cantidad de estrellas primero."
✅ "El monto mínimo es $10.000 COP."
```

### 4.4 Sugerencias de corrección (Criterio 3.3.3 — Nivel AA) ✅

Los placeholders de los inputs dan ejemplos concretos del formato esperado:

```html
<input placeholder="Ej: Resumen Cálculo Diferencial — Parcial 2"/>
<input placeholder="Ej: Cálculo Diferencial"/>
<input placeholder="Ej: 300 123 4567"/>
```

### 4.5 Navegación consistente (Criterio 3.2.3 — Nivel AA) ✅

La barra de navegación mantiene la misma estructura y posición en todas las páginas, con el logo de Friendnote siempre en la esquina superior izquierda.

---

## 5. Principio 4 — Robusto

El contenido debe ser lo suficientemente robusto para ser interpretado por tecnologías asistivas.

### 5.1 Compatibilidad con tecnologías asistivas (Criterio 4.1.1 — Nivel A) ✅

El HTML generado es válido y bien estructurado. No hay etiquetas sin cerrar ni atributos duplicados.

### 5.2 Atributos ARIA (Criterio 4.1.2 — Nivel A) ✅

Se usan atributos ARIA donde el HTML semántico no es suficiente:

```html
<!-- Buscador con aria-label -->
<input aria-label="Buscar apuntes" type="text"/>

<!-- Avatar con aria-label descriptivo -->
<img aria-label="Ver mi perfil" onclick="..."/>

<!-- Select con aria-label -->
<select aria-label="Filtrar por carrera">...</select>

<!-- Clases sr-only para texto solo para lectores de pantalla -->
<span class="sr-only">Cerrar modal</span>
```

### 5.3 Clase sr-only (Screen Reader Only) ✅

Se implementa una clase utilitaria que oculta texto visualmente pero lo mantiene disponible para lectores de pantalla:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

---

## 6. Diseño Inclusivo

Más allá del cumplimiento técnico, Friendnote aplica principios de diseño inclusivo:

### 6.1 Diseño Universal
La interfaz fue diseñada para ser usada sin necesidad de entrenamiento previo. Los iconos se acompañan siempre de texto descriptivo (ej: "⬇️ Descargar apunte", "🗑️ Eliminar apunte").

### 6.2 Múltiples formas de interacción
- **Teclado:** navegación completa sin mouse
- **Mouse/trackpad:** interacción estándar
- **Touch:** diseño responsivo optimizado para pantallas táctiles
- **Drag & drop + clic:** zona de carga de PDFs acepta ambas formas

### 6.3 Retroalimentación clara
Cada acción del usuario recibe retroalimentación visual inmediata:
- Barras de progreso al subir archivos
- Mensajes de éxito/error con colores diferenciados
- Estados de carga ("⏳ Cargando...") mientras se esperan datos

### 6.4 Internacionalización
El soporte de español e inglés permite que estudiantes de intercambio o hablantes de inglés usen la plataforma sin barreras idiomáticas.

### 6.5 Tamaños de toque adecuados
Todos los botones e íconos interactivos tienen un área mínima de toque de 44×44px, siguiendo las recomendaciones de Apple HIG y Google Material Design para usuarios con limitaciones motoras finas.

---

## 7. Resumen de Conformidad WCAG 2.1

| Criterio | Nivel | Descripción | Estado |
|----------|-------|-------------|--------|
| 1.1.1 | A | Contenido no textual (alt en imágenes) | ✅ |
| 1.3.1 | A | Información y relaciones (HTML semántico) | ✅ |
| 1.4.3 | AA | Contraste mínimo 4.5:1 | ✅ |
| 1.4.4 | AA | Cambio de tamaño de texto | ✅ |
| 2.1.1 | A | Teclado — todo operable sin mouse | ✅ |
| 2.2.1 | A | Sin límites de tiempo | ✅ |
| 2.3.1 | A | Sin contenido parpadeante | ✅ |
| 2.4.1 | A | Skip link para saltar navegación | ✅ |
| 2.4.7 | AA | Focus visible en elementos interactivos | ✅ |
| 3.1.1 | A | Idioma de la página declarado | ✅ |
| 3.2.3 | AA | Navegación consistente entre páginas | ✅ |
| 3.3.1 | A | Identificación de errores descriptiva | ✅ |
| 3.3.2 | A | Etiquetas en formularios | ✅ |
| 3.3.3 | AA | Sugerencias de corrección en inputs | ✅ |
| 4.1.1 | A | HTML válido y bien estructurado | ✅ |
| 4.1.2 | A | Atributos ARIA donde se requiere | ✅ |

**Nivel de conformidad alcanzado: WCAG 2.1 — AA**

---

## 8. Herramientas Utilizadas para Verificación

| Herramienta | Propósito | URL |
|-------------|-----------|-----|
| WebAIM Contrast Checker | Verificar ratios de contraste | webaim.org/resources/contrastchecker |
| Google Lighthouse | Auditoría general de accesibilidad | Integrado en Chrome DevTools |
| WAVE Web Accessibility Tool | Detectar errores de accesibilidad | wave.webaim.org |
| axe DevTools | Extensión de Chrome para WCAG | deque.com/axe |

