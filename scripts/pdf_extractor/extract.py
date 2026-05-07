from pypdf import PdfReader

def extract_text(pdf_path, output_path, max_pages=15):
    reader = PdfReader(pdf_path)
    text = ""
    for i in range(min(max_pages, len(reader.pages))):
        page = reader.pages[i]
        text += page.extract_text() + "\n"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)

try:
    extract_text("../../Manual de Poker/Manual_Grande.pdf", "manual_grande_index.txt")
    print("Done Manual_Grande")
except Exception as e:
    print(f"Error Manual_Grande: {e}")

try:
    extract_text("../../Manual de Poker/Curso de Cartomancia con Mazo de Poker parte 1.pdf", "parte1_index.txt")
    print("Done parte1")
except Exception as e:
    print(f"Error parte1: {e}")
