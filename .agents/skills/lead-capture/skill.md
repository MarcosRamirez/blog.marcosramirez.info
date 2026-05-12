---
name: lead-capture
description: Defines CTA strategy, service catalog, tier rules, and ready-to-use copy for every post. Load this skill whenever writing or editing a post to determine the correct CTA type and text.
compatibility: Designed for Claude Code
metadata:
  author: marcos-ramirez
  version: "1.1"
---

# Lead Capture Skill

## Service Catalog

### 1. Verifactu / Ley Antifraude
**Price:** **GRATUITA** (loss-leader — the goal is to open the door to AI and software services)
**What:** Analysis of the business's current billing setup + recommendation of the best certified Verifactu-compliant software for their specific needs.
**Target:** Any Spanish business or autónomo that needs to comply with the Verifactu electronic invoicing regulation.
**Value proposition:** "Te digo exactamente qué software necesitas para cumplir con Verifactu, sin coste y sin compromiso."
**CTA destination:** `https://marcosramirez.dev/consultoria-gratuita/` (free consultation landing page)
**Upsell path:** Once trust is established → propose AI implementation or custom software services.

### 2. Inteligencia Artificial para negocios
**Price:** Quoted per project
**What:** Development and implementation of practical AI solutions for SMEs: customer chatbots, process automation, document processing, customer service tools, internal assistants.
**Target:** Small businesses and local businesses (restaurants, shops, clinics, services) that want to use AI but don't know how or where to start.
**Value proposition:** "Implementamos Inteligencia Artificial en tu negocio de forma práctica, sin tecnicismos y con resultados reales."

### 3. Digitalización y Sistemas
**Price:** Quoted per project
**What:** Digital transformation of business operations: ERP, CRM, and POS system selection and implementation, process automation, workflow digitalization.
**Target:** SMEs that still rely on paper, spreadsheets, or fragmented tools and want to streamline operations.
**Value proposition:** "Digitalizamos tu negocio con las herramientas correctas para tu tamaño y presupuesto — sin tecnicismos y sin pagar por lo que no necesitas."

### 4. Presencia Online
**Price:** Quoted per project
**What:** Complete online visibility strategy: Google My Business setup and optimization, WhatsApp Business integration, web presence, local SEO.
**Target:** Local businesses (restaurants, shops, clinics) that aren't visible online or aren't converting their online presence into customers.
**Value proposition:** "Te ayudo a que tus clientes te encuentren fácilmente en Google y a convertir tu presencia digital en más negocio real."

### 5. Desarrollo Web y Programación
**Price:** Quoted per project (95% of clients only pay hosting/domain after delivery)
**What:** Custom websites, web applications, desktop and mobile apps. Built exactly for the business's needs — no bloated CMS, no unnecessary features.
**Target:** SMEs that need a custom digital solution not covered by off-the-shelf platforms.
**Value proposition:** "Desarrollo el software exacto que tu negocio necesita, sin pagar por funcionalidades que no vas a usar."

### 6. Diseño Gráfico
**Price:** Quoted per project
**What:** Visual identity, menus, posters, flyers, social media graphics, web design.
**Target:** Local businesses that want to stand out visually and need professional materials without an agency budget.
**Value proposition:** "Diseño materiales gráficos profesionales para tu negocio — desde el menú hasta la identidad visual completa."

### 7. Seguridad Informática
**Price:** Quoted per project
**What:** Security assessments, vulnerability analysis, infrastructure hardening, password and backup management, incident response advisory, security training, and security review for development teams.
**Target:** Companies running self-hosted infrastructure (GitHub Enterprise, Linux servers, containers, CI/CD pipelines) that need to evaluate and improve their security posture.
**Value proposition:** "Evaluamos y reforzamos la seguridad de tu infraestructura, con foco en riesgos reales y soluciones prácticas."

### 8. Consultoría y Asesoría
**Price:** 125€/hora (consultoría puntual) · desde 200€/mes básico / 450€/mes estándar (asesoría continuada). Ver tarifas completas en https://marcosramirez.dev/tarifas
**What:** General IT guidance, tech stack evaluation, digitalization roadmap, vendor selection, ongoing advisory. For businesses that have no technical knowledge and need trustworthy advice on everyday tech decisions.
**Target:** Small local businesses (restaurants, shops, clinics) with zero tech background who don't know who to ask.
**Value proposition:** "Te ayudo a tomar decisiones tecnológicas correctas sin perder tiempo ni dinero — cobro por hora y sin permanencias."

---

## Ideal Client Profile (ICP)

