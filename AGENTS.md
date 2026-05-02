# AGENTS.md - Blog Marcos Ramírez

## Contexto del Usuario
Para información personal sobre Marcos (ubicación, equipo, software, Home Lab, preferencias), leer:
- `.context/user.md` - Información personal y preferencias
- `.context/machine.md` - Especificaciones del equipo
- `.context/software.md` - Herramientas de desarrollo
- `.context/location.md` - Ubicación y timezone
- `.context/home-lab.md` - Configuración del Home Lab

**IMPORTANTE:** Antes de asumir anything sobre el usuario o su entorno, consultar estos archivos. No inventar información.

## Tech Stack
- Jekyll + Chirpy theme
- GitHub Pages (build automático en push)
- Posts en `_posts/`, fecha-nombre.slug.md

## Build & Deploy
- No hay commands locales. Push a `master` → GitHub Actions genera el sitio en `_site/` y lo despliega.
- URL final: `https://blog.marcosramirez.info`

## Commits
- Usar skill `.agents/skills/git`
- Formato: `<tipo>(<ámbito>): <emoji> <resumen>`
-Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `content`

## Skills
- `.agents/skills/git` - Commits
- `.agents/skills/copywriting` - Posts (author Lucía, front matter, programación)