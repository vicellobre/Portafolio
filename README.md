# Portafolio — Vicente Llobregat

Portafolio personal desplegado en GitHub Pages. Presenta perfil profesional, habilidades, servicios, proyectos de videojuegos (Unity/WebGL) y simuladores educativos desarrollados para CloudLabs.

**Sitio en vivo:** [https://vicellobre.github.io/Portafolio/](https://vicellobre.github.io/Portafolio/)

## Stack

- HTML5, CSS3 y JavaScript (vanilla)
- Bootstrap 5 + Bootstrap Icons
- [GLightbox](https://biati-digital.github.io/glightbox/) (galería / lightbox)
- [Typed.js](https://github.com/mattboldt/typed.js/) (texto animado en el hero)
- Plantilla base: [DevFolio](https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/) (personalizada)

## Estructura del proyecto

```
├── index.html          # Versión en español
├── index-en.html       # Versión en inglés
├── assets/
│   ├── css/style.css   # Estilos principales
│   ├── js/main.js      # Navegación, scroll, lightbox, typed
│   ├── img/            # Imágenes del portafolio (+ variantes .webp)
│   ├── videos/         # Vídeos para lightbox
│   └── vendor/         # Dependencias mínimas (Bootstrap, GLightbox, Typed)
└── scripts/            # Herramientas de mantenimiento (optimización de imágenes)
```

## Editar contenido

| Qué cambiar | Dónde |
|-------------|--------|
| Textos y secciones en español | `index.html` |
| Textos y secciones en inglés | `index-en.html` |
| Estilos globales | `assets/css/style.css` |
| Comportamiento (menú, scroll, galería) | `assets/js/main.js` |
| Imágenes de proyectos | `assets/img/` |

> **Nota:** Las versiones ES y EN se mantienen en archivos separados. Cualquier cambio de contenido debe replicarse en ambos idiomas hasta una posible migración a generador estático (Eleventy).

## Optimizar imágenes

Tras añadir o sustituir imágenes en `assets/img/`:

```bash
cd scripts
npm install
npm run optimize-images
```

El script comprime JPG/PNG, genera variantes WebP y actualiza `index.html` e `index-en.html` con elementos `<picture>`.

## Despliegue

El sitio se publica automáticamente desde la rama `main` vía **GitHub Pages** del repositorio [vicellobre/Portafolio](https://github.com/vicellobre/Portafolio).

## Licencia de plantilla

La plantilla DevFolio es de [BootstrapMade](https://bootstrapmade.com/license/). El contenido y personalizaciones son del autor del portafolio.
