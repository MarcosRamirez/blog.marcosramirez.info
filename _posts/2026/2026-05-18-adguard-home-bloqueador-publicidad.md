---
title: "AdGuard Home: Tu propio bloqueador de publicidad y DNS (Serie Home Lab)"
slug: adguard-home-bloqueador-publicidad
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-05-18 08:30:00 +0200
image: /assets/img/headers/2026-adguard-home-bloqueador-publicidad-nanobanana.webp
image_alt: "Logo de AdGuard Home bloqueando anuncios"
categories: [Tecnología, Redes e Infraestructura]
tags: [dns, privacidad, seguridad, redes, bloqueador, publicidades]
pin: false
toc: true
excerpt: "AdGuard Home es un bloqueador de publicidad y rastreadores a nivel de red que funciona como DNS interceptivo. Protege todos los dispositivos sin instalar nada en cada uno, bloqueando publicidad, trackers, phishing y contenido adulto. Usa listas como EasyList y permite añadir tus propias para bloquear redes sociales y TikTok. Corre ligero en LXC con 512MB RAM."
twitter_description: "AdGuard Home: tu propio bloqueador de publicidad a nivel de red."
meta_description: "Protege tu red con AdGuard Home: bloqueador de publicidad y rastreadores a nivel DNS. Instala tu propio en Home Lab hoy. Lee más."
permalink: /:slug/
---

![{{ page.image_alt }}]({{ page.image }})

# Serie Home Lab

Continuamos con la serie de Home Lab. En el [post sobre Proxmox]({% post_url 2026/2026-05-11-mi-decision-de-usar-proxmox %}) os conté cómo tengo estructurados mis servicios. El primer servicio que deployé fue [**AdGuard Home**](https://adguard.com/es/adguard-home/overview.html){:target="_blank" rel="nofollow noopener"}, y es probablemente el más útil de todos.

## ¿Qué es AdGuard Home?

[**AdGuard Home**](https://adguard.com/es/adguard-home/overview.html){:target="_blank" rel="nofollow noopener"} es un software de código abierto que funciona como **DNS interceptivo**. En lugar de instalar extensiones en cada navegador o app, bloquea la publicidad y los rastreadores directamente en la red.

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

Viene con listas preconfiguradas ([EasyList](https://easylist.to/){:target="_blank" rel="nofollow noopener"}, [AdGuard DNS filter](https://github.com/AdAway/adaway.github.io){:target="_blank" rel="nofollow noopener"}), pero puedes añadir las tuyas propias. Yo tengo listas adicionales para bloquear trackers de redes sociales y stuff de [TikTok](https://www.tiktok.com/){:target="_blank" rel="nofollow noopener"}.

## Mi configuración

En mi caso, AdGuard Home corre en un contenedor LXC dentro de [Proxmox](https://www.proxmox.com/){:target="_blank" rel="nofollow noopener"} con:
- 1 vCPU
- 512MB de RAM (es muy ligero)
- 2GB de almacenamiento para logs

### DNS upstream

Uso estos DNS como upstream:
- Cloudflare: `1.1.1.1` y `1.1.1.1`
- Google: `8.8.8.8` y `8.8.4.4`

### Configuración de red

En mi router, configuro que todos los clientes reciban la IP del contenedor de AdGuard Home como servidor DNS.

## Cómo instalarlo

La forma más fácil es usando los [Proxmox Helper Scripts](https://community-scripts.org/){:target="_blank" rel="nofollow noopener"}:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/ct/adguard.sh)"
```

¿Dudas con el setup? Deja un comentario o [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y te ayudo.

***

¿Quieres ver el siguiente servicio de la serie? Stay tuned.

Y... hasta aquí por hoy!
