---
title: "De VAPI a Retell: la migración que se llevó media arquitectura"
slug: de-vapi-a-retell-migracion-agente-de-voz
date: 2026-05-21 08:30:00 +0200
excerpt: "Cuento cómo integré VAPI en marcosramirez.dev para tener un agente de voz en la web, por qué migré a Retell cinco días después, y cómo esa decisión arrastró consigo un cambio de arquitectura completo: de Cloudflare Pages a Cloudflare Workers, pasando por SSR, rutas de API y gestión segura de tokens. La historia de cómo una sola dependencia puede cambiar toda tu infraestructura."
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
  - Inteligencia Artificial
  - Desarrollo Web
tags: [agentes-de-voz, vapi, retell, cloudflare-workers, astro, inteligencia-artificial, desarrollo-web]
image: /assets/img/headers/2026/de-vapi-a-retell-migracion-agente-de-voz-nanobanana.webp
image_alt: "Representación visual de dos plataformas de voz conectadas por un flujo de migración, fondo oscuro tech con ondas de sonido digitales"
toc: true
pin: false
twitter_description: "Integré VAPI en mi web, migré a Retell 5 días después, y eso arrastró SSR, API routes y Cloudflare Workers. Te cuento por qué."
description: "Migré de VAPI a Retell AI en marcosramirez.dev por seguridad. Esa decisión arrastró SSR, rutas de API y una migración completa a Cloudflare Workers."
permalink: /:slug/
---

![{{ page.image_alt }}]({{ page.image }})

## El botón verde del teléfono

