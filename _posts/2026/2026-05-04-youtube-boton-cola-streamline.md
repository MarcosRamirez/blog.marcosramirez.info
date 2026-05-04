---
title: "YouTube eliminó el botón de cola en las miniaturas: solución"
slug: youtube-boton-cola-streamline
date: 2026-05-04 08:30:00 +0200
excerpt: "Desde el 27 de marzo de 2026, YouTube eliminó sin avisar los botones de 'Añadir a la cola' y 'Ver más tarde' de las miniaturas en el feed principal y el de suscripciones. Para volver a añadir vídeos a la cola hay que abrir el menú de tres puntos. Y si sales de la pestaña, la cola entera desaparece.

Existe una extensión gratuita para Chrome que restaura el botón en hover, hace la cola persistente entre pestañas y reinicios, y añade funcionalidades que la cola nativa nunca tuvo."
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
  - Software y Apps
tags: [cola-de-reproduccion, extensiones-chrome, productividad-web, navegador, ux]
image: /assets/img/headers/2026/youtube-boton-cola-streamline-nanobanana.webp
image_alt: "Botón naranja de Streamline apareciendo al hacer hover sobre una miniatura de YouTube en el feed principal"
toc: true
pin: false
twitter_description: "YouTube borró el botón de añadir a la cola. Te cuento qué pasó y cómo recuperarlo con una extensión gratuita."
description: "YouTube eliminó silenciosamente el botón de añadir a la cola en marzo de 2026. Te explico qué pasó y cómo recuperarlo con una extensión gratuita."
permalink: /:slug/
---

![{{ page.image_alt }}]({{ page.image }})

Llevas tiempo usando YouTube con el mismo flujo: pasas el ratón por encima de una miniatura, aparece el botón de añadir a la cola, haces clic, sigues navegando. Rápido, sin interrumpir la reproducción actual.

Un día ese botón ya no está. Donde antes aparecía, ahora no hay nada. Tienes que abrir el menú de tres puntos (⋮), buscar la opción entre las que aparecen y hacer clic. Tres pasos en lugar de uno.

Si has llegado hasta aquí, probablemente te ha pasado lo mismo.

## ¿Qué cambió exactamente en YouTube?

