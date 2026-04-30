---
title: "Comandos básicos de Proxmox: gestión de LXC y VMs vía CLI"
slug: comandos-basicos-proxmox
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-05-13 08:30:00 +0200
image: /assets/img/headers/comandos-basicos-proxmox-nanobanana.webp
image_alt: "Terminal de Linux mostrando comandos pct y qm de Proxmox para gestión de contenedores y máquinas virtuales"
categories: [Tecnología, Sistemas, Redes e Infraestructura]
tags: [cli, pct, qm, lxc, qemu, virtualizacion, homelab]
pin: false
toc: true
excerpt: "Aprende a usar los comandos pct y qm para gestionar contenedores LXC y máquinas virtuales en Proxmox desde la línea de comandos. Esta guía completa cubre la creación de contenedores y VMs, gestión de plantillas, configuración de red e IPs estáticas, modificación de recursos como CPU y memoria, redimensionamiento de discos con advertencias importantes, montaje de directorios con bind mounts y virtio-fs, y comandos del sistema como backups con vzdump. Incluye una comparativa de comandos pct vs qm, consejos prácticos con rangos de IPs para organizar tu Home Lab, y soluciones a problemas comunes como los que afectaron a mi instalación de Jellyfin con NFS."
twitter_description: "Domina los comandos pct y qm de Proxmox: gestión completa de LXC y VMs vía CLI para tu Home Lab."
description: "Aprende a usar pct y qm en Proxmox. Comandos para gestionar LXC, VMs, red, discos y bind mounts vía CLI en tu infraestructura de virtualización."
permalink: /:slug/
---

![{{ page.image_alt }}]({{ page.image }})

