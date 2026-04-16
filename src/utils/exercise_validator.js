/**
 * Módulo de Validación y Selección de Ejercicios Lenormand
 *
 * Expone lógicas para validar que un ejercicio es "legal" según la Escuela Alemana
 * y facilita el filtrado para la interfaz de React.
 */

import { lenormandExercises } from '../data/db/lenormand_exercises';

/**
 * Valida un ejercicio verificando sus precondiciones fundamentales
 * basándose en los Códigos Lopes Mazza.
 * 
 * @param {Object} exercise - Objeto del ejercicio
 * @returns {Object} - { isValid: boolean, errors: array }
 */
export function validateExercise(exercise) {
    const errors = [];
    
    // Validar estructura básica
    if (!exercise.id || !exercise.tipo || !exercise.nivel || !exercise.cartas) {
        errors.push("Estructura de ejercicio incompleta.");
        return { isValid: false, errors };
    }

    // Validar cantidad de cartas según tipo
    if (exercise.tipo === "3cartas" && exercise.cartas.length !== 3) {
        errors.push(`Tipo 3cartas pero tiene ${exercise.cartas.length} cartas.`);
    } else if (exercise.tipo === "5cartas" && exercise.cartas.length !== 5) {
         errors.push(`Tipo 5cartas pero tiene ${exercise.cartas.length} cartas.`);
    } else if (exercise.tipo === "3x3" && exercise.cartas.length !== 9) {
         errors.push(`Tipo 3x3 pero tiene ${exercise.cartas.length} cartas.`);
    }

    // Validar presencia de texto pedagógico
    if (!exercise.respuesta_rapida || exercise.respuesta_rapida.trim() === '') {
        errors.push("Falta respuesta rápida (intuitiva/directa).");
    }
    if (!exercise.razonamiento_tecnico || exercise.razonamiento_tecnico.trim() === '') {
        errors.push("Falta razonamiento técnico (Sustantivo + Adjetivo).");
    }

    // Validación avanzada: Ley de Relevancia (Ataúd, Guadaña, Cruz, Ratones, Nubes, etc.)
    // Si la lectura contiene modificadores drásticos, el razonamiento DEBE contemplarlos.
    const hasDrasticModifier = exercise.cartas.some(c => 
        ['Ataúd', 'Guadaña', 'Cruz', 'Montaña'].some(m => c.includes(m))
    );
    
    if (hasDrasticModifier) {
        const razonamiento = exercise.razonamiento_tecnico.toLowerCase();
        // Si hay una carta drástica, al menos una palabra clave de cese/corte/dolor/bloqueo debe figurar
        const hasDrasticWord = ['corte', 'muerte', 'dolor', 'bloqueo', 'fin', 'traba', 'karma', 'radical', 'irremediable', 'amputa'].some(w => razonamiento.includes(w));
        
        // Esta es una validación "blanda", no forzamos error, pero es pedágogico advertir en consola
        if (!hasDrasticWord) {
            // console.warn(`Cuidado: El ejercicio ${exercise.id} tiene cartas drásticas pero el razonamiento suena muy ligero.`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Obtiene ejercicios aleatorios o filtrados, validando su integridad primero.
 * @param {Object} options - { tipo?: string, nivel?: number, count?: number }
 * @returns {Array} - Array de ejercicios seleccionados y validados
 */
export function getValidatedExercises(options = {}) {
    const { tipo, nivel, count } = options;
    
    // Filtrar
    let filtered = lenormandExercises.filter(ej => {
        if (tipo && ej.tipo !== tipo) return false;
        if (nivel && ej.nivel !== nivel) return false;
        return validateExercise(ej).isValid;
    });

    // Random sorting opcional
    filtered = filtered.sort(() => 0.5 - Math.random());

    if (count) {
        return filtered.slice(0, count);
    }
    
    return filtered;
}

/**
 * Retorna las estadísticas del banco de ejercicios
 */
export function getExerciseBankStats() {
    return {
        total: lenormandExercises.length,
        porTipo: {
            "3cartas": lenormandExercises.filter(e => e.tipo === "3cartas").length,
            "5cartas": lenormandExercises.filter(e => e.tipo === "5cartas").length,
            "3x3": lenormandExercises.filter(e => e.tipo === "3x3").length
        },
        porNivel: {
            1: lenormandExercises.filter(e => e.nivel === 1).length,
            2: lenormandExercises.filter(e => e.nivel === 2).length,
            3: lenormandExercises.filter(e => e.nivel === 3).length,
            4: lenormandExercises.filter(e => e.nivel === 4).length,
            5: lenormandExercises.filter(e => e.nivel === 5).length
        }
    };
}
