---
title: "Cómo resolví los cortes aleatorios de Jellyfin en 4K (spoiler: el disco estaba lleno)"
date: 2026-04-23 21:45:00 +0200
excerpt: "Películas en 4K que se cortan a los 5 minutos, salvapantallas que salta solo... No era la red. El disco del LXC estaba al 100%. Cinco problemas que encontré y solucioné: disco lleno, MKV corrupto, sin aceleración por hardware, montaje NTFS incorrecto y NFS que no detectaba archivos."
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
tags: [sistemas, redes-e-infraestructura, contenedores]
image: /assets/img/headers/2026/jellyfin-cortes-4k-disco-nanobanana.webp
image_alt: "Logo de Jellyfin con pantalla de reproducción de video 4K"
image_alt: "Pantalla de televisión con reproductor de video congelado, cuarto oscuro, atmósfera de cine en casa"
pin: false
toc: true
twitter_description: "Jellyfin se cortaba aleatoriamente en 4K. El problema: disco lleno. Cinco errores encadenados que descubrí analizando los logs."
permalink: /:slug/
slug: jellyfin-cortes-4k-disco
---

![{{ page.image_alt }}]({{ page.image }}){:alt="Pantalla de televisión con reproductor de video congelado, cuarto oscuro, atmósfera de cine en casa"}

