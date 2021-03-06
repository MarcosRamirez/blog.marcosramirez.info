---
layout: post
title: 'Kubuntu 16.04 (Xenial Xerus): Aventuras y desventuras tras actualizar'
date: 2016-08-07 20:34:47.000000000 +02:00
categories: [Informática, Sistemas]
tags: ['16.04', chrome, deluge, fallo, kubuntu, magnet, mysql, ps3mediaserver, spotify, workbench, xenial, xerus]
permalink: "/kubuntu-16-04-xenial-xerus-aventuras-y-desventuras-tras-actualizar/"
toc: true
---
<p>Ayer (Sábado 6 de Agosto de 2.016) a las 8:25 de la mañana, al sentarme frente al PC, me encuentro con que había una nueva actualización de sistema a la versión 16.04 (aunque nada más instalarla se actualizó de nuevo a la 16.04.1), también llamada Xenial Xerus.</p>
<p>Así que, sabiendo que algo iba a fallar (como siempre), me puse a ello, y hoy, escribo (y espero publicar hoy también) este post, explicando que falló, y, obviamente como arreglarlo.</p>
<p><strong>Disclaimer</strong>: Reconozco que hice un update "a ciegas", no me molesté en mirar que iba a (des)instalar, por que, entre otras cosas, pensaba en este artículo y en que es lo que harían la mayoría de lusers x).</p>
<p><strong>Updated</strong> (7/8/2016): Justo acabo de publicar, y al ir a ... hacer cosas ;), me encuentro con que también se ha roto la vinculación de magnet links y deluge, asi que, ahí va la solución</p>
<p><!--more--></p>
<p>Lo primero que noté que "se había roto" fué:</p>
<p><img class="alignleft size-medium wp-image-189" src="{{ site.baseurl }}/assets/2016/08/upgrade-ubuntu-16-04.png?w=300" alt="upgrade ubuntu 16.04" width="300" height="278" /></p>
<ol>
<li>Desaparición del plasmoide escritorio</li>
<li>Fuentes Konsole</li>
<li>Spotify</li>
<li>mySQL WorkBench</li>
<li>Los "estilos" de GTK/3</li>
<li>Cambios en ajustes (I.E, Chrome no es el navegador por defecto)</li>
<li>Desaparición del screensaver/control energía para el monitor</li>
<li>Desaparición de PS3MediaServer</li>
<li>Desaparición de Blogilo</li>
<li>Desaparición de Turpial</li>
<li>Magnets links no abren deluge (desde Google Chrome)</li>
</ol>
<p>Si en los próximos días noto que falla/falta algo más, lo iré añadiendo, estar atentos a posibles updates. O, si os falla algo dejadme un comentario, a ver si a mi también me falla, y veo como arreglarlo :).</p>
<p>Así pues... ¡allá vamos!</p>
<h2>Plasmoide Escritorio:</h2>
<p>Claramente, lo primero que noté, pero también la primera buena noticia (para mí) del nuevo KDE, y es que permite volver al "escritorio clásico", que, llamadme viejuno, pero a mi me gusta.</p>
<p>Aunque, en realidad, es un "híbrido", ya que también puedes añadirle plasmoides, aquí os dejo mi desastroso desktop actual, donde veréis que es un "híbrido" con los iconos sobre el escritorio y un plasmoide (tiras cómicas)</p>
<p><img class="alignnone size-full wp-image-233" src="{{ site.baseurl }}/assets/2016/08/kubuntu-16-04-classic-desktop-plasmoide.png" alt="kubuntu 16.04 classic desktop + plasmoide.png" width="1280" height="1024" /></p>
<p>Asi que, <strong>dejé de buscar el plasmoide</strong> escritorio, ya que <strong>para mí</strong>, esta solución es simplemente genial :)</p>
<p>Para activarlo, simplemente debéis hacer click derecho en el escritorio, y hacer clicken "preferencias de escritorio".</p>
<p>Y en "distribución" veréis que pone "Escritorio" lo cambiais a "Vista de carpetas", y listo, ya tendréis el escritorio "híbrido" de arriba.:</p>
<p><img class="alignnone size-full wp-image-238" src="{{ site.baseurl }}/assets/2016/08/preferencias-de-escritorio.png" alt="preferencias de escritorio.png" width="748" height="593" /></p>
<h2>Fuentes de Konsole:</h2>
<p>Arreglarlo es tan simple, como ir a Preferencias-&gt;Editar perfil actual-&gt;Aspecto</p>
<p>Y elegir el que queramos.</p>
<p>Un poco coñazo, sí, y no sé por qué lo ha cambiado, investigaré más si tengo tiempo :).</p>
<h2>Spotify:</h2>
<p>Al ejecutarlo en KDE simplemente no carga, ejecutarlo en el terminal me indica el problema (soy de la vieja escuela, me gusta la consola x)), asi que al ejecutarlo, dice esto:</p>
<p>[code lang=bash]<br />
marcos@CoDeR:~$ spotify<br />
spotify: error while loading shared libraries: libgcrypt.so.11: cannot open shared object file: No such file or directory<br />
[/code]</p>
<p>Que le faltan una libreria, tan simple y común...<br />
Que, para arreglarlo, tan solo hay que bajarla e instalarla, y para los &quot;vagos&quot;, basta con ejecutar lo siguiente :</p>
<p>Sistemas 64bits:</p>
<p>[code lang=bash]<br />
wget https://launchpad.net/ubuntu/+archive/primary/+files/libgcrypt11_1.5.3-2ubuntu4.2_amd64.deb; sudo dpkg -i libgcrypt11_1.5.3-2ubuntu4.2_amd64.deb; rm libgcrypt11_1.5.3-2ubuntu4.2_amd64.deb<br />
[/code]</p>
<p>Sistemas 32bits</p>
<p>[code lang=bash]<br />
wget https://launchpad.net/ubuntu/+archive/primary/+files/libgcrypt11_1.5.3-2ubuntu4.2_i386.deb; sudo dpkg -i libgcrypt11_1.5.3-2ubuntu4.2_i386.deb; rm libgcrypt11_1.5.3-2ubuntu4.2_i386.deb<br />
[/code]</p>
<p>&lt;h2&gt;mySQL WorkBench:&lt;/h2&gt;<br />
Aunque supongo que la mayoría no usaréis estas cosas, y quienes lo uséis, supongo que sabréis como areglarlo, diré como arreglarlo igualmente :)</p>
<p>La solución inicial parecía tan simple como &lt;a href=&quot;https://www.mysql.com/products/workbench/&quot; target=&quot;_blank&quot;&gt;bajarse la última versión&lt;/a&gt; desde la web, e instalarla, pero decidió dar un poco la lata:</p>
<p>[code lang=bash]<br />
marcos@CoDeR:~/Descargas$ sudo dpkg -i mysql-workbench-community-6.3.7-1ubu1604-amd64.deb<br />
Seleccionando el paquete mysql-workbench-community previamente no seleccionado.<br />
(Leyendo la base de datos ... 271648 ficheros o directorios instalados actualmente.)<br />
Preparando para desempaquetar mysql-workbench-community-6.3.7-1ubu1604-amd64.deb ...<br />
Desempaquetando mysql-workbench-community (6.3.7-1ubu1604) ...<br />
dpkg: problemas de dependencias impiden la configuración de mysql-workbench-community:<br />
mysql-workbench-community depende de libatkmm-1.6-1v5 (&gt;= 2.24.0); sin embargo:<br />
El paquete `libatkmm-1.6-1v5&#039; no está instalado.<br />
mysql-workbench-community depende de libcairomm-1.0-1v5 (&gt;= 1.12.0); sin embargo:<br />
El paquete `libcairomm-1.0-1v5&#039; no está instalado.<br />
mysql-workbench-community depende de libglibmm-2.4-1v5 (&gt;= 2.46.0); sin embargo:<br />
El paquete `libglibmm-2.4-1v5&#039; no está instalado.<br />
mysql-workbench-community depende de libgtkmm-2.4-1v5 (&gt;= 1:2.24.0); sin embargo:<br />
El paquete `libgtkmm-2.4-1v5&#039; no está instalado.<br />
mysql-workbench-community depende de libpangomm-1.4-1v5 (&gt;= 2.38.0); sin embargo:<br />
El paquete `libpangomm-1.4-1v5&#039; no está instalado.<br />
mysql-workbench-community depende de libpcrecpp0v5 (&gt;= 7.7); sin embargo:<br />
El paquete `libpcrecpp0v5&#039; no está instalado.<br />
mysql-workbench-community depende de libsigc++-2.0-0v5 (&gt;= 2.6.1); sin embargo:<br />
El paquete `libsigc++-2.0-0v5&#039; no está instalado.<br />
mysql<br />
dpkg: error al procesar el paquete mysql-workbench-community (--install):<br />
problemas de dependencias - se deja sin configurar<br />
Procesando disparadores para hicolor-icon-theme (0.15-0ubuntu1) ...<br />
Procesando disparadores para shared-mime-info (1.5-2ubuntu0.1) ...<br />
Unknown media type in type &#039;all/all&#039;<br />
Unknown media type in type &#039;all/allfiles&#039;<br />
Procesando disparadores para menu (2.1.47ubuntu1) ...<br />
Procesando disparadores para desktop-file-utils (0.22-1ubuntu5) ...<br />
Procesando disparadores para mime-support (3.59ubuntu1) ...<br />
Se encontraron errores al procesar:<br />
mysql-workbench-community<br />
[/code]</p>
<p>Asi que, primero lo &quot;desinstalo&quot; (solo para que no dé el coñazo con que falló la instalación)</p>
<p>[code lang=bash]<br />
$ sudo apt-get remove mysql-workbench-community<br />
[/code]</p>
<p>Instalamos todas las dependencias que pide (sí, hay más de las que dice al principio, estuve un rato liado xD), luego pide (libgtkmm-2.4-1v5 y python-paramiko)</p>
<p>[code lang=bash]<br />
$ sudo apt-get install libatkmm-1.6-1v5 libcairomm-1.0-1v5 libglibmm-2.4-1v5 libpangomm-1.4-1v5 libpcrecpp0v5 libsigc++-2.0-0v5 libgtkmm-2.4-1v5  python-paramiko</p>
<p>[/code]</p>
<p>Y... ya está, ya podemos instalar:</p>
<p>[code lang=bash]<br />
$ sudo dpkg -i mysql-workbench-community-6.3.7-1ubu1604-amd64.deb<br />
Seleccionando el paquete mysql-workbench-community previamente no seleccionado.<br />
(Leyendo la base de datos ... 271775 ficheros o directorios instalados actualmente.)<br />
Preparando para desempaquetar mysql-workbench-community-6.3.7-1ubu1604-amd64.deb ...<br />
Desempaquetando mysql-workbench-community (6.3.7-1ubu1604) ...<br />
Configurando mysql-workbench-community (6.3.7-1ubu1604) ...<br />
Procesando disparadores para hicolor-icon-theme (0.15-0ubuntu1) ...<br />
Procesando disparadores para shared-mime-info (1.5-2ubuntu0.1) ...<br />
Unknown media type in type &#039;all/all&#039;<br />
Unknown media type in type &#039;all/allfiles&#039;<br />
Procesando disparadores para menu (2.1.47ubuntu1) ...<br />
Procesando disparadores para desktop-file-utils (0.22-1ubuntu5) ...<br />
Procesando disparadores para mime-support (3.59ubuntu1) ...<br />
[/code]</p>
<p>&nbsp;</p>
<h2>Estilos GTK:</h2>
<p>Al abrir Deluge, se veía simplemente horroroso, para cambiarlo, simplemente abrir preferencias del sistema-&gt;Estilo de las aplicaciones-&gt;estlo de aplicaciones GNOME (GTK), y elegís el que os guste, yo después de probar unas pocas, me quedé con Aurora, al menos, de momento</p>
<p><img class="alignnone size-full wp-image-262" src="{{ site.baseurl }}/assets/2016/08/kubuntu-16-04-estilo-aplicaciones-gtk.png" alt="kubuntu 16.04 estilo aplicaciones gtk" width="899" height="596" /></p>
<h2>Cambios en Ajustes:</h2>
<p>De momento, todos, se solventan desde el panel de control</p>
<h2>ScreenSaver:</h2>
<p>Aún no he encontrado una solución que me guste (supongo que instalando los de gnome funcionará, pero... no he querido instalarlos, manías mías)</p>
<h2>PS3 Media Server:</h2>
<p>Aquí simplemente reinstalé desde la fuente original.</p>
<h2>Desaparición de Blogilo y Turpial:</h2>
<p>Sinceramente, lo dejé correr por que no los usaba hacía milenios, y si no llega a ser por que se rompió el link del escritorio, ni me habría dado cuenta, si a alguien le ha pasado y no es capaz de solventarlo, que me lo diga y lo miraré, pero con el cliente de escritorio de WordPress.com Blogilo quedo obsoletísimo.</p>
<p>Y, turpial, simplemente lo usaba cuando tenía mi famosa <a href="https://viviremprendiendo.wordpress.com/2014/12/10/a-2kbs/" target="_blank">conexión a 2Kb/s</a> , dudo que nadie con una conexión decente lo use, o necesite usarlo :).</p>
<h2>Deluge y Magnet links (en Chrome):</h2>
<p>Bueno, hace unos meses <a href="https://github.com/MarcosRamirez/magnetValidator" target="_blank">me dieron la lata</a>, y ahora, vuelven a hacerlo de otro modo (aunque, creo recordar, que hace años también tuve que hacer algo parecido).</p>
<p>Bueno, al lío, para arreglarlo, simplemente editamos un archivo en ~/.kde/share/kde4/services/magnet.protocol y pegamos lo siguiente</p>
<p>[code lang=bash]<br />
[Protocol]<br />
exec=deluge &quot;%u&quot;<br />
protocol=magnet<br />
input=none<br />
output=none<br />
helper=true<br />
listing=false<br />
reading=false<br />
writing=false<br />
makedir=false<br />
deleting=false<br />
[/code]</p>
<p>CIERRAS SESIÓN (no hace falta reiniciar), y listo... funcionando ;)</p>
<hr />
<blockquote><p>
  Si tienes cualquier duda, comentario, sugerencia, o incluso amenaza:<br />
  Puedes cantactarme en: <a href="http://es.linkedin.com/in/marcosramirezparicio/">LinkedIn</a>, <a href="http://www.twitter.com/ImMarcosRamirez">@ImMarcosRamirez</a>.<br />
  (<strong>Por supuesto, también estudiaré ofertas laborales , consultorías, etc..</strong>)</p>
<p>  <strong><em>Si te ha resultado interesante el post, compártelo :)</em></strong>.</p>
<p>  A día de hoy, también agradeceré que me ayudes en <a href="http://viviremprendiendo.wordpress.com/2014/02/17/desvelando-unnamed/">mi aventura empresarial</a>, puedes hacerlo de manera sencilla:</p>
<ul>
<li>Por ejemplo ayudándome a <a href="http://viviremprendiendo.wordpress.com/2014/12/09/emprendedor-de-buen-ver-busca-cofundadoresas-para-proyecto-y-lo-que-surja/">encontrar cofundador/a</a> difundiendo este post.</li>
<li>También, puedes <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=DFZ69JUYYWGNS">hacer una donación</a> para el proyecto en <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=DFZ69JUYYWGNS">esta página de PayPal</a>, o bien, <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=DFZ69JUYYWGNS">difundir la página</a>.</li>
</ul>
<p>  En cualquier caso, muchas gracias por ayudar!.
</p></blockquote>
