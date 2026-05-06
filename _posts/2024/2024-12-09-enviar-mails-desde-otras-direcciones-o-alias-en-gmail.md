---
title: "Configurar alias de email en Gmail: guía actualizada paso a paso"
slug: enviar-mails-desde-otras-direcciones-o-alias-en-gmail
authors:
  - Marcos Ramírez
  - Lucía
date: 2024-12-09 08:50:00 +0100
last_modified_at: 2026-05-04 08:00:00 +0200
image: /assets/img/headers/2024/enviar-mails-desde-otras-direcciones-o-alias-en-gmail-nanobanana.webp
image_alt: "Gmail con múltiples cuentas de email configuradas como alias"
categories:
  - Tecnología
  - Software y Apps
tags: [correo-electronico, smtp, productividad, herramientas-google, configuracion]
pin: false
toc: true
excerpt: "Corrijo y actualizo la documentación oficial de Google para configurar el envío de correos desde direcciones externas o alias en Gmail. La documentación de Google no está actualizada porque ya no aparece la opción Enviar verificación. En su lugar, debes configurar el servidor SMTP de la cuenta que quieres añadir, activar Acceso de aplicaciones menos seguras, usar el SMTP de Google smtp.gmail.com puerto 465, y crear una contraseña de aplicación específica en lugar de tu contraseña normal. También respondo preguntas frecuentes sobre el límite de alias, cómo aparecen los remitentes y el proceso de verificación necesario."
twitter_description: "Cómo configurar alias de email en Gmail: la documentación de Google está desactualizada."
description: "Configura alias de email en Gmail: corrige la documentación de Google y usa SMTP con contraseñas de aplicación. Aprende el proceso paso a paso. Lee más."
permalink: /:slug/
---

![{{ page.image_alt }}]({{ page.image }})

Este será un post corto, pero lo dejo por escrito porque la documentación de Google no está actualizada y me ha llevado más tiempo del que me hubiera gustado. Lo dejo aquí por si le sirve a alguien — y para mí mismo la próxima vez que lo necesite.

El caso de uso es claro: tienes una cuenta de Gmail y quieres poder enviar correos desde otra dirección —un alias, un dominio propio, una cuenta de trabajo— sin salir de Gmail ni gestionar múltiples clientes de correo. Google tiene documentación para esto, pero hay un punto concreto donde la realidad ya no coincide con lo que describen.

## La documentación de Google: qué funciona y qué no

[La documentación oficial de Google](https://support.google.com/mail/answer/22370?hl=es){:target="_blank" rel="nofollow noopener"} explica el proceso correctamente hasta el paso 5. Esos pasos no han cambiado y funcionan sin problemas:

1. Abre Gmail en escritorio y ve a **Configuración** (el icono de engranaje) → **Ver toda la configuración**.
2. Selecciona la pestaña **Cuentas e importación**.
3. En la sección "Enviar correo como", haz clic en **Añadir otra dirección de correo electrónico**.
4. Introduce el nombre que verá el destinatario y la dirección de email que quieres añadir.
5. Deja marcada la opción "Tratar como un alias" si quieres gestionarla desde la misma bandeja.

Hasta aquí todo correcto. El problema viene en el paso 6, donde la documentación indica que aparecerá un botón llamado **"Enviar verificación"**. Ese botón ya no existe.

## Paso 6: el método correcto

En lugar del botón de verificación, Gmail ahora te pide que configures el servidor SMTP de la cuenta que estás añadiendo. Esto tiene más sentido desde el punto de vista de seguridad, pero la documentación no refleja este cambio.

Lo que verás es un formulario con los siguientes campos:

- **Servidor SMTP**: `smtp.gmail.com`
- **Puerto**: `465` (SSL) o `587` (TLS)
- **Nombre de usuario**: tu dirección de Gmail completa
- **Contraseña**: aquí está la clave — **no uses tu contraseña normal**

El error más habitual es poner la contraseña de la cuenta de Google. Gmail lo rechazará aunque la contraseña sea correcta, porque las cuentas con verificación en dos pasos no aceptan contraseñas directas en aplicaciones de terceros. Necesitas una contraseña de aplicación específica.

## Cómo crear una contraseña de aplicación

Las contraseñas de aplicación son credenciales de 16 caracteres que Google genera para que aplicaciones específicas accedan a tu cuenta sin usar tu contraseña principal. Funciona aunque tengas verificación en dos pasos activa — de hecho, la verificación en dos pasos es requisito para poder crearlas.

Pasos para generarla:

1. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords){:target="_blank" rel="nofollow noopener"}.
2. Si no ves esta opción, primero activa la verificación en dos pasos en tu cuenta de Google.
3. En el campo "Nombre", escribe algo descriptivo. Mi recomendación: pon directamente la dirección de email que estás configurando como alias. Así, si mañana la revocas o revisas las contraseñas activas, sabrás exactamente para qué es cada una.
4. Haz clic en **Crear**.
5. Google te mostrará una contraseña de 16 caracteres **una sola vez**. Cópiala ahora.

