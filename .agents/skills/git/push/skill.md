---
name: git-push
description: Directrices para ejecutar `git push` únicamente bajo petición explícita.
---

## REGLA FUNDAMENTAL
**NUNCA** ejecutar `git push` automáticamente.  
El push solo se realiza cuando el usuario lo indique explícitamente (p. ej., “Haz push a `main`”).

## PASOS RECOMENDADOS CUANDO SE SOLICITE EL PUSH
1. Verificar el estado con `git status`.
2. Confirmar que todos los cambios estén commitados.
3. Ejecutar `git push <remote> <branch>` según la solicitud del usuario.
4. Si ocurre un error, informar al usuario y solicitar nueva instrucción.

## NOTAS ADICIONALES
- Si el push falla, no reintentar sin permiso.
- No combinar `push` con `commit` en la misma instrucción a menos que el usuario lo autorice expresamente.