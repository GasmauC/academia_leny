export const pokerTripletsBlocks = [
  {
    id: "celula-narrativa",
    title: "La Célula Narrativa: Estructura de 3 Cartas",
    icon: "Target",
    content: `
La tirada de tres cartas es la estructura combinatoria mínima viable en la cartomancia, actuando como la célula madre de despliegues más complejos. Al carecer de cartas cruzadas, filas o columnas superiores, funciona de manera estrictamente lineal y horizontal.

**Posiciones Anatómicas Clásicas:**
1. **Posición 1 (Izquierda):** Pasado / Origen de la perturbación / El Sujeto / Lo que no se puede alterar.
2. **Posición 2 (Centro):** Presente / Acción u Obstáculo / El Verbo / La causa actual y operativa.
3. **Posición 3 (Derecha):** Futuro / Consejo y Resolución / El Objeto / El resultado proyectado inminente.
    `,
    examplesTitle: "Casos de Uso",
    examples: [
      {
        pregunta: "¿Cuándo se debe utilizar esta tirada?",
        cartas: ["♠️", "♣️", "♦️"],
        lectura: "Las tiradas de 3 cartas operan como intervenciones de tipo estrictamente táctico y quirúrgico. Aportan una enorme agilidad mental, un dictamen binario matizado por la tensión de los palos y colores, y un flujo causal innegable y rectilíneo.",
        cambio_orden: "Resulta imperativo utilizarlas para decisiones operativas de la vida diaria, resoluciones inmediatas, preguntas cerradas, y para aislar analíticamente la dinámica de 'Causa fundamental -> Efecto inevitable'.",
        contexto: "Aplicabilidad Estratégica",
        conclusion: "Es la herramienta de diagnóstico primario. Evita el ruido estático de variables secundarias o actores periféricos, ofreciendo una lectura directa."
      }
    ]
  },
  {
    id: "dinamica-lectura",
    title: "Dinámica de Lectura y Binarismo",
    icon: "ScanSearch",
    content: `
**¿Qué mira primero el lector?**
Lo primero que se escanea visualmente es el código binario de color y la simetría de los palos para dictaminar un diagnóstico instantáneo.
- ¿Es una progresión que evoluciona de negro a rojo (resolución) o se degenera de rojo a negro (decadencia)?

Inmediatamente después, el cartomante observa si la carta central (Posición 2) es un mero modificador numérico o una carta dominante (una figura de la corte) que asume el control del problema.

**¿Cómo se arma la narrativa?**
La narrativa se articula aplicando las cartas como los componentes de una oración gramatical estricta. La Carta 1 establece el contexto histórico inamovible que propulsa el evento. La Carta 2 es el pivote transaccional, la energía activa que transforma la herencia del pasado. La Carta 3 es el desenlace terminal producto de la colisión entre la Posición 1 y la Posición 2.
    `,
    examplesTitle: "Errores Comunes",
    examples: [
      {
        pregunta: "Errores al interpretar colores",
        cartas: ["Rojo", "Rojo", "Rojo"],
        lectura: "Asumir que las 3 cartas rojas significan 'Sí' definitivo sin analizar los palos o números.",
        cambio_orden: "Si los diamantes y corazones no concuerdan con el contexto (ej: salud física grave), la lectura puede desviarse.",
        contexto: "Precisión de Diagnóstico",
        conclusion: "El diagnóstico instantáneo por color es solo la primera capa. Nunca omitas la tensión elemental y la numerología."
      }
    ]
  },
  {
    id: "ejemplo-corporativo",
    title: "Ejemplo: Ascenso Corporativo",
    icon: "Briefcase",
    content: `
**Contexto de la consulta:** 
"¿Lograré obtener el ascenso corporativo por el que he estado compitiendo durante el último año?"

**Cartas extraídas en orden:** 
4 de Picas -> 10 de Tréboles -> 3 de Picas.

1. **Análisis Binario de Color:** Las tres cartas son de color negro. Se detecta una tríada de máxima tensión y asfixia energética. El dictamen primario e instintivo es "No", o un "Fracaso a gran costo personal".
2. **Análisis Temático de Palos:** Hay una conjunción de Picas (estrés, obstáculos de salud, sufrimiento) y Tréboles (trabajo, voluntad, responsabilidades). La lectura contextualiza un ambiente laboral sumamente tóxico, hostil y físicamente extenuante.
    `,
    examplesTitle: "Desglose Numérico y Sintaxis",
    examples: [
      {
        pregunta: "Construcción de la Sintaxis",
        cartas: ["4 de Picas (♠️)", "10 de Tréboles (♣️)", "3 de Picas (♠️)"],
        lectura: "Posición 1 (Pasado): El 4 (inmovilidad) + Pica (desafío) señala que el consultante ha estado atrapado en cansancio crónico extremo.",
        cambio_orden: "Posición 2 (Presente): El 10 (carga masiva) + Trébol (laboral). Asume una responsabilidad abrumadora para probar valía.",
        contexto: "Desarrollo y Resolución",
        conclusion: "Posición 3 (Futuro): El 3 de Picas (rupturas, problemas de columna/nerviosos). El agotamiento por sobrecarga laboral no traerá el ascenso, sino que degenerará en un severo colapso nervioso. Acción: Abortar la competencia corporativa."
      }
    ]
  }
];

export const theoryBlocks = pokerTripletsBlocks;
