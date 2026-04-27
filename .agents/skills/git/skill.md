---
name: git
description: Redactar mensajes de commit en español siguiendo Conventional Commits con Gitmojis. Úsalo siempre que vayas a hacer un commit.
---

## Skill: Generación de Commits en Español (Estilo Directo)

### ⚠️ REGLAS OBLIGATORIAS
- **SIEMPRE** usa Conventional Commits
- **SIEMPRE** incluye emoji al inicio del mensaje
- **NUNCA** hagas push a menos que yo lo indique expresamente
- **NUNCA** hagas commit sin revisar primero con `git diff`
- **SIEMPRE** usa este formato EXACTO: `<tipo>(<ámbito>): <emoji> <resumen>`
- **NUNCA** uses otro formato de commit
- **SIEMPRE** haz un commit por cada cambio relevante en el código
- **NUNCA** hagas `git push` en un WIP (trabajo en progreso)

### WIP (Work in Progress)
- Un **WIP** es un commit de trabajo en progreso para guardar cambios intermedios que no están listos para publicar.
- **REGLA: NUNCA hacer `git push` en un WIP.**
- Usa el tipo `wip` para commits WIP: `wip(<ámbito>): 🛠️ <resumen>`
- Un WIP es solo para guardar localmente
- Solo se hace push cuando el usuario lo indica expresamente
- Si hace falta hacer push de un WIP, el mensaje de commit debe indicar claramente que es un WIP

### Perfil
Eres un experto en Git que redacta mensajes de commit siguiendo la convención de **Conventional Commits** con **Gitmojis**, adaptado a un tono descriptivo en español.

### Estructura del Mensaje
El formato debe ser: `<tipo>(<ámbito>): <emoji> <resumen>`

### Reglas de Mapeo y Estilo
- `fix`: 🐛 (Corrección de bugs, errores, cambios menores)
- `docs`: 📝 (Cambios en documentación o skills de agents)
- `feat`: ✨ (Nueva funcionalidad)
- `style`: 🎨 (Cambios de estilo o UI)
- `refactor`: ♻️ (Refactorización de código)
- `content`: ✍️ **(Solo para posts del blog - usar el título del post como resumen)**
- `ui`: 🎯 (Cambios en la interfaz de usuario)

**IMPORTANTE:** El emoji VA DESPUÉS DE LOS DOS PUNTOS, antes del resumen. Ejemplo: `fix(ui): 🎯 Movido share`

### Reglas de Oro
1. **Idioma:** Siempre en **español**.
2. **Tono:** Usa el **pasado participio** (NO infinitivo): "Corregido" (NO "Corregir"), "Añadido" (NO "Añadir"), "Actualizado" (NO "Actualizar").
3. **Posts de Blog:** Para el tipo `content`, no inventes una descripción, usa el título principal del artículo que se está editando o creando.
4. **Longitud:** Mantén el título por debajo de los 50 caracteres.

### Ejemplos de Salida
`fix(blog): 🐛 Corregido post_url en post de Lucía`
`feat(api): ✨ Añadido endpoint de usuarios`
`content(blog): ✍️ Mi experiencia migrando a Antigravity`
`fix(ui): 🐛 Corregido margen en el footer`