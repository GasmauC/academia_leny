export const gtBlocks = [
  {
    id: "bases-del-gt",
    title: "1. Introducción al Grand Tableau",
    icon: "Grid",
    content: `
El **Grand Tableau (El Gran Cuadro)** es la tirada suprema del Petit Lenormand, donde las 36 cartas del mazo son puestas sobre la mesa a la vez. No hay cartas que queden en el mazo; el destino completo está desplegado.

### Función del Grand Tableau
A diferencia de tiradas pequeñas que responden una sola pregunta, el GT es un "mapa de la vida" del consultante para un período de hasta 6-12 meses. Muestra todos los departamentos de su vida simultáneamente: amor, salud, trabajo, enemigos, y proyectos, permitiendo ver cómo interaccionan secretamente entre sí.

### Posición del Consultante (Significadores)
El punto de anclaje absoluto es ubicar dónde cayeron "El Hombre (28)" o "La Mujer (29)" (según el consultante). Esta carta es el 'Tú'. 
A partir de ahí, se traza la cruz de influencia, observando qué cartas "miran" al consultante, qué quedó a su espalda (el pasado), qué tiene por delante (su futuro inexorable) y qué tiene sobre su cabeza (lo que le domina mental o espiritualmente).
    `,
    examplesTitle: "Ejemplo 1: Un Vistazo Rápido a los Significadores",
    examples: [
        {
            contexto: "Sesión Anual General para una Mujer (Profesional)",
            cartas: [
                "Jinete (1)", "Trébol (2)", "Barco (3)", "Casa (4)", "Árbol (5)", "Nubes (6)", "Serpiente (7)", "Ataúd (8)",
                "Flores (9)", "Guadaña (10)", "Látigo (11)", "Búho (12)", "Niño (13)", "Zorro (14)", "Oso (15)", "Estrellas (16)",
                "Cigüeñas (17)", "Perro (18)", "Torre (19)", "Jardín (20)", "Montaña (21)", "Caminos (22)", "Ratones (23)", "Corazón (24)",
                "Anillo (25)", "Libro (26)", "Carta (27)", "Hombre (28)", "Mujer (29)", "Lirio (30)", "Sol (31)", "Luna (32)",
                "Llave (33)", "Peces (34)", "Ancla (35)", "Cruz (36)"
            ],
            ancla: "Posición 29 (Mujer, fila 4, columna 5).",
            lectura: "La Mujer está casi al final del cuadro. Tiene muy poco futuro por delante (Lirio, Sol, Luna) pero un inmenso y pesado pasado a sus espaldas.",
            sintesis: "Al estar en la fila 4, todo el cuadro recae 'sobre su cabeza', indicando a una mujer abrumada por el peso del mundo mental y los problemas (Torre, Oso, Casa encima de ella) deprimiéndola. Necesitas sacarla de ese pozo psíquico de abrumadora sobrecarga general que le domina los pensamientos (Cartas encima).",
            enseñanza: "Carta Inicial y Carta Final: La Tirada arranca en Jinete (Noticias movidas) y cierra irremediablemente su marco con Cruz (Sufrimientos Kármicos). Este será un año de movimiento frenético que decantará en una carga muy pesada, dolorosa o un sacrificio obligatorio (36 al final)."
        }
    ]
  },
  {
    id: "lectura-casas",
    title: "2. La Matriz Subterránea (Lectura de Casas)",
    icon: "Layers",
    content: `
Para dominar el GT debes dominar la **Lectura de Casas**. Imagina que antes de soltar las cartas, la mesa de madera ya estuviera pintada con 36 recuadros numerados. Cada recuadro ("Casa") tiene la esencia vibratoria de la carta que lleva ese número.

1. **Casa 1:** La casa del Jinete (qué noticias o energías rápidas están llegando al tema).
2. **Casa 15:** La casa del Oso (liderazgo, jefe, finanzas mayúsculas, madre).
3. **Casa 24:** La casa del Corazón (qué sucede en el ámbito del amor y pasión).

La magia nace al soltar la tarjeta. Si el "Ataúd (8)" cae literalmente en la "Casa 24 (del Corazón)", tu diagnóstico del amor sin leer otra carta es: **Silencio, muerte, estancamiento definitivo amoroso**.
    `,
    examplesTitle: "Ejemplo 2: Intersectando Naipes y Casas",
    examples: [
        {
            contexto: "Verificando el área de Salud Oculta",
            cartas: [
                "Látigo (11)", "Cruz (36)", "Árbol (5)", "Zorro (14)", "Peces (34)", "Montaña (21)", "Corazón (24)", "Anillo (25)",
                "Jinete (1)", "Trébol (2)", "Barco (3)", "Casa (4)", "Ataúd (8)", "Nubes (6)", "Serpiente (7)", "Flores (9)",
                "Guadaña (10)", "Búho (12)", "Niño (13)", "Oso (15)", "Estrellas (16)", "Cigüeñas (17)", "Perro (18)", "Torre (19)",
                "Jardín (20)", "Caminos (22)", "Ratones (23)", "Libro (26)", "Carta (27)", "Hombre (28)", "Mujer (29)", "Lirio (30)",
                "Sol (31)", "Luna (32)", "Llave (33)", "Ancla (35)"
            ],
            ancla: "Casa del Árbol (Casa 5).",
            lectura: "El Árbol (5) representa la salud. Fíjate que el Árbol cayó casualmente en la posición/Casa 3 (que es del Barco). Pero, ¿quién cayó en la Casa 5 (la casa intrínseca de la salud)? Cayó Peces (34).",
            sintesis: "Al caer Peces (Dinero/Fluido líquido) en la Casa de la Salud (5) nos diagnostica al instante: Sus problemas de salud son circulatorios, urológicos o retención de líquidos masivos. Sumado a esto, buscará remediarlo mediante el viaje o terapias alternativas distantes, ya que el Árbol aterrizó en la casa del trayecto lejano (Casa del Barco, la 3).",
            enseñanza: "La Rueda de Rueda (House Reading Interconectada). Busca el Naipe que te importa ('Dinero' = Peces). Al hallarlo devela en qué casa cayó para ver su entorno circunstancial; luego anda a la Casa Intrinseca del Dinero (Casa 34) y mira a qué parásito o suerte aloja. Ese cruce es oro puro."
        }
    ]
  },
  {
    id: "tecnicas-saltocaballo-espejo",
    title: "3. Magias de Extracción: Espejo, Corriente y Caballo",
    icon: "Network",
    content: `
Cuando la lectura lineal se agota o se necesita revelar actos escondidos, recurrimos a tácticas espaciales sobre el GT:

1. **Espejo (Mirroring):** Toma una carta (ej: tu consultante) y dóblale mentalmente el cuadro de 9x4 por la mitad horizontal y luego verticalmente. La carta que choca con ella al doblar las esquinas de papel opuestas, es su "espejo". Representa un vínculo secreto incuestionable de influencias opuestas.
2. **Corriente Vertical (Knitting):** Muestra el karma que 'cae' en cascada de la columna completa en la que está parada una carta de interés.
3. **El Movimiento del Caballo (Knight's Jump):** Una vez más el temible salto de "L" a 2 y 1 celdas de distancia en cualquier dirección desde una carta objetivo (igual que en 3x3 y 9x9). Alumbra los complots, mentiras o motivadores ocultos subconscientes directos que mueven a ese naipe a espaldas de todos. Es el ajedrez divino.
    `,
    examplesTitle: "Ejemplo 3: Destripando secretos y conspiraciones",
    examples: [
        {
            contexto: "Sospechas de malversación en fondos compartidos del divorcio.",
            cartas: [
                "Zorro (14)", "Búho (12)", "Casa (4)", "Ancla (35)", "Torre (19)", "Peces (34)", "Corazón (24)", "Anillo (25)",
                "Serpiente (7)", "Montaña (21)", "Ataúd (8)", "Látigo (11)", "Oso (15)", "Cruz (36)", "Nubes (6)", "Guadaña (10)",
                "Trébol (2)", "Cigüeñas (17)", "Mujer (29)", "Hombre (28)", "Perro (18)", "Caminos (22)", "Libro (26)", "Ratones (23)",
                "Jinete (1)", "Barco (3)", "Árbol (5)", "Flores (9)", "Niño (13)", "Estrellas (16)", "Jardín (20)", "Carta (27)",
                "Lirio (30)", "Sol (31)", "Luna (32)", "Llave (33)"
            ],
            ancla: "El Marido (Carta 28).",
            lectura: "El hombre (28) está en la Fila 3, Columna 4. Vamos a hacer *Espejos* y *Saltos de Caballo*.",
            sintesis: "**Espejo Horizontal (doblando):** Él (f3, c4) se topa con Guadaña (10) (f2, c8). Amenaza de corte peligroso desde él. **Salto de Caballo desde el Hombre:** Dos arriba y uno a la izquierda = Búho (12). Una arriba, dos derecha = Oso (15) y Cruz (36). Dos abajo y uno der = Estrella (16).",
            enseñanza: "Caballo Revelador: El salto forense nos informa que él está actuando ansioso y conversador nocturno (Búho) charlando y armando maquinaciones que involucran ocultar los fondos protectores u ocultando dinero masivo dominado a escondidas suyas en la lejanía sufriendo con un terrible plan (Oso y Cruz). Actúa amistoso en la línea, pero su caballo es ladrón (Oso)."
        }
    ]
  },
  {
    id: "tecnicas-diagonal-reina",
    title: "4. Movimiento de la Reina y Diagonales de Destino",
    icon: "Maximize",
    content: `
El **Movimiento de la Reina** explota las famosas diagonales en "X" que cortan todo el Gran Cuadro, pasando irremediablemente por el sujeto objetivo, expandiéndose hacia los 4 rincones cósmicos formales de su vida en la tela interseca de araña.

Si te paras en una carta objetivo y tiras una cruz (X) en diagonal, generas las **Diagonales del Destino**:
- La diagonal Superior-Izquierda (La historia Kármica Pasada).
- La diagonal Inferior-Izquierda (La raíz genética u oculta subyacente).
- La diagonal Superior-Derecha (La influencia de proyección mental hacia el futuro).
- La diagonal Inferior-Derecha (El devenir terrenal ineludible o final crudo y tangible).
    `,
    examplesTitle: "Ejemplos 4 y 5: Cruzando el Destino con la Reina",
    examples: [
        {
            contexto: "Pregunta pura de fertilidad: ¿Habrá embarazo existoso este final de año?",
            cartas: [
                "Cigüeñas (17)", "Anillo (25)", "Látigo (11)", "Cruz (36)", "Casa (4)", "Corazón (24)", "Peces (34)", "Oso (15)",
                "Jinete (1)", "Serpiente (7)", "Niño (13)", "Nubes (6)", "Ataúd (8)", "Guadaña (10)", "Búho (12)", "Montaña (21)",
                "Trébol (2)", "Barco (3)", "Mujer (29)", "Árbol (5)", "Flores (9)", "Torre (19)", "Jardín (20)", "Zorro (14)",
                "Caminos (22)", "Ratones (23)", "Libro (26)", "Carta (27)", "Hombre (28)", "Lirio (30)", "Estrellas (16)", "Perro (18)",
                "Sol (31)", "Luna (32)", "Llave (33)", "Ancla (35)"
            ],
            ancla: "El Niño (Carta 13), representando al embarazo a investigar. Ubicación: Fila 2, Columna 3.",
            lectura: "Aplicaremos la Cruz Diagonal de la Reina parándonos en El Niño (13). D.Sup-Izq = Cigüeñas (17). D.Inf-Der = Árbol (5) -> Carta (27) -> Llave (33). D.Sup-Der = Látigo (11). D.Inf-Izq = Barco (3).",
            sintesis: "Al estar en un borde izquierdo alto, las fuerzas son abrumadoramente positivas a futuro. El origen fue buscar una mejoría gigante o cambio maternal rotundo (Cigüeñas en SupIzq). Y su destino terrenal evoluciona con el Árbol biológico de salud floreciente enorme, decanta en pruebas clínicas escritas formales u oficio médico (Carta) cerrando gloriosamente en una solución y certeza máxima apoteósica total final (Llave inferior de éxito abrumante asegurado absoluto).",
            enseñanza: "Basta una Diagonal Maestra para ganar: Esta técnica ignora las complicaciones menores que tapan a los primerizos de ver. La reina traza el devenir innegable: Cambio (17) -> Bebé (13) -> Raíz corporal (5) -> Documento de Test de Laboratorio (27) -> Cierto Cien por ciento (33)."
        },
        {
            contexto: "¿Lograré limpiar mi nombre durante la citación del penal de alta seguridad?",
            cartas: [
                "Montaña (21)", "Nubes (6)", "Serpiente (7)", "Zorro (14)", "Ratones (23)", "Látigo (11)", "Cruz (36)", "Ataúd (8)",
                "Hombre (28)", "Guadaña (10)", "Torre (19)", "Oso (15)", "Caminos (22)", "Libro (26)", "Peces (34)", "Corazón (24)",
                "Jinete (1)", "Trébol (2)", "Barco (3)", "Casa (4)", "Árbol (5)", "Flores (9)", "Niño (13)", "Estrellas (16)",
                "Cigüeñas (17)", "Perro (18)", "Jardín (20)", "Anillo (25)", "Carta (27)", "Mujer (29)", "Lirio (30)", "Sol (31)",
                "Luna (32)", "Llave (33)", "Ancla (35)", "Búho (12)"
            ],
            ancla: "El Hombre consultante (Carta 28), posicionado en Fila 2, Columna 1. (Absoluto extremo encadenado izquierdo borde).",
            lectura: "No hay pasado: La pared está tras él; todo el GT mira y acecha enfrente suyo. Diagonal Sup-Der: Nubes (6). Diagonal Inf-Der: Trébol (2) -> Barco (3) -> Jardín (20) -> Mujer (29) -> Sol (31) -> (Fuera de cuadro). Fila Central: Hacia la Torre(19).",
            sintesis: "Al estar rodeado horriblemente en la esquina de prisión carcelaria, con la Montaña de muro en su vertical y un Corte mortal terrible Guadaña (10) enfrentándolo enseguida frente al macro juicio institucional (Torre 19), parecería letal condenatorio de ser aislado crónicamente allí en ese encierro mortal inmenso. Pero la *Reina en el devenir terrenal inferior del destino ciego* marca Trébol fortuito al Barco zarpando. Esto terminará asombrosamente en una lejana travesía fuera del lugar soltándose hacia el público (Jardín) salvado resplandeciendo en plena libertad brillante e inmensa por ayuda benéfica de una Mujer divina justiciera gigante (Sol + Mujer salvadora).",
            enseñanza: "Escudado y salvado por la Diagonal Inferior Terrenal. Parecía ahogarse en la esquina de la Torre y los Cortes mortales burocráticos macizos oscuros cruentos asiladores de piedra y juicios (Montaña, Guadaña, Torre), pero el hilo conductor de la vida base muestra escape acuático libre solar deslumbrante fuera y lejos."
        }
    ]
  },
  {
    id: "conteo-metodologia",
    title: "5. Conteo de 7 y Método del Puente (Lecturas Pasó a Paso)",
    icon: "Target",
    content: `
Por último, el protocolo sistemático paso a paso que todo profesional en Lenormand usa en lugar de mirar "al bulto".
1. **El Método de los Puentes de Interconexión:** Si el consultante cruza hacia el amor (Corazón 24). Tomas al Hombre (28) y trazas un "puente" visual saltando carta por carta en fila y luego columna hasta llegar al Corazón. Las cartas que pisas en la vereda son la historia inesquivable sobre qué tendrá que sufrir o vivir para llegar al amor.
2. **Conteo de 7 en Rombo y Múltiplos:** Similar al conteo del Tarot de Papus. Desde el Significado Central o Tu Consultante, empiezas a contar 7 casilleros (inclusive) 1..2..3..4..5..6..[7]. Anotas esa carta. Luego cuentas 7 más.. anotas. Así creas un hilo predictivo "crítico" oculto. (También se estila saltar en ritmos de +9 o tríadas triangulares).
3. **Cruz Central y Corrientes Verticales:** Siempre que tengas dudas, tu salvavidas es ver cómo la Fila Manda sobre el Pasado, Presente y Futuro puro, ignorando técnicas rebuscadas y limitándote a la "Cruz Base".
    `,
    examplesTitle: "Ejemplos 6 y 7: Extracción Narrativa con Puentes",
    examples: [
        {
            contexto: "Pregunta sobre el Proyecto Secreto en la Alta Jerarquía (De una Empleada cautelosa)",
            cartas: [
                "Lirio (30)", "Estrellas (16)", "Flores (9)", "Corazón (24)", "Peces (34)", "Oso (15)", "Torre (19)", "Sol (31)",
                "Jinete (1)", "Mujer (29)", "Niño (13)", "Serpiente (7)", "Zorro (14)", "Guadaña (10)", "Cruz (36)", "Nubes (6)",
                "Trébol (2)", "Barco (3)", "Casa (4)", "Árbol (5)", "Látigo (11)", "Montaña (21)", "Caminos (22)", "Ataúd (8)",
                "Cigüeñas (17)", "Perro (18)", "Jardín (20)", "Anillo (25)", "Libro (26)", "Carta (27)", "Hombre (28)", "Ratones (23)",
                "Luna (32)", "Llave (33)", "Ancla (35)", "Búho (12)"
            ],
            ancla: "El Proyecto escondido se define en el Libro (26), posicionado en Fila 4, Col. 5. La Empleada es Mujer (29), pos f2, col 2.",
            lectura: "Crearemos un **Puente Visual y Terrenal** desde la Mujer hasta el Libro para averiguar 'La distancia y lo que la separa a ella del plan escondido de la Alta cúpula financiera'. Ruta: 29 > 13 > 7 > 14 > y bajamos a > 21 > 26.",
            sintesis: "Al intentar acercarse al conocimiento de este plan secreto (Libro), cruzará un puente muy ríspido: Un inicio cándido engañoso inmaduro o inocente infantil falso de no ver madurez (Niño), cayendo por completo en traición venenosa femenina hostil letal sin escrúpulos tóxicos (Serpiente), la cual la someterá usando artimañas laborales muy fraudulentas astutas y tácticas (Zorro) derivando en estamparla y chocarla de lleno en piedra contra un bloqueo masivo enorme glacial impasable montañoso de soledad y distancia inmensurable frustrante de aislamiento letal (Montaña).",
            enseñanza: "Puentes Sangrientos de Muro a Muro: No pases la línea. La ruta marca clara las baldosas: (13, 7, 14, 21). Muestra que se va a encarnar sangre venenosa maliciosa laboral y no va a llegar a la meta (Chocó con la Montaña justo en la baldosa previa a entrar al Libro). ¡Prohibido meterse en ese proyecto o será apaleada monumental y laboralmente por colegas serpientes!"
        },
        {
            contexto: "El Espejo y Línea Abismal: La infidelidad y el dolor latente ignorado.",
            cartas: [
                "Jinete (1)", "Trébol (2)", "Barco (3)", "Casa (4)", "Árbol (5)", "Flores (9)", "Guadaña (10)", "Nubes (6)",
                "Corazón (24)", "Anillo (25)", "Látigo (11)", "Mujer (29)", "Serpiente (7)", "Zorro (14)", "Oso (15)", "Cruz (36)",
                "Cigüeñas (17)", "Perro (18)", "Torre (19)", "Jardín (20)", "Montaña (21)", "Caminos (22)", "Ataúd (8)", "Ratones (23)",
                "Libro (26)", "Carta (27)", "Hombre (28)", "Lirio (30)", "Sol (31)", "Luna (32)", "Llave (33)", "Peces (34)",
                "Niño (13)", "Estrellas (16)", "Ancla (35)", "Búho (12)"
            ],
            ancla: "La Mujer (Carta 29), pos f2, col 4. Corazón (24), pos f2, col 1.",
            lectura: "El amor (24) está en el marco interno izquierdo pasado y la une al pacto que firmó en anillo (25) agredido por las continuas iras verbales severas del Látigo (11) a sus espaldas.",
            sintesis: "**Línea Frontal (El Futuro inmediato al pasar su cabeza):** La Serpiente (7), Zorro (14), Oso (15) hacia una Cruz de sufrimiento (36) enorme. **Espejos Diagonales Ocultos:** Su Espejo a 45 grados dobla saltando hacia la Guadaña (10, Mutilación mortal abrupta cortando cielo) y se topa con un Ataúd helado mortal masivo abajo a sus espaldas (8, Estancamiento y Muerte). Al Espejarse cruzada y horizontalmente en la tabla inmensa a 90 grados rebota y salta conectando con un Ancla de estancamiento profundo pesado eterno encadenado doloroso en las ciénagas sucias (35).",
            enseñanza: "Extracción del Todo Mal Sin Remedio (Red Flag Mayor): Su pasado amoroso azotado por latigazos es una nada de muerte oscura y fría (Ataúd en esquina). Su futuro inminente en fila real es una víbora tóxica laboral y el jefe de cruz aplastante de calvario letal de dolor. Todo en su ecosistema, incluyendo el espejo fatal cortante y encadenante la somete permanentemente."
        }
    ]
  }
];
