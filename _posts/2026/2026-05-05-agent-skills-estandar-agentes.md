---
title: "Agent Skills: el estándar que enseña a tus agentes cómo trabajar"
slug: agent-skills-estandar-agentes
date: 2026-05-05 08:30:00 +0200
excerpt: "Agent Skills es el formato abierto que permite a cualquier agente de Inteligencia Artificial cargar conocimiento especializado bajo demanda: desde cómo escribir en tu blog hasta cómo cerrar un artículo con el CTA correcto. Un skill es simplemente una carpeta con un fichero SKILL.md, pero la idea detrás es poderosa: separar el conocimiento del agente de la herramienta que lo ejecuta. Adoptado por más de treinta herramientas —incluyendo Claude Code, Cursor, GitHub Copilot y Gemini CLI— está convirtiéndose en el estándar de facto. En este post explico cómo funciona, presento el ecosistema en agentskills.io y el directorio de skills.sh, y cuento cómo llevo meses usándolo en este blog sin saber que tenía nombre. Incluyo ejemplos reales del sistema de skills del blog: desde subskills jerárquicos de copywriting hasta un skill de captación de clientes sin una sola línea de código."
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
  - Inteligencia Artificial
  - Software y Apps
  - Automatización
tags: [inteligencia-artificial, agentes, claude-code, cursor, automatizacion, open-source, developer-tools]
image: /assets/img/headers/2026/agent-skills-estandar-agentes-nanobanana.webp
image_alt: "Múltiples agentes de Inteligencia Artificial cargando módulos de conocimiento especializado desde una biblioteca digital"
toc: true
pin: false
twitter_description: "Cómo Agent Skills estandariza el conocimiento de agentes de Inteligencia Artificial. El formato abierto compatible con Claude Code, Cursor y GitHub Copilot."
description: "Agent Skills estandariza cómo los agentes de Inteligencia Artificial aprenden. Descubre el formato que usan Claude Code, Cursor y Copilot hoy. Lee más."
permalink: /:slug/
---

![{{ page.image_alt }}]({{ page.image }})

