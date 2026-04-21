---
title: "Firefly III: Tus finanzas personales, en tu servidor, bajo tu control"
slug: firefly-iii-finanzas
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-06-15 08:30:00 +0200
image: /assets/img/headers/default.webp
categories: [Tecnología]
tags: [finanzas, auto-gestión, privacidad, Bancos y Fintech]
pin: false
toc: true
excerpt: "Firefly III es un gestor de finanzas personales de código abierto que puedes instalar en tu Home Lab. Control total sobre tus datos, sin dependencias de servicios externos."
twitter_description: "Gestiona tus finanzas desde tu propio servidor con Firefly III."
permalink: /:slug/
---

*[Este post forma parte de la serie [Home Lab]({% post_url 2026-05-04-por-que-tengo-un-home-lab-mi-filosofia %})]*

Si buscas una herramienta para gestionar tu dinero, tienes dos opciones: confiar tu información financiera a servicios en la nube o gestionar tus propios datos. Firefly III es la segunda opción.

## Qué es Firefly III

[Firefly III](https://www.firefly-iii.org/){:target="_blank" :rel="nofollow noopener"} es un gestor de finanzas personales de código abierto. Se autodenomina "gestor de finanzas personales" y eso es exactamente lo que hace: te ayuda a controlar ingresos, gastos y presupuestos.

La diferencia clave con otras herramientas es que tú controlas dónde están tus datos. No hay servidores externos, no hay cesión de información a terceros. Todo está en tu hardware.

### Por qué existe

Firefly III nació de una necesidad personal. Su creador, James Cole, empezó a desarrollarlo en 2014 para gestionar sus propias finanzas después de quedarse en números rojos. Quería una herramienta que entendiera contabilidad básica sin la complejidad de software profesional.

El desarrollo continúa activamente. A fecha de 2026, el proyecto tiene más de 23.000 estrellas en GitHub y una comunidad activa detrás.

## Características principales

### Contabilidad de doble entrada

Firefly III usa el sistema de doble entrada. Cada transacción afecta a dos cuentas: si gastas 50 euros en el supermercado, se registra un gasto en tu cuenta corriente y un ingreso en la cuenta de alimentación.

Este sistema proporciona una imagen completa del flujo de dinero. Siempre cuadrará. Si no cuadra, algo está mal en el registro.

### Múltiples tipos de cuentas

Puedes configurar distintos tipos de cuentas:

- **Cuentas de activos**: cuentas bancarias, tarjetas, efectivo
- **Cuentas de gastos**: categorías de gasto (alimentación, transporte)
- **Cuentas de ingresos**: salarial, dividendos, ingresos
- **Pasivos**: préstamos, tarjetas de crédito

### Transacciones avanzadas

Cada transacción puede incluir:

- Descripción personalizada
- Fecha
- Cantidad
- Categoría
- Etiquetas
- Notas
- Archivos adjuntos
- División en múltiples partes

### Presupuestación

Firefly III permite crear presupuestos mensuales por categoría. Puedes establecer límites de gasto y seguir cuánto has gastado en cada área.

### Huchas

Las huchas en Firefly III son metas de ahorro. Creas una meta, decides cuánto quieres ahorrar, y Firefly III va rastreando el progreso.

### Reglas automáticas

El motor de reglas permite automatizar la categorización. Creas reglas como "si la descripción contiene 'AMAZON', marca como 'Compras online'". Cada vez que importas transacciones, se aplicarán automáticamente.

### Importación de datos

Firefly III incluye un importador específico para archivos CSV de bancos. Soporta múltiples formatos y permite mapear columnas.

### Informes detallados

Genera informes de patrimonio neto, gastos por categoría, presupuestos, análisis temporal. Todo exportable a CSV.

### Multivisa

Si trabajas con múltiples monedas, Firefly III soporta cambio de divisas con tasas configurables.

## Instalación mediante LXC

La instalación recomendada en un Home Lab es mediante LXC. El script de instalación automática facilita el proceso:

```bash
curl -s -S -L https://raw.githubusercontent.com/firefly-iii/community-scripts/main/install.sh | bash
```

Este script instala Firefly III con Docker, que es la forma recomendada de ejecutarlo.

### Requisitos

- Un contenedor LXC con Docker instalado
- Al menos 2 GB de RAM
- Base de datos (puede ser SQLite o MySQL/PostgreSQL externo)

### Base de datos centralizada

Si tienes una base de datos MySQL o PostgreSQL centralizada en tu Home Lab, puedes conectar Firefly III a ella en lugar de usar SQLite. Esto permite:

- Mayor rendimiento
- Copias de seguridad centralizadas
- Gestión unificada

Si te interesa esta configuración con base de datos centralizada, [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y te ayudo con los detalles específicos.

## Comparativa con alternativas

| Característica | Firefly III | YNAB | Mint | Excel/GNUCash |
|----------------|:-----------:|:----:|:----:|:-------------:|
| **Precio** | Gratis | 14,99 €/mes | Gratis | Gratis |
| **Código abierto** | Sí | No | No | Sí |
| **Datos propios** | Sí | No | No | Sí |
| **Doble entrada** | Sí | No | No | Sí |
| **Multi-usuario** | Sí | Sí | No | Sí |
| **Interfaz web** | Sí | Sí | Sí | No |
| **API** | Sí | Limitada | No | Limitada |

### YNAB

[YNAB](https://www.ynab.com/){:target="_blank" :rel="nofollow noopener"} es la opción más popular en la nube. Sus 14,99 € al mesdan una experiencia pulida, pero tus datos están en sus servidores. Además, usa "presupuesto base cero", un enfoque diferente donde asignas cada euro a una categoría.

### Mint

[Mint](https://www.mint.com/){:target="_blank" :rel="nofollow noopener"} era gratuito pero fue desconectado en 2024. Es una opción que ya no existe.

### Excel

Puedes hacerlo con hojas de cálculo, pero el mantenimiento manual es tedioso. Firefly III automatiza mucho del proceso.

### GNUCash

[GNUCash](https://www.gnucash.org/){:target="_blank" :rel="nofollow noopener"} es código abierto y tiene más funciones contables (fondos de inversión, acciones), pero la interfaz es más compleja.

## Por qué self-hosted importa

### Tus datos, tu control

Con servicios en la nube, tus datos financieros están en servidores de terceros. Las filtraciones de datos ocurren. Las políticas de privacidad cambian.

Cuando guardas todo en tu hardware, solo tú decides quién accede.

### Sin dependencias

Si el servicio cierra o cambia su modelo de negocio, tus finanzas no quedan huérfanas. Tienes tus datos exportados en formato estándar.

### Privacidad

La información financiera es sensible. No necesitas que nadie más la tenga.

## Cuándo elegir qué

### Elige Firefly III si:

- Quieres control total sobre tus datos
- Te sientes cómodo con un mínimo de administración
- Prefieres no pagar suscripciones mensuales
- Ya tienes un Home Lab funcionando

### Elige YNAB si:

- Quieres algo que "simplemente funcione"
- No te importa pagar 15 €/mes
- Prefieres no mantener infraestructura

### Elige Excel si:

- Tus necesidades son simples
- Solo quieres algo puntual

## Preguntas frecuentes

### ¿Es difícil instalar Firefly III?

No, el script de instalación automático lo hace muy fácil. Necesitas un contenedor LXC con Docker y unos minutos.

### ¿Puedo usar mi base de datos existente?

Sí, Firefly III puede conectarse a MySQL o PostgreSQL externos en lugar de usar SQLite.

### ¿Es seguro tener mis datos financieros en casa?

Sí, siempre que tu red doméstica esté correctamente configurada. Solo tú tienes acceso. Eso sí, si los tienes en tu servidor, asegúrate de hacer backups regulares. En [mi post sobre backups]({% post_url 2026-06-11-backup-3-2-1-proxmox %}) te explico cómo hacerlo.

### ¿Puedo migrar desde otro gestor?

Sí, Firefly III incluye importadores para archivos CSV desde la mayoría de bancos.

***

Compártelo si te ha gustado.

¿Tienes dudas sobre Firefly III o la instalación? [Escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo debatimos.

Y... hasta aquí por hoy!