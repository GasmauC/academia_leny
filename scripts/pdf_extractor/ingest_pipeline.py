import os
import json
import re
from pypdf import PdfReader

# Configuración de los archivos PDF
PDF_SOURCES = [
    "../../Manual de Poker/Curso de Cartomancia con Mazo de Poker parte 1.pdf",
    "../../Manual de Poker/Curso de Cartomancia con Mazo de Poker parte 2.pdf",
    "../../Manual de Poker/Curso de Cartomancia con Mazo de Poker parte 3.pdf",
    "../../Manual de Poker/Curso de Cartomancia con Mazo de Poker parte 4.pdf",
    "../../Manual de Poker/Curso de Cartomancia con Mazo de Poker parte 5.pdf",
    "../../Manual de Poker/Curso de Cartomancia con Mazo de Poker parte 6.pdf",
    "../../Manual de Poker/Curso de Cartomancia con Mazo de Poker parte 7.pdf",
    "../../Manual de Poker/Curso de Cartomancia con Mazo de Poker parte 8.pdf",
    "../../Manual de Poker/Manual_Grande.pdf"
]

BOOK_JSON_PATH = "../../src/data/db/poker_book.json"
CARDS_JSON_PATH = "../../src/data/db/poker_cards_theory.json"

def extract_text_from_pdf(pdf_path):
    """Extrae el texto de un PDF manteniendo la secuencialidad."""
    if not os.path.exists(pdf_path):
        print(f"Warning: {pdf_path} not found.")
        return ""
    
    text = ""
    try:
        reader = PdfReader(pdf_path)
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")
    return text

def detect_headers(text):
    """
    Detecta los encabezados usando expresiones regulares.
    Esto se adaptará según los patrones exactos de los PDFs originales
    (por ejemplo, números romanos, palabras en mayúsculas, etc).
    """
    # Ejemplo de patrón para detectar capítulos principales o títulos de cartas
    # ej: "I. Historia de la Cartomancia", "As de Corazones", etc.
    header_pattern = re.compile(r'^(I{1,3}|IV|V|VI{0,3}|IX|X|XI|XII)\.\s+.*$|^(As|Dos|Tres|Cuatro|Cinco|Seis|Siete|Ocho|Nueve|Diez|Jota|Reina|Rey)\s+de\s+(Corazones|Tréboles|Diamantes|Picas)$', re.MULTILINE | re.IGNORECASE)
    
    segments = []
    last_idx = 0
    last_header = "Intro"
    
    for match in header_pattern.finditer(text):
        start, end = match.span()
        segment_content = text[last_idx:start].strip()
        if segment_content:
            segments.append({
                "header": last_header,
                "content": segment_content
            })
        last_header = match.group().strip()
        last_idx = end
        
    # Añadir el último segmento
    if last_idx < len(text):
        segments.append({
            "header": last_header,
            "content": text[last_idx:].strip()
        })
        
    return segments

def assign_to_book_node(book_data, segment_header, segment_content):
    """
    Recorre el árbol de poker_book.json y asigna el contenido al nodo correspondiente.
    """
    # Función recursiva de búsqueda y asignación
    def traverse_and_assign(nodes):
        for node in nodes:
            # Lógica simple de coincidencia (a refinar según los nombres exactos)
            if node['title'].lower() in segment_header.lower():
                node['content'] += ("\n\n" if node['content'] else "") + segment_content
                return True
            
            # Buscar en subsecciones
            children = node.get('chapters', []) or node.get('sections', []) or node.get('subsections', [])
            if traverse_and_assign(children):
                return True
        return False

    traverse_and_assign(book_data.get('chapters', []))

def assign_to_card_node(cards_data, segment_header, segment_content):
    """
    Asigna contenido al JSON de cartas si el header corresponde a una carta específica.
    """
    for card in cards_data:
        # Ejemplo: "As de Corazones"
        card_full_name = f"{card['numero']} de {card['palo']}".lower()
        if card_full_name in segment_header.lower():
            card['contenido'] += ("\n\n" if card['contenido'] else "") + segment_content
            break

def run_pipeline():
    print("Iniciando pipeline de ingesta (MODO PRUEBA - NO GUARDA CAMBIOS)...")
    
    with open(BOOK_JSON_PATH, 'r', encoding='utf-8') as f:
        book_data = json.load(f)
        
    with open(CARDS_JSON_PATH, 'r', encoding='utf-8') as f:
        cards_data = json.load(f)
        
    total_segments = 0
        
    for pdf in PDF_SOURCES:
        print(f"Procesando: {pdf}...")
        raw_text = extract_text_from_pdf(pdf)
        segments = detect_headers(raw_text)
        total_segments += len(segments)
        
        for seg in segments:
            # Aquí iría la lógica condicional para enviar al libro o a las cartas
            assign_to_book_node(book_data, seg['header'], seg['content'])
            assign_to_card_node(cards_data, seg['header'], seg['content'])
            
    print(f"Pipeline ejecutado exitosamente. Se segmentaron {total_segments} bloques de texto.")
    print("Nota: El guardado final está desactivado en esta fase arquitectónica.")

if __name__ == "__main__":
    run_pipeline()
