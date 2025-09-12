// calculadora-cientifica.js
// Funciones científicas y manejo de excepciones para la calculadora


// Historial de operaciones científicas
const historialCientifico = [];
const listaHistorial = document.getElementById('historial');

// scientificOperation ejecuta la función científica seleccionada y maneja excepciones
function operacionCientifica(funcion, valor, actualizarDisplay) {
    let resultado;
    let operacionStr = '';
    try {
        let val = parseFloat(valor);    
        if (isNaN(val) && funcion !== 'pi') throw new Error('Entrada inválida');
        switch (funcion) {
            case 'raiz':
                if (val < 0) throw new Error('Raíz de negativo');
                resultado = Math.sqrt(val);
                operacionStr = `√(${val}) = ${resultado}`;
                break;
            case 'cuadrado':
                resultado = Math.pow(val, 2);
                operacionStr = `(${val})² = ${resultado}`;
                break;
            case 'inverso':
                if (val === 0) throw new Error('División por cero');
                resultado = 1 / val;
                operacionStr = `1/(${val}) = ${resultado}`;
                break;
            case 'pi':
                resultado = Math.PI;
                operacionStr = `π = ${resultado}`;
                break;
            default:
                throw new Error('Función desconocida');
        }
        actualizarDisplay(resultado.toString());
        agregarAlHistorialCientifico(operacionStr);
        return resultado.toString();
    } catch (e) {
        actualizarDisplay('Error: ' + e.message);
        agregarAlHistorialCientifico(`${funcion}(${valor}) = Error: ${e.message}`);
        return 'Error';
    }
}

// Agrega la operación al historial y la muestra en pantalla
function agregarAlHistorialCientifico(operacion) {
    historialCientifico.unshift(operacion);
    if (listaHistorial) {
        listaHistorial.innerHTML = historialCientifico.slice(0, 10).map(op => `<li>${op}</li>`).join('');
    }
}

// Asigna eventos a los botones científicos
const botonesCientificos = document.querySelectorAll('.boton-cientifico');
botonesCientificos.forEach(btn => {
    btn.addEventListener('click', () => {
        const funcion = btn.dataset.funcion;
        const valor = document.getElementById('display').value;
        operacionCientifica(funcion, valor, val => {
            document.getElementById('display').value = val;
        });
    });
});


