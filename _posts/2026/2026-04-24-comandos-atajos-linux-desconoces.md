---
title: "Comandos y Atajos de Teclado en GNU/Linux que Posiblemente Desconoces"
date: 2026-04-24 09:00:00 +0200
excerpt: "Descubre los comandos y atajos de teclado del terminal GNU/Linux que tearán más productivo. Desde tail -F hasta Ctrl+R, pasando por alias útiles como mkcd y dónde configurarlos."
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
tags: [linux, terminal, comandos, atajos, productividad]
image: /assets/img/headers/2026/comandos-atajos-linux-desconoces-nanobanana.webp
image_alt: "Terminal de Linux con comandos y atajos de teclado"
image_alt: "Terminal de Linux con código en pantalla, mostrando atajos de teclado, estilo hacker"
pin: false
toc: true
twitter_description: "Descubre los alias más útiles para tu terminal: mkcd, mkcp, mkmv y más. Aprende a configurarlos para todos los usuarios."
permalink: /:slug/
slug: comandos-atajos-linux-desconoces
---

![Post Header]({{ page.image }})

Si llevas tiempo trabajando con GNU/Linux, probablemente conoces los comandos básicos: `ls`, `cd`, `mkdir`, `grep`. Pero el terminal guarda secretos que pueden transformar tu flujo de trabajo. En este post te cuento los comandos y atajos que más me han sorprendido y que uso a diario.

## Atajos de Teclado

El shell Bash (y la mayoría de shells compatibles) usa la librería Readline, que proporciona atajos de edición poderosos. Aquí van los más útiles que quizás no conoces:

### Navegación Rápida

| Atajo | Acción |
|-------|--------|
| `Ctrl+A` | Ir al principio de la línea |
| `Ctrl+E` | Ir al final de la línea |
| `Alt+B` | Retroceder una palabra |
| `Alt+F` | Avanzar una palabra |
| `Ctrl+XX` | Alternar entre posición actual e inicio de línea |
| `Ctrl+L` | Limpiar la pantalla (equivalente a `clear`) |

### Edición de Texto

| Atajo | Acción |
|-------|--------|
| `Ctrl+K` | Borrar desde cursor hasta final de línea |
| `Ctrl+U` | Borrar desde cursor hasta inicio de línea |
| `Ctrl+W` | Borrar la palabra anterior |
| `Alt+D` | Borrar la palabra siguiente |
| `Ctrl+Y` | Pegar lo último borrado (yank) |
| `Ctrl+T` | Intercambiar carácter actual con el anterior |
| `Alt+T` | Intercambiar palabra actual con la anterior |
| `Alt+U` | Convertir palabra a mayúsculas |
| `Alt+L` | Convertir palabra a minúsculas |

### Búsqueda en Historia

Este es el que más uso:

- `Ctrl+R`: Buscar inversamente en el historial. Pulsa repetidamente para navegar entre resultados.
- `Ctrl+G`: Cancelar la búsqueda.
- `Alt+.` (o `Esc`+.): Insertar el último argumento del comando anterior.

**Ejemplo práctico:**

Instalar y crear un directorio:
```bash
mkdir -p projects/my-new-project/src
```

Navegar al directorio creado (usar Alt+. para completar automáticamente):
```bash
cd projects/my-new-project/src
```

Pulsar Alt+. para insertar automáticamente el último argumento:
```bash
Alt+.
```

### Trucos con el Historial

El historial de Bash es más potente de lo que parece:

Ejecutar el último comando (equivalente a ↑ + Enter):
```bash
!!
```

Ejecutar el último argumento del comando anterior:
```bash
cd !$
```

Ejecutar el primer argumento del comando anterior:
```bash
ls -la !^
```

Ejecutar el último comando que empezó por "git":
```bash
!git
```

Reemplazar "old" por "new" en el último comando:
```bash
^python^python3
```

### Personalizar atajos con .inputrc

También puedes configurar tu `.inputrc` para aún más atajos. Por ejemplo, para buscar con las flechas:

Buscar hacia atrás:
```bash
"\e[A": history-search-backward
```

Buscar hacia adelante:
```bash
"\e[B": history-search-forward
```

