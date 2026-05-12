---
title: "La Liga bloqueó mi blog: jamás he visto un partido de fútbol"
slug: tebas-bloqueo-ips-blog-inocentes
date: 2026-05-12 08:30:00 +0200
excerpt: "El puto Tebas me ha bloqueado el blog. Mi sitio no tiene nada que ver con el fútbol, pero La Liga obtiene mandatos judiciales para bloquear miles de IPs cada fin de semana y derriba webs inocentes de pasada. Te cuento el escándalo, los números que demuestran lo absurdo que es, y qué puedes hacer si también eres víctima."
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
  - Redes e Infraestructura
  - Reflexiones y Opinión
  - Seguridad Informática
tags: [bloqueo-ips, censura, internet-libre, isp-espana, pirateria-futbol]
image: /assets/img/headers/2026/tebas-bloqueo-ips-blog-inocentes-nanobanana.webp
image_alt: "Pantalla de error de red sobre un fondo con un estadio de fútbol borroso"
toc: true
pin: false
twitter_description: "La Liga bloqueó mi blog de pasada. Jamás he visto un partido. Te cuento el escándalo de los bloqueos masivos de IPs en España."
description: "La Liga bloquea miles de IPs cada fin de semana, derriba webs inocentes de pasada y mi blog cayó. Te cuento el escándalo completo y cómo reclamar."
permalink: /:slug/
---

![{{ page.image_alt }}]({{ page.image }})

No sé si podréis leer esto, porque el puto Tebas me ha bloqueado el blog, y en mi vida he visto un partido de fútbol, ni ganas.

