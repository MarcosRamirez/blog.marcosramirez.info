---
title: "Programar posts con Jekyll en GitHub Pages: el proceso completo"
slug: como-programar-posts-con-jekyll-en-github-pages
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2021-02-26 21:00:00 +0100
image: /assets/img/headers/2021/como-programar-posts-con-jekyll-en-github-pages-nanobanana.webp
image_alt: "Código Jekyll con schedule de GitHub Actions"
categories: [Tecnología, Desarrollo Web]
tags: [Desarrollo Web, Automatización, Software y Apps]
pin: false
toc: true
excerpt: "Soluciona la limitación de Jekyll en GitHub Pages para programar publicaciones futuras. Te explico cómo configurar el archivo _config.yml con la opción future para controlar si Jekyll debe publicar posts con fecha en el futuro. Aprende a configurar el workflow en .github/workflows/pages-deploy.yml con schedule para ejecutar builds automáticos cada 30 minutos, permitiendo que los posts programados se publiquen automáticamente. También te muestro una alternativa menos elegante que consiste en forzar el rebuild ejecutando un push vacío desde tu local. Una guía técnica paso a paso para automatizar tu blog Jekyll."
twitter_description: "Cómo programar posts con Jekyll en GitHub Pages: configuración y workflow completo."
description: "Programa posts en Jekyll con GitHub Pages. Configura schedule en workflows, el future flag en _config.yml y publica automáticamente. Aprende más."
permalink: /:slug/
---

![{{ page.image_alt }}]({{ page.image }})

El primer problema "serio", que me he encontrado con [Jekyll](https://jekyllrb.com/){:target="_blank"}, es que no podía programar los posts, crear un post con la fecha en futuro, no es suficiente para que se publique, también hay que hacer que se ejecute el build, ¿como?, simplemente modificando el archivo:

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
future: false  # ublicar posts con fecha futura
```

El naming, es un poco ... de aquella manera

Por defecto está en `false`, lo que significa que Jekyll ignorará los posts con fecha futura. Si lo cambias a `true`, Jekyll publicará esos posts automáticamente, pero ten en cuenta que esto puede causar problemas si tienes el workflow configurado para ejecutarse automáticamente.

Osea, si está en true, publicará todo, al momento, independientemente de la fecha que tenga el post.
Si lo pones en false, solo publicará los posts que tengan fecha en el pasado. Por tanto, podrás programar posts.

**La configuración recomendada** es mantener `future: false` y usar el workflow con schedule para publicar los posts automáticamente cuando llegue su fecha.


Otra opción (menos elegante), es forzar el rebuild, ejecutando un push vacío desde nuestro local, o donde sea:

```bash
git commit -m 'Force Rebuild' --allow-empty
git push origin <branch-name>
```


***Y ahora ya solo tendrás que escribir y hacer push de tus posts con fecha futura, y se publicarán automáticamente***.



Compártelo si te ha gustado. ¿Tienes dudas con la configuración? [Escríbeme](https://marcosramirez.info/contacto/).

Y... hasta aquí por hoy!
