# Guía de Estilo — Friendnote
## Proyecto Integrador I — Ingeniería de Sistemas
### Universidad del Valle, Sede Tuluá

---

## 1. Identidad de Marca

### 1.1 Logo
El logo de Friendnote combina un emoji de libro 📚 con el nombre de la aplicación en tipografía bold. Es simple, reconocible y funciona en cualquier tamaño.

```
📚 Friendnote
```

**Versiones:**
- Completo: `📚 Friendnote` — usado en navbar y login
- Solo ícono: `📚` — usado en favicon y notificaciones push
- Solo texto: `Friendnote` — usado en títulos de página

**Usos incorrectos:**
- No cambiar el color del texto del logo
- No separar el ícono del texto en contextos de marca
- No usar el logo sobre fondos con poco contraste

---

## 2. Paleta de Colores

### 2.1 Colores Primarios

| Nombre | Hex | RGB | Uso |
|--------|-----|-----|-----|
| Primary | `#4f46e5` | rgb(79, 70, 229) | Botones principales, links, badges |
| Primary Dark | `#4338ca` | rgb(67, 56, 202) | Hover de botones primarios |
| Primary Light | `#eef2ff` | rgb(238, 242, 255) | Fondos de badges, highlights |

### 2.2 Colores Neutros

| Nombre | Hex | RGB | Uso |
|--------|-----|-----|-----|
| Background | `#f4f6fb` | rgb(244, 246, 251) | Fondo general de la app |
| White | `#ffffff` | rgb(255, 255, 255) | Fondo de cards y navbar |
| Text Primary | `#1a1a2e` | rgb(26, 26, 46) | Títulos y texto principal |
| Text Secondary | `#666666` | rgb(102, 102, 102) | Descripciones y subtítulos |
| Text Muted | `#999999` | rgb(153, 153, 153) | Metadatos y texto de apoyo |
| Border | `#e0e0e0` | rgb(224, 224, 224) | Bordes de inputs y dividers |

### 2.3 Colores Semánticos

| Nombre | Hex | Uso |
|--------|-----|-----|
| Success | `#16a34a` | Mensajes de éxito, confirmaciones |
| Success Light | `#dcfce7` | Fondo de alertas de éxito |
| Danger | `#dc2626` | Errores, eliminaciones, alertas |
| Danger Light | `#fee2e2` | Fondo de alertas de error |

### 2.4 Gradientes

El gradiente principal se usa en la tarjeta de saldo de ganancias:

```css
background: linear-gradient(135deg, #4f46e5, #7c3aed);
```

---

## 3. Tipografía

### 3.1 Fuente Principal

**Segoe UI** — fuente del sistema de Windows, con fallback a `system-ui` y `-apple-system` para Mac/iOS.

```css
font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
```

Se eligió una fuente del sistema porque:
- Carga instantánea (no requiere descarga externa)
- Máxima legibilidad en cada plataforma
- Consistencia con el sistema operativo del usuario

### 3.2 Escala Tipográfica

| Elemento | Tamaño | Peso | Uso |
|----------|--------|------|-----|
| H1 | clamp(22px, 4vw, 32px) | 700 | Títulos de página |
| H2 | clamp(18px, 3vw, 24px) | 700 | Secciones principales |
| H3 | clamp(16px, 2.5vw, 20px) | 600 | Subsecciones |
| Body | 15px | 400 | Texto general |
| Small | 13-14px | 400/500 | Metadatos, labels |
| Badge | 11px | 600 | Tags de materia/carrera |
| Caption | 12px | 400 | Fechas, contadores |

### 3.3 Interlineado

```css
line-height: 1.5;  /* Texto general */
line-height: 1.6;  /* Párrafos largos */
line-height: 1.2;  /* Títulos */
line-height: 1.3;  /* Subtítulos */
```

---

## 4. Espaciado

Friendnote usa una escala de espaciado basada en múltiplos de 8px:

| Token | Valor | Uso típico |
|-------|-------|-----------|
| xs | 4px | Espaciado interno de badges |
| sm | 8px | Gap entre elementos inline |
| md | 16px | Padding de cards, gap de grids |
| lg | 24px | Padding de secciones |
| xl | 32px | Padding de páginas principales |
| 2xl | 40px | Padding de páginas con contenido central |
| 3xl | 48px | Espaciado entre secciones grandes |

---

## 5. Bordes y Sombras

### 5.1 Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| radius-sm | 8px | Inputs, botones, tags |
| radius-md | 12px | Cards de apuntes |
| radius-lg | 16px | Cards principales, modales |
| radius-full | 50% | Avatares |
| radius-pill | 20px | Badges, chips |