Con esto, al escribir el principio de un comando y pulsar ↑, solo mostrará comandos que empiezan por eso.

## Comandos

Estos comandos no son tan populares pero son tremendamente útiles:

### tail -F

Uno de los comandos más útiles para monitorizar logs es `tail`, pero ¿sabes cuándo usar cada bandera?

Seguir archivo mediante descriptor (si se rota, deja de seguir):
```bash
tail -f /var/log/syslog
```

Seguir nombre del archivo (reabre si se rota o recrea):
```bash
tail -F /var/log/syslog
```

La diferencia es sutil pero importante:
- `tail -f` sigue el **descriptor de archivo**. Si el log se rota (como hacen logrotate), deja de seguir el nuevo archivo.
- `tail -F` sigue el **nombre del archivo**. Si el log se rota o se recrea, sigue mostrando el contenido.

**Mi recomendación:** Usa siempre `tail -F` para monitorizar logs en producción. Te evitarás sorpresas cuando el sistema rote los archivos.

### ncdu

`ncdu` ([https://dev.yorhel.nl/ncdu](https://dev.yorhel.nl/ncdu){:target="_blank" rel="nofollow noopener"}) es un analizador de uso de disco con interfaz ncurses. Te permite navegar visualmente por los directorios y ver cuál consume más espacio. Es perfecto cuando necesitas encontrar ese directorio que está ocupando demasiado espacio y no sabes dónde está.

Instalar en Debian/Ubuntu:
```bash
sudo apt install ncdu
```

Instalar en Arch Linux:
```bash
sudo pacman -S ncdu
```

Instalar en Fedora/RHEL:
```bash
sudo dnf install ncdu
```

Instalar en openSUSE:
```bash
sudo zypper install ncdu
```

Ejecutar en el directorio actual:
```bash
ncdu
```

Analizar un directorio específico:
```bash
ncdu /var/log
```

### btop

`btop` ([https://github.com/aristocratos/btop](https://github.com/aristocratos/btop){:target="_blank" rel="nofollow noopener"}) es el sucesor moderno de `bashtop` y `bpytop`. Muestra CPU, memoria, red, discos y procesos en una interfaz visual bonita con gráficos. Es mucho más completo que `top` y más moderno que `htop`. Soporta mouse, atajos de teclado y temas personalizables.

Instalar en Debian/Ubuntu:
```bash
sudo apt install btop
```

Instalar en Arch Linux:
```bash
sudo pacman -S btop
```

Instalar en Fedora/RHEL:
```bash
sudo dnf install btop
```

Instalar en openSUSE:
```bash
sudo zypper install btop
```

Ejecutar:
```bash
btop
```

**Atajos principales:**
- `q` - Salir
- `h`/`?` - Ver ayuda
- `1-4` - Cambiar entre CPU/Mem/Net/Procesos
- `e` - Vista de árbol de procesos
- `f` - Filtrar procesos

### mtr

`mtr` ([https://www.bitwizard.nl/mtr/](https://www.bitwizard.nl/mtr/){:target="_blank" rel="nofollow noopener"}) combina `traceroute` y `ping` en una sola herramienta que muestra la ruta y la latencia de cada salto. Mucho más útil que cualquiera de los dos por separado.

Instalar en Debian/Ubuntu:
```bash
sudo apt install mtr
```

Instalar en Arch Linux:
```bash
sudo pacman -S mtr
```

Instalar en Fedora/RHEL:
```bash
sudo dnf install mtr
```

Instalar en openSUSE:
```bash
sudo zypper install mtr
```

Ejecutar:
```bash
mtr google.com
```

### tree

`tree` muestra la estructura de directorios en forma de árbol.

Instalar en Debian/Ubuntu:
```bash
sudo apt install tree
```

Instalar en Arch Linux:
```bash
sudo pacman -S tree
```

Instalar en Fedora/RHEL:
```bash
sudo dnf install tree
```

Instalar en openSUSE:
```bash
sudo zypper install tree
```

Ver solo 2 niveles de profundidad:
```bash
tree -L 2
```

Incluir archivos ocultos:
```bash
tree -a
```

Excluir patrones:
```bash
tree -I 'node_modules|.git'
```

### shuf

`shuf` es un comando básico de GNU coreutils, viene preinstalado en la mayoría de distribuciones.

Obtener una línea aleatoria de un archivo:
```bash
shuf -n 1 archivo.txt
```

Barajar un playlist:
```bash
shuf lista.txt
```

### nl

`nl` es un comando básico de GNU coreutils, viene preinstalado en la mayoría de distribuciones.

Numerar todas las líneas:
```bash
nl archivo.txt
```

Numerar solo líneas no vacías:
```bash
nl -ba archivo.txt
```

### ss

[ss](https://linux.die.net/man/8/ss){:target="_blank" rel="nofollow noopener"} es el reemplazo moderno de `netstat` para ver sockets y conexiones. Viene preinstalado en la mayoría de distribuciones modernas (incluido en el paquete `iproute2`).

Ver puertos escuchando:
```bash
ss -tuln
```

Ver conexiones establecidas:
```bash
ss -tn
```

### fzf

`fzf` ([https://github.com/junegunn/fzf](https://github.com/junegunn/fzf){:target="_blank" rel="nofollow noopener"}) es un buscador fuzzy universal para la terminal. Puedes usarlo para buscar archivos, historial de comandos, procesos, o cualquier cosa que piping a él. Cuando lo pruebas, no puedes vivir sin él.

Instalar en Debian/Ubuntu:
```bash
sudo apt install fzf
```

Instalar en Arch Linux:
```bash
sudo pacman -S fzf
```

Instalar en Fedora/RHEL:
```bash
sudo dnf install fzf
```

Instalar en openSUSE:
```bash
sudo zypper install fzf
```

Lanzar buscador interactivo:
```bash
fzf
```

Buscar archivos:
```bash
find . -name "*.md" | fzf
```

**Integraciones útiles:**
- `Ctrl+T` - Buscar archivos para insertar en la línea de comandos
- `Ctrl+R` - Buscar en el historial (mejora `Ctrl+R` nativo)
- `Alt+C` - Cambiar a un directorio

### bat

`bat` ([https://github.com/sharkdp/bat](https://github.com/sharkdp/bat){:target="_blank" rel="nofollow noopener"}) es un reemplazo moderno de `cat` con resaltado de sintaxis, números de línea y git integration. Mucho más agradable a la vista que el simple `cat`.

Instalar en Debian/Ubuntu:
```bash
sudo apt install bat
```

Instalar en Arch Linux:
```bash
sudo pacman -S bat
```

Instalar en Fedora/RHEL:
```bash
sudo dnf install bat
```

Instalar en openSUSE:
```bash
sudo zypper install bat
```

Ver archivo con resaltado de sintaxis:
```bash
bat archivo.py
```

Mostrar números de línea:
```bash
bat -n archivo.md
```

Listar themes disponibles:
```bash
bat --list-themes
```

### ripgrep

`ripgrep` ([https://github.com/BurntSushi/ripgrep](https://github.com/BurntSushi/ripgrep){:target="_blank" rel="nofollow noopener"}) (rg) es mucho más rápido que `grep` y por defecto ya ignora archivos `.gitignore`, `node_modules` y binarios. Es el estándar de facto para buscar en código.

Instalar en Debian/Ubuntu:
```bash
sudo apt install ripgrep
```

Instalar en Arch Linux:
```bash
sudo pacman -S ripgrep
```

Instalar en Fedora/RHEL:
```bash
sudo dnf install ripgrep
```

Instalar en openSUSE:
```bash
sudo zypper install ripgrep
```

Buscar recursivamente:
```bash
rg "pattern" .
```

Buscar solo en archivos Python:
```bash
rg "function" -t py
```

Ignorar node_modules y .git:
```bash
rg "TODO" --ignore-case --glob '!node_modules/*'
```

### fd

`fd` ([https://github.com/sharkdp/fd](https://github.com/sharkdp/fd){:target="_blank" rel="nofollow noopener"}) es un reemplazo de `find` más rápido y con sintaxis más simple. Por defecto ignora `.gitignore` y tiene salida coloreada.

Instalar en Debian/Ubuntu:
```bash
sudo apt install fd-find
```

Instalar en Arch Linux:
```bash
sudo pacman -S fd
```

Instalar en Fedora/RHEL:
```bash
sudo dnf install fd
```

Instalar en openSUSE:
```bash
sudo zypper install fd
```

Buscar archivos por nombre:
```bash
fd "config" .
```

Buscar con extensión específica:
```bash
fd -e md .
```

Buscar directorios:
```bash
fd -t d .
```

Ignorar patrones:
```bash
fd -I -E 'node_modules' -E '.git' .
```

### tldr

`tldr` ([https://tldr.sh/](https://tldr.sh/){:target="_blank" rel="nofollow noopener"}) te da ejemplos prácticos y concretos de comandos, mucho más útil que las páginas de `man` cuando necesitas algo rápido. Ideal para comandos que no usas frecuentemente.

Instalar en Debian/Ubuntu:
```bash
sudo apt install tldr
```

Instalar en Arch Linux:
```bash
sudo pacman -S tldr
```

Instalar en Fedora/RHEL:
```bash
sudo dnf install tldr
```

Instalar en openSUSE:
```bash
sudo zypper install tldr
```

Ver ejemplo rápido de tar:
```bash
tldr tar
```

Ver ejemplo rápido de rsync:
```bash
tldr rsync
```

Ver ejemplo rápido de docker:
```bash
tldr docker
```

### duf

`duf` ([https://github.com/muesli/duf](https://github.com/muesli/duf){:target="_blank" rel="nofollow noopener"}) es un reemplazo moderno de `df` con una interfaz bonita que muestra el uso de discos de forma clara y colorida.

Instalar en Debian/Ubuntu:
```bash
sudo apt install duf
```

Instalar en Arch Linux:
```bash
sudo pacman -S duf
```

Instalar en Fedora/RHEL:
```bash
sudo dnf install duf
```

Instalar en openSUSE:
```bash
sudo zypper install duf
```

Ver uso de discos:
```bash
duf
```

### zoxide

[zoxide](https://github.com/ajeetdsouza/zoxide){:target="_blank" rel="nofollow noopener"} es un reemplazo inteligente de `cd` que aprende de tus hábitos de navegación. Mantiene un registro de los directorios que más usas y te permite saltar a ellos con solo escribir parte del nombre.

Instalar en Debian/Ubuntu:
```bash
sudo apt install zoxide
```

Instalar en Arch Linux:
```bash
sudo pacman -S zoxide
```

Instalar en Fedora/RHEL:
```bash
sudo dnf install zoxide
```

Instalar en openSUSE:
```bash
sudo zypper install zoxide
```

Añadir al shell (añadir al final de ~/.bashrc o ~/.zshrc):
```bash
eval "$(zoxide init bash)"
```

Usar (en lugar de cd):
```bash
z Descargas
```

Usar con fzf interactivo:
```bash
zoxide query --interactive
```

**¿Por qué usar zoxide?**
- No tienes que escribir rutas completas
- Aprende de tus directorios más visitados
- Compatible con todos los shells

### Alias Útiles

Estos alias y funciones pueden hacer tu vida mucho más fácil. Añádelos a tu `~/.bashrc` o `~/.zshrc`:

** mkcd - Crear y entrar a un directorio:**

```bash
mkcd() {
  mkdir -p "$1" && cd "$1"
}
```

Usar:
```bash
mkcd nuevo-proyecto
```

**Crear y entrar al directorio con padres:**

```bash
mkcdp() {
  mkdir -p "$1" && cd "$1"
}
```

**Crear un directorio y copiar un archivo:**

```bash
mkcp() {
  mkdir -p "$2" && cp -r "$1" "$2"
}
```

**Crear un directorio y mover un archivo:**

```bash
mkmv() {
  mkdir -p "$2" && mv "$1" "$2"
}
```

**Extraer cualquier archivo:**

```bash
extract() {
  if [ -f "$1" ]; then
    case "$1" in
      *.tar.bz2) tar xjf "$1" ;;
      *.tar.gz) tar xzf "$1" ;;
      *.bz2) bunzip2 "$1" ;;
      *.gz) gunzip "$1" ;;
      *.tar) tar xf "$1" ;;
      *.tbz2) tar xjf "$1" ;;
      *.tgz) tar xzf "$1" ;;
      *.zip) unzip "$1" ;;
      *.rar) unrar x "$1" ;;
      *) echo "No puedo extraer: $1" ;;
    esac
  else
    echo "$1 no es un archivo válido"
  fi
}
```

Usar:
```bash
extract archivo.zip
```

### Dónde Añadir los Alias

Según el shell y el usuario, el archivo de configuración varía. Para que los alias estén disponibles para todos los usuarios del sistema, lo mejor es añadirlos en `/etc/profile.d/`:

**Para Bash - Todos los usuarios:**

Crear el archivo global:
```bash
sudo nano /etc/profile.d/aliases.sh
```

Añadir los alias:
```bash
mkcd() {
  mkdir -p "$1" && cd "$1"
}

mkcdp() {
  mkdir -p "$1" && cd "$1"
}

mkcp() {
  mkdir -p "$2" && cp -r "$1" "$2"
}

mkmv() {
  mkdir -p "$2" && mv "$1" "$2"
}

extract() {
  if [ -f "$1" ]; then
    case "$1" in
      *.tar.bz2) tar xjf "$1" ;;
      *.tar.gz) tar xzf "$1" ;;
      *.bz2) bunzip2 "$1" ;;
      *.gz) gunzip "$1" ;;
      *.tar) tar xf "$1" ;;
      *.tbz2) tar xjf "$1" ;;
      *.tgz) tar xzf "$1" ;;
      *.zip) unzip "$1" ;;
      *.rar) unrar x "$1" ;;
      *) echo "No puedo extraer: $1" ;;
    esac
  else
    echo "$1 no es un archivo válido"
  fi
}
```

Hacer ejecutable:
```bash
sudo chmod +x /etc/profile.d/aliases.sh
```

**Para Zsh - Todos los usuarios:**

Crear el archivo global:
```bash
sudo nano /etc/profile.d/aliases.zsh
```

Añadir los mismos alias o diferentes.

**Por usuario específico:**

- **Bash**: `~/.bashrc`
- **Zsh**: `~/.zshrc`
- **Todos los shells** (global): `/etc/profile.d/`
- **Usuario específico** (global): `/home/usuario/.bashrc`

Para aplicar los cambios sin reiniciar la sesión:
```bash
source ~/.bashrc  # Para Bash
source ~/.zshrc  # Para Zsh
```

## Preguntas Frecuentes

### ¿Cuál es la diferencia entre tail -f y tail -F?

La diferencia principal es que `tail -f` sigue el descriptor de archivo (si el log se rota, deja de seguir), mientras que `tail -F` sigue el nombre del archivo y lo reopen si se crea uno nuevo. Para monitorizar logs en producción, usa siempre `tail -F`.

### ¿Cómo buscar en el historial de Bash?

Usa `Ctrl+R` para hacer una búsqueda inversa en el historial. Pulsa `Ctrl+R` repetidamente para navegar entre resultados o `Ctrl+G` para cancelar.

### ¿Qué es Readline?

Readline es la librería que proporciona la edición de línea de comandos en Bash. Todos los atajos de edición (Ctrl+A, Ctrl+E, Alt+B, etc.) vienen de Readline y funcionan en cualquier programa que la use.

### ¿Cómo usar el último argumento sin escribirlo?

Usa `Alt+.` (o Esc seguida de punto) para insertar automáticamente el último argumento del comando anterior. Es ideal para encadenar comandos en el mismo archivo o directorio.

## Conclusión

El terminal de GNU/Linux es una herramienta extraordinariamente potente, pero su verdadero poder está en conocer estos pequeños detalles que te ahorran segundos repetidos miles de veces. Empieza por integrar uno o dos de estos atajos en tu rutina diaria y verás cómo tu productividad aumenta.

***
¿Tienes algún atajo o comando favorito que no menciono aquí? Cuéntamelo en los comentarios.

Compártelo si te ha liked.

Y... ¡hasta aquí por hoy!
