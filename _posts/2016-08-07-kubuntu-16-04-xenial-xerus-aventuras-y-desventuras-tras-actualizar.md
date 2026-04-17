---
title: "Kubuntu 16.04 (Xenial Xerus): Aventuras y desventuras tras actualizar"
slug: kubuntu-16-04-xenial-xerus-aventuras-y-desventuras-tras-actualizar
author: Marcos Ramírez
date: 2016-08-07 20:34:47 +0200
image: /assets/img/headers/kubuntu.png
categories: [Tecnología, Sistemas]
tags: [linux, kubuntu, tutorial, opinión]
pin: false
toc: true
excerpt: Tras actualizar a Kubuntu 16.04 (Xenial Xerus), me encontré con una serie de errores comunes que van desde la desaparición de plasmoides hasta problemas con librerías en Spotify y MySQL Workbench. En este post, detallo cada uno de estos inconvenientes y proporciono las soluciones paso a paso para recuperar la estabilidad y funcionalidad del sistema KDE.
twitter_description: "Qué se rompió al actualizar a Kubuntu 16.04 Xenial Xerus y cómo solucionarlo."
permalink: /kubuntu-16-04-xenial-xerus-aventuras-y-desventuras-tras-actualizar/
---

Ayer (Sábado 6 de Agosto de 2.016) a las 8:25 de la mañana, al sentarme frente al PC, me encuentro con que había una nueva actualización de sistema a la versión 16.04 (aunque nada más instalarla se actualizó de nuevo a la 16.04.1), también llamada Xenial Xerus.

Así que, sabiendo que algo iba a fallar (como siempre), me puse a ello, y hoy, escribo (y espero publicar hoy también) este post, explicando que falló, y, obviamente como arreglarlo.

**Disclaimer**: Reconozco que hice un update "a ciegas", no me molesté en mirar que iba a (des)instalar, por que, entre otras cosas, pensaba en este artículo y en que es lo que harían la mayoría de lusers x).

**Updated** (7/8/2016): Justo acabo de publicar, y al ir a ... hacer cosas ;), me encuentro con que también se ha roto la vinculación de magnet links y deluge, asi que, ahí va la solución

Lo primero que noté que "se había roto" fué:

![upgrade ubuntu 16.04](/assets/2016/08/upgrade-ubuntu-16-04.png)

1. Desaparición del plasmoide escritorio
2. Fuentes Konsole
3. Spotify
4. mySQL WorkBench
5. Los "estilos" de GTK/3
6. Cambios en ajustes (I.E, Chrome no es el navegador por defecto)
7. Desaparición del screensaver/control energía para el monitor
8. Desaparición de PS3MediaServer
9. Desaparición de Blogilo
10. Desaparición de Turpial
11. Magnets links no abren deluge (desde Google Chrome)

Si en los próximos días noto que falla/falta algo más, lo iré añadiendo, estar atentos a posibles updates. O, si os falla algo dejadme un comentario, a ver si a mi también me falla, y veo como arreglarlo :).

Así pues... ¡allá vamos!

## Plasmoide Escritorio

Claramente, lo primero que noté, pero también la primera buena noticia (para mí) del nuevo KDE, y es que permite volver al "escritorio clásico", que, llamadme viejuno, pero a mi me gusta.

Aunque, en realidad, es un "híbrido", ya que también puedes añadirle plasmoides, aquí os dejo mi desastroso desktop actual, donde veréis que es un "híbrido" con los iconos sobre el escritorio y un plasmoide (tiras cómicas)

![kubuntu 16.04 classic desktop + plasmoide](/assets/2016/08/kubuntu-16-04-classic-desktop-plasmoide.png)

Asi que, **dejé de buscar el plasmoide** escritorio, ya que **para mí**, esta solución es simplemente genial :)

Para activarlo, simplemente debéis hacer click derecho en el escritorio, y hacer click en "preferencias de escritorio".

Y en "distribución" veréis que pone "Escritorio" lo cambiais a "Vista de carpetas", y listo, ya tendréis el escritorio "híbrido" de arriba:

![preferencias de escritorio](/assets/2016/08/preferencias-de-escritorio.png)

## Fuentes de Konsole

Arreglarlo es tan simple, como ir a Preferencias->Editar perfil actual->Aspecto

Y elegir el que queramos.

Un poco coñazo, sí, y no sé por qué lo ha cambiado, investigaré más si tengo tiempo :).

## Spotify

Al ejecutarlo en KDE simplemente no carga, ejecutarlo en el terminal me indica el problema (soy de la vieja escuela, me gusta la consola x)), asi que al ejecutarlo, dice esto:

```bash
marcos@CoDeR:~$ spotify
spotify: error while loading shared libraries: libgcrypt.so.11: cannot open shared object file: No such file or directory
```

Que le faltan una libreria, tan simple y común...
Que, para arreglarlo, tan solo hay que bajarla e instalarla, y para los "vagos", basta con ejecutar lo siguiente:

Sistemas 64bits:

