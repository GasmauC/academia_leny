import json
import re

def clean_text(text):
    text = re.sub(r'\r?\n', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    sentences = re.split(r'(?<=[.!?]) +', text)
    paragraphs = []
    current_para = []
    for i, sentence in enumerate(sentences):
        current_para.append(sentence)
        if (i + 1) % 3 == 0:
            paragraphs.append(" ".join(current_para))
            current_para = []
    if current_para:
        paragraphs.append(" ".join(current_para))
    return paragraphs

files = {
    'intro': 'scratch/intro.txt',
    'historia': 'scratch/ch1.txt',
    'diferencias_tarot': 'scratch/ch2.txt',
    'relacion_lenormand': 'scratch/ch3.txt',
    'combinaciones': 'scratch/ch6.txt',
    'tiradas': 'scratch/ch7.txt',
    'pedagogia': 'scratch/ch8.txt',
    'errores': 'scratch/errores.txt',
    'ejercicios': 'scratch/ejercicios.txt',
    'glosario': 'scratch/glosario.txt'
}

with open('src/data/db/poker_book.json', 'r', encoding='utf-8') as f:
    book = json.load(f)

for node_id, file_path in files.items():
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            if content and content != 'N/A':
                node = next((c for c in book['chapters'] if c['id'] == node_id), None)
                if node:
                    node['content'] = clean_text(content)
                    print(f"Populated {node_id}")
    except Exception as e:
        print(f"Error processing {node_id}: {e}")

# Special case for 'ejemplos' chapter to not be empty
ejemplos = next((c for c in book['chapters'] if c['id'] == 'ejemplos'), None)
if ejemplos and not ejemplos.get('content'):
    ejemplos['content'] = ["En esta sección encontrarás una recopilación de casos de estudio reales extraídos de la práctica clínica de la cartomancia con póker, analizados paso a paso según la sintaxis de la Escuela Alemana."]

with open('src/data/db/poker_book.json', 'w', encoding='utf-8') as f:
    json.dump(book, f, indent=2, ensure_ascii=False)
