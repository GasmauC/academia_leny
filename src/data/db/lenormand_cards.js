import { cards10to18 } from './lenormand_cards_10_18';
import { cards19to27 } from './lenormand_cards_19_27';
import { cards28to36 } from './lenormand_cards_28_36';

// Diccionario Absoluto Fiel a Odete Lopes Mazza y Tradición Lenormand.
// Reestructuración con matices por capa (Persona, Tema, Acción) y áreas de vida (Amor, Trabajo, Salud).

export const cardsDictionary = [
  {
    "id": 1,
    "number": "01",
    "name": "El Jinete",
    "suit": "9 de Corazones",
    "emoji": "🐎",
    "baseMeaning": "Noticias, novedades, mensajes que están por llegar.",
    "symbolicCore": "Movimiento, desplazamiento que trae consigo algo nuevo a nuestra vida.",
    "actionVerb": "Acelerar / Avanzar / Transmitir",
    "polarity": "Positiva (+)",
    "timing": "Rápido, en breve (Acelera eventos de cartas vecinas).",
    "mainTheme": "Información, comunicaciones y visitas sorpresivas.",
    "readings": {
      "love": "Un nuevo amor o alguien que llega rápidamente a tu vida. Reconciliación inminente si se espera a alguien.",
      "work": "Una nueva oportunidad laboral, movimiento o cambio rápido en el trabajo. Novedades sobre un proyecto.",
      "money": "Llegada de un pago inesperado, transferencia rápida o noticias sobre finanzas.",
      "health": "Sanación rápida, buena recuperación.",
      "general": "Cuanto más cerca esté de la carta del consultante, más rápido ocurrirá el suceso."
    },
    // La separación de capas (Persona, Tema, Acción) solicitada
    "contextualLayers": {
      "persona": "Un hombre joven, activo, extranjero o forastero, deportista, elegante.",
      "tema": "Noticias, mensajería, el hecho de algo acercándose.",
      "accion": "Ir hacia adelante, entregar, comunicar verbalmente o por escrito."
    },
    "relations": {
      "relatedCards": ["La Carta (Mensajes escritos)", "Los Búhos (La comunicación telefónica)"],
      "similarCards": ["El Barco (Pero el Jinete es de proximidad y rápido, el Barco es de lejanía y lento)", "La Cigüeña (Cambio, pero el Jinete trae la noticia, la Cigüeña ejecuta el cambio)"],
      "oppositeCards": ["La Montaña (Bloqueo y detención total frente al movimiento del Jinete)", "El Ancla (Estancamiento)"]
    },
    "warnings": "El Jinete toma la carga positiva o negativa del 'equipaje' (cartas que lo anteceden). ¡Atención a la carta que tiene detrás! Si tiene a Las Nubes a su izquierda, trae novedades desagradables.",
    "combinations": [
      { "cards": "El Jinete + El Ataúd", "meaning": "Noticias siniestras, o una noticia que no llegará al destino." },
      { "cards": "El Jinete + Las Estrellas", "meaning": "Nuevas inspiraciones, la llegada de ideas." },
      { "cards": "El Jinete + Los Lirios", "meaning": "Llegada de una persona anciana o un momento de serenidad que entra velozmente." }
    ],
    // Párrafos y reflexiones largas sin resumir para lectura en el reader original:
    "longExplanations": [
      "“El Jinete trae un mensaje de buena fortuna. Si no está circundada por cartas desfavorables, trae buenas noticias. La persona puede esperar que vengan de su propia casa o del extranjero; sin embargo, esta situación puede no ocurrir de inmediato, sino después de algún tiempo.” — Philippe Lenormand (1846)",
      "Cuando la carta de El Jinete aparece en una lectura, nos indica que algo nuevo está por llegar a nuestra vida. Cuanto más cerca esté de la carta del/de la consultante, más rápido ese suceso ocurrirá. Es una carta que acelera los sucesos de las cartas vecinas.",
      "Si está ubicado en una línea, en último lugar, entonces la carta o las cartas que se encuentran puestas a la izquierda, es decir, delante de la mirada del caballo, indican el destino o el lugar hacia dónde se dirige para entregar lo que lleva.",
      "Al revés, la carta o las cartas que se encuentran posicionadas a la derecha, es decir, detrás de El Jinete, nos darán información acerca del “remitente”, del contenido que carga consigo."
    ]
  },
  {
    "id": 2,
    "number": "02",
    "name": "El Trébol",
    "suit": "6 de Cascabeles",
    "emoji": "🍀",
    "baseMeaning": "Suerte, fortuna repentina y de corta duración.",
    "symbolicCore": "Felicidad inesperada, optimismo que surge de la aparente nada.",
    "actionVerb": "Sorprender / Alegrar / Animar",
    "polarity": "Positiva (+)",
    "timing": "Corto plazo, inmediato, fugaz.",
    "mainTheme": "Pequeñas alegrías y oportunidades aleatorias.",
    "readings": {
      "love": "Momentos felices e inesperados en la pareja, coqueteos afortunados.",
      "work": "Una oportunidad o golpe de suerte en el entorno laboral de la cual sacar provecho rápido.",
      "money": "Juegos de azar (reducidos), pequeños bonos, ganancias imprevistas.",
      "health": "Recuperación milagrosa, alivio inmediato de un padecimiento menor.",
      "general": "Un toque saludable portador de energía que puede reducir obstáculos si se actúa con rapidez."
    },
    "contextualLayers": {
      "persona": "Alguien alegre, optimista, desenfadado, que confía en el destino o le gustan los juegos/apuestas.",
      "tema": "Eventos fortuitos, la fe o esperanza de que algo bueno pase.",
      "accion": "Aprovechar la oportunidad, apostar a ganador, disfrutar el momento."
    },
    "relations": {
      "relatedCards": ["El Sol (Triunfo mayor)", "Las Estrellas (Esperanza)"],
      "similarCards": ["El Ramo (El Trébol es algo fortuito, el Ramo es un regalo o reconocimiento social)"],
      "oppositeCards": ["Las Nubes (Confusión y tristeza total que contrasta con la pura alegría del Trébol)", "La Cruz (Karma pesado frente a la ligereza del Trébol)"]
    },
    "warnings": "El Trébol tiene el poder de reducir las dificultades traídas por las cartas negativas circundantes. Si está con cartas Negativas (Guadaña o Ataúd), señala la llegada de decepciones donde tenías esperanzas. Es un puente de esperanza que requiere ser aprovechado en la ocasión, no dura para siempre.",
    "combinations": [
      { "cards": "El Trébol + Las Nubes", "meaning": "Suerte truncada, grandes decepciones o esperanzas frustradas por eventos negativos incontrolables." },
      { "cards": "Carta Consultante + El Trébol", "meaning": "Describe el fin de un periodo desafortunado, anuncia que situaciones preocupantes se resolverán por puro golpe de suerte." }
    ],
    "longExplanations": [
      "Cada hoja simboliza un tipo distinto de suerte: la primera es de esperanza, la segunda de fe, la tercera del amor, y obviamente, la cuarta de fortuna. — Frase Celta",
      "Esta carta simboliza la buena suerte. Cuando está presente en una “lectura”, trae siempre consigo una esperanza que genera una motivación para la realización de algo. Las oportunidades ofrecidas por esta carta son un toque saludable, portador de energía, vitalidad.",
      "Representa la suerte jugando a nuestro favor... Por eso, esta carta debe ser vista como un puente entre la esperanza y la realización.",
      "Aunque esté cerca o lejos de la carta de la persona en cuestión, si El Trébol se encontrara en contacto con la carta Las Nubes o de otra carta de valor negativo, se prevé la llegada de situaciones desafortunadas. "
    ]
  },
  {
    "id": 3,
    "number": "03",
    "name": "El Barco",
    "suit": "10 de Picas (Hojas)",
    "emoji": "🚢",
    "baseMeaning": "Viajes, comercio, transacciones de larga distancia.",
    "symbolicCore": "Transición, alejamiento y expansión hacia horizontes desconocidos o distantes.",
    "actionVerb": "Desplazar / Negociar / Emigrar",
    "polarity": "Neutra (Sujeta al contexto).",
    "timing": "Largo plazo, movimiento gradual y continuo.",
    "mainTheme": "Distancia y transformación profunda (física o espiritual).",
    "readings": {
      "love": "Relación a distancia, amores de otra cultura, o simplemente una inmensa añoranza por alguien.",
      "work": "Comercio internacional, importación/exportación, negocios por internet.",
      "money": "Patrimonio lejano, recursos que tardan en llegar, herencia.",
      "health": "Enfermedades crónicas si está mal rodeado, o un viaje por sanación si está con El Árbol.",
      "general": "El cambio representado siempre está movido por un fuerte deseo de dar un nuevo rumbo a la propia vida."
    },
    "contextualLayers": {
      "persona": "Alguien de lejos, un forastero, un comerciante, alguien independiente o aventurero.",
      "tema": "Añoranza, la distancia, la exploración de diferentes culturas.",
      "accion": "El acto de viajar físicamente, transferir, apartarse o iniciar un duelo interno."
    },
    "relations": {
      "relatedCards": ["Los Caminos (Rutas y aventura)", "Las Cigüeñas (Cambio de país/residencia)"],
      "similarCards": ["El Jinete (Desplazamiento, pero el Barco es lejano e implica vehículos pesados, mientras el Jinete es local y veloz)"],
      "oppositeCards": ["El Ancla (La fijeza y el quedarse en puerto versus navegar)", "La Casa (El confort estático de lo conocido)"]
    },
    "warnings": "El Barco también puede ser tránsito al más allá (una muerte si está combinado con El Ataúd). Es una carta de añoranza y melancolía que puede arrastrar el alma en depresión si evoca algo perdido para siempre.",
    "combinations": [
      { "cards": "El Barco + El Parque", "meaning": "Viaje de vacaciones o turismo rodeado de gente." },
      { "cards": "El Barco + Los Peces", "meaning": "Riquezas obtenidas a través de negocios con países lejanos o herencias intercontinentales." },
      { "cards": "El Barco + El Ataúd", "meaning": "Un cambio radical, una muerte o una metamorfosis total en la existencia (un largo viaje llega a su fin)." }
    ],
    "longExplanations": [
      "El Barco, el símbolo del comercio, expresa una gran riqueza, que será adquirida por comercio o herencia, si está cerca de la persona, significa un viaje próximo. — Philippe Lenormand",
      "Cuando la carta de El Barco está presente, señala que algo está cambiando. Algo se acerca o se aparta. La respuesta a esta pregunta se encontrará en las cartas vecinas.",
      "Puede representar también los viajes que se hacen al profundo de nuestro ser, la añoranza de alguien o por alguien que se perdió o falleció. En esta situación, hay una predisposición a vivir una gran cantidad de emociones.",
      "Durante un largo período de tiempo, le surgía siempre la carta El Barco a un consultante mío... cuando apareció la combinación con El Ataúd, concluí que la transformación profunda (cambio de sexo) que estaba atravesando había llegado por fin a su objetivo. Es indicativo de que es una barcaza o transporte pesado que avanza lento pero invariable."
    ]
  },
  {
    "id": 4,
    "number": "04",
    "name": "La Casa",
    "suit": "Rey de Corazones",
    "emoji": "🏠",
    "baseMeaning": "Hogar, familia, estabilidad, bienes raíces.",
    "symbolicCore": "La zona de confort, la base psicológica, el templo protector de cada ser humano.",
    "actionVerb": "Proteger / Acomodar / Estabilizar",
    "polarity": "Positiva (+)",
    "timing": "Constante, perdurable.",
    "mainTheme": "El refugio privado, la familia y el 'yo' interno.",
    "readings": {
      "love": "Relación estable y tradicional basada en valores familiares. Cohabitación.",
      "work": "Trabajo desde casa, negocios inmobiliarios, una base empresarial sólida.",
      "money": "Ahorros protegidos, solidez material, propiedades e inversiones tangibles.",
      "health": "Buena constitución física frente a enfermedades; el cuerpo humano.",
      "general": "Indica una situación que perdura en el tiempo, un anclaje a las raíces o las paredes domésticas."
    },
    "contextualLayers": {
      "persona": "Una persona casera, el padre o la madre, alguien protector, tradicional y rutinario.",
      "tema": "El edificio físico, los vecinos, el cuerpo propio, el sentido de hospitalidad.",
      "accion": "Guardar secretos, mantener la tradición, refugiarse en lo conocido."
    },
    "relations": {
      "relatedCards": ["El Árbol (Raíces, genealogía y solidez)", "El Ancla (Estabilidad y sedentarismo)"],
      "similarCards": ["La Torre (Pero La Torre es un gran edificio/institución o apartamento en altura, desconectada, mientras La Casa es íntima, acogedora y terrenal)"],
      "oppositeCards": ["Las Cigüeñas (Cambio de domicilio versus fijeza)", "El Barco (Alejamiento de las raíces)"]
    },
    "warnings": "Si aparece con cartas desfavorables (El Zorro, La Serpiente, Los Ratones), la traición anida dentro de tu propia casa. Vigila a tus parientes o invitados diarios de confianza; la amenaza moral no viene de extraños.",
    "combinations": [
      { "cards": "La Casa + Barco o Cigüeñas", "meaning": "Mudanza de vivienda, emigración, reubicación de base o de país." },
      { "cards": "La Casa + Los Lirios", "meaning": "Revela una fuerte conexión con las raíces familiares, la ancianidad de la casa, virtudes pasadas de generación en generación." },
      { "cards": "La Casa + La Serpiente", "meaning": "Un miembro de la familia está desarrollando sentimientos de envidia o falsedad bajo tu propio techo." }
    ],
    "longExplanations": [
      "La Casa es una señal garantizada de éxito y prosperidad y aunque la posición de la persona no sea favorable, el futuro será brillante. — Philippe Lenormand",
      "La Casa representa nuestro 'YO', refleja nuestra alma. Nos sentimos nosotros mismos en nuestra casa, allí es donde encontramos confort y paz lejos del caos cotidiano.",
      "Es en casa que guardamos nuestros secretos más íntimos, donde luchamos con nosotros mismos para encontrar equilibrio. Cuando sale como primera carta, la preocupación principal son tareas domésticas, los muebles, el alquiler.",
      "Las cartas vecinas a La Casa, también pueden darnos una visión de cómo el consultante lidia con las personas que la circundan. Si La Casa estuviera rodeada de cartas de falsedad (Ratones, Zorro, Serpiente) debe ponerse atención a las personas que recibe en su casa, posibles traiciones familiares o problemas con inquilinos/vecinos."
    ]
  },
  {
    "id": 5,
    "number": "05",
    "name": "El Árbol",
    "suit": "7 de Corazones",
    "emoji": "🌳",
    "baseMeaning": "Vida, vitalidad, desarrollo lento, y principalmente la Salud.",
    "symbolicCore": "El crecimiento profundo, el arraigo de las cosas a través del tiempo y las generaciones.",
    "actionVerb": "Enraizar / Crecer / Sanar",
    "polarity": "Neutra a Positiva (+)",
    "timing": "Muy lento, largo plazo (tarda en crecer pero dura toda la vida).",
    "mainTheme": "Diagnóstico de la salud vital y las herencias genealógicas.",
    "readings": {
      "love": "Amor arraigado, fuerte, paciente pero que puede carecer de pasión impulsiva.",
      "work": "Una trayectoria profesional que avanza lento pero está cimentada; vocación médica.",
      "money": "Desarrollo financiero seguro, capital asegurado a lo largo del tiempo.",
      "health": "Es la carta regente de la salud. Acompañada de buenas cartas refleja vitalidad férrea; con malas, indica padecimientos arrastrados largos años.",
      "general": "Representa aquello que echa raíces profundas en nuestra vida, tanto lo positivo como las enfermedades."
    },
    "contextualLayers": {
      "persona": "Una persona paciente, espiritual, de profunda convicción, con conocimientos médicos o curativos, o muy testaruda e inflexible.",
      "tema": "El linaje, el ADN, el karma vital, la naturaleza.",
      "accion": "Esperar con paciencia, dejar que el tiempo haga lo suyo."
    },
    "relations": {
      "relatedCards": ["La Casa (Tradición, ancestros)", "Los Lirios (Las décadas y el envejecimiento gradual)"],
      "similarCards": ["El Ancla (Estabilidad, pero el Árbol indica crecimiento orgánico vivo y lento, mientras el ancla es puro objeto inerte y peso retenedor)"],
      "oppositeCards": ["La Guadaña (El corte absoluto del Árbol, el accidente sorpresivo frente al letargo)"]
    },
    "warnings": "El Árbol nos asiste literalmente desde el nacimiento a la tumba. Si aparecen a su lado Ataúd, Nubes, Guadaña, Látigo, Cruz... indican un malestar agudo físico o del alma. Refleja padecimientos pesados y karmáticos o depresión crónica que se arraigó.",
    "combinations": [
      { "cards": "El Árbol + El Anillo", "meaning": "Relación monótona o estancada. La pareja requiere sanación porque la rutina ahogó el progreso." },
      { "cards": "El Árbol + La Guadaña", "meaning": "Cirugía, corte repentino que atenta contra el árbol de la vida (accidente físico)." },
      { "cards": "El Árbol + Las Nubes + Ataúd", "meaning": "Esquema claro de una enfermedad grave que agobia a la persona desde tiempo atrás o mal funcionamiento psíquico." }
    ],
    "longExplanations": [
      "Los árboles son indispensables: nos asisten y nos acompañan a lo largo de la vida, y se quedan junto a nosotros, incluso luego de nuestra muerte, con las cuatro maderas del ataúd. — Alfonso Burgio",
      "Simboliza la vida, cuando se presenta en una lectura señala las condiciones de salud respecto al tema de la carta con que está en contacto. ",
      "Con El Anillo, indica que la relación no es saludable, las razones pueden ser la rutina de la pareja. Para mayor claridad, observe las cartas alrededor. ",
      "Si cerca del consultante hay cartas desfavorables, señala un malestar largo (una enfermedad prolongada que ha echado raíces).",
      "También hace referencia al origen biológico, al tronco del que venimos (padres, abuelos), tradiciones pesadas, conservadurismo y la total necesidad de reconectarse con el origen para hallar sanación."
    ]
  },
  {
    "id": 6,
    "number": "06",
    "name": "Las Nubes",
    "suit": "Rey de Tréboles (Bellotas)",
    "emoji": "☁️",
    "baseMeaning": "Confusión, malestares, cuestiones complejas de ocultamiento, inestabilidad.",
    "symbolicCore": "La niebla que interfiere en el plano psíquico y mental, la incapacidad para ver el futuro y la falta de juicio claro.",
    "actionVerb": "Nublar / Confundir / Dudar",
    "polarity": "Negativa (-)",
    "timing": "Efímero o variable. Algo cambiante como el clima.",
    "mainTheme": "Ambigüedad mental, crisis pasajeras, caos.",
    "readings": {
      "love": "Relación tóxica o confusa, falta de definición, comportamiento obsesivo, 'luz del gas' (manipulación).",
      "work": "Cláusulas ocultas, entorno laboral desorganizado, inestabilidad total en el puesto.",
      "money": "Dificultad temporal para ver claro el problema económico, caos administrativo.",
      "health": "Enfermedades bronquiales (pulmones, asma) y fundamentalmente desequilibrios psíquicos, depresión aguda, toxicomanía.",
      "general": "Representan siempre una interferencia exterior que escapa del control de ambos."
    },
    "contextualLayers": {
      "persona": "Una persona confusa, depresiva, un adicto o alcohólico, o simplemente un encubridor.",
      "tema": "El clima adverso, el gas, los vapores, contaminación mental.",
      "accion": "Esconderse temporalmente, paralizarse por miedo a lo que no se ve."
    },
    "relations": {
      "relatedCards": ["La Serpiente (Mentiras adyacentes)", "El Látigo (Tortura psicológica)"],
      "similarCards": ["El Zorro (Ambos ocultan, pero Las Nubes ocultan por pura confusión incontrolable, el Zorro oculta maliciosa y estratégicamente)"],
      "oppositeCards": ["El Sol (La explosión de verdad y la claridad fulminante que desintegra a la Nube)"]
    },
    "warnings": "El aspecto doble tradicional (El lado oscuro vs claro de las nubes). Si ocupan la última posición de la línea, significa que ocurren nuevos acontecimientos ocultos y que el consultante ha perdido total control sobre su propio destino y debe resignarse sin forzar las cosas. Si están acompañadas de Serpiente/Látigo avisan Magia Negra.",
    "combinations": [
      { "cards": "Las Nubes + El Látigo + Libro", "meaning": "Magia Oculta, maldición o enemigos secretos que intervienen psíquicamente la mente de la víctima." },
      { "cards": "Las Nubes + Los Lirios", "meaning": "Traición velada, inestabilidad sobre la propia sexualidad, turbiedad familiar encubierta de formalidad." },
      { "cards": "Las Nubes + Peces", "meaning": "Consumo de tóxicos o medicamentos, intoxicación etílica o desorden económico." }
    ],
    "longExplanations": [
      "Las Nubes si el lado claro de las mismas está en dirección de la carta de la persona, la previsión es positiva, pero con el lado ennegrecido en dirección, algo desagradable ocurrirá. — Philippe",
      "Ellas son el termómetro del tiempo y de la mente: anuncian la llegada de un clima tóxico insoportable.",
      "Anuncia algo no visible, ambiguo como aquello que dificulta comprender la realidad, información vaga o situaciones que ocultan trampas.",
      "El estado emocional y mental se está agravando hacia un exceso de comportamientos destructivos (consumo de pastillas, drogas, alcohol). Aconseja parar todo proceso. Mejor no hacer absolutamente nada y dejar pasar algunos días antes de actuar bajo estos cielos cubiertos."
    ]
  },
  {
    "id": 7,
    "number": "07",
    "name": "La Serpiente",
    "suit": "Reina de Tréboles (Bellotas)",
    "emoji": "🐍",
    "baseMeaning": "Engaños, traiciones, manipulación fríamente calculada.",
    "symbolicCore": "La seducción hipnótica seguida de veneno. La malicia y la destrucción a las espaldas.",
    "actionVerb": "Traicionar / Engañar / Envolver",
    "polarity": "Negativa (-)",
    "timing": "No va directo al tema, hace rodeos (procesos lentos pero implacables).",
    "mainTheme": "Peligros y enemigos ocultos o rivales.",
    "readings": {
      "love": "Infidelidad segura, celos enfermizos, una amante (rival), enredo sexual destructivo.",
      "work": "Traición de colegas, jugar sucio, difamaciones para robar tu prestigio.",
      "money": "Pérdida por fraude y robo, chantajes vinculados.",
      "health": "Intestinos (formas de reptil), enfermedades ocultas que avanzan silentes. Poder de la mente que puede sanar.",
      "general": "Alguien originará una falsedad a tus espaldas, un engaño al mínimo detalle con pruebas para hundirte."
    },
    "contextualLayers": {
      "persona": "Una figura carismática pero hipócrita y envidiosa; una mujer mayor muy peligrosa, un hechicero, el rival amoroso.",
      "tema": "Mentiras patológicas, difamación, brujería, seducción engañosa.",
      "accion": "Preparar un entorno (un cebo) buscando que el consultante ingenuo tropiece; chantajear."
    },
    "relations": {
      "relatedCards": ["El Zorro (La estafa laboral/estratégica)"],
      "similarCards": ["El Zorro (Ambos mienten, pero el Zorro es el ladrón urbano perspicaz para sobrevivir, la Serpiente ataca para destruir tu reputación desde el puro morbo o rivalidad)"],
      "oppositeCards": ["El Perro (Lealtad verdadera, amistad limpia que es antídoto a la víbora)"]
    },
    "warnings": "El peligro es inminente. La Serpiente está fabricando una trampa con pruebas para dominarte, pero a veces su habilidad retorcida aconseja al propio consultante hacer giros evasivos para zafarse del mal. Si la carta Látigo y Nubes acompaña a la Serpiente, la víctima está bajo severo control hechicero.",
    "combinations": [
      { "cards": "La Serpiente + El Látigo + Las Nubes", "meaning": "Magia negra o pactos siniestros sobre el consultante." },
      { "cards": "La Serpiente + El Anillo", "meaning": "Ruptura del matrimonio por adulterio (rival destructivo de por medio)." },
      { "cards": "La Serpiente + El Zorro", "meaning": "Mentiras tejidas de manera brillante, trampa mortal corporativa, mentiroso patológico." }
    ],
    "longExplanations": [
      "La Serpiente es un indicador de infortunio, su extensión depende de la distancia. Expresa, invariablemente, engaño y problemas. — Philippe",
      "Algo peligroso se acerca silenciosamente, y va a destruir la reputación de la vida de la persona.",
      "Alguien organizará un escenario, manipulará sucesos (un enredo preparado al más mínimo detalle) para servir de atracción (carnada) conduciendo al consultante ingenuo a traicionarse a sí mismo.",
      "Las pruebas (grabaciones, escritos) constituirán una 'flaqueza' que se hará pública o servirá para chantaje cruel en beneficio propio."
    ]
  },
  {
    "id": 8,
    "number": "08",
    "name": "El Ataúd",
    "suit": "9 de Diamantes (Cascabeles)",
    "emoji": "⚰️",
    "baseMeaning": "Final definitivo, pérdida total, transformación radical del destino y muerte.",
    "symbolicCore": "El vacío absoluto, el encierro del pasado de lo que no puede recuperarse nunca más.",
    "actionVerb": "Terminar / Enterrar / Desprender",
    "polarity": "Negativa (-)",
    "timing": "Para siempre. Estancamiento e inactividad duradera.",
    "mainTheme": "Conclusión inevitable de un ciclo con trauma y duelo.",
    "readings": {
      "love": "Divorcio sin vuelta atrás, pérdida de la pareja, viudedad, soledad dolorosa.",
      "work": "Quiebre absoluto empresarial, jubilación final, pérdida radical de empleo.",
      "money": "Deudas que arruinan de por vida, recursos completamente agotados.",
      "health": "Enfermedades severas (postración en cama inmovilizado). Si va mal rodeada: defunción.",
      "general": "Hay que aceptar y rendirse, el Universo entierra algo para siempre."
    },
    "contextualLayers": {
      "persona": "Una persona taciturna, que arrastra luto, muerta o muy depresiva.",
      "tema": "El lecho, la incubadora, fobias profundas, el pasado sepultado.",
      "accion": "Terminar, liquidar, llorar la falta por desapego total. Aceptación dura."
    },
    "relations": {
      "relatedCards": ["La Guadaña (Corte), La Cruz (Karma pesado)"],
      "similarCards": ["La Cruz (Ambas son pesadas, pero La Cruz es cargar en vida con inmenso sufrimiento continuado, el Ataúd en cambio liquida el tema deteniendo la vida o quitándola de tajo)"],
      "oppositeCards": ["El Niño (Principio y vida originaria que desafían al último recipiente)"]
    },
    "warnings": "El Ataúd no es solamente Muerte física (que requiere combinaciones macabras de Árbol+Ataúd+Cruz) sino MUERTE METAFÓRICA que libera. Recomienda abandonar todo estandarte psíquico para soltar algo asfixiante. A pesar del dolor, abre una incubación en el vientre para algo posterior.",
    "combinations": [
      { "cards": "El Ancla + El Ataúd", "meaning": "Fin de un cargo, dimisión, jubilación." },
      { "cards": "El Barco + El Ataúd", "meaning": "Cambio traumático irrevocable en la esencia de la vida (Transiciones muy densas)." },
      { "cards": "Los Caminos + La Cruz + El Ataúd", "meaning": "Varios exámenes médicos fallidos, fin lento y doloroso que deviene inexorablemente en muerte clínica (Basado en caso de estudio del libro)." }
    ],
    "longExplanations": [
      "El Ataúd es la expresión de cambios profundos que la mayoría de las veces son traumáticos. Informa el desenlace y el desapegarse de lo que es inútil e irrecuperable.",
      "La aparición de esta carta aconseja el abandono del pasado, librarse de viejos estándares de comportamientos que impidan la felicidad.",
      "Recomienda que se haga un esfuerzo aceptando los hechos, aunque la situación vivida en el momento sea dramática y profundamente dolorosa. A veces anuncia algo que 'debe permanecer enterrado' para siempre y que de lo que no se debe volver a hablar.",
      "La anécdota de lectura con el Ataúd reflejó los intentos médicos por salvar a un familiar mediante muchas intervenciones (Los Caminos + La Cruz) pero el Ataúd indicaba fatalidad con el peor desenlace posible real verificado por la autora."
    ]
  },
  {
    "id": 9,
    "number": "09",
    "name": "El Ramo",
    "suit": "Reina de Picas (Hojas)",
    "emoji": "💐",
    "baseMeaning": "Felicidad, reconocimiento, eventos agradables o invitaciones sociales.",
    "symbolicCore": "El donativo estético o artístico. La floración de una satisfacción de índole mundana o festiva.",
    "actionVerb": "Alegrar / Reconocer / Embellecer",
    "polarity": "Positiva (+)",
    "timing": "Breve tiempo, un regalo de duración efímera o estética primaveral.",
    "mainTheme": "Triunfos de honor, formalidades, celebraciones de vida.",
    "readings": {
      "love": "Admiración y cortejos seductores muy amables, galantería. Propuesta amorosa.",
      "work": "Ascenso, premio o medalla honoraria en la empresa. Talento artístico compensado.",
      "money": "Aumento salarial de reconocimiento, gastos cosméticos o en artes.",
      "health": "Sanación post tratamiento o fitoterapia (hierbas que devuelven el color al enfermo).",
      "general": "Cuando El Ramo sale tras una carta letal o dura, anuncia la superación del desafío y una pequeña victoria consolidada."
    },
    "contextualLayers": {
      "persona": "Una mujer joven coqueta, una figura diplomática, diseñadora de modas, esteticista o el pretendiente adulador.",
      "tema": "Cosméticos, fiestas, botánica herbal, protocolo exquisito.",
      "accion": "Agradar, embellecerse, dar regalos y mostrar cortesía al punto frívolo."
    },
    "relations": {
      "relatedCards": ["El Trébol (Alegrías breves)"],
      "similarCards": ["El Trébol (Pero Trébol es un golpe azaroso de pura suerte cósmica, mientras el Ramo es formalidad social o un regalo dado por mérito)"],
      "oppositeCards": ["La Guadaña (El ramo decora amablemente mientras la Falsedad lo destruye todo de un tajo inestético)"]
    },
    "warnings": "También simboliza las falsas apariencias, la 'formalidad' (a veces vacía o hueca) para sonreír diplomáticamente ocultando que las raíces (carta anterior) están dañadas. Con Nubes oscuras revela 'ambigüedad disfrazada bajo cortesía superficial' y un intento de manipulación seductora excesivo.",
    "combinations": [
      { "cards": "El Ramo + Las Nubes (Oscuras)", "meaning": "Sonrisas y amabilidad fingida cuyo objetivo es el oscurecimiento afectivo; ambigüedad que desilusiona velozmente." },
      { "cards": "El Ramo + La Luna", "meaning": "Aplausos atronadores de alto público, premio ganado por obra artística masiva." },
      { "cards": "El Libro + El Ramo", "meaning": "Becas estudiantiles o grados académicos alcanzados con gran alegría y honores máximos." }
    ],
    "longExplanations": [
      "El Ramo es un indicador de felicidad en todos los aspectos de la vida. — Philippe Lenormand",
      "Representa la manifestación de sentimientos, cariño, de respeto y una ocasión especial que genera entusiasmo (boda, cumpleaños, cine, regalo).",
      "Simboliza la belleza y el placer. Un ramo de flores trae alegría en cualquier sala. Es un gesto que evidencia afecto pero *también representa la apariencia que se debe mantener delante de ciertas personas o situaciones*.",
      "Durante mi enfermedad, pude observar en mis directas lecturas que siempre que la carta de El Ramo estaba ligada después de otra carta de altísimo valor negativo (hospital, tratamientos), el resultado era favorable. ¡El final del pasillo ofrecía un triunfo vital de superación!"
    ]
  }
];

cardsDictionary.push(...cards10to18);
cardsDictionary.push(...cards19to27);
cardsDictionary.push(...cards28to36);