### 5.2 Sombras

```css
--shadow-sm: 0 2px 8px rgba(0,0,0,0.05);   /* Cards en reposo */
--shadow-md: 0 4px 16px rgba(0,0,0,0.08);  /* Cards en hover */
--shadow-lg: 0 8px 24px rgba(79,70,229,0.12); /* Cards seleccionadas */
```

Las sombras usan el color primario en `shadow-lg` para reforzar la identidad visual al interactuar.

---

## 6. Componentes

### 6.1 Botones

**Primario** — acciones principales (subir, enviar, confirmar)
```css
background: #4f46e5;
color: white;
padding: 10px 20px;
border-radius: 8px;
font-weight: 500;
```

**Outline** — acciones secundarias (cancelar, volver)
```css
background: white;
color: #4f46e5;
border: 1.5px solid #4f46e5;
```

**Danger** — acciones destructivas (eliminar)
```css
background: white;
color: #dc2626;
border: 1.5px solid #dc2626;
```

**Reglas de uso:**
- Máximo un botón primario por sección visible
- Los botones destructivos siempre van acompañados de confirmación
- Estado disabled reduce opacidad al 50% — nunca se oculta

### 6.2 Cards de Apunte

```
┌─────────────────────────┐
│ [BADGE MATERIA]         │
│ Título del apunte       │
│ Descripción corta...    │
│                         │
│ [avatar] Nombre  ⭐ ⬇️  │
└─────────────────────────┘
```

- Border radius: 12px
- Padding: 20px
- Hover: `translateY(-3px)` + sombra morada
- Borde: 1px transparente → color primary en hover

### 6.3 Inputs

```css
padding: 12px 14px;
border: 1.5px solid #e0e0e0;
border-radius: 8-10px;
/* Focus: */
border-color: #4f46e5;
box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
```

### 6.4 Badges / Tags

```
[CÁLCULO]    → background: #eef2ff, color: #4f46e5
[Sistemas]   → background: #eef2ff, color: #4f46e5
```

- Font size: 11px
- Font weight: 600
- Text transform: uppercase
- Letter spacing: 0.5px

### 6.5 Alertas

```
✅ Éxito  → fondo #dcfce7, texto #16a34a
❌ Error  → fondo #fee2e2, texto #dc2626
```

Siempre incluyen un ícono (emoji) al inicio para no depender solo del color.

---

## 7. Iconografía

Friendnote usa emojis como sistema de iconos por las siguientes razones:
- No requieren librerías externas
- Son universalmente reconocibles
- Funcionan en todos los sistemas operativos
- No necesitan implementación de accesibilidad adicional

| Emoji | Uso |
|-------|-----|
| 📚 | Logo, apuntes generales |
| ⬇️ | Descargar, número de descargas |
| ⭐ | Valoraciones, promedio |
| 🎁 | Propinas |
| 💰 | Ganancias |
| 💸 | Retiros |
| 🗑️ | Eliminar |
| 📄 | Archivos PDF |
| 👥 | Usuarios |
| ⏳ | Cargando |
| 📭 | Sin resultados |
| ✅ | Éxito |
| ❌ | Error |
| 🔒 | Acceso restringido |

---

## 8. Navbar

```
┌──────────────────────────────────────────┐
│ 📚 Friendnote    [+ Subir apunte] [👤]   │
└──────────────────────────────────────────┘
```

- Height: 60px fija
- Position: sticky (se mantiene al hacer scroll)
- Background: blanco con sombra sutil
- Logo siempre a la izquierda
- Acciones siempre a la derecha

---

## 9. Grids y Layout

### 9.1 Contenedor principal

```css
max-width: 900px;   /* index, explorar */
max-width: 720px;   /* detalle, perfil, ganancias, subir */
max-width: 1000px;  /* admin */
margin: 0 auto;
padding: 32-40px 16px;
```

### 9.2 Grid de apuntes

```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
gap: 16px;
```

Se adapta automáticamente de 1 a 3 columnas según el ancho de pantalla.

---

## 10. Animaciones y Transiciones

Todas las transiciones usan `0.2s` de duración con easing por defecto para mantener consistencia:

```css
transition: all 0.2s;
transition: background 0.2s;
transition: transform 0.2s, box-shadow 0.2s;
```

**Microinteracciones implementadas:**
- Cards: `translateY(-3px)` al hover
- Botones primarios: `translateY(-1px)` al hover
- Avatar navbar: `scale(1.05)` al hover
- Estrellas de valoración: `scale(1.15)` al hover/seleccionar
- Inputs: cambio de borde + glow morado al focus

**Principio:** las animaciones son sutiles y funcionales — indican interactividad sin distraer.

