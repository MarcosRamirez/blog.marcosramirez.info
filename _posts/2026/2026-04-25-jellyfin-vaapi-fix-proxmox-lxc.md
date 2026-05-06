---
title: "Solucionar VAAPI en Jellyfin LXC sin privilegios de Proxmox"
slug: "jellyfin-vaapi-fix-proxmox-lxc"
date: 2026-04-25 08:30:00 +0200
excerpt: "Aprende a corregir el error de transcodificación hardware VAAPI en Jellyfin dentro de un contenedor LXC sin privilegios en Proxmox. El error Device creation failed: -542398533 ocurre aunque vainfo funciona porque los dispositivos /dev/dri/card1 y renderD128 se mapean como root:root en lugar de root:video y root:render. Crea un hook script en /var/lib/vz/snippets que cambia los permisos automáticamente en post-start, registralo con pct set y reinicia el contenedor para que Jellyfin acceda a Intel Quick Sync sin errores."
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
  - Home Lab
image: /assets/img/headers/2026/jellyfin-vaapi-fix-proxmox-lxc-2026-nanobanana.webp
image_alt: "Terminal mostrando error de VAAPI en Jellyfin dentro de un contenedor LXC de Proxmox"
tags: [vaapi, intel-quick-sync, lxc, hardware-transcoding, troubleshooting]
pin: false
toc: true
twitter_description: "Solución al problema de VAAPI en un LXC sin privilegios. Guía paso a paso para hacer funcionar Jellyfin con hardware transcoding en Proxmox."
description: "Soluciona el error VAAPI en Jellyfin LXC sin privilegios. Hook script y permisos para Intel Quick Sync. Aprende a configurarlo paso a paso. Descubre más."
permalink: /:slug/
last_modified_at: 2026-05-01 22:13:49 +0200
---

![{{ page.image_alt }}]({{ page.image }})

Este post es la continuación de [Jellyfin cortes 4K y disco lleno]({% post_url 2026/2026-04-23-jellyfin-cortes-4k-disco %}). Hace un par de días parecía que todo estaba arreglado y que la transcodificación funcionaba bien, pero resulta que no: la GPU no estaba bien configurada y los cortes seguían apareciendo.

## Problema – Error de transcodificación en Jellyfin

[Jellyfin](https://jellyfin.org/){:target="_blank" rel="nofollow noopener"} muestra la siguiente excepción:

```bash
Device creation failed: -542398533.
Failed to set value 'vaapi=va:,vendor_id=0x8086,driver=iHD' for option 'init_hw_device': Generic error in an external library
Error parsing global options: Generic error in an external library
```

Esto ocurre aunque la comprobación de `vainfo` funciona dentro del contenedor y el driver **iHD** está presente.

## Diagnóstico – ¿Por qué Jellyfin no accede a /dev/dri?

En el nodo [Proxmox](https://www.proxmox.com/){:target="_blank" rel="nofollow noopener"}:

```bash
ls -la /dev/dri/
# crw-rw---- 1 root video  226,   1 card1
# crw-rw---- 1 root render 226, 128 renderD128
```

Al inspectar el LXC (ID 108) los dispositivos aparecen como `root:root` en lugar de `root:video` / `root:render`, bloqueando el acceso del usuario **jellyfin**.

## Solución – Hook script de Proxmox para cambiar permisos

```bash
# Create the snippets directory if it doesn't exist
mkdir -p /var/lib/vz/snippets

# Create the hook script
cat > /var/lib/vz/snippets/lxc-108-dri-perms.sh << 'EOF'
#!/bin/bash
VMID="$1"
PHASE="$2"

if [ "$VMID" != "108" ] || [ "$PHASE" != "post-start" ]; then
    exit 0
fi

sleep 2

lxc-attach -n 108 -- chown root:render /dev/dri/renderD128
lxc-attach -n 108 -- chown root:video  /dev/dri/card1
EOF

chmod +x /var/lib/vz/snippets/lxc-108-dri-perms.sh

# Register the hook script in the LXC config
pct set 108 --hookscript local:snippets/lxc-108-dri-perms.sh

# Restart the LXC (pct restart does not exist in Proxmox 9)
pct stop 108 && pct start 108
```

Al instalar y registrar el script (`pct set 108 --hookscript local:snippets/lxc-108-dri-perms.sh`) los dispositivos adquieren la propiedad correcta.

Verifica:

```bash
pct exec 108 -- ls -la /dev/dri/
# crw-rw---- 1 root video  226,   1 card1
# crw-rw---- 1 root render 226, 128 renderD128
```

Con los permisos corregidos, Jellyfin transcodifica vía VAAPI sin errores.

## Resultados – Transcodificación confiable y sin disrupciones

Jellyfin ahora accede a todos los dispositivos DRI y la funcionalidad de hardware transcoding con Intel Quick Sync funciona de manera estable.

### FAQ

<details>
<summary>¿Qué diferencia hay entre <em>card1</em> y <em>renderD128</em> en /dev/dri?</summary>

<em>card1</em> es el dispositivo principal de renderizado de la GPU; <em>renderD128</em> permite la entrada VRAM sin asociarse directamente a la pantalla, usado para streaming e Inteligencia Artificial.

</details>

<details>
<summary>¿Necesito reiniciar el contenedor cada vez que cambie los permisos?</summary>

Solo es necesario hacerlo una vez después de instalar el hook. Posteriormente el script corre en `post-start` automáticamente.

</details>

<details>
<summary>¿Puedo usar este script en Proxmox 8?</summary>

Sí, la lógica permanece igual. Solo ajusta la path y el ID del contenedor.

</details>

<details>
<summary>¿Alguien más ha tenido un error similar?</summary>

Este patrón es frecuente en LXC sin privilegios: los dispositivos se mapean con `root:root` por defecto.

</details>

## Conclusión

Con el hook script y la corrección de permisos, Jellyfin transcodifica sin errores. Mantén este esquema en tu entorno Proxmox para evitar caídas inesperadas de la biblioteca de VAAPI.

¿Tienes dudas con la configuración? [Escríbeme](https://marcosramirez.dev/contacto/){:target="_blank"} o deja un comentario.

Compártelo si te ha gustado. ¡Y hasta aquí por hoy!
