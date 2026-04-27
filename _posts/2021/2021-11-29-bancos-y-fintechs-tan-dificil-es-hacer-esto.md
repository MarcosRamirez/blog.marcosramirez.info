---
title: "Bancos y Fintechs ¿tan dificil es hacer esto?"
slug: bancos-y-fintechs-tan-dificil-es-hacer-esto
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2021-11-29 08:50:00 +0100
image: /assets/img/headers/2021/transferenciasautomaticas-nanobanana.webp
categories: [Finanzas Personales]
tags: [Bancos y Fintech, Automatización]
pin: false
toc: true
excerpt: "Cuestiono la falta de herramientas de automatización avanzada en el sector bancario y fintech para la gestión de finanzas personales. Los bancos podrían implementar fácilmente un gestor de eventos que permitiera automatizar transferencias según condiciones: enviar el IVA a otra cuenta automáticamente al recibir ingresos, o transferir el excedente a ahorro cuando el saldo supere cierto umbral. La pregunta es: ¿es tan difícil implementar algo así? N26 ofrece algo parecido en sus planes premium, pero solo entre sus espacios y con coste mínimo de 4,9€/mes."
twitter_description: "Automatización de transferencias en bancos: por qué no podemos configurar reglas simples?"
permalink: /:slug/
---

![Post Header]({{ page.image }})

*Disclaimer*: Sé que [N26](https://n26.com/r/marcosr8764){:target="_blank"} ofrece algo parecido a esto en sus planes premium, pero:
1. Solo lo ofrece entre sus espacios (no tienen IBAN propio, ni puedes transferir a otro IBAN/Cuenta)
2. Solo lo ofrece en sus cuentas premium (mínimo 4,9€ al mes)  
---


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
      $quantity = $eventData->incomeAmount - ($eventData->incomeAmount / 1,21); 
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

Compártelo si te ha gusta. ¿Conoces algún banco que permita esto? Cuéntame.

Y... hasta aquí por hoy!
