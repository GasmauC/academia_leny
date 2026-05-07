import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Configuración de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const API_KEY = process.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error("ERROR: No se encontró VITE_GEMINI_API_KEY en el archivo .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

const TEXT_FILE = path.join(__dirname, 'manual_grande_full.txt');
const JSON_OUT = path.join(__dirname, '../../src/data/db/poker_cards_theory.json');

const cards = JSON.parse(fs.readFileSync(JSON_OUT, 'utf-8'));

async function extractCardData(cardName) {
  console.log(`[Extrayendo] ${cardName}...`);
  const rawText = fs.readFileSync(TEXT_FILE, 'utf-8');
  
  const prompt = `
  Eres un experto analista de textos. Aquí tienes el texto completo del manual de cartomancia.
  Tu objetivo es extraer TODO el contenido teórico relacionado ÚNICA Y EXCLUSIVAMENTE con la carta: "${cardName}".
  
  REGLAS ESTRICTAS:
  1. NO resumas nada. Copia el texto original tal cual está escrito.
  2. Si una sección no existe en el texto original, déjala vacía ("").
  3. Devuelve el resultado en formato JSON puro.
  
  FORMATO JSON ESPERADO:
  {
    "significado_base": "Texto completo del significado principal de la carta...",
    "funcion": "Una línea corta resumiendo su función o palabra clave",
    "polaridad": "Positiva, Negativa o Neutra",
    "lectura_simbolica": "Todo el texto relacionado a psicología y simbolismo...",
    "lectura_historica": "Todo el texto relacionado al origen e historia...",
    "contexto_de_uso": "Todo el texto de áreas de la vida (amor, dinero, etc)...",
    "combinaciones_frecuentes": ["Lista de combinaciones copiadas literal"],
    "ejemplos": ["Lista de ejemplos copiados literal"]
  }

  Busca en este inmenso texto todo lo referido a ${cardName}.
  `;

  try {
    const result = await model.generateContent([
        prompt,
        {
            inlineData: {
                data: Buffer.from(rawText).toString("base64"),
                mimeType: "text/plain"
            }
        }
    ]);
    const response = await result.response;
    const text = response.text();
    
    // Limpiar markdown json si existe
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error(`Error extrayendo ${cardName}:`, error);
    return null;
  }
}

async function run() {
  console.log("Iniciando Ingesta de Datos Semántica con Gemini...");
  
  // Procesamos carta por carta (en un caso real, procesaríamos en lotes para ahorrar tokens)
  // Para demostración, solo procesaremos la primera carta para no agotar la cuota de la API
  const cardToProcess = cards[0]; 
  
  const extractedData = await extractCardData(cardToProcess.nombre);
  
  if (extractedData) {
    cardToProcess.significado_base = extractedData.significado_base || "";
    cardToProcess.funcion = extractedData.funcion || "";
    cardToProcess.polaridad = extractedData.polaridad || "";
    cardToProcess.lectura_simbolica = extractedData.lectura_simbolica || "";
    cardToProcess.lectura_historica = extractedData.lectura_historica || "";
    cardToProcess.contexto_de_uso = extractedData.contexto_de_uso || "";
    cardToProcess.combinaciones_frecuentes = extractedData.combinaciones_frecuentes || [];
    cardToProcess.ejemplos = extractedData.ejemplos || [];
    
    fs.writeFileSync(JSON_OUT, JSON.stringify(cards, null, 2), 'utf-8');
    console.log(`¡Carta ${cardToProcess.nombre} actualizada exitosamente en el JSON!`);
  }
  
  console.log("Para poblar las 54 cartas, este script debe iterar sobre el array 'cards'.");
}

run();
