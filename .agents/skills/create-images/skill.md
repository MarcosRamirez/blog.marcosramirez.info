---
name: create-images
description: Generar imágenes a partir de un prompt de texto y guardarlas en una ruta concreta. Úsalo cuando necesites crear una imagen con IA.
---

## Skill: Generación de Imágenes

### Herramienta
El script `_tools/generate-cover.js` genera imágenes via Pollinations.ai (gratuito, sin API key ni registro).

### Cómo usarlo

```bash
node _tools/generate-cover.js \
  --prompt "<descripción visual en inglés>" \
  --output "<ruta/donde/guardar.webp>"
```

Los parámetros `--width` y `--height` son opcionales. Por defecto genera a **1900x478px**.

```bash
node _tools/generate-cover.js \
  --prompt "<descripción>" \
  --output "<ruta.webp>" \
  --width 1200 \
  --height 630
```

### Buenas prácticas para el prompt
- Escríbelo siempre en inglés.
- Sé concreto y visual: describe escena, estilo, colores, iluminación.
- Para evitar texto en la imagen añade: `no text, no watermarks`.

### Interpretar la respuesta
El script devuelve siempre una línea JSON en stdout:

```json
{ "status": "SUCCESS", "code": 0, "message": "Imagen guardada en: ..." }
{ "status": "ERROR", "code": 2, "message": "Rate limit alcanzado..." }
```

| Código | Significado | Acción |
|---|---|---|
| `0` | Éxito | La imagen está en la ruta indicada en `--output` |
| `1` | Parámetros incorrectos | Corrige y reintenta |
| `2` | Rate limit o servicio caído | **Para y avisa al usuario** |
| `3` | Error de red | Reintenta una vez. Si falla de nuevo, avisa al usuario |
| `4` | Error inesperado | Avisa al usuario |