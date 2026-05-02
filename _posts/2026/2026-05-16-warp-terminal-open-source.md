---
title: "Warp abre su código fuente: lo que cambia para los devs"
slug: warp-terminal-open-source
date: 2026-05-16 08:30:00 +0200
excerpt: "Warp, el terminal que uso a diario, acaba de abrir su cliente bajo licencia AGPL. El repositorio acumuló 35.000 estrellas en menos de 24 horas. Pero Oz, el motor de agentes en la nube, sigue siendo propietario. Analizo qué significa este movimiento para quienes vivimos en la terminal, la polémica con Alacritty y si es suficiente o solo marketing."
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
  - Software y Apps
  - Sistemas
tags: [terminal, open-source, developer-tools, sistemas]
image: /assets/img/headers/2026/warp-terminal-open-source-nanobanana.webp
image_alt: "Terminal Warp con código fuente abierto en pantalla de desarrollador"
toc: true
pin: false
twitter_description: "Warp abre su código bajo AGPL. El cliente es libre, Oz sigue propietario. ¿Es suficiente para los devs?"
permalink: /:slug/
description: "Warp abre su código fuente bajo AGPL: cliente libre, Oz propietario. Análisis honesto de lo que cambia para los devs que usamos Warp a diario. Descúbrelo."
---

![{{ page.image_alt }}]({{ page.image }}){:alt="Terminal Warp con código fuente abierto en pantalla de desarrollador"}

