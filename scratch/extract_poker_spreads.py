import fitz
import os
import glob

pdf_dir = "Manual de Poker"
pdfs = glob.glob(os.path.join(pdf_dir, "*.pdf"))

with open("scratch/poker_spreads_output.txt", "w", encoding="utf-8") as out:
    for pdf_path in pdfs:
        out.write(f"--- Parsing {pdf_path} ---\n")
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        
        # Simple search
        lines = text.split("\n")
        for i, line in enumerate(lines):
            lower_line = line.lower()
            if "tirada" in lower_line and ("3" in lower_line or "tres" in lower_line or "5" in lower_line or "cinco" in lower_line or "9" in lower_line or "nueve" in lower_line or "cartas" in lower_line):
                # out.write(f"Found in {pdf_path}: {line.strip()}\n")
                start = max(0, i-2)
                end = min(len(lines), i+15)
                # out.write("\n".join(lines[start:end]) + "\n")
                # out.write("="*40 + "\n")
                
        # Better: let's just write the whole text of part 8 or the "Manual_Grande.pdf" if that contains everything.
        # Actually, let's dump all text to one big txt file to easily search it.
        
with open("scratch/all_poker_text.txt", "w", encoding="utf-8") as f:
    for pdf_path in pdfs:
        f.write(f"--- {pdf_path} ---\n")
        doc = fitz.open(pdf_path)
        for page in doc:
            f.write(page.get_text() + "\n")
