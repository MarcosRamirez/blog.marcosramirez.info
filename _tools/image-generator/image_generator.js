#!/usr/bin/env node
/**
 * Generador de Imágenes para Blog Marcos Ramírez
 * 
 * Prioridad de proveedores:
 * 1. Nano Banana (Google Vertex AI - Imagen 3)
 * 2. Pollinations.ai
 * 3. Hugging Face
 * 
 * Incluye recorte automático a 1900x478px usando Sharp.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Cargar variables de entorno desde el archivo .env aislado
require('dotenv').config({ path: path.join(__dirname, '.env') });


// Intentamos cargar dependencias externas
let GoogleGenAI, sharp;
try {
    ({ GoogleGenAI } = require('@google/genai'));
    sharp = require('sharp');
} catch (e) {
    console.error("⚠️ Faltan dependencias. Ejecuta 'npm install' en _tools/image-generator/");
}

const DEFAULT_WIDTH = 1900;
const DEFAULT_HEIGHT = 478;

// ── Helpers ───────────────────────────────────────────────────────────────────

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

/**
 * Recorta y redimensiona la imagen a las dimensiones exactas del blog.
 */
async function postProcessImage(inputPath, outputPath, width, height) {
    if (!sharp) {
        console.warn("⚠️ Sharp no instalado. Saltando recorte automático.");
        if (inputPath !== outputPath) fs.renameSync(inputPath, outputPath);
        return;
    }

    await sharp(inputPath)
        .resize(width, height, {
            fit: 'cover',
            position: 'center'
        })
        .toFile(outputPath);
    
    // Si la ruta era temporal, borramos el original
    if (inputPath.includes('temp_')) {
        try { fs.unlinkSync(inputPath); } catch (e) {}
    }
}

// ── Proveedores ───────────────────────────────────────────────────────────────

async function tryNanoBanana(prompt, tempOutput) {
    if (!GoogleGenAI) throw new Error("Dependencia @google/genai no disponible");
    
    const projectId = process.env.GCP_PROJECT_ID;
    if (!projectId) throw new Error("GCP_PROJECT_ID no definido en el entorno");

    const ai = new GoogleGenAI({ 
        vertexai: true, 
        project: projectId, 
        location: 'us-central1' 
    });

    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-001',
        prompt: prompt,
        config: {
            numberOfImages: 1,
            aspectRatio: '16:9'
        }
    });
    
    if (response && response.generatedImages && response.generatedImages.length > 0) {
        const base64Image = response.generatedImages[0].image.imageBytes;
        fs.writeFileSync(tempOutput, Buffer.from(base64Image, 'base64'));
    } else {
        throw new Error("Respuesta vacía de Nano Banana");
    }
}

function tryPollinations(prompt, tempOutput, width, height) {
    return new Promise((resolve, reject) => {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&model=flux`;
        const file = fs.createWriteStream(tempOutput);
        https.get(url, (res) => {
            if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
            res.pipe(file);
            file.on('finish', () => file.close(resolve));
        }).on('error', reject);
    });
}

async function tryHuggingFace(prompt, tempOutput, width, height) {
    const token = process.env.HF_TOKEN;
    if (!token) throw new Error("HF_TOKEN no definido");

    const url = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";
    const body = JSON.stringify({ inputs: prompt, parameters: { width, height } });

    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        };
        const file = fs.createWriteStream(tempOutput);
        const req = https.request(url, options, (res) => {
            if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
            res.pipe(file);
            file.on('finish', () => file.close(resolve));
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
    const args = parseArgs();
    const { prompt, output } = args;
    const width = parseInt(args.width) || DEFAULT_WIDTH;
    const height = parseInt(args.height) || DEFAULT_HEIGHT;

    if (!prompt || !output) {
        console.log(JSON.stringify({ status: "ERROR", code: 1, message: "Faltan --prompt o --output" }));
        process.exit(1);
    }

    const tempOutput = path.join(path.dirname(output), `temp_${Date.now()}.png`);
    const providers = [
        { name: "Nano Banana", fn: tryNanoBanana },
        { name: "Pollinations.ai", fn: tryPollinations },
        { name: "Hugging Face", fn: tryHuggingFace }
    ];

    let success = false;
    let usedProvider = "";

    for (const p of providers) {
        try {
            console.error(`[${p.name}] Intentando...`);
            await p.fn(prompt, tempOutput, width, height);
            usedProvider = p.name;
            success = true;
            break;
        } catch (e) {
            console.error(`[${p.name}] Falló: ${e.message}`);
        }
    }

    if (!success) {
        console.log(JSON.stringify({ status: "ERROR", code: 2, message: "Todos los proveedores fallaron" }));
        process.exit(2);
    }

    try {
        await postProcessImage(tempOutput, output, width, height);
        console.log(JSON.stringify({ 
            status: "SUCCESS", 
            code: 0, 
            message: `Imagen guardada en: ${output}`, 
            provider: usedProvider,
            processed: !!sharp
        }));
    } catch (e) {
        console.log(JSON.stringify({ status: "ERROR", code: 4, message: `Error en post-procesado: ${e.message}` }));
        process.exit(4);
    }
}

main();
