import fitz
import json
import os
import re

def clean_paragraph(text):
    """
    Limpia el texto uniendo párrafos que la extracción de PDF dividió con saltos de línea y guiones.
    """
    # Eliminar separación silábica al final de la línea
    text = re.sub(r'-\n\s*', '', text)
    # Reemplazar saltos de línea con espacios
    text = re.sub(r'\n+', ' ', text)
    # Normalizar espacios excesivos
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def build_database():
    pdf_path = "La-Biblia-de-La-Baraja-Petit-Lenormand-Guia-Para-Aprender-a-Leer.pdf"
    doc = fitz.open(pdf_path)
    toc = doc.get_toc()
    
    print(f"Encontrados {len(toc)} elementos en la Tabla de Contenidos.")
    print("Iniciando la extracción bloque a bloque para garantizar el 100% del contenido teórico original...")
    
    # Agrupar el TOC por página (1-indexed en get_toc -> 0-indexed iteración).
    # Una sola página puede marcar el inicio de varios subtítulos.
    toc_by_page = {}
    for entry in toc:
        level, title, page_num = entry
        page_idx = page_num - 1
        if page_idx not in toc_by_page:
            toc_by_page[page_idx] = []
        toc_by_page[page_idx].append({
            "level": level,
            "title": clean_paragraph(title),
            "content": [],
            "subsections": []
        })

    # Estructura base
    book = {
        "title": "La Biblia de La Baraja Petit Lenormand",
        "nodes": []
    }

    # Mantenemos las referencias a 'subsections' activas en cada nivel
    # nivel 0 es book["nodes"]
    active_path = {0: book["nodes"]}
    last_node = None

    for page_idx in range(doc.page_count):
        # 1. Inyectar nuevos nodos del TOC en la jerarquía activa si comienzan en esta pagina
        if page_idx in toc_by_page:
            for section in toc_by_page[page_idx]:
                level = section["level"]
                
                parent_level = level - 1
                while parent_level >= 0 and parent_level not in active_path:
                    parent_level -= 1
                    
                if parent_level < 0: parent_level = 0
                
                parent_list = active_path[parent_level]
                parent_list.append(section)
                
                active_path[level] = section["subsections"]
                
                # Cerrar niveles más profundos
                for l in list(active_path.keys()):
                    if l > level:
                        del active_path[l]
                        
                last_node = section

        # 2. Extraer todo el contenido textual (párrafos) sin cortar nada
        page = doc.load_page(page_idx)
        blocks = page.get_text("blocks")
        # Asegurar un orden vertical del texto en página
        blocks.sort(key=lambda b: b[1])
        
        for b in blocks:
            # b[6] == 0 significa que es un bloque de texto, no una imagen/dibujo
            if b[6] == 0:
                text = b[4]
                cleaned = clean_paragraph(text)
                
                # Descartar párrafos vacíos o simples números de paginación
                if not cleaned or cleaned.isdigit() or len(cleaned) <= 2:
                    continue
                    
                if last_node is None:
                    last_node = {
                        "level": 0,
                        "title": "Preludio",
                        "content": [],
                        "subsections": []
                    }
                    book["nodes"].append(last_node)
                
                # Comprobación de redundancia: si el párrafo extraído es EXACTAMENTE el título del Last Node
                if cleaned.lower() == last_node["title"].lower():
                    continue
                    
                # Anexar el contenido fielmente
                last_node["content"].append(cleaned)

    # 3. Guardar en JSON (Base de Datos)
    os.makedirs("src/data/db", exist_ok=True)
    out_path = "src/data/db/lenormand_book.json"
    
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(book, f, indent=2, ensure_ascii=False)
        
    print(f"Extracción exitosa. {doc.page_count} páginas procesadas y estructuradas.")
    print(f"La base de datos se encuentra lista en {out_path}.")

if __name__ == "__main__":
    build_database()
