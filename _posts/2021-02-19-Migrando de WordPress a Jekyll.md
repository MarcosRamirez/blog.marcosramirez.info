---
title: Migrando de WordPress a Jekyll
author: Marcos Ramírez
date: 2021-02-19 10:34:00 +0100
categories: [Informática, Jekyll]
tags: [jekyll, wordpress, migración]
pin: false
toc: true
image: /assets/img/headers/wp2jekyll.png
excerpt: Te explico mis motivos, mis problemas (y soluciones) al migrar de wordpress.com a Jekyll, espero que te sea útil
excerpt_separator: <!--more-->
permalink: /:title/
---

![Wordpress To Jekyll](/assets/img/headers/wp2jekyll.png)

Estoy migrando todos mis blogs a Jekyll, y de paso, estoy aprovechando para decidir cual(es) de ellos unificar aquí.
El proceso llevará algo de, o bastante, tiempo.

Por ello, en los próximos días (semanas, meses...) veréis publicados posts antiguos, y/o de otros blogs
<!--more-->
## ¿Por qué?

Llevo años con varios blogs ([VivirJugando](https://VivirJugando.wordpress.com){:target="_blank", rel="nofollow"}, [VivirTecleando](https://vivirtecleando.wordpress.com){:target="_blank"}, [VivirEmprendiendo](https://VivirEmprendiendo.wordpress.com){:target="_blank"} , etc... ) , todos ellos en WordpPress, tanto hospedados por WordPress.com como por mí.


Y, la verdad es que el trabajo de mantenimiento que conlleva, no me sale a cuenta.
Dado que a la hora de la verdad, lo único que necesito, es algo que sirva mis artículos a tu navegador.

 instalar plugings, problemas de compatibilidad entre ellos, por no hablar de los problemas de seguridad... e incluso tener que acceder a la plataforma para publicar.

## Problemas

WordPress es el CMS más usado del mundo, con una cantidad ingente de plugins a su disposición.

Así que con WordPress acababa teniendo que, o bien pagar la versión comercial (carísima, y encima apenas deja hacer nada), o bien mantener yo mismo los servidores para cada blog (o pasando a WordPress MultiSite, que es aún más dolor de pelotas)

Y luego, tenía que acceder al blog, para publicar, estando limitado a los editores web (o teniendo que estar haciendo Copy Paste desde otros.)

Esto sin olvidar que WordPress al ser **el CMS más usado del mundo**, también es el **más atacado**, y eso, supone qué:

1. Recibía muchos ataques (con el incremento de tráfico consecuente [^1])
2. Estaba obligado a estar actualizando todo constantemente
3. Demasiado a menudo algún plugin fallaba y había que invertir tiempo en arreglarlo
4. Necesitaba un servidor capaz de ejecutar PHP+mySQL
5. Publicar algo se convertía en algo incómodo y tedioso.

## Soluciones

Al pararme a pensar, como comenté antes, en realidad, únicamente necesitaba servir contenido estático, por lo que lo primero que pensé, es en simplemente pasar todo a páginas estáticas.
Y luego, recordé que existen generadores de páginas estáticas como [HUGO](https://gohugo.io/){:target="_blank"} o [Jekyll](https://jekyllrb.com/){:target="_blank"} que es el que decidí usar [^2].

### Jekyll

Jekyll está desarrollado por uno de los fundadores de GitHub, por lo que su integración, está más que garantizada y optimizada.

### MarkDown

[MarkDown](https://es.wikipedia.org/wiki/Markdown){:target="_blank"} es un lenguajeo informático para escribir texto super sencillo y extendido.
Que todo programador está más que acostumbrado a usar, y que está soportado por la totalidad de editores o IDEs que pueda usar un programador, simplificando así la tarea de redactar los posts, dado que se hace en un formato amigable, simple y rápido.


### GitHub

Para publicar las páginas, se usa un repositorio de GIT, otra herramienta a la que cualquier programador está más que acostumbrado ya que la usa constantemente a lo largo de cualquier día laboral.

Pero dado que Jekyll está integrado con GitHub, esto significa que con una simple combinación de teclas en nuestro IDE o editor, tras escribir el post, este queda automáticamente publicado, gracias a la magia de la integración continua y el automatic build, que usamos a diario en nuestro trabajo.


### Resumen

Está claro que WordPress es más potente gracias a sus plugins (en tiempo real), Jekyll tambien tiene plugins, pero en cuanto a simplicidad a la hora de publicar, crear etiquetas, secciones, y, en definitiva a la hora de escribir, o crear, contenido, Jekyll es mucho más rápido y eficaz, al menos, para mí.

Si, bien es cierto que Jekyll quizá puede ser más complejo de poner en marcha para un usuario medio, para un desarrollador, sin duda, Jekyll es una opción a tener en cuenta.



## Problemas encontrados al migrar

A continuación os detallo todos los problemas que me he encontrado, y encontraré al migrar desde Wordpress.com.

### Programar posts en el tiempo

Es lo primero que eché en falta, y lo [solucioné fácilmente como programar posts futuros](https://blog.marcosramirez.info/Como-programar-posts-con-Jekyll-en-GitHub-pages/), tal explico en [este post](https://blog.marcosramirez.info/Como-programar-posts-con-Jekyll-en-GitHub-pages/)

### El proceso de importación de posts es bastante "Meh"

Para importar los posts, [seguí los pasos que indican en la web oficial](https://import.jekyllrb.com/docs/wordpressdotcom/), y me encontré con lo siguiente:

1. El script descarga las imágenes automáticamente (aunque me puso muchas imágenes con nombres del tipo file.jpg?w=123)
2. Los posts los importa en formato HTML
3. Al importar en HTML me generó conflictos con comillas, y algunos caracteres especiales.

### No hay comentarios

Esto lo solventé con [Disqus](https://disqus.com/){:target="_blank"}, aunque... no estoy demasiado contento.

### No hay soporte para Twitter cards

Es lo último que he solucionado, simplemente añadiendo lo sigiente al archivo head.html:

```html
{% raw %}
<!-- Twitter cards -->
<meta name="twitter:site"    content="@{{ site.twitter_username }}">
<meta name="twitter:creator" content="@{{ page.author }}">
<meta name="twitter:title"   content="{{ page.title }}">

{% if page.summary %}
<meta name="twitter:description" content="{{ page.summary }}">
{% else %}
<meta name="twitter:description" content="{{ site.description }}">
{% endif %}

{% if page.image %}
<meta name="twitter:card"  content="summary_large_image">
<meta name="twitter:image" content="{{ site.url }}{{ page.image }}">
{% else %}
<meta name="twitter:card"  content="summary">
<meta name="twitter:image" content="{{ site.title_image }}">
{% endif %}
<!-- end of Twitter cards -->
{% endraw %}
```

Y luego poniendo las variables correspondientes en el config y en cada post.


Y... de monmento, esto es todo...


---
[^1]: El tráfico en servidores de internet, se paga, no es como en tu conexión de fibra de casa, que tiene un coste fijo.
[^2]: Por una simple cuestión de integración

***
Recuerda que puedes seguirme en mis redes sociales
