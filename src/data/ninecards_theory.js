export const ninecardsBlocks = [
  {
    id: "arquitectura-base",
    title: "1. La Arquitectura Base: Centro, Pasado y Futuro",
    icon: "Grid",
    content: `
El retrato de 9 cartas (3x3) es un "Grand Tableau" en miniatura. Las 9 cartas dibujan un cuadro perfecto de la vida del consultante respecto a un tema específico.

La **Posición Central (Carta 5)** es el corazón indudable. Es el Sujeto, el *yo* del tema o la esencia cruda de la respuesta.
Las posiciones se leen por "Puntos Cardinales" formando una Cruz Interna (Cartas 2, 8, 4 y 6) interactuando con las líneas del tiempo puras:
- **Columna Izquierda (1, 4, 7):** El Pasado. Lo inamovible, las causas.
- **Columna Central (2, 5, 8):** El Presente. La realidad actual (lo mental arriba, lo terrenal abajo).
- **Columna Derecha (3, 6, 9):** El Futuro. La evolución y el destino.
    `,
    examplesTitle: "Ejemplos 1 y 2: La Cruz Interna y la Línea Cronológica",
    examples: [
        {
            contexto: "¿Lograré sacar adelante mi empresa que está en la quiebra?",
            cartas: ["Ratones (23)", "Nubes (6)", "Sol (31)", 
                     "Ataúd (8)", "Ancla (35)", "Peces (34)", 
                     "Torre (19)", "Látigo (11)", "Llave (33)"],
            posiciones: "1:Ratones (pérdidas pasadas), 2:Nubes (pensamientos grises), 3:Sol (éxito final mental). 4:Ataúd (estancamiento pasado base), 5:Ancla (tu postura inamovible hoy), 6:Peces (flujo económico próximo). 7:Torre (burocracia pasada), 8:Látigo (esfuerzo crónico actual), 9:Llave (certeza garantizada base).",
            filas_columnas: "Filas: Fila Superior (Mental) [23-6-31] pasaste por estrés y confusión pero tu mentalidad futura brilla. Fila Central (Real) [8-35-34] de la muerte del proyecto estás plantado hoy y llegará el dinero. Fila Base (Cimientos) [19-11-33] de pleitos institucionales hacia la solución asegurada. Columnas: Izquierda/Pasado [23,8,19]: Estrés por muerte y encierros legales. Centro/Presente [6,35,11]: Confuso, anclado rígidamente y azotándote trabajando. Derecha/Futuro [31,34,33]: ¡Victoria total, liquidez y certeza!",
            diagonales: "Diag Principal [23,35,33]: El estrés viejo (Ratones) anclándose te dio una enseñanza clave de resolución (Llave). Diag Inversa [19,35,31]: El peso de la institución en ruinas encontró asidero en el Ancla apuntando al éxito del Sol.",
            sintesis: "Sí, absolutamente. Estás firmemente anclado (Centro 5) soportando el latigazo actual, pero cada línea de la columna del futuro brilla asombrosamente resolviendo todo financieramente.",
            justificacion: "Se interpreta como un rotundo éxito porque la Columna del Futuro (Sol, Peces, Llave) contiene las mejores 3 cartas monetarias del mazo juntas, destruyendo cualquier ancla o ataúd de la columna del pasado.",
            enseñanza: "Ejes Temporales Absolutos: Si la columna izquierda entera es muy negativa, y la derecha entera ultra positiva, no hace falta bucear en más misterio. Es el fin de lo oscuro y un amanecer garantizado."
        },
        {
            contexto: "¿Qué destino le espera a mi relación clandestina (amante)?",
            cartas: ["Libro (26)", "Serpiente (7)", "Zorro (14)", 
                     "Jardín (20)", "Corazón (24)", "Cruce (22)", 
                     "Sol (31)", "Niño (13)", "Nubes (6)"],
            posiciones: "1:Libro(secreto), 2:Serpiente(mentiras/amante), 3:Zorro(trampa). 4:Jardín(evento social), 5:Corazón(amor actual), 6:Cruce(decisiones duales). 7:Sol(vitalidad antes), 8:Niño(inmadurez hoy), 9:Nubes(niebla y duda).",
            filas_columnas: "Columnas - Pasado [26,20,31]: Un secreto público o conocido iluminado, éxito oculto originario. Presente [7,24,13]: Amor (Centro) teñido de un lado engañoso femenino (Serpiente) e inmadurez frívola (Niño). Futuro [14,22,6]: Una trampa o mentira táctica (Zorro) forzando encrucijadas (Cruce) que decantan todo en oscuridad total sin claridad fina (Nubes).",
            diagonales: "Principal [26,24,6]: El secreto de corazón llega irremediablemente a un estancamiento turbio nublado. Inversa [31,24,14]: Un amor brillante que decanta en manipulación/falsedad o ser 'el trabajo' del otro (Zorro).",
            sintesis: "El amor (Centro) existe pero está contaminado. La clandestinidad originaria (Libro) los va a empujar a tener que tomar una decisión imposible en el futuro (Cruce) que terminará ahogando la relación en engaños astutos de conveniencia (Zorro) y turbiedad densa sin resolver (Nubes).",
            justificacion: "El Corazón como pivote (Centro 5) está asediado: Arriba la traición (Serpiente), a la derecha la duda (Caminos), y en el futuro convergen mentiras laborales (Zorro) y oscurecimiento (Nubes). Es insostenible.",
            enseñanza: "La Cruz del Amor Tóxico: Observa la cruz que rodea al Corazón central: Serpiente, Niño, Jardín, Cruce. Un amor tóxico mentiroso, inmaduro, muy público y dudoso. No hay Anclas ni Perros que den lealtad."
        }
    ]
  },
  {
    id: "filas-columnas-diagonales",
    title: "2. Lectura por Capas: Mente, Realidad y Base",
    icon: "Layers",
    content: `
Una técnica excepcional del 3x3 es desgranar al consultante mediante sus **Filas Horizontales** (Capas Terrenales):
- **Fila Superior (Cartas 1, 2, 3) - ESFERA MENTAL:** Lo que el consultante u otros están planeando. Sus miedos, metas abstractas o estado espiritual. Los "Cielos" del tema.
- **Fila Central (Cartas 4, 5, 6) - ESFERA DE LA REALIDAD:** Lo que está pasando *literalmente* en el mundo físico y perceptible hoy mismo. La acción pura o evento terrenal.
- **Fila Inferior (Cartas 7, 8, 9) - ESFERA BASE (Raíces):** El subconsciente profundo, motivaciones ocultas o aquello sobre lo cual se asientan las estructuras sólidas de la respuesta.
    `,
    examplesTitle: "Ejemplos 3 y 4: Mente, Cuerpo y Cimientos Funcionales",
    examples: [
        {
            contexto: "¿Cuál es el verdadero plan psicológico de mi socio hacia mí?",
            cartas: ["Luna (32)", "Guadaña (10)", "Estrellas (16)", 
                     "Perro (18)", "Zorro (14)", "Oso (15)", 
                     "Ancla (35)", "Libro (26)", "Peces (34)"],
            posiciones: "1:Luna, 2:Guadaña, 3:Estrellas. 4:Perro, 5:Zorro, 6:Oso. 7:Ancla, 8:Libro, 9:Peces.",
            filas_columnas: "Fila MENTAL [32-10-16]: Miedos profundos o fama (Luna) buscando un corte hostil (Guadaña) para llegar a brillar más grandes (Estrellas). Mente perversa. Fila REALIDAD [18-14-15]: Simulando ser 'leal' (Perro) él es el empleado/estafador calculador (Zorro Central) tratando con la figura de inmenso poder financiero de ustedes o jefe (Oso). Fila BASE [35-26-34]: Sus motivos reales enterrados; quedarse con un gran puerto de inversiones o contratos permanentes (Ancla), de forma oculta secretamente (Libro) de tu gran capital líquido o sociedad de dinero brutal (Peces).",
            diagonales: "Principal [32-14-34]: Ansiedad y subconsciente falso astuto yéndose por el dinero. Inversa [35-14-16]: Asegurar falsamente la red estelar de fama mintiendo en un trabajo (Zorro).",
            sintesis: "Su mente trama cortarte cabezas o desplazar todo repentinamente por codicia personal de lucir él. Actúa amistoso pero te miente operando bajo tu radar. Sus cimientos/base son ocultar la gigantesca apropiación comercial del capital de la empresa a largo plazo.",
            justificacion: "Se interpreta tan maquiavélico por el Zorro en la Posición Central (5), rodeado del Perro (18) y Libro (26) bajo la Guadaña mental. Zorro = Falsedad inteligente, Guadaña encima = Corte planeado.",
            enseñanza: "Lectura de Intenciones: Ver las filas como un 'Iceberg'. Arriba: Peligro cortante. En medio (superficie): Lo que tú ves (el colega Zorro falso amigo). Abajo (hundido bajo el agua): Los robos o libros secretos y fortunas encubiertas del fondo del mar."
        },
        {
            contexto: "¿Debería mudarme de ciudad tras mi difícil divorcio?",
            cartas: ["Cruz (36)", "Nubes (6)", "Cigüeñas (17)", 
                     "Torre (19)", "Caminos (22)", "Jinete (1)", 
                     "Árbol (5)", "Trébol (2)", "Casa (4)"],
            posiciones: "1:Cruz, 2:Nubes, 3:Cigüenas. 4:Torre, 5:Caminos, 6:Jinete. 7:Árbol, 8:Trébol, 9:Casa.",
            filas_columnas: "Fila MENTAL [36-6-17]: Tu mente arrastra el dolor abrumante del duelo (Cruz) en turbiedad total (Nubes) que exigen a gritos transmutar o un cambio masivo de ambiente (Cigüeñas). Fila REAL [19-22-1]: Física y terrenalmente estás encerrado solo y asilado con tu duelo legal/torre (19) frente a la bifurcación obligatoria de destinos (22), debiendo arrancar y huir veloz (1). Fila BASE [5-2-4]: Tus verdaderos cimientos apuntan a recuperar profunda salud vital pacífica (Árbol) con destellos de alegría pequeña suerte o liviandad (Trébol) anclando en un nuevo y seguro hogar final (Casa).",
            diagonales: "Esquinas base: La Cruz (duelo pesado) de tu pasado se une a la Casa del Futuro como la salvación, o Cruz+Casa [El sufrimiento actual cimentará tu nuevo hogar].",
            sintesis: "Estás atormentado mentalmente (Fila Superior) pero terrenalmente frente a la decisión correcta de movimiento urgente (Fila Media). Al saltar e irte ágil, encontrarás bases espirituales sanadoras, alegría y un hogar pleno (Fila Inferior perfecta 5-2-4).",
            justificacion: "La decisión central es positiva obligatoria (Caminos 22) coronada por un futuro espectacular de Jinete + Casa. Significa mudanza rápida y bendecida (Trébol protegiendo a la Casa).",
            enseñanza: "Contraste Capas Superior/Inferior: Cuando arriba (Mente) hay dolor, pero abajo (Bases) hay salud y hogar, significa que el miedo está sólo en el psiquismo del consultante causado por el trauma, pero la realidad táctica y el futuro son excelentes y benéficos."
        }
    ]
  },
  {
    id: "tecnicas-espejeo-caballo",
    title: "3. Magia Avanzada: Entorno, Espejeo y Salto de Caballo",
    icon: "Network",
    content: `
Existen estratos enigmáticos en un 3x3 para sacar información microscópica o forense que no sale leyendo linealmente:
1. **Espejeo (Mirroring Central):** Igual que en las tiradas de 5. Carta 4 se espeja con 6 (Entorno directo). Carta 2 con 8 (Plano mental cayendo al plano base). Carta 1 espeja la 9 (Origen profundo vs Destino distante). Carta 3 espeja 7 (Lo planeado chocando con la cruda raíz base del pasado).
2. **Las 4 Esquinas (El Marco):** Leer las cartas 1-3-7-9 juntas otorga la temática que encierra "la pintura", la cáscara del problema macro.
3. **El Salto de Caballo (Knight's Jump):** Basado en el movimiento en L del ajedrez (e.g. de Posición 1 a 6 y 8). Usado en Europa desde el siglo XVIII para buscar conexiones subconscientes secretas o "Lo Oculto que no te dicen" entre las cartas.
    `,
    examplesTitle: "Ejemplos 5 y 6: Extracción Forzada Subconsciente (Ajedrez de Cartas)",
    examples: [
        {
            contexto: "¿De qué se curte la relación inquebrantable que tiene mi jefa con ese director cuestionado?",
            cartas: ["Ataúd (8)", "Flores (9)", "Montaña (21)", 
                     "Látigo (11)", "Anillo (25)", "Peces (34)", 
                     "Serpiente (7)", "Llave (33)", "Sol (31)"],
            posiciones: "1:Ataúd, 2:Flores, 3:Montaña. 4:Látigo, 5:Anillo, 6:Peces. 7:Serpiente, 8:Llave, 9:Sol.",
            filas_columnas: "Centro: El Anillo. Son un VÍNCULO de acero legal irrompible. Espejos Diagonales [1-9]: Del fin mortuorio silencioso (8) hacia el Sol enorme vital reinante (31) = el pacto sobrevive extinciones de escandalos. [3-7]: Bloqueos monstruosos glaciales (21) unidos a engaños sibilinos u ocultamientos tóxicos gigantes y perversidad (7).",
            diagonales: "Marco (1+3+7+9) = Ataúd + Montaña + Serpiente + Sol = Una muerte silenciada bloqueada engañosamente con víboras que culmina victoriosa. (Lograron ocultar un escándalo macizo).",
            sintesis: "Al usar **El Salto del Caballo** desde la Serpiente (Posición 7), salta a Posición 2 (Flores) y Posición 6 (Peces). Lectura Oculta: La traición / mentiras viperinas encubiertas venenosas (7) se valieron de amabilidad sobornada / regalos falsos diplomáticos de paz social (9) para asegurarse enormes sumas de liquidez financiera ilícita (34).",
            justificacion: "El salto del caballo forense demostró que la diplomacia visual (Flores) es falsa por la traición bajo ella (Serpiente). El Anillo central es una alianza nacida de la agresión silenciada y el soborno legal millonario (Látigo y Peces flanqueando al Anillo).",
            enseñanza: "Técnica del Caballo Forense: Cuando veas una carta preocupante de delincuencia literal (Zorro/Serpiente) en la tirada, plántate arriba y muévete en 'L' de ajedrez. Lo que toques será el plan secreto del criminal en el área que no lo ven de frente en la foto visible lineal."
        },
        {
            contexto: "¿Por qué recaí en la depresión si todo estaba aparentemente solucionado médicamente?",
            cartas: ["Jardín (20)", "Caminos (22)", "Zorro (14)", 
                     "Estrellas (16)", "Ataúd (8)", "Ratones (23)", 
                     "Árbol (5)", "Torre (19)", "Cruz (36)"],
            posiciones: "1:Jardín, 2:Caminos, 3:Zorro. 4:Estrellas, 5:Ataúd, 6:Ratones. 7:Árbol, 8:Torre, 9:Cruz.",
            filas_columnas: "Fila Superior: Mucha vida social externa confusa decidiendo sobre trabajo engañoso o diagnósticos tácticos. Entorno al centro: Estrellas + Ataúd + Ratones (tu energía divina sepultada por fuga de estrés microscópico severo y carcomiente de vitalidad o parásitos de tu brillo).",
            diagonales: "Espejos Base Causa vs Fin [1-9]: Del parque festejante exterior y grupal libre (20), hacia el sufrimiento absoluto kármico desgarrador crucificado inmenso inmovilizador (36).",
            sintesis: "**Salto del Caballo** desde el Ataúd Central: No aplica (El 5 no salta). Salto desde el Árbol (Carta 7): Salta a Estrellas (4) y Cruz (36)... no es válido, el caballo es a 2, 6, 8, 4. Desde 7 es a 2 (Caminos) y 6 (Ratones). Descifrado oculto: Tu salud raigal biológica y cuerpo fundamental genético (7), está frente a dos decisiones de senderos paralelos bifurcados dualísticos (2) mientras es parasitada, carcomida o mermada químicamente de manera cruda (6).",
            justificacion: "La tirada es lapidaria mostrando un núcleo muerto en la esfera material (Ataúd central rodeado y vaciado por Ratones a derecha) anclando en un enorme complejo crónico letal burocrático de torre y peso religioso profundo kármico de dolor agudo inmenso pesado en la cruz (36) base. La recaída proviene microscópicamente del desgaste físico químico de malas alternativas de vías (Árbol saltando a Ratones/Caminos).",
            enseñanza: "Estructura del 5 Imposible: La Carta Central (5) NUNCA participa en un Salto de Caballo tradicional. Eso refuerza que la 5 es Tu Ser estático, mientras que los Caballos describen los secretos del entorno orbitando inestable alrededor de ti atacando puntos sin poder verlos directamente en fila."
        }
    ]
  },
  {
    id: "ejemplos-magistrales",
    title: "4. Ejes de Lectura Absolutos: La Cruz del Destino Final",
    icon: "Maximize",
    content: `
El análisis de **Ejes de Lectura** funciona sumando visualmente la Columna Central + Fila Central. Esa gran "Cruz (+) del centro" elimina literalmente el "ruido de relleno" de las esquinas (1, 3, 7, 9). 

- **Eje Vertical (2-5-8):** Esqueleto existencial puro (Plan superior > Condición central > Cimiento subconsciente profundo).
- **Eje Horizontal (4-5-6):** Evolución fáctica pura del tiempo actual del asunto sin el velo mental distorsionante originado al pasado. Muestra los crudos eventos del piso terreno (Pasado -> Ahora -> Futuro del evento actual tangible).
    `,
    examplesTitle: "Ejemplos 7 y 8: Limpiando la niebla con Ejes Centrales",
    examples: [
        {
            contexto: "¿Conoceré pronto al amor de mi vida? (Búsqueda solitaria tras fracasos).",
            cartas: ["Nubes (6)", "Sol (31)", "Pájaros (12)", 
                     "Montaña (21)", "Jinete (1)", "Flores (9)", 
                     "Cruz (36)", "Perro (18)", "Trébol (2)"],
            posiciones: "1:Nubes, 2:Sol, 3:Pájaros. 4:Montaña, 5:Jinete, 6:Flores. 7:Cruz, 8:Perro, 9:Trébol.",
            filas_columnas: "Eje Vertical [2-5-8]: Sol (Calor total inmenso), Jinete (Velocidad, galope, aparición de alguien joven veloz), Perro (Lealtad, fidelidad pura). Eje Horizontal [4-5-6]: Montaña (Obstáculos, soledad inmensa bloqueando tu vida entera maciza), Jinete (Irrumpir, cabalgar hacia adelante movimiento dinámico total que destraba), Flores (Belleza, regalos, una invitación formal maravillosa a salir con paz festiva y carisma simpático sonriente).",
            diagonales: "Aunque la diagonal principal es (6-1-2) Nubes dudosos hacia chispazos azarudos ligeros de Trébol, nos guiaremos por la cruz pura limpiadora del centro que está muy fortificada brillante y llena de luz galopante leal.",
            sintesis: "Sí, la aparición es inminente e increíblemente dinámica, hermosa vital, y de paz victoriosa. El Eje vertical devela que un 'Sujeto Dinámico Veloz' (Jinete) empuja con luz gigantesca triunfante y energía vital (Sol), anclando toda la existencia en una Fidelidad perruna profunda intachable absoluta eterna e incondicional (Perro). El Eje horizontal indica que de esa muralla pétrea solitaria en que estabas varado muerto (Montaña) un salto irrumpe e invita y halaga floridamente regalando primaveras de invitaciones maravillosas elegantes festivas románticas (Flores).",
            justificacion: "Se desprecia toda la suciedad lateral: La turbiedad pasada existió (Nubes), las llamadas ligeras volátiles dudosas (Pájaros) o las cruces de karmas anteriores pesando (Cruz). La Cruz de Ejes (+) brilla inmaculada: Sol, Perro, Jinete y Flores conforman un cuadro amoroso idílico e imparable muy leal.",
            enseñanza: "Ejes (+) Despejadores de Karmas: En tiradas ruidosas donde las esquinas (como Nubes y Cruz) te amenazan o infunden dudas horribles; extrae la Cruz Central con los Ejes. Si los 5 naipes medulares que la forman son triunfales inmaculados, la lectura es de éxito supremo rotundo; lo otro solo indica 'secuelas psicológicas secundarias periféricas sucias pasadas'."
        },
        {
            contexto: "¿Cómo será la resolución y destino del conflicto de la herencia del abuelo?",
            cartas: ["Casa (4)", "Ataúd (8)", "Látigo (11)", 
                     "Oso (15)", "Caminos (22)", "Cigüeñas (17)", 
                     "Árbol (5)", "Torre (19)", "Peces (34)"],
            posiciones: "1:Casa, 2:Ataúd, 3:Látigo. 4:Oso, 5:Caminos, 6:Cigüeñas. 7:Árbol, 8:Torre, 9:Peces.",
            filas_columnas: "Eje Vertical [8-22-19]: Ataúd (herencia muerta o luto cerrado), Caminos (división, decisión central forzada), Torre (Burocracia legal o tribunal separativo institucional estatal gigante aislando). Eje Horizontal [15-22-17]: Oso (Dinero del mayor matriarca pesado dominante o banco testador), Caminos (dividido, múltiples fracciones), Cigüeñas (mejora al final, mutaciones grandes elevadoras del capital mudando la situación favorable positiva).",
            diagonales: "La fila de Pasado [4+15+5]: La casa del testamento con la abuela testadora familiar sobre las raíces genealógicas estancadas biológicas inamovibles. Fila del Futuro [11+17+34]: Peleas de castigos verbales friccionando crudo dolor pero que vuelan mejorando hacia flujos inmensos altísimos líquidos de capital mercantil inmenso líquido contante.",
            sintesis: "Su núcleo es tener que dividir las partes (Caminos), proviniendo la orden del abuelo difunto por vías formales legales muertas silenciadas (Ataúd a Torre en el eje vertical). El Eje de Hechos físicos y tangibles confirma que un capital testamental o bien dominante grandote (Oso) va a subdividirse partiendo el dinero, abriendo nuevos rumbos elevando todos a mejor puerto de bonanzas transmutando y progresando hacia aguas calmas mejores (Cigüeñas en horizontal).",
            justificacion: "La decisión forzada por abogacía testamental (Torre y Caminos) es dura pero traerá mudanza del pesado bulto financiero obeso hacia algo libre que cambiará sus estatus en gran altitud y belleza y mudanza para mejoría rotunda líquida financiera abrumadora bancaria.",
            enseñanza: "El Centro como Partidor/Bifurcador Literal. El (22) Caminos en posición (5) en querellas literales describe la partición milimétrica forense exacta del evento. Se abren dos sendas, los capitales fluyen separados dividiendo al Oso viejo gordo."
        }
    ]
  }
];
