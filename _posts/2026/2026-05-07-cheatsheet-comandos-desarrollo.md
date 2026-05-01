---
layout: post
title: "Por qué mantengo un cheatsheet.txt (luego .md) desde hace más de 20 años"
slug: cheatsheet-comandos-desarrollo
date: 2026-05-07 08:30:00 +0200
last_modified_at:
authors:
  - Marcos Ramírez
categories: [Tecnología, Software y Apps]
tags: [cheatsheet, productividad, desarrollo, comandos, tips, workflow]
excerpt: "Llevo años manteniendo un archivo de texto plano donde anoto comandos, recordatorios y notas sobre mis proyectos. Empecé con un .txt porque los .md no existían (o yo no sabía que existían), y hoy te explico por qué esta costumbre simple es uno de los mejores trucos de desarrollo que he mantenido décadas. La idea es tener un archivo cheatsheet en la raíz de cada proyecto donde anotes todo lo que no quieres olvidar. Al vivir dentro del proyecto y estar versionado en Git, siempre está ahí cuando lo necesitas. No dependés de aplicaciones externas que puedan desaparecer, no necesitás internet para acceder a tus notas, y cada cambio queda registrado en el historial. En este post te cuento mi experiencia durante más de dos décadas y por qué creo que todo desarrollador debería adoptar esta costumbre."
image: /assets/img/headers/2026/cheatsheet-comandos-desarrollo-pollinationsai.webp
image_alt: "Captura de pantalla de un archivo de texto con comandos y notas de desarrollo, representando un cheatsheet personal"
permalink: /:slug/
description: "Descubre por qué mantener un archivo cheatsheet.txt o .md con comandos y notas puede mejorar tu productividad como desarrollador. Un truco de más de 20 años."
twitter_description: "Llevo años usando un cheatsheet.txt (luego .md) para comandos y notas. Un truco simple que todo dev debería adoptar."
toc: true
pin: false
---

![{{ page.image_alt }}]({{ page.image }})

## La historia de mi cheatsheet

Soy de los que aprendió a programar cuando los editores de texto eran simples y las extensiones de archivo no importaban tanto. En aquél entonces, guardé un archivo `cheatsheet.txt` en mi proyecto principal y empecé a volcar ahí todo lo que no quería olvidar.

¿Por qué `.txt`? Por qué en esa época no usaba Markdown. Los archivos `.md` no formaban parte de mi flujo de trabajo (o simplemente no sabía que existían). Era un archivo de texto plano, sin formato, sin complicaciones.

Hoy, años después, ese archivo sigue ahí. Ahora es `cheatsheet.md` (por qué finalmente adopté Markdown), pero la filosofía es la misma: **un lugar donde anotar todo lo que necesito recordar sobre el proyecto**.

Llevo usando esta técnica desde hace más de dos décadas. He trabajado en proyectos de todo tipo: aplicaciones web, sistemas de backend, herramientas de automatización, infraestructura en la nube, y en cada uno de ellos he mantenido su propio cheatsheet. Algunos han crecido hasta tener varios cientos de líneas. Otros son pequeños recordatorios de tres o cuatro comandos esenciales.

### Por qué no lo abandono

Con los años he probado muchas alternativas: aplicaciones de notas, wikis corporativas, gestores de conocimiento, incluso documentación formal en Confluence o Notion. Al final, siempre vuelvo al archivo de texto plano dentro del proyecto.

La razón es simple: **la fricción**. Cada vez que tengo que abrir una aplicación externa, iniciar sesión, buscar el espacio de trabajo correcto, navegar hasta la página adecuada... he perdido el flujo de trabajo. Con el cheatsheet local, están dos teclas de distancia: `Ctrl + P` en VS Code, escribo `cheat` y ya lo tengo abierto.

## Qué lleva ese archivo

Mi cheatsheet no tiene una estructura rígida, pero con los años ha evolucionado para incluir:

### Comandos que olvido constantemente

