---
title: "Cómo reducir el consumo de tokens en Claude Code y ahorrar dinero"
slug: reducir-consumo-tokens-claude-code
authors:
  - "Marcos Ramírez"
  - "Lucía"
date: 2026-05-02 08:30:00 +0200
image: /assets/img/headers/2026/reducir-consumo-tokens-claude-code-nanobanana.webp
image_alt: "Terminal con Claude Code mostrando métricas de consumo de tokens"
categories: [Tecnología, Inteligencia Artificial]
tags: [eficiencia, optimización, herramientas-desarrollo, productividad, context-management, ahorro]
pin: false
toc: true
excerpt: "Guía completa con 13 reglas para reducir el consumo de tokens en Claude Code y cualquier asistente de código con Inteligencia Artificial. Incluye instrucciones detalladas para cada regla que puedes aplicar hoy mismo para ahorrar entre un 40 y un 60 por ciento en tu factura mensual."
twitter_description: "13 reglas para reducir el consumo de tokens en Claude Code y ahorrar un 40-60% en tu factura."
permalink: /:slug/
description: "Optimiza el consumo de tokens en Claude Code un 40-60%. 13 reglas prácticas para ahorrar sin perder productividad. Aplicables a cualquier asistente IA."
---

![{{ page.image_alt }}]({{ page.image }})

