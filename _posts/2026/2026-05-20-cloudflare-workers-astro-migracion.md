---
title: "De Cloudflare Pages a Workers con Astro: la guerra real"
slug: cloudflare-workers-astro-migracion
date: 2026-05-20 08:30:00 +0200
excerpt: "Cuento cómo migré marcosramirez.dev de Cloudflare Pages a Cloudflare Workers en dos días: por qué fue necesario, qué salió mal en cada intento, qué configuraciones rotaron sin funcionar y cómo quedó al final. Si estás usando Astro con el adaptador de Cloudflare y tienes rutas de API con SSR, esto te va a ahorrar tiempo."
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
  - Desarrollo Web
  - Sistemas
tags: [cloudflare-workers, cloudflare-pages, wrangler, ssr, edge-computing, infraestructura, javascript]
image: /assets/img/headers/2026/cloudflare-workers-astro-migracion-nanobanana.webp
image_alt: "Infraestructura de Cloudflare Workers sobre fondo oscuro con red de nodos distribuidos y código de configuración"
toc: true
pin: false
twitter_description: "Migré marcosramirez.dev de Cloudflare Pages a Workers con Astro SSR. Dos días de guerra, varios configs rotos y lo que aprendí."
description: "Cómo migré marcosramirez.dev de Cloudflare Pages a Cloudflare Workers con Astro SSR: errores reales, configs que no funcionan y la solución final."
permalink: /:slug/
---

![{{ page.image_alt }}]({{ page.image }})

## Por qué una web estática dejó de serlo

