---
title: "Git en Windows: renombrar un archivo cambiando solo el case"
slug: git-rename-case-windows
date: 2026-05-19 08:30:00 +0200
excerpt: "En Windows, cambiar solo el case de un nombre de archivo con Git no funciona con un simple mv ni con git mv directo. El sistema de archivos es case-insensitive y Git tiene core.ignorecase=true por defecto, así que simplemente ignora el cambio. La solución es un renombrado en dos pasos: primero a un nombre temporal y luego al nombre final. Te explico por qué ocurre, cómo solucionarlo y cuándo te vas a encontrar con este problema más de lo que crees."
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
  - Desarrollo Web
  - Sistemas
tags: [control-versiones, cli, desarrollo, terminal, buenas-practicas, sistemas-operativos]
image: /assets/img/headers/2026/git-rename-case-windows-nanobanana.webp
image_alt: "Terminal en Windows con comandos Git mostrando un renombrado de archivo con cambio de case"
toc: true
pin: false
twitter_description: "Git en Windows ignora los cambios de case en nombres de archivo. El truco del two-step rename y por qué ocurre."
description: "Git en Windows ignora renombrar archivos cambiando solo el case. Aprende el truco del two-step git mv para forzarlo correctamente. ¡Lee más!"
permalink: /:slug/
---

![{{ page.image_alt }}]({{ page.image }})

Estaba reorganizando los archivos de skills de este blog para que siguieran una convención uniforme: todos los archivos de instrucciones deberían llamarse `SKILL.md` con la S en mayúsculas. Algunos ya lo cumplían. Otros estaban en minúsculas: `skill.md`. Parecía un cambio trivial.

