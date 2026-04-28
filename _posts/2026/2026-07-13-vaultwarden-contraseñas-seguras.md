---
title: "Vaultwarden: Tus contraseñas seguras, en tu servidor, bajo tu control"
slug: vaultwarden-contraseñas-seguras
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-07-13 08:30:00 +0200
image: /assets/img/headers/2026/vaultwarden-contraseñas-seguras-nanobanana.webp
categories: [Tecnología]
tags: [seguridad, contraseñas, privacidad, Software y Apps]
pin: false
toc: true
excerpt: "Vaultwarden es un gestor de contraseñas de código abierto que puedes instalar en tu Home Lab. Todas las funcionalidades premium de Bitwarden, gratis, y con tus datos en tu servidor."
twitter_description: "Instala Vaultwarden en tu Home Lab y controla tus contraseñas."
permalink: /:slug/
---

*[Este post forma parte de la serie [Home Lab]({% post_url 2026/2026-04-27-home-lab-filosofia %})]*

Las contraseñas son la puerta de entrada a tu vida digital. Correo, redes sociales, banca, trabajo. Si alguien accede a tus contraseñas, lo pierde todo.

Un gestor de contraseñas no es opcional. Es fundamental. Y Vaultwarden te da el control total.

## Qué es Vaultwarden

