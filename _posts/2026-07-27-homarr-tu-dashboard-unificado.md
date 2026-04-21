---
title: "Homarr: Tu dashboard unificado para el Home Lab"
slug: homarr-dashboard
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-07-27 08:30:00 +0200
image: /assets/img/headers/homarr-dashboard.webp
categories: [Tecnología]
tags: [homarr, dashboard, visualización, Software y Apps, Sistemas]
pin: false
toc: true
excerpt: "Homarr es un dashboard de código abierto que puedes instalar en tu Home Lab. Sirve como página de inicio para acceder a todos tus servicios. Todo desde una interfaz visual moderna."
twitter_description: "Instala Homarr y centraliza el acceso a todos tus servicios del Home Lab."
permalink: /:slug/
---

*[Este post forma parte de la serie [Home Lab]({% post_url 2026-05-04-por-que-tengo-un-home-lab-mi-filosofia %})]*

Llevo un tiempo instalando servicios en mi Home Lab. [Home Assistant]({% post_url 2026-06-01-home-assistant-tu-cerebro-de-domotica %}), [AdGuard]({% post_url 2026-05-18-adguard-home-tu-propio-bloqueador-de-publicidad %}), [Vaultwarden]({% post_url 2026-07-13-vaultwarden-tus-contraseñas-seguras %}), [N8N]({% post_url 2026-04-27-n8n-tu-automatizacion-bajo-tu-control %}). Cada uno con su propia URL, su propio puerto. Al final, recordar qué IP tiene cada cosa y qué puerto usa se convierte en un lío.

Ahí entra Homarr.

## Qué es Homarr

