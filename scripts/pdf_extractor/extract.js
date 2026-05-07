const fs = require('fs');
const pdf = require('pdf-parse');

async function extract() {
    try {
        const dataBuffer = fs.readFileSync('../../Manual de Poker/Manual_Grande.pdf');
        const data = await pdf(dataBuffer);
        fs.writeFileSync('manual_grande_text.txt', data.text);
        console.log("Done extracting Manual_Grande.pdf");
    } catch(e) {
        console.error("Error with Manual Grande:", e);
    }

    try {
        const dataBuffer2 = fs.readFileSync('../../Manual de Poker/Curso de Cartomancia con Mazo de Poker parte 1.pdf');
        const data2 = await pdf(dataBuffer2);
        fs.writeFileSync('parte1_text.txt', data2.text);
        console.log("Done extracting parte 1");
    } catch(e) {
        console.error("Error with parte 1:", e);
    }
}

extract();
