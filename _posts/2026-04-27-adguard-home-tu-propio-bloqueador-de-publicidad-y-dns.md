---
title: "AdGuard Home: Tu propio bloqueador de publicidad y DNS"
slug: adguard-home-tu-propio-bloqueador-de-publicidad
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-04-27 08:30:00 +0200
image: /assets/img/headers/adguard-home-tu-propio-bloqueador-de-publicidad.webp
categories: [Tecnología, Redes e Infraestructura]
tags: [adguard, dns, publicidad, privacidad, red, infraestructura]
pin: false
toc: true
excerpt: "Os presento AdGuard Home, el primer servicio de mi serie de Home Lab. Un bloqueador de publicidad y rastreadores a nivel de red que funciona como DNS interceptivo, protegiendo todos los dispositivos de tu red."
twitter_description: "AdGuard Home: tu propio bloqueador de publicidad a nivel de red."
permalink: /:slug/
---

![Post Header]({{ page.image }})

# Por qué un DNS interceptivo

En el [post sobre Proxmox]({% post_url 2026-05-11-mi-decision-de-usar-proxmox %}) os conté cómo tengo estructurados mis servicios. El primer servicio que deployé fue **AdGuard Home**, y es probablemente el más útil de todos.

## ¿Qué es AdGuard Home?

[AdGuard Home](https://adguard.com/es/adguard-home/overview.html){:target="_blank"} es un software de código abierto que funciona como **DNS interceptivo**. En lugar de instalar extensiones en cada navegador o app, bloquea la publicidad y los rastreadores directamente en la red.

### ¿Cómo funciona?

Cuando un dispositivo en tu red intenta conectarse a un servidor de publicidad o rastreo, AdGuard Home intercepta esa solicitud y la bloquea antes de que salga de tu red local. Es como tener un filtro a la entrada de tu casa.

## Qué bloquea AdGuard Home

- **Publicidad** en webs, apps y smart TVs
- **Rastreadores** de analytics y cookies de terceros
- **Domains maliciosos** (phishing, malware)
- **Contenido adulto** (configurable, ideal para familias)

## Por qué prefiero AdGuard Home

### 1. Cobertura universal

Al estar a nivel de DNS, protege **todos los dispositivos**: móviles, tablets, PCs, smart TVs, consola... No necesitas configurar nada en cada dispositivo, solo cambiar el DNS del router.

### 2. Bloqueo antes de cargar

Al bloquear a nivel DNS, ni siquiera se intenta cargar la publicidad. Esto ahorra ancho de banda, mejora la velocidad de carga y reduce el consumo de datos móviles.

### 3. Estadísticas centralizadas

Desde la UI de AdGuard Home puedes ver exactamente qué se está bloqueando, desde qué dispositivos, y qué dominios son los más bloqueados. Muy útil para entender qué pasa en tu red.

### 4. Listas personalizadas

Viene con listas preconfiguradas (EasyList, AdGuard DNS filter), pero puedes añadir las tuyas propias. Yo tengo listas adicionales para bloquear trackers de redes sociales y stuff de TikTok.

## Mi configuración

En mi caso, AdGuard Home corre en un contenedor LXC dentro de Proxmox con:
- 1 vCPU
- 512MB de RAM (es muy ligero)
- 2GB de almacenamiento para logs

### DNS upstream

Uso estos DNS como upstream:
- Cloudflare: `1.1.1.1` y `1.1.1.1`
- Google: `8.8.8.8` y `8.8.4.4`

### DHCP del router

En mi router (pfSense), tengo configurado que todos los clientes reciban AdGuard Home como servidor DNS. Así no tengo que cambiar nada en los dispositivos.

## Cómo instalarlo

La forma más fácil es mediante Docker Compose:

```yaml
services:
  adguardhome:
    image: adguard/adguardhome
    container_name: adguardhome
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "3000:3000/tcp"
    volumes:
      - ./work:/opt/adguardhome/work
      - ./conf:/opt/adguardhome/conf
    restart: unless-stopped
```

O si prefieres LXC, hay templates en los Proxmox Helper Scripts (solo para esto los uso, para el resto prefiero hacerlo a mano).

## ¿Merece la pena?

Sin duda. Verás cómo desaparecen los anuncios en YouTube, en apps de móvil, en webs... Y lo mejor es que no consume recursos prácticamente. Es el primer servicio que recomiendo a cualquiera que monte un Home Lab.

***

¿Te interesa montar tu propio AdGuard Home? ¿Tienes dudas sobre la configuración? Déjame un comentario y lo discutimos. Y si quieres que te ayude con tu Home Lab, escríbeme en [Contacto](https://marcosramirez.info/contacto/){:target="_blank"}.