```bash
wget https://launchpad.net/ubuntu/+archive/primary/+files/libgcrypt11_1.5.3-2ubuntu4.2_amd64.deb; sudo dpkg -i libgcrypt11_1.5.3-2ubuntu4.2_amd64.deb; rm libgcrypt11_1.5.3-2ubuntu4.2_amd64.deb
```

Sistemas 32bits:

```bash
wget https://launchpad.net/ubuntu/+archive/primary/+files/libgcrypt11_1.5.3-2ubuntu4.2_i386.deb; sudo dpkg -i libgcrypt11_1.5.3-2ubuntu4.2_i386.deb; rm libgcrypt11_1.5.3-2ubuntu4.2_i386.deb
```

## mySQL WorkBench

Aunque supongo que la mayoría no usaréis estas cosas, y quienes lo uséis, supongo que sabréis como arreglarlo, diré como arreglarlo igualmente :)

La solución inicial parecía tan simple como [bajarse la última versión](https://www.mysql.com/products/workbench/){:target="_blank"} desde la web, e instalarla, pero decidió dar un poco la lata:

```bash
marcos@CoDeR:~/Descargas$ sudo dpkg -i mysql-workbench-community-6.3.7-1ubu1604-amd64.deb
Seleccionando el paquete mysql-workbench-community previamente no seleccionado.
(Leyendo la base de datos ... 271648 ficheros o directorios instalados actualmente.)
Preparando para desempaquetar mysql-workbench-community-6.3.7-1ubu1604-amd64.deb ...
Desempaquetando mysql-workbench-community (6.3.7-1ubu1604) ...
dpkg: problemas de dependencias impiden la configuración de mysql-workbench-community:
 mysql-workbench-community depende de libatkmm-1.6-1v5 (>= 2.24.0); sin embargo:
 El paquete 'libatkmm-1.6-1v5' no está instalado.
 ...
Se encontraron errores al procesar:
 mysql-workbench-community
```

Asi que, primero lo "desinstalo" (solo para que no dé el coñazo con que falló la instalación):

```bash
$ sudo apt-get remove mysql-workbench-community
```

Instalamos todas las dependencias que pide (sí, hay más de las que dice al principio), luego pide (libgtkmm-2.4-1v5 y python-paramiko):

```bash
$ sudo apt-get install libatkmm-1.6-1v5 libcairomm-1.0-1v5 libglibmm-2.4-1v5 libpangomm-1.4-1v5 libpcrecpp0v5 libsigc++-2.0-0v5 libgtkmm-2.4-1v5 python-paramiko
```

Y... ya está, ya podemos instalar:

```bash
$ sudo dpkg -i mysql-workbench-community-6.3.7-1ubu1604-amd64.deb
```

## Estilos GTK

Al abrir Deluge, se veía simplemente horroroso, para cambiarlo, simplemente abrir preferencias del sistema->Estilo de las aplicaciones->estilo de aplicaciones GNOME (GTK), y elegís el que os guste, yo después de probar unas pocas, me quedé con Aurora, al menos, de momento.

![kubuntu 16.04 estilo aplicaciones gtk](/assets/2016/08/kubuntu-16-04-estilo-aplicaciones-gtk.png)

## Cambios en Ajustes

De momento, todos, se solventan desde el panel de control.

## ScreenSaver

Aún no he encontrado una solución que me guste (supongo que instalando los de gnome funcionará, pero... no he querido instalarlos, manías mías).

## PS3 Media Server

Aquí simplemente reinstalé desde la fuente original.

## Desaparición de Blogilo y Turpial

Sinceramente, lo dejé correr por que no los usaba hacía milenios, y si no llega a ser por que se rompió el link del escritorio, ni me habría dado cuenta, si a alguien le ha pasado y no es capaz de solventarlo, que me lo diga y lo miraré, pero con el cliente de escritorio de WordPress.com Blogilo quedo obsoletísimo.

Y, turpial, simplemente lo usaba cuando tenía mi famosa [conexión a 2Kb/s](https://viviremprendiendo.wordpress.com/2014/12/10/a-2kbs/){:target="_blank"}, dudo que nadie con una conexión decente lo use, o necesite usarlo :).

## Deluge y Magnet links (en Chrome)

Bueno, hace unos meses [me dieron la lata](https://github.com/MarcosRamirez/magnetValidator){:target="_blank"}, y ahora, vuelven a hacerlo de otro modo (aunque, creo recordar, que hace años también tuve que hacer algo parecido).

Bueno, al lío, para arreglarlo, simplemente editamos un archivo en `~/.kde/share/kde4/services/magnet.protocol` y pegamos lo siguiente:

```bash
[Protocol]
exec=deluge "%u"
protocol=magnet
input=none
output=none
helper=true
listing=false
reading=false
writing=false
makedir=false
deleting=false
```

CIERRAS SESIÓN (no hace falta reiniciar), y listo... funcionando ;)

***
Si te ha resultado interesante el post, compártelo :)
