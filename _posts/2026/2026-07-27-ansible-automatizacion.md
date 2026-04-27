---
title: "Ansible: Automatiza tu Home Lab de principio a fin"
slug: ansible-automatizacion
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-07-27 08:30:00 +0200
image: /assets/img/headers/2026/ansible-automatizacion-nanobanana.webp
categories: [Tecnología]
tags: [ansible, automatización, infraestructura, Sistemas, Software y Apps]
pin: false
toc: true
excerpt: "Ansible es una herramienta de automatización de código abierto que te permite gestionar todos tus servidores y contenedores desde un solo punto. Olvídate de actualizar cada servicio a mano."
twitter_description: "Instala Ansible y gestiona todo tu Home Lab desde un solo lugar."
permalink: /:slug/
---

*[Este post forma parte de la serie [Home Lab]({% post_url 2026-05-04-home-lab-filosofia %})]*

Llevo un tiempo acumulando servicios. Tengo [Home Assistant]({% post_url 2026-06-01-home-assistant-guia-domotica %}), [AdGuard]({% post_url 2026-05-18-adguard-home-bloqueador-publicidad %}), [Vaultwarden]({% post_url 2026-2026-07-13-vaultwarden-contraseñas-seguras %}), [N8N]({% post_url 2026-2026-04-27-n8n-automatizacion %}), [Immich]({% post_url 2026-2026-06-08-immich-privacidad-tus-fotos %}), [Firefly III]({% post_url 2026-2026-06-15-firefly-iii-finanzas %}), [Paperless NGX]({% post_url 2026-2026-06-29-paperless-ngx-documentos %}), [SearXNG]({% post_url 2026-2026-07-06-searxng-buscador-privado %}). Cada uno en su propio contenedor, actualizándose a su ritmo.

Y ahora imagínate: quieres actualizar el sistema operativo de todos tus contenedores. O instalar un certificado SSL en todos. O cambiar una configuración. ¿Entrar uno por uno? Ni hablar.

Ahí entra Ansible.

## Qué es Ansible

