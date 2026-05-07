export const pokerCombinationsTheoryBlocks = [
  {
    id: "dominante_modificadora",
    title: "1. Estructura Gramatical: Sustantivo y Adjetivo",
    icon: "Crown",
    content: "En la cartomancia tradicional con mazo de póker, la lectura nunca es una agregación caótica de significados aislados, sino un proceso lingüístico estricto. La primera carta extraída (o la que se designa como central) actúa invariablemente como el **Sustantivo** (el sujeto, el evento principal, el ancla de la oración). La carta que la sigue (hacia la derecha en la dirección de lectura europea) funciona como el **Adjetivo** o modificador (el clima, la condición, la forma en que se desarrolla el sujeto).\n\nPerder esta jerarquía es el error fundamental del principiante. Leer 'Amor' + 'Dinero' no es lo mismo que leer 'Dinero' + 'Amor'. El orden sintáctico determina quién domina a quién. Las cartas no se 'mezclan' visualmente como en una licuadora; se leen linealmente.",
    examplesTitle: "Casos de Dominancia",
    examples: [
      {
        pregunta: "¿Cómo evolucionará la situación laboral del consultante?",
        combinacion: "10 de Diamantes + 4 de Picas",
        lectura: "El 10 de Diamantes opera como Sustantivo (las finanzas mayores, un contrato corporativo o gran negocio). El 4 de Picas opera como Adjetivo (la paralización, la cama de enfermo, el estancamiento forzado). Por tanto, la lectura es 'Un gran negocio que se paraliza'.",
        cambio_orden: "Si el orden fuera [4 de Picas + 10 de Diamantes], el sustantivo sería el Estancamiento (la enfermedad, el letargo), y el 10 de Diamantes modificaría informando que la paralización resulta altamente costosa o que se resuelve gracias a una gran inyección de capital.",
        contexto: "Finanzas / Trabajo",
        conclusion: "Una inversión o proyecto importante entra en un estado de congelamiento estructural."
      },
      {
        pregunta: "¿Cuál es la naturaleza de la nueva relación amorosa?",
        combinacion: "Reina de Corazones + 7 de Tréboles",
        lectura: "La Reina de Corazones (Sustantivo) es una mujer afectuosa, la madre, o el núcleo emocional nutritivo. El 7 de Tréboles (Adjetivo) es la desilusión aguda, los pensamientos intrusivos y oscuros. 'Una mujer buena que trae (o sufre) preocupaciones desgastantes'.",
        cambio_orden: "Si fuera [7 de Tréboles + Reina de Corazones], el sujeto de la lectura son las dudas y los problemas (7♣), los cuales terminan siendo suavizados o resueltos por la intervención de una mujer cariñosa (Q♥).",
        contexto: "Romance",
        conclusion: "Un vínculo emocional profundo ensombrecido por dudas y desgaste mental."
      }
    ]
  },
  {
    id: "cartas_operativas",
    title: "2. Naipes Operativos: Cortes y Condicionantes",
    icon: "Zap",
    content: "Ciertas cartas en la baraja de póker no actúan primariamente como descripciones, sino como **operadores lógicos**. A estas se les llama cartas de corte o condicionantes.\n\nPor ejemplo, el **As de Picas** corta, finaliza, destruye o amputa cualquier significado de la carta anterior. El **7 de Tréboles** envenena o retrasa. El **As de Diamantes** oficializa o sella por escrito lo que haya alrededor. Al aparecer un operador, la línea de lectura debe detenerse, ya que la acción de la carta altera drásticamente el destino del bloque entero. Un As de Corazones (el hogar) seguido de un As de Picas indica inevitablemente el quiebre de esa estructura doméstica.",
    examplesTitle: "Mecánica de Cartas Condicionantes",
    examples: [
      {
        pregunta: "¿Se concretará el proyecto que estamos desarrollando?",
        combinacion: "10 de Diamantes + As de Picas",
        lectura: "El 10 de Diamantes indica la solidez del capital o la gran empresa. El As de Picas, siendo un operador de aniquilación y corte súbito, destruye estructuralmente el 10♦. El proyecto, por más sólido que pareciera, es cancelado de forma absoluta e irrevocable.",
        cambio_orden: "Si fuera [As de Picas + 10 de Diamantes], la lectura cambia diametralmente: tras un final devastador o un cierre definitivo (A♠), se materializa una inmensa entrada de dinero o una nueva y gigantesca oportunidad (10♦).",
        contexto: "Negocios y Desarrollo",
        conclusion: "Cancelación total del proyecto o bancarrota de la inversión."
      },
      {
        pregunta: "¿Qué intenciones tiene esta persona conmigo?",
        combinacion: "Jota de Corazones + As de Diamantes",
        lectura: "La Jota de Corazones representa al enamorado, las atenciones románticas y el coqueteo sincero. El As de Diamantes es el papel oficial, la propuesta formal o el sello. La intención del enamorado se vuelve una propuesta escrita y seria.",
        cambio_orden: "Si fuera [As de Diamantes + Jota de Corazones], se trata de una propuesta formal (A♦) que es traída o gestionada por un joven amigable o romántico (J♥).",
        contexto: "Relaciones Interpersonales",
        conclusion: "El interés afectivo se formaliza; intenciones serias de establecer un compromiso concreto."
      }
    ]
  },
  {
    id: "lectura_contextual",
    title: "3. La Variación por Contexto",
    icon: "Filter",
    content: "Un error catastrófico al leer naipes es intentar aplicar un significado romántico a una pregunta financiera, o viceversa. El 'Filtro de Contexto' dicta que los palos y los números mutan su registro semántico según la naturaleza de la pregunta.\n\nLas Picas no siempre son desgracia pura; en temas médicos pueden ser cirugía (el bisturí), y en arquitectura, los cimientos o el trabajo duro. Los Corazones en negocios no son 'amor', sino relaciones públicas y lealtad del cliente. La baraja de póker es implacable: debes encuadrar el vocabulario de la carta estrictamente al tema consultado.",
    examplesTitle: "Ejemplos de Filtrado Semántico",
    examples: [
      {
        pregunta: "¿Cuál es el problema con el motor de mi vehículo?",
        combinacion: "7 de Picas + 3 de Diamantes",
        lectura: "Las Picas representan bloqueos, y los Diamantes representan metales, circuitos, o dinero. El 7 de Picas es un estancamiento frustrante y el 3 de Diamantes, un trabajo de baja intensidad pero disperso. No hay 'amor' ni 'traiciones'. Simplemente es una falla mecánica (7♠) en los circuitos eléctricos básicos o bujías pequeñas (3♦).",
        cambio_orden: "Si fuera [3 de Diamantes + 7 de Picas], un arreglo pequeño que se estaba haciendo (3♦) culminó en un bloqueo mayor o un daño más frustrante (7♠).",
        contexto: "Mecánica / Material",
        conclusion: "Fallo localizado en componentes eléctricos o piezas pequeñas, que causa estancamiento."
      },
      {
        pregunta: "¿Cómo le irá a la empresa en la próxima feria de exhibición?",
        combinacion: "9 de Corazones + 8 de Picas",
        lectura: "El 9 de Corazones es la realización del deseo, la victoria y el impacto positivo (Sustantivo). El 8 de Picas es el exceso, la multitud abrumadora y a veces el estrés por volumen. El contexto es negocios. Resultado: éxito total y rotundo (9♥) que generará un nivel de trabajo y aglomeración de clientes tan grande que producirá un inmenso agotamiento físico (8♠).",
        cambio_orden: "Si fuera [8 de Picas + 9 de Corazones], después de un período de estancamiento, estrés y problemas de volumen abrumador (8♠), finalmente la empresa obtiene su mayor victoria comercial y logra la satisfacción deseada (9♥).",
        contexto: "Eventos Comerciales",
        conclusion: "Éxito masivo que traerá como daño colateral un agotamiento severo por exceso de demanda."
      }
    ]
  },
  {
    id: "secuencias_narrativas",
    title: "4. Secuencias Largas (3, 5 y N cartas)",
    icon: "ArrowRight",
    content: "Cuando la tirada supera las dos cartas, el sistema abandona el modelo binario (sustantivo-adjetivo) y entra en lo que se denomina **Secuencia Narrativa**. \n\nEn una línea de 3 cartas (A + B + C), la carta central (B) se convierte en el Eje de la lectura (el presente, el tema principal). Las cartas que la flanquean actúan así: la primera (A) es el detonante, causa o pasado; la tercera (C) es el desarrollo, efecto o futuro. En secuencias de 5 cartas, las cartas de los extremos (1 y 5) actúan como el marco de la situación, abrazando a las cartas internas.",
    examplesTitle: "Desarrollo de Secuencias Lineales",
    examples: [
      {
        pregunta: "¿Cómo evolucionará la dinámica familiar tras la mudanza?",
        combinacion: "10 de Corazones + 5 de Diamantes + 2 de Picas",
        lectura: "A (10 de Corazones): El hogar estable, la familia unida, la gran felicidad doméstica.\nB (5 de Diamantes): Cambios bruscos, la ciudad, el entorno externo que interviene.\nC (2 de Picas): La separación temporal, la grieta, el desacuerdo, caminos que divergen.\nNarrativa: La estructura de una gran familia unida (10♥) se somete a cambios de entorno urbano drásticos (5♦), lo cual terminará causando que los miembros se alejen o se generen divisiones y desconexión profunda (2♠).",
        cambio_orden: "Si la secuencia fuera [2 de Picas + 5 de Diamantes + 10 de Corazones], la narrativa sería: Una familia dividida (2♠) a través de grandes cambios logísticos (5♦) logrará alcanzar finalmente la máxima estabilidad y unión hogareña (10♥).",
        contexto: "Dinámica Familiar",
        conclusion: "La mudanza introducirá cambios externos que llevarán a la separación de los lazos familiares actuales."
      },
      {
        pregunta: "¿El paciente logrará recuperar su salud y salir del tratamiento?",
        combinacion: "4 de Picas + As de Tréboles + Rey de Corazones",
        lectura: "A (4 de Picas): La cama del enfermo, la postración física severa.\nB (As de Tréboles): La legalidad, el papeleo, el contrato (en contexto médico: la receta, el alta médica formal firmada).\nC (Rey de Corazones): El patriarca emocional, o en este contexto, un hombre de buena voluntad, a menudo el médico sanador.\nNarrativa: Partiendo del estancamiento y la enfermedad (4♠), se obtiene un documento oficial importante (A♣) otorgado por un hombre bondadoso o especialista capacitado (K♥), lo que indica la resolución formal del problema de salud.",
        cambio_orden: "Si el orden fuera [Rey de Corazones + As de Tréboles + 4 de Picas], el especialista (K♥) firma los documentos o los resultados de los estudios (A♣) que confirman y establecen una postración prolongada o enfermedad crónica insalvable (4♠).",
        contexto: "Salud y Medicina",
        conclusion: "El paciente recibirá el alta médica oficial por parte del doctor encargado."
      }
    ]
  }
];

export const theoryBlocks = pokerCombinationsTheoryBlocks;
