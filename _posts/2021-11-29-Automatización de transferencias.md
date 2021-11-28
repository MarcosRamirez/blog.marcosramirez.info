---
title: Bancos y Fintechs ¿tan dificil es hacer esto?
author: Marcos Ramírez
date: 2021-11-29 8:50:00 +0100
categories: [Finanzas]
tags: [finanzas, automatica, transferencia, bancaria, automatización, herramientas, gestión]
pin: false
toc: true
excerpt: Es de sobra conocido que la educación financiera en este pais, brilla por su ausencia, pero las herramientas para gestionar finanzas, por parte de la banca, también.
permalink: /:title/ # title is filename NOT title in YAML
---

![Transferencias Automáticas](/assets/img/headers/transferenciasautomaticas.jpg)

*Disclaimer*: Sé que [N26](https://n26.com/r/marcosr8764) ofrece algo parecido a esto en sus planes premium, pero:
1. Solo lo ofrece entre sus espacios (no tienen IBAN propio)
2. Solo lo ofrece en sus cuentas premium (mínimo 4,9€ al mes)  



Creo que todos los que me conocéis, sabéis de mi pasión por la automatización, gestión del tiempo, etc..
Algunos, quizá también sabéis de mi gestión financiera, sobre lo que ya tengo algunos posts preparados.

Y fusionando estos dos conceptos, hay algo que toca la moral, y mucho, desde hace años, y son las poquísimas herramientas, y flexibilidad a la hora de gestionar el dinero que ofrecen los bancos.

Y creo que es algo realmente sencillo de implementar, tan solo deberían facilitar estas 3 herramientas:


1. Un gestor de eventos interno, y controladisimo lo que permitan hacer al cliente (en realidad con flujo lógico simple, operaciones matemáticas, y acceso a las siguientes herramientas, seria suficioente)
2. Un método que permita realizar transferencias, aunque sea solo a cuentas nacionales, ya sería un avance.
3. Un método que permita saber el saldo de la cuenta.


Aparte de modelar el objeto "eventData", claro... esto es solo pseudocódigo, el motivo de este post, es preguntar donde está la complejidad en implementar esto por parte de la banca.

El caso, es que solo con esto, el gestor de eventos, permitiría hacer muchísimas cosas

Por ejemplo, *para un autónomo*, hacer que cada vez que te llegue una transferencia, o ingreso, enviar directamente el IVA a otra cuenta, sería tan simple como:


```php
private function eventHandler($eventData) {
  switch ($eventData->type) {
    case 'deposit':
    case 'wiretransfer':
      $quantity = $eventData->incomeAmount * 0,21;
      $taxesAccount = "ESXXXXXXXXXXXX";
      makeNewTransfer($taxesAccount, $quantity);
      break;
  }
}

```
Y, evidentemente, esto se puede aplicar a ahorro, y a la gestión de cualquier otro tipo de eventos, como por ejemplo, que si el saldo es superior a X, enviar a una cuenta de ahorro, o directamente enviar una cantidad fija a una cuenta de ahorro, tal que:

```php
private function eventHandler($eventData) {
  switch ($eventData->type) {
    case 'deposit':
    case 'wiretransfer':
      $quantity =
      $taxesAccount = "ESXXXXXXXXXXXX"
      makeNewTransfer($taxesAccount, $quantity);
      $saveAccount="EXYYYYYYYYY";
      $quantity = $eventData->incomeAmount * 0,10;

      if $eventData->currentBalance>=2000 {
        $quantity = $eventData->currentBalance - 2000;
        makeNewTransfer($saveAccount, $quantity);  
      }

      break;
  }
}

```
Se que es codigo espaguetti, y que hasta el orden lógico es erróneo, pero creo que es más fácil de leer para no programadores.

La pregunta es... ¿es tan dificil implementar algo así?

***
No olvides compartir el post si te ha gustado
