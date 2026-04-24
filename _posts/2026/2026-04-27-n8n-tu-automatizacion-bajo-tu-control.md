---
title: "N8N: Tu automatización bajo tu control, sin pagos mensuales"
slug: n8n-automatizacion
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-04-27 08:30:00 +0200
image: /assets/img/headers/n8n-automatizacion-nanobanana.webp
categories: [Tecnología]
tags: [automatización, privacidad, Software y Apps, Productividad y Hacks]
pin: false
toc: true
excerpt: "N8N es una herramienta de automatización de código abierto que puedes instalar en tu Home Lab. Automatiza tus tareas sin pagar mensualidades y sin depender de servicios externos."
twitter_description: "Instala N8N en tu Home Lab y automatiza todo lo que quieras."
permalink: /:slug/
---

*[Este post forma parte de la serie [Home Lab]({% post_url 2026-05-04-por-que-tengo-un-home-lab-mi-filosofia %})]*

¿Te imaginas que todas esas tareas repetitivas que haces cada día se hicieran solas? Que cuando recibes un correo, se procese automáticamente. Que cuando subes un archivo a Dropbox, se sincronice con Google Drive. Que cuando llega un mensaje de Telegram, se guarde en una hoja de cálculo.

Eso es N8N.

## Qué es N8N

