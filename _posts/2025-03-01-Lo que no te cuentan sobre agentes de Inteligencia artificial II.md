---
title: Lo que no te cuentan sobre agentes de Inteligencia artificial II
slug: Lo-que-no-te-cuentan-sobre-agentes-de-Inteligencia-artificial-ii
author: Marcos Ramírez
date: 2025-03-01 8:50:00 +0100
image: /assets/img/headers/default.webp
categories: [Inteligencia Artificial]
tags: [IA, agentes, te cuentan, verdad]
pin: false
toc: true
excerpt: Esta es la segunda parte del post que escribí el mes pasado, sobre los problemas que te puedes encontrar al desarrollar un agente de inteligencia artificial 
permalink: /:slug/ 
---
![Post Header](/assets/img/headers/default.webp)

# Segundas partes... ¿nunca fueron buenas?

El mes pasado escribí la primera parte de este post, pero como he visto más preguntas, y problemas que no traté, voy a hacerlo en este.




# Latencia 

Este comienzo de 2025, está siendo movidito en cuanto a IA, y están empezando a surgir los primeros problemas y movidas (Musk y OpenAI, DeepSeek, caídas de servicio, etc )

Y ahora, es cuando la gente está empezando a toparse con problemas que son conocidos en el desarrollo de software, pero que le son nuevos a quienes nunca han desarrollado software.

En un agente de voz, hay, principalmente, tres puntos de dolor que causan aumento de Latencia.

Es común que veas 100ms, y te parezca poco, pero, en realidad, puede ser muchísimo, normalmente es algo a lo que no se le presta atención, y se van acumulando 100 por aquí, 300 por allá, 1200 por el otro lado, y amigo.. ya tenemos más de un segundo y medio de latencia. Que no parece mucho, pero en una conversación hablada, se nota.

> Si bien es cierto que todas las plataformas suelen tener sistemas de cache y similares para acelerar las respuestas, y por tanto las cifran pueden variar a la baja, es algo a tener muy en cuenta.

## El LLM

Dejando de lado el tema de LLMs locales, que ahí entraríamos en algo mucho más profundo, conviene saber que cada LLM tiene más o menos latencia, dejando de lado los servidores, y sus posibles incidencias, básicamente y por resumir, a "más inteligencia" mayor latencia.

Lo normal, es que un LLM tenga una latencia entre 600ms y 1200ms, osea, entre 0,6 segundos y 1,2 sgundos.

## El TTS

Todo el mundo quiere unas voces lo más realistas para sus agentes, pero eso, aumenta la latencia (y el precio, dicho sea de paso), por ejemplo, de media, y si no me falla la memoria, 11labs tiene unos 600ms de latencia.


## Las herramientas

Y aquí también meto en el saco las Knowledge Bases, que no es más que una llamada a una base de datos vectorial.

Cada llamada a una herramienta, requiere su tiempo, y a más compleja, o más carga tenga el servidor, más tardará.

# Enseñarles a hablar

De las consultas más frecuentes que encuentro son:

- El agente dice "at" en vez de arroba
- No dice bien los números de teléfono
- No deletrea bien
- Habla muy deprisa, o muy despacio

O cuestiones similares.

Y, esto puede deberse a varios factores

## La plataforma que uses.

Lo más común es usar plataformas como VAPI o Retell, que como ya expiqué en el post anterior, lo que hacen es "envolver tu prompt, en el suyo", puedes leer el post anterior para más información.

Por tanto, la forma en la que se le envía el texto al TTS para que lo procese, puede depender de SU prompt, en vez del tuyo.
Esto afecta sobretodo a entonaciones, y velocidad del habla.


# GuardRails

Es importante definir bien el marco de actuación de tu agente, para evitar que "alucine" y de información no relevante, o que no quieres dar.
Por ejemplo, si tienes un agente de soporte técnico para una empresa de desarrollo, y le preguntan sobre reparar un ordenador, es muy probable que el agente de instrucciones para ello, dado que está en el marco de la tecnologia.


# Seguridad

Es muy, muy importante asegurarnos de que la IA no revele información confidencial, pero ¿qué es información confidencial?.
Normalmente, consideramos información confidencial la de nuestros clientes, y creemos que con decir "no reveles información confidencial de nuestros clientes" está todo solucionado, pero NO ES ASÍ, lo veremos luego.

También se tiende a no considerar el prompt como parte de la seguridad.

## Asegurarnos de dar datos privados a la persona correcta.

Si un cliente llama a tu agente, y le pide que le facilite SUS DATOS y la IA le dice que no puede revelar información privada, ENHORABUENA, en toda Europa, y en muchísimos paises, acabas de ganarte una multa, y no precisamente pequeña.

Es por eso que es importante asegurarnos de que nuestros agentes cumplen con la ley, y controlar todas las casuísticas posibles.

# Debug

Algo que sorprende a mucha gente, es que se puede hacer debug a un Agente de inteligencia artificial, sobretodo, cuando "alucina", y muchas veces, en realidad, no está alucinando tanto como pensamos.

Por ejemplo, si el agente te da una respuesta que no esperas, sigue estos pasos:

1. ¿La respuestá está dentro del marco o ha alucinado realmente?, me explico, si le preguntas a un agente si vende castañas, y te responde Cristobal Colón, está alucinando, pero si te dice que vende pipas, en realidad, no está alucinando.

Esto es, por que ambos son frutos secos, y hay una relación entre ellos.

2. Pregúntale a tu agente por qué respondió eso, mucha gente se sorprende de esto, pero, evidentemente, puedes hablar con tu agente, y de sus respuestás obtener información para mejorar su entrenamiento.

***
No olvides compartir el post si te ha gustado
````
