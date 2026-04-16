import { GoogleGenerativeAI } from '@google/generative-ai';
import { cardsDictionary } from '../data/db/lenormand_cards';
import { theoryBlocks as combinationsBlocks } from '../data/combinations_theory';
import { tripletsBlocks } from '../data/triplets_theory';
import { quintetsBlocks } from '../data/quintets_theory';
import { ninecardsBlocks } from '../data/ninecards_theory';
import { gtBlocks } from '../data/grandtableau_theory';

// Singleton del cliente de GenAI local
let genAI = null;

export const initAITutor = (apiKey) => {
  if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    localStorage.setItem('leny_ai_key', apiKey);
    return true;
  }
  return false;
};

export const hasValidKey = () => {
  if (genAI) return true;
  const stored = localStorage.getItem('leny_ai_key');
  if (stored) {
    genAI = new GoogleGenerativeAI(stored);
    return true;
  }
  return false;
};

export const clearAIKey = () => {
  localStorage.removeItem('leny_ai_key');
  genAI = null;
};

// ==========================================
// RAG: Retrieval Augmented Generation Builder
// ==========================================
// Este motor unifica nuestra base de datos en un solo mega-prompt de contexto.
const buildAcademicContext = () => {
  let context = "=== DICCIONARIO DE 36 CARTAS ===\n";
  Object.values(cardsDictionary).forEach(c => {
    context += `\nCARTA ${c.number} - ${c.name}:\n`;
    context += `Esencia: ${c.essence}\n`;
    context += `Keywords: ${c.keywords.join(", ")}\n`;
    context += `Amor: ${c.meanings.love}\n`;
    context += `Trabajo: ${c.meanings.work}\n`;
  });

  const appendModule = (title, blocks) => {
    context += `\n\n=== ${title} ===\n`;
    blocks.forEach(b => {
      context += `\n[Sección: ${b.title}]\nTeoría: ${b.content}\n`;
    });
  };

  appendModule("MÓDULO 2 CARTAS (PARES Y COMBINACIONES)", combinationsBlocks);
  appendModule("MÓDULO 3 CARTAS (TRÍADAS)", tripletsBlocks);
  appendModule("MÓDULO 5 CARTAS (QUINTETOS)", quintetsBlocks);
  appendModule("MÓDULO 9 CARTAS (RETRATO 3x3)", ninecardsBlocks);
  appendModule("MÓDULO GRAND TABLEAU (36 CARTAS)", gtBlocks);
  
  return context;
};

// Configuración del System Prompt Central
const getSystemInstruction = () => {
  return `ERES "LENY", EL TUTOR DE INTELIGENCIA ARTIFICIAL DE LA ACADEMIA "LA BIBLIA DEL PEQUEÑO LENY".
Tu objetivo es ayudar al usuario a estudiar cartomancia Lenormand basándote ÚNICA Y EXCLUSIVAMENTE en el marco teórico que se te adjunta a continuación.

REGLAS ABSOLUTAS:
1. NUNCA inventes significados que no estén en el contexto adjunto.
2. Si el usuario te pregunta por su ex-pareja, enfermedades, o predicciones, RECHAZA ACTUAR COMO ADIVINO. Diles: "Como tu tutor académico, mi rol no es leerte el futuro, sino enseñarte. Si quieres, dame las cartas que sacaste u opcionalmente dime qué técnica quieres repasar y te enseñaré a interpretarla según nuestro currículum."
3. Al explicar, CITA EL MÓDULO (Ej: "Según nuestro Módulo de Tríadas..." o "En el Módulo Grand Tableau...").
4. Genera EJEMPLOS NUEVOS aplicando la gramática estricta (Carta a la izquierda = Sustantivo/Dominante, Carta a la derecha = Adjetivo/Modificador).
5. Escribe usando Markdown GitHub (negritas, cursivas, listas) para que sea estructurado, elegante y didáctico.
6. Tu tono debe ser el de un Profesor elitista, académico, profundo, amable pero estricto con las reglas europeas del oráculo Lenormand.

--- CONTEXTO ACADÉMICO PARA UTILIZAR ---
${buildAcademicContext()}
`;
};

