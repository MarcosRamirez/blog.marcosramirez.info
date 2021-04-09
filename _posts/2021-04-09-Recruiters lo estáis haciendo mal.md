---
title: Recruiters&#58; Lo estáis haciendo mal
author: Marcos Ramírez
date: 2021-04-09 20:50:00 +0100
categories: [Informática, Empleo]
tags: [trabajo, empleo, recruiters, head hunters, ofertas, tests, prueba, conocimientos, ofertas, laborales]
pin: false
toc: true
excerpt_separator: <!--more-->
excerpt: Este post pretende ser una crítica constructiva al proceso de selección, o de recruiting (para el sector Informático), que sufrimos en el momento de escribir este artículo, procesos donde se hace perder el tiempo de manera innecesaria, desde la propia publicación de la oferta laboral.
image: /assets/img/recruiting.jpg
permalink: /:title/ # title is filename NOT title in YAML
---
![Portada](/assets/img/recruiting.jpg)

Si hay algo que odio es perder el tiempo (mucho más si me lo hacen perder),y los procesos de selección del sector IT (al menos para programadores o CTO), en muchas ocasiones, son una completa pérdida de tiempo, simplemente, por que hacen las cosas mal.

Así que, recruiters, head hunters, y *empresarios* (que también tenéis que ver) aquí os dejo todo lo que estáis haciendo mal (según yo, y muchos compañeros)

# Ofertas de empleo mal redactadas

Esto lo voy a dividir en varios ocasiones

## Ir de guay

| Buscamos un ninja developer de **inserte aquí lenguaje** que respire código y desayune tests

¿Verdad que te suenan anuncios de este tipo?, pues con eso, solo consigues que muchísima gente piense "vende motos" y pase de tu oferta, dado que esas ofertas suelen estar asociadas a unas condiciones laborales bastante lamentables.

## Dar poca o nula información

Estoy muy cansado de ver ofertas en las que no se dice absolutamente nada del proyecto, todo ofertas del rollo "importante empresa del sector XXXX" y luego la carta a los reyes magos de lo que quieren que sepa el programador en cuestión y ya [^1] .

## Hacer preguntas cuya respuesta está en el CV del candidato

Eso de "indica en que proyectos has trabajado" o "dinos que experiencia tienes en XXXX", me cabrea especialmente, eso denota claramente:

1. Desprecio absoluto por el tiempo del candidato
2. Que el recruiter, te hace hacer su trabajo, y encima se lo consienten, lo cual plantea dudas sobre el ambienbte laboral, si los de RRHH no se leen los CVs... mal vamos, ¿no?

** Puedo entender ** que pongan un select, que con un par de clicks, que no cuestan trabajo, les ayudes a cribar, pero pedirte que resumas tu CV... no, amigo. sobretodo por que...

Igual que entiendo que hay una serie de preguntas tipo "indica tu plazo de incorporación" o "indica tu franja salarial" o "por qué crees que deberíamos contratarte" que me parecen lógicas, aprotan un valor extra al entrevistador (aunque muchas ya las respondo en la **carta de presentación, que tampoco leen**) y no hay ningún problema en ello.

Yo tengo mi copy paste preparado, y listo... sí, hasta para la última, contesto siempre exactamente lo mismo.


En este punto, pongamos que ya has invertido **10** minutos en la oferta laboral, leerla, contestar el cuestionario, buscar información de la empresa, etc..

# La "primera llamada" (0,5/1 hora más)

Yo ya asumo que la primera persona que me llama, no tiene conocimiento técnico alguno, y que muy probablemente sea una pérdida de tiempo.
Así que directamente suelo tomar el control de la conversación, y llevarla por el lado que me interesa, que es sacar información de la empresa, y la oferta en sí (no a nivel técnico, claro, que aquí mi interlocutor no tendrá ni idea [^2]), así que, si tiene preguntas, se las contesto lo más escueto posible, antes o después de acribillarle yo a preguntas sobre el proyecto, el ambiente, la cultura, y todo lo que crea oportuno.

# Te contamos el proyecto en profundidad (60/120 minutos más)

