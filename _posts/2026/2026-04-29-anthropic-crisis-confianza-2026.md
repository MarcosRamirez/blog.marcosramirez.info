---
title: "⚠️ ¿Qué está pasando con Anthropic? Crisis de confianza (Abril 2026)"
slug: "anthropic-crisis-confianza-2026"
date: 2026-04-29 08:30:00 +0200
excerpt: "Anthropic ha vivido un abril de 2026 para el olvido, con limitación de agentes gratuitos, cambios sin avisar en Claude Code, un nuevo tokenizador que encarece precios un 45% y errores de facturación como el caso Hermes. Repasamos una crisis de confianza que ha sacudido a la comunidad de desarrolladores este mes."
authors:
  - "Marcos Ramírez"
  - "Lucía"
categories: ["Tecnología", "Inteligencia Artificial"]
tags: ["tokenizador", "automatizacion", "ia"]
image: "/assets/img/headers/2026/anthropic-crisis-confianza-2026-nanobanana.webp"
image_alt: "Interfaz de Claude AI con mensajes de error y advertencias de confianza"
pin: false
toc: true
twitter_description: "Agentes caros, tests sin avisar y errores de facturación. Cronología de una crisis de confianza en Anthropic."
permalink: /:slug/
excerpt_separator: <!--more-->
description: "Anthropic vive crisis en abril 2026: agentes caros, tokenizador que sube precios y fallos de facturación. Cronología completa aquí. Lee más."
---

![{{ page.image_alt }}]({{ page.image }})

[Anthropic](https://www.anthropic.com/){:target="_blank" rel="nofollow noopener"}, que se posicionaba como la alternativa ética y transparente en el mundo de la [Inteligencia Artificial](https://es.wikipedia.org/wiki/Inteligencia_artificial){:target="_blank" rel="nofollow noopener"}, ha vivido un mes de abril para el olvido. Lo que muchos usuarios notaban como fallos aislados ha resultado ser una serie de decisiones y errores técnicos que han sacudido a la comunidad de desarrolladores.<!--more-->

Aquí tienes la cronología de lo sucedido este mes:

## 📅 4 de abril: El fin de los agentes "gratuitos"

Anthropic comenzó el mes limitando el uso de frameworks de agentes de terceros (como [OpenClaw](https://openclaw.ai/){:target="_blank" rel="nofollow noopener"}) bajo las suscripciones Pro y Max. Lo que antes era un "uso ilimitado" dentro de la cuota, pasó a requerir facturación por uso (API), encareciendo drásticamente los proyectos de automatización. Si quieres saber más sobre cómo uso OpenClaw en mi [propio servidor]({% post_url 2026/2026-04-18-lucia-asistente-open-claw %}){:target="_blank"}, puedes leer mi experiencia con Lucía.

## 📅 21 de abril: El polémico "Test A/B" de Claude Code

Sin previo aviso, la web de Anthropic eliminó el acceso a [Claude Code](https://claude.ai/code){:target="_blank" rel="nofollow noopener"} del plan Pro ($20), relegándolo al plan Max ($100).

Aunque el Head of Growth, Amol Avasare, afirmó que era un "test del 2%", la documentación oficial se cambió para todo el mundo.

La falta de comunicación transparente provocó una migración de usuarios hacia [OpenAI](https://openai.com/){:target="_blank" rel="nofollow noopener"}, que aprovechó el momento para lanzar campañas de captación.

## 📅 22 de abril: Opus 4.7 y el "impuesto silencioso" del tokenizador

Se lanza [Claude](https://claude.ai/){:target="_blank" rel="nofollow noopener"} 3.7 Opus, y con él, un nuevo tokenizador. Aunque el precio por millón de tokens se mantuvo igual, el nuevo sistema genera entre un 30% y un 45% más de tokens para el mismo texto en inglés. En la práctica, esto supone una subida de precio encubierta mientras la empresa presume de mantener tarifas.

## 📅 23 de abril: El "mea culpa" por el nerfeo del modelo

Tras semanas de quejas sobre la caída de calidad, Anthropic publicó un post-mortem admitiendo tres errores críticos que afectaron a las versiones 4.6 y 4.7:

**Razonamiento limitado:** Se configuró el esfuerzo de pensamiento en "medio" por defecto para reducir latencia, aunque el usuario viera "alto".

**Pérdida de memoria:** Un bug en el manejo del contexto hacía que Claude "olvidara" por qué estaba haciendo una tarea tras una hora de sesión.

**Código dañado:** Instrucciones en el system prompt para ser más conciso (ahorro de tokens) terminaron rompiendo la lógica de programación del modelo.

## 📅 El caso del cargo de $200 (El incidente Hermes)

A mediados de mes, se viralizó el error técnico donde un usuario fue facturado con $200 extra de forma automática. El sistema detectó la palabra "Hermes" en su historial de Git y, asumiendo erróneamente que violaba los términos de uso, le aplicó tarifas de API sobre su suscripción plana.

## Conclusión

Este abril de 2026 ha marcado un antes y un después. La presión por la falta de computación y la necesidad de rentabilidad están llevando a Anthropic a tomar decisiones que rozan lo cuestionable.

## Preguntas frecuentes

**¿Qué es Anthropic?**  
Anthropic es una empresa de Inteligencia Artificial creada por ex-empleados de OpenAI, conocida por desarrollar el modelo Claude.

**¿Qué fue el incidente Hermes?**  
Un error técnico donde el sistema de facturación detectó la palabra "Hermes" y aplicó cargos indebidos de API.

**¿Cómo afecta el nuevo tokenizador a los costes?**  
Genera entre un 30% y 45% más de tokens para el mismo texto, encareciendo el uso sin avisar.

***

Compártelo si te ha resultado útil.

¿Quieres implementar soluciones de IA en tu empresa? [Hablemos de tu proyecto](https://marcosramirez.info/contacto/){:target="_blank" rel="nofollow noopener"}.

Y... hasta aquí por hoy!