Todos tenemos esos comandos que usamos una vez cada tres meses y que, cuando los necesitamos, no recordamos la sintaxis exacta. Los míos viven ahí:

```bash
# Crear un backup de la base de datos
pg_dump -U usuario -h localhost basedatos > backup_$(date +%Y%m%d).sql

# Limpiar caches de node_modules sin borrar node_modules
npm cache clean --force

# Encontrar archivos que contienen una cadena específica
grep -r "cadena_buscada" /ruta/al/proyecto/
```

Pero no solo son comandos de terminal. También anoto fragmentos de código que me cuesta recordar:

```javascript
// Cómo hacer un deep clone en JavaScript sin librerías
const clone = JSON.parse(JSON.stringify(obj));

// Debounce function para evitar llamadas excesivas
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
```

### Recordatorios importantes

Cosas que parecen obvias hasta que las olvidas a las 3:00 AM debuggeando:

```
- El servidor de staging usa el puerto 3443, no el 443
- La base de datos de producción requiere túnel SSH antes de conectar
- El comando de deploy NO elimina la caché automáticamente, hay que hacerlo a mano
- No usar la rama main para desarrollo, usar develop
- El certificado SSL se renueva automáticamente via certbot el día 1 de cada mes
```

### Notas sobre el proyecto

Decisiones técnicas que tomé hace meses y que, si no las anoto, olvido por completo:

```
- Decidí usar Redis en lugar de Memcached porque el cliente ya tenía experiencia con Redis
- La API v2 usa autenticación JWT, la v1 usa API keys (legacy, no tocar)
- El límite de subida de archivos está en nginx.conf, no en la app
- La base de datos de testing se resetea cada domingo a las 02:00
- Usamos Docker Compose para desarrollo local, Kubernetes para producción
```

### Enlaces útiles

URLs que siempre necesito pero nunca recuerdo dónde guardé:

```
- Documentación de la API: https://api-docs.ejemplo.com
- Dashboard de monitorización: https://grafana.ejemplo.com
- El repo de configuración: https://github.com/empresa/configs
```

## Por qué funciona tan bien

### 1. Está siempre ahí

A diferencia de las notas en aplicaciones externas (Notion, Evernote, o Dios sabe qué más), el cheatsheet vive **dentro del proyecto**. Cuando abro el código, el archivo está ahí. No tengo que abrir otra app, buscar en otra carpeta, o recordar dónde escribí esa nota.

Esta proximidad física en el sistema de archivos es más importante de lo que parece. El principio de **proximidad cognitiva** dice que cuanto más cerca esté la información de donde la necesitas, más probable es que la uses. Si tengo que abrir un navegador, iniciar sesión en una aplicación web, y navegar hasta la página correcta, la barrera es suficientemente alta para que no lo haga la mayoría de las veces.

### 2. Es texto plano

Un archivo `.txt` o `.md` sobrevivirá a cualquier cambio de tecnología. Dentro de 10 años, seguiré pudiendo abrir ese archivo. No dependo de que una aplicación de terceros siga existiendo o de que mi cuenta siga activa.

He visto morir a aplicaciones enteras: Google Reader, Google+, Inbox, Evernote (que casi desaparece antes de su rescate), y un largo etcétera. Los archivos de texto plano han sobrevivido más de dos décadas y seguirán haciéndolo. No necesitan un formato privativo, no necesitan una aplicación específica, no necesitan "importar" o "exportar".

### 3. No requiere mantenimiento complejo

No hay bases de datos que corromper, no hay sincronización que falla, no hay conflictos de merge raros. Es un archivo de texto. Lo abres, escribes, guardas. Punto.

Compara esto con una wiki corporativa: necesitas mantener el servidor, actualizar el software, hacer backups de la base de datos, gestionar permisos de usuarios... es un trabajo de mantenimiento constante. Mi cheatsheet ha sobrevivido a migraciones de Git, cambios de IDE, cambios de sistema operativo, y cambios de equipo de desarrollo. Siempre está ahí.