El 27 de marzo de 2026, [YouTube](https://www.youtube.com){:target="_blank" rel="nofollow noopener"} eliminó sin comunicado oficial los botones de "Añadir a la cola" y "Ver más tarde" que aparecían al hacer hover sobre las miniaturas en el feed principal y en el feed de suscripciones.

El cambio lo detectaron varios usuarios en r/youtube el mismo día: [este hilo](https://www.reddit.com/r/youtube/comments/1s4sh12/they_hid_the_add_to_queue_and_watch_later_buttons/){:target="_blank" rel="nofollow noopener"} y [este otro](https://www.reddit.com/r/youtube/comments/1s4f8vw/has_anyone_else_lost_the_ability_to_add_to_your/){:target="_blank" rel="nofollow noopener"} concentran las quejas. Nadie de YouTube explicó el motivo. Solo desaparecieron.

Lo que sí se puede confirmar es que el botón sigue funcionando con normalidad en las páginas de canal individual, donde las miniaturas tienen un comportamiento de hover diferente. El problema afecta al feed principal y al de suscripciones, que son los que más se consultan en el día a día.

La especulación más habitual apunta a que YouTube prefiere que el algoritmo decida qué ves a continuación, en lugar de que construyas tu propia lista. Si tienes una cola larga con vídeos de canales a los que sigues, pasas menos tiempo en el feed y consumes menos publicidad contextual. Pero eso es especulación, no hay declaración oficial.

## El problema que ya existía: la cola nativa solo funciona en una pestaña

Antes de hablar de la solución, conviene entender que la cola de YouTube siempre ha tenido una limitación importante: **solo funciona mientras permaneces en la misma pestaña**.

Si abres un vídeo de la cola en una pestaña nueva, la reproducción se para y la cola desaparece. Si navegas a otra página, lo mismo. Si cierras el navegador y lo vuelves a abrir, la cola ya no existe.

Esto la convierte en una herramienta de usar-y-tirar: útil para encadenar dos o tres vídeos seguidos, pero no para construir una lista de reproducción temporal que dure toda la tarde. El botón de hover en las miniaturas era ya la única comodidad que quedaba de esa función. Ahora tampoco está.

## La solución: Streamline

[Streamline - YouTube Queue Manager](https://chromewebstore.google.com/detail/streamline-youtube-queue/iaapkkddfnamllommnpinmfpdefjcgcf){:target="_blank" rel="nofollow noopener"} es una extensión gratuita para Chrome que resuelve los dos problemas a la vez: restaura el botón en hover y hace la cola persistente entre pestañas y sesiones.

### Cómo instalarla

1. Abre el enlace a la [Chrome Web Store](https://chromewebstore.google.com/detail/streamline-youtube-queue/iaapkkddfnamllommnpinmfpdefjcgcf){:target="_blank" rel="nofollow noopener"}.
2. Haz clic en **"Añadir a Chrome"**.
3. Confirma los permisos en el diálogo que aparece.
4. Recarga YouTube. El botón naranja **+** aparecerá al pasar el ratón sobre cualquier miniatura.

No necesitas cuenta ni iniciar sesión en ningún servicio externo. Todo se guarda localmente en tu navegador y se sincroniza vía Chrome.

### Qué hace exactamente

Una vez instalada, Streamline añade su propia capa de gestión de cola directamente sobre la interfaz de YouTube:

- **Botón de hover restaurado:** al pasar el ratón sobre una miniatura aparece un botón naranja **+** que añade el vídeo a la cola con un solo clic, igual que antes del cambio.
- **Cola persistente:** la cola se mantiene entre pestañas, entre ventanas del navegador y entre reinicios. Puedes cerrar Chrome y al volver seguirá ahí.
- **Reproducción automática:** cuando termina un vídeo, pasa automáticamente al siguiente de la cola.
- **Reordenación drag & drop:** arrastra los vídeos dentro de la cola para cambiar el orden.
- **Búsqueda en cola:** busca un vídeo dentro de tu lista sin tener que desplazarte.
- **Duración total:** muestra la duración acumulada de todos los vídeos pendientes.
- **Historial de reproducción:** guarda un registro de los vídeos reproducidos con marcas de tiempo.
- **Añadir playlists completas:** puedes volcar una lista de reproducción entera de YouTube en tu cola.
- **Privacidad:** no recopila datos. El almacenamiento es local y sincronizado vía Chrome.

La extensión tiene una valoración de 4,5 sobre 5 en la Chrome Web Store y es completamente gratuita.

## Cola nativa de YouTube vs. Streamline

| Característica | Cola nativa | Streamline |
|---|---|---|
| Botón en hover (feed principal) | ❌ Eliminado en marzo 2026 | ✅ Botón naranja restaurado |
| Persistencia entre pestañas | ❌ Se pierde al cambiar de pestaña | ✅ Persiste entre todas |
| Persistencia al reiniciar el navegador | ❌ Se pierde | ✅ Persiste |
| Reordenación drag & drop | ❌ No disponible | ✅ Disponible |
| Búsqueda dentro de la cola | ❌ No disponible | ✅ Disponible |
| Duración total de la cola | ❌ No disponible | ✅ Disponible |
| Historial de reproducción | ❌ No disponible | ✅ Con marcas de tiempo |
| Añadir playlists completas | ❌ No disponible | ✅ Disponible |
| Requiere cuenta | No | No |
| Precio | Gratis | Gratis |

## ¿Hay alternativas?

Si prefieres no instalar una extensión, existe un script de usuario para [Tampermonkey](https://www.tampermonkey.net/){:target="_blank" rel="nofollow noopener"} publicado en [Greasyfork](https://greasyfork.org/en/scripts/571443-youtube-queue-button-restore){:target="_blank" rel="nofollow noopener"} que intenta restaurar el botón de hover. Los resultados son variables y algunos usuarios reportan que no funciona en todos los contextos. Es una alternativa más técnica y menos pulida.

[Enhancer for YouTube](https://chromewebstore.google.com/detail/enhancer-for-youtube/ponfpcnoihfmfllpaingbgckeeldkhle){:target="_blank" rel="nofollow noopener"} e [ImprovedTube](https://improvedtube.com/){:target="_blank" rel="nofollow noopener"} son extensiones que mejoran YouTube de forma más amplia —interfaz, velocidad de reproducción, bloqueador de anuncios integrado— pero ninguna ofrece una gestión de cola persistente comparable a Streamline.

Si lo que necesitas es específicamente recuperar el botón y tener una cola que no desaparezca, Streamline es la opción más directa.

<section>

## Preguntas frecuentes

<details>
<summary>¿Streamline funciona en Firefox o Edge?</summary>

Actualmente solo está disponible para Chrome a través de la Chrome Web Store. En Edge basado en Chromium puedes instalar extensiones de Chrome directamente, por lo que debería funcionar, aunque no está oficialmente soportado. Firefox no es compatible.

</details>

<details>
<summary>¿El botón de "Ver más tarde" también desapareció?</summary>

Sí. El cambio del 27 de marzo de 2026 eliminó tanto el botón de "Añadir a la cola" como el de "Ver más tarde" de las miniaturas en el feed principal y en el de suscripciones. Ambos siguen accesibles a través del menú de tres puntos (⋮). Streamline restaura el de añadir a la cola; el de "Ver más tarde" sigue requiriendo el menú.

</details>

<details>
<summary>¿Qué permisos necesita la extensión?</summary>

Streamline solicita acceso a youtube.com para poder inyectar el botón en las miniaturas y gestionar la cola. Todo el almacenamiento es local y se sincroniza vía Chrome. El desarrollador declara explícitamente que no recopila ni transmite datos de usuario.

</details>

<details>
<summary>¿YouTube puede volver a romper esta extensión en el futuro?</summary>

Es posible. Si YouTube modifica su interfaz, la extensión puede dejar de funcionar hasta que el desarrollador publique una actualización. Ha ocurrido con otras extensiones similares en el pasado. La Chrome Web Store muestra la fecha de la última actualización, y las reseñas de los usuarios suelen reflejar el estado actual de forma bastante rápida.

</details>

</section>

---

Compártelo si te ha resultado útil.

¿Usabas mucho el botón de añadir a la cola? Deja un comentario y cuéntame cómo organizas lo que ves en YouTube.

Y... ¡hasta aquí por hoy!