Llevo años usando agentes de código a diario: [Claude Code](https://claude.ai/code){:target="_blank" rel="nofollow noopener"}, [Cursor](https://cursor.com/){:target="_blank" rel="nofollow noopener"}, [GitHub Copilot](https://github.com/features/copilot){:target="_blank" rel="nofollow noopener"}... Cada uno tiene sus puntos fuertes, pero todos comparten el mismo problema: no saben nada de tu proyecto hasta que les explicas cómo funciona todo. Y si cambias de herramienta, empiezas de cero.

El resultado es que acabas repitiendo las mismas instrucciones, en diferentes formatos, a diferentes herramientas. "Mi blog usa Jekyll. Los posts van en `_posts/YYYY/`. El slug debe tener entre 3 y 5 palabras. No uses 'IA', escribe siempre 'Inteligencia Artificial'." Una y otra vez.

Agent Skills resuelve exactamente este problema.

## Qué son los Agent Skills

[Agent Skills](https://agentskills.io/home){:target="_blank" rel="nofollow noopener"} es un formato abierto para extender la capacidad de los agentes de Inteligencia Artificial con conocimiento especializado. La idea es sencilla: empaquetar instrucciones, workflows y recursos en una carpeta portable que cualquier agente compatible pueda cargar cuando la necesite.

El formato fue desarrollado originalmente por [Anthropic](https://www.anthropic.com/){:target="_blank" rel="nofollow noopener"} para Claude Code, y desde entonces se ha convertido en un estándar abierto adoptado por más de treinta herramientas del ecosistema de Inteligencia Artificial.

Lo que me parece relevante de la propuesta es que **separa el conocimiento del agente**. No le estás enseñando a una herramienta específica cómo funciona tu empresa: le estás creando un skill reutilizable que cualquier agente compatible puede usar. Creas una vez, usas en todas partes.

## Cómo funciona un skill

Un skill es, en esencia, una carpeta. Dentro, un fichero `SKILL.md` obligatorio y, opcionalmente, scripts, referencias, plantillas y cualquier recurso que el agente pueda necesitar:

```
mi-skill/
├── SKILL.md          # Obligatorio: metadatos + instrucciones
├── scripts/          # Opcional: código ejecutable
├── references/       # Opcional: documentación de referencia
└── assets/           # Opcional: plantillas y recursos
```

El fichero `SKILL.md` necesita, como mínimo, dos campos de metadatos: `name` y `description`. El resto son instrucciones en texto libre para el agente:

```markdown
---
name: jekyll
description: Rules for writing Jekyll posts with the Chirpy theme.
---

# Instructions
Posts go in _posts/YYYY/. Frontmatter requires title, slug, date...
```

Aquí está el detalle técnico que hace que todo esto funcione bien en la práctica: los agentes cargan los skills en **tres fases**.

**Fase 1 — Discovery:** Al arrancar, el agente lee únicamente el `name` y la `description` de cada skill disponible. Una carga mínima: sabe que existe un skill de Jekyll, pero no ha cargado las instrucciones completas.

**Fase 2 — Activation:** Cuando una tarea coincide con la descripción de un skill, el agente carga el `SKILL.md` completo en contexto. Solo entonces lee todas las instrucciones.

**Fase 3 — Execution:** El agente ejecuta la tarea siguiendo esas instrucciones, con acceso a los scripts o recursos adicionales incluidos en el skill.

Este enfoque de **carga progresiva** es elegante: puedes tener decenas de skills disponibles sin que ocupen contexto innecesariamente. El agente carga solo lo que necesita, cuando lo necesita.

## El estándar: agentskills.io

[Agentskills.io](https://agentskills.io/home){:target="_blank" rel="nofollow noopener"} es el hogar oficial del estándar: documentación, especificación completa y lista de herramientas compatibles.

La especificación es deliberadamente minimalista. No te obliga a usar ningún lenguaje de programación, ninguna estructura interna específica ni ningún formato de instrucciones concreto. El único requisito es que la carpeta tenga un `SKILL.md` con `name` y `description` en el frontmatter. El resto lo decides tú.

El desarrollo es abierto. Puedes contribuir al estándar en su repositorio de [GitHub](https://github.com/agentskills/agentskills){:target="_blank" rel="nofollow noopener"} o unirte a las discusiones en su [Discord](https://discord.gg/MKPE9g8aUy){:target="_blank" rel="nofollow noopener"}.

En cuanto al soporte de herramientas, la lista crece rápido. A día de hoy son compatibles: [Claude Code](https://claude.ai/code){:target="_blank" rel="nofollow noopener"}, [Cursor](https://cursor.com/){:target="_blank" rel="nofollow noopener"}, [GitHub Copilot](https://github.com/features/copilot){:target="_blank" rel="nofollow noopener"}, [Gemini CLI](https://geminicli.com){:target="_blank" rel="nofollow noopener"}, [OpenAI Codex](https://developers.openai.com/codex){:target="_blank" rel="nofollow noopener"}, [VS Code](https://code.visualstudio.com/){:target="_blank" rel="nofollow noopener"}, [Roo Code](https://roocode.com){:target="_blank" rel="nofollow noopener"}, [OpenHands](https://openhands.dev/){:target="_blank" rel="nofollow noopener"}, [Goose](https://block.github.io/goose/){:target="_blank" rel="nofollow noopener"}, [Amp](https://ampcode.com/){:target="_blank" rel="nofollow noopener"}, [Letta](https://www.letta.com/){:target="_blank" rel="nofollow noopener"}, [Spring AI](https://docs.spring.io/spring-ai/reference){:target="_blank" rel="nofollow noopener"} y muchos más.

## El directorio: skills.sh

Si agentskills.io es la especificación, [skills.sh](https://skills.sh/){:target="_blank" rel="nofollow noopener"} es el marketplace.

Construido por [Vercel](https://vercel.com/){:target="_blank" rel="nofollow noopener"}, [skills.sh](https://skills.sh/){:target="_blank" rel="nofollow noopener"} funciona como una combinación de leaderboard y repositorio de skills. Puedes buscar por categoría, ver cuáles son los más populares y, lo más importante, instalar cualquier skill desde la terminal:

```bash
npx skillsadd <owner/repo>
```

Los números que vi cuando lo exploré dan una idea de la tracción que está cogiendo el ecosistema: más de 90.000 instalaciones registradas, con skills de React, diseño frontend y Azure AI entre los más descargados.

Los publishers más activos incluyen [Microsoft](https://microsoft.com/){:target="_blank" rel="nofollow noopener"}, [Anthropic](https://www.anthropic.com/){:target="_blank" rel="nofollow noopener"}, [Vercel](https://vercel.com/){:target="_blank" rel="nofollow noopener"} y [Firebase](https://firebase.google.com/){:target="_blank" rel="nofollow noopener"}. La variedad es amplia: skills para frameworks de frontend, cloud, testing, marketing, buenas prácticas de desarrollo...

La idea de tener un punto central donde descubrir y compartir skills tiene mucho sentido. El ecosistema de agentes de Inteligencia Artificial está creciendo tan rápido que sin algún mecanismo de descubrimiento se convierte rápidamente en un problema de "¿y cómo sé qué skills existen?".

## Por qué me interesa esto (y ya lo uso)

Aquí viene la parte que no es teórica.

Este blog lleva meses funcionando con Agent Skills, antes incluso de que yo supiera que el concepto tenía ese nombre. Todo el sistema de trabajo de [Lucía]({% post_url 2026/2026-04-18-lucia-asistente-open-claw %}){:target="_blank"}, mi agente de Inteligencia Artificial que co-escribe y gestiona el blog, está basado en skills definidos en la carpeta `.agents/skills/`.

Hay un skill de copywriting que define cómo escribir artículos, qué categorías existen, cuándo usar emojis y cuál es la voz del blog — y tiene subskills especializados para investigación previa (`copywriting/research`), inserción correcta de enlaces (`copywriting/links`) y revisión ortográfica y de estilo (`copywriting/proofreading`). Hay un skill de SEO que establece límites de caracteres para títulos y descripciones, reglas de slugs y estructura de encabezados. Hay un skill de Jekyll que especifica el formato exacto del frontmatter, la ruta de las imágenes y cómo usar `{% post_url %}`. Hay un skill de git para los mensajes de commit. Hay un skill para generar imágenes de cabecera.

Y luego está el que más me gusta como ejemplo: `lead-capture`. No tiene nada que ver con código. Define el catálogo de servicios que ofrezco, el perfil del cliente ideal, un sistema de cuatro niveles para elegir el tipo de CTA correcto según el tema del post (BUSINESS, SOFT, COMMUNITY o SILENT) y una biblioteca de textos listos para usar en español. Cuando Lucía termina de escribir un artículo, carga ese skill para saber si el post necesita un enlace de contacto, qué tipo, y exactamente qué texto usar. Sin el skill, esto requeriría reexplicarlo cada vez.

Cada skill es independiente y se carga solo cuando la tarea lo requiere. Si Lucía está generando una imagen, carga el skill `create-images`. Si está revisando el texto, carga `proofreading`. Si va a añadir un enlace externo, carga `copywriting/links`. Si necesita determinar el cierre correcto del artículo, carga `lead-capture`. Si va a hacer un commit, carga `git`. El resto del tiempo, esos ficheros no están en contexto.

Lo que antes era "tengo un montón de instrucciones pegadas en un fichero de sistema de una herramienta específica" ahora es "tengo una biblioteca de conocimiento portable que funciona en cualquier herramienta compatible con el estándar".

Y eso cambia bastante cómo pienso en la configuración de agentes. Ya no configuro una herramienta: configuro un flujo de trabajo. La herramienta que use en cada momento es casi un detalle de implementación.

## La clave: portabilidad sin fricción

El movimiento más interesante que está haciendo Agent Skills no es técnico sino estratégico: **desacoplar el conocimiento de la herramienta**.

Cuando construyes skills bien escritos, el conocimiento de cómo funciona tu proyecto no queda atrapado en la configuración de Cursor ni en el system prompt de Claude Code. Está en una carpeta de tu repositorio, versionada con git, que puedes llevar contigo.

Si mañana aparece una herramienta mejor que las actuales, tus skills siguen siendo válidos. Si trabajas en equipo, todos los miembros pueden usar los mismos skills independientemente del agente que usen. Si tienes un cliente con flujos de trabajo específicos, puedes entregar los skills junto con el código.

Es el mismo principio que llevó a adoptar formatos como Markdown, JSON o Docker: cuando el formato es abierto y simple, el ecosistema crece más rápido que cuando está controlado por un único vendor.

## Preguntas frecuentes

<details>
<summary>¿Qué herramientas son compatibles con Agent Skills?</summary>

Más de treinta a día de hoy: Claude Code, Cursor, GitHub Copilot, Gemini CLI, OpenAI Codex, VS Code, Roo Code, Amp, OpenHands, Goose, Letta, Spring AI, Firebender y muchas más. La lista completa está en [agentskills.io](https://agentskills.io/home){:target="_blank" rel="nofollow noopener"}.

</details>

<details>
<summary>¿Necesito saber programar para crear un skill?</summary>

No. Un skill básico es solo texto en un fichero Markdown. Defines `name` y `description` en el frontmatter y escribes las instrucciones en lenguaje natural. Si quieres añadir scripts ejecutables, puedes, pero no es obligatorio.

</details>

<details>
<summary>¿Puedo crear skills para flujos de trabajo que no son de código?</summary>

Sí, y eso es parte de lo que hace interesante al formato. En este blog, por ejemplo, hay un skill de `lead-capture` que no tiene nada que ver con programación: define el catálogo de servicios, el perfil del cliente ideal y un sistema de niveles para elegir el tipo de CTA correcto al final de cada artículo. Más allá del desarrollo, un skill puede codificar cualquier proceso con pasos bien definidos: el tono de comunicación de tu empresa, una checklist de revisión editorial, el formato de tus informes. El único requisito es que sea algo que puedas describir con instrucciones.

</details>

<details>
<summary>¿Cómo instalo un skill desde skills.sh?</summary>

Con un comando en la terminal: `npx skillsadd <owner/repo>`. El directorio en [skills.sh](https://skills.sh/){:target="_blank" rel="nofollow noopener"} muestra el identificador exacto de cada skill para que puedas copiarlo directamente.

</details>

---

Compártelo si te ha resultado útil.

¿Estás construyendo agentes o flujos de trabajo con Inteligencia Artificial en tu empresa? [Cuéntame en qué estás trabajando](https://marcosramirez.info/contacto/){:target="_blank"} — es un área en la que llevo tiempo profundizando.

Y... hasta aquí por hoy!