Si usas [Claude Code](https://claude.ai/claude-code){:target="_blank" rel="nofollow noopener"} o cualquier otro asistente de código basado en Inteligencia Artificial, habrás notado que la factura se dispara rápido. No es que la herramienta sea mala, es que la forma en que interactúas con ella determina directamente cuántos tokens consumes. Y los tokens cuestan dinero.

He analizado cómo desarrolladores experimentados optimizan su uso y he compilado las técnicas más efectivas en 13 reglas. Estas reglas provienen del conjunto de instrucciones conocido como [Caveman](https://github.com/JuliusBrussee/caveman){:target="_blank" rel="nofollow noopener"}, creado por Julius Brussee y que se ha popularizado como el estándar de facto para disciplinar a los agentes de código. No son opiniones: son patrones que reducen el consumo entre un 40 y un 60 por ciento para la misma cantidad de trabajo.

## Por qué consumes tantos tokens sin darte cuenta

Antes de entrar en las reglas, es importante entender el problema. Cada vez que envías una petición a un asistente de código, el modelo no solo lee tu mensaje. Recibe **todo el historial de la conversación**, los archivos que ha leído, las definiciones de herramientas, los prompts del sistema y cualquier contexto adicional que haya acumulado. Todo eso son tokens.

Un archivo de 500 líneas consume entre 2.000 y 3.000 tokens solo al leerlo. Una sesión de 30 minutos puede consumir entre 50.000 y 150.000 tokens. A los precios actuales de los modelos de Anthropic, eso se traduce en dólares reales.

La buena noticia es que la mayoría del consumo viene de cuatro fuentes corregibles: cargar contexto de más, repetir explicaciones del proyecto, dejar que las sesiones crezcan sin control y usar prompts vagos que obligan al modelo a explorar código innecesario.

Las 13 reglas que vienen a continuación atacan cada una de estas fuentes de desperdicio. Puedes aplicarlas en Claude Code, [Cursor](https://cursor.sh/){:target="_blank" rel="nofollow noopener"}, [Cline](https://cline.bot/){:target="_blank" rel="nofollow noopener"} o cualquier agente de código que uses.

```markdown
## 1. No Coding Without Context

- BEFORE writing code: read relevant files, check git logs, and understand the architecture.
- If you lack sufficient context, ask. Do not assume.

## 2. Short Responses

- Respond in 1-3 sentences. No preambles, no final summaries.
- Do not repeat what the user said. Do not explain the obvious.
- Code speaks for itself: do not narrate every line you write.

## 3. Do Not Rewrite Entire Files

- Use Edit (partial replacement); NEVER use Write for existing files unless the change is >80% of the file.
- Change only what is necessary. Do not "clean up" surrounding code.

## 4. Do Not Reread Files

- If you have already read a file in this conversation, do not read it again unless it has changed.
- Take mental notes of the important parts during your first read.

## 5. Validate Before Declaring Done

- After a change: compile, run tests, or verify that it works.
- Never say "done" without evidence that it functions.

## 6. Zero Flattery or Small Talk

- Do not say "Great question," "Great idea," "Perfect," etc.
- Do not flatter the user. Go straight to the work.

## 7. Simple Solutions

- Implement the minimum required to solve the problem. Nothing else.
- Do not add abstractions, helpers, types, validations, or features that were not requested.
- 3 repeated lines > 1 premature abstraction.

## 8. Do Not Argue With the User

- If the user says "do it this way," do it that way. Do not debate unless there is a real security risk or data loss.
- If you disagree, mention your concern in 1 sentence and proceed with the request.

## 9. Read Only What Is Necessary

- Do not read entire files if you only need a section. Use offset and limit.
- If you know the exact path, use Read directly. Do not use Glob + Grep + Read when Read suffices.

## 10. Do Not Narrate the Plan Before Executing

- Do not say "I'm going to read the file, then modify the function, then compile..." Just do it.
- The user sees your tool calls. They do not need a text preview.

## 11. Parallelize Tool Calls

- If you need to read 3 independent files, read all 3 in a single message, not one by one.
- Fewer roundtrips = fewer accumulated context tokens.

## 12. Do Not Duplicate Code in the Response

- If you edited a file, do not copy the result into your response. The user sees it in the diff.
- If you created a file, do not display it entirely in text as well.

## 13. Do Not Use Agent When Grep/Read Suffices

- Agent duplicates the entire context in a subprocess. Only use it for broad searches or complex tasks.
- To find a specific function or file, use Grep or Glob directly.
```

## 1. No Coding Without Context

- BEFORE writing code: read relevant files, check git logs, and understand the architecture.
- If you lack sufficient context, ask. Do not assume.

**Por qué importa:** Cuando el modelo escribe código sin entender el proyecto, produce resultados que no encajan. Tú le pides que lo corrija, él lo intenta de nuevo sin contexto, falla otra vez. Cada iteración consume tokens adicionales. Un ciclo de tres intentos fallidos gasta más que leer dos archivos al principio.

**Cómo aplicarlo:** Antes de pedir cualquier cambio, dile al modelo exactamente qué archivos debe leer. Usa la sintaxis `@archivo` para referenciar archivos concretos en lugar de dejar que explore todo el proyecto. Si la tarea implica múltiples módulos, indica cuáles son relevantes desde el primer prompt.

**Ejemplo práctico:** En lugar de decir "arregla el bug de autenticación", di "lee src/auth/login.ts y src/auth/token-manager.ts, el problema está en la validación del token en la línea 42". La diferencia puede ser de 10x en consumo de tokens.

## 2. Short Responses

- Respond in 1-3 sentences. No preambles, no final summaries.
- Do not repeat what the user said. Do not explain the obvious.
- Code speaks for itself: do not narrate every line you write.

**Por qué importa:** Las respuestas largas del modelo consumen tokens de salida, que son más caros que los de entrada. Un modelo que escribe 200 palabras de explicación para un cambio de 5 líneas está quemando tokens innecesarios.

**Cómo aplicarlo:** Incluye esta instrucción en tu archivo `CLAUDE.md` o en las reglas del proyecto. Esto configura el comportamiento del modelo para toda la sesión.

**El ahorro:** Una respuesta de 3 frases en lugar de un párrafo de 15 líneas puede reducir los tokens de salida en un 70-80 por ciento por interacción. En una sesión de 50 turnos, la diferencia es brutal.

## 3. Do Not Rewrite Entire Files

- Use Edit (partial replacement); NEVER use Write for existing files unless the change is >80% of the file.
- Change only what is necessary. Do not "clean up" surrounding code.

**Por qué importa:** Cuando el modelo reescribe un archivo completo de 400 líneas para cambiar 10, estás pagando por 400 líneas de tokens de salida. El editor parcial solo envía lo que cambia.

**Cómo aplicarlo:** Especifica siempre que use editaciones parciales. En Claude Code, el modelo usa herramientas de edición por defecto, pero tiende a reescribir si el prompt es vago. Sé específico: "cambia la función X en la línea Y de archivo Z". Si el archivo es grande, indica el rango de líneas exacto.

**Dato:** Un archivo de 400 líneas reescrito consume ~2.000 tokens de salida. La misma cambio con edición parcial consume ~50 tokens. La diferencia es de 40x.

## 4. Do Not Reread Files

- If you have already read a file in this conversation, do not read it again unless it has changed.
- Take mental notes of the important parts during your first read.

**Por qué importa:** Esta es la fuente individual más grande de desperdicio de tokens. Los agentes de código releen archivos constantemente: primero para entender, luego para verificar un cambio, luego otra vez al trabajar en algo relacionado. Cada relectura consume el mismo número de tokens que la primera.

**Cómo aplicarlo:** Si estás usando Claude Code, existen hooks que bloquean relecturas redundantes. Herramientas como [read-once](https://github.com/JuliusBrussee/caveman){:target="_blank" rel="nofollow noopener"} rastrean qué archivos se han leído en la sesión y bloquean relecturas innecesarias, ahorrando entre un 60 y un 90 por ciento de tokens de lectura.

Si no usas hooks, la disciplina es manual: cuando el modelo ya haya leído un archivo, referencia su contenido directamente en lugar de pedir que lo relea. Di "en la función que leíste antes, añade X" en lugar de "lee el archivo y añade X".

## 5. Validate Before Declaring Done

- After a change: compile, run tests, or verify that it works.
- Never say "done" without evidence that it functions.

**Por qué importa:** Sin validación, los errores se descubren más tarde y requieren sesiones adicionales para corregirlos. Cada sesión adicional carga todo el contexto del proyecto otra vez. Corregir un bug que se podría haber detectado en el primer turno multiplica el coste total.

**Cómo aplicarlo:** Después de cada cambio significativo, pide al modelo que ejecute las pruebas o compile el código. En Claude Code: "ejecuta los tests del módulo auth y verifica que pasan". Si hay errores, corrígelos en la misma sesión antes de compactar o limpiar el contexto.

**El patrón:** cambio → verificación → corrección (si hace falta) → siguiente tarea. Nunca cambio → siguiente tarea → descubrir bug en producción → nueva sesión para arreglarlo.

## 6. Zero Flattery or Small Talk

- Do not say "Great question," "Great idea," "Perfect," etc.
- Do not flatter the user. Go straight to the work.

**Por qué importa:** Cada palabra de relleno consume tokens. Frases como "Excelente pregunta, déjame ayudarte con eso" o "¡Perfecto! Aquí tienes el código que necesitas" no aportan nada técnico y suman tokens en cada respuesta.

**Cómo aplicarlo:** Configúralo en tu archivo de reglas del proyecto. Añade a `CLAUDE.md`: "No uses fórmulas de cortesía. Ve directo al trabajo. Sin halagos." Esto elimina el ruido de cada respuesta del modelo de forma permanente.

**El ahorro:** Entre 20 y 50 tokens por respuesta eliminados. Parece poco, pero en una sesión de 100 turnos son entre 2.000 y 5.000 tokens que no vuelves a pagar.

## 7. Simple Solutions

- Implement the minimum required to solve the problem. Nothing else.
- Do not add abstractions, helpers, types, validations, or features that were not requested.
- 3 repeated lines > 1 premature abstraction.

**Por qué importa:** Los modelos de Inteligencia Artificial tienden a sobreingenierizar. Les pides un cambio simple y añaden interfaces, validaciones extra, helpers genéricos y patrones que nadie pidió. Todo eso son tokens de salida adicionales y, peor aún, código que luego tendrás que mantener o deshacer.

**Cómo aplicarlo:** Sé explícito en tu prompt sobre el alcance: "implementa solo lo necesario, sin abstracciones adicionales". Si el modelo añade algo que no pediste, dilo directamente: "elimina el helper X, no lo necesito".

**La regla de oro:** tres líneas repetidas cuestan menos tokens (y son más fáciles de entender) que una abstracción prematura que requiere 40 líneas de explicación y 200 tokens de contexto adicional.

## 8. Do Not Argue With the User

- If the user says "do it this way," do it that way. Do not debate unless there is a real security risk or data loss.
- If you disagree, mention your concern in 1 sentence and proceed with the request.

**Por qué importa:** Cuando el modelo discute tu enfoque en lugar de implementarlo, cada turno de debate consume tokens sin producir código útil. Una discusión de 5 turnos sobre "cuál es la mejor forma" gasta más que implementar tu solución y ajustarla después si hace falta.

**Cómo aplicarlo:** Inclúyelo en las reglas del proyecto. Si el modelo empieza a debatir, corta: "procede como indiqué". La eficiencia es más importante que tener razón en una discusión con un asistente.

## 9. Read Only What Is Necessary

- Do not read entire files if you only need a section. Use offset and limit.
- If you know the exact path, use Read directly. Do not use Glob + Grep + Read when Read suffices.

**Por qué importa:** Leer un archivo de 1.000 líneas cuando solo necesitas una función de 20 líneas es un desperdicio de ~5.000 tokens. Si además usas Glob para buscar el archivo, Grep para encontrar la función y luego Read para leerlo, estás triplicando el coste.

**Cómo aplicarlo:** Si conoces la ruta, ve directo a `Read` con `offset` y `limit`. En Claude Code puedes usar `sed` para extraer solo las líneas que necesitas:

```bash
sed -n '50,80p' archivo.ts
```

Esto envía 30 líneas al contexto en lugar de las 500 del archivo completo. La diferencia es de ~2.400 tokens por lectura.

**Cuándo sí leer completo:** solo cuando realmente necesites el contexto global, como en análisis arquitectónicos o refactorizaciones que afectan a todo el módulo.

## 10. Do Not Narrate the Plan Before Executing

- Do not say "I'm going to read the file, then modify the function, then compile..." Just do it.
- The user sees your tool calls. They do not need a text preview.

**Por qué importa:** Cada frase de planificación antes de la acción consume tokens de salida. El modelo dice lo que va a hacer y luego lo hace. El usuario ya ve las llamadas a las herramientas en tiempo real, no necesita un resumen previo.

**Cómo aplicarlo:** Configúralo en `CLAUDE.md`: "No anuncies lo que vas a hacer. Ejecuta directamente las acciones." Esta sola regla elimina un patrón de conversación completo que no aporta valor técnico.

**El ahorro:** Entre 100 y 300 tokens por turno eliminados de planificación innecesaria. En sesiones largas, el acumulado es significativo.

## 11. Parallelize Tool Calls

- If you need to read 3 independent files, read all 3 in a single message, not one by one.
- Fewer roundtrips = fewer accumulated context tokens.

**Por qué importa:** Cada turno de conversación añade tokens al historial. Si lees un archivo por turno, gastas tres turnos con sus respectivos tokens de contexto acumulativo. Si los lees en paralelo, un solo turno.

**Cómo aplicarlo:** Cuando necesites información de múltiples fuentes independientes, agrupa las lecturas en una sola petición. En lugar de:

```
Turno 1: Lee archivo A
Turno 2: Lee archivo B
Turno 3: Lee archivo C
```

Haz:

```
Turno 1: Lee archivos A, B y C en paralelo
```

**El impacto:** Tres turnos vs uno. El historial de conversación crece tres veces más lento. En sesiones de trabajo reales, esta diferencia se multiplica por cada grupo de archivos.

## 12. Do Not Duplicate Code in the Response

- If you edited a file, do not copy the result into your response. The user sees it in the diff.
- If you created a file, do not display it entirely in text as well.

**Por qué importa:** Cuando el modelo edita un archivo y además pega el resultado completo en su respuesta, estás pagando dos veces por los mismos tokens. La edición ya queda registrada en el diff visible, no hace falta repetirlo.

**Cómo aplicarlo:** Instruye al modelo explícitamente: "no copies el código editado en tu respuesta. El diff es suficiente". Si crea un archivo nuevo, no lo muestres entero en texto además de escribirlo.

**El ahorro:** Un archivo de 200 líneas duplicado en la respuesta son ~1.000 tokens adicionales. En una sesión con 10 ediciones, son 10.000 tokens que no necesitas.

## 13. Do Not Use Agent When Grep/Read Suffices

- Agent duplicates the entire context in a subprocess. Only use it for broad searches or complex tasks.
- To find a specific function or file, use Grep or Glob directly.

**Por qué importa:** El modo Agente lanza un subproceso que duplica todo el contexto: prompts del sistema, archivos cargados, historial. Para buscar una función concreta, es como enviar un ejército a buscar una llave.

**Cómo aplicarlo:** Usa búsquedas directas siempre que sepas qué buscas:

- **Grep** para encontrar contenido dentro de archivos
- **Glob** para encontrar archivos por patrón de nombre
- **Read** con ruta directa cuando conoces el archivo

Reserva el modo Agente para tareas que realmente requieren exploración autónoma: "encuentra todos los endpoints de la API que usan autenticación JWT" o "refactoriza todos los callbacks a async/await en el directorio src/api/".

**El impacto:** Un subagente duplica el contexto. Si tu contexto actual ocupa 30.000 tokens, el subagente consume 60.000 antes de hacer nada. Un Grep directo consume menos de 1.000.

## Técnicas adicionales específicas de Claude Code

Las 13 reglas anteriores son universales y aplican a cualquier asistente de código. Pero si usas específicamente Claude Code, hay comandos y configuraciones que multiplican el ahorro.

### Usa `/compact` cuando el contexto supere el 50%

El comando `/compact` resume el historial de la conversación, eliminando detalles innecesarios mientras preserva la información clave. Una sesión que ha acumulado 20.000 tokens de historial puede comprimirse a 2.000-3.000 tokens.

**Cuándo usarlo:**
- Cuando el uso de contexto supera el 50%
- Después de completar una tarea y antes de empezar otra relacionada
- Tras una serie de lecturas de archivos que generaron mucho output
- Cuando las respuestas empiezan a ser más lentas

**Cuándo NO usarlo:** si necesitas que el modelo recuerde detalles finos como mensajes de error específicos o diffs de código. En ese caso, guarda lo crítico en `CLAUDE.md` antes de compactar.

### Usa `/clear` al cambiar de tarea

Si terminaste una tarea y vas a empezar algo no relacionado, usa `/clear`. Borra completamente el historial y empieza desde cero. El contexto de tu bug fix no sirve para construir una feature nueva, pero se incluye en cada petición si no limpias.

**La diferencia:** `/compact` resume, `/clear` borra. Usa `/compact` dentro de la misma tarea, `/clear` entre tareas diferentes.

### Mantén `CLAUDE.md` limpio y conciso

El archivo `CLAUDE.md` se carga en cada sesión automáticamente. Bien escrito, elimina la necesidad de repetir contexto del proyecto. Mal escrito, se convierte en un impuesto de tokens por cada petición.

**Reglas para un `CLAUDE.md` eficiente:**
- Máximo 200-500 tokens (50-150 líneas)
- Solo incluye información estable: stack tecnológico, convenciones, patrones arquitectónicos
- No incluyas ejemplos de código largos (referencia archivos específicos cuando sea necesario)
- No incluyas contenido que cambia frecuentemente
- Una instrucción imperativa por línea: "usa TypeScript strict mode", no "creemos que strict mode lleva a mejor código"

Un `CLAUDE.md` de 30 líneas cuesta ~200 tokens por sesión. Sin él, el modelo gasta 2.000-5.000 tokens redescubriendo la misma información cada vez.

### Usa `.claudeignore` para excluir archivos innecesarios

Al igual que `.gitignore`, el archivo `.claudeignore` evita que Claude Code lea archivos que no debería tocar: artefactos de build, lock files, código generado, dependencias vendorizadas.

**Contenido mínimo recomendado:**

```
node_modules/
dist/
build/
*.lock
.env*
```

Sin `.claudeignore`, un Grep recursivo puede escanear accidentalmente todo `node_modules`, quemando 80.000 tokens antes de que te des cuenta.

### Elige el modelo correcto para cada tarea

No todas las tareas necesitan el modelo más potente. Un patrón práctico:

- **Opus**: decisiones de arquitectura, debugging complejo, refactorizaciones multi-fichero
- **Sonnet**: el 80% del trabajo diario — features, bug fixes, tests
- **Haiku**: formateo, boilerplate, preguntas simples

Cambiar de Opus a Sonnet para trabajo rutinario reduce los costes diarios un 60% sin pérdida perceptible de calidad.

### Usa `--print` para preguntas puntuales

Para preguntas de un solo turno o generación de código simple, el flag `--print` (`-p`) ejecuta Claude sin iniciar una sesión interactiva. Obtienes la respuesta y el proceso termina. Cero acumulación de contexto.

```bash
claude -p "¿Cuál es la firma de la función formatDate en src/utils/helpers.ts?"
```

### Habla en inglés al agente

Puede resultar contraintuitivo, pero escribir los prompts en inglés ahorra tokens. Los modelos de Inteligencia Artificial están entrenados principalmente en inglés, lo que significa dos cosas:

1. **Respuestas más cortas:** Cuando le escribes en español, el modelo consume tokens extra traduciendo internamente y generando la respuesta en español (que tiende a ser más largo que el inglés para el mismo contenido). Escribir en inglés elimina esa capa de traducción.

2. **Mayor precisión al primer intento:** Al estar el modelo más cómodo en su idioma nativo, entiende mejor los matices técnicos y produce código correcto más rápido. Menos iteraciones = menos tokens.

**Cómo aplicarlo:** No necesitas ser bilingüe. Los prompts técnicos en inglés suelen ser simples y directos. En lugar de:

```
Añade validación de email a la función de registro
```

Escribe:

```
Add email validation to the register function
```

La diferencia es mínima en esfuerzo, pero el ahorro en tokens se acumula en cada interacción.

### Planifica con el mejor modelo, ejecuta con el más barato

No todas las fases de una tarea necesitan el mismo nivel de inteligencia. Separar planificación de ejecución es una de las técnicas con mayor ratio ahorro/impacto.

**La estrategia:**

1. **Planificación (modelo caro):** Usa Opus o el modelo más potente para analizar el problema, diseñar la arquitectura y crear un plan paso a paso. Este es el momento donde el razonamiento profundo importa.
2. **Ejecución (modelo barato):** Toma el plan y ejecútalo con Sonnet o Haiku. Cada paso ya está definido, no hace falta razonamiento complejo, solo seguir instrucciones.

**Por qué funciona:** Opus cuesta aproximadamente 5-10x más que Sonnet por token. Si usas Opus para todo, estás pagando tarifa premium para que rellene un `if` o añada un `try-catch`. Si usas Sonnet para planificar, probablemente necesite más iteraciones porque el plan tendrá lagunas. La combinación óptima es: cerebro caro para pensar, manos baratas para ejecutar.

**Ejemplo práctico:**

```
# Paso 1: Opus
"Analyze the auth module and create a step-by-step plan
to migrate from JWT to session-based auth. List each
file to modify and what changes are needed."

# Paso 2: Copia el plan → Sonnet
"Execute step 1 of this plan: [pegar paso 1]"

# Paso 3: Sonnet
"Execute step 2 of this plan: [pegar paso 2]"
```

**El ahorro:** Un plan que cuesta ~2.000 tokens con Opus ($0.03) te ahorra ejecutar toda la tarea con Opus (~50.000 tokens, $0.75). La ejecución con Sonnet cuesta ~30.000 tokens ($0.09). Total: $0.12 vs $0.75. Un 84% de ahorro.

### Monitorea tu consumo con `/cost`

Ejecuta `/cost` al final de cada sesión. Esto construye intuición sobre cuánto debería costar cada tipo de tarea. Cuando una tarea pequeña cuesta 15x lo normal, lo notas inmediatamente en lugar de descubrirlo en la factura de fin de mes.

## Tabla resumen de técnicas y ahorro estimado

| Técnica | Ahorro estimado | Esfuerzo |
|---------|----------------|----------|
| `/clear` entre tareas | 30-50% | Bajo |
| `/compact` al 50% de contexto | 20-30% | Bajo |
| No releer archivos | 40-60% de tokens de lectura | Medio |
| `CLAUDE.md` conciso | 500-2.000 tokens/sesión | Bajo |
| `.claudeignore` | 2.000-80.000 tokens/evitar | Muy bajo |
| Planifica con caro, ejecuta con barato | 70-85% en coste | Medio |
| Modelo adecuado por tarea | 40-75% en coste | Bajo |
| Prompts en inglés | 10-20% por interacción | Bajo |
| Prompts específicos | 50-80% en exploración | Medio |
| `--print` para preguntas simples | 100% de overhead de sesión | Muy bajo |

Combinando estas técnicas, la mayoría de desarrolladores logran una reducción del 40 al 60 por ciento en su consumo de tokens sin reducir la cantidad de trabajo que producen.

## Preguntas frecuentes

<details>
<summary>¿Cuánto dinero se puede ahorrar optimizando tokens?</summary>

Depende de tu volumen de uso. Un desarrollador que gasta 15 dólares diarios en Claude Code puede bajar a 6-9 dólares con estas técnicas. Eso son entre 180 y 270 dólares al mes. La inversión es solo cambiar hábitos de uso, no pagar herramientas adicionales.

</details>

<details>
<summary>¿Estas reglas aplican a otros asistentes además de Claude Code?</summary>

Sí. Las 13 reglas principales son universales y aplican a Cursor, Cline, GitHub Copilot, Codex y cualquier agente de código. Los comandos específicos como `/compact` o `/clear` son de Claude Code, pero los conceptos (compactar contexto, limpiar entre tareas, elegir modelo) existen en todas las herramientas con otros nombres.

</details>

<details>
<summary>¿Merece la pena optimizar si tengo un plan ilimitado?</summary>

Aunque no pagues directamente por tokens, los planes tienen límites de tasa (rate limits) por ventana de tiempo. Consumir menos tokens significa que puedes hacer más trabajo dentro de los mismos límites. La optimización no es solo ahorro económico, es productividad.

</details>

<details>
<summary>¿Cuál es la técnica que más ahorra?</summary>

Prevenir relecturas de archivos es la que más impacto individual tiene, seguida de limpiar el contexto entre tareas con `/clear`. Si solo aplicas dos cosas, que sean estas. El resto suma de forma incremental.

</details>

***

Compártelo si te ha resultado útil.

Si lo necesitas a nivel profesional en tu empresa, [puedo ayudarte](https://marcosramirez.info/contacto/){:target="_blank"}.

Y... hasta aquí por hoy!
