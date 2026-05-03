---
title: "Cloudflare Pages está desapareciendo (y Workers sale ganando)"
slug: cloudflare-pages-dificil-encontrar
date: 2026-05-04 08:30:00 +0200
excerpt: "Cloudflare ha anunciado oficialmente que Pages y Workers se fusionan en una sola plataforma, y el panel ya refleja esa estrategia: Pages aparece enterrada como un enlace pequeño al final de una pantalla orientada a Workers. No es un fallo de UX. Es una decisión de negocio. Te explico qué significa para los sitios estáticos, cuánto te puede costar a futuro y por qué Pages sigue siendo la mejor opción para hosting estático mientras exista."
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
  - Desarrollo Web
  - Reflexiones y Opinión
tags: [deploy, hosting, ux, frontend, estatico, desarrollo, infraestructura]
image: /assets/img/headers/2026/cloudflare-pages-dificil-encontrar-nanobanana.webp
image_alt: "Panel de Cloudflare con la sección Workers & Pages mostrando Pages escondida bajo el flujo de Workers"
toc: true
pin: false
twitter_description: "Cloudflare está absorbiendo Pages en Workers. No es un bug de UX. Es estrategia de negocio. Lo que cambia para tu sitio estático."
description: "Cloudflare está fusionando Pages en Workers y el panel ya lo refleja. Qué significa para tu sitio estático, diferencias de precio y qué hacer. Lee más."
permalink: /:slug/
---

![{{ page.image_alt }}]({{ page.image }})

