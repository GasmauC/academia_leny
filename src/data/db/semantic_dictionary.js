/**
 * Diccionario Conceptual Semántico de Lenormand.
 * Define la jerarquía estricta para resolver búsquedas de conceptos amplios,
 * asignando un Nodo Canónico absoluto y su periferia.
 */

export const semanticDictionary = [
  {
    concept: "enfermedad",
    keywords: ["enfermedad", "enfermo", "hospital", "salud", "malestar", "deterioro", "fallecimiento", "muerte"],
    primaryCardId: 8, // Ataúd
    relatedCardIds: [5, 23, 10, 6], // Árbol, Ratones, Guadaña, Nubes
    context: "El Ataúd es el significador maestro de enfermedad grave, cama o cese vital definitivo. El Árbol (5) domina la biología lenta de la salud general; Ratones (23) indican patologías de desgaste o virus; y Guadaña (10) representa cirugías de urgencia o dolor punzante agudo."
  },
  {
    concept: "dinero",
    keywords: ["dinero", "finanzas", "sueldo", "pagos", "ahorros", "inversión", "inversiones", "economía", "riqueza"],
    primaryCardId: 34, // Peces
    relatedCardIds: [15, 29, 4], // Oso, Señora (a veces?), Casa (Bienes raíces) -> Mejor 15 Oso, 4 Casa
    context: "Los Peces son el flujo de capital incontable y la abundancia comercial. El Oso (15) garantiza fondos grandes y seguridad macroeconómica institucional. La Casa (4) cubre los ahorros protegidos y el patrimonio inmobiliario."
  },
  {
    concept: "amor",
    keywords: ["amor", "pareja", "romance", "enamorarse", "sentimientos", "afecto", "citas", "noviazgo", "corazon", "corazón"],
    primaryCardId: 24, // Corazón
    relatedCardIds: [25, 9, 28, 29], // Anillo, Ramo, Hombre, Mujer
    context: "El Corazón es la sede irrebatible del amor puro y la pasión romántica espontánea. Las implicaciones secundarias son El Anillo (25), que señala matrimonio o la formalidad posterior del afecto; y El Ramo (9), los juegos de seducción incipientes o el cortejo agradable."
  },
  {
    concept: "trabajo",
    keywords: ["trabajo", "empleo", "laboral", "empresa", "oficio", "negocio", "carrera", "puesto"],
    primaryCardId: 35, // Ancla
    relatedCardIds: [14, 3, 20], // Zorro, Barco, Parque
    context: "El Ancla rige el largo plazo profesional, marcando tu profesión de toda la vida y el esfuerzo seguro. El Zorro (14) rige exclusivamente 'la jornada de 9 a 5' en supervivencia corporativa; el Barco (3) lidera el comercio independiente, y el Parque (20) el trabajo ante grandes públicos."
  },
  {
    concept: "engaño",
    keywords: ["engaño", "mentira", "mentiras", "falsedad", "traición", "infidelidad", "manipulación", "hipocresía"],
    primaryCardId: 7, // Serpiente
    relatedCardIds: [14, 6], // Zorro, Nubes
    context: "La Serpiente es el veneno y la difamación maliciosa para destruir reputations u ocultar infidelidad. El Zorro (14) miente con fines utilitarios (lucro u oportunismo en el trabajo); y Las Nubes (6) generan confusión donde no hay certeza alguna de la verdad."
  },
  {
    concept: "retraso",
    keywords: ["retraso", "lentitud", "impedimento", "bloqueo", "lento", "obstáculo", "demora", "traba"],
    primaryCardId: 21, // Montaña
    relatedCardIds: [35, 5, 8], // Ancla, Árbol, Ataúd
    context: "La Montaña aporta un bloqueo rotundo y un muro hostil que impone una larga demora infranqueable. El Ancla (35) y El Árbol (5) son lentos, pero su lentitud no es enemiga, sino que refleja maduración natural e inmovilidad estática estable."
  },
  {
    concept: "viajes",
    keywords: ["viaje", "viajes", "extranjero", "distancia", "lejanía", "mudanza", "transporte"],
    primaryCardId: 3, // Barco
    relatedCardIds: [17, 1], // Cigüeñas, Jinete
    context: "El Barco dicta los viajes lejanos o internacionales masivos para el cuerpo o el alma. Las Cigüeñas (17) dominan explícitamente el 'viaje sin retorno', la mudanza; mientras El Jinete (1) acerca el desplazamiento fugaz y vecinal sin gravedad."
  }
];