- Business owner or manager in Spain, non-technical
- Local businesses: restaurants, shops, clinics, professional services
- SMEs wanting to modernize, automate, or comply with new regulations
- Has a real business problem but no internal tech team

**Language rule for CTAs:** Always address as "tu negocio" or "tu empresa" — never just "tú". This filters out hobbyists and signals that the offer is for business contexts.

---

## CTA Tier System

Every post uses exactly ONE tier. Never mix tiers in the same post.

### TIER 1 — BUSINESS
**When to use:** The post is written for business owners, OR covers a topic directly tied to a service (Verifactu, AI for business, digitalization, automation for SMEs).
**Contact link:** Yes
**Placement:**
- 1 standalone CTA block at the end of the post (before the closing signature)
- Optionally 1 brief mid-post mention at the most relevant point (only for posts over 1500 words)
- **Hard limit: maximum 2 contact links per post**

**Format:**
```
[Qualifying sentence framing the business problem]

[CTA with link — from the copy library below]
```

### TIER 2 — SOFT
**When to use:** The post is technical and written for developers or enthusiasts, but covers a topic that COULD interest a business client secondarily (AI tools, automation, web development).
**Contact link:** Yes — 1 single line at the very end, after "Compártelo si te ha resultado útil."
**Placement:** End only. Never mid-post.

**Format:** A single short sentence with the link, no buildup.

### TIER 3 — COMMUNITY
**When to use:** Hobby tech (home lab, media servers, self-hosting), personal finance, opinion posts not tied to any service. The post attracts enthusiasts, not potential clients.
**Contact link:** No
**Placement:** 1 casual question or invitation at the end.

**Format:** A question or comment invitation with no link.

### TIER 4 — SILENT
**When to use:** Personal category posts, pure personal reflections, anything where a CTA would feel out of place.
**Contact link:** No
**Placement:** None — just the signature line.

---

## Topic → Tier Mapping

**Audience detection rule first:** If the post uses CLI commands, configuration files, container names, or any content that assumes a technical background → SOFT at most, even if the topic is AI or automation. If the post is written in plain language aimed at business owners → BUSINESS.

| Post topic / category | Tier | Service to reference |
|----------------------|------|----------------------|
| Verifactu, facturación electrónica, compliance fiscal | BUSINESS | Verifactu / Ley Antifraude |
| Inteligencia Artificial para negocios (business-framed) | BUSINESS | Inteligencia Artificial |
| Automatización de procesos (business-framed, non-technical) | BUSINESS | Digitalización y Sistemas |
| Digitalización pymes, ERP, CRM, TPV, gestión empresarial | BUSINESS | Digitalización y Sistemas |
| Presencia Online, Google My Business, WhatsApp Business | BUSINESS | Presencia Online |
| Negocios y Digitalización category posts | BUSINESS | Digitalización y Sistemas + IA |
| Inteligencia Artificial (tech-enthusiast framing, tools/models) | SOFT | Inteligencia Artificial |
| Automatización (developer/homelab framing, CLI-heavy) | SOFT | Desarrollo Web y Programación |
| Desarrollo Web, APIs, coding tutorials | SOFT | Desarrollo Web y Programación |
| Diseño gráfico, identidad visual | SOFT | Diseño Gráfico |
| Seguridad Informática (CVE, vulnerabilidades, hardening, auditoría) | SOFT | Seguridad Informática |
| Sistemas, Home Lab, Self-hosting, Proxmox, Docker (sin Seguridad Informática) | COMMUNITY | — |
| Software y Apps (tool reviews, no business framing) | COMMUNITY | — |
| Finanzas Personales | COMMUNITY | — |
| Reflexiones y Opinión | SILENT | — |
| Personal (main category) | SILENT | — |

---

## CTA Copy Library

Rotate copies — do NOT use the same CTA text in two consecutive posts.

### Verifactu CTAs — always mention FREE explicitly

```
¿Tu negocio todavía no está adaptado a Verifactu? Hago un análisis **gratuito** de tu situación y te recomiendo la solución que mejor encaja contigo, sin compromiso. [Escríbeme y lo vemos juntos](https://marcosramirez.dev/consultoria-gratuita/){:target="_blank"}.
```

```
Si no sabes qué software necesitas para cumplir con Verifactu, puedo orientarte sin coste. [Cuéntame tu caso](https://marcosramirez.dev/consultoria-gratuita/){:target="_blank"} y te digo exactamente qué opciones tienes.
```

```
La adaptación a Verifactu tiene fecha límite. Si tu negocio todavía no lo tiene resuelto, [escríbeme](https://marcosramirez.dev/consultoria-gratuita/){:target="_blank"} — hago el análisis de forma **gratuita** y te recomiendo qué solución se adapta mejor a ti.
```