Con esa contraseña vuelves al formulario de Gmail y la pegas en el campo "Contraseña". A partir de aquí el proceso funciona: Gmail enviará un código de verificación al email que estás añadiendo, introduces ese código, y el alias queda configurado.

Una nota importante sobre la gestión de contraseñas de aplicación: puedes crear tantas como necesites, una por cada aplicación o servicio que acceda a tu cuenta. Si en algún momento dejas de usar un alias o revocan el acceso de una aplicación, puedes eliminar solo esa contraseña sin afectar a las demás. Es buena práctica revisarlas periódicamente en [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords){:target="_blank" rel="nofollow noopener"} y borrar las que ya no uses.

## El proceso completo de un vistazo

Para tenerlo todo en un sitio:

1. Gmail → Configuración → Cuentas e importación → Añadir otra dirección de correo.
2. Rellena nombre y dirección del alias → Siguiente.
3. Servidor SMTP: `smtp.gmail.com` · Puerto: `465` · SSL activado.
4. Usuario: tu cuenta de Gmail. Contraseña: la contraseña de aplicación (no la normal).
5. Añadir cuenta.
6. Verifica el alias con el código que recibirás en esa dirección.
7. Listo. Ya puedes seleccionar el alias en el desplegable "De:" al redactar un correo.

## Qué hacer si sigue fallando

Si el servidor SMTP rechaza las credenciales aun con la contraseña de aplicación, comprueba:

- **Que la verificación en dos pasos esté activa**. Sin ella, las contraseñas de aplicación no están disponibles y Google no acepta conexiones SMTP externas de la misma forma.
- **Que estés usando la dirección de Gmail correcta como usuario**, no la del alias. El usuario SMTP siempre es tu cuenta de Google, aunque estés configurando otra dirección.
- **Que hayas copiado bien la contraseña de aplicación**. Son 16 caracteres sin espacios. Si la copiaste con espacios (Google los añade visualmente para facilitar la lectura), quítalos.
- **Puerto 587 como alternativa**. Algunos entornos bloquean el puerto 465. Prueba el 587 con TLS en lugar de SSL.

Si el problema persiste, revoca la contraseña de aplicación en [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords){:target="_blank" rel="nofollow noopener"} y genera una nueva. Ocasionalmente las credenciales quedan en un estado inconsistente y empezar de cero lo resuelve.

Ten en cuenta que Google puede tardar varios minutos en propagar los cambios de contraseña de aplicación. Si acabas de crear una y el servidor SMTP la rechaza al instante, espera cinco minutos y vuelve a intentarlo antes de asumir que hay otro problema.

<section>

## Preguntas frecuentes

<details>
<summary>¿Puedo usar alias sin tener Gmail de pago?</summary>

Sí. Puedes añadir hasta 5 alias usando la opción "Añadir otra dirección de correo" en configuración. No necesitas Google Workspace ni ningún plan de pago. El límite de 5 aplica a las cuentas gratuitas de Gmail.

</details>

<details>
<summary>¿El destinatario verá que el correo viene de Gmail?</summary>

Verá la dirección del alias como remitente. Dependiendo del cliente de correo del destinatario, puede aparecer una nota del tipo "enviado por gmail.com en nombre de tu@alias.com", pero la dirección principal visible es la del alias. En la mayoría de casos cotidianos no se nota la diferencia.

</details>

<details>
<summary>¿Necesito verificar el alias?</summary>

Sí. Cada alias requiere verificación mediante un código enviado al email que estás añadiendo. No puedes añadir una dirección que no controles: Google se asegura de que realmente tienes acceso a ella antes de permitirte usarla como remitente.

</details>

<details>
<summary>¿Qué pasa si cambio la contraseña de mi cuenta de Google?</summary>

Las contraseñas de aplicación no se invalidan cuando cambias tu contraseña principal. Sin embargo, si activas o desactivas la verificación en dos pasos, todas las contraseñas de aplicación se revocan automáticamente y tendrás que generarlas de nuevo.

</details>

<details>
<summary>¿Puedo eliminar un alias que ya no necesito?</summary>

Sí. Ve a Configuración → Cuentas e importación → "Enviar correo como" y haz clic en "Eliminar" junto a la dirección que ya no necesitas. Recuerda también revocar la contraseña de aplicación asociada en myaccount.google.com/apppasswords para mantener limpia la lista de accesos activos.

</details>

</section>

---

Compártelo si te ha resultado útil.

Si necesitas configurar esto a escala en tu empresa, [hablamos](https://marcosramirez.dev/contacto/){:target="_blank"}.

¿Has tenido algún problema diferente con los alias de Gmail? Deja un comentario y cuéntame.

Y... ¡hasta aquí por hoy!
