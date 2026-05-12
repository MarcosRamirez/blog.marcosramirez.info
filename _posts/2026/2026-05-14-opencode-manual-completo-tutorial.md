---
title: "OpenCode: Manual Completo - Guía Definitiva del Agente de Coding"
slug: opencode-manual-completo-tutorial
date: 2026-05-14 08:30:00 +0200
excerpt: "Manual completo de OpenCode: instalación, configuración, modelos, agentes, MCP, GitHub integration y casos de uso prácticos. La guía más detallada del agente de coding open-source."
authors:
  - Marcos Ramírez
  - Lucía
categories:
  - Tecnología
  - Inteligencia Artificial
  - Software y Apps
tags:
  - terminal
  - programación
  - inteligencia-artificial
  - herramientas
  - desarrollo
  - tutorial
image: /assets/img/headers/2026/opencode-manual-nanobanana.webp
image_alt: "Interfaz de configuración de OpenCode en terminal TUI mostrando agentes, modelos y opciones avanzadas"
toc: true
pin: false
twitter_description: "Manual completo de OpenCode: guía definitiva del agente de coding open-source. Instalación, config, agentes, MCP y más."
description: "Manual completo de OpenCode: guía definitiva del agente de coding open-source. Instalación, configuración, modelos, agentes, MCP y casos de uso."
permalink: /:slug/
---

![{{ page.image_alt }}]({{ page.image }})

## Introducción

Este manual cubre todo lo que necesitas saber para dominar OpenCode, desde la instalación hasta las configuraciones más avanzadas. Si ya leíste mi [review y comparativa con competidores](/opencode-review-comparativa-competidores-2026/), este artículo profundiza en la parte técnica.

OpenCode es un agente de coding open-source que funciona como CLI, aplicación de escritorio o extensión de IDE. Soporta más de 75 proveedores de modelos y puede usarse completamente gratis.

## Instalación

### Requisitos previos

- Node.js 18.0.0 o superior
- Git
- Docker (opcional, solo si quieres agentes en contenedores sandbox)

### Métodos de instalación

```bash
# Opción 1: npm (recomendado)
npm install -g @opencode-ai/cli

# Opción 2: pnpm
pnpm add -g @opencode-ai/cli

# Opción 3: Homebrew (macOS/Linux)
brew install opencode

# Opción 4: Script de instalación
curl -sL https://opencode.ai/install.sh | bash
```

### Verificar instalación

```bash
opencode --version
```

Deberías ver un número de versión (ej: v0.12.0). Si ves un error, asegúrate de que Node.js está actualizado.

### Inicialización

```bash
opencode init
```

Este comando interactivo te guiará para:

1. **Default Model Provider**: Elige 'OpenCode Zen' (recomendado para comenzar) o 'Ollama' (si prefieres modelos locales)
2. **Sandbox Mode**: Recomendado 'On' para tareas de refactoring extensivas
3. **Plugins**: Selecciona los plugins por defecto a instalar

## Configuración

### Estructura de archivos de configuración

OpenCode busca configuración en este orden (los posteriores sobrescriben los anteriores):

1. **Remote config** (`.well-known/opencode`) — Defaults organizacionales
2. **Global config** (`~/.config/opencode/opencode.json`) — Preferencias de usuario
3. **Custom config** (`OPENCODE_CONFIG` env var) — Override personalizado
4. **Project config** (`opencode.json` en la raíz del proyecto) — Config específica del proyecto
5. **Directorio `.opencode`** — Agentes, commands, plugins

### Configuración global

Edita `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-20250514",
  "provider": "anthropic"
}
```

### Configuración por proyecto

Crea `opencode.json` en la raíz de tu proyecto:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "openai/gpt-4o",
  "instructions": [
    "AGENTS.md",
    "docs/style-guide.md"
  ],
  "mcp": {
    "github": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-github"],
      "enabled": true
    }
  }
}
```

### Variables de entorno

```bash
# Para modelos de Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."

# Para modelos de OpenAI
export OPENAI_API_KEY="sk-..."

# Para usar un config específico
export OPENCODE_CONFIG=/path/to/custom/config.json

