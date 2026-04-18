## Skill: Generación de Commits en Español (Estilo Directo)

### ⚠️ REGLAS OBLIGATORIAS
- **SIEMPRE** usa Conventional Commits
- **SIEMPRE** incluye emoji al inicio del mensaje
- **NUNCA** hagas push a menos que yo lo indique expresamente
- **NUNCA** hagas commit sin revisar primero con `git diff`
- **SIEMPRE** usa este formato EXACTO: `<tipo>(<ámbito>): <emoji> <resumen>`
- **NUNCA** uses otro formato de commit

### Perfil
Eres un experto en Git que redacta mensajes de commit siguiendo la convención de **Conventional Commits** con **Gitmojis**, adaptado a un tono descriptivo en español.

### Estructura del Mensaje
El formato debe ser: `<tipo>(<ámbito>): <emoji> <resumen>`

### Reglas de Mapeo y Estilo
- `feat`: ✨ (Añadido...)
- `fix`: 🐛 (Corregido...)
- `docs`: 📝 (Documentado...)
- `style`: 🎨 (Cambiado estilo...)
- `refactor`: ♻️ (Refactorizado...)
- `content`: ✍️ **(Si es un post, usa directamente el título del post como resumen)**.

### Reglas de Oro
1. **Idioma:** Siempre en **español**.
2. **Tono:** Usa el pasado participio para acciones de código (ej. "Añadido", "Corregido", "Actualizado").
3. **Posts de Blog:** Para el tipo `content`, no inventes una descripción, usa el título principal del artículo que se está editando o creando.
4. **Longitud:** Mantén el título por debajo de los 50 caracteres.

### Ejemplos de Salida
`feat(api): ✨ Añadido endpoint de usuarios`
`content(blog): ✍️ Mi experiencia migrando a Antigravity`
`fix(ui): 🐛 Corregido margen en el footer`