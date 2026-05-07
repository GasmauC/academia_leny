export const pokerQuintetsBlocks = [
  {
    id: "evolucion-direccional",
    title: "Evolución Direccional: Estructura de 5 Cartas",
    icon: "Waypoints",
    content: `
La tirada de cinco cartas expande dramáticamente la resolución temporal y la complejidad psicológica de la lectura, permitiendo al analista observar las influencias sutiles, los vehículos de transición y los actores secundarios que operan entre los puntos principales. Se distribuyen en una sola línea horizontal expansiva (1-2-3-4-5) o en forma de cruz.

**Coordenadas Anatómicas:**
1. **Posición 1:** El anclaje distante, el pasado profundo que engendró la situación.
2. **Posición 2:** El pasado reciente, el catalizador inmediato o el vehículo de entrada.
3. **Posición 3:** El pivote central, el corazón inamovible de la lectura y el yo actual del consultante.
4. **Posición 4:** El futuro cercano, el siguiente paso táctico o el vehículo de salida.
5. **Posición 5:** El resultado final, la cristalización macroscópica de la trayectoria.
    `,
    examplesTitle: "Casos de Uso",
    examples: [
      {
        pregunta: "¿Cuándo se debe utilizar esta tirada?",
        cartas: ["1", "2", "3", "4", "5"],
        lectura: "Representan el escenario ideal de la 'evolución direccional'. Aportan una dimensión cinética a la lectura, revelando minuciosamente no solo el destino, sino el 'cómo' y el 'por qué' operará la compleja transición del pasado al futuro.",
        cambio_orden: "Exponen los resortes ocultos, las transiciones y las fricciones que modificarán el entorno de los sujetos en el mediano plazo.",
        contexto: "Aplicabilidad Estratégica",
        conclusion: "Su uso estratégico se reserva para desentrañar conflictos laborales intrincados, evaluaciones de proyectos financieros en pleno desarrollo y dinámicas interpersonales tensas donde intervienen fuerzas mediadoras o pivotes de poder."
      }
    ]
  },
  {
    id: "ley-pivote",
    title: "El Pivote Soberano y Pares Espejados",
    icon: "Network",
    content: `
**¿Qué mira primero el lector?**
En este despliegue, el foco visual y analítico absoluto recae sobre la Posición 3 (Carta Central). Esta carta rige de manera soberana toda la lectura, subordinando semánticamente a las otras cuatro. 

Posteriormente, el lector realiza una síntesis de la "envoltura" exterior (Cartas 1 y 5 combinadas) que marcan el viaje desde el principio al final. Finalmente, revisa los "vehículos" intermedios (Cartas 2 y 4). Al igual que en la tirada de tres, se evalúa la progresión del color y la acumulación de bloques de palos.

**¿Cómo se arma la narrativa?**
Se formula mediante la técnica de "pares reflejados" o espejados.
1. **(1 + 5):** Se combinan matemáticamente para dictaminar el salto macroscópico de la línea de tiempo.
2. **(2 + 4):** Se leen juntas como las herramientas, personas o tensiones operativas que causan y permiten ese salto temporal, gravitando inexorablemente alrededor del decreto de la Carta 3.
    `,
    examplesTitle: "Errores Comunes",
    examples: [
      {
        pregunta: "Lectura Lineal Desconectada",
        cartas: ["Pares", "y", "Reflejos"],
        lectura: "Leer las cartas 1 a 5 de manera secuencial sin cruzar la 1 con la 5, o la 2 con la 4.",
        cambio_orden: "Ignorar la Ley del Pivote Soberano y asumir que la carta 3 es solo un paso más en el camino temporal.",
        contexto: "Técnica de Espejado",
        conclusion: "La carta 3 dicta el alma de la tirada. Los pares espejados (1+5 y 2+4) son orbitales que le dan sentido a ese núcleo."
      }
    ]
  },
  {
    id: "ejemplo-asociacion",
    title: "Ejemplo: Asociación Comercial",
    icon: "Briefcase",
    content: `
**Contexto de la consulta:** 
"¿Cuál es el destino a corto y mediano plazo de la asociación comercial de mi empresa tras la reciente reestructuración?"

**Cartas extraídas:** 
2 de Diamantes -> Reina de Picas -> Rey de Tréboles -> As de Diamantes -> 9 de Diamantes.

1. **Binarismo de Color:** Rojo - Negro - Negro - Rojo - Rojo. Tres cartas rojas flanqueando y superando a dos negras: la viabilidad a largo plazo es altamente favorable, pero hay un nudo de tensión severa en el presente inmediato. La dominancia de Diamantes valida el tono empresarial.
2. **Pivote Soberano (Pos. 3):** Rey de Tréboles. Un hombre ambicioso, de autoridad incuestionable (el CEO o director) que detenta el control absoluto y es el motor de la resolución.
    `,
    examplesTitle: "Desglose por Pares",
    examples: [
      {
        pregunta: "Análisis de Pares Reflejados",
        cartas: ["(1 y 5)", "Pivote 3", "(2 y 4)"],
        lectura: "Pares de Reflexión Exterior (1 y 5): 2 de Diamantes (acuerdo inicial) y 9 de Diamantes (gran expansión internacional). La asociación muta de un pacto local a una expansión lucrativa.",
        cambio_orden: "Pares de Transición Interior (2 y 4): Reina de Picas (tensión legal, ejecutiva fría implacable) y As de Diamantes (nuevo contrato blindado o inyección de capital).",
        contexto: "Narrativa Sintetizada",
        conclusion: "El obstáculo interno/legal (Q♠) que amenazaba el pacto base (2♦) será neutralizado por el liderazgo implacable del Rey de Tréboles (K♣). Su gestión producirá la firma de un nuevo contrato lucrativo (A♦), llevando al éxito y expansión internacional rotunda (9♦)."
      }
    ]
  }
];

export const theoryBlocks = pokerQuintetsBlocks;
