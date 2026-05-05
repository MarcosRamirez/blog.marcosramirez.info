---
name: lead-capture
description: Defines CTA strategy, service catalog, tier rules, and ready-to-use copy for every post. Load this skill whenever writing or editing a post to determine the correct CTA type and text.
compatibility: Designed for Claude Code
metadata:
  author: marcos-ramirez
  version: "1.0"
---

# Lead Capture Skill

## Service Catalog

### 1. Consultoría Verifactu
**Price:** **GRATUITA** (loss-leader — the goal is to open the door to AI and software services)
**What:** Analysis of the business's current billing setup + recommendation of the best certified Verifactu-compliant software for their specific needs.
**Target:** Any Spanish business or autónomo that needs to comply with the Verifactu electronic invoicing regulation.
**Value proposition:** "Te digo exactamente qué software necesitas para cumplir con Verifactu, sin coste y sin compromiso."
**Upsell path:** Once trust is established → propose AI implementation or custom software services.

### 2. Inteligencia Artificial para negocios
**Price:** Quoted per project
**What:** Development and implementation of practical AI solutions for SMEs: customer chatbots, process automation, document processing, customer service tools, internal assistants.
**Target:** Small businesses and local businesses (restaurants, shops, clinics, services) that want to use AI but don't know how or where to start.
**Value proposition:** "Implementamos Inteligencia Artificial en tu negocio de forma práctica, sin tecnicismos y con resultados reales."

### 3. Software a medida
**Price:** Quoted per project
**What:** Custom web applications, internal management tools, business automation systems.
**Target:** SMEs that need specific software not covered by off-the-shelf solutions.
**Value proposition:** "Desarrollo el software exacto que tu negocio necesita, sin pagar por funcionalidades que no vas a usar."

### 4. Consultoría tech general
**Price:** **Por hora** (no subscriptions, no lock-in)
**What:** General IT guidance, tech stack evaluation, digitalization roadmap, vendor selection. For businesses that have no technical knowledge and need trustworthy advice on everyday tech decisions.
**Target:** Small local businesses (restaurants, shops, clinics) with zero tech background who don't know who to ask.
**Value proposition:** "Te ayudo a tomar decisiones tecnológicas correctas sin perder tiempo ni dinero — cobro por hora y sin permanencias."

### 5. Seguridad Informática
**Price:** Quoted per project
**What:** Security assessments, vulnerability analysis, infrastructure hardening, incident response advisory, and security review for development teams.
**Target:** Companies running self-hosted infrastructure (GitHub Enterprise, Linux servers, containers, CI/CD pipelines) that need to evaluate and improve their security posture.
**Value proposition:** "Evaluamos y reforzamos la seguridad de tu infraestructura, con foco en riesgos reales y soluciones prácticas."
**CTA destination:** `https://marcosramirez.dev` (security services live here)

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
| Verifactu, facturación electrónica, compliance fiscal | BUSINESS | Consultoría Verifactu |
| Inteligencia Artificial para negocios (business-framed) | BUSINESS | IA para negocios |
| Automatización de procesos (business-framed, non-technical) | BUSINESS | IA para negocios / Software |
| Digitalización pymes, tecnología para empresas | BUSINESS | Consultoría tech general |
| Negocios y Digitalización category posts | BUSINESS | Consultoría tech general + IA |
| Inteligencia Artificial (tech-enthusiast framing, tools/models) | SOFT | IA para negocios |
| Automatización (developer/homelab framing, CLI-heavy) | SOFT | Software a medida |
| Desarrollo Web, APIs, coding tutorials | SOFT | Software a medida |
| Seguridad Informática (CVE, vulnerabilidades, hardening, auditoría) | SOFT | Seguridad Informática (marcosramirez.dev) |
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
¿Tu negocio todavía no está adaptado a Verifactu? Hago un análisis **gratuito** de tu situación y te recomiendo la solución que mejor encaja contigo, sin compromiso. [Escríbeme y lo vemos juntos](https://marcosramirez.info/contacto/){:target="_blank"}.
```

```
Si no sabes qué software necesitas para cumplir con Verifactu, puedo orientarte sin coste. [Cuéntame tu caso](https://marcosramirez.info/contacto/){:target="_blank"} y te digo exactamente qué opciones tienes.
```

```
La adaptación a Verifactu tiene fecha límite. Si tu negocio todavía no lo tiene resuelto, [escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} — hago el análisis de forma **gratuita** y te recomiendo qué solución se adapta mejor a ti.
```

### Inteligencia Artificial para negocios CTAs

```
¿Quieres aplicar Inteligencia Artificial en tu negocio pero no sabes por dónde empezar? [Escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} y vemos qué solución tiene sentido para tu caso concreto.
```

```
Si tu empresa quiere implementar Inteligencia Artificial de forma práctica y sin tecnicismos, [hablemos](https://marcosramirez.info/contacto/){:target="_blank"}.
```

```
¿Quieres automatizar procesos en tu negocio con Inteligencia Artificial? [Cuéntame qué haces](https://marcosramirez.info/contacto/){:target="_blank"} y te digo qué se puede hacer.
```

### Consultoría tech general CTAs

```
¿Tu negocio necesita orientación tecnológica pero no sabes a quién preguntar? [Escríbeme](https://marcosramirez.info/contacto/){:target="_blank"} — cobro por hora y sin permanencias.
```

```
Si tienes dudas sobre qué tecnología usar en tu empresa, [cuéntame tu situación](https://marcosramirez.info/contacto/){:target="_blank"} y te ayudo a tomar la mejor decisión.
```

### Software a medida CTAs

```
¿Necesitas una solución de software específica para tu negocio? [Cuéntame qué necesitas](https://marcosramirez.info/contacto/){:target="_blank"} y lo valoramos juntos.
```

### Seguridad Informática CTAs (use marcosramirez.dev)

```
¿Tu empresa necesita reforzar su seguridad informática? [Hablamos](https://marcosramirez.dev/){:target="_blank"}.
```

```
Si gestionas infraestructura y quieres revisar tu postura de seguridad, [cuéntame tu situación](https://marcosramirez.dev/){:target="_blank"}.
```

```
¿Necesitas ayuda para evaluar o endurecer la seguridad de tu infraestructura? [Escríbeme](https://marcosramirez.dev/){:target="_blank"}.
```

### SOFT CTAs (Tier 2 — single line, low pressure)

```
Si lo necesitas a nivel profesional en tu empresa, [puedo ayudarte](https://marcosramirez.info/contacto/){:target="_blank"}.
```

```
¿Lo necesitas para tu empresa? [Escríbeme](https://marcosramirez.info/contacto/){:target="_blank"}.
```

```
Si tu empresa necesita implementar esto, [hablamos](https://marcosramirez.info/contacto/){:target="_blank"}.
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

- **Security services:** `https://marcosramirez.dev` — use for all Seguridad Informática posts. No `rel="nofollow"` needed (own domain).
- **All other services:** `https://marcosramirez.info/contacto/` — Verifactu, IA, Software a medida, Consultoría tech.

When `marcosramirez.dev` expands beyond security: migrate other services progressively.
