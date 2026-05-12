---
title: "Las razones por las que no uso los helper scripts de Proxmox"
slug: no-uso-proxmox-helper-scripts
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-05-25 08:30:00 +0200
image: /assets/img/headers/2026/no-uso-proxmox-helper-scripts-nanobanana.webp
image_alt: "Interfaz de Proxmox sin helper scripts"
categories: [Tecnología, Home Lab, Redes e Infraestructura]
tags: [contenedores, automatización, infraestructura, servidores, homelab, scripts]
pin: false
toc: true
excerpt: "Explico por qué dejé de usar los helper scripts de Proxmox a favor de una arquitectura más robusta. Los scripts instalan bases de datos dentro de cada contenedor, generando desperdicio de RAM, mantenimiento complejo y backups difíciles. Te muestro cómo centralizar bases de datos en un servidor dedicado para ahorrar recursos y simplificar."
twitter_description: "Por qué dejé los helper scripts de Proxmox: bases de datos centralizadas."
permalink: /:slug/
description: "Evita helper scripts en Proxmox: centraliza bases de datos y ahorra RAM. Los scripts instalan bases de datos en cada contenedor, generando desperdicio de recursos. Arquitectura robusta explicada. Lee más."
---
![{{ page.image_alt }}]({{ page.image }})

En el [post anterior sobre Proxmox]({% post_url 2026/2026-05-26-mi-decision-de-usar-proxmox %}) os conté por qué elegí [Proxmox](https://www.proxmox.com/){:target="_blank" rel="nofollow noopener"} como plataforma de virtualización. Ahora voy a explicar por qué huyo de los "helper scripts" que prometen instalar todo en un clic.

## El encanto de lo fácil

Cualquiera que se haya adentrado mínimamente en el mundo de los homelabs y [Proxmox](https://www.proxmox.com/){:target="_blank" rel="nofollow noopener"} se ha cruzado alguna vez con los famosos "[Proxmox Helper Scripts](https://community-scripts.org/)" (como los conocidos scripts de `tteck`).

Son una auténtica maravilla: copias una línea en la consola de tu nodo de Proxmox, le das al Enter, respondes un par de preguntas y en cuestión de minutos tienes un contenedor LXC perfectamente configurado corriendo [Nextcloud](https://nextcloud.com/){:target="_blank" rel="nofollow noopener"}, [N8N](https://n8n.io/){:target="_blank" rel="nofollow noopener"}, [Paperless-ngx](https://docs.paperless-ngx.com/){:target="_blank" rel="nofollow noopener"}, [Firefly III](https://www.firefly-iii.org/){:target="_blank" rel="nofollow noopener"}, o cualquier otro servicio que te puedas imaginar.

Durante un tiempo, yo estuve implementándolos para probar cosas rápido, e incluso pensé en basar toda la arquitectura de mis servicios en ellos. Pero conforme mi red crecía, detecté un problema arquitectónico bastante molesto.

[En mi post sobre Jellyfin]({% post_url 2026/2026-04-23-jellyfin-cortes-4k-disco %}) os cuento cómo los helper scripts me asignaron solo 16GB de disco por defecto, y como todo "funciobaba", no me di cuenta hasta que el disco se llenó y los transcodes de 4K empezó a fallar silenciosamente. 

## El problema: El aislamiento de las Bases de Datos

El mayor inconveniente de estos scripts autoejecutables es, paradójicamente, su mayor virtud: son paquetes cerrados y aislados.

Cuando instalas un servicio con un helper script que requiere de una base de datos (por ejemplo PostgreSQL o MariaDB) o una caché (como Redis), el script asume que quieres la vía rápida y **te instala el motor de base de datos dentro del propio contenedor LXC del servicio**.

Si tienes 10 servicios instalados de esta manera... acabas teniendo 10 instancias diferentes de PostgreSQL corriendo en tu mismo nodo de Proxmox, en 10 contenedores distintos.

Esto provoca tres problemas principales:

### 1. Desperdicio de recursos (RAM y CPU)
Un motor de base de datos como PostgreSQL o MariaDB tiene un consumo de memoria base ("overhead") solo por estar funcionando, sin importar lo grande que sea la base de datos que aloje. Multiplica ese consumo base por la cantidad de servicios que tengas y verás que estás malgastando preciados gigabytes de RAM que podrían estar usándose para otras cosas.

### 2. Mantenimiento y actualizaciones
Si el día de mañana sale un parche crítico de seguridad para MariaDB, en lugar de actualizar un solo servidor de bases de datos, tienes que ir entrando contenedor a contenedor, actualizando el sistema operativo y el motor de base de datos de cada uno de tus servicios. Un auténtico engorro.

### 3. Backups más complejos
Hacer backups de las bases de datos (un `pg_dump` o `mysqldump` puro) es mucho más molesto cuando cada base de datos vive aislada de las demás. Centralizándolo, gestionas las copias de seguridad de los datos vitales desde un solo lugar.

### 4. Dificultad para Alta Disponibilidad (HA)
Cuando cada servicio tiene su propia base de datos incrustada en su contenedor, configurar un entorno de Alta Disponibilidad real se vuelve una pesadilla. Si quieres garantizar que tus datos siempre estén accesibles o evitar caídas, con un servidor central de bases de datos es mucho más sencillo montar un clúster (por ejemplo, con Galera Cluster para MariaDB o Patroni para PostgreSQL) que replique tu información entre varios nodos. De la otra manera, te verías obligado a configurar y mantener un sistema de replicación de datos independiente por cada uno de tus servicios aislados.

## La solución: Centralizar las Bases de Datos

La decisión de no usar los helper scripts obedece simplemente a mi estrategia de **centralización de datos**. 

En lugar de lanzar el script y olvidarme, prefiero crear contenedores LXC puros o máquinas virtuales e instalar las versiones desnudas (o vía contenedores Docker, dependiendo del servicio). 

En paralelo, tengo un LXC o VM dedicado **exclusivamente a ser el servidor de bases de datos** (mi MariaDB, mi PostgreSQL y mi Redis central). Cuando configuro N8N o Asterisk, simplemente los apunto a este servidor central de datos.

Es cierto que se pierde el factor "magia" y la inmediatez de los scripts, pero se gana en robustez, te obliga a entender cómo funcionan por detrás las aplicaciones que hospedas y, a la larga, tu homelab consumirá muchos menos recursos.

***

Compártelo si te ha resultado útil.

¿Te ha pasado algo similar con los helper scripts? ¿Cómo estructuras tus servicios? Deja un comentario con tu experiencia.

Y... hasta aquí por hoy!
