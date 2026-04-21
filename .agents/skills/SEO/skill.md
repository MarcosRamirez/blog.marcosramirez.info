---
name: SEO
description: Skill especializada en optimizar posts de tecnología y software bajo estándares E-E-A-T. Analiza jerarquía de encabezados, mejora el SEO on-page y asegura la autoridad técnica del autor como Software Engineer.
---

# Manual de SEO y Estilo Técnico (Instrucciones de la Skill)

## 1. Perfil y Autoridad
- **Autor:** Marcos Ramírez, Software Engineer.
- **E-E-A-T:** Inyectar párrafos que demuestren experiencia directa, pruebas de software y comprensión de arquitectura técnica.

## 2. Estructura de Contenido (On-Page)
- **H1:** Título único definido en el Front Matter.
- **H2/H3 con Long-tail:** Subtítulos que respondan a búsquedas reales (ej: "¿Cómo configurar X en Y?").
- **Tablas Comparativas:** Obligatorias al mencionar herramientas para comparar Precio, Funciones y Dev-Experience.
- **Sección FAQ:** 3-4 preguntas para capturar fragmentos destacados (featured snippets).

## 3. Gestión de Etiquetas (Tags)
- **Cantidad:** Entre 3 y 6 etiquetas por post.
- **Regla Anti-Canibalización:** PROHIBIDO usar como etiqueta el nombre del producto, app o tema principal que da título al post (ej: si el post es sobre "Docker", no usar `docker` como tag; usar `contenedores`, `devops`, `infraestructura`).
- **Lógica:** 1-2 Core Tech (tecnología base), 2-3 Contexto Profesional (rol/sector), 1 Intent (propósito del post).
- **Formato:** Minúsculas, sin espacios (usar guiones), evitar repetir el título del post.
- **YAML:** `tags: [tag1, tag2, tag3]`.

## 4. Optimización de Imágenes (SEO Visual)
- **Atributos ALT:** Técnicos y descriptivos (ej: `alt="Terminal con salida de error en Node.js"`).

## 5. Política de Enlaces y Dominios
Para maximizar el "Link Juice" y la seguridad, la IA debe identificar el destino del enlace:

### A. Dominios Propios (Whitelist - Dofollow)
NO aplicar `nofollow` ni `noopener` a los siguientes dominios:
- `marcosramirez.info`
- `marcosramirez.dev`
- `saasquatch.es`

### B. Enlaces Externos (Seguridad)
Cualquier dominio NO incluido en la lista anterior debe tratarse como externo.

## 6. Formato Jekyll (Chirpy Theme)
- **Enlaces Externos:** Usar `[Texto](url){:target="_blank" :rel="nofollow noopener"}`.
- **Enlaces Propios (Whitelist):** Usar `[Texto](url){:target="_blank"}` (sin rel) para mantener la autoridad.
- **H1:** No repetir dentro del cuerpo del Markdown (Chirpy lo genera automáticamente).

## 7. Excerpt e Interlinking
- **Excerpt:** Gancho técnico de ~150 caracteres para el feed principal.
- **Interlinking:** Sugerir enlaces internos hacia los dominios de la Whitelist para mejorar la navegación del usuario.