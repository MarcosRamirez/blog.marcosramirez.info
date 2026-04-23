---
name: git-commits
description: Instrucciones para redactar commits con Conventional Commits y Gitmojis.
---

## REGLAS OBLIGATORIAS
- **SIEMPRE** usar Conventional Commits.
- **SIEMPRE** incluir emoji después de los dos puntos.
- **NUNCA** hacer commit sin revisar con `git diff`.
- **SIEMPRE** usar el formato exacto:

  `<tipo>(<ámbito>): <emoji> <resumen>`

- **DESCRIPCIÓN LARGA** (cuerpo) **DEBE** ir después de **una línea en blanco** tras la descripción corta.

## Formato del mensaje
```
<tipo>(<ámbito>): <emoji> <resumen>

<cuerpo opcional (descripción larga)>
```

## Mapeo de tipos y emojis
- `fix`      → 🐛
- `docs`     → 📝
- `feat`     → ✨
- `style`   → 🎨
- `refactor`→ ♻️
- `content` → ✍️  *(solo para posts del blog)*
- `ui`      → 🎯
- `wip`     → 🛠️  *(trabajo en progreso, NO hacer push)*

## Regla especial para WIP
- **WIP = Work in Progress** (trabajo en progreso)
- **NUNCA hacer `git push`** con commits WIP
- WIP es solo para guardar localmente

## REGLAS DE ORO
1. Idioma: **español**.  
2. Tono: pasado participio (“Corregido”, “Añadido”).  
3. Longitud del resumen ≤ 50 caracteres.

## EJEMPLOS
```
fix(blog): 🐛 Corregido enlace roto

Se elimina el atributo `href` vacío y se actualiza la ruta al recurso correcto.
```

```
feat(api): ✨ Añadido endpoint de usuarios

Implementado `GET /api/users` con paginación y filtros por rol.
```

```
content(blog): ✍️ Mi experiencia migrando a Antigravity
```