# Para usar un directorio de config específico
export OPENCODE_CONFIG_DIR=/path/to/config/directory
```

## Modelos y Proveedores

### Proveedores soportados (75+)

| Proveedor | Modelos disponibles | Notas |
|-----------|-------------------|-------|
| **Anthropic** | Claude Haiku, Sonnet, Opus | Mejor calidad de código |
| **OpenAI** | GPT-4o, GPT-4 Turbo, GPT-4 | Integración nativa |
| **Google** | Gemini 1.5 Pro, Flash | 1M contexto disponible |
| **Groq** | Llama 3, Mixtral | Velocidad rápida |
| **Azure OpenAI** | Modelos de Azure | Para empresas |
| **AWS Bedrock** | Claude, Llama, Titan | Para ecosistema AWS |
| **Ollama** | Modelos locales (Llama, CodeQwen, etc.) | Privacidad total |
| **OpenRouter** | 100+ modelos | Agregador |

### Modelos gratuitos

OpenCode incluye modelos gratuitos que funcionan sin configurar nada:

| Modelo | Descripción | Uso recomendado |
|--------|-------------|-----------------|
| **Big Pickle** | GLM 4.5 (equivalente) | Tareas simples |
| **MiniMax M2.5 Free** | Capacidad completa con límites | Uso diario básico |
| **Ling 2.6 Flash Free** | Rápido y ligero | Debugging rápido |
| **Nemotron 3 Super Free** | Nuevo modelo de NVIDIA | Pruebas rápidas |

### Precios de OpenCode

| Plan | Precio | Modelos | Ideal para |
|------|--------|---------|------------|
| **OpenCode Core** | **Gratis** | Gratuitos + BYOK | Todos |
| **OpenCode Go** | 5 USD/1er mes, luego 10 USD/mes | GLM-5, Kimi K2.5, MiniMax M2.7, Qwen3, DeepSeek V4 | Uso regular |
| **OpenCode Zen** | 20 USD crédito mínimo (pay-as-you-go) | Modelos curados | Control de gastos |
| **OpenCode Black** | 20-200 USD/mes (pausado) | Premium | Enterprise |

### Elegir el modelo adecuado

```json
{
  "model": "openai/gpt-4o"
}
```

Para cambiar el modelo durante una sesión:

```bash
/model anthropic/claude-sonnet-4-20250514
```

## Sistema de Agentes

### Agentes primarios

**Build** (defecto): Desarrollo completo con todas las herramientas habilitadas.

**Plan**: Análisis sin modificaciones. Ideal para:
- Estudiar código antes de tocarlo
- Planificar refactors complejos
- Revisiones architecturales

Cambiar entre agentes con `Tab`:

```
[Build] > [Plan] > [Build] > ...
```

### Subagentes

**Explore**: Explora el codebase de forma readonly.

Invocarlo:
```
@explore encuentra todos los archivos que usan autenticación JWT
```

**General**: Asistente general para tareas diversas.

### Comandos incorporados

| Comando | Uso |
|---------|-----|
| `/init` | Inicializar proyecto con AGENTS.md |
| `/code-review [archivo]` | Revisión de código |
| `/generate-tests [archivo]` | Generar tests |
| `/security-audit [scope]` | Auditoría de seguridad |
| `/refactor-plan [módulo]` | Plan de refactorización |
| `/plan-project [feature]` | Plan multi-fase |
| `/share` | Compartir sesión |
| `/undo` | Deshacer último cambio |
| `/redo` | Rehacer |
| `/models` | Ver modelos disponibles |
| `/connect` | Conectar proveedor |

### Ejecutar comandos directamente

Usa el prefijo `!` para ejecutar comandos de shell directamente sin pasar por el agente:

```
!ls -la
!npm test
!git status
```

Esto es útil para:
- Comandos rápidos que no necesitan contexto del agente
- Verificar el estado actual del proyecto
- Ejecutar scripts o comandos cortos

El agente continuará su trabajo mientras el comando se ejecuta en segundo plano.

### Crear agentes personalizados

```bash
opencode agent create
```

Comando interactivo que:
1. Pregunta dónde guardar (global o proyecto)
2. Descripción del agente
3. Genera prompt e identificador
4. Selecciona permisos (lo que no seleccionas se deniega)
5. Crea archivo markdown con configuración

Ejemplo de agente personalizado en `opencode.json`:

```json
{
  "agent": {
    "code-reviewer": {
      "description": "Revisa código buscando bugs y seguridad",
      "mode": "subagent",
      "model": "anthropic/claude-sonnet-4-20250514",
      "permission": {
        "edit": "deny",
        "bash": "deny",
        "read": "allow"
      }
    }
  }
}
```

## Interfaz TUI

### Áreas de la pantalla

- **Chat**: Área principal para interactuar con el agente
- **Diff**: Vista de cambios en tiempo real
- **Status bar**: Información del modelo, sesión, tokens

### Keyboard shortcuts

| Atajo | Acción |
|-------|--------|
| `Tab` | Cambiar entre agentes primarios |
| `Ctrl+C` | Interrumpir agente |
| `Ctrl+D` | Salir |
| `Ctrl+G` | Abrir en editor externo |
| `Enter` | Enviar mensaje |
| `Shift+Enter` | Nueva línea en el chat |

### Temas

Configurar tema en `opencode.json`:

```json
{
  "theme": "default-dark"
}
```

Temas disponibles: `default-dark`, `default-light`, `gruvbox`, `nord`, `dracula`.

## MCP (Model Context Protocol)

### ¿Qué es MCP?

MCP es un estándar abierto que permite a OpenCode conectar con herramientas externas: bases de datos, APIs, sistemas de archivos, y más.

### Configurar MCP servers

**Local (en `opencode.json`):**

```json
{
  "mcp": {
    "filesystem": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "/ruta/a/proyecto"],
      "enabled": true
    },
    "github": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-github"],
      "environment": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_tu_token"
      },
      "enabled": true
    }
  }
}
```

**Remoto:**

```json
{
  "mcp": {
    "mi-server-remoto": {
      "type": "remote",
      "url": "https://tu-servidor.com/mcp",
      "enabled": true,
      "headers": {
        "Authorization": "Bearer tu_api_key"
      }
    }
  }
}
```

### MCP servers populares

| Server | Descripción |
|--------|-------------|
| **GitHub** | Issues, PRs, repos |
| **PostgreSQL** | Consultas a DB |
| **Filesystem** | Acceso a archivos |
| **Memory** | Memoria persistente |
| **Puppeteer** | Automatización browser |

### Verificar MCPs configurados

```bash
opencode mcp list
```

## GitHub Integration

### Instalación

```bash
opencode github install
```

Esto instala la GitHub App, crea el workflow, y configura los secrets.

### Configuración manual

1. Instalar la GitHub App en github.com/apps/opencode-agent
2. Añadir workflow en `.github/workflows/opencode.yml`:

```yaml
name: opencode

