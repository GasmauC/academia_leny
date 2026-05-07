import json
import re

def parse_exact_theory():
    with open('c:/Users/Usuario/.gemini/antigravity/brain/365aa2d6-2427-473b-8d1f-e8a4e655ff1f/scratch/c4_full.txt', 'r', encoding='utf-8') as f:
        text = f.read()

    cards = []
    
    # Map of names to IDs
    name_to_id = {
        'As de Corazones': 'pk_h_A', 'Dos de Corazones': 'pk_h_2', 'Tres de Corazones': 'pk_h_3', 'Cuatro de Corazones': 'pk_h_4', 'Cinco de Corazones': 'pk_h_5', 'Seis de Corazones': 'pk_h_6', 'Siete de Corazones': 'pk_h_7', 'Ocho de Corazones': 'pk_h_8', 'Nueve de Corazones': 'pk_h_9', 'Diez de Corazones': 'pk_h_10', 'Jota de Corazones': 'pk_h_J', 'Reina de Corazones': 'pk_h_Q', 'Rey de Corazones': 'pk_h_K',
        'As de Diamantes': 'pk_d_A', 'Dos de Diamantes': 'pk_d_2', 'Tres de Diamantes': 'pk_d_3', 'Cuatro de Diamantes': 'pk_d_4', 'Cinco de Diamantes': 'pk_d_5', 'Seis de Diamantes': 'pk_d_6', 'Siete de Diamantes': 'pk_d_7', 'Ocho de Diamantes': 'pk_d_8', 'Nueve de Diamantes': 'pk_d_9', 'Diez de Diamantes': 'pk_d_10', 'Jota de Diamantes': 'pk_d_J', 'Reina de Diamantes': 'pk_d_Q', 'Rey de Diamantes': 'pk_d_K',
        'As de Tréboles': 'pk_c_A', 'Dos de Tréboles': 'pk_c_2', 'Tres de Tréboles': 'pk_c_3', 'Cuatro de Tréboles': 'pk_c_4', 'Cinco de Tréboles': 'pk_c_5', 'Seis de Tréboles': 'pk_c_6', 'Siete de Tréboles': 'pk_c_7', 'Ocho de Tréboles': 'pk_c_8', 'Nueve de Tréboles': 'pk_c_9', 'Diez de Tréboles': 'pk_c_10', 'Jota de Tréboles': 'pk_c_J', 'Reina de Tréboles': 'pk_c_Q', 'Rey de Tréboles': 'pk_c_K',
        'As de Picas': 'pk_s_A', 'Dos de Picas': 'pk_s_2', 'Tres de Picas': 'pk_s_3', 'Cuatro de Picas': 'pk_s_4', 'Cinco de Picas': 'pk_s_5', 'Seis de Picas': 'pk_s_6', 'Siete de Picas': 'pk_s_7', 'Ocho de Picas': 'pk_s_8', 'Nueve de Picas': 'pk_s_9', 'Diez de Picas': 'pk_s_10', 'Jota de Picas': 'pk_s_J', 'Reina de Picas': 'pk_s_Q', 'Rey de Picas': 'pk_s_K'
    }

    # Split by the titles in the text
    pattern = re.compile(r'(El|La) (As|Dos|Tres|Cuatro|Cinco|Seis|Siete|Ocho|Nueve|Diez|Jota|Reina|Rey) de (Corazones|Diamantes|Tréboles|Picas) \([^\)]+\)', re.IGNORECASE)
    
    parts = pattern.split(text)
    
    # parts[0] is the prefix before the first card.
    # The rest are in groups of 4: (article, rank, suit, content)
    
    card_contents = {}
    if len(parts) > 1:
        for i in range(1, len(parts), 4):
            article = parts[i]
            rank = parts[i+1]
            suit = parts[i+2]
            content = parts[i+3]
            
            # Clean looping bug if any
            if "corporación innegablemente" in content:
                content = content.split("corporación innegablemente")[0] + "..."
                
            name = f"{rank} de {suit}"
            # capitalization fix
            name = name.title().replace(' De ', ' de ')
            card_contents[name] = content.strip()

    # Now build the full 52 cards array
    for name, c_id in name_to_id.items():
        content = card_contents.get(name, "")
        
        # If the text was not found (like Aces or missing ones), we create a placeholder text
        if not content:
            content = f"El manual central no detalla exhaustivamente la carta {name} en esta sección, pero representa la esencia pura de su número y su palo."

        cards.append({
            "id": c_id,
            "symbolicCore": content, # We assign all text to symbolicCore to avoid summarizing/truncating
            "contextualLayers": {
                "persona": "Información contenida en el texto principal.",
                "tema": "Información contenida en el texto principal.",
                "accion": "Información contenida en el texto principal."
            },
            "readings": {
                "love": "Consultar esencia de la carta.",
                "work": "Consultar esencia de la carta.",
                "money": "Consultar esencia de la carta.",
                "health": "Consultar esencia de la carta.",
                "general": "Consultar esencia de la carta."
            },
            "combinations": []
        })

    with open('c:/Users/Usuario/Desktop/La biblia del pequeño leny/src/data/db/poker_cards_theory.json', 'w', encoding='utf-8') as f:
        json.dump(cards, f, indent=2, ensure_ascii=False)
        
if __name__ == "__main__":
    parse_exact_theory()