Si llevas un tiempo usando [Cloudflare Pages](https://pages.cloudflare.com/){:target="_blank" rel="nofollow noopener"} para desplegar un sitio estático —un blog, un portfolio, una landing— y en algún momento has intentado crear un nuevo proyecto, es posible que hayas pasado varios minutos confundido delante del panel. No porque Pages haya desaparecido, sino porque Cloudflare ha tomado una decisión estratégica que ya se refleja en la interfaz: está absorbiendo Pages dentro de Workers.

Y eso tiene consecuencias que van más allá de un botón que no encuentras.

## La fusión oficial: Pages y Workers convergen

En 2024, Cloudflare publicó un artículo en su blog titulado "Pages and Workers are converging into one experience". No es un rumor ni una interpretación: es una declaración pública de la empresa explicando que Pages, como producto independiente, está siendo absorbido por Workers. Han pasado dos años desde ese anuncio, y lo que ves ahora en el panel es la ejecución de esa hoja de ruta: Pages ya no tiene pantalla propia, ya no recibe nuevas funciones, y la interfaz activamente te dirige hacia Workers.

El argumento de Cloudflare es técnico y tiene lógica: Pages siempre ha funcionado sobre la infraestructura de Workers internamente. Las Pages Functions —las funciones serverless que puedes añadir a tu sitio estático— ya usan Workers por debajo. Unificarlo en una sola experiencia simplifica el stack y permite que los dos productos compartan mejoras. Todo correcto sobre el papel.

Lo que Cloudflare no menciona con la misma claridad es que esta fusión también beneficia su modelo de negocio. Workers tiene un pricing basado en cómputo. Pages, para sitios estáticos, era —y por ahora sigue siendo— prácticamente gratuito.

## El panel ya refleja la estrategia

Cuando entras a crear algo nuevo en la sección Workers & Pages, el panel te presenta el flujo de "Crear un Worker":

![Captura del panel de Cloudflare donde Pages aparece escondida en la parte inferior](/assets/img/posts/2026/cloudflare-pages-dificil-encontrar/cloudflare-pages-workers-confusion.jpeg)

La pantalla se llama "Ship something new". Tiene opciones para conectar [GitHub](https://github.com/){:target="_blank" rel="nofollow noopener"}, conectar [GitLab](https://gitlab.com/){:target="_blank" rel="nofollow noopener"}, empezar con un "Hola mundo", elegir una plantilla o subir archivos estáticos. Todo dentro del flujo de Workers.

Pages aparece en la parte inferior, en un texto pequeño que reza:

> **¿Busca implementar Pages? Comenzar**

Un enlace. Pequeño. Al final. Exactamente donde acaba la atención visual de la mayoría de los usuarios.

Esto no es un descuido de diseño. El equipo de Cloudflare sabe perfectamente cómo diseñar interfaces: son los mismos que construyeron uno de los paneles de gestión de DNS más claros del mercado. Si Pages está al final y Workers ocupa el 95% del espacio visual, es porque así lo han decidido.

## La diferencia de costes que nadie te explica

Para entender por qué esta fusión importa a tu bolsillo, hay que mirar los precios:

| Plan | Cloudflare Pages | Workers |
| :--- | :--- | :--- |
| **Gratuito** | Ancho de banda ilimitado, 500 builds/mes | 100.000 peticiones/día, 10ms CPU/invocación |
| **Pago** | Incluido en Workers Paid | 5 $/mes base + 0,50 $ por millón de peticiones |

Para un sitio puramente estático —HTML, CSS, JavaScript ya compilado—, Pages es imbatible: ancho de banda ilimitado sin pagar nada. No importa si tu artículo se viraliza y recibe cien mil visitas en un día. La factura es cero.

Workers tiene un plan gratuito también generoso (100.000 peticiones diarias), pero en cuanto necesitas más o quieres funcionalidades avanzadas, el plan de pago empieza en **5 dólares al mes de base**, más costes variables por petición.

La convergencia significa que, a largo plazo, tus proyectos actuales de Pages pasarán a correr sobre la infraestructura de Workers. Cloudflare ha prometido compatibilidad total hacia atrás —"zero-breakage"—, así que tu sitio no dejará de funcionar. Pero el modelo de pricing que te aplicarán en el futuro será el de Workers, no el de Pages.

## Qué cambia según el tipo de proyecto

La convergencia afecta de manera distinta según lo que estés desplegando.

**Sitios puramente estáticos** —blogs, portfolios, landings, documentación generada con [Jekyll](https://jekyllrb.com/){:target="_blank" rel="nofollow noopener"}, [Hugo](https://gohugo.io/){:target="_blank" rel="nofollow noopener"}, [Astro](https://astro.build/){:target="_blank" rel="nofollow noopener"}, [Eleventy](https://www.11ty.dev/){:target="_blank" rel="nofollow noopener"} o cualquier generador similar— no tienen cómputo en tiempo de petición. El build genera HTML, CSS y JavaScript, y eso es lo que se sirve. Para este caso, Pages sigue siendo la opción ideal: ilimitado, gratuito, sin sorpresas en la factura. Mientras Pages siga funcionando como hoy, úsala.

**Sitios con SSR o funciones serverless** —rutas dinámicas que dependen de bases de datos, autenticación, formularios con lógica de servidor— sí requieren cómputo. Esto ya entra en el territorio de Workers, y aquí sí pagas según uso.

La distinción es importante porque mucha gente despliega en Pages proyectos que podrían ser perfectamente estáticos, pero que acaban usando Pages Functions por comodidad. Cada función invocada cuenta como una petición de Workers. Si eso escala, el coste cambia.

## Cómo encontrar Pages mientras siga existiendo

Mientras Cloudflare mantiene las dos experiencias conviviendo en el mismo panel, estos son los pasos para llegar a Pages:

1. Entra en tu panel de [Cloudflare](https://dash.cloudflare.com/){:target="_blank" rel="nofollow noopener"}.
2. Ve a **Workers & Pages** en el menú lateral izquierdo.
3. Haz clic en **Crear**.
4. Ignora todo el contenido principal de la pantalla "Ship something new".
5. Baja hasta el final y haz clic en **¿Busca implementar Pages? Comenzar**.

Eso es todo. Siete pasos, uno de ellos "ignora todo lo que ves en pantalla" —que es exactamente el tipo de instrucción que no debería existir en un producto bien diseñado.

## Comparativa con las alternativas

Si la dirección de Cloudflare te genera dudas sobre la estabilidad a largo plazo de Pages, estas son las alternativas para sitios estáticos:

| Servicio | Gratis | Builds/mes | Banda ancha | Ideal para |
| :--- | :--- | :--- | :--- | :--- |
| **Cloudflare Pages** | Sí | 500 | Ilimitada | Sitios estáticos, máximo rendimiento de red |
| **[Netlify](https://www.netlify.com/){:target="_blank" rel="nofollow noopener"}** | Sí | 300 | 100 GB | Ecosistema de plugins, Forms, Identity |
| **[Vercel](https://vercel.com/){:target="_blank" rel="nofollow noopener"}** | Sí | Sin límite | 100 GB | Next.js, Edge Functions integradas |
| **[GitHub Pages](https://pages.github.com/){:target="_blank" rel="nofollow noopener"}** | Sí | Sin límite | Sin límite | Proyectos simples, dominio propio gratuito |

Para proyectos estáticos sin requisitos especiales, Cloudflare Pages sigue siendo la mejor opción en rendimiento de red y ancho de banda ilimitado. Vercel tiene ventaja si usas [Next.js](https://nextjs.org/){:target="_blank" rel="nofollow noopener"}. Netlify es sólido si necesitas su ecosistema de integraciones.

Pero la diferencia real con Cloudflare es la red: sirven contenido desde más de 300 ciudades en todo el mundo, lo que se traduce en tiempos de carga menores para cualquier audiencia global.

## Lo que no te dicen

La fusión de Pages en Workers es una apuesta estratégica de Cloudflare para simplificar su portfolio y aumentar el valor percibido de Workers. Para los usuarios de hoy, la promesa es que nada cambia. Para Cloudflare, el futuro es un único producto de cómputo en el borde donde todo paga según uso.

Para sitios estáticos, el consejo es claro: **usa Pages mientras puedas**. Es gratis, es rápida y funciona sin configuración compleja. Cuando la migración forzada llegue, ya habrá más información sobre cómo afectará al pricing real.

Mientras tanto, el truco sigue siendo el mismo: baja hasta el final de la pantalla y busca el enlace pequeño. Está ahí. Solo hay que saber mirar. Y saber que Cloudflare preferiría que no lo encontraras.

<section>

## Preguntas frecuentes

<details>
<summary>¿Cloudflare Pages va a desaparecer?</summary>

No de forma inmediata. Cloudflare ha prometido compatibilidad total hacia atrás, así que los proyectos existentes seguirán funcionando. Lo que está desapareciendo es Pages como producto independiente con pantalla propia y hoja de ruta separada: toda la inversión nueva va a Workers, y Pages se convierte progresivamente en una capa sobre esa infraestructura.

</details>

<details>
<summary>¿Cuánto cuesta Cloudflare Pages comparado con Workers?</summary>

Para sitios estáticos, Pages es gratuito con ancho de banda ilimitado y 500 builds al mes. Workers tiene también un plan gratuito (100.000 peticiones/día), pero el plan de pago empieza en 5 $/mes de base más 0,50 $ por millón de peticiones. A largo plazo, la convergencia puede suponer que los proyectos de Pages pasen a facturarse según el modelo de Workers.

</details>

<details>
<summary>¿Cómo encuentro Cloudflare Pages en el panel?</summary>

Ve a **Workers & Pages** en el menú lateral, haz clic en **Crear** y baja hasta el final de la pantalla "Ship something new". Allí encontrarás el enlace **¿Busca implementar Pages? Comenzar**. No está en la parte principal de la pantalla, que está orientada a Workers.

</details>

<details>
<summary>¿Debería usar Workers o Pages para mi sitio estático?</summary>

Si tu sitio genera HTML en build time —con Jekyll, Hugo, Astro en modo estático, Eleventy u otro generador—, usa Pages: es gratuito, ilimitado en ancho de banda y no requiere configuración adicional. Solo considera Workers si necesitas cómputo en tiempo de petición (SSR, funciones serverless, autenticación dinámica).

</details>

</section>

---

Compártelo si te ha resultado útil.

Si tu empresa necesita implementar esto, [hablamos](https://marcosramirez.info/contacto/){:target="_blank"}.

¿Usas Cloudflare Pages para tus sitios estáticos? ¿Has notado el cambio en el panel? Deja un comentario y cuéntame.

Y... ¡hasta aquí por hoy!
