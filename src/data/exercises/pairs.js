export const pairsExercises = [
  {
    id: "p1",
    type: "pairs",
    title: "Misión 1: Gramática Lenormand Básica",
    enunciado: "En un contexto donde un cliente quiere saber sobre su nuevo proyecto tecnológico, ¿cómo interpretas la combinación:",
    cartas: ["Caballero (1)", "Estrellas (16)"],
    consigna: "Aplica la regla de Carta Dominante (Sustantivo) + Carta Modificadora (Adjetivo).",
    opciones: [
      { id: "A", texto: "Un hombre que viaja de noche bajo las estrellas.", correcta: false, justificacion: "Esta es una lectura fantasiosa 'literal del dibujo'. Las cartas de Lenormand son conceptos abstractos, no cuentos de hadas ilustrados." },
      { id: "B", texto: "Noticias exitosas o la llegada inminente de una profunda claridad mental/inspiración tecnológica.", correcta: true, justificacion: "" },
      { id: "C", texto: "Las estrellas traen a un jinete.", correcta: false, justificacion: "Inviertes el orden. El Jinete (Carta 1) domina por estar a la izquierda. Él es el sustantivo (La Noticia/Llegada). Las estrellas sólo lo adjetivan (Exitosa)." },
      { id: "D", texto: "Un éxito que se retrasará.", correcta: false, justificacion: "El Jinete es la carta MÁS rápida del mazo. Jamás indica retrasos." }
    ],
    explicacion_paso_paso: "1) El Jinete (1) está a la izquierda, es el sujeto activo: significa Noticia, mensaje o llegada de alguien/algo rápido.\n2) Las Estrellas (16) está a la derecha, es el adjetivo modificador: significa claridad, tecnología, éxito o inspiración.\n3) Sumatoria: Una noticia clara, un éxito rápido, o la llegada de inspiración."
  },
  {
    id: "p2",
    type: "pairs",
    title: "Misión 2: El Orden de los Factores (Versión A)",
    enunciado: "Pregunta del consultante: '¿Cómo me irá en mi entorno de oficina?'",
    cartas: ["Perro (18)", "Zorro (14)"],
    consigna: "Analiza cuidadosamente QUIÉN modifica a quién.",
    opciones: [
      { id: "A", texto: "Un amigo (Perro) que es manipulador e interesado en el fondo (Zorro).", correcta: true, justificacion: "" },
      { id: "B", texto: "Un empleado mentiroso y astuto (Zorro) que terminará siendo leal (Perro).", correcta: false, justificacion: "Falso. Estás leyendo Zorro + Perro. El Zorro está a la derecha, su función es oscurecer y adjetivar al Sujeto (el Perro), no al revés." },
      { id: "C", texto: "Mascotas amenazadas por animales salvajes en el entorno.", correcta: false, justificacion: "Lectura literal animalista. Lenormand no zoológico, es arquetípico." },
      { id: "D", texto: "Un trabajo duro y leal garantizado.", correcta: false, justificacion: "Perro no significa trabajo. Zorro tradicionalmente rige el empleo, pero aquí es un adjetivo (Falsedad/Estrategia)." }
    ],
    explicacion_paso_paso: "1) Sujeto Dominante: Perro (18) = Amigo, colega, o alianza de confianza.\n2) Adjetivo: Zorro (14) = Falsedad, conveniencia, cálculo.\n3) Resolución: Tu 'alianza de confianza' está teñida de cálculo falso. ¡Cuidado con ese amigo laboral!"
  },
  {
    id: "p3",
    type: "pairs",
    title: "Misión 3: El Orden de los Factores (Versión Invertida)",
    enunciado: "Misma pregunta: '¿Cómo me irá en la oficina?' Pero las cartas salieron invertidas:",
    cartas: ["Zorro (14)", "Perro (18)"],
    consigna: "Decodifica el cambio semántico al alterar la dominancia restrictiva.",
    opciones: [
      { id: "A", texto: "Un amigo (Perro) que es manipulador (Zorro).", correcta: false, justificacion: "Esta es la respuesta a Perro + Zorro. Vuelve a revisar quién es el sujeto base." },
      { id: "B", texto: "Un empleo en una perrera o veterinaria.", correcta: false, justificacion: "Aunque en un contexto ESPECÍFICO de 'soy veterinario' podría leerse literal, la regla general laboral es otra." },
      { id: "C", texto: "Un trabajo (Zorro) duradero, leal o un empleado de suma confianza (Perro).", correcta: true, justificacion: "" },
      { id: "D", texto: "Amistades rotas por el trabajo duro.", correcta: false, justificacion: "No hay cartas de ruptura (Guadaña, Ataúd) en este par." }
    ],
    explicacion_paso_paso: "1) Zorro (14) como sujeto a la izquierda = Empleo, astucia, el empleado mismo.\n2) Perro (18) como adjetivo = Fiel, leal, confiable.\n3) Síntesis: El Zorro se limpia de su falsedad porque el Perro lo 'modifica' a leal. Tienes un empleo confiable."
  },
  {
    id: "p4",
    title: "Misión 4: Cartas de Transformación y Corte",
    type: "pairs",
    enunciado: "El consultante pregunta: '¿Me jubilaré este año con mi pensión aprobada?'",
    cartas: ["Ancla (35)", "Ataúd (8)"],
    consigna: "Evalúa qué le hace el Ataúd al elemento base.",
    opciones: [
      { id: "A", texto: "El ancla se hunde en el ataúd salvando la pensión.", correcta: false, justificacion: "Interpretación visual surrealista sin base sistémica." },
      { id: "B", texto: "Una larga estabilidad (Ancla) que se detiene, finaliza y muere por la fuerza (Ataúd). No habrá retiro seguro o el trámite muere de forma aplastante.", correcta: true, justificacion: "" },
      { id: "C", texto: "El fin de los estancamientos, dándote libertad por fin.", correcta: false, justificacion: "Si fuera Ataúd + Ancla (Fin del estancamiento solidificándose hacia algo mejor), pero aquí la Estabilidad choca frontalmente MURIENDO a la derecha." },
      { id: "D", texto: "La muerte física garantizada antes del retiro.", correcta: false, justificacion: "NUNCA pronosticamos muerte biológica en Lenormand a la ligera si la pregunta habla netamente de un trámite burocrático (Pensión)." }
    ],
    explicacion_paso_paso: "1) Sujeto: Ancla (35) significa 'Trabajo fijo, arraigo, seguridad a largo plazo'.\n2) Modificador Mortal: Ataúd (8). Las cartas oscuras a la derecha EXTERMINAN al sujeto. \n3) Síntesis: Se muere la seguridad laboral. Tu anclaje llega a su gran final (renuncia o quiebra). Trámite hundido."
  },
  {
    id: "p5",
    title: "Misión 5: Cartas Similares",
    type: "pairs",
    enunciado: "A un consultante lo echaron del club vacacional y pregunta por qué. Tú sacas:",
    cartas: ["Torre (19)", "Jardín (20)"],
    consigna: "Diferencia la Torre (Institución cerrada) del Jardín (Público abierto).",
    opciones: [
      { id: "A", texto: "Le gustaba pasear mucho por los jardines de la Torre.", correcta: false, justificacion: "Lectura ilustrativa y literal nivel aprendiz sin valor de fondo." },
      { id: "B", texto: "Una institución (Torre) que se vuelve hiper-pública (Jardín) exponiendo a todos. Quizás fue un escándalo público desde instancias gerenciales u oficios legales.", correcta: true, justificacion: "" },
      { id: "C", texto: "Aislamiento total y encierro sin salida al aire libre.", correcta: false, justificacion: "Eso sería Torre + Montaña o Torre + Ataúd. El Jardín a la derecha 'Abre las puertas' de par en par." },
      { id: "D", texto: "Estaba robándole plantas al club.", correcta: false, justificacion: "No existe ni el Zorro ni los Ratones aquí para justificar robo. Solo hay edificio vs aire libre." }
    ],
    explicacion_paso_paso: "1) Torre = Entidad, muro, aislamiento, Estado legal.\n2) Jardín = El público, lo abierto, la red social y fiestas. \n3) Torre + Jardín = El aislamiento se abre al público. La institución o gerencia ('El Club') ventiló todo o es un Edificio Público. Problema expuesto públicamente por gerencia."
  }
];
