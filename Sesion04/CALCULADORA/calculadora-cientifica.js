// calculadora-cientifica.js
// Funciones científicas y manejo de excepciones para la calculadora
// Archivo para exposición de la persona 4

// Historial de operaciones científicas
const scientificHistory = [];
const historyList = document.getElementById('calc-history');

// scientificOperation ejecuta la función científica seleccionada y maneja excepciones
function scientificOperation(func, value, updateDisplay) {
    let result;
    let operationStr = '';
    try {
        let val = parseFloat(value);
        if (isNaN(val) && func !== 'pi') throw new Error('Entrada inválida');
        switch (func) {
            case 'sqrt':
                if (val < 0) throw new Error('Raíz de negativo');
                result = Math.sqrt(val);
                operationStr = `√(${val}) = ${result}`;
                break;
            case 'pow':
                result = Math.pow(val, 2);
                operationStr = `(${val})² = ${result}`;
                break;
            case 'inv':
                if (val === 0) throw new Error('División por cero');
                result = 1 / val;
                operationStr = `1/(${val}) = ${result}`;
                break;
            case 'pi':
                result = Math.PI;
                operationStr = `π = ${result}`;
                break;
            default:
                throw new Error('Función desconocida');
        }
        updateDisplay(result.toString());
        addToScientificHistory(operationStr);
        return result.toString();
    } catch (e) {
        updateDisplay('Error: ' + e.message);
        addToScientificHistory(`${func}(${value}) = Error: ${e.message}`);
        return 'Error';
    }
}

// Agrega la operación al historial y la muestra en pantalla
function addToScientificHistory(operation) {
    scientificHistory.unshift(operation);
    if (historyList) {
        historyList.innerHTML = scientificHistory.slice(0, 10).map(op => `<li>${op}</li>`).join('');
    }
}

// Asigna eventos a los botones científicos
const sciButtons = document.querySelectorAll('.btn-func');
sciButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const func = btn.dataset.func;
        const value = document.getElementById('calc-display').value;
        scientificOperation(func, value, val => {
            document.getElementById('calc-display').value = val;
        });
    });
});

// Comentarios para exposición:
// Persona 4 debe explicar:
// - Cómo se manejan las excepciones con try/catch
// - Cómo se informa el error al usuario
// - Cómo se integra este archivo con el principal
// - Cómo se guarda y muestra el historial de operaciones científicas
