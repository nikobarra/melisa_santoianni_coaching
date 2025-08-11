#!/usr/bin/env node

/**
 * VERCEL BUILD SCRIPT
 * Script personalizado para el despliegue en Vercel
 * Evita problemas con el procesamiento de CSS
 */

const fs = require("fs");
const path = require("path");

console.log("🚀 Starting Vercel build process...");

// Verificar que la carpeta public existe
const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) {
    console.error("❌ Error: public/ directory not found");
    process.exit(1);
}

// Verificar archivos críticos
const criticalFiles = [
    "public/index.html",
    "public/css/styles.css",
    "public/js/main.js",
    "public/js/content-loader.js",
    "public/js/vercel-analytics.js",
    "public/structure/content.json",
];

let allFilesExist = true;
criticalFiles.forEach((file) => {
    if (fs.existsSync(path.join(__dirname, file))) {
        console.log(`✅ ${file} - OK`);
    } else {
        console.error(`❌ ${file} - MISSING`);
        allFilesExist = false;
    }
});

if (!allFilesExist) {
    console.error("❌ Some critical files are missing");
    process.exit(1);
}

// Verificar que el contenido JSON es válido
try {
    const contentPath = path.join(__dirname, "public/structure/content.json");
    const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
    console.log(
        `✅ content.json is valid (${content.sections.length} sections)`
    );
} catch (error) {
    console.error("❌ content.json is invalid:", error.message);
    process.exit(1);
}

// Mostrar estadísticas del proyecto
const stats = {
    htmlFiles: 0,
    cssFiles: 0,
    jsFiles: 0,
    imageFiles: 0,
    totalSize: 0,
};

function scanDirectory(dir, prefix = "") {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            scanDirectory(filePath, prefix + file + "/");
        } else {
            const ext = path.extname(file).toLowerCase();
            const size = stat.size;
            stats.totalSize += size;

            switch (ext) {
                case ".html":
                    stats.htmlFiles++;
                    break;
                case ".css":
                    stats.cssFiles++;
                    break;
                case ".js":
                    stats.jsFiles++;
                    break;
                case ".png":
                case ".jpg":
                case ".jpeg":
                case ".gif":
                case ".svg":
                case ".webp":
                    stats.imageFiles++;
                    break;
            }
        }
    });
}

scanDirectory(publicDir);

console.log("\n📊 Project Statistics:");
console.log(`   HTML files: ${stats.htmlFiles}`);
console.log(`   CSS files: ${stats.cssFiles}`);
console.log(`   JS files: ${stats.jsFiles}`);
console.log(`   Image files: ${stats.imageFiles}`);
console.log(`   Total size: ${(stats.totalSize / 1024).toFixed(2)} KB`);

console.log("\n✅ Build completed successfully!");
console.log("🌟 Ready for deployment to Vercel");

process.exit(0);
