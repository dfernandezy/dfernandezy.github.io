# José María Alguersuari - Web Oficial

Web moderna y profesional creada con GSAP ScrollTrigger y ScrollSmoother.

## ✨ Características

- **Diseño minimalista y elegante** estilo Awwwards/Dribbble
- **Animaciones GSAP profesionales** con ScrollSmoother para scroll ultra-suave
- **Galería horizontal con parallax** y lightbox expandible
- **Fade-in progresivo** de elementos al hacer scroll
- **Responsive** para todos los dispositivos

## 📁 Estructura

```
alguersuari/
├── assets/
│   └── js/
│       └── gsap/           # Archivos GSAP incluidos
│           ├── gsap.min.js
│           ├── ScrollTrigger.min.js
│           ├── ScrollSmoother.min.js
│           └── SplitText.min.js
├── index.html              # Archivo principal
├── images/                 # Carpeta para imágenes (actualmente con placeholders)
└── README.md              # Este archivo
```

## 🎨 GSAP Libraries Incluidas

El proyecto incluye los siguientes archivos GSAP (v3.12.5) en `assets/js/gsap/`:

- **`gsap.min.js`** - Core library de GSAP
- **`ScrollTrigger.min.js`** - Plugin para animaciones basadas en scroll
- **`ScrollSmoother.min.js`** - Plugin para scroll suavizado
- **`SplitText.min.js`** - Plugin para dividir y animar texto

Estos archivos proporcionan:
- Animaciones de scroll ultra-suaves
- Efectos parallax en las imágenes del hero
- Texto dividido en caracteres/palabras para animaciones
- Scroll horizontal en la galería
- Lightbox con animaciones fluidas

## 🖼️ Para añadir las imágenes reales

Actualmente la galería usa placeholders SVG. Para reemplazarlos con las imágenes reales:

1. Coloca las imágenes en la carpeta `images/`
2. Abre `index.html` y reemplaza los `src` de las imágenes placeholder por las rutas reales

Las imágenes necesarias del sitio original son:
- `gal_foto_01.jpg`
- `gal_foto_02.jpg`
- `gal_foto_03.jpg`
- `album_fotografia_practica.jpg`
- `magazine_pilotos_cumbr.jpg`
- `foto.jpg`
- `lavanguardia.jpg`
- `diarios_de_fotografia.jpg`
- `hobby.jpg` o `hobby2.jpg`

## 🚀 Para visualizar

Abre `index.html` en un navegador moderno. Todas las dependencias GSAP están incluidas localmente en el proyecto.

**Nota**: El sitio funciona completamente sin conexión a internet ya que todos los archivos GSAP están incluidos localmente.

## 🛠️ Personalización

- **Colores**: Edita las variables CSS en `:root` (líneas 20-25)
- **Velocidad de scroll**: Ajusta `smooth: 1.5` en ScrollSmoother (línea 430)
- **Animaciones**: Modifica los valores de `duration`, `ease` y `stagger` en el JavaScript

## 📝 Notas

- ScrollSmoother requiere los archivos locales de GSAP (incluidos en el proyecto)
- Las animaciones están optimizadas para 60fps
- El lightbox se abre al hacer clic en cualquier imagen de la galería
