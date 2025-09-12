// calculadora.js
// Lógica de la calculadora básica (sin funciones científicas)


// Selecciona el display de la calculadora
const display = document.getElementById('display');
let actual = '';
let operacion = '';
let operando = '';
let reiniciarSiguiente = false;

// Actualiza el valor mostrado en el display
function actualizarDisplay(valor) {
    display.value = valor;
}

// Maneja la entrada de números y el punto decimal
function ingresarNumero(num) {
    if (reiniciarSiguiente) {
        actual = '';
        reiniciarSiguiente = false;
    }
    // Evita múltiples puntos decimales
    if (num === '.' && actual.includes('.')) return;
    actual += num;
    actualizarDisplay(actual);
}

// Maneja la selección de operadores (+, -, *, /)
function ingresarOperacion(op) {
    // Si no hay número actual ni operando previo, no hace nada
    if (actual === '' && operando === '') return;
    // Si ya hay un operando y un número actual, calcula antes de continuar
    if (operando !== '' && actual !== '') {
        try {
            calcular();
        } catch (e) {
            actualizarDisplay('Error: ' + e.message);
            actual = '';
            operando = '';
            operacion = '';
            return;
        }
    }
    operacion = op;
    operando = actual;
    actual = '';
}

// Realiza el cálculo según el operador seleccionado
function calcular() {
    let a = parseFloat(operando);
    let b = parseFloat(actual);
    let resultado = 0;
    // Manejo de excepciones para entradas inválidas
    if (isNaN(a) || isNaN(b)) {
        throw new Error('Entrada inválida');
    }
    switch (operacion) {
        case '+':
            resultado = a + b;
            break;
        case '-':
            resultado = a - b;
            break;
        case '*':
            resultado = a * b;
            break;
        case '/':
            if (b === 0) throw new Error('División por cero');
            resultado = a / b;
            break;
        default:
            resultado = b;
    }
    actual = resultado.toString();
    actualizarDisplay(actual);
    operando = '';
    operacion = '';
    reiniciarSiguiente = true;
}

// Limpia todos los valores y el display
function limpiarTodo() {
    actual = '';
    operando = '';
    operacion = '';
    actualizarDisplay('');
}

// Borra el último dígito del número actual
function borrarUltimo() {
    if (reiniciarSiguiente) {
        actual = '';
        reiniciarSiguiente = false;
    } else {
        actual = actual.slice(0, -1);
    }
    actualizarDisplay(actual);
}

// Asigna eventos a los botones de la calculadora
const botones = document.querySelectorAll('.boton');
botones.forEach(btn => {
    if (btn.classList.contains('boton-numero')) {
        btn.addEventListener('click', () => ingresarNumero(btn.dataset.numero));
    } else if (btn.classList.contains('boton-operacion')) {
        btn.addEventListener('click', () => ingresarOperacion(btn.dataset.operacion));
    } else if (btn.classList.contains('boton-control')) {
        if (btn.dataset.funcion === 'limpiar') {
            btn.addEventListener('click', limpiarTodo);
        } else if (btn.dataset.funcion === 'borrar') {
            btn.addEventListener('click', borrarUltimo);
        }
    } else if (btn.classList.contains('boton-igual')) {
        btn.addEventListener('click', () => {
            try {
                calcular();
            } catch (e) {
                actualizarDisplay('Error: ' + e.message);
                actual = '';
                operando = '';
                operacion = '';
            }
        });
    }
});
