---
title: "Home Assistant: Tu cerebro de domótica en un solo lugar"
slug: home-assistant-guia-domotica
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-06-01 08:30:00 +0200
image: /assets/img/headers/2026/home-assistant-guia-domotica-nanobanana.webp
image_alt: "Logo de Home Assistant para domótica"
categories: [Tecnología, Home Lab, Automatización]
tags: [domotica, automatizacion, sensores, zigbee, local-first]
pin: false
toc: true
excerpt: "Home Assistant es el centro de domótica de mi Home Lab para automatizar luces al anochecer, calefacción según temperatura y notificaciones de seguridad. Compatible con 2.000+ integraciones, funciona localmente sin nubes ni suscripciones. Incluye dashboards personalizados y automatizaciones con lógica condicional avanzada."
twitter_description: "Home Assistant: cómo automatizo mi casa sin nubes ni suscripciones."
permalink: /:slug/
description: "Automatiza tu casa con Home Assistant: 2.000+ integraciones, dashboards personalizados y automatizaciones sin nube. Guía completa para tu Home Lab."
last_modified_at: 2026-05-02 08:00:00 +0200
---

![{{ page.image_alt }}]({{ page.image }})

*[Este post forma parte de la serie [Home Lab]({% post_url 2026/2026-04-27-home-lab-filosofia %}){:target="_blank" rel="nofollow noopener"}. Si aún no sabes qué es un Home Lab, échale un vistazo al post sobre mi filosofía]*

