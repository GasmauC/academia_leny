import json
import re

with open('scratch/ch5.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

suits = ['Corazones', 'Tréboles', 'Diamantes', 'Picas']
ranks = ['As', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez', 'Jota', 'Reina', 'Rey']

cards_data = []
current_suit = None
current_rank = None
current_text = []

for line in lines:
    line = line.strip()
    if not line:
        continue
        
    # Check for suit header
    suit_match = re.search(r'Significado del Palo de (Corazones|Tréboles|Diamantes|Picas)', line)
    if suit_match:
        # Save previous card if exists
        if current_rank and current_text:
            cards_data.append({
                'suit': current_suit,
                'rank': current_rank,
                'text': ' '.join(current_text)
            })
            current_text = []
        current_suit = suit_match.group(1)
        current_rank = None
        continue

    # Check for rank
    if line in ranks:
        # Save previous card if exists
        if current_rank and current_text:
            cards_data.append({
                'suit': current_suit,
                'rank': current_rank,
                'text': ' '.join(current_text)
            })
        current_rank = line
        current_text = []
        continue
        
    # Collect text if we are inside a card
    if current_rank:
        current_text.append(line)

# Save last card
if current_rank and current_text:
    cards_data.append({
        'suit': current_suit,
        'rank': current_rank,
        'text': ' '.join(current_text)
    })

# Load the book json
with open('src/data/db/poker_book.json', 'r', encoding='utf-8') as f:
    book = json.load(f)

cartas_chapter = next((c for c in book['chapters'] if c['id'] == 'cartas'), None)
if cartas_chapter:
    cartas_chapter['sections'] = []
    
    for suit in suits:
        suit_section = {
            'id': f'cartas_{suit.lower()}',
            'title': f'Cartas de {suit}',
            'level': 2,
            'content': '',
            'subsections': []
        }
        
        for c in cards_data:
            if c['suit'] == suit:
                suit_section['subsections'].append({
                    'id': f'card_{suit.lower()}_{c["rank"].lower()}',
                    'title': f'{c["rank"]} de {suit}',
                    'level': 3,
                    'content': [f"**Interpretación:** {c['text']}"],
                    'subsections': []
                })
        
        cartas_chapter['sections'].append(suit_section)

with open('src/data/db/poker_book.json', 'w', encoding='utf-8') as f:
    json.dump(book, f, indent=2, ensure_ascii=False)

print(f"Processed {len(cards_data)} cards.")
