---
title: Enviar mails desde otras direcciones o alias en gmail
slug: enviar-mails-desde-otras-direcciones-o-alias-en-gmail
author: Marcos Ramírez
date: 2024-12-09 8:50:00 +0100
image: /assets/img/headers/default.webp
categories: [Informatica, gmail]
tags: [gmail, alias, correo]  
pin: false
toc: true
excerpt: Ayer me pasé media tarde intentando configurar una cuenta de correo en gmail para enviar correos desde ella. La verdad es que no es nada complicado, pero la documentación  de google no está actualizada, así que aquí os dejo los pasos a seguir.
permalink: /:slug/ 
---

Esté será un post corto, pero lo dejo por escrito dado que la documentación de google no está actualizada y me ha llevado más tiempo del que me hubiera gustado, así que, dejo la solución aquí por si a alguien le sirve. (al menos a mi me servirá para la próxima vez que lo necesite).

Básicamente, lo que hay que hacer es seguir [la documentación de Google](https://support.google.com/mail/answer/22370?hl=es#:~:text=Haz%20clic%20en%20la%20pesta%C3%B1a,la%20que%20quieras%20enviar%20mensajes.&text=Enviar%20verificaci%C3%B3n.) hasta el punto 6.

# Paso 6 CORRECTO.

Aquí es donde la documentación de google no está actualizada, ya que no aparece la opción de "Enviar verificación" que se menciona en la documentación.

En su lugar, os pide que configuréis el servidor SMTP de la cuenta que queréis añadir. Para ello, tenéis que ir a la configuración de la cuenta que queréis añadir y buscar la opción de "Acceso de aplicaciones menos seguras" y activarla.

Después, tenéis que poner el SMTP de GOOGLE, que es `smtp.gmail.com` y el puerto 465. Además, tenéis que poner vuestro correo y aquí viene otra cosa importante NO hay que poner el password de vuestra cuenta, sino que teneis que crear una [contraseña de aplicación](https://myaccount.google.com/apppasswords). os recomiendo que le pongáis un nombre descriptivo para que sepáis para que es esa contraseña, osea, directamente de nombre, poned la dirección de email que estéis añadiendo como alias.

Y listo... ya podéis enviar correos desde esa dirección.

Es una cosa sencilla, pero que no han actualizado en la documentación

***
No olvides compartir el post si te ha gustado