[Ansible](https://www.ansible.com/){:target="_blank" :rel="nofollow noopener"} es una herramienta de automatización de código abierto. Te permite definir el estado de tus máquinas en archivos YAML y luego Ansible se encarga de aplicar ese estado.

Lo mejor: no necesitas instalar nada en los servidores objetivo. Solo SSH.

### Por qué existe

Cuando tienes 3 o 4 servidores, actualizar uno a uno es asumible. Cuando tienes 10, 15, 20... se convierte en un caos. Ansible resuelve ese problema centralizando toda la automatización en un solo lugar.

## Características principales

### Sin agente

Ansible se conecta por SSH. No necesitas instalar nada en los servidores que gestionas. Solo el control node tiene Ansible instalado.

### Idempotente

Puedes ejecutar el mismo playbook varias veces y el resultado será el mismo. Si algo ya está configurado, Ansible no lo cambia. Si falta, lo instala.

### YAML

Los playbooks se escriben en YAML. Legible, fácil de aprender, fácil de mantener.

### Inventario

El inventario define qué máquinas gestionas. Puedes organizarlas en grupos:

```yaml
all:
  children:
    servers:
      hosts:
        proxmox:
          ansible_host: 192.168.1.10
          ansible_user: admin
        nas:
          ansible_host: 192.168.1.50
          ansible_user: admin
    containers:
      hosts:
        homeassistant:
          ansible_host: 192.168.1.20
        adguard:
          ansible_host: 192.168.1.21
```

### Módulos

Ansible tiene cientos de módulos para casi todo:

- `apt`: gestionar paquetes
- `systemd`: gestionar servicios
- `file`: gestionar archivos
- `shell`: ejecutar comandos
- `docker_container`: gestionar contenedores
- `copy`: copiar archivos
- `template`: plantillas con variables

### Comandos básicos

```bash
# Ejecutar un comando en todos los hosts
ansible all -m ping

# Ejecutar un playbook
ansible-playbook site.yml

# Ejecutar solo en un grupo
ansible-playbook update.yml --tags security

# Ejecutar en un host específico
ansible-playbook site.yml --limit nas

# Ver diferencias antes de aplicar
ansible-playbook site.yml --check --diff
```

### Playbooks

Un playbook define las tareas a ejecutar:

```yaml
---
- name: Actualizar todos los servidores
  hosts: all
  become: yes
  tasks:
    - name: Actualizar lista de paquetes
      apt:
        update_cache: yes

    - name: Actualizar paquetes
      apt:
        upgrade: yes

    - name: Reiniciar si es necesario
      reboot:
      when: ansible_facts['needs_reboot']
```

### Roles

Los roles organizan tus playbooks en partes reutilizables:

```
roles/
  common/
    tasks/
    handlers/
    templates/
  docker/
    tasks/
    defaults/
  backup/
    tasks/
```

## Comparativa con alternativas

| Característica | Ansible | Puppet | Chef | SaltStack | Terraform |
|----------------|:-------:|:------:|:---:|:--------:|:---------:|
| **Precio** | Gratis | 100-150 $/año | 142 $/nodo | 150 $/año | 20 $/mes |
| **Código abierto** | Sí | Parcial | Parcial | Parcial | Parcial |
| **Tipo** | Configuración | Configuración | Configuración | Configuración | Provisioning |
| **Agente** | No | Sí | Sí | Sí | No |
| **Curva aprendizaje** | Baja | Alta | Alta | Media | Baja |
| **Uso en Home Lab** | Ideal | Excesivo | Excesivo | Medio | Bueno |

### Puppet

[Puppet](https://puppet.com/){:target="_blank" :rel="nofollow noopener"} es potente pero requiere un servidor central (Puppet Master) y agente en cada nodo. Excesivo para un Home Lab.

### Chef

[Chef](https://www.chef.io/){:target="_blank" :rel="nofollow noopener"} requiere Ruby y agentes. Demasiado complejo para lo que necesitas.

### SaltStack

[SaltStack](https://www.saltproject.io/){:target="_blank" :rel="nofollow noopener"} es bueno pero tiene curva de aprendizaje. Requiere agente.

### Terraform

[Terraform](https://www.terraform.io/){:target="_blank" :rel="nofollow noopener"} es para provisioning, no para configuración. Sirve para crear máquinas, no para configurarlas después. Se complementa con Ansible.

## Por qué elegí Ansible

### Sin agentes

No tengo que instalar nada en mis contenedores. Solo SSH. Y mis LXCs ya tienen SSH.

### YAML

Legible y fácil de mantener. Mi mujer puede entender un playbook sin saber programación.

### Inventario flexible

Puedo agrupar mis máquinas como quiera: por función, por entorno, por servidor padre.

### Comunidad enorme

Hay playbooks y roles para casi todo. No tienes que escribir todo desde cero.

### Gratis

No hay versión de pago para lo básico. Todo lo que necesitas está en la versión open source.

## Ejemplo real: actualizar todos los contenedores

```bash
# Actualizar un grupo específico
ansible-playbook -i inventory.yml update-containers.yml --limit containers
```

Playbook de ejemplo:

```yaml
---
- name: Actualizar contenedores Docker
  hosts: containers
  become: yes
  tasks:
    - name: Actualizar contenedores
      docker_container:
        name: "{{ item.name }}"
        image: "{{ item.image }}"
        state: started
        restart: yes
      loop:
        - { name: homeassistant, image: homeassistant/home-assistant:stable }
        - { name: adguard, image: adguard/adguardhome:latest }
        - { name: vaultwarden, image: vaultwarden/server:latest }
```

## Instalación

### En el control node

```bash
# En Debian/Ubuntu
sudo apt update
sudo apt install ansible

# O con pip
pip install ansible
```

### Configuración básica

1. Crea tu directorio de proyecto
2. Define tu inventario
3. Escribe tus playbooks
4. Ejecuta

```bash
mkdir ~/homelab-ansible
cd ~/homelab-ansible
ansible-init
```

## Cuándo elegir qué

### Elige Ansible si:

- Quieres gestionar configuración de servidores
- Necesitas actualizar muchos sistemas a la vez
- No quieres instalar agentes
- Prefieres YAML

### Elige Terraform si:

- Solo necesitas crear infraestructura
- Quieres gestionar infraestructura como código

### Elige Puppet/Chef si:

- Tienes una empresa grande
- Necesitas cumplimiento strict

***

Compártelo si te ha gustado.

¿Tienes dudas sobre Ansible o la instalación? [Escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y lo debatimos.

Y... hasta aquí por hoy!