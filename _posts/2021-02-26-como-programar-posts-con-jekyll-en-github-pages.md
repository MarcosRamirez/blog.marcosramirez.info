---
title: "Como programar posts con Jekyll en GitHub Pages"
slug: como-programar-posts-con-jekyll-en-github-pages
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2021-02-26 21:00:00 +0100
image: /assets/img/headers/default.webp
categories: [Tecnología, Desarrollo Web]
tags: [jekyll, github pages, automatización, tutorial]
pin: false
toc: true
excerpt: "Explico cómo solucionar una de las principales limitaciones de Jekyll al hospedar en GitHub Pages: la imposibilidad nativa de programar publicaciones para fechas futuras.Incluyo la configuración del archivo _config.yml para controlar los posts futuros, la configuración del workflow con schedule para ejecutar builds automáticos cada 30 minutos, y una alternativa menos elegante que consiste en forzar el rebuild con un push vacío."
twitter_description: "Cómo programar posts con Jekyll en GitHub Pages: configuración y workflow completo."
permalink: /:slug/
---

![Post Header]({{ page.image }})

El primer problema "serio", que me he encontrado con Jekyll, es que no podía programar los posts, crear un post con la fecha en futuro, no es suficiente para que se publique, también hay que hacer que se ejecute el build, ¿como?, simplemente modificando el archivo:

| .github/workflows/pages-deploy.yml

Y añadiendo esto:

```yaml
on:
  schedule:
    - cron: '*/30 * * * *' # Runs every 30 mins

```

Con esto, forzaremos un build cada media hora, que hará que ahora ya sí se publiquen los posts programados.

## Configuración de _config.yml

En el archivo `_config.yml` existe una opción llamada `future` que controla si Jekyll debe publicar posts con fecha en el futuro:

```yaml
future: false  # No publicar posts con fecha futura
```

Por defecto está en `false`, lo que significa que Jekyll ignorará los posts con fecha futura. Si lo cambias a `true`, Jekyll publicará esos posts automáticamente, pero ten en cuenta que esto puede causar problemas si tienes el workflow configurado para ejecutarse automáticamente.

**La configuración recomendada** es mantener `future: false` y usar el workflow con schedule para publicar los posts automáticamente cuando llegue su fecha.


Otra opción (menos elegante), es forzar el rebuild, ejecutando un push vacío desde nuestro local, o donde sea:

```bash
git commit -m 'Force Rebuild' --allow-empty
git push origin <branch-name>
```


***Y ahora ya solo tendrás que escribir y hacer push de tus posts con fecha futura, y se publicarán automáticamente***.



Espero que os haya sido útil
