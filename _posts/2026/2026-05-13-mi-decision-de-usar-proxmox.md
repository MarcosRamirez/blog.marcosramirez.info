---
title: "Mi decisión de usar Proxmox: virtualización seria para Home Lab"
slug: mi-decision-de-usar-proxmox
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-05-13 07:30:00 +0200
image: /assets/img/headers/2026/mi-decision-de-usar-proxmox-nanobanana.webp
image_alt: "Interfaz de Proxmox VE mostrando máquinas virtuales y contenedores, representando la virtualización híbrida"
categories: [Tecnología, Home Lab, Redes e Infraestructura]
tags: [virtualizacion, contenedores, infraestructura, servidores, homelab]
pin: false
toc: true
excerpt: "Explico por qué elegí Proxmox como plataforma de virtualización para mi Home Lab sobre ESXi, Hyper-V o Docker standalone. Te muestro cómo estructuro servicios en LXC ligeros para AdGuard Home, Nginx Proxy Manager y Workers, y VMs para cargas con Docker como Home Assistant. Incluye comparativa de opciones y por qué evito Docker dentro de LXC."
twitter_description: "Por qué elijo Proxmox para mi Home Lab: virtualización seria."
permalink: /:slug/
description: "Mi decisión de usar Proxmox para virtualización en Home Lab sobre ESXi, Hyper-V o Docker. Ventajas de LXC vs VMs y por qué centralizo bases de datos. Descubre más."
---

![{{ page.image_alt }}]({{ page.image }})

## Por qué Proxmox y no otra cosa

En el [post anterior]({% post_url 2026/2026-04-27-home-lab-filosofia %}) os conté mi filosofía general sobre los Home Labs y por qué construí el mío. Hoy voy a entrar en detalle sobre una decisión concreta: **por qué elegí Proxmox** como plataforma de virtualización.

## Por qué Proxmox?

