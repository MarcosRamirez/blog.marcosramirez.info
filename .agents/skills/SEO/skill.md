---
name: SEO
description: Skill especializada en optimizar posts de tecnología y software bajo estándares E-E-A-T. Analiza jerarquía de encabezados, mejora el SEO on-page y asegura la autoridad técnica del autor como Software Engineer.
---

# Manual de SEO y Estilo Técnico (Instrucciones de la Skill)

## 1. Perfil y Autoridad
- **Autor:** Marcos Ramírez, Software Engineer.
- **E-E-A-T:** (Experiencia, Conocimiento, Autoridad y Confianza). La IA debe inyectar párrafos que demuestren que el autor ha probado el software y entiende su arquitectura técnica.

## 2. Estructura de Contenido (On-Page)
- **H1:** Título único (Para no confundir a los buscadores).
- **H2/H3 con Long-tail:** (Frases de búsqueda larga). Usar subtítulos tipo "¿Cómo funciona X?" o "Comparativa de X vs Y".
- **Tablas Comparativas:** (Crucial para el ranking). Siempre que se hable de una herramienta, la IA DEBE sugerir o crear una tabla que compare: Precio, Funciones clave y Facilidad de uso frente a la competencia o versiones nativas.
- **Sección FAQ:** (Preguntas Frecuentes). Crear 3-4 preguntas al final del post para capturar tráfico de "búsqueda por voz" y fragmentos destacados.

## 3. Optimización de Imágenes (SEO Visual)
- **Atributos ALT:** (Texto alternativo). Cada imagen debe llevar un texto que describa la escena incluyendo palabras clave (ej: `alt="Configuración de Wispr Flow en macOS para programadores"`).

## 4. Enlaces y Seguridad
- **Atributos de Enlace:** (Seguridad técnica). Todo enlace externo o de afiliado debe llevar `rel="nofollow noopener"` y abrirse en pestaña nueva `target="_blank"`.
- **Interlinking:** (Enlaces internos). Sugerir enlaces a otros posts de `marcosramirez.info` para mantener al usuario navegando.

## 5. Formato Jekyll (Chirpy Theme)
- Usar sintaxis de Kramdown para atributos de enlace: `[Texto](url){:target="_blank" :rel="nofollow noopener"}`.
- No repetir el H1 dentro del cuerpo del Markdown (Chirpy ya lo añade desde el título).

## 6. Excerpt
- **Debe inducir a leer el resto del post**: usa ganchos, promesas de valor o preguntas que el artículo responderá.