Llevaba días con el mismo problema: ponía una película en 4K en la TV, y en algún momento aleatorio la imagen se congelaba y saltaba el salvapantallas. A veces pasaba al minuto, a veces aguantaba media hora. [Jellyfin](https://jellyfin.org/){:target="_blank" rel="nofollow noopener"} seguía corriendo en el servidor, sin reiniciarse, sin avisar. Imposible reproducir el problema de forma consistente.

Después de investigar los logs, encontré no uno sino cinco problemas encadenados. Los cuento en orden de descubrimiento.

---

## Diagnóstico: cómo analizar los logs de Jellyfin

Lo primero es filtrar los logs por errores de los últimos días, ignorando ruido irrelevante:

```bash
pct exec <JELLYFIN_ID> -- journalctl -u jellyfin --since "4 days ago" --no-pager \
  | grep -i -E "error|exception|killed|crash|fail|cancel" \
  > /tmp/jf_errors.txt

grep -oP '\[ERR\].*' /tmp/jf_errors.txt | sort | uniq -c | sort -rn | head -30
```

El segundo comando agrupa los errores únicos y los ordena por frecuencia. Así de un vistazo ves qué está fallando más.

---

## Problema 1 — Archivo MKV corrupto

En los logs aparecía repetidamente:

```
Extracting keyframes failed
NEbml.Core.EbmlDataFormatException: Length bigger than 8 is not supported
```

Jellyfin no podía extraer los keyframes de un archivo concreto porque el contenedor MKV estaba dañado. Para verificarlo:

```bash
ffprobe /ruta/al/archivo.mkv 2>&1 | tail -20
```

Si el archivo tiene el contenedor dañado pero los streams están bien, se puede intentar remuxear sin recodificar (rápido, sin pérdida de calidad):

```bash
ffmpeg -i input.mkv -c copy output_fixed.mkv
```

En mi caso el error EBML aparecía durante el propio remux, lo que significa que el archivo estaba demasiado dañado para recuperarlo. Toca borrarlo y conseguir una copia nueva.

---

## Problema 2 — Disco lleno al 100% (el culpable principal)

Este era el problema gordo. El LXC de Jellyfin tenía asignados 16GB y estaba al 100%. Sin espacio, Jellyfin no podía escribir logs, segmentos de transcoding ni archivos temporales, lo que hacía que [ffmpeg](https://ffmpeg.org/){:target="_blank" rel="nofollow noopener"} fallara silenciosamente y la reproducción se cortara.

Para detectarlo:

```bash
pct exec <JELLYFIN_ID> -- df -h /
pct exec <JELLYFIN_ID> -- du -sh /var/* 2>/dev/null | sort -rh | head -10
```

Primero liberar lo que se pueda sin tocar nada importante:

```bash
pct exec <JELLYFIN_ID> -- journalctl --vacuum-size=50M
pct exec <JELLYFIN_ID> -- truncate -s 0 /var/log/jellyfin/*.log
pct exec <JELLYFIN_ID> -- rm -rf /var/cache/jellyfin/*
```

Pero la solución de fondo es ampliar el disco. El problema era que:

1. Jellyfin lo tenía instalado con los [Proxmox Helper Scripts](https://community-scripts.org/){:target="_blank" rel="nofollow noopener"}. Y como "funciobaba", te olvidas.

2. Los Helper Scripts por defecto asignan **16GB** de disco al contenedor. Parece mucho, pero con transcodes de 4K se llena rápido.

3. No tenía activada la opción de **borrar los segmentos transcodificados** después de servirlos. Esto está en:
   - **Dashboard → Reproducción → Transcodificación** → **Eliminar segmentos**
   - Con esto, Jellyfin borra los archivos de transcode una vez enviados al cliente.

En mi caso robé espacio a otro LXC que tenía de sobra. El orden es crítico para no perder datos:

```bash
# 1. Ver espacio disponible
vgs && lvs
```

```bash
# 2. Parar el LXC donante
pct stop <LXC_DONANTE_ID>
```

```bash
# 3. Verificar filesystem, reducirlo y reducir el LV
e2fsck -fy /dev/pve/vm-<LXC_DONANTE_ID>-disk-0
resize2fs /dev/pve/vm-<LXC_DONANTE_ID>-disk-0 100G
lvreduce -L 100G /dev/pve/vm-<LXC_DONANTE_ID>-disk-0
```

```bash
# 4. Arrancar el LXC donante
pct start <LXC_DONANTE_ID>
```

```bash
# 5. Ampliar Jellyfin desde la web de [Proxmox](https://www.proxmox.com/){:target="_blank" rel="nofollow noopener"}:
# LXC Jellyfin → Hardware → Hard Disk → Disk Action → Resize
# Proxmox hace el resize2fs automáticamente al ampliar
```

Yo intenté hacerlo por comandos (lvreduce/lvextend) y no fui capaz. Desde la interfaz web fue meter el valor y listo.

¿ sabes cómo hacerlo por comandos? [Escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} o deja un comentario porque ni con [Claude Code](https://claude.com/claude-code) lo conseguí.

⚠️ Si el tamaño en la config del LXC no coincide con el LV real, actualízalo:

```bash
sed -i 's/size=ANTIGUO/size=NUEVO/' /etc/pve/lxc/<ID>.conf
```

---

## Problema 3 — Sin aceleración por hardware

Con el disco lleno resuelto, vi que Jellyfin estaba transcodificando 4K HEVC por software, lo cual es muy pesado. El servidor tiene una Intel HD Graphics 530 (Skylake) que soporta Quick Sync, así que la configuré.

Primero verificar que el dispositivo existe en el nodo:

```bash
ls -la /dev/dri/
```

Pasarlo al LXC (funciona en LXCs unprivileged):

```bash
pct set <JELLYFIN_ID> --dev0 /dev/dri/renderD128
pct set <JELLYFIN_ID> --dev1 /dev/dri/card1
pct stop <JELLYFIN_ID> && pct start <JELLYFIN_ID>
```

Luego en Jellyfin: **Panel de control → Reproducción → Conversión → Aceleración por hardware → Intel Quick Sync**.

---

## Problema 4 — Jellyfin no podía borrar archivos del disco

El disco de medios es un disco externo NTFS montado con bind mount en el LXC. Estaba en `/etc/fstab` con `uid=1000,gid=1000,umask=002`, lo que impedía a Jellyfin (que corre con otro usuario) borrar archivos.

NTFS no soporta permisos Unix reales por archivo, así que la solución es montar el disco de forma que todos tengan acceso completo:

```bash
# /etc/fstab — cambiar la línea del disco NTFS a:
UUID=XXXX /mnt/disco ntfs-3g defaults,uid=0,gid=0,umask=000 0 0
```

Aplicar el cambio:

```bash
systemctl daemon-reload
pct stop <JELLYFIN_ID>
umount /mnt/disco
mount /mnt/disco
pct start <JELLYFIN_ID>
```

---

## Problema 5 — Jellyfin no detectaba archivos nuevos automáticamente

Jellyfin tiene una opción para detectar contenido nuevo en tiempo real mediante inotify. El problema es que **inotify no funciona sobre NFS**: los eventos del sistema de archivos no se propagan por red.

La solución es usar bind mount directo en lugar de NFS. En la config del LXC de Jellyfin:

```
mp0: /mnt/disco/Shared/Media,mp=/mnt/media
```

Con bind mount directo, inotify funciona y Jellyfin detecta el contenido nuevo sin necesidad de escaneos periódicos.

---

## FAQ

### ¿Cómo puedo saber si el disco de mi Jellyfin está lleno?

Usa `pct exec <ID> -- df -h /` para ver el espacio disponible. También `du -sh /var/*` para ver qué carpetas ocupan más espacio.

### ¿Por qué Jellyfin se corta aleatoriamente sin dar errores?

Porque el error no está en Jellyfin sino en el sistema de archivos. Cuando el disco está lleno, ffmpeg falla silenciosamente al escribir segmentos temporales, y la reproducción se corta sin mensajes de error claros.

### ¿Puedo usar NFS para compartir medios con Jellyfin?

No recomendable si quieres que Jellyfin detecte archivos nuevos con inotify. NFS no propaga eventos del sistema de archivos, así que Jellyfin no detectará contenido nuevo hasta que hagas un escaneo manual. Usa bind mount en su lugar.

### ¿Necesito aceleración por hardware para reproducir 4K?

Aunque es recomendable para servidores con recursos limitados, no es obligatorio. Si tienes un processor moderno, la transcodificación por software puede funcionar. Pero para ahorrar recursos, configura Quick Sync (Intel) o VA-API (Linux).

---

## Conclusión

El problema que parecía misterioso (cortes aleatorios imposibles de reproducir) tenía una causa muy mundana: el disco lleno. Jellyfin fallaba silenciosamente porque no podía escribir en disco, y eso se manifestaba como cortes aleatorios dependiendo de qué operación intentara hacer en cada momento.

Lo peor: Jellyfin lo tenía instalado con los [Proxmox Helper Scripts](https://community-scripts.org/){:target="_blank" rel="nofollow noopener"}, así que un par de clics y ya estaba. Y como "funciobaba", te olvidas.

En total, pasé una horita entretenida solucionando el problema. Pero al menos ahora sé qué hacer para que no me pase otra vez.

La lección: **monitoriza el espacio en disco de tus servicios de media**. Los transcodes, cachés de trickplay y logs de Jellyfin pueden crecer sin control y llenarte el disco sin avisar. Configura alertas de espacio en [Proxmox](https://www.proxmox.com/){:target="_blank" rel="nofollow noopener"}, Grafana/Prometheus o lo que uses, antes de que te pase lo mismo.

***
¿Tienes problemas similares con Jellyfin o algún servicio de media? [Escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} o deja un comentario.

Compártelo si te ha liked.

Y... ¡hasta aquí por hoy!

Y... hasta aquí por hoy!
