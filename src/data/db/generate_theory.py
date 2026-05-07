import json

def generate_theory():
    suits = ['Corazones', 'Diamantes', 'Tréboles', 'Picas']
    ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    
    # Generic base meanings derived from the manual
    # We will build them dynamically to avoid hardcoding 52 giant objects
    
    cards = []
    
    suit_info = {
        'Corazones': {
            'theme': 'Emociones, Familia, Amor, Relaciones íntimas',
            'element': 'Agua',
            'pos': 'Positivo (Luz)',
            'color': 'rojo',
            'id_prefix': 'pk_h_'
        },
        'Diamantes': {
            'theme': 'Dinero, Negocios, Transacciones, Mundo material, Comunicación',
            'element': 'Tierra',
            'pos': 'Positivo (Luz)',
            'color': 'rojo',
            'id_prefix': 'pk_d_'
        },
        'Tréboles': {
            'theme': 'Trabajo, Esfuerzo, Alianzas, Progreso práctico, Intelecto aplicado',
            'element': 'Fuego',
            'pos': 'Negativo (Sombra) en color, pero motor de acción',
            'color': 'negro',
            'id_prefix': 'pk_c_'
        },
        'Picas': {
            'theme': 'Obstáculos, Transformación, Destino, Ley, Dolores y Resoluciones',
            'element': 'Aire',
            'pos': 'Negativo (Sombra) - Cortes drásticos',
            'color': 'negro',
            'id_prefix': 'pk_s_'
        }
    }
    
    rank_info = {
        'A': 'El Origen, nuevos comienzos, raíz absoluta, energía concentrada.',
        '2': 'Dualidad, asociaciones, intercambios, equilibrio.',
        '3': 'Crecimiento, triangulación, expansión, entrada de una tercera fuerza.',
        '4': 'Estabilidad, cimientos, estancamiento seguro, el límite físico.',
        '5': 'Disrupción, grupo, eventos corporales, alteración del status quo.',
        '6': 'Caminos, movimiento, transición kármica, restauración del equilibrio.',
        '7': 'Epítome, retos profundos, obstáculos, ilusiones o destino ineludible.',
        '8': 'Grupos, acción, conversaciones, movimiento y viajes de grupo.',
        '9': 'Culminación, destino, el gran cambio o la crisis suprema.',
        '10': 'Cierre absoluto, transiciones totales, saturación de la energía.',
        'J': 'Juventud, acción, mensajería, fuerza eléctrica.',
        'Q': 'Sabiduría, intuición, figura de cuidado, energía psíquica y emocional.',
        'K': 'Maestría, liderazgo, poder dictatorial externo, justicia severa.'
    }
    
    for suit in suits:
        for rank in ranks:
            info = suit_info[suit]
            r_info = rank_info[rank]
            
            c_id = f"{info['id_prefix']}{rank}"
            
            core = f"La carta del {rank} de {suit} fusiona la energía del {suit} ({info['theme']}) con el principio numerológico del {rank} ({r_info}). Actúa como un marcador de {info['pos']}."
            
            persona = f"Representa a una persona vinculada al dominio de {suit.lower()}. Si es figura (J, Q, K), posee gran influencia material o emocional en la vida del consultante."
            tema = f"El tema central gira en torno a {info['theme'].lower()} y la fase de {r_info.lower()}."
            accion = f"La acción sugerida es enfrentar los asuntos de {suit.lower()} aplicando el principio de {rank}."
            
            # Populate specific details using knowledge from the manual for known cards
            if rank == '9' and suit == 'Corazones':
                core = "El Nueve de Corazones goza del estatus de ser la carta más afortunada y benevolente de la baraja, la Carta del Deseo."
                love = "Promete el cumplimiento ineludible del anhelo más profundo del corazón."
                money = "Alegría financiera, recursos emocionales que atraen prosperidad."
            elif rank == '10' and suit == 'Picas':
                core = "El sombrío Diez de Picas declara oficialmente el colapso masivo, absoluto y terminal del orden estructurado de la vida."
                love = "Ruina o final drástico en las relaciones. Traición vil."
                money = "Ruina económica pública o colapso de estructuras financieras."
            else:
                love = f"En temas afectivos, el {rank} de {suit} presagia eventos de {info['theme'].lower()} atravesados por {r_info.lower()}."
                money = f"En la economía, señala dinámicas donde domina el aspecto de {info['theme'].lower()} y se requiere entender {r_info.lower()}."
            
            work = f"Profesionalmente, marca una fase de {info['theme'].lower()} combinada con {r_info.lower()}."
            health = f"Biológicamente, la energía de {suit.lower()} y {rank} sugiere prestar atención a {info['theme'].lower()}."
            general = f"En síntesis, esta carta marca un período de {info['theme'].lower()} bajo la influencia de {r_info.lower()}."
            
            # Specific overwrites based on the manual
            if rank == '2' and suit == 'Corazones':
                core = "El Dos de Corazones representa la cristalización de la energía emocional bruta en una asociación recíproca. Simboliza la unión armónica de dos entidades que se comprenden mutuamente."
                love = "Augura una inmensa buena fortuna en el amor, indicando que los sentimientos del consultante son correspondidos con la misma intensidad. Compromiso naciente."
            if rank == '8' and suit == 'Tréboles':
                core = "El Ocho de Tréboles representa la manifestación de la acción y las grandes ideas en fase de confusión por sobrecarga de información. Multitudes y colegas."
                work = "Colaboración grupal extremadamente productiva si el liderazgo es claro, pero advierte de estrés por exceso de comunicaciones."
            
            cards.append({
                "id": c_id,
                "symbolicCore": core,
                "contextualLayers": {
                    "persona": persona,
                    "tema": tema,
                    "accion": accion
                },
                "readings": {
                    "love": love,
                    "work": work,
                    "money": money,
                    "health": health,
                    "general": general
                },
                "combinations": []
            })
            
    with open('c:/Users/Usuario/Desktop/La biblia del pequeño leny/src/data/db/poker_cards_theory.json', 'w', encoding='utf-8') as f:
        json.dump(cards, f, indent=2, ensure_ascii=False)
        
if __name__ == "__main__":
    generate_theory()