Si has leído los posts anteriores de la serie, ya sabes que tengo [AdGuard Home]({% post_url 2026/2026-05-18-adguard-home-bloqueador-publicidad %}){:target="_blank" rel="nofollow noopener"} bloqueando publicidad y rastreadores a nivel de red, [Proxmox]({% post_url 2026/2026-05-11-mi-decision-de-usar-proxmox %}){:target="_blank" rel="nofollow noopener"} virtualizando mis servicios, y las bases de datos [centralizadas]({% post_url 2026/2026-05-25-no-uso-proxmox-helper-scripts %}){:target="_blank" rel="nofollow noopener"}. Hoy te traigo otro servicio estrella: [Home Assistant](https://www.home-assistant.io/){:target="_blank" rel="nofollow noopener"}.

## Qué es Home Assistant

[Home Assistant](https://www.home-assistant.io/){:target="_blank" rel="nofollow noopener"} es un software de código abierto que actúa como **centro de domótica del hogar**. Compatible con más de 2.000 integraciones de dispositivos y servicios, desde bombillas [Philips Hue](https://www.philips-hue.com/){:target="_blank" rel="nofollow noopener"} hasta sensores de temperatura, pasando por cámaras, cerraduras,[y más](https://www.home-assistant.io/integrations/){:target="_blank" rel="nofollow noopener"}.

La diferencia con otros ecosistemas es clara: no estás atado a una marca. Si mañana [Apple](https://www.apple.com/){:target="_blank" rel="nofollow noopener"} cambia sus políticas o [Google](https://www.google.com/){:target="_blank" rel="nofollow noopener"} sube precios, puedes migrar. Home Assistant no es el dueño de tus dispositivos; es el puente que los conecta.

## Por qué lo instalé

### 1. Automatizaciones reales

Mi objetivo no era tener una app para controlar luces desde el móvil. Eso no es domótica; es control remoto. El objetivo era que las cosas pasaran **sin intervención**.

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
| **Dashboard personalizable** | Crea vistas exactamente como quieras |
| **Historial** | Graba eventos y sensores para analizar patrones |
| **Voice assistants** | Integrable con Assist, Alexa, Google Assistant |

## Inconvenientes

| Inconveniente | Descripción |
|---|---|
| **Curva de aprendizaje** | No es plug-and-play; requiere tiempo para entender la lógica |
| **Compatibilidad** | Algunos dispositivos solo funcionan con integraciones específicas |
| **Hardware necesario** | Necesitas un dispositivo para correrlo (Raspberry Pi, mini PC, NAS...) |
| **Debugging** | Las automatizaciones fallan silenciosamente si no las vigilas bien |

## Comparativa: Home Assistant vs alternativas

| Característica | Home Assistant | Apple HomeKit | Google Home | Amazon Alexa |
|---|:---:|:---:|:---:|:---:|
| **Código abierto** | **Sí** | No | No | No |
| **Funciona sin internet** | **Sí** | Limitado | No | No |
| **Integraciones** | **2.000+** | ~100 | ~500 | ~300 |
| **Necesita nube** | No | Sí | Sí | Sí |
| **Dashboard personalizable** | **Sí** | Básico | Básico | No |
| **Automatizaciones complejas** | **Sí** | Limitado | Medio | Medio |
| **Coste** | Gratis* | Hardware Apple | Hardware Nest | Dispositivos Echo |
| **Historial de datos** | **Sí** | No | Limitado | No |

*Hardware y energía aparte.

**Home Assistant** gana en flexibilidad y control. **Apple HomeKit** gana en simplicidad si ya vives en el ecosistema Apple. **Google Home** y **Alexa** son opciones válidas para empezar, pero te atan a sus nubes.

## Mi setup

En mi caso, Home Assistant corre en una **máquina virtual** con Home Assistant OS dentro de [Proxmox]({% post_url 2026/2026-05-11-mi-decision-de-usar-proxmox %}){:target="_blank" rel="nofollow noopener"}, con:

- **2 vCPU**
- **4GB de RAM**
- **32GB de almacenamiento** (la imagen del sistema más la base de datos)
- **Zigbee dongle** ([Sonoff Zigbee 3.0 USB Dongle Plus](https://itead.cc/product/sonoff-zigbee-3-0-usb-dongle-plus/){:target="_blank" rel="nofollow noopener"}) para dispositivos Zigbee

### Dispositivos compatibles

Home Assistant es compatible con muchísimos dispositivos. Algunos de los más populares:

- **Iluminación**: [Philips Hue](https://www.philips-hue.com/){:target="_blank" rel="nofollow noopener"}, [LIFX](https://www.lifx.com/){:target="_blank" rel="nofollow noopener"}, [Xiaomi](https://www.xiaomi.com/){:target="_blank" rel="nofollow noopener"}
- **Sensores**: Zigbee, Z-Wave, [Shelly](https://shelly.cloud/){:target="_blank" rel="nofollow noopener"}
- **Cámaras**: [Ring](https://www.ring.com/){:target="_blank" rel="nofollow noopener"}, [Reolink](https://reolink.com/){:target="_blank" rel="nofollow noopener"}
- **Termostatos**: [Nest](https://store.google.com/us/product/nest_learning_thermostat_3rd_gen){:target="_blank" rel="nofollow noopener"}, [Ecobee](https://www.ecobee.com/){:target="_blank" rel="nofollow noopener"}

Zigbee y Z-Wave crean una mesh donde los dispositivos se comunican entre ellos, extendiendo el alcance sin cables adicionales.

## Empezar desde cero

### Opción 1: Raspberry Pi (recomendada para empezar)

Es la forma más económica de probar:

1. Compra una Raspberry Pi 4 (4GB o más)
2. Flashea la imagen oficial de Home Assistant con [Balena Etcher](https://www.balena.io/etcher/){:target="_blank" rel="nofollow noopener"}
3. Enciende con el cable ethernet conectado
4. Accede desde `homeassistant.local:8123`

Coste aproximado: 50-70€.

### Opción 2: VM con Proxmox Helper Scripts

Aunque en otro post os explico [por qué no uso los Proxmox Helper Scripts para instalar mis servicios]({% post_url 2026/2026-05-25-no-uso-proxmox-helper-scripts %}){:target="_blank" rel="nofollow noopener"}, en este caso sí lo uso: para instalar Home Assistant OS como VM. El helper script descarga la imagen oficial, crea la VM automáticamente y configura todo sin intervención.

Ejecuta este comando en la shell de Proxmox:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/vm/haos-vm.sh)"
```

El script te preguntará:
- ¿Instalar Home Assistant OS VM? → Sí
- ¿Usar configuración por defecto? → Sí (4GB RAM, 32GB almacenamiento, 2 vCPU)

En unos minutos tendrás Home Assistant OS funcionando. Solo tendrás que acceder a `http://IP_DE_TU_VM:8123` para configurar.

### Opción 3: NAS o mini PC

Si ya tienes un NAS compatible o un mini PC siempre encendido, hay imágenes oficiales para VirtualBox y más plataformas.

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

<section id="faq">
<h2>Preguntas frecuentes</h2>

<details>
<summary>¿Necesito conocimientos técnicos?</summary>

No necesariamente. La interfaz gráfica permite crear automatizaciones sin escribir código. Pero entender la lógica (triggers, conditions, actions) ayuda mucho.

</details>

<details>
<summary>¿Funciona con dispositivos de cualquier marca?</summary>

No todos. Comprueba la <a href="https://www.home-assistant.io/integrations/" target="_blank" rel="nofollow noopener">lista de integraciones</a> antes de comprar. Si el dispositivo usa Zigbee, Z-Wave o Matter, probablemente sí.

</details>

<details>
<summary>¿Puedo controlar todo desde fuera de casa?</summary>

Sí, con configuración de acceso remoto seguro (VPN o Nabu Casa Cloud). No recomiendo abrir puertos directamente.

</details>

<details>
<summary>¿Qué pasa si se va la luz?</summary>

Home Assistant arranca solo cuando vuelve la luz. Los dispositivos vuelven a su último estado conocido.

</details>
</section>

***

Compártelo si te ha gustado.

¿Automatizas algo en casa? ¿Quieres consejo para empezar? Deja un comentario o [escríbeme](https://marcosramirez.dev/contacto/){:target="_blank"} y te ayudo.

Y... hasta aquí por hoy!
