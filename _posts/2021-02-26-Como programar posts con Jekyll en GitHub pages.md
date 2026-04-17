---
title: Como programar posts con Jekyll en GitHub Pages.
author: Marcos Ramírez
date: 2021-02-26 21:00:00 +0100
categories: [Tecnología, Desarrollo Web]
tags: [jekyll, github pages, automatización, tutorial]
pin: false
toc: true
excerpt_separator: <!--more-->
excerpt: Explico cómo solucionar una de las principales limitaciones de Jekyll al hospedar en GitHub Pages - la imposibilidad nativa de programar publicaciones para fechas futuras. Muestro cómo configurar un flujo de trabajo de GitHub Actions con un activador de cron para forzar reconstrucciones automáticas del sitio, permitiendo que los posts se publiquen exactamente en el momento deseado sin intervención manual.
permalink: /:title/ # title is filename NOT title in YAML
---

El primer problema "serio", que me he encontrado con Jekyll, es que no podía programar los posts, crear un post con la fecha en futuro, no es suficiente para que se publique, también hay que hacer que se ejecute el build, ¿como?, simplemente modificando el archivo:

| .github/workflows/pages-deploy.yml

Y añadiendo esto:

```yaml
on:
  schedule:
    - cron: '*/30 * * * *' # Runs every 30 mins

```

Con esto, forzaremos un build cada media hora, que hará que ahora ya sí se publiquen los posts programados.


Otra opción (menos elegante), es forzar el rebuild, ejecutando un push vacío desde nuestro local, o donde sea:

```bash
git commit -m 'Force Rebuild' --allow-empty
git push origin <branch-name>
```


***Y ahora ya solo tendrás que escribir y hacer push de tus posts con fecha futura, y se publicarán automáticamente***.



Espero que os haya sido útil