Hice el `git mv`, revisé el status... y no había pasado nada. El archivo seguía teniendo el mismo nombre. [Git](https://git-scm.com/){:target="_blank" rel="nofollow noopener"} no había registrado ningún cambio.

Si has llegado hasta aquí, probablemente te ha pasado lo mismo.

## Por qué Git ignora los cambios de case en Windows

El problema tiene dos capas:

**Primera capa: el sistema de archivos de Windows es case-insensitive.** Para Windows, `skill.md`, `Skill.md` y `SKILL.md` son el mismo archivo. Cuando ejecutas `mv skill.md SKILL.md`, el sistema operativo simplemente no hace nada porque interpreta que es el mismo destino.

**Segunda capa: Git tiene `core.ignorecase=true` por defecto en Windows.** Cuando Git inicializa un repositorio en Windows, activa esta opción automáticamente para adaptarse al comportamiento del sistema de archivos. Con esta configuración, Git no detecta cambios en el case de los nombres de archivo aunque ocurran.

El resultado es que el cambio se queda en tierra de nadie: ni el sistema operativo lo ejecuta, ni Git lo rastrea. El archivo sigue llamándose `skill.md` y tanto Windows como Git están completamente de acuerdo en que no ha pasado nada.

```bash
# Esto NO funciona en Windows
git mv .agents/skills/copywriting/skill.md .agents/skills/copywriting/SKILL.md

# git status no muestra ningún cambio
```

## La solución: el two-step rename

La técnica correcta consiste en hacer el renombrado en dos pasos. Primero se renombra el archivo a un nombre completamente diferente —un nombre temporal—, y luego se renombra ese archivo temporal al nombre final deseado.

```bash
# Paso 1: renombrar a un nombre temporal
git mv .agents/skills/copywriting/skill.md .agents/skills/copywriting/skill.md.tmp

# Paso 2: renombrar al nombre final
git mv .agents/skills/copywriting/skill.md.tmp .agents/skills/copywriting/SKILL.md
```

¿Por qué funciona? Porque en el primer paso sí hay un cambio de nombre real que tanto Windows como Git pueden registrar: de `skill.md` a `skill.md.tmp` son nombres distintos sin ambigüedad de case. Git lo anota como un rename. En el segundo paso ocurre lo mismo: de `skill.md.tmp` a `SKILL.md` también es un cambio claro.

El resultado final en el staging area de Git es un único rename de `skill.md` a `SKILL.md`, exactamente lo que buscabas desde el principio.

```bash
git status
# renamed: .agents/skills/copywriting/skill.md -> .agents/skills/copywriting/SKILL.md
```

## Cuando son varios archivos a la vez

Si tienes que renombrar múltiples archivos con el mismo patrón, puedes encadenar todos los comandos en un script o ejecutarlos en secuencia. En mi caso eran cinco archivos:

```bash
git mv ".agents/skills/copywriting/skill.md" ".agents/skills/copywriting/skill.md.tmp"
git mv ".agents/skills/copywriting/skill.md.tmp" ".agents/skills/copywriting/SKILL.md"

git mv ".agents/skills/copywriting/links/skill.md" ".agents/skills/copywriting/links/skill.md.tmp"
git mv ".agents/skills/copywriting/links/skill.md.tmp" ".agents/skills/copywriting/links/SKILL.md"

git mv ".agents/skills/SEO/skill.md" ".agents/skills/SEO/skill.md.tmp"
git mv ".agents/skills/SEO/skill.md.tmp" ".agents/skills/SEO/SKILL.md"
```

Tedioso, pero funciona de forma determinista. Tras cada par de comandos, el staging area de Git refleja un rename limpio.

## La alternativa: cambiar core.ignorecase

Existe otra forma: decirle a Git que deje de ignorar los cambios de case.

```bash
git config core.ignorecase false
```

Con esta configuración desactivada, Git sí detecta diferencias de case en los nombres de archivo. Puedes hacer el rename directamente:

```bash
# Con core.ignorecase=false esto sí funciona
git mv skill.md SKILL.md
```

Sin embargo, **esta opción tiene riesgos** que conviene conocer antes de activarla:

- En sistemas de archivos case-insensitive, puedes crear situaciones confusas donde Git cree que hay dos archivos distintos (`skill.md` y `SKILL.md`) pero el sistema operativo solo ve uno.
- Si el repositorio lo comparten desarrolladores en macOS, Linux y Windows, desactivar `core.ignorecase` en Windows puede generar comportamientos inconsistentes entre plataformas.
- Algunos flujos de trabajo de CI/CD asumen el comportamiento por defecto y pueden romperse.

Mi recomendación: **usa el two-step rename**. Es más verboso pero no toca la configuración del repositorio y no introduce sorpresas para el resto del equipo.

## Cuándo te encuentras con este problema

Este escenario es más habitual de lo que parece. Algunos casos reales:

**Convenciones de nombrado en proyectos:** Muchos proyectos tienen reglas sobre el case de los archivos. Los componentes de [React](https://react.dev/){:target="_blank" rel="nofollow noopener"} van en PascalCase (`Button.jsx`, no `button.jsx`). Los archivos de configuración suelen ir en mayúsculas (`README.md`, `CHANGELOG.md`, `LICENSE`). Si incorporas estas convenciones tarde en un proyecto, tendrás que renombrar varios archivos existentes.

**Unificación de naming en equipos:** Cuando un equipo adopta una guía de estilo nueva, es común encontrarse con archivos heredados que no la cumplen. La migración implica exactamente este tipo de renombrado.

**Refactoring de módulos:** Al reorganizar la estructura de un proyecto, mover módulos entre carpetas o ajustar la jerarquía puede incluir cambios de case en los nombres que de otra forma pasarían desapercibidos.

**Herramientas de generación de código:** Algunos scaffolders o generadores crean archivos con un case que luego quieres cambiar para seguir tu propia convención. Si el proyecto ya está en Git, el renombrado manual sin el two-step no llega al repositorio.

## Cómo verificar que el cambio se registró correctamente

Antes de hacer el commit, comprueba siempre con `git status` que el rename aparece como esperado:

```bash
git status
```

Deberías ver algo así:

```
Changes to be committed:
  renamed: .agents/skills/copywriting/skill.md -> .agents/skills/copywriting/SKILL.md
```

Si el staging area no muestra nada después del `git mv`, el cambio no se registró. En ese caso, asegúrate de que estás usando el two-step.

Una vez verificado, el commit es un rename limpio sin modificaciones de contenido:

```bash
git commit -m "refactor: rename skill.md to SKILL.md for naming consistency"
git push
```

En el historial de Git el archivo conserva toda su historia anterior. No es un delete + create, es un rename genuino. Esto es importante: mantener el historial del archivo intacto es mucho más valioso que cualquier alternativa que implique borrarlo y volver a crearlo.

## El caso de macOS y Linux

En macOS el sistema de archivos HFS+ es case-insensitive por defecto (igual que Windows), así que el problema existe en los mismos términos. El two-step funciona igual. Hay una excepción: si formateas el disco con APFS en modo "case-sensitive" (opción disponible desde macOS 10.13), el sistema sí distingue case y `git mv` directo funcionaría. Pero la mayoría de Macs usa el modo por defecto, que es case-insensitive.

En Linux el sistema de archivos es case-sensitive, por lo que `git mv skill.md SKILL.md` funciona directamente sin trucos adicionales. Si desarrollas principalmente en Linux y alguien del equipo trabaja en Windows, el cambio puede pasar inadvertido en su máquina aunque esté correctamente registrado en el repositorio. Esta inconsistencia es una fuente habitual de confusión en equipos con desarrolladores en ambas plataformas.

<section>

## Preguntas frecuentes

<details>
<summary>¿Por qué git mv no da ningún error si el renombrado no funciona?</summary>

Porque desde la perspectiva de Git el comando se ejecuta sin problemas: el archivo origen existe y el destino es un nombre válido. El hecho de que el sistema de archivos trate ambos nombres como el mismo no genera ningún error. Git simplemente no registra el cambio porque `core.ignorecase=true` le indica que ignore las diferencias de case.

</details>

<details>
<summary>¿El two-step mantiene el historial del archivo?</summary>

Sí. Git rastrea el contenido, no el nombre. El archivo renombrado conserva todo su historial de commits anterior. En `git log --follow SKILL.md` verás todos los cambios anteriores aunque el archivo se llamara `skill.md`.

</details>

<details>
<summary>¿Puedo hacer el two-step rename con mv normal en lugar de git mv?</summary>

No. Si usas `mv` del sistema operativo en lugar de `git mv`, tendrás que hacer `git add` del archivo nuevo y `git rm` del antiguo manualmente. Con `git mv` el staging se gestiona automáticamente y el resultado es un rename limpio, no un delete + add.

</details>

<details>
<summary>¿El problema ocurre también en GitHub o solo en local?</summary>

El repositorio en [GitHub](https://github.com/){:target="_blank" rel="nofollow noopener"} corre sobre Linux, que es case-sensitive. El problema es estrictamente local: ocurre cuando trabajas en Windows o macOS. Una vez que el rename está correctamente registrado en tu máquina y haces push, GitHub lo almacena con el nombre correcto.

</details>

</section>

---

Compártelo si te ha resultado útil.

Si tu empresa necesita implementar esto, [hablamos](https://marcosramirez.dev/contacto/){:target="_blank"}.

¿Te ha pasado algo parecido con Git en Windows? Deja un comentario y cuéntame.

Y... ¡hasta aquí por hoy!