Si has visitado [marcosramirez.dev](https://marcosramirez.dev){:target="_blank"} recientemente, habrás visto un botón flotante verde en la esquina inferior derecha. Es un botón de llamada. Lo pulsas y te contesta un agente de voz: Lucía. Te puede explicar qué hago, qué servicios ofrezco, responder preguntas frecuentes o ayudarte a concertar una cita.

Lo que no se ve desde fuera es todo lo que hubo que construir (y reconstruir) para que ese botón funcionase. Esta es esa historia.

## El plan inicial: VAPI

Cuando decidí añadir un agente de voz a la web, la primera opción fue [VAPI](https://vapi.ai/){:target="_blank" rel="nofollow noopener"}. VAPI es una plataforma para construir agentes de voz impulsados por Inteligencia Artificial: conectas tu LLM, defines la personalidad del agente, y tienes una infraestructura lista para gestionar llamadas en tiempo real con menos de 500ms de latencia. 1.000 millones de llamadas procesadas, más de 2,5 millones de agentes desplegados. La propuesta es sólida.

La integración en una web Astro era sencilla: instalar `@vapi-ai/web`, instanciar la clase, llamar a `vapi.start()` en el click del botón. Tres estados: idle (verde), loading (amarillo), active (rojo). Click para llamar, click para colgar. Todo en el cliente.

Funcionaba. Pero tenía un problema que no tardé en ver.

## El problema: la clave de API en el cliente

Para que el SDK de VAPI funcione en el navegador necesita tu API key. Y esa API key vive en el JavaScript que se descarga cualquier visitante de tu página.

Sí. Expuesta. En el bundle.

Para muchos casos eso puede ser aceptable —hay plataformas que diseñan explícitamente para este flujo—, pero en cuanto empiezas a pensar en costes de llamadas, en quién podría extraer esa clave y usarla para sus propios agentes, el confort desaparece.

## La alternativa: Retell

[Retell AI](https://www.retellai.com/){:target="_blank" rel="nofollow noopener"} es una plataforma para agentes de voz conversacionales con ~600ms de latencia, cumplimiento HIPAA y SOC2 Type II. Competidora directa de VAPI, pero con diferencias técnicas relevantes.

La más importante para mi caso: **Retell no está atado a OpenAI**. VAPI en la práctica empuja hacia los modelos de [OpenAI](https://openai.com/){:target="_blank" rel="nofollow noopener"} —su integración más madura y documentada—. Retell es agnóstico: puedes conectar cualquier LLM compatible, incluidos modelos abiertos como [Llama](https://llama.meta.com/){:target="_blank" rel="nofollow noopener"}, [Mistral](https://mistral.ai/){:target="_blank" rel="nofollow noopener"} o cualquier proveedor que soporte la interfaz estándar. Para quien ya trabaja con [Anthropic](https://anthropic.com/){:target="_blank" rel="nofollow noopener"}, [DeepSeek](https://www.deepseek.com/){:target="_blank" rel="nofollow noopener"} o modelos locales vía [OpenRouter](https://openrouter.ai/){:target="_blank" rel="nofollow noopener"}, eso cambia el escenario completamente.

La seguridad fue un motivo para cambiar, pero no el único. Retell es técnicamente superior en varios frentes: flexibilidad de LLM, arquitectura de autenticación correcta y una latencia más consistente en producción. Pero donde más se nota la diferencia es en las herramientas de desarrollo de agentes: Retell tiene una capa de gestión del asistente —a nivel de system prompt, turn-taking, interrupciones, manejo de silencio— que VAPI no alcanza. Configurar cómo se comporta el agente en conversación, cómo gestiona los turnos de voz y cómo responde a situaciones inesperadas es notablemente más fino en Retell. Para quien construye agentes que tienen que sonar naturales en una llamada real, eso importa.

La diferencia arquitectónica en el SDK web está en cómo se inicia una llamada. Retell no expone la API key al cliente. En su lugar, el flujo es:

1. El navegador llama a **tu propio endpoint** (`/api/retell/create-call`)
2. Tu servidor hace la petición a Retell con la API key (que solo existe en el servidor)
3. Retell devuelve un **access token de un solo uso**
4. El cliente usa ese token para iniciar la llamada

La API key nunca sale de tu servidor. El cliente solo ve un token efímero.

Es más complejo. Pero es correcto.

## El efecto domino

Aquí empieza la parte interesante. Porque migrar de VAPI a Retell no fue solo cambiar una dependencia.

### Paso 1: Necesito SSR

Para tener un endpoint `/api/retell/create-call` en Astro necesito rutas de servidor. Astro por defecto genera sitios estáticos: todo se compila a HTML/CSS/JS en build time y no hay servidor que ejecute código. Necesitaba cambiar a modo `output: 'server'` (SSR).

Eso requería un adaptador. En mi caso, `@astrojs/cloudflare`, porque el sitio está desplegado en Cloudflare.

### Paso 2: Cloudflare Pages no era suficiente

Una vez añadido el adaptador y configurado SSR, desplegué en Cloudflare Pages —donde ya estaba el sitio— y la ruta `/api/retell/create-call` devolvía 404.

El problema: Cloudflare Pages tiene soporte SSR, pero con limitaciones. Para rutas de API que dependen de secrets de entorno en tiempo de ejecución, Pages puede ser caprichoso. La solución correcta era migrar a **Cloudflare Workers**, que es el entorno en el que `@astrojs/cloudflare` funciona de forma nativa y sin sorpresas.

### Paso 3: Migración de Pages a Workers

Cloudflare Workers es el runtime de Cloudflare: código JavaScript (o WebAssembly) que se ejecuta en el edge, cerca del usuario. Es lo que Pages usa internamente para sus funciones, pero con acceso completo y sin las restricciones de la abstracción.

La migración implicó:
- Configurar `wrangler.json` para Workers
- Ajustar el output de Astro para Workers (`output: 'server'`, `prerender = false` en las rutas de API)
- Mover los secrets de Retell a las variables de entorno de Workers
- Resolver un problema de trailing slash en la ruta del endpoint (Cloudflare Workers es estricto con las URLs y requería `/api/retell/create-call/` con barra final)

### Paso 4: El componente RetellDialer

El componente `VapiButton` se convirtió en `RetellDialer`. Mismos tres estados (idle, loading, active), misma lógica de click para llamar y colgar, pero el flujo de inicio cambia: antes llamaba directamente a `vapi.start()`, ahora hace un `fetch('/api/retell/create-call/')`, recibe el token y lo pasa al SDK de Retell para iniciar la sesión.

Las clases CSS también se renombraron de `.vapi-btn` a `.retell-btn`. Pequeño detalle, pero el histórico de git queda limpio.

## El resultado

El botón verde sigue ahí. Lucía sigue contestando. Para el visitante, nada ha cambiado.

Por dentro, la arquitectura es más correcta:

- La API key de Retell nunca llega al navegador
- El sitio corre en Cloudflare Workers con SSR real
- Las rutas de API tienen acceso a secrets de entorno en tiempo de ejecución
- El componente tiene estados claros y código limpio

¿Mereció la pena la semana de trabajo extra? Sí. No porque VAPI fuera malo, sino porque la arquitectura resultante es la correcta para este caso de uso. Cualquier agente de voz en producción con costes reales por llamada necesita control sobre quién puede iniciar llamadas.

## Lo que aprendí

**Una dependencia puede definir tu arquitectura.** VAPI funcionaba con un sitio estático. Retell requería SSR. SSR requería Cloudflare Workers. Cada decisión de plataforma tiene implicaciones que no siempre son obvias en el README.

**El flujo de tokens es la forma correcta de hacer esto.** Cualquier SDK que requiere exponer una API key en el cliente debería hacerte pensar dos veces. Si tienes costes variables por uso (como en llamadas de voz), la exposición de la clave puede salir cara.

**Cloudflare Workers merece la pena.** La migración desde Pages fue más limpia de lo esperado. El edge computing de Workers es rápido, el despliegue con `wrangler` es predecible, y los secrets de entorno funcionan exactamente como uno espera.

## Preguntas frecuentes

<section id="faq">
<h2>Preguntas frecuentes</h2>

<details>
<summary>¿Qué diferencia hay entre VAPI y Retell AI?</summary>

Las dos son plataformas para agentes de voz con Inteligencia Artificial. La diferencia técnica principal en el SDK web es el modelo de autenticación: VAPI puede funcionar con la API key directamente en el cliente, mientras que Retell genera access tokens efímeros desde un endpoint de servidor. Retell también presume de ~600ms de latencia y cumplimiento HIPAA/SOC2.

</details>

<details>
<summary>¿Necesito SSR para usar Retell en Astro?</summary>

Sí, si quieres proteger tu API key. El flujo de Retell requiere un endpoint de servidor que haga la petición con la clave y devuelva un token al cliente. En Astro eso implica <code>output: 'server'</code> y un adaptador para tu plataforma de despliegue.

</details>

<details>
<summary>¿Por qué Cloudflare Workers y no Pages?</summary>

Cloudflare Pages soporta funciones, pero con algunas limitaciones en el acceso a secrets en runtime cuando se usa con <code>@astrojs/cloudflare</code> en modo servidor completo. Workers es el entorno nativo del adaptador y funciona sin sorpresas. Si partes de cero con Astro + Cloudflare + SSR, ve directamente a Workers.

</details>

<details>
<summary>¿Puedo hacer esto mismo en otro framework?</summary>

Sí. El patrón —endpoint de servidor que genera un token, cliente que usa el token— es agnóstico del framework. En Next.js sería un Route Handler, en Nuxt un server route, en SvelteKit un endpoint en <code>+server.ts</code>. Lo que cambia es el adaptador para el proveedor de despliegue.

</details>

</section>

***

Si lo necesitas a nivel profesional en tu empresa, [puedo ayudarte](https://marcosramirez.dev/contacto/){:target="_blank"}.

Compártelo si te ha resultado útil.

Y... ¡hasta aquí por hoy!
