---
title: "Mi decisión de usar Proxmox: virtualización seria para Home Lab"
slug: mi-decision-de-usar-proxmox
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-05-11 08:30:00 +0200
image: /assets/img/headers/2026/mi-decision-de-usar-proxmox-nanobanana.webp
categories: [Tecnología, Redes e Infraestructura]
tags: [virtualización, contenedores, infraestructura, servidores, homelab, virtualizacion]
pin: false
toc: true
excerpt: "Explico mi elección de Proxmox como plataforma de virtualización para mi Home Lab. Analizo por qué prefiero Proxmox sobre otras opciones como ESXi, Hyper-V o Docker standalone, y cómo estructuro mis servicios."
twitter_description: "Por qué elijo Proxmox para mi Home Lab: virtualización seria."
permalink: /:slug/
---

![Post Header]({{ page.image }})

# Por qué Proxmox y no otra cosa

En el [post anterior]({% post_url 2026/2026-05-04-por-que-tengo-un-home-lab-mi-filosofia %}) os conté mi filosofía general sobre los Home Labs y por qué construí el mío. Hoy voy a entrar en detalle sobre una decisión concreta: **por qué elegí Proxmox** como plataforma de virtualización.

## Por qué Proxmox?

[Proxmox VE](https://www.proxmox.com/){:target="_blank"} es una plataforma de virtualización de código abierto que me permite:

- **Máquinas virtuales (VMs)**: Con sistema operativo completo
- **Contenedores LXC**: Más ligeros que las VMs, comparten el kernel del host

La combinación de VMs y LXCs me da la flexibilidad que necesito: algunos servicios van en contenedores ligeros (para algo que necesito correr 24/7 con poco consumo), otros van en VMs completas (cuando necesito más aislamiento o un sistema operativo específico).

### LXC vs VMs

Los **contenedores LXC** son perfectos para servicios como Docker, Home Assistant, Pi-hole... Consumen muy pocos recursos, arranque instantáneo, y puedo tener docenas corriendo en un solo host.

Las **VMs** las uso para servicios que necesitan más aislamiento o un sistema operativo propio: un pfSense para el firewall, un Windows para algo puntual, un Linux con desktop environment para tareas concretas.

## Por qué no otras opciones?

### ESXi
[VMware ESXi](https://www.vmware.com/products/esxi-and-vsphere.html){:target="_blank" :rel="nofollow noopener"} es excelente, pero tiene problemas para un Home Lab:
1. **Precio**: La versión gratuita tiene limitaciones severas
2. **Recursos**: Consumo relativamente alto para lo que ofrece
3. **Web**: Requiere una cuenta de VMware para acceder a la UI

### Hyper-V
[Microsoft Hyper-V](https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/){:target="_blank" :rel="nofollow noopener"} está ligado a Windows Server o Windows Pro. Si quieres algo más nativo para Linux, no es lo ideal.

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

Básicamente, mis servicios funcionan dentro de contenedores LXC, pero con una arquitectura centralizada:

1. **Contenedores LXC "limpios"** - Creo contenedores vacíos desde la UI de Proxmox
2. **Docker dentro de cada contenedor** - En lugar de servicios preinstalados, instalo Docker en cada LXC
3. **Docker Compose** - Cada servicio tiene su docker-compose.yml
4. **Bases de datos centralizadas** - Todos los servicios apuntan a un MariaDB/PostgreSQL centralizado

El paso 4 es la clave. En lugar de que cada servicio tenga su propia base de datos dentro de su propio contenedor, todos apuntan a un MariaDB centralizado. Una sola instancia de base de datos, un solo backup, una sola actualización.

Esto reduce drásticamente el consumo de RAM y simplifica el mantenimiento.

### Ejemplo: Nextcloud en Proxmox

1. Crear un LXC desde la UI de Proxmox
2. Entrar al contenedor (`pct enter 100`)
3. Instalar Docker
4. Desplegar Nextcloud mediante Docker Compose
5. **Apuntar al MariaDB centralizado**

En lugar de instalar Nextcloud con su propia base de datos internamente, apunto al MariaDB central y listo.

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

En el [post dedicado a los helper scripts]({% post_url 2026/2026-05-25-no-uso-proxmox-helper-scripts %}) os cuento por qué huyo de los scripts que prometen instalar todo en un clic y por qué creo que esta aproximación manual es mejor a largo plazo.

***

¿Te usas Proxmox? ¿Tienes alguna duda sobre virtualización? Déja un comentario o [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo discutimos.

Y... hasta aquí por hoy!