[Vaultwarden](https://vaultwarden.net/){:target="_blank" rel="nofollow noopener"} es una implementación de servidor del API de [Bitwarden](https://bitwarden.com/){:target="_blank" rel="nofollow noopener"}, escrita en [Rust](https://www.rust-lang.org/){:target="_blank" rel="nofollow noopener"}. Es ligera, rápida y totalmente compatible con todos los clientes oficiales de Bitwarden: extensiones de navegador, aplicaciones de escritorio, apps móviles.

Básicamente, es Bitwarden pero en tu servidor, sin pagar nada por las funcionalidades premium.

### Por qué existe

Bitwarden es excelente. Es de código abierto, tiene clientes en todas las plataformas y una versión gratuita correcta. Pero las funcionalidades premium cuestan 10 euros al año por usuario.

Vaultwarden te da todas esas funcionalidades premium gratis: TOTP, archivos adjuntos, acceso de emergencia, organizaciones. Todo.

Y lo más importante: tus contraseñas están en tu servidor, no en los servidores de Bitwarden.

## Características principales

### Compatible con clientes Bitwarden

Usa las mismas aplicaciones que Bitwarden. La misma interfaz, las mismas extensiones, las mismas apps. Solo cambia la URL del servidor.

### Cifrado del lado del cliente

Tu contraseña maestra nunca sale de tu dispositivo. Todo el cifrado y descifrado ocurre localmente. El servidor solo almacena datos cifrados que no puede leer.

### Funcionalidades premium gratuitas

Estas son las funcionalidades que en Bitwarden requieren suscripción, y en Vaultwarden son gratis:

- **TOTP**: autenticador de dos factores integrado
- **Archivos adjuntos**: guarda archivos en tu bóveda
- **Acceso de emergencia**: designa a alguien de confianza que pueda acceder a tu bóveda si te pasa algo
- **Organizaciones**: comparte contraseñas con familia o equipo
- **Informes de salud de la bóveda**: detecta contraseñas débiles, reutilizadas o comprometidas

### Autenticación de dos factores

Soporta múltiples métodos de 2FA:

- Correo electrónico
- [Duo](https://duo.com/){:target="_blank" rel="nofollow noopener"}
- [YubiKey](https://www.yubico.com/){:target="_blank" rel="nofollow noopener"}
- [FIDO2](https://fidoalliance.org/fido2/){:target="_blank" rel="nofollow noopener"} WebAuthn (incluyendo [Nitrokey](https://nitrokey.com/){:target="_blank" rel="nofollow noopener"} y [Solokeys](https://solokeys.com/){:target="_blank" rel="nofollow noopener"})

### Sincronización en tiempo real

WebSocket para escritorio y navegador, notificaciones push para móviles. Todo sincronizado al instante.

### Ligero

Vaultwarden usa apenas 50 MB de RAM. Puedes correrlo en una Raspberry Pi sin problemas.

### Bases de datos

Usa [SQLite](https://www.sqlite.org/){:target="_blank" rel="nofollow noopener"} por defecto, pero puede conectarse a [MySQL](https://www.mysql.com/){:target="_blank" rel="nofollow noopener"} o [PostgreSQL](https://www.postgresql.org/){:target="_blank" rel="nofollow noopener"} para mejor rendimiento y escalabilidad.

## Comparativa con alternativas

| Característica | Vaultwarden | Bitwarden Cloud | Bitwarden Self-Hosted | 1Password | LastPass |
|----------------|:------------:|:---------------:|:---------------------:|:---------:|:--------:|
| **Precio** | Gratis | Gratis / 10 €/año | 3,33 €/mes | 2,99 €/mes | 2,90 €/mes |
| **Código abierto** | Sí | Parcial | Parcial | No | No |
| **Datos locales** | Sí | No | Sí (tú decides) | No | No |
| **TOTP gratis** | Sí | No (premium) | No (premium) | Sí | Sí |
| **Archivos adjuntos** | Sí | No (premium) | No (premium) | Sí | Sí |
| **Acceso de emergencia** | Sí | No (premium) | No (premium) | Sí | Sí |
| **Organizaciones** | Ilimitadas | Limitado | Ilimitadas | Sí | Sí |
| **RAM requerida** | ~50 MB | N/A | 2 GB+ | N/A | N/A |

### Bitwarden Cloud

[Bitwarden](https://bitwarden.com/){:target="_blank" rel="nofollow noopener"} es la opción oficial. Puedes usarlo gratis para un usuario, pero las funcionalidades premium cuestan. Tus datos están en sus servidores.

### Bitwarden Self-Hosted

La versión auto-alojada oficial de Bitwarden. Requiere Microsoft SQL Server y unos 2 GB de RAM. Más pesada que Vaultwarden.

### 1Password

[1Password](https://1password.com/){:target="_blank" rel="nofollow noopener"} es excelente pero es propietario y caro. No tienes acceso al código.

### LastPass

[LastPass](https://www.lastpass.com/){:target="_blank" rel="nofollow noopener"} ha tenido varios incidentes de seguridad. No es recomendable.

## Por qué self-hosted importa

### Tus contraseñas son lo más valioso

Si alguien accede a tu gestor de contraseñas, lo pierde todo. Correo, banca, redes sociales. Todo.

Con Vaultwarden en tu Home Lab, solo tú tienes acceso. No hay servidores externos que puedan ser comprometidos.

### Sin dependencia de terceros

Bitwarden podría cerrar, cambiar sus políticas de privacidad o subir precios. Con Vaultwarden, siempre tienes tu bóveda.

### Funcionalidades premium gratis

10 euros al año no es mucho. Pero acumulada durante años, es una cantidad. Y con Vaultwarden tienes todo gratis.

## Instalación mediante LXC

La instalación recomendada en un Home Lab es mediante LXC. Usa el script de instalación automático:

```bash
curl -s -S -L https://raw.githubusercontent.com/ghost-of-company/vaultwarden/main/install.sh | bash
```

Este script instala Vaultwarden con [Docker](https://www.docker.com/){:target="_blank" rel="nofollow noopener"}, que es la forma recomendada de ejecutarlo.

### Requisitos

- Un contenedor LXC con Docker instalado
- Al menos 512 MB de RAM
- HTTPS obligatorio (usa un reverse proxy como [Caddy](https://caddyserver.com/){:target="_blank" rel="nofollow noopener"} o [Nginx](https://nginx.org/){:target="_blank" rel="nofollow noopener"})

### Configuración básica

1. Accede a la interfaz web
2. Crea tu cuenta
3. Configura el token de administrador si quieres acceder al panel de administración
4. Descarga los clientes de Bitwarden y cambia la URL del servidor a la tuya

### Importante: backups

Esto es crítico. Tus contraseñas están en tu servidor. Si el disco se rompe, pierdes todo.

**[En mi post sobre backups]({% post_url 2026/2026-06-11-backup-3-2-1 %})** te explico cómo hacer backups correctamente. Aplica lo mismo para Vaultwarden: guarda una copia exportada regularmente.

Si necesitas ayuda configurando los backups de tu bóveda, [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo vemos.

## Cuándo elegir qué

### Elige Vaultwarden si:

- Quieres control total sobre tus contraseñas
- Necesitas funcionalidades premium sin pagar
- Ya tienes un Home Lab funcionando
- Valoras tu privacidad
- Quieres compartir contraseñas con familia o equipo

### Elige Bitwarden Cloud si:

- No quieres mantener nada
- Te fías de sus servidores
- No te importa pagar por funcionalidades premium

### Elige 1Password si:

- Quieres la experiencia más pulida
- No te importa pagar
- No necesitas código abierto

***

Compártelo si te ha gustado.

¿Tienes dudas sobre Vaultwarden o la instalación? [Escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo debatimos.

Y... hasta aquí por hoy!