[marcosramirez.dev](https://marcosramirez.dev){:target="_blank"} arrancó como un sitio completamente estático: [Astro](https://astro.build/){:target="_blank" rel="nofollow noopener"} compilando HTML/CSS/JS en build time, desplegado en [Cloudflare Pages](https://pages.cloudflare.com/){:target="_blank" rel="nofollow noopener"} en segundos. Sin servidor. Sin SSR. Sin complicaciones.

Duró una semana.

Antes de entrar en materia, un dato de contexto relevante: Cloudflare adquirió Astro a principios de 2026. En teoría, eso debería significar una integración perfecta entre el framework y la plataforma de despliegue. En la práctica, cuando hice esta migración, la documentación de Astro + Cloudflare Workers en modo SSR era penosa: desactualizada, con ejemplos para versiones antiguas, y con lagunas importantes sobre comportamientos específicos del adaptador. Lo que sí funcionó fue el asistente de Inteligencia Artificial de Cloudflare, que conoce su propio runtime mejor que la documentación escrita y fue el que me sacó del atasco definitivo. Apunte mental: cuando la documentación falla, el asistente integrado de la plataforma vale más que veinte posts de Stack Overflow.

En cuanto añadí un agente de voz a la web —del que hablo en detalle en el post [De VAPI a Retell: la migración que se llevó media arquitectura]({% post_url 2026/2026-05-21-de-vapi-a-retell-migracion-agente-de-voz %}){:target="_blank"}— necesité una ruta de API en el servidor para generar tokens de acceso de forma segura. Y ahí empezó la guerra.

## El problema: rutas de API en Astro estático

Astro en modo estático (`output: 'static'`, el valor por defecto) no tiene servidor. Todo se compila durante el build y el resultado son archivos en disco. Perfecto para sitios de contenido. Inútil para endpoints que necesitan ejecutar código en runtime, como leer variables de entorno secretas y hacer peticiones a APIs externas.

La solución teórica es sencilla: cambiar a `output: 'server'` en la configuración de Astro y añadir un adaptador para el proveedor de despliegue. En mi caso, `@astrojs/cloudflare`:

```javascript
// astro.config.mjs
import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  // ...
})
```

La teoría funciona. La práctica fue otra historia.

## Intento 1: Pages + wrangler.json

Añadí el adaptador, cambié a `output: 'server'`, y desplegué en Pages. La ruta `/api/retell/create-call/` devolvía **404**.

El problema: Cloudflare Pages con SSR requiere que el worker generado por Astro se despliegue correctamente como función de Pages. Eso se controla con un fichero `wrangler.json` (o `wrangler.toml`) que le dice a Pages dónde están los assets del cliente y dónde está el worker SSR:

```json
{
  "name": "marcosramirez-dev",
  "compatibility_date": "2026-05-07",
  "pages_build_output_dir": "./dist/client"
}
```

Deploy. Mismo 404. Siguiendo.

## Intento 2: wrangler.json con ASSETS binding

La documentación de Cloudflare sugería añadir un binding `ASSETS` para que el worker SSR pueda servir los archivos estáticos:

```json
{
  "name": "marcosramirez-dev",
  "compatibility_date": "2026-05-07",
  "assets": {
    "binding": "ASSETS",
    "directory": "./dist/client"
  }
}
```

Error en el deploy: **"`ASSETS` is a reserved binding name"**. Cloudflare Pages usa ese nombre internamente. No se puede redefinir.

## Intento 3: wrangler.toml + .assetsignore

Cambio de formato: de `wrangler.json` a `wrangler.toml`. Añado un fichero `.assetsignore` para evitar que los worker files se suban como assets estáticos:

```toml
name = "marcosramirez-dev"
compatibility_date = "2026-05-07"
pages_build_output_dir = "./dist/client"
```

Deploy. Esta vez no hay error de binding. Pero la ruta de API sigue sin responder correctamente. Los logs de Pages muestran que el worker se ejecuta, pero la variable de entorno `RETELL_API_KEY` no llega.

## Intento 4: downgrade del adaptador

La versión de `@astrojs/cloudflare` que había instalado era la 13.5.0. Varios issues de GitHub apuntaban a problemas de compatibilidad con Pages en versiones recientes. Probé con la 11.2.0:

```bash
npm install @astrojs/cloudflare@11.2.0
```

Diferente error. El build rompía por incompatibilidad de versiones entre el adaptador y Astro 6.3.

Deshaciendo el downgrade.

## La decisión: olvidar Pages, ir a Workers

Llevaba día y medio depurando configuraciones de Pages. El patrón era claro: Pages funciona bien para sitios estáticos, pero en cuanto introduces SSR real con secrets de runtime, el comportamiento se vuelve impredecible dependiendo de versiones y configuraciones específicas.

Hay otro motivo para no seguir peleando con Pages: Cloudflare ha anunciado oficialmente que Pages y Workers convergen en una sola plataforma. [Ya escribí sobre eso]({% post_url 2026/2026-05-04-cloudflare-pages-dificil-encontrar %}){:target="_blank"} cuando vi que Pages desaparecía del panel del dashboard. Migrar a Workers no era solo la solución al problema de SSR: era también el movimiento correcto a largo plazo.

[Cloudflare Workers](https://workers.cloudflare.com/){:target="_blank" rel="nofollow noopener"} es el runtime subyacente. Pages es una abstracción encima de Workers que simplifica el despliegue, pero esa abstracción tiene límites. Cuando los límites me impiden hacer lo que necesito, lo correcto es quitar la abstracción.

La migración a Workers requería:

1. Cambiar el script de deploy: de `wrangler pages deploy` a `wrangler deploy`
2. Nueva configuración `wrangler.jsonc` para Workers (distinta de Pages)
3. Los secrets de entorno van en Workers, no en Pages
4. El dominio custom se configura diferente

```jsonc
// wrangler.jsonc — configuración final para Workers
{
  "name": "marcosramirez-dev",
  "compatibility_date": "2026-05-08",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "binding": "ASSETS",
    "directory": "./dist"
  },
  "observability": {
    "enabled": true
  }
}
```

Nota: en Workers, `ASSETS` sí es un binding válido. En Pages no. Esa es una de las diferencias que no están bien documentadas.

El `directory` apunta a `./dist` (el output completo de Astro), no a `./dist/client`. Workers sirve los estáticos desde ahí directamente.

```json
// package.json — scripts actualizados
{
  "preview": "wrangler dev",
  "deploy": "wrangler deploy"
}
```

Y en `astro.config.mjs`, `output: 'server'` ya estaba. El adaptador de Cloudflare funciona para Pages y para Workers con la misma configuración de Astro.

## El resultado: funciona

Primera vez que deployé en Workers, la ruta de API respondió correctamente. La API key llegaba desde los secrets de Workers. El token se generaba. El agente de voz iniciaba la llamada.

El endpoint es un fichero TypeScript estándar de Astro con `prerender = false` para forzar que esa ruta sea SSR aunque el resto del sitio pudiera ser estático:

```typescript
// src/pages/api/retell/create-call.ts
export const prerender = false

import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request, env }) => {
  const RETELL_API_KEY = import.meta.env.RETELL_API_KEY
    || (env && (env as any).RETELL_API_KEY)

  // genera el token de acceso efímero desde el servidor
  const response = await fetch('https://api.retellai.com/v2/create-web-call', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RETELL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ agent_id: agentId })
  })

  const data = await response.json()
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
```

La API key nunca llega al navegador. El cliente recibe solo el token efímero.

## La guerra de los trailing slashes

Pensé que con Workers todo estaba resuelto. Entonces empezaron los trailing slashes.

Cloudflare Workers (y Astro con `trailingSlash: 'always'`) es estricto con las URLs. `/api/retell/create-call` y `/api/retell/create-call/` son rutas distintas. El fetch del componente del cliente apuntaba a la versión sin barra, la ruta estaba definida con barra. 404.

La solución fue añadir la barra final en el fetch del cliente. Simple, pero encontrarlo costó tiempo porque el error no era obvio: Workers devolvía un redirect 308 silencioso en lugar de un error claro.

## Lo que no deberías hacer

Resumen de configuraciones que rotaron y no funcionaron:

- ❌ `wrangler.toml` con `pages_build_output_dir` para Pages SSR — el worker no recibía los secrets
- ❌ `assets.binding: "ASSETS"` en Pages — nombre reservado, deploy falla
- ❌ `@astrojs/cloudflare@11.2.0` con Astro 6.3 — incompatible
- ❌ Campo `main` en `wrangler.jsonc` — causa error de build con el adaptador de Astro
- ❌ Campo `routes` en `wrangler.jsonc` — conflicto con el dominio custom configurado en el dashboard de Cloudflare

## Lo que sí funciona

```
Astro 6.3 + @astrojs/cloudflare 13.5.0 + output: 'server' + wrangler deploy
```

Si partes de cero con Astro y necesitas SSR en Cloudflare, ve directamente a Workers. Evita Pages si vas a tener rutas de API con secrets de entorno. La documentación de Cloudflare no es mala, pero la interacción específica entre el adaptador de Astro y Pages en modo SSR tiene esquinas oscuras que solo encuentras peleando.

## Preguntas frecuentes

<section id="faq">
<h2>Preguntas frecuentes</h2>

<details>
<summary>¿Cuándo usar Cloudflare Pages y cuándo Workers?</summary>

Pages si tu sitio es estático o casi estático (Astro sin SSR, Next.js con export estático). Workers si necesitas SSR real, rutas de API con secrets de runtime, o lógica de servidor que varía por petición. El límite es borroso y la documentación no lo deja claro, pero en la práctica: si añades un adaptador SSR a Astro para Cloudflare, ve a Workers desde el principio.

</details>

<details>
<summary>¿Qué es el binding ASSETS en Workers?</summary>

Es como Workers accede a los archivos estáticos del sitio (HTML, CSS, JS) durante la ejecución. En modo Workers, los assets se suben junto al worker y se sirven desde ese binding. En Pages, el binding <code>ASSETS</code> es interno y no se puede redefinir — de ahí el error "reserved binding name" si intentas configurarlo en el <code>wrangler.json</code> de Pages.

</details>

<details>
<summary>¿Funciona wrangler dev para desarrollo local con SSR?</summary>

Sí. Con <code>wrangler dev</code> en lugar de <code>astro dev</code> puedes probar el comportamiento SSR localmente, incluyendo los secrets del fichero <code>.dev.vars</code>. El inconveniente es que el hot reload es más lento que el dev server de Astro. Para desarrollo del frontend uso <code>astro dev</code>, para probar las rutas de API uso <code>wrangler dev</code>.

</details>

<details>
<summary>¿Cómo paso los secrets a Workers?</summary>

Con el CLI de wrangler: <code>wrangler secret put NOMBRE_VARIABLE</code>. Te pide el valor por stdin, nunca lo escribe a disco. Para desarrollo local, crea un fichero <code>.dev.vars</code> en la raíz del proyecto (está en <code>.gitignore</code> por defecto) con el mismo formato que un <code>.env</code>.

</details>

</section>

***

Si lo necesitas a nivel profesional en tu empresa, [puedo ayudarte](https://marcosramirez.dev/contacto/){:target="_blank"}.

Compártelo si te ha resultado útil.

Y... ¡hasta aquí por hoy!