[Homarr](https://homarr.dev/){:target="_blank" :rel="nofollow noopener"} es un dashboard moderno y fácil de usar para tu Home Lab. Es una página web donde ves todos tus servicios organizados, con iconos, estado y acceso con un clic.

Lo mejor: todo se configura desde la interfaz web. No hay que editar archivos YAML ni archivos de configuración. Arrastras, sueltas, configuras y listo.

### Por qué un dashboard

Cuando tienes 5 o 10 servicios, es fácil recordar las URLs. Pero cuando tienes 20, 30... empiezan los problemas. Un dashboard te da:

- Acceso centralizado a todo
- Estado de los servicios (¿está caído algo?)
- Información relevante de un vistazo
- Busca rápido sin recordar URLs

## Características principales

### Editor visual drag-and-drop

Homarr tiene un editor visual. Añades widgets, los arrastras, los recolocas, cambias el tamaño. Todo desde el navegador. Es muy intuitivo.

### Más de 50 integraciones

Se conecta con tus servicios favoritos:

- [Home Assistant](https://www.home-assistant.io/){:target="_blank" :rel="nofollow noopener"}: estado de dispositivos, automatizaciones
- [Sonarr](https://sonarr.tv/){:target="_blank" :rel="nofollow noopener"}, [Radarr](https://radarr.video/){:target="_blank" :rel="nofollow noopener"}, [Lidarr](https://lidarr.audio/){:target="_blank" :rel="nofollow noopener"}: estado de descargas
- [Jellyfin](https://jellyfin.org/){:target="_blank" :rel="nofollow noopener"}, [Plex](https://www.plex.tv/){:target="_blank" :rel="nofollow noopener"}: qué se está reproduciendo
- [Immich]({% post_url 2026-06-08-immich-tus-fotos-tu-servidor-tu-privacidad %}): tus fotos
- [Vaultwarden]({% post_url 2026-07-13-vaultwarden-tus-contraseñas-seguras %}): tus contraseñas
- Y muchos más

### Más de 10.000 iconos

Viene con miles de iconos integrados. Encuentras el de casi cualquier servicio.

### Autenticación integrada

Usuarios, permisos, grupos. Puedes decidir quién ve qué. Cada miembro de la familia puede tener su propio dashboard.

### Diseño responsive

Funciona en móvil, tablet y escritorio.

### Múltiples boards

Puedes crear varios dashboards. Uno para medios, otro para automatización, otro para administración.

### Integración con Docker

Si le das acceso al socket de Docker, Homarr descubre automáticamente los contenedores que tienes corriendo y los añade al dashboard.

## Comparativa con alternativas

| Característica | Homarr | Homepage | Dashy | Homer |
|----------------|:------:|:--------:|:-----:|:-----:|
| **Configuración** | GUI visual | YAML | YAML | YAML |
| **Integraciones** | 50+ | 80+ | 40+ | Ninguna |
| **Monitorización** | Sí | Sí | Sí | No |
| **RAM** | ~200 MB | ~50 MB | ~150 MB | ~30 MB |
| **Autenticación** | Sí | No | Sí | No |
| **Docker auto-descubrimiento** | Sí | No | No | No |

### Homepage

[Homepage](https://gethomepage.dev/){:target="_blank" :rel="nofollow noopener"} es excelente si te gusta configurar en YAML. Tiene más integraciones pero necesitas editar archivos. No tiene autenticación integrada.

### Dashy

[Dashy](https://dashy.to/){:target="_blank" :rel="nofollow noopener"} es más flexible pero también más complejo. Tiene más opciones de personalización pero requiere más configuración.

### Homer

[Homer](https://github.com/bastienwirtz/homer){:target="_blank" :rel="nofollow noopener"} es el más ligero. Pero apenas tiene integraciones reales, solo enlaces. Muy básico.

## Por qué elegí Homarr

### Configuración visual

No quiero editar YAML cada vez que añado un servicio. Con Homarr, lo hago desde el navegador. Añades servicio, configuras, listo.

### Integración con Docker

Le doy acceso al socket de Docker y automáticamente aparecen mis contenedores. Actualizo un servicio en Proxmox y Homarr lo detecta. Muy cómodo.

### Autenticación

Puedo dar acceso a mi familia sin que vean todos los servicios. Cada uno tiene su usuario y sus permisos.

### Información de un vistazo

El widget de [Sonarr](https://sonarr.tv/){:target="_blank" :rel="nofollow noopener"} y [Radarr](https://radarr.video/){:target="_blank" :rel="nofollow noopener"} me dice cuántas descargas hay activas. El de [Jellyfin](https://jellyfin.org/){:target="_blank" :rel="nofollow noopener"} me dice qué se está reproduciendo. Todo sin entrar en cada servicio.

### Sin límite de servicios

A diferencia de servicios en la nube que te limitan, aquí puedes poner todos los servicios que quieras.

## Instalación mediante LXC

La instalación recomendada en un Home Lab es mediante LXC. Usa el script de instalación automático:

```bash
curl -s -S -L https://raw.githubusercontent.com/homarr-labs/homarr/master/install.sh | bash
```

### Requisitos

- Un contenedor LXC
- Al menos 256 MB de RAM
- 1 GB de espacio en disco

### Configuración básica

1. Accede a la interfaz web
2. Crea tu usuario administrador
3. Empieza a añadir servicios

### Acceso al socket de Docker

Si quieres que Homarr detecte automáticamente tus contenedores, activa la integración de Docker en la configuración. Nota: esto da acceso de lectura a la lista de contenedores.

## Cuándo elegir qué

### Elige Homarr si:

- Quieres configuración visual
- Necesitas autenticación
- Quieres integración con Docker
- Tienes muchos servicios y quieres ver su estado

### Elige Homepage si:

- Prefieres configuración como código (YAML)
- No necesitas autenticación
- Quieres más integraciones de servicios
- Tienes pocos recursos

### Elige Dashy si:

- Necesitas máxima personalización
- No te importa editar YAML

### Elige Homer si:

- Solo quieres enlaces simples
- Tienes recursos muy limitados

***

Compártelo si te ha gustado.

¿Tienes dudas sobre Homarr o la instalación? [Escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo debatimos.

Y... hasta aquí por hoy!