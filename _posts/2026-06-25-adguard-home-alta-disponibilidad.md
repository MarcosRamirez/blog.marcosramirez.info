---
title: "AdGuard Home en alta disponibilidad: Dos nodos con sincronización"
slug: adguard-home-alta-disponibilidad
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-06-25 08:30:00 +0200
image: /assets/img/headers/adguard-home-alta-disponibilidad.webp
categories: [Tecnología, Redes e Infraestructura]
tags: [adguard, dns, alta-disponibilidad, redundancia, sync]
pin: false
toc: true
excerpt: "Configura dos nodos de AdGuard Home con sincronización automática y failover. Si uno cae, el otro sigue funcionando. Sin perder bloqueo ni un segundo."
twitter_description: "AdGuard Home en alta disponibilidad: dos nodos sincronizados y failover automático."
permalink: /:slug/
---

*[Este post forma parte de la serie [Home Lab]({% post_url 2026-05-04-por-que-tengo-un-home-lab-mi-filosofia %})]*

En [mi primer post sobre AdGuard Home]({% post_url 2026-05-18-adguard-home-tu-propio-bloqueador-de-publicidad %}) te mostré cómo montar el primero. Pero un solo nodo es un punto único de fallo.

¿Qué pasa si el servidor se cae? Adiós a la navegación sin anuncios.

La solución: dos nodos sincronizados con failover automático.

## La arquitectura

Dos servidores AdGuard Home, cada uno con su propia IP:

- **Nodo 1**: IP del primer servidor (primer LXC, Raspberry Pi, etc.)
- **Nodo 2**: IP del segundo servidor (segundo LXC, otro dispositivo)

El router apunta a ambas IPs como servidores DNS. Así hay balanceo de carga real, no failover. Si uno cae, el otro sigue atendiendo todas las peticiones.

## Qué necesitas

- Dos dispositivos con AdGuard Home (pueden ser dos Raspberry Pi, dos LXC, o cualquier cosa que pueda correr Docker)
- Keepalived instalado en ambos (para el failover)
- AdGuardHome-Sync (para sincronizar configuración)

## Instalación del segundo nodo

En el segundo dispositivo, instala AdGuard Home igual que en el primero:

```bash
curl -s -S -L https://raw.githubusercontent.com/AdguardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
```

Abre los mismos puertos. Configura un usuario y contraseña.

## Sincronización con AdGuardHome-Sync

La herramienta [AdGuardHome-Sync](https://github.com/bakito/AdGuardHome-Sync) copia la configuración del nodo principal al secundario automáticamente.

### Instalación con Docker

Crea un archivo `.adguardhome-sync.yaml` en tu home:

```yaml
origin:
  url: "http://IP_DEL_PRIMER_NODO:3000"
  username: "tu_usuario"
  password: "tu_contraseña"

replicas:
  - url: "http://IP_DEL_SEGUNDO_NODO:3000"
    username: "tu_usuario"
    password: "tu_contraseña"

cron: "*/5 * * * *"  # Cada 5 minutos
runOnStart: true

features:
  filters: true
  rewrites: true
  generalSettings: true
  queryLog: false
```

Y ejecuta el contenedor:

```bash
docker run -d \
  --name adguard-sync \
  -v ~/.adguardhome-sync.yaml:/config.yaml \
  -p 8080:8080 \
  ghcr.io/bakito/adguardhome-sync:latest
```

Ahora, cada 5 minutos se sincronizan las listas, filtros y configuraciones del principal al secundario.

## Cómo funciona en la práctica

En tu router, configura dos servidores DNS:

- **DNS primario**: IP del primer nodo (primer LXC)
- **DNS secundario**: IP del segundo nodo (segundo LXC)

Cuando un dispositivo pide una resolución DNS, el router envía la petición al primero. Si no responde, prueba con el segundo. Así de simple.

No necesitas Keepalived ni IP virtual. Cada nodo tiene su IP y el router hace de balanceador.

## Tabla comparativa: Soluciones DNS

| Aspecto | AdGuard Home único | AdGuard Home HA | Pi-hole | NextDNS |
|---------|:---:|:---:|:---:|:---:|
| **Coste** | Gratis | Gratis | Gratis | €0-20/mes |
| **Hardware extra** | No | Sí (segundo nodo) | No | No |
| **Redundancia** | No | Sí | Limitada | Parcial |
| **Sincronización** | No | Sí | Sí (con add-ons) | N/A |
| **Failover automático** | No | Sí | No | Sí |
| **DoH/DoT nativo** | Sí | Sí | No (needs proxy) | Sí |
| **DHCP integrado** | Sí | Sí | Sí | No |

## Cuál elegir

### Para uso básico

Un solo AdGuard Home es suficiente. Si no te importa perder el DNS un rato cuando se caiga, no necesitas más.

### Para paranoicos de la disponibilidad

Dos nodos con Keepalived. Si uno falla, el otro sigue en menos de un segundo.

### Para máximo rendimiento

AdGuard Home HA + un CDN como Cloudflare. El segundo nodo está en otra ubicación física.

### Si no quieres mantener nada

NextDNS. Todo en la nube, failover incluido, pero pierdes control total.

## Preguntas frecuentes

### ¿Puedo usar dos dispositivos diferentes?

Sí. Raspberry Pi, contenedores LXC, mini PCs, lo que tengas. Lo único que importa es que ambos tengan AdGuard Home funcionando.

### ¿La sincronización copia todo?

Filtros, listas, reglas de reescritura, configuración DNS. No copia logs de queries (para eso está `queryLog: false`).

### ¿Cuánto tarda el failover?

Normalmente menos de 5 segundos. Keepalived detecta que el nodo no responde y cambia la IP virtual al secundario.

### ¿Puedo añadir más de dos nodos?

Sí. Keepalived soporta más. Solo necesitas prioridades diferentes.

***

Compártelo si te ha gustado.

¿Tienes configurado un segundo nodo? ¿Dudas sobre el failover? Déja un comentario o [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo debatimos.

Y... hasta aquí por hoy!