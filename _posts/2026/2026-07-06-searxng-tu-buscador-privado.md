---
title: "SearXNG: Tu buscador privado y sin rastreos"
slug: searxng-buscador-privado
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-07-06 08:30:00 +0200
image: /assets/img/headers/searxng-buscador-privado.webp
categories: [Tecnología]
tags: [privacidad, búsqueda, Software y Apps]
pin: false
toc: true
excerpt: "SearXNG es un metabuscador de código abierto que puedes instalar en tu Home Lab. Busca en Google, Bing, Wikipedia y más, sin que te rastreen."
twitter_description: "Instala SearXNG en tu Home Lab y recupera tu privacidad al buscar."
permalink: /:slug/
---

*[Este post forma parte de la serie [Home Lab]({% post_url 2026-05-04-por-que-tengo-un-home-lab-mi-filosofia %})]*

Cada vez que buscas algo en Google, le estás dando tu información. Tu historial de búsquedas, tu dirección IP, tus intereses. Todo eso se guarda, se analiza y se usa para mostrarte anuncios.

SearXNG te permite buscar sin ser rastreado.

## Qué es SearXNG

[SearXNG](https://searxng.org/){:target="_blank" :rel="nofollow noopener"} es un metabuscador de código abierto. Un metabuscador no tiene su propio índice de páginas web. En su lugar, toma los resultados de otros buscadores y los junta.

Esto tiene varias ventajas:

- No necesitas mantener un índice de miles de millones de páginas
- Los resultados vienen de fuentes que ya existen
- Puedes usar los resultados de Google sin que Google te rastree a ti

### Por qué existe

SearXNG nació de la preocupación por la privacidad. Cuando buscas en Google, Bing o cualquier otro buscador comercial, tus búsquedas se almacenan, se asocian con tu IP y se usan para crear un perfil sobre ti.

SearXNG te permite buscar sin ese rastreo. No guarda historial, no envía tus datos a terceros, no te perfila.

## Características principales

### Más de 70 motores de búsqueda

SearXNG puede buscar en Google, Bing, DuckDuckGo, Wikipedia, YouTube, y decenas más. Tienes más de 70 motores organizados por categorías: general, imágenes, vídeos, noticias, música, tecnología, ciencia, archivos.

### Sin rastreo

No guarda tu historial de búsquedas. No comparte tu IP con los motores de búsqueda. Tus búsquedas son privadas.

### Resultados agregados

Como metabuscador, junta resultados de múltiples fuentes. Obtienes la diversidad de Google con la privacidad de un buscador privado.

### Personalizable

Puedes elegir qué motores usar, qué categorías mostrar, el idioma de los resultados. Todo configurable desde el panel de administración.

###Plugins

Viene con plugins integrados para mejorar la experiencia: filtros de idioma, protección contra rastreo, gestor de cookies y más.

### Búsqueda por categorías

Los resultados se organizan en pestañas: todo, imágenes, vídeos, noticias, música. Lo que necesites, lo encuentras rápido.

### Instalación ligera

Necesita muy pocos recursos. Con 256 MB de RAM basta. Puedes correrlo en una Raspberry Pi.

## Comparativa con alternativas

| Característica | SearXNG | Google | Bing | DuckDuckGo | Startpage |
|----------------|:--------:|:------:|:----:|:----------:|:---------:|
| **Precio** | Gratis | Gratis | Gratis | Gratis | Gratis |
| **Código abierto** | Sí | No | No | Parcial | No |
| **Sin rastreo** | Sí | No | No | Sí | Sí |
| **Resultados propios** | No | Sí | Sí | No | No |
| **Metabuscador** | Sí | No | No | No | No |
| **Auto-alojable** | Sí | No | No | No | No |

### Google

[Google](https://www.google.com/){:target="_blank" :rel="nofollow noopener"} es el buscador más usado. También es el que más datos recopila sobre ti. Cada búsqueda se guarda, se asocia con tu perfil y se usa para mostrarte anuncios personalizados.

### Bing

[Bing](https://www.bing.com/){:target="_blank" :rel="nofollow noopener"} de Microsoft. También rastrea y guarda todo.

### DuckDuckGo

[DuckDuckGo](https://duckduckgo.com/){:target="_blank" :rel="nofollow noopener"} es un buscador centrado en privacidad. No guarda historial. Pero sus resultados son menos completos que Google y sigue siendo un servicio externo.

### Startpage

[Startpage](https://www.startpage.com/){:target="_blank" :rel="nofollow noopener"} usa resultados de Google sin rastreo. Interesante, pero es un servicio externo y no tienes control.

## Por qué self-hosted importa

### Privacidad real

Con SearXNG instalado en tu Home Lab, tus búsquedas no salen de tu red. No hay intermediarios, no hay servidores externos que guarden tus datos.

### Sin dependencias

No dependes de que un servicio tercero mantenga su promesa de privacidad. Tienes el control.

### Resultados de calidad

Obtienes los resultados de Google, Bing y otros, pero sin el rastreo que conllevan.

### Control total

Puedes configurar qué motores usar, qué filtrar, qué idioma. Todo a tu medida.

## Instalación mediante LXC

La instalación recomendada en un Home Lab es mediante LXC. Hay varias formas de instalarlo:

### Con Docker (recomendado)

```bash
docker run -d \
  --name searxng \
  -v /ruta/a/datos:/etc/searxng \
  -p 8080:8080 \
  searxng/searxng:latest
```

### Con el script de instalación

```bash
curl -s -S -L https://raw.githubusercontent.com/searxng/searxng/master/install.sh | bash
```

### Requisitos

- Un contenedor LXC
- Al menos 256 MB de RAM (512 MB recomendado)
- 1 GB de espacio en disco

### Configuración básica

Después de instalar, accede a la interfaz web. Desde el panel de administración puedes:

- Elegir qué motores de búsqueda usar
- Configurar el idioma
- Activar o desactivar plugins
- Personalizar la interfaz

Si te interesa esta configuración, [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y te ayudo con los detalles específicos.

## Cuándo elegir qué

### Elige SearXNG si:

- Quieres privacidad real al buscar
- No quieres que te rastreen
- Ya tienes un Home Lab funcionando
- Quieres resultados de calidad sin renunciar a privacidad

### Elige Google si:

- Necesitas los resultados más precisos posible
- No te importa que rastreen tus búsquedas
- No quieres mantener nada

### Elige DuckDuckGo si:

- Quieres privacidad pero no quieres instalar nada
- Te vale con resultados ligeramente inferiores

***

Compártelo si te ha gustado.

¿Tienes dudas sobre SearXNG o la instalación? [Escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo debatimos.

Y... hasta aquí por hoy!