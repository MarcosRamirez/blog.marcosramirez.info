---
name: create-images
description: Generar imágenes a partir de un prompt de texto y guardarlas en una ruta concreta. Úsalo cuando necesites crear una imagen con IA.
---

## Skill: Generación de Imágenes

### ⚠️ PROCESO OBLIGATORIO ANTES DE GENERAR

**NUNCA generes una imagen sin seguir estos pasos:**

1. **LEE el post completo** antes de generar la imagen
2. **IDENTIFICA en el post:**
   - El concepto principal / temática central del post (ej: piratería, automatización, domótica, finanzas)
   - Nombres de marcas (Netflix, Google, Amazon, etc.)
   - Nombres de servicios (Jellyfin, Home Assistant, AdGuard, etc.)
   - Nombres de empresas o productos mencionados
3. **INCLUYE en el prompt (AMBOS son obligatorios):**
   - **El concepto/temática central del post** (prioridad máxima)
   - Las marcas/servicios mencionados
   - El tono visual apropiado

### Ejemplo de flujo correcto:

```
1. Leer post sobre "Por qué la gente vuelve a piratear"
2. Identificar:
   - Concepto principal: PIRATERÍA, P2P, torrent downloading
   - Marcas: Netflix, Disney+, Amazon Prime, Apple TV
3. Generar prompt: "piracy, torrent downloading on laptop, P2P file sharing, streaming apps on multiple screens, dark realistic photo, no text, no watermarks"
```

### Uso del Script Local (`_tools/image-generator/image_generator.js`)
El script `_tools/image-generator/image_generator.js` genera imágenes intentando usar primero **Nano Banana (Google Vertex AI)**. Si falla, usará proveedores de respaldo.

### 🌟 Regla de Oro: Prioridad a Nano Banana
El objetivo del blog es que **todas** las imágenes estén generadas por Nano Banana. 
Para saber qué proveedor generó la imagen, el script **modifica automáticamente el nombre del archivo final**:
*   Si funciona Nano Banana: `tu-archivo-nanobanana.png`
*   Si entra el fallback: `tu-archivo-pollinationsai.png` o `-huggingface.png`

**Instrucción obligatoria tras generar una imagen:**
Debes leer la propiedad `finalPath` del JSON que devuelve el script y **actualizar el frontmatter (`image:`) del post** con esa ruta exacta. 
Si ves imágenes antiguas en posts que no tienen el sufijo `-nanobanana`, debes regenerarlas con este script para migrarlas poco a poco.

### Cómo usarlo

```bash
node _tools/image-generator/image_generator.js \
  --prompt "<descripción visual en inglés>" \
  --output "<ruta/donde/guardar/nombre-base.png>"
```

*Nota: Pásale el nombre base (ej. `post.png`). El script se encarga de añadirle el sufijo `-nanobanana` o `-pollinationsai` antes de guardar.*

Los parámetros `--width` y `--height` son opcionales. Por defecto genera panorámicas a **1900x478px**.

### Buenas prácticas para el prompt
- **NUNCA generes un prompt sin haber leído el post primero**
- **Las imágenes DEBEN ser fotorrealistas/realistas, NO estilo dibujo, illustration o cartoon**
- **NO uses la palabra "icon" para logos** - los logos no parecen reales
- **Para representar marcas/servicios**, usa conceptos visuales en su lugar:
  - En lugar de "Netflix icon" → "streaming on laptop screen"
  - En lugar de "AdGuard icon" → "DNS settings screen"
  - En lugar de "Home Assistant logo" → "smart home dashboard on tablet"
- Escríbelo siempre en inglés.
- Sé concreto y visual: describe escena, estilo, colores, iluminación.
- Incluye siempre al final: `no text, no watermarks`.
- **Ejemplos de prompts correctos:**
  - Post sobre Netflix: "Netflix streaming app, dark theme, movie night, no text, no watermarks"
  - Post sobre Home Assistant: "Home Assistant smart home dashboard, IoT devices, dark modern UI, no text, no watermarks"
  - Post sobre AdGuard: "AdGuard DNS blocker, privacy shield, ad blocking interface, no text, no watermarks"

### Interpretar la respuesta
El script devuelve siempre una línea JSON en stdout:

```json
{ "status": "SUCCESS", "code": 0, "message": "Imagen guardada en: ...", "provider": "Pollinations.ai" }
{ "status": "ERROR", "code": 2, "message": "Todos los proveedores fallaron: ..." }
```

### ⚠️ Gestión de errores — OBLIGATORIO

**Código `0` — Éxito:**
La imagen está disponible en la ruta indicada en `--output`. Continúa.

**Código `1` — Parámetros incorrectos:**
Corrige los parámetros y reintenta.

**Código `2` — Todos los proveedores agotados:**
- **PARA inmediatamente. No reintentes. No continúes con otras tareas.**
- Informa al usuario con este mensaje: *"El servicio de generación de imágenes no está disponible ahora mismo. Se han agotado todos los proveedores gratuitos. Por favor, inténtalo más tarde."*
- Espera instrucciones del usuario antes de hacer cualquier otra cosa.

**Código `4` — Error inesperado:**
- **PARA inmediatamente.**
- Informa al usuario del mensaje de error exacto devuelto por el script.
- Espera instrucciones antes de continuar.