!---
title: 2024-10-31 Usando IA para generar menús
slug: usando-ia-para-generar-menus
author: Marcos Ramírez
date: 2024-10-29 8:50:00 +0100
image: /assets/img/headers/default.webp
categories: [Informática, IA]
tags: [generador menús]
pin: false
toc: true
excerpt: Hablando con la endocrina de mi madre, me dí cuenta de lo problemático que es, sobretodo para personas mayores, llevar una dieta adecuada, por lo que empecé a hacer menús, manualmente, para ella... pero como era tedioso, decidí usar IA para ello, y por si a alguien más le resulta útil, he tratado de simplificar el proceso, para que cualquiera pueda hacerlo, y adaptarlo a sus necesidades.
permalink: /:slug/ 
---

Hablando con la endocrina de mi madre, me dí cuenta de lo problemático que es, sobretodo para personas mayores, llevar una dieta adecuada, por lo que empecé a hacer menús, manualmente, para ella... pero como era tedioso, decidí usar IA para ello, y por si a alguien más le resulta útil, he tratado de simplificar el proceso, para que cualquiera pueda hacerlo, y adaptarlo a sus necesidades.

Así que voy a explicar como puedes hacerlo de la manera más fácil posible.

# Requisitos  

- Una cuenta de <a href="https://chat.openai.com" target="_blank">ChatGPT</a> (<a href="https://openai.com" target="_blank">OpenAI</a>)
- Un editor de texto

# Consideraciones 

Yo uso la versión de pago de ChatGPT, por lo que _es posible_ que instrucciones tan profundas como las que uso, no funcionen en la versión gratuita, pero os dejo algunos tips para que si funcione: 

- Reducir la cantidad de menús a generar
- Eliminar la parte "creativa", osea, que no haga variaciones de platos.
- Que no incluya el número de semana.
- Que no tenga en cuenta la estación del año.

En resumen, que no tenga que pensar, memorizar, o tener en cuenta demasiadas cosas.

Del mismo modo, si también usas la versión de pago, puedes darle más instrucciones, como que tenga en cuenta un presupuesto, sí, aunque parezca increible, seguramente lo haga bastante acertadamente.

O, algo útil que se me acaba de ocurrir, que te haga la lista de la compra de cada semana, para poder preparar los platos.



# Paso 1: Darle las instrucciones para que genere el menú

Este es el paso más importante, ya que es el que define el resultado final, así que te recomiendo que lo leas varias veces, y que lo modifiques a tu gusto, para que el resultado final sea el que deseas.

Estas son las instrucciones que YO uso, por lo que debes tomarlas como ejemplo, y adaptarlas a tus necesidades. Seguramente tú quieras que los Lunes también haga un menú, yo sé que siempre sobra comida, y los Lunes los dejo para acabar con las sobras, y me ha parecido bien dejarlo, para que veáis la potencia que llega a tener la IA.

Como véis, son instrucciones muy simples, pero específicas, y lo más importante, enumeradas, si queréis añadir, o modificar algo, simplemente tendréis que añadir más instrucciones, o, evidentemente, podéis eliminar, o modificar las que aquí dejo.

La parte de la plantilla HTML, es importante, y es código HTML sencillo, que básicamente genera una tabla para poner el menú, podéis usar la misma IA para que os la modifique a vuestro gusto si algo no os gusta.

Y luego, la convierte a PDF, para poder imprimirla.

El motivo de esto, es que ChatGPT, no es capaz de generar el PDF, bueno, no es capaz de generar uno "bonito", correctamente por si mismo, por lo que le doy la plantilla, y le digo que la convierta a PDF, y ya está. Además, si queréis, podéis usar la misma IA para que os la modifique a vuestro gusto si algo no os gusta. 

INSTRUCCIONES:

