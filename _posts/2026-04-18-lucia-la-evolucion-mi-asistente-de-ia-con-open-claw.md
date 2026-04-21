---
title: "Lucía: La evolución de mi asistente de IA con OpenClaw"
slug: lucia-asistente-open-claw
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-04-18 08:30:00 +0200
image: /assets/img/headers/lucia-asistente-open-claw.webp
categories: [Tecnología, Productividad y Hacks]
tags: [inteligencia-artificial, automatizacion, autoalojado, agentes, asistencia, chatbots]
pin: false
toc: true
excerpt: "Explico mi transición a OpenClaw para gestionar a Lucía, mi agente de IA autónomo. Analizo las ventajas de la soberanía digital: ejecuto modelos locales como GLM-5, Qwen 3, DeepSeek y Llama 4 a través de LM Studio y Ollama. Lucía ahora vive en WhatsApp, Discord y Telegram con contexto unificado, ejecuta tareas en segundo plano (redactar posts, gestionar correo, resumir YouTube, escribir código, administrar el Home Lab), y monitorea mi conexión a internet. El futuro de la IA personal no está en aplicaciones cerradas, sino en sistemas como OpenClaw que te devuelven el control."
twitter_description: "Lucía ahora corre en mi home lab con OpenClaw: soberanía digital, modelos locales y automatización total."
permalink: /:slug/ 
---

![Post Header]({{ page.image }})

# Más allá del chat: Automatización real

Desde que os hablé de Lucía en mi [Resumen de Febrero 2025]({% post_url 2025-03-01-resumen-febrero-2025 %}), su evolución no ha parado. Lo que empezó como un agente de voz para gestionar llamadas y citas, se ha convertido hoy en un sistema mucho más complejo y, sobre todo, **autónomo**.

La gran diferencia este año ha sido el cambio de motor: el paso a [OpenClaw](https://openclaw.ai/){:target="_blank"}.

## ¿Qué es OpenClaw y por qué es importante?

Si sigues el ecosistema de la Inteligencia Artificial, sabrás que la mayoría de los asistentes dependen totalmente de la nube de terceros. Si se cae OpenAI o si Anthropic cambia sus términos, tu asistente "muere" o cambia. 

**OpenClaw** es un proyecto de código abierto que actúa como una pasarela (gateway) de agentes de IA completamente autohospedada. Me permite ejecutar a Lucía en mi propio hardware, dándome tres ventajas críticas:

1.  **Soberanía Digital**: Yo decido qué modelo usa Lucía en cada momento. Desde que migré a modelos open source, corro modelos locales como GLM-5, Qwen 3, DeepSeek V3.2, Kimi K2.5 y Llama 4 a través de LM Studio y Ollama en mi propio servidor. Además, cuando necesito más potencia, puede usar APIs de estos mismos modelos a través de OpenRouter.
2.  **Multitarea Autónoma**: A diferencia de un chatbot tradicional, Lucía ahora puede ejecutar tareas en segundo plano: monitorizar mi correo, gestionar archivos en mi servidor o interactuar con APIs locales sin que yo tenga que iniciar la conversación.
3.  **Integración Omnicanal**: Gracias a la arquitectura de OpenClaw, Lucía ahora vive donde yo estoy: en WhatsApp, Discord y Telegram, manteniendo el contexto unificado en todos los canales.

## ¿Qué hace Lucía hoy?

Más allá de gestionar llamadas y citas, Lucía ahora me ayuda en tareas que antes me robaban horas:

- **Redactar posts**: Me ayuda a escribir artículos para el blog. Le doy los conceptos generales, ella investiga, busca información actualizada y genera borradores que luego pulir. Hoy incluso se ha ocupado de que todos mis posts cumplan con la estructura definida en el skill de copywriting, recuperando información de cuando migré de WordPress a Jekyll que ni me había dado cuenta de que estaba pérdida.

- **Gestión de correo**: Me resume los mails importantes y me prepara respuestas modelo, adaptándolas a mi estilo.

- **Youtube**: Me resume los vídeos de mis suscripciones para que pueda decidir cuáles ver sin perder tiempo.

- **Código**: Me ayuda a escribir y depurar código, desde scripts de automatización hasta configuración de contenedores.

- **Administración del Home Lab**: Monitoriza mi conexión a internet, gestiona Home Assistant y me alerta de problemas antes de que me dé cuenta.

- **Tareas rutinarias**: Cualquier tarea repetitiva que se pueda automatizar, Lucía la asume.

## El cerebro en casa (Home Lab)

Para los que me seguís por mis posts sobre Home Lab, os interesará saber que Lucía corre ahora en un contenedor dedicado dentro de mi infraestructura. No es solo un "juguete" técnico; es una herramienta que gestiona mis LEADS, filtra mis notificaciones y, sobre todo, protege mi tiempo.

La transición a OpenClaw me ha permitido "desacoplar" la lógica de negocio (quién es Lucía y qué debe hacer) de la plataforma de mensajería o el modelo de lenguaje subyacente. 

## Conclusión: El futuro es local

El futuro de la IA personal no está en aplicaciones cerradas que guardan tus datos en silos ajenos. Está en sistemas como OpenClaw que te devuelven el control. 

Lucía ya no es solo una voz al otro lado del teléfono; es un miembro más de mi flujo de trabajo digital, y lo mejor de todo es que el "cerebro" está en mi propia casa.

***
¿Y tú? ¿Estás listo para dejar de usar la IA de otros y empezar a construir la tuya? Déja un comentario o [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} qué tareas delegarías hoy mismo a un asistente autónomo.

Y... hasta aquí por hoy!