[Proxmox VE](https://www.proxmox.com/){:target="_blank"} es una plataforma de virtualización de código abierto que me permite:

- **Máquinas virtuales (VMs)**: Con sistema operativo completo
- **Contenedores LXC**: Más ligeros que las VMs, comparten el kernel del host

La combinación de VMs y LXCs me da la flexibilidad que necesito: algunos servicios van en contenedores ligeros (para algo que necesito correr 24/7 con poco consumo), otros van en VMs completas (cuando necesito más aislamiento o un sistema operativo específico).

Destaco que, aunque Proxmox incluye interfaz web, prefiero gestionar todo vía línea de comandos usando las herramientas nativas `pct` (para contenedores LXC) y `qm` (para máquinas virtuales), lo que me da mayor automatización y control.

### LXC vs VMs

Los **contenedores LXC** son perfectos para servicios ligeros como AdGuard Home, Nginx Proxy Manager, o Workers con scripts a medida para tareas específicas. Todos asignan IP estática, consumen pocos recursos, arranque instantáneo, y puedo tener docenas corriendo en un solo host.

Las **VMs** las uso para servicios que necesitan más aislamiento, un sistema operativo específico, o cargas con Docker (como Home Assistant): pfSense para firewall, Windows puntual, Linux con desktop, o Workers que requieran Docker.

## Por qué no otras opciones?

### ESXi
[VMware ESXi](https://www.vmware.com/products/esxi-and-vsphere.html){:target="_blank" rel="nofollow noopener"} es excelente, pero tiene problemas para un Home Lab:
1. **Precio**: La versión gratuita tiene limitaciones severas
2. **Recursos**: Consumo relativamente alto para lo que ofrece
3. **Web**: Requiere una cuenta de VMware para acceder a la UI

### Hyper-V
[Microsoft Hyper-V](https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/){:target="_blank" rel="nofollow noopener"} está ligado a Windows Server o Windows Pro. Si quieres algo más nativo para Linux, no es lo ideal.

### Docker standalone (sin Proxmox)
Docker en un solo host está bien para empezar, pero:
- ¿Qué pasa cuando quieres aislar servicios?
- ¿Cómo manejas los backups?
- ¿Cómo aíslas redes?
- ¿Qué pasa si el host cae?

Con Proxmox tengo:
- Snapshots instantáneos (antes de hacer cambios peligrosos)
- Live migration (migrar servicios entre hosts sin downtime)
- Alta disponibilidad (si me da la gana configurarla)
- Backup centralizado desde la UI

## Cómo estructuro mis servicios

Gestiono Proxmox principalmente vía CLI (`pct create` para LXC, `qm create` para VMs) en lugar de la interfaz web, con esta arquitectura clara:

1. **Contenedores LXC** - Creados con `pct create` (o UI si se prefiere), ejecutan servicios directamente sin Docker: AdGuard Home, Nginx Proxy Manager, o Workers con scripts personalizados para tareas específicas. Todos tienen IP estática asignada.
2. **Máquinas Virtuales** - Creadas con `qm create` (o UI), para cargas que requieren Docker (como Home Assistant), sistemas operativos específicos, o Workers que necesiten entornos aislados. También asignan IP estática.
3. **Bases de datos centralizadas** - Todos los servicios (LXC o VMs) apuntan a una instancia única de MariaDB/PostgreSQL centralizada.

Esto reduce drásticamente el consumo de RAM: una sola instancia de base de datos, un solo backup, una sola actualización.

### Ejemplo: Nextcloud en Proxmox

Para Nextcloud, uso una VM (donde sí es correcto usar Docker):
1. Crear una VM con `qm create` (o UI de Proxmox)
2. Entrar a la VM (`qm enter <vmid>`)
3. Instalar Docker y Docker Compose
4. Desplegar Nextcloud mediante docker-compose.yml
5. **Apuntar al MariaDB centralizado**

Nunca instalo Docker dentro de LXC: es una mala práctica que genera problemas de aislamiento y rendimiento.

## La visión a largo plazo

Con Proxmox puedo ir escalando:
- Añadir más nodos al cluster
- Configurar alta disponibilidad real
- Migrar servicios entre hosts sin downtime
- Snapshotear antes de hacer cambios peligrosos

Todo esto con control total sobre dónde está cada cosa. Sin dependencias ocultas. Sin magia.

### Comparativa: Proxmox vs alternativas

| Característica | Proxmox VE | ESXi | Hyper-V | Docker Standalone |
|---|:---:|:---:|:---:|:---:|
| **Tipo** | Híbrido (VM + LXC) | Solo VM | Solo VM | Contenedores |
| **Precio** | **Gratis** | Freemium (vSphere: $200-500/año) | Negocio (Server: $1,069+) | Gratis |
| **Código abierto** | **Sí** | No | No | Sí |
| **UI web** | **Sí** | Sí | Sí | No |
| **Snapshots** | **Sí** | Sí | Sí | Limitado |
| **Live migration** | **Sí** | Sí | Sí | No |
| **Clustering** | **Sí** | **Sí** | Sí | No |
| **LXC containers** | **Sí** | No | No | N/A |
| **Consumo recursos** | Bajo | Alto | Medio | Bajo |

**Proxmox** gana en relación calidad-precio: código abierto, sin licencias, UI web completa, soporta tanto VMs como contenedores ligeros (LXC). Docker standalone es más simple pero carece de gestión centralizada, snapshots y alta disponibilidad.

En el [post dedicado a los helper scripts](/no-uso-proxmox-helper-scripts/) os cuento por qué huyo de los scripts que prometen instalar todo en un clic y por qué creo que esta aproximación manual es mejor a largo plazo. Eso sí, en ocasiones utilizo los [Proxmox Helper Scripts](https://community-scripts.org/){:target="_blank" rel="nofollow noopener"} para agilizar instalaciones específicas, siempre revisando previamente lo que ejecutan.

Además, estoy preparando una mini guía/tutorial de Proxmox donde compartiré mi flujo de trabajo completo: desde la gestión vía CLI con `pct` y `qm`, hasta la estructura de servicios, bases de datos centralizadas y buenas prácticas para Home Lab.

## Preguntas frecuentes

<details>
<summary>¿Qué es LXC?</summary>

LXC (Linux Containers) es una tecnología de virtualización a nivel de sistema operativo que permite ejecutar múltiples sistemas Linux aislados en el mismo kernel del host.

</details>

<details>
<summary>¿Puedo usar Proxmox sin experiencia previa?</summary>

Sí, aunque tiene curva de aprendizaje. La documentación es buena y hay muchos tutoriales para empezar.

</details>

<details>
<summary>¿Proxmox es seguro?</summary>

Sí, es código abierto con una comunidad activa. Los contenedores LXC ofrecen aislamiento entre servicios.

</details>

***
¿Usas Proxmox? ¿Tienes alguna duda sobre virtualización? Deja un comentario o [escríbeme](https://marcosramirez.dev/contacto/){:target="_blank"} y lo discutimos.

Compártelo si te ha gustado.

Y... ¡hasta aquí por hoy!