// Conversación AI
export const askTutor = async (history, newMessage) => {
  if (!genAI) throw new Error("No hay API KEY configurada.");
  
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: getSystemInstruction(),
      generationConfig: {
        temperature: 0.3, // Baja temperatura para mantenerlo hiper-preciso al texto base
        maxOutputTokens: 2048,
      }
    });

    // Reformateamos el historial para Gemini API
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error("Error AI Tutor:", error);
    throw new Error(error.message || "Error contactando a Leny. Revisa tu clave API o conexión.");
  }
};

// ==========================================
// EVALUADOR ESTRICTO DE LECTURAS (GIMNASIO)
// ==========================================
export const evaluateUserInterpretation = async (exercise, userInterpretation) => {
  if (!genAI) {
    // MODO ENTORNO DE DESARROLLO (MOCK) - Si no hay API KEY, devolvemos una simulación
    console.warn("MOCK MODE AI: Simulando evaluación estricta porque no hay API Key.");
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          puntuacion: 75,
          nivel: "medio",
          feedback_general: "Excelente intento, has capturado la esencia del sustantivo, pero te faltó aplicar el modificador correctamente según nuestra teoría académica.",
          aciertos: [
            "Identificaste correctamente la carta Dominante.",
            "Comprendiste el contexto general de la Misión."
          ],
          errores: [
            "Olvidaste la regla de la carta bisagra.",
            "Te dejaste llevar un poco por intuición libre ignorando el Sustantivo."
          ],
          sugerencias: [
            "Repasa el módulo de Tiradas Lineales.",
            "Recuerda: Izquierda es Sustantivo, Derecha es Adjetivo."
          ],
          comparacion_con_respuesta_correcta: exercise.respuesta_desarrollada
        });
      }, 2500); // Simulamos 2.5 seg de latencia AI
    });
  }
  
  try {
    const evaluatorPrompt = `ERES EL "PROFESOR LENY", EXAMINADOR ESTRICTO DE LA ACADEMIA LENORMAND (MÉTODO LOPES MAZZA).
Tu labor es auditar la interpretación libre de un alumno frente a un ejercicio específico y devolver un veredicto en formato JSON estructural.

DATOS DEL EJERCICIO (BASE DE LA VERDAD):
- Contexto: ${exercise.contexto}
- Pregunta: ${exercise.pregunta}
- Cartas: ${exercise.cartas.join(" + ")}
- Respuesta Real Corta: ${exercise.respuesta_rapida}
- Razonamiento Teórico Exigido: ${exercise.razonamiento_tecnico}

INTERPRETACIÓN DEL ALUMNO A EVALUAR:
"${userInterpretation}"

CRITERIOS DE PENALIZACIÓN (SEVERO):
1. Penaliza fuertemente la "intuición de tarot" (ej. inventar significados que no están en las cartas).
2. Penaliza si ignora las Leyes de Lenormand exigidas en el Razonamiento Teórico Exigido (ej. ignorar qué carta es Sustantivo y cuál Adjetivo, o ignorar Cartas de Relevancia como Guadaña o Ataúd).
3. Penaliza incoherencias con el Contexto.

CRITERIOS DE VALORACIÓN:
1. Premia la estructura correcta y deducción directa.
2. Premia el reconocimiento de la influencia y orden de las cartas.

TONO DEL FEEDBACK:
Claro, didáctico, técnico, pero como un profesor privado (firme pero constructivo). Explica EXACTAMENTE por qué está bien o mal basado en las Leyes indicadas en el Razonamiento Teórico Exigido.

DEBES RESPONDER ÚNICAMENTE CON UN JSON VÁLIDO SIGUIENDO ESTA ESTRUCTURA EXACTA (sin backticks, sin markdown, solo el JSON):
{
  "puntuacion": [Número del 0 al 100],
  "nivel": ["bajo", "medio" o "alto"],
  "feedback_general": "Párrafo didáctico explicando el desempeño general...",
  "aciertos": ["Acierto 1...", "Acierto 2..."],
  "errores": ["Error 1...", "Error 2..."],
  "sugerencias": ["Sugerencia de estudio 1...", "Sugerencia 2..."],
  "comparacion_con_respuesta_correcta": "Comparación final técnica demostrando cómo se debió armar."
}`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.1, // Extrema precisión, ninguna alucinación
        responseMimeType: "application/json"
      }
    });

    const result = await model.generateContent(evaluatorPrompt);
    const responseText = await result.response.text();
    
    return JSON.parse(responseText);

  } catch (error) {
    console.error("Error evaluando lectura:", error);
    throw new Error(error.message || "Error contactando al evaluador. Revisa tu consola o API Key.");
  }
};
