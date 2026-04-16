export const theoryBlocks = [
  {
    id: "dominante-modificadora",
    title: "La Estructura Central: Dominante y Modificadora",
    icon: "Crown",
    content: `
En la sintaxis tradicional del Lenormand, las cartas rara vez se leen de forma aislada. Adquieren su verdadero significado cuando se combinan, creando una nueva frase o idea. La regla de oro, y la base de todo el sistema, es la relación entre **la Carta Dominante (o Sujeto)** y la **Carta Modificadora (o Descriptiva)**.

### La Carta Dominante (Carta 1)
Es la primera carta en aparecer. Constituye el **núcleo** de la frase, el sustantivo principal, el escenario de fondo o el "quién/qué" de la lectura. Establece el tema fundamental sobre el que recaerá la acción o descripción posterior.

### La Carta Modificadora (Carta 2)
Es la carta que sigue a la dominante. Su función es "adjetivar", alterar, calificar o proporcionar una acción a la primera carta. Nos dice "cómo es", "qué le pasa" o "hacia dónde va" ese tema central. 

Si piensas en el lenguaje natural: la Carta 1 es la taza de café. La Carta 2 te dice si está caliente, fría, derramada o dulce.
    `,
    examplesTitle: "Ejemplos Prácticos: La Dinámica Dominante/Modificador",
    examples: [
        {
            pregunta: "¿Cómo percibo mi nuevo entorno de trabajo?",
            combinacion: "Árbol (5) + Zorro (14)",
            lectura: "El Árbol es la salud, las raíces, el entorno base. El Zorro califica ese entorno como astuto, falso o especulativo.",
            cambio_orden: "Si fuera Zorro + Árbol, el tema central sería un empleado falso (Zorro) arraigado o un engaño profundo, o un trabajo falso relacionado a la salud.",
            contexto: "Ambiente laboral",
            conclusion: "El consultante siente que su base laboral está viciada por agendas ocultas. Hay que estar alerta, el entorno no es sincero sino estratégico (Zorro)."
        },
        {
            pregunta: "¿Qué está bloqueando mi progreso en este proyecto?",
            combinacion: "Montaña (21) + Llave (33)",
            lectura: "La Montaña es el obstáculo inamovible (sujeto). La Llave es la solución, la apertura o la certeza (adjetivo/acción).",
            cambio_orden: "Llave + Montaña significaría 'una solución que se bloquea', un éxito que encuentra un muro gigantesco.",
            contexto: "Proyecto profesional",
            conclusion: "El obstáculo actual (Montaña) es clave para tu éxito. Superar este gran bloque frío es literalmente la solución (Llave) requerida."
        },
        {
            pregunta: "¿Qué me espera en este viaje de fin de semana?",
            combinacion: "Barco (3) + Anillo (25)",
            lectura: "El Barco es el viaje en sí mismo (Sujeto). El Anillo califica el viaje como comprometido, repetitivo o vinculante o circular.",
            cambio_orden: "Anillo + Barco sería un compromiso (matrimonio, contrato) que implica un viaje, o una relación a distancia.",
            contexto: "Ocio temporal",
            conclusion: "Será un viaje que cimentará vínculos o sellará un acuerdo. No es un viaje suelto; es un viaje 'con prometido', uniendo lazos."
        },
        {
            pregunta: "¿Cuál es la naturaleza del mensaje que voy a recibir?",
            combinacion: "Jinete (1) + Serpiente (7)",
            lectura: "El Jinete es la noticia entrante (Sujeto). La Serpiente califica esa noticia: venenosa, sinuosa, complicada, o sobre una mujer astuta.",
            cambio_orden: "Serpiente + Jinete sería 'una complicación o mentira que se acerca rápidamente'.",
            contexto: "Comunicación personal",
            conclusion: "Prepárate para un chisme o un mensaje con dobles intenciones. La noticia (Jinete) viene contaminada de enredos o envidia (Serpiente)."
        }
    ]
  },
  {
    id: "orden-y-direccion",
    title: "Dirección y Dinámica: El factor de la línea de tiempo",
    icon: "ArrowRight",
    content: `
A diferencia de sistemas como el Tarot, donde las posiciones relacionales pueden ser muy abstractas, en el Lenormand **la direccionalidad es estricta**: leemos de izquierda a derecha. Esto no sólo marca la gramática, sino el **tiempo**.

### El Antes y el Después
La primera carta representa el **estado actual**, el punto de origen o el "pasado inmediato" que empuja hacia el presente. La segunda carta representa el **punto de destino**, el resultado, o el "futuro inmediato" hacia donde evoluciona la situación.

### La Dirección de la Frase
Hay cartas en Lenormand que intrínsecamente "miran" o "apuntan" hacia una dirección en muchas barajas (el Jinete cabalga, el Barco navega, las Nubes tienen un lado oscuro y uno claro, la Guadaña corta hacia un lado). Más allá de la imagen, el peso de la frase *siempre* viaja hacia la derecha. La primera carta *se convierte* en la segunda, o *se tiñe* de la segunda.
    `,
    examplesTitle: "Ejemplos Prácticos: Orden y Evolución Temporal",
    examples: [
        {
            pregunta: "¿Qué pasará con mi estado financiero este mes?",
            combinacion: "Peces (34) + Osos (15)",
            lectura: "Pasamos del dinero fluyente, liquidez (Peces) a las finanzas fuertes, protección, o un pago de un jefe/banco (Oso).",
            cambio_orden: "Oso + Peces indicaría un jefe fuerte (Oso) que da mucho dinero (Peces), o ahorros que se invierten/fluyen.",
            contexto: "Economía y finanzas",
            conclusion: "La liquidez (dinero suelto o comercio) está evolucionando hacia la acumulación fuerte. El dinero se afirma o entra un capital mayor (protección y fuerza financiera)."
        },
        {
            pregunta: "¿Cómo evolucionará si envío este currículum?",
            combinacion: "Carta (27) + Ancla (35)",
            lectura: "El punto de origen es el papel, el currículum o mensaje escrito (Carta). Evoluciona hacia la fijeza, la seguridad y el anclaje a largo plazo (Ancla).",
            cambio_orden: "Ancla + Carta significaría un trabajo seguro que trae papeleo, o sentirse atascado esperando un mensaje.",
            contexto: "Búsqueda laboral",
            conclusion: "El currículum (Carta) 'desembarcará' bien. Conducirá a estabilidad y seguridad laboral. Es una excelente señal de asentamiento (Ancla)."
        },
        {
            pregunta: "¿Debería confiar en esta nueva amistad?",
            combinacion: "Perro (18) + Nubes (6)",
            lectura: "Comienza como una lealtad, una conexión amistosa y transparente (Perro). Evoluciona hacia confusión, malentendidos y falta de claridad (Nubes).",
            cambio_orden: "Nubes + Perro implicaría pasar de una época confusa a encontrar la lealtad y el apoyo amistoso.",
            contexto: "Relaciones interpersonales",
            conclusion: "Atención: lo que hoy parece una amistad sólida o persona leal (Perro) se tornará confuso, problemático o decepcionante a futuro (Nubes)."
        },
        {
            pregunta: "¿Qué sucederá luego de esta pelea de pareja?",
            combinacion: "Látigo (11) + Sol (31)",
            lectura: "El punto de partida es la discusión, el conflicto vibrante y la agresión (Látigo). El destino final es la iluminación, el calor y la alegría absoluta (Sol).",
            cambio_orden: "Sol + Látigo habría significado destruir o arruinar un momento excelente; una victoria terminando en pleito repetitivo.",
            contexto: "Crisis de pareja",
            conclusion: "La discusión fue un mal necesario pero purificador. Después de la tormenta verbal y el roce (Látigo), todo saldrá a la luz trayendo éxito, claridad y felicidad plena (Sol)."
        }
    ]
  },
  {
    id: "gramatica-lenormand",
    title: "La Gramática Práctica: Sustantivo y Verbo/Adjetivo",
    icon: "BookOpen",
    content: `
Para dominar el Lenormand, debes ver las cartas no como entidades rígidas, sino como un vocabulario flexible o "palabras" dentro de una oración. La combinación más recurrente cae en dos modelos:

### Fórmula 1: Sustantivo + Adjetivo
La Carta 1 da el objeto/persona. La Carta 2 da su cualidad.
- **Casa + Trébol** = Hogar (sust) + Aleatorio/Afortunado (adj) -> "Un hogar feliz pero efímero o pequeño".

### Fórmula 2: Sustantivo + Verbo / Acción pasiva
La Carta 1 es el objeto de la frase o el que inicia la acción. La Carta 2 describe lo que está haciendo o lo que le sucede al objeto 1.
- **Libro + Guadaña** = Un secreto (sust) que es expuesto repentinamente (verbo: cortar/descubrir bruscamente).
    `,
    examplesTitle: "Ejemplos Prácticos: Traduciendo el Lenguaje Simbólico",
    examples: [
        {
            pregunta: "¿Por qué actúa de esa forma tan hermética?",
            combinacion: "Libro (26) + Torre (19)",
            lectura: "Sustantivo: El secreto. Adjetivo: Institucionalizado, alto, aislado, amurallado.",
            cambio_orden: "Torre + Libro sería 'una institución o autoridad (sustantivo) que guarda secretos u ofrece estudios (adjetivo)'.",
            contexto: "Comportamiento psicológico",
            conclusion: "La persona ha levantado altos muros (Torre) alrededor de algo que no quiere mostrar (Libro). Es un secreto celosamente custodiado y solitario."
        },
        {
            pregunta: "¿Qué significa esta oportunidad inusual que cruzó mi camino?",
            combinacion: "Trébol (2) + Caminos (22)",
            lectura: "Sustantivo: La pequeña suerte rápida. Verbo: Elegir/dividirse. Adjetivo: Plural, alternativa.",
            cambio_orden: "Caminos + Trébol indicaría que 'tener que tomar una decisión trajo surte temporal' (una encrucijada afortunada).",
            contexto: "Decisiones imprevistas",
            conclusion: "Esta oportunidad (suerte efímera) te va a obligar a tomar una decisión rápida. Te abre la posibilidad de caminar por nuevas vías alternativas (Caminos)."
        },
        {
            pregunta: "¿De qué trata realmente este negocio comercial?",
            combinacion: "Zorro (14) + Peces (34)",
            lectura: "Sustantivo: El Zorro (lo laboral, o la inteligencia astuta). Adjetivo: Fluido, financiero, comercial.",
            cambio_orden: "Peces + Zorro indicaría un dinero o negocio (sustantivo) falseado, fraude (adjetivo) o trabajo estrictamente corporativo.",
            contexto: "Inversión inicial",
            conclusion: "Es un empleo o proyecto laborioso donde debes ser muy astuto (Zorro), y tiene un potencial plenamente financiero e independiente (Peces). Un 'negocio inteligente', sin jefes abusivos (si no hay oso)."
        },
        {
            pregunta: "¿Qué le espera a este acuerdo o contrato recién firmado?",
            combinacion: "Anillo (25) + Ratones (23)",
            lectura: "Sustantivo: El contrato/vínculo. Verbo: Mermar/Corroer/Robar.",
            cambio_orden: "Ratones + Anillo: Las pérdidas o el estrés (sustantivo) terminan en un nuevo acuerdo vinculante que da fin al ciclo.",
            contexto: "Asuntos legales",
            conclusion: "Lamentablemente, este contrato será una fuente de estrés continuo, pérdida de recursos y desgaste progresivo. No es un vínculo sano (y quizás estén robando poco a poco)."
        }
    ]
  },
  {
    id: "filtro-contexto",
    title: "El Filtro del Contexto: La misma carta, mil respuestas",
    icon: "Filter",
    content: `
El error numérico más común de principiantes es creer que una combinación significa *siempre lo mismo*. **En el Lenormand, NO EXISTEN significados absolutos sin contexto.** El contexto o la "pregunta específica" actúa como un filtro óptico: sólo deja pasar el "color" adecuado de la carta.

Si la Carta 15 es el **Oso** (Jefe, Fuerza, Protección Financiera, Madre posesiva), ¿qué significa cruzado con la **Niña/Niño (13)** (nuevo comienzo, pequeñez, inmadurez, cría)?

- Si la pregunta es **Laboral**: Un nuevo jefe, o alguien con poder actuando de forma infantil.
- Si la pregunta es **Familiar**: Una madre o padre sobreprotector sofocando a un niño.
- Si la pregunta es **Dinero**: Un pequeño capital ahorrado que recién empieza a engordar.

El arte real es alinear el símbolo crudo con el reino de la pregunta.
    `,
    examplesTitle: "Ejemplos Prácticos: El Poder Modelador del Contexto",
    examples: [
        {
            pregunta: "[Caso A: Empleo] vs [Caso B: Salud]",
            combinacion: "Ataúd (8) + Sol (31)",
            lectura: "Significado base: Una finalización oscura seguida de luz brillante absoluta y vitalidad.",
            cambio_orden: "Sol + Ataúd indicaría quemarse por completo, quemar una excelente oportunidad y llevarla a la nada.",
            contexto: "Contextos múltiples",
            conclusion: "[Laboral]: Después del estancamiento, cierre de la empresa o un duro fin, llega el éxito total y la gran victoria brillante. [Salud]: Una larga enfermedad (Ataúd) llega a su sanación completa y milagrosa (Sol)."
        },
        {
            pregunta: "[Caso A: Amor] vs [Caso B: Problema Mecánico]",
            combinacion: "Corazón (24) + Llave (33)",
            lectura: "Significado base: El centro vital / pasión que encuentra su solución, apertura o certeza garantizada.",
            cambio_orden: "Llave + Corazón sería un éxito o certeza asegurada (Llave) referida a las emociones del alma (Corazón).",
            contexto: "Contextos múltiples",
            conclusion: "[Amor]: El amor está asegurado, es la persona clave, o habrá una gran apertura de sentimientos reales y exitosos. [Mecánico]: El 'corazón' de la máquina (motor) es la clave del problema (necesitas revisar el motor central, ahí está la solución)."
        },
        {
            pregunta: "[Caso A: Dinero] vs [Caso B: Espiritualidad]",
            combinacion: "Estrellas (16) + Peces (34)",
            lectura: "Significado base: La inmensidad cósmica o guía en red unida al flujo fluido y constante.",
            cambio_orden: "Peces + Estrellas: Finanzas guiadas por un propósito o la abundancia financiera difusa en redes de internet.",
            contexto: "Contextos múltiples",
            conclusion: "[Dinero]: Abundancia extrema, 'dinero caído del cielo', flujo estelar, éxito comercial en redes u on-line. [Espiritual]: Un flujo espiritual profundo. Sentirse conectado canalizando una gran expansión de fe o visiones."
        },
        {
            pregunta: "[Caso A: Dinámica domética] vs [Caso B: Problema Legal]",
            combinacion: "Casa (4) + Látigo (11)",
            lectura: "Significado base: La familia/propiedad junto a discusiones, castigo, agresividad repetitiva.",
            cambio_orden: "Látigo + Casa indicaría que discusiones repetitivas acaban arraigadas (un debate crónico).",
            contexto: "Contextos múltiples",
            conclusion: "[Doméstico]: Conflictos, gritos, problemas continuos con la familia o convivientes. Una casa nerviosa. [Legal]: Un conflicto recurrente referido a una propiedad física o establecimiento de la base de la discordia."
        }
    ]
  },
  {
    id: "polaridad-y-efectos",
    title: "Polaridad y las Cartas Negativas de Efecto",
    icon: "Zap",
    content: `
Aunque el Lenormand evita los moralismos, usa las polaridades de lo benéfico vs lo destructivo para diagnosticar realidades materiales. Cuando analizas pares, debes evaluar la polaridad dominante. La norma general es:
- **Positivo + Positivo** = Positivo Fuerte (Sol + Trebol = Gran Suerte)
- **Positivo + Negativo** = Positivo manchado o destruido (Sol + Nubes = Éxito empañado y de poca luz)
- **Negativo + Positivo** = Recuperación o salvación (Ataúd + Sol = Fin seguido de sanación renaciente)

### Cartas de Acción y Efecto Especial
Ciertas cartas no sólo adjetivan pasivamente; **irrumpen** rompiendo el paragrama anterior.
1. **La Guadaña (10):** *Corta bruscamente*. Destruye lo anterior o le da una sensación de dolor extremo o rapidez.
2. **Los Ratones (23):** *Desgasta lentamente*. No corta como la guadaña. Se comen, merman, vacían, estresan lentamente la carta interior.
3. **El Ataúd (8):** *Frena y entierra*. Pone la carta anterior en la caja y le pone la tapa, apagándola.
4. **La Cigüeña (17):** *Mutación o mejora*. Cambia inevitablemente la carta anterior hacia algo nuevo.
    `,
    examplesTitle: "Ejemplos Prácticos: Dinámicas de Destrucción, Desgaste y Mutación",
    examples: [
        {
            pregunta: "¿Qué pasará con la excelente relación con mi socia?",
            combinacion: "Flores (9) + Guadaña (10)",
            lectura: "Las Flores representan alegría, gracia, un bonito regalo social. La Guadaña interviene y corta bruscamente esa armonía.",
            cambio_orden: "Guadaña + Flores sería un choque o dolor punzante (accidente verbal) que luego se suaviza o se arregla con una invitación diplomática.",
            contexto: "Sociedades",
            conclusion: "Esa excelente y agradable relación social, un 'contrato feliz', será cercenada, cortada de repente. Puede haber un altercado rápido y peligroso (una ruptura brusca)."
        },
        {
            pregunta: "¿Cómo va mi plan financiero de ahorro anual?",
            combinacion: "Peces (34) + Ratones (23)",
            lectura: "Los Peces son tus finanzas e inversiones (Sujeto Múltiple). Los Ratones actúan mermando progresivamente, robando pequeñas porciones, contaminando.",
            cambio_orden: "Ratones + Peces indicaría que después de sufrir grandes pérdidas y estrés financiero brutal, empieza a entrar un flujo de dinero nuevamente.",
            contexto: "Economía y planificación",
            conclusion: "El desgaste financiero es grande. Hay fugas, micro-robos, o estás gastando recursos lentamente por estrés o mala gestión. Si no cambias algo, dejarán todo vacío."
        },
        {
            pregunta: "¿Qué resultará de todos mis estudios y dedicación este último año?",
            combinacion: "Libro (26) + Ataúd (8)",
            lectura: "El Libro es el conocimiento profundo, lo que estudiaste y estaba oculto. El Ataúd cierra, frena o finaliza este sujeto (Sustantivo finalizado).",
            cambio_orden: "Ataúd + Libro significa salir del estancamiento intelectual sacando una lección importante, o mantener en secreto un vacío existencial.",
            contexto: "Educación / Esfuerzo intelectual",
            conclusion: "Todo tu estudio, de modo frustrante, quedará en nada o no llegará a completarse de la forma fluida esperada. Te estancarás, paralizarás el aprendizaje, o terminará un ciclo de encierro."
        },
        {
            pregunta: "¿Puedo mejorar la actual casa donde resido?",
            combinacion: "Casa (4) + Cigüeñas (17)",
            lectura: "La Casa es tu hogar estable. Las Cigüeñas (carta de cambio y mudanzas) obligan al sujeto a transmutar o mejorarse.",
            cambio_orden: "Cigüeñas + Casa sería un cambio general de vida que aterriza en la compra o establecimiento de una casa.",
            contexto: "Vivienda física",
            conclusion: "Sí. Las Cigüeñas traerán un cambio estructural positivo. O bien renuevas o mejoras sustancialmente el hogar para bien, de modo progresivo, o directamente indica que te vas a mudar de casa buscando mejoras."
        }
    ]
  }
];
