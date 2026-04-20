#!/usr/bin/env node
/**
 * Genera una imagen usando proveedores gratuitos en cadena.
 * Si uno falla por rate limit, pasa al siguiente automáticamente.
 *
 * Proveedores (en orden de prioridad):
 *   1. Pollinations.ai  — sin registro, sin API key
 *   2. Hugging Face     — requiere cuenta gratuita y HF_TOKEN en variables de entorno
 *
 * Uso:
 *   node generate-cover.js --prompt "A futuristic city" --output "assets/img/headers/mi-post.webp"
 *   node generate-cover.js --prompt "..." --output "..." --width 1200 --height 630
 *
 * Variables de entorno opcionales:
 *   HF_TOKEN — token de Hugging Face (https://huggingface.co/settings/tokens)
 *
 * Códigos de salida:
 *   0  - Éxito
 *   1  - Error de uso (faltan parámetros)
 *   2  - Todos los proveedores agotados (el agente debe parar y avisar al usuario)
 *   3  - Error de red o timeout en un proveedor (se reintenta con el siguiente)
 *   4  - Error inesperado
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const EXIT = {
    OK: 0,
    BAD_USAGE: 1,
    ALL_FAILED: 2,
    NETWORK_ERROR: 3,
    UNEXPECTED: 4,
};

const DEFAULT_WIDTH = 1900;
const DEFAULT_HEIGHT = 478;

// ── CLI args ──────────────────────────────────────────────────────────────────

function parseArgs() {
    const args = process.argv.slice(2);
    const params = {};
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith("--")) {
            const key = args[i].slice(2);
            const value = args[i + 1] && !args[i + 1].startsWith("--") ? args[++i] : true;
            params[key] = value;
        }
    }
    return params;
}

function exit(code, message, provider) {
    const out = { status: code === EXIT.OK ? "SUCCESS" : "ERROR", code, message };
    if (provider) out.provider = provider;
    console.log(JSON.stringify(out));
    process.exit(code);
}

// ── HTTP helpers ──────────────────────────────────────────────────────────────

function httpGet(url, destPath, timeoutMs = 60000) {
    return new Promise((resolve, reject) => {
        const proto = url.startsWith("https") ? https : http;
        const file = fs.createWriteStream(destPath);

        const req = proto.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                file.close();
                fs.unlinkSync(destPath);
                return httpGet(res.headers.location, destPath, timeoutMs).then(resolve).catch(reject);
            }
            if (res.statusCode === 429 || res.statusCode === 503) {
                file.close();
                fs.unlinkSync(destPath);
                return reject({ rateLimited: true, message: `HTTP ${res.statusCode}` });
            }
            if (res.statusCode !== 200) {
                file.close();
                fs.unlinkSync(destPath);
                return reject({ rateLimited: false, message: `HTTP ${res.statusCode}` });
            }
            res.pipe(file);
            file.on("finish", () => file.close(resolve));
        });

        req.setTimeout(timeoutMs, () => {
            req.destroy();
            file.close();
            if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
            reject({ rateLimited: false, message: `Timeout tras ${timeoutMs / 1000}s` });
        });

        req.on("error", (err) => {
            if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
            reject({ rateLimited: false, message: err.message });
        });
    });
}

function httpPost(url, headers, body, destPath, timeoutMs = 60000) {
    return new Promise((resolve, reject) => {
        const bodyBuffer = Buffer.from(JSON.stringify(body));
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname,
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
                "Content-Length": bodyBuffer.length,
            },
        };

        const file = fs.createWriteStream(destPath);
        const req = https.request(options, (res) => {
            if (res.statusCode === 429 || res.statusCode === 503) {
                file.close();
                fs.unlinkSync(destPath);
                return reject({ rateLimited: true, message: `HTTP ${res.statusCode}` });
            }
            if (res.statusCode === 402) {
                file.close();
                fs.unlinkSync(destPath);
                return reject({ rateLimited: true, message: `HTTP 402 - créditos agotados` });
            }
            if (res.statusCode !== 200) {
                // Lee el body del error para dar más info
                let errBody = "";
                res.on("data", (d) => (errBody += d));
                res.on("end", () => {
                    file.close();
                    if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
                    reject({ rateLimited: false, message: `HTTP ${res.statusCode}: ${errBody.slice(0, 200)}` });
                });
                return;
            }
            res.pipe(file);
            file.on("finish", () => file.close(resolve));
        });

        req.setTimeout(timeoutMs, () => {
            req.destroy();
            file.close();
            if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
            reject({ rateLimited: false, message: `Timeout tras ${timeoutMs / 1000}s` });
        });

        req.on("error", (err) => {
            if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
            reject({ rateLimited: false, message: err.message });
        });

        req.write(bodyBuffer);
        req.end();
    });
}

// ── Proveedores ───────────────────────────────────────────────────────────────

async function tryPollinations(prompt, output, width, height) {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&model=flux`;
    await httpGet(url, output);
}

async function tryHuggingFace(prompt, output, width, height) {
    const token = process.env.HF_TOKEN;
    if (!token) throw { rateLimited: false, message: "HF_TOKEN no definido, se omite Hugging Face" };

    const url = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";
    await httpPost(
        url,
        { Authorization: `Bearer ${token}` },
        { inputs: prompt, parameters: { width, height } },
        output
    );
}

// ── Cadena de proveedores ─────────────────────────────────────────────────────

const PROVIDERS = [
    { name: "Pollinations.ai", fn: tryPollinations },
    { name: "Hugging Face (FLUX.1-schnell)", fn: tryHuggingFace },
];

async function generateWithFallback(prompt, output, width, height) {
    const errors = [];

    for (const provider of PROVIDERS) {
        console.error(`[${provider.name}] Intentando...`);
        try {
            await provider.fn(prompt, output, width, height);
            return provider.name; // éxito
        } catch (err) {
            const msg = err.message || String(err);
            console.error(`[${provider.name}] Falló: ${msg}`);
            errors.push(`${provider.name}: ${msg}`);
            // Continúa al siguiente proveedor tanto si es rate limit como error de red
        }
    }

    // Todos fallaron
    throw new Error(`Todos los proveedores fallaron:\n${errors.join("\n")}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
    const args = parseArgs();
    const { prompt, output } = args;

    if (!prompt || !output) {
        exit(EXIT.BAD_USAGE, "Uso: node generate-cover.js --prompt <descripción> --output <ruta.webp> [--width 1900] [--height 478]");
    }

    const width = parseInt(args.width) || DEFAULT_WIDTH;
    const height = parseInt(args.height) || DEFAULT_HEIGHT;

    try {
        fs.mkdirSync(path.dirname(output), { recursive: true });
    } catch (err) {
        exit(EXIT.UNEXPECTED, `No se pudo crear el directorio de salida: ${err.message}`);
    }

    try {
        const usedProvider = await generateWithFallback(prompt, output, width, height);
        exit(EXIT.OK, `Imagen guardada en: ${output}`, usedProvider);
    } catch (err) {
        exit(EXIT.ALL_FAILED, `No se pudo generar la imagen. ${err.message}`);
    }
}

main().catch((err) => {
    exit(EXIT.UNEXPECTED, `Error inesperado: ${err.message}`);
});
