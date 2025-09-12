// calculadora.js
// Lógica de la calculadora básica (sin funciones científicas)
// Comentarios detallados para exposición grupal

// Selecciona el display de la calculadora
const display = document.getElementById('calc-display');
let current = '';
let operator = '';
let operand = '';
let resetNext = false;

// Actualiza el valor mostrado en el display
function updateDisplay(val) {
    display.value = val;
}

// Maneja la entrada de números y el punto decimal
function inputNumber(num) {
    if (resetNext) {
        current = '';
        resetNext = false;
    }
    // Evita múltiples puntos decimales
    if (num === '.' && current.includes('.')) return;
    current += num;
    updateDisplay(current);
}

// Maneja la selección de operadores (+, -, *, /)
function inputOperator(op) {
    // Si no hay número actual ni operando previo, no hace nada
    if (current === '' && operand === '') return;
    // Si ya hay un operando y un número actual, calcula antes de continuar
    if (operand !== '' && current !== '') {
        try {
            calculate();
        } catch (e) {
            updateDisplay('Error: ' + e.message);
            current = '';
            operand = '';
            operator = '';
            return;
        }
    }
    operator = op;
    operand = current;
    current = '';
}

// Realiza el cálculo según el operador seleccionado
function calculate() {
    let a = parseFloat(operand);
    let b = parseFloat(current);
    let result = 0;
    // Manejo de excepciones para entradas inválidas
    if (isNaN(a) || isNaN(b)) {
        throw new Error('Entrada inválida');
    }
    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b === 0) throw new Error('División por cero');
            result = a / b;
            break;
        default:
            result = b;
    }
    current = result.toString();
    updateDisplay(current);
    operand = '';
    operator = '';
    resetNext = true;
}

// Limpia todos los valores y el display
function clearAll() {
    current = '';
    operand = '';
    operator = '';
    updateDisplay('');
}

// Borra el último dígito del número actual
function deleteLast() {
    if (resetNext) {
        current = '';
        resetNext = false;
    } else {
        current = current.slice(0, -1);
    }
    updateDisplay(current);
}

// Asigna eventos a los botones de la calculadora
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    if (btn.classList.contains('btn-num')) {
        btn.addEventListener('click', () => inputNumber(btn.dataset.num));
    } else if (btn.classList.contains('btn-op')) {
        btn.addEventListener('click', () => inputOperator(btn.dataset.op));
    } else if (btn.classList.contains('btn-ctrl')) {
        if (btn.dataset.func === 'clear') {
            btn.addEventListener('click', clearAll);
        } else if (btn.dataset.func === 'del') {
            btn.addEventListener('click', deleteLast);
        }
    } else if (btn.classList.contains('btn-eq')) {
        btn.addEventListener('click', () => {
            try {
                calculate();
            } catch (e) {
                updateDisplay('Error: ' + e.message);
                current = '';
                operand = '';
                operator = '';
            }
        });
    }
});

// Permite el uso del teclado para operar la calculadora
window.addEventListener('keydown', function(e) {
    if (e.key >= '0' && e.key <= '9') inputNumber(e.key);
    if (e.key === '.') inputNumber('.');
    if (['+', '-', '*', '/'].includes(e.key)) inputOperator(e.key);
    if (e.key === 'Enter' || e.key === '=') {
        try {
            calculate();
        } catch (err) {
            updateDisplay('Error: ' + err.message);
            current = '';
            operand = '';
            operator = '';
        }
    }
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearAll();
});

// Comentarios para exposición:
// Persona 1: Explica HTML y estructura de clases
// Persona 2: Explica CSS, grid y responsive
// Persona 3: Explica funciones JS básicas (input, operadores, igual, excepciones)
// Persona 4: Explica funciones científicas (en archivo aparte) y manejo de eventos