Llevo más de un año usando [Warp](https://app.warp.dev/referral/PNMP8M){:target="_blank" rel="sponsored nofollow noopener"} como terminal principal. No fue una decisión meditada: lo probé, me acostumbré a sus bloques de comandos, a cómo puedes seleccionar la salida de un proceso como si fuera texto normal en un editor y... ya no volví atrás. Es uno de esos programas que cambia cómo trabajas sin que te des cuenta.

El 28 de abril de 2026, Warp anunció algo que muchos llevaban tiempo pidiendo: el cliente es ahora open source.

## Qué cambió exactamente

El [repositorio público de Warp](https://github.com/warpdotdev/warp){:target="_blank" rel="nofollow noopener"} está activo desde el 28 de abril. El cliente —la aplicación de terminal que ejecutas en tu máquina— está disponible bajo licencia **AGPLv3**, con el framework de interfaz bajo **MIT**. En menos de 24 horas acumuló más de 35.000 estrellas en GitHub, superando las 41.000 poco después.

Lo que ahora está en el repositorio:

- El código completo del cliente de terminal
- El framework de UI (MIT)
- El sistema de configuración y settings programáticos
- Soporte para nuevos modelos de código abierto: [Kimi](https://kimi.ai/){:target="_blank" rel="nofollow noopener"}, [MiniMax](https://www.minimax.io/){:target="_blank" rel="nofollow noopener"}, [Qwen](https://qwenlm.github.io/){:target="_blank" rel="nofollow noopener"} y routing automático "auto (open)"

Lo que **no** está en el repositorio:

- **Oz**: la plataforma de orquestación de agentes en la nube
- La infraestructura de servidor y servicios de sincronización
- Los servicios de equipo y funcionalidades comerciales

Este punto es importante y vuelvo a él en el análisis.

## Por qué uso Warp a diario

Antes del análisis, contexto: uso Warp como terminal principal en macOS para todo el trabajo de desarrollo. [Claude Code](https://claude.ai/code){:target="_blank" rel="nofollow noopener"}, git, Docker, SSH a mis contenedores LXC en [Proxmox]({% post_url 2026/2026-05-11-mi-decision-de-usar-proxmox %}){:target="_blank"}... todo pasa por Warp.

Lo que me tiene enganchado:

**Los bloques de comandos.** Cada comando ejecutado es un bloque independiente con su entrada y salida. Puedo copiar la salida de un proceso concreto sin seleccionar texto con cuidado. Puedo compartir un bloque entero con un enlace. Parece pequeño hasta que llevas años haciendo `Cmd+A` en iTerm para copiar todo.

**El historial inteligente.** Warp agrupa los comandos en sesiones de trabajo y los hace buscables por contenido, no solo por orden cronológico. Cuando necesito encontrar el comando exacto que usé hace tres semanas para configurar un contenedor LXC, lo encuentro.

**La edición multi-cursor en la línea de comandos.** Sí, multi-cursor como en VS Code, pero en el prompt del terminal. Para editar un comando largo con múltiples argumentos similares es una ventaja real.

**Warp Drive.** Flujos de trabajo guardados que puedes reutilizar. Los tengo configurados para secuencias de despliegue, mantenimiento de contenedores y comandos de [Proxmox]({% post_url 2026/2026-05-13-comandos-basicos-proxmox %}){:target="_blank"}.

No uso las funcionalidades de Inteligencia Artificial integradas de Warp. Las tengo desactivadas —gestiono los agentes directamente desde Claude Code— pero entiendo que para muchos esa integración es el valor diferencial.

## El modelo de contribución con agentes: Oz

El anuncio introduce una forma de contribuir que no había visto antes en open source: los usuarios proponen ideas y las verifican, pero los agentes del sistema Oz se encargan de la implementación.

El proceso funciona así:

1. Un usuario abre una issue en GitHub con un problema o mejora
2. Un mantenedor la etiqueta como "ready-to-spec" o "ready-to-implement"
3. El agente de Oz toma la especificación y genera el código
4. Un revisor humano verifica el resultado antes del merge

La tesis de Warp es que **especificar y verificar son el cuello de botella, no implementar**. Los agentes son rápidos generando código; los humanos aportan valor definiendo qué debe hacer ese código.

[OpenAI](https://openai.com/){:target="_blank" rel="nofollow noopener"} es el patrocinador fundador del repositorio y proporciona los modelos GPT que alimentan Oz. El modelo de desarrollo propuesto es inusual pero coherente con la dirección que están tomando muchas empresas de desarrollo: los agentes hacen el código, los humanos hacen la arquitectura y la revisión.

## La polémica con Alacritty

No puedo escribir sobre este anuncio sin mencionar la controversia que generó en [Hacker News](https://news.ycombinator.com/item?id=47937349){:target="_blank" rel="nofollow noopener"}.

Warp está construido sobre una bifurcación de [Alacritty](https://alacritty.org/){:target="_blank" rel="nofollow noopener"}, el terminal open source de alto rendimiento escrito en Rust. La crítica de la comunidad fue directa: Warp tomó ese trabajo, captó 50 millones de dólares en financiación y no contribuyó económicamente al proyecto del que partió.

El propio mantenedor de Alacritty respondió en el hilo sin mostrar resentimiento. Pero la comunidad de código abierto es sensible a estos patrones —y tiene razón en serlo.

Que Warp haya abierto su cliente ahora no borra ese historial. Sí lo mitiga. Y abrir bajo AGPL es una señal de que no pretenden repetir el movimiento con el código del cliente.

Hay otra crítica válida en Hacker News: el onboarding agresivo de Warp, con popups de upsell para Oz difíciles de ignorar, ha generado fricción en usuarios que solo quieren un terminal. Es un equilibrio difícil entre monetización y experiencia de usuario, y Warp no siempre lo ha gestionado bien.

## ¿Es suficiente? Mi análisis

La respuesta honesta: **depende de lo que esperes**.

Si esperas un terminal completamente libre donde puedas autoalojar todo, Warp no es eso. Oz sigue siendo propietario. La experiencia de agentes —que es el núcleo de la propuesta de valor actual de Warp— vive en servidores de la empresa. El cliente abierto sin Oz es un terminal excelente, pero sin las funcionalidades diferenciales en Inteligencia Artificial.

Si lo que te preocupa es la transparencia del código del cliente —poder auditar qué hace la aplicación en tu máquina, poder contribuir a mejoras, poder hacer un fork— entonces sí, este movimiento tiene valor real.

Personalmente, lo que me genera más confianza no es la licencia AGPL en sí, sino el hecho de que ahora puedo ver el código de lo que ejecuto a diario. Y que si Warp decide ir en una dirección que no me convence, existe la posibilidad de un fork mantenido por la comunidad.

Eso no era posible hace una semana.

| Componente | Estado |
|---|---|
| Cliente de terminal | Open source (AGPLv3) |
| Framework de UI | Open source (MIT) |
| Oz (orquestación de agentes) | Propietario |
| Infraestructura de servidor | Propietario |
| Servicios de equipo | Propietario |

## Alternativas en el mercado

Para contexto, las otras opciones sólidas en terminales modernos:

- [iTerm2](https://iterm2.com/){:target="_blank" rel="nofollow noopener"} — el estándar histórico en macOS, completamente libre
- [Ghostty](https://ghostty.org/){:target="_blank" rel="nofollow noopener"} — el terminal de [Mitchell Hashimoto](https://mitchellh.com/){:target="_blank" rel="nofollow noopener"}, open source, escrito en Zig, muy rápido
- [Alacritty](https://alacritty.org/){:target="_blank" rel="nofollow noopener"} — minimalista, acelerado por GPU, totalmente libre
- [WezTerm](https://wezfurlong.org/wezterm/){:target="_blank" rel="nofollow noopener"} — configurable con Lua, open source, multiplataforma

Si valoras la libertad total y el control completo, Ghostty o iTerm2 son más consistentes con esos valores. Si valoras la productividad y el ecosistema de bloques de Warp, el cliente abierto es una buena noticia.

Yo sigo con Warp. No porque sea perfecto, sino porque todavía no he encontrado nada que replique la fluidez de sus bloques de comandos y el historial inteligente.

<section>

## Preguntas frecuentes

<details>
<summary>¿Puedo usar Warp sin cuenta ahora que es open source?</summary>

No. El login sigue siendo necesario para sincronizar configuración y para las funcionalidades de Warp Drive. Sin embargo, ahora puedes compilar el cliente desde el código fuente si prefieres no usar los binarios oficiales.

</details>

<details>
<summary>¿La licencia AGPL afecta a cómo uso Warp en mi trabajo?</summary>

No, si usas Warp como herramienta. La AGPL solo obliga a publicar el código modificado si distribuyes el software o lo sirves como un servicio de red. Para uso personal y profesional como terminal, no hay ninguna restricción.

</details>

<details>
<summary>¿Funciona Warp en Linux ahora que es open source?</summary>

El soporte oficial es macOS y Windows. El cliente open source abre la puerta a ports a Linux mantenidos por la comunidad, pero a día de hoy no hay un port oficial estable para Linux.

</details>

<details>
<summary>¿Es Ghostty mejor que Warp para desarrollo?</summary>

Depende del flujo de trabajo. Ghostty es más rápido, minimalista y completamente libre. Warp ofrece más funcionalidades de productividad: bloques de comandos, historial inteligente y Warp Drive. Para un terminal limpio y rápido, Ghostty. Para las funcionalidades de productividad, Warp.

</details>

</section>

---

*Este artículo contiene enlaces de afiliado.*

¿Cambiarás a Warp ahora que es open source, o ya lo usabas? Déjame un comentario abajo.

Y... hasta aquí por hoy!
