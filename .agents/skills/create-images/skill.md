---
name: create-images
description: Generar imágenes a partir de un prompt de texto y guardarlas en una ruta concreta. Úsalo cuando necesites crear una imagen con IA.
---

## Skill: Generación de Imágenes

### Prioridad de Herramientas
1. **Herramienta Nativa (Nano Banana)**: Si el asistente dispone de una herramienta interna de generación de imágenes (como `generate_image`), **DEBE** usarla como primera opción. Es más rápida, de mayor calidad y permite iteraciones precisas.
2. **Script Local**: Si el asistente no tiene capacidades nativas, debe usar el script `_tools/generate_cover.js`.

### Uso de Herramienta Nativa
Cuando uses la herramienta nativa, sigue los mismos principios de prompt (en inglés, visual, sin texto). Una vez generada la imagen, **DEBES**:
1. Guardarla en la ruta destino del proyecto (ej: `assets/img/headers/`).
2. Actualizar automáticamente el campo `image` en el **frontmatter** del post relacionado con la nueva ruta.
3. Asegurarte de que el formato visual sea panorámico (ultrawide) para los headers del blog.

### Uso del Script Local (`_tools/generate_cover.js`)
El script `_tools/generate_cover.js` genera imágenes usando proveedores gratuitos en cadena. Si el primero falla, pasa automáticamente al siguiente.

**Proveedores (en orden de prioridad):**
1. **Pollinations.ai** — sin registro, sin API key
2. **Hugging Face (FLUX.1-schnell)** — requiere `HF_TOKEN` en variables de entorno. Si no está definido, se omite.

### Cómo usarlo

```bash
node _tools/generate_cover.js \
  --prompt "<descripción visual en inglés>" \
  --output "<ruta/donde/guardar.webp>"
```

Los parámetros `--width` y `--height` son opcionales. Por defecto genera a **1900x478px**.

```bash
node _tools/generate_cover.js \
  --prompt "<descripción>" \
  --output "<ruta.webp>" \
  --width 1200 \
  --height 630
```

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