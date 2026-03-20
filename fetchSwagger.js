import 'dotenv/config';
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import http from "http";
import https from "https";
import { parse as parseUrl } from "url";

// Résoudre le chemin __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Récupérer la variable d'environnement
const swaggerUrl = process.env.SWAGGER_URL;

console.log("SWAGGER_URL =", swaggerUrl);

if (!swaggerUrl) {
    console.error("❌ Error: SWAGGER_URL environment variable is not defined.");
    process.exit(1);
}

// Parser l'URL pour détecter le protocole
const urlObj = parseUrl(swaggerUrl);
const client = urlObj.protocol === "https:" ? https : http;

console.log(`📥 Fetching swagger spec from: ${swaggerUrl}`);

client.get(swaggerUrl, (res) => {
    if (res.statusCode !== 200) {
        console.error(`❌ Failed to fetch swagger spec. Status Code: ${res.statusCode}`);
        res.resume();
        process.exit(1);
    }

    let data = "";
    res.on("data", (chunk) => {
        data += chunk;
    });

    res.on("end", () => {
        fs.writeFileSync(`${__dirname}/public/swagger.json`, data);
        console.log("✅ Swagger spec saved to public/swagger.json");
    });
}).on("error", (e) => {
    console.error(`❌ Error fetching swagger spec: ${e.message}`);
    process.exit(1);
});