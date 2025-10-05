// Script simple para minificar JavaScript
const fs = require('fs');

function minifyJS(inputFile, outputFile) {
    try {
        let code = fs.readFileSync(inputFile, 'utf8');

        // Remover comentarios de una línea
        code = code.replace(/\/\/.*$/gm, '');

        // Remover comentarios multilinea
        code = code.replace(/\/\*[\s\S]*?\*\//g, '');

        // Remover espacios en blanco extras
        code = code.replace(/\s+/g, ' ');

        // Remover espacios alrededor de operadores
        code = code.replace(/\s*([=<>!+\-*/%&|^~?:;,.(){}[\]])\s*/g, '$1');

        // Remover espacios después de palabras clave
        code = code.replace(/\b(if|for|while|function|class|return|var|let|const)\s+/g, '$1');

        fs.writeFileSync(outputFile, code);
        console.log(`Archivo minificado: ${outputFile}`);
    } catch (error) {
        console.error('Error al minificar:', error);
    }
}

// Minificar juego.js
minifyJS('game/juego.js', 'game/juego.min.js');