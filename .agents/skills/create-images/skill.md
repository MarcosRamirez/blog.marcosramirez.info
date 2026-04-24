---
name: create-images
description: Generar imágenes a partir de un prompt de texto y guardarlas en una ruta concreta. Úsalo cuando necesites crear una imagen con IA.
---

## Skill: Generación de Imágenes

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
- Escríbelo siempre en inglés.
- Sé concreto y visual: describe escena, estilo, colores, iluminación.
- Incluye siempre al final: `no text, no watermarks`.

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