export const tripletsBlocks = [
  {
    id: "enfoque-central",
    title: "El Núcleo: La Carta Central y el Enfoque",
    icon: "Target",
    content: `
El método más versátil y extendido para leer una tríada (3 cartas) es el del **Enfoque Central** o **La Carta como Pivote**.

En este enfoque, la **Carta 2 (la del medio)** no es una transición, sino el **corazón absoluto** de la lectura. Representa el tema principal, la esencia del problema o la situación central del consultante. 
Las cartas que la flanquean (Carta 1 a la izquierda y Carta 3 a la derecha) actúan como potentes **modificadores bivalentes**: la describen, explican por qué está ahí, o le aportan dirección.

Esta técnica es ideal para preguntas abiertas como *"¿De qué trata este asunto?"* o *"¿Cuál es el núcleo del problema?"*. Aquí no leemos estrictamente de izquierda a derecha de forma narrativa, sino radialmente desde el centro hacia afuera.
    `,
    examplesTitle: "Ejemplos: La Carta Central como Núcleo",
    examples: [
        {
            pregunta: "¿Por qué estoy sintiendo tanta ansiedad estos días?",
            cartas: ["Ratones (23)", "Montaña (21)", "Zorro (14)"],
            lectura: "El núcleo es la Montaña (21): el bloqueo, la pared inmensa, un obstáculo masivo. Los Ratones (23) indican que este bloque te desgasta y resta energía progresivamente. El Zorro (14) indica que el trabajo o algo que requiere mucha cautela mental rodea a este obstáculo.",
            cambio_orden: "Si la central fuera Ratones [Montaña + Ratones + Zorro], el estrés general (núcleo) está provocado por un bloque tan grande en tu trabajo u objetivos astutos que te está comiendo la salud.",
            contexto: "Salud emocional",
            conclusion: "Tu ansiedad se origina por sentirte ante un muro imposible de cruzar (Montaña central). Es un bloque frío (quizás laboral o logístico por el Zorro) que está devorando silenciosamente tu paciencia (Ratones)."
        },
        {
            pregunta: "¿Cuál es la verdadera intención de mi nueva socia?",
            cartas: ["Perro (18)", "Oso (15)", "Guadaña (10)"],
            lectura: "La central es el Oso (15): representa liderazgo, protección financiera o una figura de gran fuerza de carácter. Está flanqueada por la lealtad (Perro) pero termina en una decisión o corte rápido (Guadaña).",
            cambio_orden: "Oso + Perro + Guadaña como lectura lineal sería 'jefe leal que corta'. Pero con enfoque central: La firmeza o liderazgo (Oso) es su eje, viene de un ambiente amistoso pero terminará tomando decisiones muy tajantes (Guadaña).",
            contexto: "Asociación comercial",
            conclusion: "Su núcleo no es hacer amigos (eso quedó relegado a un lado), sino imponer su fuerza, dominio y poder financiero (Oso central). Aunque se vea amistosa (Perro), tomará decisiones cortantes y repentinas si es necesario (Guadaña)."
        },
        {
            pregunta: "¿Qué energía me rodeará este fin de semana?",
            cartas: ["Jardín (20)", "Corazón (24)", "Jinete (1)"],
            lectura: "El centro es el Corazón (24): alegría pura, amor, pasión, centro emocional feliz. A la izquierda tiene vida social/pública (Jardín) y a la derecha llegadas nuevas/movimiento rápido (Jinete).",
            cambio_orden: "Si Jardín estuviese en el medio [Corazón + Jardín + Jinete], el evento público sería lo principal, adjetivado por el amor.",
            contexto: "Energía del fin de semana",
            conclusion: "El fin de semana tiene como eje emociones maravillosas y goce (Corazón). Nacerán de un evento social, salida o parque (Jardín) que trae noticias, acercamientos acelerados o la llegada de alguien importante rápidamente (Jinete)."
        },
        {
            pregunta: "¿Qué debo saber sobre esta vivienda que quiero comprar?",
            cartas: ["Libro (26)", "Ancla (35)", "Serpiente (7)"],
            lectura: "La carta pivotal es el Ancla (35): nos habla de algo pesado, difícil de mover, pero también un compromiso a larguísimo plazo. Está flanqueada por cosas ocultas o papelerío (Libro) y problemas venenosos/cañerías/sinuosidades (Serpiente).",
            cambio_orden: "Si la Serpiente fuera el eje [Libro + Serpiente + Ancla], el foco sería un engaño inmenso, crónico, difícil de desenterrar.",
            contexto: "Bienes raíces",
            conclusion: "Adquirir esta vivienda es atarte o comprometerte (Ancla central) en un lugar donde existen secretos sin revelar o historia oculta (Libro) que resultará en un problema tóxico, engaño o complicaciones severas de arquitectura (Serpiente). No compres."
        }
    ]
  },
  {
    id: "cronologica-lineal",
    title: "Lectura Lineal: Pasado, Presente y Futuro",
    icon: "Clock",
    content: `
Cuando requerimos entender el **flujo del tiempo** o la evolución de una situación, la lectura de 3 cartas de izquierda a derecha es la más efectiva. Aquí la Carta 1 es el punto de origen (Pasado), la Carta 2 es el estado inmediato (Presente) y la Carta 3 señala el destino inevitable (Futuro).

1. **Carta 1 (Izquierda):** *Lo que pasó* / El cimiento o antecedente inmediato que empujó las cosas a su estado actual.
2. **Carta 2 (Centro):** *Lo que pasa* / ¿Dónde estamos pisando hoy? El estado del asunto en el "ahora".
3. **Carta 3 (Derecha):** *Lo que pasará* / El desarrollo futuro inminente hacia donde desemboca la línea causal.

Esta lectura es narrativa y visual: ves a la situación desplazarse de un extremo al otro, fluyendo de una imagen a la siguiente como los viñetas de un cómic.
    `,
    examplesTitle: "Ejemplos: Despliegue Cronológico",
    examples: [
        {
            pregunta: "¿Cómo evolucionará mi conflicto legal en los próximos meses?",
            cartas: ["Látigo (11)", "Torre (19)", "Peces (34)"],
            lectura: "Pasado (Látigo): Hubo discusiones continuas, roces, pleitos interminables y agresividad verbal. Presente (Torre): Hoy están en el tribunal, o el asunto se maneja desde una institución burocrática alta e implacable. Futuro (Peces): Conduce inevitablemente al flujo financiero, pagos o comercio.",
            cambio_orden: "Peces + Torre + Látigo habría indicado que un dinero pasado se estancó en tribunales (Torre) llevando al futuro a pleitos crónicos y agresiones sistemáticas (Látigo).",
            contexto: "Conflictos y justicia",
            conclusion: "Toda esa guerra anterior con discusiones acaloradas ha quedado ahora en manos de una institución formal y legal (Abogados/Corte). A futuro, decantará favorablemente (o el veredicto obligará) a resolverlo mediante dinero líquido."
        },
        {
            pregunta: "¿Qué le espera a nuestra relación que se enfrió?",
            cartas: ["Ataúd (8)", "Llave (33)", "Sol (31)"],
            lectura: "Pasado (Ataúd): Terminaron las cosas, un estancamiento sepulcral, una etapa muy oscura y de silencio. Presente (Llave): Ahora mismo hay una 'solución' abriéndose en la mente o un paso definitivo que descifra el problema. Futuro (Sol): Regresan la calidez plena, la felicidad inmensa y la claridad máxima.",
            cambio_orden: "Sol + Llave + Ataúd habría sido trágico: Un gran éxito del pasado, solucionado, pero arrastrándose al silencio y la muerte del vínculo total al final.",
            contexto: "Asunto de pareja",
            conclusion: "Ese tremendo estancamiento y silencio frío y apagado (Ataúd) quedó en el pasado; recientemente la 'fórmula' o la certeza del vínculo se liberó (Llave), trayendo calor, claridad y felicidad radiante al futuro (Sol). Sobrevivieron y brillan."
        },
        {
            pregunta: "¿Conseguiré firmar ese contrato discográfico/literario?",
            cartas: ["Estrellas (16)", "Carta (27)", "Ratones (23)"],
            lectura: "Pasado (Estrellas): Soñabas a lo grande, había mucha ilusión o te comunicabas en grandes redes. Presente (Carta): Has llegado al punto donde los documentos, mensajes formales, burocracia en papel ya existen y los tienes en mano hoy. Futuro (Ratones): Este documento menguará, roerá tus nervios, fallará lentamente o mermará todo tu trabajo.",
            cambio_orden: "Si terminara en Estrellas, significaría 'papeleo estresante hoy que decantará en tus sueños más guidados'.",
            contexto: "Acuerdos y trabajo",
            conclusion: "Tenías grandes expectativas ilusorias iniciales (Estrellas). Te han entregado un documento escrito (Carta hoy). NO lo firmes a ciegas: el futuro muestra que ese papel será la fuente de un tremendo desgaste, pérdidas progresivas o estrés profundo (Ratones)."
        },
        {
            pregunta: "¿Hacia dónde va mi recuperación quirúrgica post-operación?",
            cartas: ["Cigüeñas (17)", "Árbol (5)", "Parque/Jardín (20)"],
            lectura: "Pasado (Cigüeñas): Hubo intervención que introdujo un cambio, mudanza o evolución drástica en el cuerpo. Presente (Árbol): Actualmente tus raíces, salud y fuerza vital, tomando tiempo pacientemente para establecerse. Futuro (Parque): Un espacio abierto, sociedad, sanitarismo comunitario o curación pública abriéndose.",
            cambio_orden: "Árbol + Cigüeñas + Parque vería el Estado de salud actual cambiando hacia la vida externa pública libre.",
            contexto: "Salud física",
            conclusion: "El procedimiento/cambio que realizaste funcionó operativamente. En este instante gozas de una salud arraigándose. Lentamente, esto te dirigirá al pleno gozo de la vida social, el exterior y el encuentro sano con los demás. Una excelente línea cronológica."
        }
    ]
  },
  {
    id: "gramatica-expandida",
    title: "Gramática: Sujeto, Verbo y Predicado",
    icon: "AlignLeft",
    content: `
Esta es la técnica de leer las imágenes de izquierda a derecha como si estuvieras leyendo un libro, pero aplicando roles estrictamente gramaticales a cada carta. No se trata del "tiempo", sino de "construir una frase".

1. **Carta 1:** El Sujeto / El protagonista o sustantivo de la frase principal.
2. **Carta 2:** El Verbo o Adjetivo Principal / Lo que el sujeto ES o ESTÁ HACIENDO.
3. **Carta 3:** El Predicado o Adverbio / Cómo se resuelve esa acción y a quién le sucede.

*Fórmula Clásica:* "Card 1 hace Card 2 hacia o a favor de/en Card 3."
    `,
    examplesTitle: "Ejemplos: Sintaxis y Oraciones Complejas",
    examples: [
        {
            pregunta: "¿Por qué el clima familiar se siente tan hostil?",
            cartas: ["Casa (4)", "Látigo (11)", "Cruz (36)"],
            lectura: "Sujeto: La Casa (familia, hogar). Verbo: Azota/Discute constantemente (Látigo). Predicado: Como una carga aplastante kármica o un sufrimiento extremo.",
            cambio_orden: "Cruz + Casa + Látigo: 'Una pesadumbre kármica familiar genera azotes'.",
            contexto: "Clima doméstico",
            conclusion: "Formamos la oración: 'El núcleo familiar (Casa) está sosteniendo discusiones constantes (Látigo) que se sienten como una carga emocional tremendamente agobiante (Cruz)'."
        },
        {
            pregunta: "¿Cómo percibe el comité de la empresa mi propuesta radical?",
            cartas: ["Zorro (14)", "Cigüeñas (17)", "Nubes (6)"],
            lectura: "Sujeto: Alguien calculador, analítico y cauto, tu empleado interno astuto o el comité corporativo (Zorro). Verbo: Buscar cambiar la situación actual, alterar y elevar (Cigüeñas). Predicado/Objeto: De forma muy confusa, dudosa, inestable mentalmente o hacia un sitio turbio (Nubes).",
            cambio_orden: "Si terminamos en Sol, la oracion sería: 'La mesa astuta corporativa percibe el gran cambio como brillante y claro'.",
            contexto: "Contexto corporativo",
            conclusion: "La oración dice: 'Esta movida astuta y laboral (Zorro) promete grandes mutaciones/cambios (Cigüeñas) que, ineludiblemente, generan confusión y una falta total de claridad (Nubes)'."
        },
        {
            pregunta: "¿Cuál debería ser mi actitud en el encuentro con mi ex-pareja?",
            cartas: ["Nubes (6)", "Guadaña (10)", "Anillo (25)"],
            lectura: "Sujeto: La gran confusión y mente turbia/trastornada (Nubes). Verbo: Cortar definitivamente, extirpar rápido, sin piedad y rápido (Guadaña). Objeto: El círculo cerrado, el vínculo repetitivo, el compromiso sin fin (Anillo).",
            cambio_orden: "Anillo + Nubes + Guadaña: 'Un vínculo que enturbia cortándose'.",
            contexto: "Actitud a tomar / Consejo",
            conclusion: "Traducido literalmente a orden directa: 'Ante tanta confusión emocional, toma el cuchillo, decídete rápido a tajo limpio (Guadaña) e interrumpe ese anillo y patrón cíclico repetitivo'. Termina el círculo."
        },
        {
            pregunta: "¿Debería confiar en el nuevo consejero de la secundaria de mi hijo?",
            cartas: ["Oso (15)", "Libro (26)", "Serpiente (7)"],
            lectura: "Sujeto: El Oso es la autoridad fuerte (el consejero principal, el cuerpo con jerarquía o un jefe maternal/paternal). Verbo: El Libro indica estudios secretos, cosas que mantiene encerradas u oculta en su sabiduría. Objeto: Hacia un lugar absolutamente enroscado, venenoso o falso (Serpiente).",
            cambio_orden: "Serpiente + Libro + Oso: 'Un engaño en los documentos de la figura materna o jerárquica'.",
            contexto: "Entorno escolar y figuras de autoridad",
            conclusion: "Sentencia: 'El adulto o maestro en una posición de gran poder y liderazgo directivo (Oso) esconde tras una cubierta culta o misteriosa una lengua bífida, engaños o complicaciones viperinas muy tóxicas (Serpiente)'."
        }
    ]
  },
  {
    id: "causa-y-consecuencia",
    title: "El Efecto Dominó: Causa, Desarrollo y Consecuencia",
    icon: "Network",
    content: `
Esta variante subraya el proceso de la **mecánica de una situación**. Es diferente a la línea cronológica estricta o gramatical. Aquí leemos a las cartas como un mecanismo causal: **A produce a B, y como resultado de B, ocurre inevitablemente C**.

1. **Causa (Carta 1):** La raíz del suceso, la semilla de acción original.
2. **Reacción / Proceso (Carta 2):** Cómo se traduce la carta 1 al chocar con la realidad.
3. **Efecto Dominó (Carta 3):** Consecuencia directa que se paga, o el nuevo estatus generado.

Aquí no importa el "futuro" lejano abstracto, sino la relación inexpugnable e incuestionable de que un acto A, generó una ficha B cayendo sobre C.
    `,
    examplesTitle: "Ejemplos: Reacciones en Cadena",
    examples: [
        {
            pregunta: "¿Por qué colapsó repentinamente mi negocio on-line?",
            cartas: ["Nubes (6)", "Ratones (23)", "Ataúd (8)"],
            lectura: "Causa: Todo inició por tener poca claridad, dudas gigantes o mala visión, y esconder problemas debajo de la alfombra en neblinas (Nubes). Produjo B: Eso te llevó a una severa mala gestión de estrés, merma constante y pequeñas pérdidas diarias incesantes que carcomieron tu energía o el stock (Ratones). Produjo C: Finalmente el colapso, estancamiento total, sin solución: entierro literal del proyecto (Ataúd).",
            cambio_orden: "Ratones + Nubes + Ataúd diría: 'Pérdidas ocultas trajeron problemas confusos que remataron en muerte lenta'.",
            contexto: "Emprendimiento que frena",
            conclusion: "Por no ver con claridad al principio y vivir aturdido, permitiste fugas y pequeños errores constantes que erosionaron la estructura financiera hasta el cierre definitivo. Una reacción en cadena brutal y descendente."
        },
        {
            pregunta: "¿Cuál fue el motivo para que él me escribiera de la nada ayer?",
            cartas: ["Zorro (14)", "Búho/Pájaros (12)", "Jardín (20)"],
            lectura: "Causa base: Empezó movido por una intención estratégica o cautelosa (Zorro), buscando su propia conveniencia. Desarrollo (Pájaros/Chatter): Causa B = Ese interés se tradujo en que necesitaba platicar frívolamente o charlar en digital contigo buscando ansiedad. Consecuencia (Parque): Como corolario generó esto para ser parte de tu círculo social abierto o querer hacerse ver publicamente hacia ti de vuelta.",
            cambio_orden: "Si Jardín causara a Pájaros y terminara en Zorro publicaría algo inteligente como cazador en un ambiente grupal.",
            contexto: "Expareja escribiendo reapareciendo",
            conclusion: "Él escribió buscando tantear la zona estratégicamente, de forma astuta, casi manipuladora hacia ti (causa), todo derivó al charla ligera/nerviosa (desarrollo), sólo para que lo vieras en el área pública o insertarse nuevamente en 'los encuentros sociales abiertos' como un amigo de la comunidad. No es verdadero amor (Falta Corazón / Perro), es un operativo Zorro buscando atención."
        },
        {
            pregunta: "¿Qué pasará si decido renunciar e independizarme la próxima semana?",
            cartas: ["Guadaña (10)", "Caminos (22)", "Sol (31)"],
            lectura: "Acción principal pura (Causa): Tomas una gran decisión repentina, tajante, cortando lo obsoleto muy velozmente, un duelo inmediato rápido (Guadaña). Esto genera directamente B: Te arroja inmediatamente a una calle bifurcada con muchas opciones abiertas, tomando rumbos alternativos desconocidos (Caminos). Consecuencia ineludible C: El final será el éxito arrollador, resplandor e iluminación energética extrema, logras tu brillo original máximo (Sol).",
            cambio_orden: "Si la Guadaña cae al final del Sol, el final es triste: tendrías muchísimas opciones brillante pero un error cortará tu luz inmensa de repente.",
            contexto: "Decisiones que cambian la vida",
            conclusion: "Corta la soga inmediatamente y que llueva dolor u honor pronto. El corte radical abre senderos alternativos que decantarán garantizado hacia tu mayor e inconmensurable éxito, abundancia de luz y energía."
        },
        {
            pregunta: "¿Por qué mi hermana no fue a la boda la semana pasada?",
            cartas: ["Osos (15)", "Cruz (36)", "Montaña (21)"],
            lectura: "Causa Original: O bien celos y prepotencia maternal abrumadora, o la figura rígida de un líder o peso muy poderoso de posesividad dominándola (Oso). Efecto causado (Cruz): Generó que se llenara de un gran sufrimiento físico (puede ser enfermedad literal en cruz) o una carga kármica angustiosa/tristeza fatal pesando. Final de la Cadena (Montaña): Terminando su camino de ese día al encontrarse en su lugar aislada masivamente, un enorme y frío bloque solitario que no lograba sortearse.",
            cambio_orden: "Si la montaña causaba el sufrimiento con la figura maternal controlando detrás, sería por logística o distancia.",
            contexto: "Misterio por no presentarse",
            conclusion: "Se involucró en el medio algo fuertemente agobiante sobre proteccionismo exagerado o superior prepotente muy dominante. Eso le causó una sensación de gran angustia religiosa o culpa sufriente profunda que desencadenó un bloque frío como el hielo: quedó estancada en casa en un parálisis total, distanciándose enormemente."
        }
    ]
  },
  {
    id: "contexto-y-errores",
    title: "El Filtro del Contexto y Errores Comunes",
    icon: "AlertTriangle",
    content: `
A medida que unes 3 cartas, el margen de error también escala. Los dos problemas más comunes de un estudiante de esta academia son:

### Error 1: Leer "Cartas Flotantes" (No encadenar)
Un estudiante inexperto leería (Casa + Ataúd + Sol) así: *"Hay una casa. Luego hay algo triste. Luego hay iluminación"*. **Incorrecto.** El Lenormand es cine, no polaroids separadas. Se debe leer fluido: "Una familia estancada en oscuridad vuelve milagrosamente a ver la enorme luz".

### Error 2: Ignorar el Contexto Absoluto de la Pregunta
Si no usamos la *Lupa o Anteojo Correcto*, nos perderemos brutalmente. Una tríada neutral como \`Ancla + Caminos + Trébol\` no significa nada por sí misma. Tienes que sumergirla en el líquido oscuro del escenario que pregunta el consultante para revelar su fotografía oculta. ¡En cada contexto es un mensaje absolutamente dispar!
    `,
    examplesTitle: "Ejemplos: La Tríada Camaleónica ante el Contexto",
    examples: [
        {
            pregunta: "(Misma Tirada, Distintos Contextos)",
            cartas: ["Ancla (35)", "Caminos (22)", "Trébol (2)"],
            lectura: "Esta secuencia neutra muestra a la Estabilidad Absoluta y fijeza (Ancla) llegando a Opciones / Encrucijada de Vías (Caminos) lo cual finaliza en un toque de fortuna rápida o una alegría menor momentánea pero feliz (Trébol). Veamos como muta brutalmente con la lupa focalizada que aplica el usuario:",
            cambio_orden: "No aplica cambio de orden para este ejemplo multicontractual.",
            contexto: "Laboral / Romántico / Viaje",
            conclusion: "1. Si es Laboral: 'Dejar un trabajo fijo estable y fijo donde había estado por años (Ancla), abre una encrucijada temporal o decisiones libres optativas fortuitas placenteras con una suave suerte rápida o freelance efímero pero feliz (Trébol)'.\n2. Si es Romántico: 'El estancamiento y peso hundido con compromisos seguros inamovibles (Ancla) va a obligarte a decidir irte caminos diferentes de encrucijada y un golpe de gracia o pequeñas cosas alegres, pero fugaces sin futuro pesado largo (Trébol) a futuro'.\n3. Si es un Viaje: 'Te asentarás profundamente y atarás las amarras de llegada, luego recorrerás libremente cruces de paseos sintiéndote muy alegre o viendo opciones afortunadas sencillas'."
        },
        {
            pregunta: "(Error común: Traducción Literal Desconectada)",
            cartas: ["Perro (18)", "Torre (19)", "Peces (34)"],
            lectura: "Lector principiante diría: 'Tienes un amigo leal (Perro). También hay un gran edificio muy alto (Torre). Y veo muchos peces o quizás dinero fluyendo (Peces).' <-- ESTO NO DICE NADA. ES CARTOMANCIA ANTIGUA MALA.",
            cambio_orden: "Leyéndola con un enfoque encadenado narrativo causal sería muy superior. No separarlas.",
            contexto: "Pregunta sobre un amigo",
            conclusion: "Lectura profesional Lenormand (mezclando gramática fluida causal): 'Tu gran buen y leal amigo está muy solitario y aislado con muro superior arriba, tal vez por el trabajo institucional corporativo legal de autoridad burocrática enorme; y, al final ese mismo frío o distancia corporativa lo conduce en su causa hacia tener una abundancia extremadamente financiera, gran comercio y dinero.' ¡Es UNA sola historia contada unida, nada de entidades aleadas!"
        },
        {
            pregunta: "(Misma Tirada, Distintos Contextos)",
            cartas: ["Árbol (5)", "Látigo (11)", "Serpiente (7)"],
            lectura: "Base general: Una raíz sólida estable, paciencia vital que choca fuertemente contra disputas y rozamientos enérgicos terminando falsedad dolorosa tóxica o una mujer muy astuta perversa. Pero... ¿y si preguntamos sobre tu jardín literal real en tu casa?",
            cambio_orden: "Serpiente y látigo como raíz arruinarían todo desde antes de comenzar los golpes.",
            contexto: "Fisioterapia vs Jardinería real casa",
            conclusion: "1. Sobre tu salud de Fisioterapia: 'Tu cuerpo se recupea (Árbol salud) pero requiere terapia continua física de repetición o un rozamiento muscular profundo (Látigo), aunque se va enroscando o desviando dolorosamente (Sinuoso Serpiente) con los tubos e intestinos o las venas.'\n2. Pregunta Jardinería Casa literal Real (Lectura de suelo): '¡Tal cual! Hay un enorme árbol inmenso muy vigoroso de familia en tu patio (árbol) cuyas ramas azotan la estructura de arriba (Látigo golpe) trayendo víboras o tuberías que se doblan o venenos por tuberías reptando por debajo del rosal!'. TODO SIGNIFICA ALGO EXCLUSIVO PARA CADA CONSULTA EXACTA."
        },
        {
            pregunta: "(Error común: Invertir mentalmente el tiempo por la Carta 3 muy buena)",
            cartas: ["Sol (31)", "Montaña (21)", "Ataúd (8)"],
            lectura: "El aprendiz ve al Sol (la mejor carta) al inicio y ve al Ataúd (peor carta) al final. Para 'no dar malas noticias', lee 'El bloqueo frena a la muerte y sale a la total iluminación!' Esto es autoengaño o endulceo.",
            cambio_orden: "Sólo si fuera Ataúd + Montaña + Sol el resultado sería ese para ser maravilloso.",
            contexto: "Estado General Real de Consultas serias adultas",
            conclusion: "El Lenormand no es un coach positivista ciego de motivación sin base. Es una topografía fría y objetiva. Esta triada significa exactamente: 'Había un inmenso calor increíble y energía (Sol); un muro inamovible de piedra fría paró todo abruptamente (Montaña) provocando inexorablemente un cierre silenciado fatal para estancarse definitivamente en una nada de vacío silvestre y muerta y oscuridad.' Es triste."
        }
    ]
  }
];
