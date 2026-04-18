---
title: "Añadir AUTOMÁTICAMENTE nuevos videos de subscripciones de YouTube a la lista Ver Más Tarde (Watch It Later)"
slug: anadir-automaticamente-nuevos-videos-de-subscripciones-de-youtube-a-la-lista-ver-mas-tarde-watch-it-later
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2016-09-10 08:31:36 +0200
image: /assets/img/headers/youtube.png
categories: [Productividad y Hacks, Automatización]
tags: [youtube, scripts, automatización, google]
pin: false
toc: true
excerpt: "Explico cómo automatizar la gestión de YouTube mediante un Google Script que añade automáticamente los nuevos vídeos de tus suscripciones a la lista Ver más tarde. Aunque esta funcionalidad quedó deprecada en 2021, el post detalla el proceso de configuración de APIs de Google y la filosofía de automatización para ahorrar tiempo en tareas repetitivas."
twitter_description: "Cómo automatizar tu lista Ver Más Tarde de YouTube con un Google Script."
permalink: /anadir-automaticamente-nuevos-videos-de-subscripciones-de-youtube-a-la-lista-ver-mas-tarde-watch-it-later/
---

![Post Header]({{ page.image }})

> ⚠️ **DEPRECADO**: En 2021 se deshabilitó la funcionalidad que permitía funcionar a este Script.

Todo el que me conoce, sabe que soy un maniático de la automatización, y de ahorrar tiempo (odio perder tiempo en tareas repetitivas y absurdas).

Y, una de las cosas que más me molestan de YouTube, es la PÉSIMA interfaz/UX para ver vídeos de las subscripciones.
Y, sobretodo que no hagan uso del WatchItLater para las mismas.

Por eso, decidí buscar la forma de automatizar el proceso, que, aunque pretendo hacer un WebApp, ahora mismo, solo es [un GoogleScript](https://script.google.com/d/1rTKIvzRZbovBxnteahBbKqPXTdDboYMXJIv6Y073YiNe1qlSe7jaWc9i/edit?usp=sharing){:target="_blank"}.

Lamentablemente, los GScripts son algo complejos para los que no sois informáticos, pero espero que siguiendo estos pasos, podáis instalarlo sin problemas, mientras saco tiempo (y servidor) para hacer un WebApp (de click en aceptar y listo).

Los pasos a seguir, son:

1. ASEGURATE de que YouTube te envía mail cada vez que el canal sube un nuevo vídeo
2. Copia el [Script](https://script.google.com/d/1rTKIvzRZbovBxnteahBbKqPXTdDboYMXJIv6Y073YiNe1qlSe7jaWc9i/edit?usp=sharing){:target="_blank"} en tu Google Drive
3. Ábrelo (se abrirá en el editor de Scripts). ![videosubscription-to-watch-it-later-script-open](/assets/2016/09/videosubscription-to-watch-it-later-script-open.jpeg)
4. Haz click en Recursos->Servicios Avanzados de Google, verás algo así: ![videosubscription-to-watch-it-later-servicios-avanzados-de-google](/assets/2016/09/videosubscription-to-watch-it-later-servicios-avanzados-de-google.jpeg)
5. Activa "Gmail API" y "YouTube Data API".
6. En la parte de abajo, haz click en "Consola de Google Developers", se abrirá una ventana como esta: ![panel-de-control-videosubscription-to-watch-it-google-apis](/assets/2016/09/panel-de-control-videosubscription-to-watch-it-google-apis.jpeg)
7. En el cuadro de búsqueda, busca las mismas APIs y actívalas (habilítalas), verás algo parecido a esto, aunque te dirá habilitar, en vez de inhabilitar :) ![administrador-de-apis-videosubscription-to-watch-it-habilitar-api](/assets/2016/09/administrador-de-apis-videosubscription-to-watch-it-habilitar-api.jpeg)
8. Cierra la ventana de "Google Developers Console"
9. Haz click en ACEPTAR (del editor de Scripts, donde está el ON/OFF)
10. En el editor de Scripts, selecciona "AddNewVideosToWatchItLater" ![VideoSubscription To Watch It Later (click add new video)](/assets/2016/09/videosubscription-to-watch-it-later-click-add-new-video.jpeg)
11. Haz click en Ejecutar y ejecuta "AddAddNewVideosToWatchLaterTrigger"
12. Haz click en Guardar

Y... ya está, ahora, tu lista "Ver Más Tarde", se llenará automáticamente con los vídeos de tus subscripciones, y si eres como yo, podrás sentarte cómodamente los fines de semana a verlos uno tras otro simplemente con un click :).

Basado en/Fuente: [DiRaven on Reddit](https://www.reddit.com/r/youtube/comments/2x3ew4/automatically_add_new_subscription_videos_to_the/){:target="_blank"}
