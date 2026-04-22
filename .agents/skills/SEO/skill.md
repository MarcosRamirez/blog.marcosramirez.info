---
name: SEO
description: Skill especializada en optimizar posts de tecnología y software bajo estándares E-E-A-T. Analiza jerarquía de encabezados, mejora el SEO on-page y asegura la autoridad técnica del autor como Software Engineer.
---

# Manual de SEO y Estilo Técnico (Instrucciones de la Skill)

## Orden para escribir un buen post
1. Seguir las instrucciones de esta skill, para redactar, investigar, etc..
2. Una vez escrito el post, seguir las instrucciones de la skill de enlaces
3. Una vez escrito el post, seguir las instrucciones de la skill de SEO

## 1. Perfil y Autoridad
- **Autor:** Marcos Ramírez, Software Engineer.
- **E-E-A-T:** Inyectar párrafos que demuestren experiencia directa, pruebas de software y comprensión de arquitectura técnica.

## 2. Estructura de Contenido (On-Page)
- **Metadatos (Límites):**
    - **Title Tag:** Máximo 60 caracteres (priorizar palabra clave al inicio).
    - **Meta Description:** Entre 120 y 155 caracteres (gancho comercial/técnico).
- **H1:** Título único definido en el Front Matter. No repetir en el cuerpo.
- **H2/H3 con Long-tail:** Subtítulos que respondan a búsquedas reales (ej: "¿Cómo configurar X en Y?").
- **Tablas Comparativas:** Obligatorias al mencionar herramientas para comparar Precio, Funciones y Dev-Experience.
- **Sección FAQ:** 3-4 preguntas para capturar fragmentos destacados (featured snippets).

## 3. Gestión de Etiquetas (Tags) y Pensamiento Relacional
- **Cantidad:** Entre 3 y 8 etiquetas por post.
- **Regla Anti-Canibalización:** PROHIBIDO usar como etiqueta el nombre del producto, app o tema principal que da título al post.
- **Expansión Semántica:** La IA debe razonar etiquetas relacionadas mediante el ecosistema técnico:
    - **Tecnologías Adyacentes:** Si el post es sobre un framework, sugerir el lenguaje base o su entorno (ej: para `Next.js`, usar `react` o `vercel`).
    - **Abstracción Técnica:** Identificar la categoría superior (ej: para `PostgreSQL`, usar `databases` o `sql`).
    - **Casos de Uso:** Relacionar con el beneficio (ej: `performance`, `automation`, `security`).
- **Lógica:** 1-2 Core Tech (tecnología base), 2-3 Contexto Profesional (rol/sector), 1 Intent (propósito del post).
- **Formato:** Minúsculas, sin espacios (usar guiones), evitar repetir el título del post.
- **YAML:** `tags: [tag1, tag2, tag3]`.

## 4. Optimización de Imágenes (SEO Visual)
- **Atributos ALT:** Técnicos y descriptivos (ej: `alt="Terminal con salida de error en Node.js"`). Obligatorio para accesibilidad e indexación de imágenes.

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
- **Excerpt:** Gancho técnico de ~150 caracteres para el feed principal (máximo 160 para evitar recorte).
- **Interlinking:** Sugerir enlaces internos hacia los dominios de la Whitelist para mejorar la navegación del usuario.

## 8. Estructura de URLs (Slugs)
- **Longitud:** Entre 3 y 5 palabras clave.
- **Limpieza:** Eliminar "stop words" (artículos, preposiciones, conjunciones, posesivos).
- **Selección inteligente:** Priorizar las palabras que mejor describan el contenido:
  - Producto o servicio principal
  - Acción o beneficio clave
  - Palabra clave SEO
- **Formato:** Siempre en minúsculas, palabras separadas únicamente por guiones medios (`-`).
- **Semántica:** Debe ser descriptivo del contenido técnico del post sin incluir caracteres especiales o acentos.
- **Ejemplo:** "AdGuard Home: Tu propio bloqueador de publicidad y DNS" → `adguard-home-publicidad` (no `adguard-home-bloqueador` porque "publicidad" es la palabra clave buscada)

## 9. Norma para Slugs (Posts Existentes vs Nuevos)

**Discriminación por estado:**

| Estado del post | Acción sobre el slug |
|-----------------|---------------------|
| **Post nuevo (sin publicar)** | Generar slug de 3-5 palabras desde el título |
| **Post ya publicado** | NO modificar el slug existente (mantener URL actual) |

**Rational:**
- Los posts existentes ya están indexados en搜索引擎
- Cambiar su URL Causaría errores 404 y pérdida de posicionamiento
- Solo los posts nuevos pueden tener slugs acortados

**Verificación SEO:**

- Al analizar un post, verificar la cantidad de palabras en el slug (separadas por guiones)
- **Solo warn** si:
  - El post es nuevo (no existe en el repositorio o está en `_drafts/`)
  - El slug tiene más de 5 palabras
- **No warn** si el post ya está publicado (el slug actual debe mantenerse)