Descubrí el problema cuando un amigo me avisó de que el blog no cargaba. Probé desde mi teléfono con datos —fuera de mi red doméstica— y lo confirmé: el blog no se veía en varios operadores españoles. No era un problema de configuración ni de DNS propios. Fui a [hayahora.futbol](https://hayahora.futbol){:target="_blank" rel="nofollow noopener"}, un comprobador ciudadano no oficial que lleva meses documentando esta locura, y ahí estaba: `blog.marcosramirez.info`, bloqueado. Por las mismas listas que bloquean los streams de fútbol pirata.

Este blog habla de tecnología, productividad y finanzas personales. Nunca ha mencionado un partido, un jugador ni una quiniela. Para [La Liga](https://www.laliga.com){:target="_blank" rel="nofollow noopener"}, eso da igual.

## ¿Qué está haciendo La Liga exactamente?

El 18 de diciembre de 2024, el Juzgado de lo Mercantil nº 6 de Barcelona emitió la **Sentencia 310/2024**, concediendo a La Liga —presidida por Javier Tebas— el derecho a ordenar bloqueos de IPs a los principales ISPs españoles: [Telefónica](https://www.telefonica.es){:target="_blank" rel="nofollow noopener"}, [Vodafone](https://www.vodafone.es){:target="_blank" rel="nofollow noopener"}, MásOrange (la fusión de Orange y MásMóvil), [Digi](https://www.digi.es){:target="_blank" rel="nofollow noopener"} y otros.

El marco legal se apoya en la **Ley 11/2022, de 28 de junio, General de Telecomunicaciones** (LGTel) y los **artículos 138-139 de la Ley de Propiedad Intelectual (LPI)**, que permiten medidas cautelares para proteger los derechos de emisión audiovisual. Hasta aquí suena razonable: si alguien emite fútbol sin pagar los derechos, tiene lógica que haya un mecanismo legal para bloquearlo.

El problema está en cómo se ejecuta.

La sentencia incluye un **mandato dinámico**: La Liga puede actualizar la lista de IPs a bloquear cada fin de semana, sin necesidad de volver al juzgado. Cada jornada de liga, se envían nuevas listas con aproximadamente **3.000 IPs** a los operadores, y estos están obligados a bloquearlas sin revisión judicial adicional. Una empresa privada, con el botón del internet español. Cada fin de semana.

## El problema técnico: por qué caen los inocentes

Aquí está el fallo estructural que convierte todo esto en un desastre.

Internet moderno funciona con **CDNs** (redes de distribución de contenido). Servicios como [Cloudflare](https://www.cloudflare.com){:target="_blank" rel="nofollow noopener"}, [Fastly](https://www.fastly.com){:target="_blank" rel="nofollow noopener"} o [GitHub Pages](https://pages.github.com){:target="_blank" rel="nofollow noopener"} asignan la misma dirección IP a miles de sitios web distintos. No tengo "mi" IP propia: comparto el mismo servidor de borde con cientos o miles de otros sitios, algunos de los cuales no conozco de nada.

Cuando un stream de fútbol pirata opera bajo una IP de Cloudflare y La Liga ordena bloquear esa IP, no bloquea solo el stream pirata. **Bloquea todo lo que hay en esa IP.** Mi blog. Tu tienda online. El gestor de nóminas de aquella empresa. La web de la [Real Academia Española](https://www.rae.es){:target="_blank" rel="nofollow noopener"}. Los repositorios de [Docker](https://hub.docker.com){:target="_blank" rel="nofollow noopener"}. El sistema de pagos de Redsys. La web de Telefónica, que Telefónica misma bloqueó sin darse cuenta de que era suya mientras implementaba las órdenes de La Liga.

Sí: Telefónica bloqueó accidentalmente la web de La Liga mientras ejecutaba los bloqueos de La Liga. No me lo estoy inventando.

Entre el **35 y el 45% de las IPs que La Liga ordena bloquear pertenecen a la infraestructura compartida de Cloudflare**, lo que significa que cada vez que llega una lista nueva, cae una fracción de internet que no tiene ninguna relación con la piratería del fútbol.

## Los números que demuestran el absurdo

Cuando los datos hablan, las opiniones sobran:

- **Más de 13.500 dominios legítimos** bloqueados en un solo partido.
- Solo el **1,33% de las IPs infractoras detectadas** fueron efectivamente bloqueadas. El 98,67% de la piratería sigue igual que antes.
- **Aproximadamente 2 millones de euros** en pérdidas declaradas por empresas y autónomos afectados, solo los que se han organizado para documentarlo y reclamar.
- Servicios caídos documentados: [GitHub](https://github.com){:target="_blank" rel="nofollow noopener"} Pages, Docker Hub, [Snapchat](https://www.snapchat.com){:target="_blank" rel="nofollow noopener"}, [LinkedIn](https://www.linkedin.com){:target="_blank" rel="nofollow noopener"}, [Twitch](https://www.twitch.tv){:target="_blank" rel="nofollow noopener"}, Microsoft Teams, la Real Academia Española, LaCaixa, IFEMA, webs de administraciones públicas...
- Y el que más me hizo gritar: **freedom.gov**, el portal del gobierno de Estados Unidos diseñado específicamente para ayudar a periodistas a eludir la censura en regímenes autoritarios. Bloqueado en España durante partidos de fútbol. La ironía es demasiado grande para ignorarla.

La medida no para la piratería. Paraliza el daño colateral. Y Tebas lo sabe.

## ¿Quién intenta pararlo?

No han faltado intentos. El problema es que el sistema se resiste.

[RootedCON](https://rootedcon.com){:target="_blank" rel="nofollow noopener"}, la principal conferencia de seguridad informática de España, y Cloudflare presentaron solicitudes de nulidad contra la Sentencia 310/2024 alegando que el bloqueo es desproporcionado e incompatible con los derechos fundamentales. **El mismo juzgado que emitió la sentencia las rechazó.** RootedCON argumentó que la sentencia se obtuvo mediante "artimañas procesales"; el juzgado no lo vio así.

La situación no se ha quedado solo en los juzgados:

- RootedCON ha escalado al **Tribunal Constitucional** con un recurso de amparo por vulneración de derechos fundamentales. El Constitucional lo tiene sobre la mesa.
- El **Congreso de los Diputados** aprobó mociones para frenar los bloqueos masivos que afectan a terceros. Son no vinculantes: el gobierno puede ignorarlas y, de momento, lo hace.
- La **CNMC** (Comisión Nacional de los Mercados y la Competencia) no ha actuado de forma efectiva y redirige los casos a la vía judicial.
- Desde Bruselas, expertos jurídicos han concluido que la situación es "incompatible con el estado de derecho".
- Cloudflare ha presentado quejas formales ante el gobierno de Estados Unidos contra las prácticas de bloqueo de España.

Cuando Tebas recibe quejas de los afectados, los redirige a demandar a Cloudflare. Eso es todo. No hay reconocimiento del daño colateral, no hay mecanismo de corrección, no hay responsabilidad.

## Qué puedes hacer si tu web también está bloqueada

Si sospechas que tu sitio, aplicación o servicio es víctima de estos bloqueos:

**1. Compruébalo primero.** Entra en [hayahora.futbol/#comprobador](https://hayahora.futbol/#comprobador){:target="_blank" rel="nofollow noopener"}: introduce tu dominio y te muestra qué operadores lo tienen bloqueado y desde cuándo. Es un proyecto ciudadano independiente, no oficial, pero es la fuente más completa que existe.

**2. Usa una VPN mientras dure.** No es solución, pero al menos tus usuarios fuera de España pueden seguir accediendo, y tú mismo puedes usar el blog con normalidad. Herramientas como [Mullvad](https://mullvad.net){:target="_blank" rel="nofollow noopener"} o [ProtonVPN](https://protonvpn.com){:target="_blank" rel="nofollow noopener"} son opciones solventes.

**3. Únete a la coordinación de afectados.** Hay una plataforma organizada de empresas y autónomos perjudicados preparando acciones legales conjuntas. Busca "Afectados por La Liga" para encontrar el canal activo —la URL cambia según el momento— y súmate si tienes pérdidas documentables.

**4. Documenta todo.** Capturas de pantalla del comprobador, métricas de tráfico durante los partidos, clientes que te contactaron por el problema. Si llega una demanda colectiva, necesitarás pruebas concretas con fechas.

**5. Contacta a tu ISP por escrito.** Ellos son quienes ejecutan el bloqueo. Tienen responsabilidad aunque actúen bajo orden judicial, y una reclamación formal crea un rastro documental útil.

---

Esto no es un debate sobre si la piratería está bien o mal. No lo está, y respetar los derechos de propiedad intelectual tiene todo el sentido. El debate es sobre **proporcionalidad** y sobre si una empresa privada puede tener, mediante un único mandato judicial sin supervisión continua, el poder de cortar el acceso a miles de servicios legales cada vez que hay un partido de fútbol.

No puede. No debería. Y que lo esté haciendo con un 1,33% de efectividad contra la piratería real lo convierte en puro teatro destructivo.

Yo, que jamás he visto un partido de fútbol en mi vida, tengo el blog bloqueado en España gracias a Javier Tebas. Sospecho que hay muchos como yo que ni siquiera se han enterado todavía.

Compártelo si te ha resultado útil.

Y... hasta aquí por hoy!