Como comenté en mi [post sobre por qué elegí Proxmox]({% post_url 2026/2026-05-11-mi-decision-de-usar-proxmox %}), prefiero gestionar mi infraestructura vía CLI en lugar de depender de la interfaz web. En este post te comparto los comandos esenciales que uso día a día en mi [Proxmox VE](https://www.proxmox.com/){:target="_blank" rel="nofollow noopener"}.

## Gestión de contenedores LXC con `pct`

El comando `pct` es la herramienta nativa para gestionar contenedores LXC en Proxmox.

### Listar contenedores

```bash
pct list
```

Muestra todos los contenedores con su ID, estado, nombre y dirección IP.

### Gestionar plantillas LXC

Las plantillas (templates) son las imágenes base para crear contenedores LXC. [Proxmox VE](https://www.proxmox.com/){:target="_blank" rel="nofollow noopener"} usa el comando `pveam` (Proxmox VE Appliance Manager) para gestionar el catálogo de plantillas.

#### Listar plantillas disponibles

Muestra las plantillas descargadas en un almacenamiento específico:

```bash
pveam list local
pveam list local-lvm
```

#### Actualizar catálogo de plantillas

Descarga la lista más reciente de plantillas disponibles desde los repositorios de Proxmox:

```bash
pveam update
```

#### Descargar nuevas plantillas

Descarga una plantilla concreta a un almacenamiento:

```bash
pveam download local debian-12-standard_12.0-1_amd64.tar.zst
pveam download local ubuntu-22.04-standard_22.04-1_amd64.tar.zst
```

#### Ver plantillas descargadas

Las plantillas se guardan en `/var/lib/vz/template/cache/`:

```bash
ls -lh /var/lib/vz/template/cache/
```

### Crear un contenedor LXC

```bash
pct create 100 \
  --template local:vztmpl/debian-12-standard_12.0-1_amd64.tar.zst \
  --storage local-lvm \
  --hostname servidor-web \
  --cores 2 \
  --memory 2048 \
  --swap 512 \
  --rootfs local-lvm:8 \
  --net0 name=eth0,bridge=vmbr0,ip=192.168.1.100/24,gw=192.168.1.1
```

### Iniciar y detener contenedores

```bash
pct start 100
pct stop 100
pct shutdown 100
```

### Entrar en un contenedor

```bash
pct enter 100
```

Equivalente a `lxc-attach`, te da acceso directo al shell del contenedor.

### Clonar un contenedor

```bash
pct clone 100 101 --hostname servidor-web-copia
```

### Eliminar un contenedor

```bash
pct stop 100
pct destroy 100
```

### Configuración y snapshots

```bash
pct config 100
pct snapshot 100 pre-actualizacion
pct delsnapshot 100 pre-actualizacion
pct listsnapshot 100
```

### Modificar recursos de LXC

Ajusta CPU, memoria, swap o almacenamiento de un contenedor existente (algunos cambios requieren reiniciar el LXC):

```bash
# Modificar número de cores (requiere reinicio)
pct set 100 --cores 4

# Modificar memoria RAM (en MB, requiere reinicio)
pct set 100 --memory 4096

# Modificar swap (en MB, requiere reinicio)
pct set 100 --swap 1024

# Redimensionar el disco raíz (rootfs, requiere parar el LXC)
pct stop 100
pct resize 100 rootfs 16G
pct start 100
```

⚠️ **Advertencias al redimensionar discos**:

- **Aumentar disco**: Generalmente seguro, pero verifica que el almacenamiento (LVM, ZFS, etc.) tenga espacio suficiente. [Proxmox VE](https://www.proxmox.com/){:target="_blank" rel="nofollow noopener"} hace `resize2fs` automáticamente si el sistema de archivos lo soporta.

- **Reducir disco**: **Peligroso**. Nunca reduzcas el disco por debajo del espacio usado. Siempre verifica primero:
  ```bash
  pct exec 100 -- df -h /
  ```
  Si el disco está casi lleno, la reducción corromperá el sistema de archivos. Reduce primero el contenido dentro del LXC, luego haz shrink del filesystem manualmente antes de usar `pct resize`.

- **Problemas con LVM**: Como conté en mi [post de Jellyfin]({% post_url 2026/2026-04-23-jellyfin-cortes-4k-disco %}), intenté usar `lvreduce`/`lvextend` manualmente y no fui capaz. La interfaz web de Proxmox hace el `resize2fs` automáticamente y es más fiable. Si usas CLI, asegúrate de ejecutar `e2fsck` y `resize2fs` manualmente antes de tocar el LV.

### Reiniciar un contenedor LXC

```bash
pct reboot 100
```

### Asignar o modificar IP y puerta de enlace

```bash
pct set 100 --net0 name=eth0,bridge=vmbr0,ip=192.168.1.100/24,gw=192.168.1.1
```

Para aplicar los cambios de red, reinicia el contenedor:
```bash
pct reboot 100
```

### Configurar DNS

```bash
pct set 100 --nameserver 8.8.8.8 --searchdomain local
```

También puedes editar el archivo de DNS dentro del contenedor:
```bash
pct enter 100
nano /etc/resolv.conf
```

### Ejecutar comandos en LXC sin entrar

```bash
pct exec 100 -- apt update && apt upgrade -y
pct exec 100 -- systemctl status nginx
```

El comando `pct exec` ejecuta el comando dentro del contenedor y devuelve la salida sin necesidad de abrir un shell interactivo.

### Montar discos y directorios con bind mount

Para compartir discos o directorios del host Proxmox con un LXC, usamos bind mounts. Esta opción es preferible a NFS para evitar problemas con inotify, como el que afectó a mi instalación de Jellyfin (detallado en [este post]({% post_url 2026/2026-04-23-jellyfin-cortes-4k-disco %})).

⚠️ **Nota personal**: Tuve problemas con montajes NFS en uno de mis discos, donde inotify no propagaba eventos de archivos nuevos, lo que impedía que Jellyfin detectara contenido automáticamente (como conté en el post enlazado). Si usas NFS como origen, ten en cuenta esta limitación de sistemas de archivos de red.

#### Añadir un bind mount

Detén el LXC antes de modificar los montajes para evitar problemas de consistencia:

```bash
pct stop 100
```

Añade el bind mount con `pct set`. Primero asegúrate de que la ruta en el host Proxmox esté montada y accesible:

```bash
# Ejemplo: montar un disco en el host primero
mkdir -p /mnt/discos/media
mount /dev/sdb1 /mnt/discos/media
```

Luego configura el bind mount al LXC:

```bash
pct set 100 \
  --mp0 /mnt/discos/media,mp=/mnt/media,ro=0 \
  --mp1 /mnt/discos/backups,mp=/mnt/backups,ro=1
```

- `mp0`, `mp1`: Identificadores únicos de los puntos de montaje (puedes añadir tantos como necesites)
- `/mnt/discos/media`: Ruta absoluta en el host Proxmox (debe existir y estar montada)
- `mp=/mnt/media`: Ruta dentro del LXC donde se montará el directorio
- `ro=0`: Modo lectura-escritura (`1` para solo lectura)

Arranca el LXC tras aplicar los cambios:

```bash
pct start 100
```

#### Gestionar bind mounts existentes

Para listar todos los bind mounts de un LXC:

```bash
pct config 100 | grep ^mp
```

Para eliminar un bind mount (detén el LXC primero):

```bash
pct stop 100
pct set 100 --delete mp0
pct start 100
```

## Gestión de máquinas virtuales con `qm`

El comando `qm` gestiona las VMs de Proxmox ([QEMU/KVM](https://www.qemu.org/){:target="_blank" rel="nofollow noopener"}).

### Listar máquinas virtuales

```bash
qm list
```

### Crear una VM

```bash
qm create 200 \
  --name servidor-linux \
  --cores 4 \
  --memory 4096 \
  --net0 virtio,bridge=vmbr0 \
  --scsi0 local-lvm:32 \
  --ide2 local:iso/ubuntu-22.04.iso,media=cdrom \
  --boot order=ide2,scsi0 \
  --serial0 socket
```

### Iniciar y detener VMs

```bash
qm start 200
qm stop 200
qm shutdown 200
qm reset 200
```

### Entrar en una VM vía console

```bash
qm terminal 200
```

O usando VNC:

```bash
qm vncproxy 200
```

### Clonar una VM

```bash
qm clone 200 201 --name servidor-linux-copia --full
```

### Snapshots en VMs

```bash
qm snapshot 200 antes-cambios
qm rollback 200 antes-cambios
qm delsnapshot 200 antes-cambios
```

### Configuración de una VM

```bash
qm config 200
qm set 200 --memory 8192
qm set 200 --cores 6
```

### Modificar recursos de VMs

Para VMs, los cambios de CPU y memoria se aplican modificando la configuración. Algunos requieren apagar la VM:

```bash
# Modificar número de cores (requiere apagar la VM)
qm stop 200
qm set 200 --cores 8
qm start 200

# Modificar memoria RAM (requiere apagar la VM si no usa hotplug)
qm set 200 --memory 8192

# Añadir o ampliar disco SCSI/SATA
qm set 200 --scsi1 local-lvm:32

# Redimensionar un disco existente (requiere que la VM esté apagada)
qm stop 200
qm resize 200 scsi0 +16G
qm start 200
```

⚠️ **Advertencias al redimensionar discos de VMs**:

- **Aumentar disco**: Después de ampliar el disco por CLI, debes entrar en la VM y extender el sistema de archivos manualmente (ej. `fdisk`/`parted` + `resize2fs` en Linux, o "Extender volumen" en Windows Disk Management).

- **Reducir disco**: **Muy arriesgado**. Haz backup antes. Reduce primero el sistema de archivos dentro de la VM, luego apaga la VM y usa `qm resize` con valor menor. Si te equivocas, corromperás la VM.

- **Hotplug**: Si tienes configurado CPU/Memory hotplug en la VM, algunos cambios se aplican sin apagar, pero no todos los sistemas operativos lo soportan bien.

### Montar discos en VMs (virtio-fs)

A diferencia de LXC (bind mount), las VMs no pueden acceder directamente a carpetas del host. La forma moderna y eficiente es usar **virtio-fs**:

```bash
# Añadir un directorio compartido via virtio-fs
qm set 200 --virtiofs0 /mnt/discos/media,tag=media
```

Dentro de la VM Linux, monta el recurso compartido:

```bash
mkdir -p /mnt/media
mount -t virtiofs media /mnt/media
```

Para montaje persistente en la VM, añade a `/etc/fstab`:

```
media /mnt/media virtiofs defaults 0 0
```

⚠️ **Nota**: virtio-fs requiere un kernel Linux relativamente moderno (4.19+) y soporte en QEMU. Para Windows, usa recursos compartidos de red (SMB/CIFS) en su lugar.

## Comandos del sistema Proxmox

### Estado del cluster y nodos

```bash
pvecm status
pvecm nodes
```

### Actualizar Proxmox

```bash
apt update && apt dist-upgrade -y
```

### Reiniciar servicios

```bash
systemctl restart pvedaemon
systemctl restart pve-cluster
systemctl status pveproxy
```

### Gestión de almacenamiento

```bash
pvesm status
pvesm list local-lvm
```

### Backups con `vzdump`

```bash
vzdump 100 --compress zstd --storage local --mode snapshot
vzdump 200 --compress zstd --storage local --mode stop
```

## Mi flujo de trabajo habitual

1. **Crear contenedor**: `pct create` con los recursos necesarios
2. **Configurar red**: Asignar IP estática en la creación o con `pct set`
3. **Entrar y configurar**: `pct enter` para instalar servicios
4. **Snapshot antes de cambios**: `pct snapshot` antes de actualizaciones
5. **Backup periódico**: `vzdump` programado

## Comparativa rápida: pct vs qm

| Acción | LXC (`pct`) | VM (`qm`) |
|--------|------------|-----------|
| Listar | `pct list` | `qm list` |
| Crear | `pct create` | `qm create` |
| Iniciar | `pct start` | `qm start` |
| Entrar | `pct enter` | `qm terminal` |
| Snapshot | `pct snapshot` | `qm snapshot` |
| Config | `pct config` | `qm config` |
| Redimensionar disco | `pct resize` | `qm resize` |

## Consejos prácticos

- **IDs únicos**: Usa rangos (100-199 para LXC, 200+ para VMs) para organizar mejor
- **Nombres descriptivos**: `--hostname` claro para identificar el servicio
- **Snapshots antes de tocar**: Siempre `snapshot` antes de actualizaciones importantes
- **IPs estáticas con rangos**: Asígnalas en la creación para evitar conflictos DHCP. Yo uso rangos de 10 IPs por tipo de dispositivo:
  - `192.168.1.0-9`: Hardware de red (router, switches, AP)
  - `192.168.1.10-19`: Nodos Proxmox
  - `192.168.1.20-29`: Reservado para expansión
  - `192.168.1.30-39`: Workers con scripts personalizados
  - `192.168.1.40-49`: Bases de datos
  - `192.168.1.50-59`: Aplicaciones de red (ej. **AdGuard Home en .53** porque el puerto DNS es 53, fácil de recordar)
  - `192.168.1.60-69`: Servidores web y proxies
  - `192.168.1.70-79`: Media servers (Jellyfin, Plex, etc.)
  - `192.168.1.80+`: VMs varias
  
  Encuentra un método que te funcione y mantenlo consistente.
- **Backups regulares**: Automatiza `vzdump` con el cron del sistema

## FAQ

> **1. ¿Puedo usar pct y qm desde otro equipo?**
> Sí, puedes usar SSH para conectarte al nodo de Proxmox y ejecutar los comandos remotamente.

> **2. ¿Los snapshots consumen mucho espacio?**
> Los snapshots LXC son ligeros (copy-on-write), pero las VMs pueden consumir más dependiendo del modo de snapshot.

> **3. ¿Qué pasa si olvido el ID de un contenedor?**
> Usa `pct list` para ver todos con su ID, nombre y estado.

> **4. ¿Cómo puedo montar un disco NFS en lugar de bind mount?**
> Aunque es posible, no lo recomiendo para servicios que necesiten detectar archivos nuevos automáticamente (como Jellyfin) porque NFS no propaga eventos inotify. Usa bind mount directo del host.

***

Compártelo si te ha resultado útil.

¿Gestionas tu infraestructura de virtualización con Proxmox? ¿Qué otros comandos usas habitualmente? Deja un comentario o [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo charlamos.

Y... hasta aquí por hoy!