[N8N](https://n8n.io/){:target="_blank" :rel="nofollow noopener"} es una herramienta de automatización de flujo de trabajo (workflow automation). Te permite conectar diferentes servicios y aplicaciones para que trabajen juntas automáticamente.

Lo que hace especial a N8N es que es de código abierto. Puedes instalarlo en tu propio servidor, tienes control total sobre tus datos y no hay límite de ejecuciones como en las alternativas en la nube.

### Por qué existe

Las herramientas de automatización como [Zapier](https://zapier.com/){:target="_blank" :rel="nofollow noopener"} o [Make](https://www.make.com/){:target="_blank" :rel="nofollow noopener"} son excellent pero tienen un problema: son servicios en la nube que cuestan dinero y guardan tus datos en sus servidores.

N8N te da la potencia de esas herramientas pero en tu servidor. Sin límite de ejecuciones, sin pagar mensualidades, sin enviar tus datos a terceros.

### Sin sorpresas en la factura

Aquí está la gran diferencia: las capas gratuitas de [Make](https://www.make.com/){:target="_blank" :rel="nofollow noopener"} y [Zapier](https://zapier.com/){:target="_blank" :rel="nofollow noopener"} te dejan hacer casi nada. Make te permite 100 operaciones al mes y solo 2 flujos activos. Zapier te da 5 flujos y 100 tareas. Es prácticamente inútil para automatizaciones reales.

Con N8N self-hosted: ejecuta todo lo que necesites. Sin límite de operaciones. Sin límite de flujos activos. Sin esperar al siguiente ciclo de facturación para hacer algo que necesitas ahora.

## Características principales

### Editor visual de flujos de trabajo

N8N tiene un editor drag-and-drop muy intuitivo. Conectas nodos, configuras la lógica y listo. No necesitas programar, aunque puedes hacerlo si quieres.

### Más de 400 integraciones

N8N se conecta con cientos de servicios: [Slack](https://slack.com/){:target="_blank" :rel="nofollow noopener"}, [Discord](https://discord.com/){:target="_blank" :rel="nofollow noopener"}, [Telegram](https://telegram.org/){:target="_blank" :rel="nofollow noopener"}, [Google Sheets](https://www.google.com/sheets){:target="_blank" :rel="nofollow noopener"}, [Gmail](https://mail.google.com/){:target="_blank" :rel="nofollow noopener"}, [Notion](https://www.notion.so/){:target="_blank" :rel="nofollow noopener"}, [Airtable](https://airtable.com/){:target="_blank" :rel="nofollow noopener"}, [MySQL](https://www.mysql.com/){:target="_blank" :rel="nofollow noopener"}, [PostgreSQL](https://www.postgresql.org/){:target="_blank" :rel="nofollow noopener"}, y muchos más.

### Código personalizado

Si las integraciones existentes no son suficientes, puedes escribir tu propio código en JavaScript o Python dentro de los flujos de trabajo.

### Inteligencia artificial

N8N tiene nodos de IA integrados. Puedes usar [LangChain](https://www.langchain.com/){:target="_blank" :rel="nofollow noopener"}, conectar con [OpenAI](https://openai.com/){:target="_blank" :rel="nofollow noopener"}, [Anthropic](https://www.anthropic.com/){:target="_blank" :rel="nofollow noopener"} o modelos locales.

### Modo cola

Para automatizaciones que necesitan procesar muchas tareas, el modo cola permite escalar hasta 220 ejecuciones por segundo por instancia.

### Historial de ejecuciones

Puedes ver qué se ha ejecutado, qué ha fallado y por qué. Muy útil para depurar flujos de trabajo.

## Comparativa con alternativas

| Característica | N8N (Self-hosted) | N8N Cloud | Make | Zapier | Power Automate |
|----------------|:-----------------:|:---------:|:----:|:------:|:--------------:|
| **Precio** | Gratis | 20-667 €/mes | 9-299 $/mes | 19,99-599 $/mes | 12-40 $/mes |
| **Código abierto** | Sí | No | No | No | No |
| **Datos locales** | Sí | No | No | No | Parcial |
| **Ejecuciones ilimitadas** | Sí | No | No | No | Sí |
| **Integraciones** | 400+ | 400+ | 1.000+ | 5.000+ | 1.000+ |
| **Sin límite de tiempo** | Sí | Según plan | Según plan | Según plan | Sí |

### N8N Cloud

[N8N Cloud](https://n8n.io/pricing/){:target="_blank" :rel="nofollow noopener"} es la versión oficial hosted. Empieza en 20 euros al mes por 2.500 ejecuciones. Conveniente, pero pierdes el control de tus datos.

### Make

[Make](https://www.make.com/){:target="_blank" :rel="nofollow noopener"} (antes Integromat) es excellent y tiene más integraciones. Pero es código cerrado y las ejecuciones cuestan dinero.

### Zapier

[Zapier](https://zapier.com/){:target="_blank" :rel="nofollow noopener"} es el más popular. También el más caro. 20 euros al mes minimum y las ejecuciones se agotan rápido.

### Power Automate

[Power Automate](https://powerautomate.microsoft.com/){:target="_blank" :rel="nofollow noopener"} es de Microsoft. Está bien si usas el ecosistema Microsoft, pero fuera de eso es limitado.

## Por qué self-hosted importa

### Tus datos, tu control

Cuando automatizas con N8N en la nube, estás enviando datos de tus cuentas a servidores externos. Con N8N en tu Home Lab, solo tú tienes acceso.

### Sin límite de ejecuciones

Con N8N self-hosted, ejecuta todo lo que quieras. No hay límite mensual. No hay sorpresa en la factura.

### Sin pagos mensuales

La versión Community es gratis. Solo pagas la infraestructura donde lo alojes (una Raspberry Pi vale).

### Privacidad

Datos financieros, información personal, credenciales. Todo eso puede pasar por tus automatizaciones. ¿Por qué mandarlo a servidores de terceros?

## Instalación mediante LXC

La instalación recomendada en un Home Lab es mediante LXC:

```bash
curl -s -S -L https://raw.githubusercontent.com/n8n-io/n8n/master/docker-compose.yml | docker-compose -f - up
```

O con Docker directamente:

```bash
docker run -d \
  --name n8n \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=usuario \
  -e N8N_BASIC_AUTH_PASSWORD=contraseña \
  -v /ruta/a/datos:/home/node/.n8n \
  -p 5678:5678 \
  n8nio/n8n:latest
```

### Requisitos

- Un contenedor LXC con Docker
- Al menos 1 GB de RAM
- 2 GB de espacio en disco

### Configuración básica

1. Accede a la interfaz web
2. Crea tu usuario administrador
3. Empieza a crear flujos de trabajo

### Importante: backups

Como cualquier aplicación, es importante hacer backups de tus flujos de trabajo y datos.

**[En mi post sobre backups]({% post_url 2026-06-11-backup-3-2-1-proxmox %})** te explico cómo hacerlo.

## Ejemplos de automatizaciones

### Notificaciones de Telegram

Cuando recibes un mensaje en Telegram, que se guarde en una hoja de cálculo.

### Sincronización de archivos

Cuando subes un archivo a [Dropbox](https://www.dropbox.com/){:target="_blank" :rel="nofollow noopener"}, que se copie automáticamente a [Google Drive](https://drive.google.com/){:target="_blank" :rel="nofollow noopener"}.

### Procesamiento de correos

Cuando llega un correo con un attachment, que lo descargue y lo guarde en tu NAS.

### Monitorización

Que cada día revise el estado de tus servicios y te avise si algo no funciona.

## Cuándo elegir qué

### Elige N8N Self-hosted si:

- Quieres control total sobre tus automatizaciones
- No quieres pagar mensualidades
- Ya tienes un Home Lab funcionando
- Valoras tu privacidad

### Elige N8N Cloud si:

- No quieres mantener nada
- Te sirve con las ejecuciones del plan

### Elige Make si:

- Necesitas más integraciones
- Quieres algo más visual

### Elige Zapier si:

- No te importa pagar y quieres el más popular

***

Compártelo si te ha gustado.

¿Tienes dudas sobre N8N o la instalación? [Escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo debatimos.

Y... hasta aquí por hoy!