### Inteligencia Artificial para negocios CTAs

```
¿Quieres aplicar Inteligencia Artificial en tu negocio pero no sabes por dónde empezar? [Escríbeme](https://marcosramirez.dev/contacto/){:target="_blank"} y vemos qué solución tiene sentido para tu caso concreto.
```

```
Si tu empresa quiere implementar Inteligencia Artificial de forma práctica y sin tecnicismos, [hablemos](https://marcosramirez.dev/contacto/){:target="_blank"}.
```

```
¿Quieres automatizar procesos en tu negocio con Inteligencia Artificial? [Cuéntame qué haces](https://marcosramirez.dev/contacto/){:target="_blank"} y te digo qué se puede hacer.
```

### Digitalización y Sistemas CTAs

```
Si tu negocio sigue gestionando pedidos, facturas o inventario con Excel o papel, hay soluciones mejores. [Cuéntame cómo trabajas](https://marcosramirez.dev/contacto/){:target="_blank"} y te propongo qué herramientas encajan con tu tamaño y presupuesto.
```

### Presencia Online CTAs

```
¿Tu negocio no aparece en Google cuando alguien busca lo que ofreces? [Hablamos](https://marcosramirez.dev/contacto/){:target="_blank"} y revisamos cómo mejorar tu visibilidad online.
```

### Desarrollo Web y Programación CTAs

```
¿Necesitas una solución de software específica para tu negocio? [Cuéntame qué necesitas](https://marcosramirez.dev/contacto/){:target="_blank"} y lo valoramos juntos.
```

### Diseño Gráfico CTAs

```
¿Tu negocio necesita materiales gráficos profesionales sin pagar precios de agencia? [Escríbeme](https://marcosramirez.dev/contacto/){:target="_blank"} y lo vemos.
```

### Seguridad Informática CTAs

```
¿Tu empresa necesita reforzar su seguridad informática? [Hablamos](https://marcosramirez.dev/contacto/){:target="_blank"}.
```

```
Si gestionas infraestructura y quieres revisar tu postura de seguridad, [cuéntame tu situación](https://marcosramirez.dev/contacto/){:target="_blank"}.
```

```
¿Necesitas ayuda para evaluar o endurecer la seguridad de tu infraestructura? [Escríbeme](https://marcosramirez.dev/contacto/){:target="_blank"}.
```

### Consultoría y Asesoría CTAs

```
¿Tu negocio necesita orientación tecnológica pero no sabes a quién preguntar? [Escríbeme](https://marcosramirez.dev/contacto/){:target="_blank"} — cobro por hora (125€/h) y sin permanencias.
```

```
Si tienes dudas sobre qué tecnología usar en tu empresa, [cuéntame tu situación](https://marcosramirez.dev/contacto/){:target="_blank"} y te ayudo a tomar la mejor decisión.
```

### SOFT CTAs (Tier 2 — single line, low pressure)

```
Si lo necesitas a nivel profesional en tu empresa, [puedo ayudarte](https://marcosramirez.dev/contacto/){:target="_blank"}.
```

```
¿Lo necesitas para tu empresa? [Escríbeme](https://marcosramirez.dev/contacto/){:target="_blank"}.
```

```
Si tu empresa necesita implementar esto, [hablamos](https://marcosramirez.dev/contacto/){:target="_blank"}.
```

---

## Rules

1. **Maximum 2 contact links per post** — never more, regardless of post length.
2. **Never mix community invite and business CTA in the same sentence** — "Deja un comentario o escríbeme para implementarlo en tu empresa" is forbidden. Pick one purpose.
3. **Verifactu posts must always mention the free offer explicitly** — never just "contacta" without the gratuita qualifier.
4. **SOFT tier: end only** — a soft CTA never appears mid-post.
5. **COMMUNITY and SILENT tiers have no contact link** — not even a soft mention.
6. **Vary the copy** — rotate through the library, never repeat the same CTA text in back-to-back posts.

---

## CTA Destinations

All services are on `marcosramirez.dev`. No `rel="nofollow"` needed on any of these (own domain).

- **All services (contact):** `https://marcosramirez.dev/contacto/` — Inteligencia Artificial, Digitalización y Sistemas, Presencia Online, Desarrollo Web y Programación, Diseño Gráfico, Seguridad Informática, Consultoría y Asesoría
- **Verifactu / free consultation:** `https://marcosramirez.dev/consultoria-gratuita/` — always use this for Verifactu posts, never `/contacto/`
