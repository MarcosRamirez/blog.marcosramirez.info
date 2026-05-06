---
title: "Immich: tus fotos privadas en el servidor, sin suscripción"
slug: immich-privacidad-tus-fotos
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-06-08 08:30:00 +0200
image: /assets/img/headers/2026/immich-privacidad-tus-fotos-nanobanana.webp
image_alt: "Logo de Immich para gestionar fotos privadas"
categories: [Tecnología, Home Lab, Automatización]
tags: [fotos, privacidad, self-hosted, backup, gestion-fotos, reconocimiento-facial]
pin: false
toc: true
excerpt: "Immich es la alternativa de código abierto a Google Photos para gestionar tus fotos en tu propio servidor. Sin suscripción, con reconocimiento facial local, búsqueda por IA, mapas GPS y álbumes compartidos. Backup automático desde iOS y Android, tú controlas tus recuerdos más privados."
twitter_description: "Immich: tus fotos en tu servidor, tú controlas los datos."
permalink: /:slug/
description: "Immich: alternativa a Google Photos. Tus fotos en tu servidor, sin suscripción. Reconocimiento facial local y backup automático. Descubre más."
last_modified_at: 2026-05-02 08:00:00 +0200
---

*[Este post forma parte de la serie [Home Lab]({% post_url 2026/2026-04-27-home-lab-filosofia %})]*

Cada día que pasa, subimos fotos desde el móvil sin pensar dónde van a parar. Cuando usas Google Photos, tus fotos van a los servidores de Google. Son analizadas para entrenar modelos de IA, y algún día podrían ser monetizadas de alguna forma que ni imaginamos.

[Immich](https://immich.app/){:target="_blank" rel="nofollow noopener"} es la alternativa. Un servidor de fotos que tienes en tu propia casa.

## El problema de Google Photos

### Privacidad

Google analiza todas tus fotos. Eso es un hecho. Sus algoritmos buscan rostros, objetos, ubicaciones para mejorar su IA. No lo hacen por bondad; lo hacen porque tus datos valen dinero.

### Coste

Lo que era gratis ahora cuesta:

- 100GB: $1.99/mes
- 200GB: $2.99/mes
- 2TB: $9.99/mes

Y el precio sube cada año.

### Dependencia

Si Google decide cerrar Google Photos mañana (han cerrado Reader, Inbox, Google+), ¿dónde van tus 10 años de recuerdos?

## La solución: Immich

### Tú controlas tus fotos

Con Immich, tus fotos están en tu servidor. Nadie más las ve. No hay análisis de IA externo. No hay condiciones de servicio que cambien. Tus fotos, tu disco duro, tu control.

### Sin suscripción mensual

Pagas el hardware una vez. Un disco de 4TB cuesta menos de €100 y te dura años. Comparado con €9.99/mes de Google, el ahorro es inmediato.

### Privacidad real

Tus fotos no salen de tu red local. Puedes acceder desde fuera con tu propia VPN. Nadie más tiene acceso a tus recuerdos más privados.

## Comparativa: Immich vs Google Photos

| Aspecto | Google Photos | Immich |
|---------|:---:|:---:|
| **Tus fotos** | En servidores de Google | En tu servidor |
| **Quién analiza tus datos** | Google | Tú |
| **Coste mensual** | €2-10/mes | €0 (+ electricidad) |
| **Almacenamiento** | Limitado por el plan | Ilimitado (tus discos) |
| **Acceso a algoritmos de IA** | De Google | Locales |
| **App móvil** | Sí | Sí |
| **Backup automático** | Sí | Sí |
| **Búsqueda por contenido** | Sí | Sí |
| **Reconocimiento facial** | Sí | Sí |
| **Álbumes compartidos** | Sí | Sí |
| **Tú decides el futuro** | Google decide | Tú decides |

## Por qué Immich

### 1. Privacidad absoluta

Tus fotos no salen de tu casa. El reconocimiento facial se hace con modelos locales. Ningún servidor externo procesa tus datos.

### 2. Tuyo para siempre

No hay riesgo de que cierren el servicio. No hay condiciones de servicio que cambien. Mientras tengas el disco duro, tienes tus fotos.

### 3. Todo incluido

- App para iOS y Android con backup automático
- Búsqueda por IA (busca "perro", "playa", "celebración")
- Reconocimiento facial
- Mapas con ubicación GPS
- Álbumes y compartir con pareja
- Modo "recuerdos" (fotos del mismo día en años anteriores)

### 4. Sin sorpresas

Sabes exactamente dónde están tus fotos. Puedes hacer backup. Puedes exportarlas cuando quieras.

## Lo que hay que saber

### Mantenimiento

Sí, tienes que actualizar el software. Pero es mínimo. Los cambios se hacen con Docker Compose en unos segundos.

### Acceso desde fuera

Necesitas una VPN (como la que explicaba en [mi post sobre Home Lab]({% post_url 2026/2026-04-27-home-lab-filosofia %})) para acceder desde fuera de casa. Vale la pena por la privacidad.

### Funciona en casi cualquier cosa

Un Raspberry Pi 4 con 2GB de RAM es suficiente. O un NAS antiguo. O una máquina virtual en Proxmox.

## Cómo instalarlo

### Opción 1: Docker

```bash
docker run -d \
  --name immich \
  -p 2283:3000 \
  -v /ruta/a/immich:/usr/src/app/upload \
  --restart unless-stopped \
  ghcr.io/immich-app/immich-server:release
```

### Opción 2: Proxmox Helper Scripts

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/ct/immich.sh)"
```

### Opción 3: Raspberry Pi

Con 2GB de RAM funciona en una Raspberry Pi 4.

## Después de instalar

1. Descarga todas tus fotos de Google Takeout
2. Sube las carpetas a Immich
3. Él solito indexa, reconoce rostros y objetos

## Preguntas frecuentes

<details>
<summary>¿Y si se va la luz eléctrica?</summary>

Tus fotos están en tu disco. Con un sistema de respaldos (backup), estás seguro.

</details>

<details>
<summary>¿Necesito mucho conocimiento técnico?</summary>

No. La app móvil funciona como Google Photos. Solo necesitas instalar el servidor una vez.

</details>

<details>
<summary>¿Puedo compartir con mi pareja?</summary>

Sí. Immich tiene "partner sharing" integrado.

</details>

<details>
<summary>¿Funciona con vídeos grandes?</summary>

Sí, pero asegúrate de configurar bien el proxy si usas nginx.

</details>

***

Compártelo si te ha gustado.

¿Estás listo para recuperar el control de tus fotos? Deja un comentario o [escríbeme](https://marcosramirez.dev/contacto/){:target="_blank"} y lo buscamos.

Y... hasta aquí por hoy!
