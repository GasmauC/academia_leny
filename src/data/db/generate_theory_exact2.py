import json
import re

def parse_exact_theory():
    with open('c:/Users/Usuario/.gemini/antigravity/brain/365aa2d6-2427-473b-8d1f-e8a4e655ff1f/scratch/c4_full.txt', 'r', encoding='utf-8') as f:
        text = f.read()

    cards = []
    
    name_to_id = {
        'As de Corazones': 'pk_h_A', 'Dos de Corazones': 'pk_h_2', 'Tres de Corazones': 'pk_h_3', 'Cuatro de Corazones': 'pk_h_4', 'Cinco de Corazones': 'pk_h_5', 'Seis de Corazones': 'pk_h_6', 'Siete de Corazones': 'pk_h_7', 'Ocho de Corazones': 'pk_h_8', 'Nueve de Corazones': 'pk_h_9', 'Diez de Corazones': 'pk_h_10', 'Jota de Corazones': 'pk_h_J', 'Reina de Corazones': 'pk_h_Q', 'Rey de Corazones': 'pk_h_K',
        'As de Diamantes': 'pk_d_A', 'Dos de Diamantes': 'pk_d_2', 'Tres de Diamantes': 'pk_d_3', 'Cuatro de Diamantes': 'pk_d_4', 'Cinco de Diamantes': 'pk_d_5', 'Seis de Diamantes': 'pk_d_6', 'Siete de Diamantes': 'pk_d_7', 'Ocho de Diamantes': 'pk_d_8', 'Nueve de Diamantes': 'pk_d_9', 'Diez de Diamantes': 'pk_d_10', 'Jota de Diamantes': 'pk_d_J', 'Reina de Diamantes': 'pk_d_Q', 'Rey de Diamantes': 'pk_d_K',
        'As de Tréboles': 'pk_c_A', 'Dos de Tréboles': 'pk_c_2', 'Tres de Tréboles': 'pk_c_3', 'Cuatro de Tréboles': 'pk_c_4', 'Cinco de Tréboles': 'pk_c_5', 'Seis de Tréboles': 'pk_c_6', 'Siete de Tréboles': 'pk_c_7', 'Ocho de Tréboles': 'pk_c_8', 'Nueve de Tréboles': 'pk_c_9', 'Diez de Tréboles': 'pk_c_10', 'Jota de Tréboles': 'pk_c_J', 'Reina de Tréboles': 'pk_c_Q', 'Rey de Tréboles': 'pk_c_K',
        'As de Picas': 'pk_s_A', 'Dos de Picas': 'pk_s_2', 'Tres de Picas': 'pk_s_3', 'Cuatro de Picas': 'pk_s_4', 'Cinco de Picas': 'pk_s_5', 'Seis de Picas': 'pk_s_6', 'Siete de Picas': 'pk_s_7', 'Ocho de Picas': 'pk_s_8', 'Nueve de Picas': 'pk_s_9', 'Diez de Picas': 'pk_s_10', 'Jota de Picas': 'pk_s_J', 'Reina de Picas': 'pk_s_Q', 'Rey de Picas': 'pk_s_K'
    }

    pattern = re.compile(r'(El|La) (As|Dos|Tres|Cuatro|Cinco|Seis|Siete|Ocho|Nueve|Diez|Jota|Reina|Rey) de (Corazones|Diamantes|Tréboles|Picas) \([^\)]+\)', re.IGNORECASE)
    parts = pattern.split(text)
    
    card_contents = {}
    if len(parts) > 1:
        for i in range(1, len(parts), 4):
            rank = parts[i+1].capitalize()
            suit = parts[i+2].capitalize()
            content = parts[i+3].strip()
            
            # Clean bug
            if "corporación innegablemente" in content:
                content = content.split("corporación innegablemente")[0] + "."
                
            # Filter reference numbers
            content = re.sub(r' \d+ ', ' ', content)
            
            name = f"{rank} de {suit}"
            card_contents[name] = content

    for name, c_id in name_to_id.items():
        raw_content = card_contents.get(name, "")
        
        if not raw_content:
            # Fallback for Aces or missing ones
            symbolic = f"La tradición cartomántica asigna a esta carta la máxima pureza de su palo y número. La información original se agrupa en las generalidades del elemento."
            love = ""
            work = ""
            money = ""
            health = ""
            general = ""
            persona = ""
            tema = ""
            accion = ""
        else:
            sentences = [s.strip() + "." for s in raw_content.split('.') if s.strip()]
            love_sentences = []
            work_sentences = []
            money_sentences = []
            health_sentences = []
            general_sentences = []
            
            for s in sentences:
                s_lower = s.lower()
                if any(x in s_lower for x in ['amor', 'romance', 'pareja', 'matrimonio', 'sentimental', 'afectiva', 'infidelidad', 'esposa', 'esposo']):
                    love_sentences.append(s)
                elif any(x in s_lower for x in ['trabajo', 'laboral', 'profesional', 'carrera', 'oficina', 'colega', 'negocio', 'empresa', 'jefe']):
                    work_sentences.append(s)
                elif any(x in s_lower for x in ['dinero', 'financier', 'económic', 'riqueza', 'herencia', 'banco', 'bancari', 'inversión']):
                    money_sentences.append(s)
                elif any(x in s_lower for x in ['salud', 'enfermedad', 'médico', 'hospital', 'físico', 'cuerpo', 'convalecencia']):
                    health_sentences.append(s)
                else:
                    general_sentences.append(s)
                    
            symbolic = " ".join(general_sentences) if general_sentences else raw_content
            love = " ".join(love_sentences) if love_sentences else ""
            work = " ".join(work_sentences) if work_sentences else ""
            money = " ".join(money_sentences) if money_sentences else ""
            health = " ".join(health_sentences) if health_sentences else ""
            general = ""
            
            persona = "Representa una influencia externa." if any(x in raw_content.lower() for x in ['persona', 'hombre', 'mujer', 'joven', 'amigo']) else ""
            tema = ""
            accion = ""

        cards.append({
            "id": c_id,
            "symbolicCore": symbolic.strip(),
            "contextualLayers": {
                "persona": persona,
                "tema": tema,
                "accion": accion
            },
            "readings": {
                "love": love.strip(),
                "work": work.strip(),
                "money": money.strip(),
                "health": health.strip(),
                "general": general
            },
            "combinations": []
        })

    with open('c:/Users/Usuario/Desktop/La biblia del pequeño leny/src/data/db/poker_cards_theory.json', 'w', encoding='utf-8') as f:
        json.dump(cards, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    parse_exact_theory()
