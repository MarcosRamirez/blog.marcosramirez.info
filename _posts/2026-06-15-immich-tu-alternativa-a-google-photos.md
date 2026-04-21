---
title: "Immich: Tu alternativa a Google Photos, en tu propio servidor"
slug: immich-fotos
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-06-15 08:30:00 +0200
image: /assets/img/headers/immich-fotos.webp
categories: [Tecnología, Automatización]
tags: [immich, google-photos, fotos, privacidad, self-hosted, backup]
pin: false
toc: true
excerpt: "Te presento Immich, la alternativa de código abierto a Google Photos que puedes tener en tu propio Home Lab. Misma experiencia, tus fotos en tu servidor, sin suscripción mensual."
twitter_description: "Immich: alternativa a Google Photos en tu propio servidor, sin pagar mensual."
permalink: /:slug/
---

*[Este post forma parte de la serie [Home Lab]({% post_url 2026-05-04-por-que-tengo-un-home-lab-mi-filosofia %})]*

Desde que Google cambió su política de almacenamiento ilimitado en 2021, millones de usuarios pagan mensualmente por tener nuestras fotos en la nube. Entre el coste, la privacidad, y depender de terceros, tiene sentido buscar alternativas.

[Immich](https://immich.app/){:target="_blank" :rel="nofollow noopener"} es la respuesta. Una alternativa a Google Photos de código abierto que puedes correr en tu propio servidor.

## Por qué buscar alternativas a Google Photos

### El problema de Google Photos

- **Precio**: Lo que era "gratis" ahora cuesta $2.99/mes por 100GB
- **Privacidad**: Google analiza todas tus fotos para entrenar sus modelos de IA
- **Límites**: Cada vez más restrictivo con la calidad de compresión
- **Dependencia**: Si mañana Google cierra el servicio, ¿dónde van tus fotos?

### La alternativa: Self-hosting

Tener tus fotos en casa significa:

- Coste fijo (hardware + electricidad, no mensual)
- Privacidad total (tus fotos en tu servidor, no en Google)
- Sin límites de almacenamiento (añade discos cuando quieras)
- Control completo sobre tus datos

## Qué es Immich

[Immich](https://immich.app/){:target="_blank" :rel="nofollow noopener"} es un servidor de fotos y vídeos de código abierto, diseñado específicamente para reemplazar Google Photos. Fue construido con un enfoque "mobile-first" y tiene más de 90,000 estrellas en GitHub.

Características principales:

- **Backup automático desde móvil**: App nativa para iOS y Android
- **Búsqueda por IA**: Busca "perro en la playa" y te lo encuentra
- **Reconocimiento facial**: Detecta personas automáticamente
- **Vista de timeline**: Como Google Photos, cronológica
- **Mapas**: Ver tus fotos en el mapa según ubicación GPS
- **Álbumes compartidos**: Comparte con familia o pareja
- **Transcodificación de vídeo**: Maneja vídeos automáticamente

No es solo una galería; es una alternativa completa con la experiencia que conoces de Google Photos.

## Comparativa: Immich vs Google Photos

| Característica | Google Photos | Immich (Self-Hosted) |
|---|:---:|:---:|
| **Coste** | $0-$9.99/mes | Gratis (hardware) |
| **Privacidad** | Google analiza tus fotos | 100% privado y local |
| **Búsqueda por IA** | Excelente (cloud) | Excelente (ML local) |
| **Reconocimiento facial** | Automático | Automático |
| **Límite almacenamiento** | 15GB gratis, luego $ | Ilimitado (tus discos) |
| **App móvil** | Sí (top-tier) | Sí (iOS + Android) |
| **Backup automático** | Sí | Sí |
| **Álbumes compartidos** | Sí | Sí |
| **Partner sharing** | Sí | Sí |
| **Mapas (GPS)** | Sí | Sí |
| **Memories / On This Day** | Sí | Sí |
| **Vídeos** | Sí | Sí (con transcodificación) |
| **Tú controlas los datos** | No | Sí |

## Por qué Immich gana

### 1. La IA se queda en local

Puedes buscar "fotos de celebración", "comida en un plato", o "mi perro en el sofá" y Immich te lo encuentra. Todo gracias a modelos de machine learning que corren en tu servidor, no en la nube de Google.

### 2. Almacenamiento infinito

Añade un disco de 4TB cuando necesites más. El coste por TB en un NAS o servidor local es muy inferior al que cobra Google.

### 3. Tú controlas todo

Sin términos de servicio que cambien de la noche a la mañana. Sin riesgo de que cierren el servicio. Tus fotos, tu servidor, tus reglas.

### 4. Misma experiencia móvil

La app de Immich hace backup automático en segundo plano, como Google Photos. No tienes que acordarte de subir nada.

## Lo que pierdes (honestamente)

No todo son ventajas. Sé honesto(a) sobre lo que pierdes:

- **Mantenimiento**: Tienes que ocuparte de actualizaciones y backups
- **Acceso remoto**: Necesitas VPN o configurar acceso seguro
- **Escala masiva**: Con +500,000 fotos puede haber ciertos problemas
- **IA de Google**: La búsqueda de Immich es buena, pero no exactamente a nivel de Google (aunque se acerca)

Para la mayoría de usuarios, estas limitaciones valen la pena por la privacidad y el ahorro.

## Otras alternativas a considerar

Si Immich no te convence, hay otras opciones:

| Alternativa | Mejor para |
|---|---|
| [PhotoPrism](https://www.photoprism.app/){:target="_blank" :rel="nofollow noopener"} | Estabilidad, soporte RAW |
| [Ente](https://ente.io/){:target="_blank" :rel="nofollow noopener"} | Solución cloud (encriptada end-to-end) |
| Synology Photos | Si ya tienes un NAS Synology |

Pero Immich es el que más se acerca a la experiencia completa de Google Photos.

## Cómo instalarlo

### Opción 1: Docker (recomendado)

```bash
docker run -d \
  --name immich \
  -p 2283:3000 \
  -v /ruta/a/immich:/usr/src/app/upload \
  --restart unless-stopped \
  ghcr.io/immich-app/immich-server:release
```

### Opción 2: Proxmox Helper Scripts

Si usas [Proxmox]({% post_url 2026-05-11-mi-decision-de-usar-proxmox %}), hay un helper script:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/ct/immich.sh)"
```

### Opción 3: Raspberry Pi (básico)

Con 2GB+ de RAM, funciona en una Raspberry Pi 4.

## Después de la migración

Si vienes de Google Photos, el proceso es sencillo:

1. Descarga todas tus fotos de Google Photos (Takeout)
2. Instala Immich
3. Sube las fotos vía la web o conecta como drive externo
4. Immich indexará todas y empezará a reconocer rostros y objetos

## Preguntas frecuentes

### ¿Necesito un servidor potente?

No especialmente. Un NAS, Raspberry Pi 4, o cualquier mini PC con 2-4GB de RAM funciona.

### ¿Funciona con vídeos grandes?

Sí, Immich transcodifica vídeos automáticamente. Solo asegúrate de configurar un `client_max_body_size` grande en nginx si usas reverse proxy.

### ¿Puedo usarlo en familia?

Sí. Immich soporta múltiples usuarios y partner sharing. Cada usuario tiene su biblioteca privada y puede compartir con familia.

### ¿Y si se va la luz?

Tus fotos están en tu disco duro. Si tienes backup (y deberías), no pierdes nada.

### ¿Acceso desde fuera de casa?

Necesitas VPN o configurar Nabu Casa Cloud. No recomiendo abrir puertos directamente.

***

Compártelo si te ha gustado.

¿Estás usando alguna alternativa a Google Photos? ¿Tienes dudas sobre la migración? Déja un comentario o [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo debatimos.

Y... hasta aquí por hoy!