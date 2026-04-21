---
title: "Home Assistant: Tu cerebro de automatización en un solo lugar"
slug: home-assistant-automatizacion
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-06-08 08:30:00 +0200
image: /assets/img/headers/home-assistant-automatizacion.webp
categories: [Tecnología, Automatización]
tags: [home-assistant, automatizacion, domotica,物联网, smart-home]
pin: false
toc: true
excerpt: "Te presento Home Assistant, el centro de mando de mi Home Lab para automatizar todo lo que puedo. Desde luces que se encienden al anochecer hasta notificaciones cuando alguien entra en casa. Sin depender de la nube, sin suscripciones, y funcionando en un pequeño dispositivo."
twitter_description: "Home Assistant: cómo automatizo mi casa sin nubes ni suscripciones."
permalink: /:slug/
---

*[Este post forma parte de la serie [Home Lab](/tag/home-lab/). Si aún no sabes qué es un Home Lab, échale un vistazo al [post sobre mi filosofía](/posts/home-lab-filosofia/)]*

Si has leído los posts anteriores de la serie, ya sabes que tengo [AdGuard Home](/posts/adguard-home-bloqueador-publicidad/) bloqueando publicidad y rastreadores a nivel de red, [Proxmox](/posts/mi-decision-de-usar-proxmox/) virtualizando mis servicios, y las bases de datos [centralizadas](/posts/no-uso-proxmox-helper-scripts/). Hoy te traigo otro servicio estrella: [Home Assistant](https://www.home-assistant.io/){:target="_blank" :rel="nofollow noopener"}.

## Qué es Home Assistant

[Home Assistant](https://www.home-assistant.io/){:target="_blank" :rel="nofollow noopener"} es un software de código abierto que actúa como **centro de automatización del hogar**. Compatible con más de 2.000 integrations de dispositivos y servicios, desde bombillas [Philips Hue](https://www.philips-hue.com/){:target="_blank" :rel="nofollow noopener"} hasta sensores de temperatura, pasando por cámaras, cerraduras,[y más](https://www.home-assistant.io/integrations/){:target="_blank" :rel="nofollow noopener"}.

La diferencia con otros ecosistemas es clara: no estás atado a una marca. Si mañana [Apple](https://www.apple.com/){:target="_blank" :rel="nofollow noopener"} cambia sus políticas o [Google](https://www.google.com/){:target="_blank" :rel="nofollow noopener"} sube precios, puedes migrar. Home Assistant no es el dueño de tus dispositivos; es el puente que los conecta.

## Por qué lo instalé

### 1. Automatizaciones reales

Mi objetivo no era tener una app para controlar luces desde el móvil. Eso no es automatización; es遥控. Quería que las cosas pasen **sin intervención**.

Ejemplos concretos de lo que tengo funcionando:

- **Luces del salón**: Se encienden al anochecer (cuando el sol baja de un lux específico, no a una hora fija porque en invierno oscurece antes)
- **Calefacción**: Se activa si la temperatura interior baja de 19°C Y estoy en casa (detecto mi móvil en la red)
- **Notificaciones**: Me llega un aviso si la puerta principal se abre y no hay nadie en casa
- **Modo cine**: Un comando de voz enciende tele, reproductor, barras de sonido y atenúa luces en un solo paso

### 2. Dashboard personalizado

La interfaz por defecto está bien, pero la potencia real está en crear dashboards a tu medida. Tengo:

- **Vista general**: Temperatura por habitaciones, estado de luces, cámaras activas
- **Vista rápida**: Solo las automatizaciones que uso a diario
- **Vista guests**: Para cuando viene alguien, solo lo básico (nada de config sensible)

Todo desde el navegador o la app oficial.

### 3. Sin dependencias de terceros

La mayoría de ecosistemas smart home funcionan en la nube. Esto significa:

- Si pierdes internet, no funciona nada
- Tus datos van a servidores de terceros
- Estás limitado por lo que el fabricante quiera ofrecer

Home Assistant funciona **localmente**. Mi servidor está en casa, mi red está en casa, mis automatizaciones también.

## Ventajas

| Ventaja | Descripción |
|---|---|
| **Código abierto** | Puedes auditar el código, contribuir, o modificarlo |
| **Local-first** | Funciona sin internet, sin nube, sin latencia |
| **2.000+ integraciones** | Compatible con casi todo el ecosistema smart home |
| **Automatizaciones complejas** | Lógica condicional avanzada (si X pasa Y, y no Z, entonces W) |
| **Dashboard customizable** | Crea vistas exactamente como quieras |
| **Historial** | Graba eventos y sensores para analizar patrones |
| **Voice assistants** | Integrable con Assist, Alexa, Google Assistant |

## Inconvenientes

| Inconveniente | Descripción |
|---|---|
| **Curva de aprendizaje** | No es plug-and-play; requiere tiempo para entender la lógica |
| **Compatibilidad** | Algunos dispositivos solo funcionan con integraciones específicas |
| **Hardware necesario** | Necesitas un dispositivo para correrlo (Raspberry Pi, mini PC, NAS...) |
| **Debugging** | Las automatizaciones fallan silenciosamente si no监控 bien |

## Comparativa: Home Assistant vs alternativas

| Característica | Home Assistant | Apple HomeKit | Google Home | Amazon Alexa |
|---|:---:|:---:|:---:|:---:|
| **Código abierto** | **Sí** | No | No | No |
| **Funciona sin internet** | **Sí** | Limitado | No | No |
| **Integraciones** | **2.000+** | ~100 | ~500 | ~300 |
| **Nube requerida** | No | Sí | Sí | Sí | Sí |
| **Dashboard customizable** | **Sí** | Básico | Básico | No |
| **Automatizaciones complejas** | **Sí** | Limitado | Medio | Medio |
| **Coste** | Gratis* | Hardware Apple | Hardware Nest | Dispositivos Echo |
| **Historial de datos** | **Sí** | No | Limitado | No |

*Hardware y energía aparte.

**Home Assistant** gana en flexibilidad y control. **Apple HomeKit** gana en simplicidad si ya vives en el ecosistema Apple. **Google Home** y **Alexa** son opciones válidas para empezar, pero te atan a sus nubes.

## Mi setup

En mi caso, Home Assistant corre en una Raspberry Pi 4 con:

- **4GB de RAM** (suficiente para mi uso)
- **SSD externo** de 128GB para la base de datos (más velocidad que una SD)
- **Zigbee dongle** ([Sonoff Zigbee 3.0 USB Dongle Plus](https://itead.cc/product/sonoff-zigbee-3-0-usb-dongle-plus/){:target="_blank" :rel="nofollow noopener"}) para dispositivos Zigbee

### Dispositivos conectados

- 8 bombillas [Philips Hue](https://www.philips-hue.com/){:target="_blank" :rel="nofollow noopener"}
- 4 sensores de movimiento
- 2 sensores de temperatura/humedad
- 1 sensor de puerta (apertura)
- 1 enchufe inteligente (control de consumo)

Todo esto sin cables adicionales: Zigbee crea una mesh donde los dispositivos se comunican entre ellos, extendiendo el alcance.

## Empezar desde cero

### Opción 1: Raspberry Pi (recomendada)

Es la forma más económica de empezar:

1. Compra una Raspberry Pi 4 (4GB o más)
2. Flashea la imagen oficial de Home Assistant con [Balena Etcher](https://www.balena.io/etcher/){:target="_blank" :rel="nofollow noopener"}
3. Enciende con el cable ethernet conectado
4. Accede desde `homeassistant.local:8123`

Coste aproximado: 50-70€.

### Opción 2: Docker en Proxmox (avanzada)

Si ya tienes [Proxmox](/posts/mi-decision-de-usar-proxmox/) funcionando:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --network host \
  -v ~/homeassistant/config:/config \
  -e TZ=Europe/Madrid \
  --restart unless-stopped \
  ghcr.io/home-assistant/home-assistant:stable
```

Así lo corro yo. Más control, pero requiere Docker sabe.

### Opción 3: NAS o mini PC

Si ya tienes un NAS compatible o un mini PC siempre encendido, hay imágenes oficiales para VirtualBox, Proxmox, y más.

## Automatizaciones que uso a diario

Aquí van algunos ejemplos de automatizaciones reales:

### Luz al anochecer
```yaml
automation:
  - alias: "Luces salón al anochecer"
    trigger:
      platform: numeric_state
      entity_id: sensor.luz_exterior
      below: 50
    condition:
      - condition: time
        after: "19:00:00"
        before: "23:00:00"
    action:
      - service: light.turn_on
        data:
          entity_id: light.salon
          brightness_pct: 80
```

### Notificación si alguien entra en casa
```yaml
automation:
  - alias: "Notificar llegada a casa"
    trigger:
      platform: state
      entity_id: device_tracker.movil_marcos
      to: "home"
    condition:
      - condition: state
        entity_id: input_boolean.alguien_en_casa
        state: "off"
    action:
      - service: notify.notify
        data:
          message: "Marcos ha llegado a casa"
```

## Preguntas frecuentes

### ¿Necesito conocimientos técnicos?

No necesariamente. La interfaz graphical permite crear automatizaciones sin escribir código. Pero entender la lógica (triggers, conditions, actions) ayuda mucho.

### ¿Funciona con dispositivos de cualquier marca?

No todos. Comprueba la [lista de integraciones](https://www.home-assistant.io/integrations/){:target="_blank" :rel="nofollow noopener"} antes de comprar. Si el dispositivo usa Zigbee, Z-Wave o Matter, probablemente sí.

### ¿Puedo controlar todo desde fuera de casa?

Sí, con configuración de acceso remoto seguro (VPN o Nabu Casa Cloud). No recomiendo abrir puertos directamente.

### ¿Qué pasa si se va la luz?

Home Assistant arranca solo cuando vuelve la luz. Los dispositivos vuelven a su último estado conocido.

***

Compártelo si te ha gustado.

¿Automatizas algo en casa? ¿Quieres consejo para empezar? Déja un comentario o [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y te ayudo.

Y... hasta aquí por hoy!