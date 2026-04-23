---
name: copywriting-links
description: Normas completas para insertar enlaces en posts del blog.
---

## Skill: Enlaces en Posts

### 1. Regla Principal
**CADA software, servicio, herramienta o marca que menciones DEBE tener un enlace** a su web oficial.

### 2. Lista Blanca de Dominios Propios (NO requieren nofollow ni noopener)
Los siguientes dominios son propios y solo necesitan `target="_blank"`:
- `marcosramirez.info`
- `marcosramirez.dev`
- `saasquatch.es`

**Formato para enlaces propios:** `[Texto](URL){:target="_blank"}`

### 3. Enlaces Externos (Requieren seguridad)
Cualquier dominio que NO esté en la lista blanca anterior es externo.

**Formato:** `[Texto](URL){:target="_blank" :rel="nofollow noopener"}`

Esto es obligatorio por seguridad y para evitar pasar "link juice" a sitios externos.

### 4. Cuándo Poner Enlaces
- **La primera vez que menciones** algo, debe llevar enlace.
- Las menciones posteriores pueden no tenerlo.
- Ejemplo correcto: "Uso [AdGuard Home](https://adguard.com/){:target="_blank" :rel="nofollow noopener"} para bloquear publicidad"

### 5. Enlaces Internos (Entre Posts del Blog)
- Si en el cuerpo del post se menciona un tema que ya fue tratado en otro post del blog, enlázalo.
- Usa el tag nativo de Jekyll: `{% post_url YYYY-MM-DD-slug %}`
- **Todos los enlaces (internos y externos) deben tener** `{:target="_blank"}`
- El nombre del archivo debe usar guiones en lugar de espacios:
  - ✅ `{% post_url 2025-03-01-Resumen-Febrero-2025 %}`
  - ❌ `{% post_url 2025-03-01-Resumen Febrero 2025 %}`
- Si no encuentras un post que encaje con claridad, no inventes el enlace.

### 6. Resumen de Formatos

| Tipo de enlace | Formato |
|----------------|---------|
| Dominio propio | `[Texto](URL){:target="_blank"}` |
| Dominio externo | `[Texto](URL){:target="_blank" :rel="nofollow noopener"}` |
| Enlace interno (Jekyll) | `[Texto]({% post_url YYYY-MM-DD-slug %}){:target="_blank"}` |

### 7. Ejemplos

**Correcto - Enlace externo:**
```markdown
[btop](https://github.com/aristocratos/btop){:target="_blank" :rel="nofollow noopener"} es un monitor de sistema moderno.
```

**Correcto - Enlace a dominio propio:**
```markdown
Echa un vistazo a [mi post sobre Home Assistant]({% post_url 2026-06-01-home-assistant-tu-cerebro-de-domotica %}){:target="_blank"} para más detalles.
```

**Correcto - Enlace interno:**
```markdown
[Post anterior]({% post_url 2025-03-01-resumen-febrero-2025 %}){:target="_blank"}
```

### 8. Normas de SEO
- Los enlaces externos deben tener `rel="nofollow noopener"` por seguridad y para no perder autoridad.
- Los enlaces internos ayudan al SEO y a la navegación del usuario.
- Los enlaces propios NO deben tener nofollow ni noopener - son del mismo sitio.
- No abuses de los enlaces externos - solo enlaza cuando sea relevante y aporta valor.