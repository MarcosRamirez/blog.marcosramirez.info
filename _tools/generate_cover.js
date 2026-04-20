#!/usr/bin/env node
/**
 * Genera una imagen usando Pollinations.ai y la guarda en la ruta indicada.
 *
 * Uso:
 *   node generate-cover.js --prompt "A futuristic city at sunset" --output "assets/img/headers/mi-post.webp"
 *   node generate-cover.js --prompt "..." --output "..." --width 1900 --height 478
 *
 * Códigos de salida:
 *   0  - Éxito
 *   1  - Error de uso (faltan parámetros)
 *   2  - Rate limit o servicio no disponible (el agente debe parar y avisar al usuario)
 *   3  - Error de red o timeout (puede reintentarse)
 *   4  - Error inesperado
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const EXIT = {
    OK: 0,
    BAD_USAGE: 1,
    RATE_LIMITED: 2,
    NETWORK_ERROR: 3,
    UNEXPECTED: 4,
};

const DEFAULT_WIDTH = 1900;
const DEFAULT_HEIGHT = 478;

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

function exit(code, message) {
    console.log(JSON.stringify({ status: code === EXIT.OK ? "SUCCESS" : "ERROR", code, message }));
    process.exit(code);
}

function download(url, destPath) {
    return new Promise((resolve, reject) => {
        const proto = url.startsWith("https") ? https : http;
        const file = fs.createWriteStream(destPath);

        const req = proto.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                file.close();
                fs.unlinkSync(destPath);
                return download(res.headers.location, destPath).then(resolve).catch(reject);
            }
            if (res.statusCode === 429 || res.statusCode === 503) {
                file.close();
                fs.unlinkSync(destPath);
                return reject({ code: EXIT.RATE_LIMITED, message: `Servicio no disponible (HTTP ${res.statusCode}). Rate limit alcanzado o servicio caído. No se pueden generar más imágenes ahora.` });
            }
            if (res.statusCode !== 200) {
                file.close();
                fs.unlinkSync(destPath);
                return reject({ code: EXIT.NETWORK_ERROR, message: `Error HTTP ${res.statusCode}. Puede reintentarse.` });
            }
            res.pipe(file);
            file.on("finish", () => file.close(resolve));
        });

        req.setTimeout(30000, () => {
            req.destroy();
            file.close();
            if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
            reject({ code: EXIT.NETWORK_ERROR, message: "Timeout tras 30s. Puede reintentarse." });
        });

        req.on("error", (err) => {
            if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
            reject({ code: EXIT.NETWORK_ERROR, message: `Error de red: ${err.message}. Puede reintentarse.` });
        });
    });
}

async function main() {
    const args = parseArgs();
    const { prompt, output } = args;

    if (!prompt || !output) {
        exit(EXIT.BAD_USAGE, "Uso: node generate-cover.js --prompt <descripción> --output <ruta.webp> [--width 1900] [--height 478]");
    }

    const width = parseInt(args.width) || DEFAULT_WIDTH;
    const height = parseInt(args.height) || DEFAULT_HEIGHT;

    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&model=flux`;

    try {
        fs.mkdirSync(path.dirname(output), { recursive: true });
    } catch (err) {
        exit(EXIT.UNEXPECTED, `No se pudo crear el directorio de salida: ${err.message}`);
    }

    try {
        await download(url, output);
        exit(EXIT.OK, `Imagen guardada en: ${output}`);
    } catch (err) {
        exit(err.code ?? EXIT.UNEXPECTED, err.message ?? `Error inesperado`);
    }
}

main();