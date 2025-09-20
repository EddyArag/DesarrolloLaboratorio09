// d) USO DE TIPOS DE DATOS Y CAMBIO DE TIPOS DE DATOS

// Cambiar el tipo de dato de una variable
var answer = 42;
answer = 'Gracias por todo el pescado...';
// Descripción: En JavaScript, las variables son de tipo dinámico, lo que significa que pueden cambiar su tipo de dato en tiempo de ejecución.

// Uso de parseInt
console.log(parseInt("F", 16));
console.log(parseInt("17", 8));
console.log(parseInt("15", 10));
console.log(parseInt(15.99, 10));
console.log(parseInt("FXX123", 16));
console.log(parseInt("1111", 2));
console.log(parseInt("15*3", 10));
console.log(parseInt("12", 13));
console.log(parseInt("Hello", 8)); // NaN
console.log(parseInt("0x7", 10)); // NaN
console.log(parseInt("546", 2)); // NaN
// Descripción: parseInt convierte cadenas a enteros según la base especificada. Si la cadena no es válida para la base, devuelve NaN.

// Uso de toString
var howMany = 10;
alert("howMany.toString() is " + howMany.toString()); // "10"
alert("45 .toString() is " + 45 .toString()); // "45"
var x = 7;
alert(x.toString(2)); // "111"
// Descripción: El método toString convierte un número a su representación en cadena. Puede especificar una base para la conversión.
