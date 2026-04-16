const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, '../tarjetas-cartas');
const publicDir = path.join(__dirname, '../public');
const fullDir = path.join(publicDir, 'tarjetas-cartas/full');
const thumbsDir = path.join(publicDir, 'tarjetas-cartas/thumbs');

// Crear directorios si no existen
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
const mainCardsDir = path.join(publicDir, 'tarjetas-cartas');
if (!fs.existsSync(mainCardsDir)) fs.mkdirSync(mainCardsDir);
if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });
if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir, { recursive: true });

async function processImages() {
  try {
    const files = fs.readdirSync(sourceDir);
    let count = 0;

    for (const file of files) {
      // Ignorar archivos que tengan 'bis'
      if (file.toLowerCase().includes('bis') || !file.endsWith('.png')) {
        continue;
      }

      // Validar que el nombre del archivo sea exactamente [1-36].png
      const match = file.match(/^(\d+)\.png$/);
      if (!match) continue;

      const number = parseInt(match[1]);
      if (number < 1 || number > 36) continue;

      const sourcePath = path.join(sourceDir, file);
      
      // Convertiremos a webp para máxima optimización visual y de tamaño
      const outFileName = `${number}.webp`;
      const thumbPath = path.join(thumbsDir, outFileName);
      const fullPath = path.join(fullDir, outFileName);

      console.log(`Procesando carta ${number}...`);

      // 1. Generar la miniatura (max width 300px)
      await sharp(sourcePath)
        .resize(300, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(thumbPath);

      // 2. Generar la versión "full" optimizada en webp (para el modal)
      // Reducimos un poco el tamaño original (ej max width 1200) para que no sean 9 MB
      await sharp(sourcePath)
        .resize(1200, null, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(fullPath);

      count++;
    }

    console.log(`\n¡Felicidades! Se procesaron ${count} cartas exitosamente.`);
  } catch (error) {
    console.error("Error procesando imágenes:", error);
  }
}

processImages();
