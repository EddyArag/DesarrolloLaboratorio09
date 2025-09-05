// a) USO DE VARIABLES Y CONSTANTES
{
    let variableDeBloque = "Soy una variable de bloque";
    const constanteDeBloque = "Soy una constante de bloque";
    console.log(variableDeBloque); // Accesible aquí
    console.log(constanteDeBloque); // Accesible aquí
}
// console.log(variableDeBloque); // Error: no accesible fuera del bloque
// console.log(constanteDeBloque); // Error: no accesible fuera del bloque

// b) ELEVACIÓN DE VARIABLES
console.log(x === undefined); // true
var x = 3;
// devolverá un valor de undefined
var myvar = 'my value';
(function() {
    console.log(myvar); // undefined
    var myvar = 'valor local';
})();

// c) USO DE CONSOLELOG Y SCOPE
let sinAsignar;
console.log(sinAsignar); // undefined

function externa() {
    let a = 1;
    function interna() {
        let b = 2;
        console.log(a); // 1
        console.log(b); // 2
    }
    interna();
    // console.log(b); // Error: b no está definida aquí
}
externa();

// d) USO DE TIPOS DE DATOS Y CAMBIO DE TIPOS DE DATOS
var answer = 42;
console.log(typeof answer); // number
answer = 'Gracias por todo el pescado...';
console.log(typeof answer); // string

console.log(parseInt("F", 16));      // 15
console.log(parseInt("17", 8));      // 15
console.log(parseInt("15", 10));     // 15
console.log(parseInt(15.99, 10));    // 15
console.log(parseInt("FXX123", 16)); // 15
console.log(parseInt("1111", 2));    // 15
console.log(parseInt("15*3", 10));   // 15
console.log(parseInt("12", 13));     // 15
console.log(parseInt("Hello", 8));   // NaN
console.log(parseInt("0x7", 10));    // 0
console.log(parseInt("546", 2));     // NaN

var howMany = 10;
console.log("howMany.toString() is " + howMany.toString()); // "10"
console.log("45 .toString() is " + (45).toString()); // "45"
var x2 = 7;
console.log(x2.toString(2)); // "111"
