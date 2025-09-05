let pantalla = document.getElementById('pantalla');
let operacion = '';
let num1 = '';
let num2 = '';

function agregarNumero(numero) {
    if (operacion === '') {
        num1 += numero;
        pantalla.textContent = num1;
    } else {
        num2 += numero;
        pantalla.textContent = num2;
    }
}

function operar(op) {
    operacion = op;
}

function calcular() {
    let resultado;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (operacion === '%') {
        resultado = num1 % num2;
    } else if (operacion === 'x') {
        resultado = num1 * num2;
    } else if (operacion === '+') {
        resultado = num1 + num2;
    } else if (operacion === '-') {
        resultado = num1 - num2;
    }
    pantalla.textContent = resultado;
    num1 = resultado.toString();
    num2 = '';
    operacion = '';
}