on:
  issue_comment:
    types: [created]
  pull_request:
    types: [opened, synchronize]

jobs:
  opencode:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
      pull-requests: write
      issues: read
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 1
          persist-credentials: false

      - uses: anomalyco/opencode/github@latest
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        with:
          model: anthropic/claude-sonnet-4-20250514
```

### Eventos soportados

| Evento | Trigger | Uso |
|--------|---------|-----|
| `issue_comment` | `/opencode` o `/oc` en comentario | Responder issues |
| `pull_request_review_comment` | Comentario en líneas de código | Revisión específica |
| `issues` | Issue creada/editada | Auto-triage |
| `pull_request` | PR abierto/actualizado | Auto-review |
| `schedule` | Cron | Tareas periódicas |
| `workflow_dispatch` | Manual desde UI | Bajo demanda |

### Ejemplo: Auto-review en PR

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
        with:
          persist-credentials: false

      - uses: anomalyco/opencode/github@latest
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        with:
          model: anthropic/claude-sonnet-4-20250514
          prompt: |
            Review this pull request:
            - Check for code quality issues
            - Look for potential bugs
            - Suggest improvements
```

## Integración con IDE

### Aplicación de escritorio

Descarga desde [opencode.ai](https://opencode.ai){:target="_blank" rel="nofollow noopener"}. Funciona como interfaz completa sin necesidad de terminal.

### VS Code

Instala la extensión desde el Marketplace. Proporciona:
- Chat contextual
- Inline completions
- Diff view
- Historial de conversación

### JetBrains

Disponible para IntelliJ, PyCharm, WebStorm, etc. Mismas features que VS Code.

## AGENTS.md

### Qué es AGENTS.md

Similar a CLAUDE.md de Claude Code o .cursorrules de Cursor. Es un archivo que da contexto persistente a OpenCode sobre tu proyecto.

### Ubicaciones

| Alcance | Ruta |
|---------|------|
| **Global** | `~/.config/opencode/AGENTS.md` |
| **Proyecto** | `AGENTS.md` en raíz |

### Ejemplo de AGENTS.md

```markdown
# Reglas del Proyecto

## Estilo de código
- Usar TypeScript siempre que sea posible
- Preferir const sobre let
- Usar ESLint con configuración estándar

## Testing
- Tests unitarios obligatorios para nuevas funciones
- Correr tests antes de hacer commit

## Git
- Commits siguiendo Conventional Commits
- Branches: feature/, bugfix/, hotfix/

## Comandos útiles
- `npm run dev` — Iniciar servidor de desarrollo
- `npm test` — Correr tests
- `npm run lint` — Verificar código
```

### Alternatives

Si no existe `AGENTS.md`, OpenCode también lee:
- `CLAUDE.md`
- `.cursorrules`

## Casos de uso prácticos

### Debugging rápido

```
El test de login está fallando con "Cannot read property of undefined". Encuentra dónde está el error y propón una solución.
```

### Añadir nueva feature

```
Quiero añadir autenticación con JWT al endpoint /api/users. Crea la estructura necesaria, los middleware de verificación, y los tests correspondientes.
```

### Code review

```
/code-review src/auth/
```

### Generar tests

```
/generate-tests src/utils/date.ts
```

### Planificar refactor

```
/refactor-plan src/controllers/
```

## Troubleshooting

### Error: "Command not found"

Asegúrate de que OpenCode está en tu PATH:
```bash
export PATH="$PATH:$(npm root -g)/@opencode-ai/cli"
```

Añade esta línea a tu `.bashrc` o `.zshrc` para persistir el cambio.

### Error: "Model not found"

Verifica que el modelo existe:
```bash
/models
```

Asegúrate de que el nombre del modelo está bien escrito. Algunos modelos requieren el formato completo: `anthropic/claude-sonnet-4-20250514`.

### Error: "API key not found"

Configura tu API key:
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

Para verificar que la key está configurada correctamente:
```bash
echo $ANTHROPIC_API_KEY
```

Si usas múltiples proveedores, asegúrate de exportar la variable correcta para el modelo que estás usando.

### Problemas de rendimiento

- Usa modelos más rápidos para tareas simples (Haiku, Flash)
- Activa auto-compact para sesiones largas
- Limita el contexto usando `/clear` periódicamente
- Considera usar modelos locales con Ollama para tareas que no requieren modelos frontier

### Sesiones que crecen demasiado

Si una sesión se vuelve muy larga, usa `/clear` para empezar de nuevo o usa la función de auto-compact que OpenCode ejecuta automáticamente cuando se acerca al límite de contexto. También puedes usar el agente Plan para analizar el código sin incrementar el contexto de la sesión principal.

### WSL2 en Windows

OpenCode funciona mejor en WSL2. Instala en la distribución Linux:
```bash
npm install -g @opencode-ai/cli
```

Luego ejecuta desde WSL, no desde PowerShell. Si experimentas problemas de rendimiento, aumenta la memoria asignada a WSL en `.wslconfig`.

### Errores con MCP

Si un MCP server no funciona, verifica:
1. Que está habilitado en `opencode.json`
2. Que el comando existe y está instalado (ej: `npx -y @modelcontextprotocol/server-github`)
3. Que las variables de entorno requeridas están configuradas
4. Que el timeout es suficiente (por defecto 5 segundos, aumenta si es necesario):
```json
{
  "mcp": {
    "server-name": {
      "timeout": 30000
    }
  }
}
```

<section id="faq">

## Preguntas frecuentes

<details>
<summary>¿Cómo empezar si no tengo experiencia con la terminal?</summary>

OpenCode tiene aplicación de escritorio y extensión de IDE. Puedes usarlos sin tocar la terminal. La CLI es opcional.
</details>

<details>
<summary>¿Puedo usar mis propias API keys?</summary>

Sí, OpenCode soporta BYOK (Bring Your Own Keys). Solo configura tus API keys como variables de entorno o en opencode.json.
</details>

<details>
<summary>¿Qué modelo debería usar?</summary>

Para tareas simples: modelos gratuitos o Flash. Para desarrollo general: Claude Sonnet o GPT-4o. Para tareas complejas: Opus 4.7 o el mejor modelo disponible.
</details>

<details>
<summary>¿OpenCode envía mi código a servidores externos?</summary>

Solo si usas modelos en la nube (Anthropic, OpenAI, etc.). Si usas Ollama para modelos locales, el código nunca sale de tu máquina.
</details>

<details>
<summary>¿Cómo configurarlo para un equipo?</summary>

Crea un `opencode.json` en el proyecto con reglas específicas del equipo, usa `.well-known/opencode` para defaults organizacionales, y AGENTS.md para contexto del proyecto.
</details>

<details>
<summary>¿MCP es seguro?</summary>

MCP usa el estándar de Anthropic. Los servers locales son seguros; los remotos dependen de la configuración. Siempre revisa la documentación del server.
</details>

<details>
<summary>¿Puedo usar OpenCode con otros agentes como Claude Code?</summary>

Sí, son herramientas complementarias. Usa OpenCode para flexibilidad y precio, Claude Code cuando necesites máxima calidad de código.
</details>

</section>

---

*Este manual complementa mi [review y comparativa](/opencode-review-comparativa-competidores-2026/) donde analizo OpenCode vs la competencia.*

Compártelo si te ha resultado útil.

Si lo necesitas a nivel profesional en tu empresa, [puedo ayudarte](https://marcosramirez.dev/contacto/){:target="_blank"}.

Y... hasta aquí por hoy!