```html
Hola, voy a darte un listado de comidas, en formato Markdown, verás que están ordenadas por categorías, o tipos de comida, en base a ese listado, quiero que hagas lo que te indicaré a continuación, teniendo en cuenta que debe ser PARA DOS PERSONAS, siendo una de ellas DIABETICA.

- Genera un menú semanal, de Martes a Domingo, dejando los Lunes con "no se cocina"
- El menú debe incluir comida y cena
- El menú deberá empezar hoy mismo, y deberás crear los menús necesarios hasta el día 31 de Diciembre.
- Incluye el número de semana (real) en cada uno de ellos
- Debes tener en cuenta la estación del año, para, por ejemplo, no poner platos calientes en verano, o viceversa.
- Debes incluir postres únicamente los Domingos.
- Debes incluir guisos, o paella, únicamente los Domingos
- Debes incluir comida basura únicamente el último Domingo de cada mes.
- Debes incluir hidratos de carbono todas las noches, es MUY IMPORTANTE.
- Puedes hacer variaciones, siempre y cuando los ingredientes, sean los mismos que los de las comidas listadas.
- Si haces variaciones, la dificultad de cocinarlos, debe ser la misma que la de los platos que te dije.
- Una vez hayas generado los menús, usando la plantilla que te daré a continuación, quiero que la conviertas en PDF

- Debes utilizar la siguiente plantilla HTML para generar el menú:
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menú Semanal</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            text-align: center;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            font-size: 16px;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        td {
            height: 50px;
            vertical-align: middle;
        }
    </style>
</head>
<body>

<h2>Menú Semanal</h2>
<table>
    <tr>
        <th></th>
        <th>Comida</th>
        <th>Cena</th>
    </tr>
    <tr>
        <td>Lunes</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Martes</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Miércoles</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Jueves</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Viernes</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Sábado</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Domingo</td>
        <td></td>
        <td></td>
    </tr>
</table>

</body>
</html>

```


# Paso 2: Darle el listado de platos.

Ahora que ya sabe que tiene que hacer, le damos el listado de platos que tiene que usar, para generar los menús.
De hecho, la misma IA de pedirá que le des el listado.

Este archivo no es nada complejo, es un simple archivo MarkDown, donde cada categoría de platos, está en un bloque de texto, y cada plato, en una línea.
Lo hago de este modo, para poder hacer referencia a platos concretos, o grupos concretos, como hago en las instrucciones, para que la IA, sepa que tiene que hacer.

Lo único "especial" es que la casquería, es un "subgrupo" de carnes, cada # indica un "nivel" de indice, por decirlo simplemente.

Aquí, por ejemplo, que es algo que pensé en hacer, pero no hice, se puede añadir un listado de guarniciones.

```
# Guisos

Cocido
Estofado de pollo
Estofado de ternera
Estofado de cerdo
Carrillada
Caldereta
Callos

# Legumbres

Empedrao
Judías blancas
Judias pintas
Judías pintas con arroz
Lentejas
Potaje
Guisantes/Habas con jamón y huevo duro
Patatas con arroz y bacalao

# Carnes

Chuletas de cerdo
Lomo
Filetes de ternera
Filetes rusos
Filetes de cadera
Pechugas de pollo
Muslitos de pollo
Filetes de contra
Carne picada ternera
Carne picada cerdo
Salchichas frescas
Pato
Cordero
Conejo
Pavo

## Casquería

Hígado
Sesitos

# Pasta

Macarrones con jamón
Macarrones con carne picada
Macarrones con chorizo
Macarrones carbonara
Espaguetis
Espaguetis carne picada
Espaguetis con jamón
Espaguetis con chorizo
Espaguetis carbonara
Quiche
Pan de ajo
Pizza casera

# Ensaladas

Ensalada de pollo
de garbanzos
Ensalada de pasta
Ensalada mixta
Ensaladilla rusa
Ensalada campera

# Verduras 

Coliflor
Broccoli
Menestra
Espárragos
Judías verdes
Repollo
Acelgas 
Coles de Brusela

# Pescados

Merluza en salsa
Emperador
Gallos
Pescadilla
Atún
Palometa
Salmon

# Arroces 

Paella
Arroz a la cubana
Arroz con pollo
Risotto

# Tortillas / Huevos

Tortilla de patata
Tortilla francesa
Tortilla con cebolla 
Tortilla con queso 
Tortilla con jamón y queso
Huevos fritos
Huevos revueltos

# Sopas 

Sopa de pasta
Crema calabacín
Crema calabaza
Puré de verduras
Salmorejo
Gazpacho

# Sandwiches / similares 

Sandwich jamón y queso 
Sandwich cubano
Empanada de carne
Empanada de Atún


# Comida basura 

Pizza Congelada
San jacobos
Croquetas
Empanadillas

# Postres 

Tarta de queso
Flan
Membrillo
Natillas
Natillas de chocolate 
Mousse de chocolate 
Helado
Fresas con nata
```

***
No olvides compartir el post si te ha gustado