Una vez superada la primera llamada, suele venir la llamada con el jefe de proyecto, que tampoco suele tener mucho conocimiento técnico[^3], o de un comercial.
Básicamente, es una entrevista de +-1 hora, en la que te cuentan, de nuevo, la historia de la empresa, y el proyecto, los problemas que tienen, y lo que quieren obtener a futuro.

# Entrevista técnica (1/2 horas más)

Una vez ya te han contado todo, y te han preguntado sobre tu experiencia, y te han preguntado sobre tus habilidades personales, y las preguntas típicas de por que te vas de una empresa a otra, me hace gracia que algunos aún les extrañe que cambie de empleo cada 2 años máximo, como si fuese algo extraño..

Ya, por fín, te sientas con alguien que habla tu idioma, y que, a la hora de la verdad, es el que te va a convencer de si te interesa o no, clarmente, por muy chulo que sea la idea, o el proyecto, si lo están ejecutando mal, o con prisas, pues voy a decir que no, y haber invertido 2 horas, hasta obtener información vital, me parece un error.

# Pruebas técnicas (2/40 horas más)

Desde ya, digo que no estoy ni a favor, ni en contra de los tests de conocimientos, pruebas técnicas o como lo quieras llamar, siempre que tengamos claro lo siguiente:

1. Hablo de pruebas en las que te piden que, por ejemplo, desarrolles un carrito de la compra[^4], o cualquier otra cosa que lleve una cantidad de tiempo importante.
2. Se me pague por el tiempo que emplee en realizar dicha prueba
3. Se elimine el periodo de prueba del contrato,dado que ya he pasado la prueba técnica

Dicho esto, yo, personalmente estoy más a favor de pruebas técnicas "en modo charla", de las que el entrevistador te va haciendo preguntas, o enseñando código y preguntándote sobre el mismo, y que incluso sobre la marcha, en minutos puedes modificar, cosas concretas, conceptuales sobretodo, y que sirven para valorar si sabes o no, por ejemplo:

Si planteais un snippet tal que este (que es un ejemplo chorra):

```php

function inserta_DataInDB ($a) {
  foreach ($x in $a)
  {
      $q="insert into product (nombre) values ($x)"
      if ($sql->exec($q)) {
        echo "ok";
      } else {
        echo "error";
      }
  }
}
```

Y le decís ¿qué opinas de esta functión?

¿No me diréis que no os sirve para cribar muuchas cosas?, un ejemplo similar, es el que pongo yo cuando contrato (juniors), pero se pueden poner cosas similares para cualquier nivel
En esas 10 líneas de código, ya te da para saber si la persona sabe desde clean code, hasta sentido común, pasando por cosas como arquitecturas, y el montón de cosas que se pueden decir de ese código (**de mierda, que no hay una sola línea correcta, por si alguien se lo pregunta**).


Y, creo que no me dejo nada en el tintero... y de ser así, volveré a la carga con otro post.

Recuerda, que espero tus comentarios, y opiniones, siempre desde el respeto, igual que espero que compartas el post si te ha resultado interesante.



[^1]: Hay quien se queja también de que no indican salarios, a mi esto me da igual, entiendo que todo salario es negociable, y ya me encargo yo de preguntar lo primero cual es la franja para no perder tiempo.
[^2]: Hoy mismo me dice "y control de versiones sabes" no le dejo terminal, y le suelto "desde subversion, diría que todos", y me responde "pero git sabes?"
[^3]: ** Disclaimer**: En muchos casos, sobretodo últimamnente, en este punto, suele ser una entrevista conjunta con el director del proyecto y al menos un responsable técnico, lo cual es de agradecer., pero voy a centrarme en los que no es así.
[^4]: Ejemplo real, me pidieron esto para una StartUp de comercio online... cosa nada sospechosa, ¿verdad?
     El uso de herramientas como [Codility](https://codility.com/) también se está poniendo de moda, para mí, aplica en el mismo caso



***
Si te ha gustado el post, o te ha sido de ayuda, por favor, compártelo.
