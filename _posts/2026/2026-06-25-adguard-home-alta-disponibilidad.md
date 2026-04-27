---
title: "AdGuard Home en alta disponibilidad: Dos nodos con sincronización"
slug: adguard-home-alta-disponibilidad
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-06-25 08:30:00 +0200
image: /assets/img/headers/2026/adguard-home-alta-disponibilidad-nanobanana.webp
categories: [Tecnología, Redes e Infraestructura]
tags: [adguard, dns, alta-disponibilidad, redundancia, sync]
pin: false
toc: true
excerpt: "Configura dos nodos de AdGuard Home. Uno se cae, el otro sigue. Como son nodos diferentes, tienes redundancia real."
twitter_description: "AdGuard Home con dos nodos: si uno falla, el otro sigue."
permalink: /:slug/
---

*[Este post forma parte de la serie [Home Lab]({% post_url 2026-05-04-por-que-tengo-un-home-lab-mi-filosofia %})]*

En [mi post anterior]({% post_url 2026-05-18-adguard-home-bloqueador-publicidad %}) te enseñé a instalar AdGuard Home. Pero un solo nodo es un punto único de fallo. Si se cae, se acabaron los anuncios bloqueados.

La solución es tener dos nodos.

## La idea

Dos servidores AdGuard Home funcionando a la vez:

- Nodo 1: primero servidor
- Nodo 2: segundo servidor

Si el primero se cae, el segundo sigue atendiendo. Como están en nodos distintos (LXC diferentes, Raspberrys distintas...), aunque uno falle, el otro sigue funcionando.

### Por qué uso .53 y .54

El truco está en las IPs. Uso `.53` para el primero y `.54` para el segundo. Así siempre recuerdo que son los servidores DNS (el puerto 53).

- Primer nodo: `192.168.1.53`
- Segundo nodo: `192.168.1.54`

Fácil de recordar y fácil de configurar en el router.

## Cómo se configura

### En el router

Pon dos servidores DNS:

- DNS primario: `192.168.1.53`
- DNS secundario: `192.168.1.54`

Cuando el router tiene que resolver un dominio, prueba con el primero. Si no responde, usa el segundo. Así de simple.

### En el segundo nodo

Instala AdGuard Home igual que el primero:

```bash
curl -s -S -L https://raw.githubusercontent.com/AdguardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
```

Listo. Ahora tienes dos bloqueadores funcionando.

### Para sincronizar las listas

Si quieres que ambos tengan las mismas listas, usa [AdGuardHome-Sync](https://github.com/bakito/AdGuardHome-Sync). Copia la configuración del primero al segundo automáticamente.

## Por qué dos nodos importa

Un solo nodo significa que cuando se cae, todo tu tráfico DNS falla. Nadie puedederesolver nombres. Los anuncios pasan.

Con dos nodos:

- Si uno falla, el otro sigue bloqueando
- Estás protegido contra hardware
- Estás protegido contra cortes de luz en un equipo

## Tabla comparativa

| Aspecto | Un nodo | Dos nodos | Pi-hole | NextDNS |
|---------|:---:|:---:|:---:|:---:|
| **Coste** | Gratis | Gratis | Gratis | €0-20/mes |
| **Redundancia** | No | Sí | Limitada | Parcial |
| **DoH/DoT** | Sí | Sí | No | Sí |
| **DHCP** | Sí | Sí | Sí | No |

## Cuál elegir

### Un solo nodo

Si te da igual perder el bloqueo cuando se cae, con uno tienes bastante.

### Dos nodos

Si quieres redundancia de verdad y no quieres depender de un solo equipo.

### NextDNS

Si no quieres mantener nada y te sirve la nube.

***

Compártelo si te ha gustado.

¿Tienes dudas sobre poner dos nodos? Déja un comentario o [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo debatimos.

Y... hasta aquí por hoy!
