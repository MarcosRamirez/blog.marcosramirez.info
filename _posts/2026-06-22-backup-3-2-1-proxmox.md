---
title: "La regla 3-2-1 de backups: No perder tus datos nunca más"
slug: backup-3-2-1
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-06-22 08:30:00 +0200
image: /assets/img/headers/backup-3-2-1.webp
categories: [Tecnología, Automatización]
tags: [backup, 3-2-1, datos, privacidad, proxmox]
pin: false
toc: true
excerpt: "La regla 3-2-1 de backups es el estándar gold para proteger tus datos. 3 copias, 2 tipos de almacenamiento, 1 fuera de casa. Te explico cómo aplicarla y qué herramientas usar en tu Home Lab."
twitter_description: "La regla 3-2-1 de backups explicada: protege tus datos con3 copias en 2 tipos diferentes y 1 fuera de casa."
permalink: /:slug/
---

*[Este post forma parte de la serie [Home Lab]({% post_url 2026-05-04-por-que-tengo-un-home-lab-mi-filosophia %})]*

Un disco duro puede fallar. Un ransomware puede cifrar todos tus archivos. Un incendio puede destruir tu servidor. Si solo tienes una copia de tus datos, los has perdido.

La buena noticia: proteger tus datos es fácil si sigues una regla simple.

## La regla 3-2-1

Fue creada por un photographe llamado Peter Krogh, pero es adoptada por gobiernos y empresas de todo el mundo. Dice esto:

- **3 copias** de tus datos (el original + 2 backups)
- **2 tipos diferentes** de almacenamiento (NAS + nube, o disco + SSD)
- **1 copia fuera de casa** (en otra ubicación o en la nube)

En otras palabras: si pierdes el original y un backup, todavía tienes otro.

### Por qué funciona

Cada punto de fallo es independiente. Un ransomware que entra por tu red puede cifrar tu NAS y tu ordenador, pero no puede cifrar el disco que tienes en casa de tu madre ni el backup en la nube.

## Cómo aplicarlo en tu Home Lab

### Copia 1: Tu datos originales

Son tus fotos, documentos, configuraciones, base de datos. Todo lo que no quieres perder.

En mi caso:

- Fotos desde el móvil (Immich)
- Documentos importantes (Nextcloud)
- Configuraciones de mis servicios (en un repositorio Git)
- Bases de datos (MariaDB centralizado)

### Copia 2: Backup local

En mi Home Lab, tengo un NAS o disco adicional donde hago备份 local diarias. Si el servidor principal falla, levanto todo desde aquí.

Si usas [Proxmox]({% post_url 2026-05-11-mi-decision-de-usar-proxmox %}), [Proxmox Backup Server](https://www.proxmox.com/en/proxmox-backup-server) (PBS) es la solución nativa y gratuita.

### Copia 3: Backup fuera de casa

Aquí entran las opciones cloud.Tienes dos caminos:

1. **Servicio cloud especializado**: Backblaze B2, Wasabi, IDrive
2. **o un PBS gestionado**: Un servidor PBS en otro lugar físico

## Comparativa: Backup cloud vs PBS local

| Aspecto | Backblaze B2 | Wasabi | PBS Local | PBS Gestionado |
|---------|:---:|:---:|:---:|:---:|
| **Coste almacenamiento** | $6/TB/mes | $8/TB/mes | Tu hardware | €8-12/TB/mes |
| **Egress fees** | $0.01/GB | $0 | €0 | €0 |
| **Encriptación** | AES-256 | AES-256 | AES-256 | AES-256 |
| **Acceso** | API S3 | API S3 | NFS/SMB | NFS/SMB |
| **Deduplicación** | Sí | Sí | Sí | Sí |
| **Setup** | 15 min | 15 min | 1 hora | 15 min |

### Backblaze B2

- $6/TB/mes (prácticamente el más barato)
- Sin limitaciones de egress para restores
- API compatible con todo

### Wasabi

- $8/TB/mes
- Sin egress fees
- Pero te cobran si borras antes de 90 días

### Proxmox Backup Server (PBS)

- Completamente gratuito (código abierto)
- Deduplicación a nivel de chunk
- Encriptación cliente-lado
- Integración nativa con Proxmox

En mi caso tengo PBS local + un SDS gestorado fuera de casa.

## Cuál elegir

### Para principiantes

Backblaze B2. Solo configuras un cliente y ya está. $6/TB/mes por menos de lo que pagas un café.

### Para usuarios de Proxmox

PBS local + Sync a un PBS gestionado. Tienes control total, sin límite mensual.

### Para paranoicos (en el buen sentido)

3-2-1 completo:

1. NAS local (copia diaria)
2. PBS local (copia cada hora)
3. Backblaze B2 o SDS fuera de casa

## Cuánto almacenamiento necesitas

| Tipo de datos | Tamaño típico |
|---|---|
| Fotos (móvil) | 50-100 GB/año |
| Vídeos 4K | 200-500 GB/año |
| VMs de Proxmox | 50-200 GB |
| Documentos | 1-10 GB |

Un disco de 4TB te dura años. Un NAS básico como Synology DS224+ cuesta ~€250 y tiene bays para expandir.

## No es opcional

El 60% de las empresas que pierden datos críticos se-ren en 6 meses. No dejes que te pase.

Una vez configurado, el backup se hace solo. Solo tienes que acordarte de probar que funciona una vez al mes.

***

Compártelo si te ha gustado.

¿Tienes configurado tu backup? ¿Dudas sobre qué servicio usar? Déja un comentario o [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo debatimos.

Y... hasta aquí por hoy!