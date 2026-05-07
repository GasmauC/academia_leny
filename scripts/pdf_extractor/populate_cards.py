import json
import re
import os

# Configuración
CARDS_JSON_PATH = "../../src/data/db/poker_cards_theory.json"

def process_card_text(card_id, raw_text):
    """
    Función base para procesar el texto en crudo de una carta extraída del PDF
    y segmentarlo en las claves esperadas por la UI, asegurando no resumir nada.
    
    El texto en los PDFs suele tener subtítulos explícitos que utilizaremos como anclaje.
    """
    # Mapeo inicial vacío
    card_data = {
        "significado_base": "",
        "funcion": "",
        "polaridad": "",
        "lectura_simbolica": "",
        "lectura_historica": "",
        "contexto_de_uso": "",
        "combinaciones_frecuentes": [],
        "ejemplos": []
    }
    
    # Aquí se implementará la lógica de partición exacta.
    # Ejemplo conceptual usando regex basándose en posibles marcadores del PDF:
    sections = re.split(r'\n(?=Función|Polaridad|Simbolismo|Historia|Contexto|Combinaciones|Ejemplos):?', raw_text, flags=re.IGNORECASE)
    
    for section in sections:
        section_lower = section.lower().strip()
        if section_lower.startswith('función'):
            card_data['funcion'] = section.split(':', 1)[-1].strip()
        elif section_lower.startswith('polaridad'):
            card_data['polaridad'] = section.split(':', 1)[-1].strip()
        elif section_lower.startswith('simbolismo'):
            card_data['lectura_simbolica'] = section.split(':', 1)[-1].strip()
        elif section_lower.startswith('historia'):
            card_data['lectura_historica'] = section.split(':', 1)[-1].strip()
        elif section_lower.startswith('contexto'):
            card_data['contexto_de_uso'] = section.split(':', 1)[-1].strip()
        elif section_lower.startswith('combinaciones'):
            # Separar por guiones o viñetas
            lines = section.split(':', 1)[-1].strip().split('\n')
            card_data['combinaciones_frecuentes'] = [line.strip('-• ') for line in lines if line.strip()]
        elif section_lower.startswith('ejemplos'):
            lines = section.split(':', 1)[-1].strip().split('\n')
            card_data['ejemplos'] = [line.strip('-• ') for line in lines if line.strip()]
        else:
            # Si no hace match con nada, por descarte es el significado base (la intro de la carta)
            if not card_data['significado_base']:
                card_data['significado_base'] = section.strip()
            else:
                card_data['significado_base'] += "\n\n" + section.strip()
                
    return card_data

def run():
    print("Script de mapeo semántico de cartas preparado.")
    print("Este script leerá el raw_text extraído de los PDFs y lo volcará directamente en:")
    print(CARDS_JSON_PATH)
    print("Sin resúmenes. Sin pérdidas. Respetando la estructura de pestañas de PokerCardProfile.")

if __name__ == '__main__':
    run()
