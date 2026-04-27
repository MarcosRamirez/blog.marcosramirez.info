---
title: "Paperless NGX: Gestiona tus documentos digitales sin perder el control"
slug: paperless-ngx-documentos
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-06-29 08:30:00 +0200
image: /assets/img/headers/2026/paperless-ngx-documentos-nanobanana.webp
categories: [Tecnología]
tags: [documentos, privacidad, gestión, Software y Apps]
pin: false
toc: true
excerpt: "Paperless NGX es un gestor de documentos de código abierto que puedes instalar en tu Home Lab. Tus archivos, tu servidor, tu privacidad."
twitter_description: "Gestiona tus documentos digitales con Paperless NGX en tu propio servidor."
permalink: /:slug/
---

*[Este post forma parte de la serie [Home Lab]({% post_url 2026/2026-05-04-home-lab-filosofia %})]*

Todos tenemos papel. Facturas, contratos, garantías, recibos. Montones de papel que se acumulan y que luego no encontramos cuando los necesitamos.

Paperless NGX es la solución.

## Qué es Paperless NGX

[Paperless NGX](https://paperless-ngx.com/){:target="_blank" :rel="nofollow noopener"} es un sistema de gestión de documentos de código abierto. Transforma tus documentos físicos en un archivo digital, totalmente local, sin suscripciones, sin servicios en la nube.

Lo de "NGX" es porque es la nueva versión del proyecto original "Paperless". El desarrollo continúa activamente y tiene una comunidad muy detrás.

### Para qué sirve

Básicamente, para esto:

- Escanear y digitalizar documentos
- Hacer que sean buscables (OCR)
- Organizarlos por etiquetas, tipos, remitentes
- Encontrar cualquier documento en segundos
-Tener siempre una copia de seguridad

## Características principales

### OCR automático

Paperless NGX usa Tesseract para reconocer el texto de tus documentos. Escanea PDFs, imágenes, lo que sea. Después puedes buscar por cualquier palabra. ¿Buscas el recibo de la luz de hace dos años? Lo encuentras en segundos.

### Etiquetado automático

Creas reglas una vez y Paperless lo hace solo. Por ejemplo: "si el documento contiene la palabra 'factura' y el importe es mayor de 500 euros, etiquétalo como 'gasto importante'".

Y desde hace poco, usa aprendizaje automático para sugerir etiquetas basándose en cómo ya has clasificado documentos similares.

### Tipos de documentos

Clasifica por facturas, recibos, contratos, estados de cuenta, garantías. Lo que necesites.

### Remitentes

Guarda quién envía o recibe cada documento. Empresas, administración, particulares.

### Búsqueda completa

Búsqueda por texto completo. Autocompletado sugiriendo términos de tus documentos. Lo que sea, lo encuentras.

### Procesamiento de correo electrónico

Paperless puede conectarse a tus cuentas de correo y importar documentos directamente. Puedes configurar reglas para que procese los adjuntos automáticamente.

### Permisos multiusuario

Varios usuarios, cada uno con sus permisos. Puedes compartir documentos sin dar acceso a todo.

### Versiones de documentos

Si modificas un documento, Paperless guarda las versiones anteriores. Siempre puedes volver atrás.

### IA integrada

Paperless NGX incluye funciones de inteligencia artificial. Puede:

- Sugerir etiquetas basándose en el contenido
- Chatear con tus documentos (búsqueda semántica)
-indexar para encontrar documentos similares

Todo esto funciona en local si quieres, sin enviar datos a externos.

## Comparativa con alternativas

| Característica | Paperless NGX | Dropbox | Google Drive | Evernote | Expensify |
|----------------|:-------------:|:-------:|:------------:|:--------:|:---------:|
| **Precio** | Gratis | 11,99 €/mes | 2,99 €/mes | 10,99 €/mes | 12 €/mes |
| **Código abierto** | Sí | No | No | No | No |
| **Datos locales** | Sí | No | No | No | No |
| **OCR** | Sí | Limitado | Limitado | Sí | Sí |
| **Étiquetado automático** | Sí | No | No | Limitado | Sí |
| **Privacidad total** | Sí | No | No | No | No |

### Dropbox

[Dropbox](https://www.dropbox.com/){:target="_blank" :rel="nofollow noopener"} es popular pero tus documentos están en sus servidores. Pago mensual por espacio.

### Google Drive

[Google Drive](https://drive.google.com/){:target="_blank" :rel="nofollow noopener"} viene con tu cuenta de Gmail. Es práctico pero no es privado. Google lee tus archivos.

### Evernote

[Evernote](https://evernote.com/){:target="_blank" :rel="nofollow noopener"} está más orientado a notas que a documentos. El precio ha subido y los datos no son tuyos.

### Expensify

[Expensify](https://www.expensify.com/){:target="_blank" :rel="nofollow noopener"} está centrado en gastos empresariales. Excesivo para uso personal.

## Por qué self-hosted importa

### Tus documentos, tu privacidad

Los documentos contienen información muy sensible: datos personales, información financiera, datos médicos. ¿Por qué confiar eso a empresas?

Con Paperless NGX, todo está en tu hardware. Nadie más tiene acceso.

### Sin suscripciones

No hay cuota mensual. Lo instalas una vez y ya está. No hay riesgo de que suban el precio o cierren el servicio.

### Búsqueda que funciona

El OCR integrado funciona offline. Buscas en tus documentos y aparece al instante. No depende de conexiones a internet.

### Formato PDF/A

Paperless guarda los documentos en formato PDF/A, diseñado para almacenamiento a largo plazo. Tus documentos durarán décadas.

## Instalación mediante LXC

La instalación recomendada en un Home Lab es mediante LXC:

```bash
curl -s -S -L https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/main/install.sh | bash
```

O también puedes usar Docker directamente:

```bash
docker run -d \
  --name paperless-ngx \
  -e PAPERLESS_URL=https://tu-dominio.com \
  -v /ruta/a/datos:/data \
  -v /ruta/a/documentos:/consume \
  -p 8000:8000 \
  paperlessngx/paperless-ngx:latest
```

### Requisitos

- Un contenedor LXC con al menos 2 GB de RAM
- Docker instalado
- Almacenamiento para los documentos

### Base de datos centralizada

Paperless NGX usa SQLite por defecto, pero puedes conectarlo a PostgreSQL para mejor rendimiento y copias de seguridad centralizadas.

Si te interesa esta configuración, [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y te ayudo con los detalles específicos.

## Cuándo elegir qué

### Elige Paperless NGX si:

- Quieres control total sobre tus documentos
- Necesitas OCR y búsqueda avanzada
- No quieres pagar suscripciones
- Ya tienes un Home Lab funcionando
- Valoras tu privacidad

### Elige Dropbox o Google Drive si:

- Necesitas compartir documentos con otros frecuentemente
- No te importa que las empresas tengan tus datos
- Quieres sincronización automática con dispositivos

### Elige Evernote si:

- Mainly necesitas tomar notas
- No te importa pagar por funcionalidades básicas

***

Compártelo si te ha gustado.

¿Tienes dudas sobre Paperless NGX o la instalación? [Escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo debatimos.

Y... hasta aquí por hoy!