### 4. Versionado junto al código

Como el cheatsheet vive en el repositorio del proyecto, **cada cambio en el archivo queda registrado en el historial de Git**. Puedo ver qué añadí hace un año, qué comandos dejaron de funcionar, y cómo evolucionó el proyecto.

```bash
# Ver la historia de cambios del cheatsheet
git log --oneline -- cheatsheet.md

# Ver qué cambió hace 6 meses
git show HEAD~20:cheatsheet.md

# Ver quién añadió la línea sobre Redis
git blame cheatsheet.md | grep -i redis
```

### 5. No depende de servicios en la nube

Si la VPN está caída, si GitHub está en mantenimiento, si el WiFi falla en el café donde trabajo... mi cheatsheet sigue accesible. Está en mi disco duro, en mi máquina local. No necesito internet para ver qué comando me faltaba.

## De .txt a .md: La evolución natural

Hace unos años decidí cambiar la extensión de `.txt` a `.md`. ¿Por qué?

1. **Mejor visualización**: Los editores modernos y las plataformas como GitHub renderizan el Markdown, lo que hace que las secciones y el código sean más legibles.
2. **Bloques de código**: Puedo usar triple backticks para formatear comandos y código correctamente.
3. **Estructura**: Los encabezados (`##`, `###`) ayudan a organizar el contenido.

Pero la esencia no cambió: sigue siendo un archivo de texto plano que puedo abrir con cualquier editor.

## Cómo empezar tu propio cheatsheet

Si nunca has hecho esto, te recomiendo empezar hoy mismo:

1. **Crea el archivo**: En la raíz de tu proyecto, crea `cheatsheet.md` (o `notas.md`, o `COMANDOS.md` — lo que prefieras).
2. **No te compliques**: No necesitas una estructura perfecta. Empieza escribiendo lo primero que se te ocurra que siempre olvidas.
3. **Manténlo simple**: No uses herramientas complejas. Un editor de texto y nada más.
4. **Úsalo**: La próxima vez que busques un comando en Google que ya buscaste hace tres meses, en lugar de marcarlo en favoritos, añádelo a tu cheatsheet.

## Variaciones que he visto

Con los años he conocido a otros desarrolladores que usan enfoques similares:

- **`README-dev.md`**: Un archivo específico para desarrolladores, separado del README principal.
- **`docs/commands.md`**: Dentro de una carpeta de documentación del proyecto.
- **`.env.example` + notas**: Algunos combinan las variables de entorno con explicaciones de por qué existen.

Todas son válidas. La clave no es el nombre del archivo, sino **tener un lugar donde anotar lo que tu cerebro no debería estar gastando energía recordando**.

## Conclusión: La simplicidad gana

En un mundo de herramientas complejas, aplicaciones de productividad con inteligencia artificial, y sistemas de gestión de conocimiento empresarial, a veces lo mejor es volver a lo básico: **un archivo de texto que lleva años contigo**.

No es un sistema elegante. No tiene notificaciones. No sincroniza en la nube. No usa blockchains ni inteligencia artificial ni ninguna tecnología de moda. Pero funciona. Y a veces, eso es todo lo que necesitas.

He visto desarrolladores junior perder horas buscando un comando que usaron "hace dos semanas y no recordaban dónde lo anotaron". He visto equipos enteros preguntarse "¿qué puerto usaba el servidor de staging?" porque nadie lo había escrito en ningún lado. Un simple archivo de texto podría haber evitado todo eso.

La próxima vez que aprendas un comando nuevo, o configures algo que te costó una hora entender, no lo dejes solo en tu memoria. Escríbelo. Guardarlo en un archivo que siempre esté ahí, en la raíz de tu proyecto. Tu yo del futuro te lo agradecerá.

Compártelo si te ha resultado útil.

¿Tú también mantienes algo así o tienes otro sistema para no olvidar comandos y notas? Cuéntame en los comentarios.

Y... hasta aquí por hoy!
