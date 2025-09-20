// b) ELEVACIÓN DE VARIABLES
console.log(x === undefined); // true
var x = 3;

var myvar = 'my value';
(function() {
    console.log(myvar); // undefined
    var myvar = 'valor local';
})();

// Descripción:
// El hoisting ocurre porque las declaraciones de variables (var) se 
// "elevan" al inicio del contexto de ejecución.
// Sin embargo, solo la declaración se eleva, no la inicialización. 
// Por eso, `x` y `myvar` son undefined antes de su asignación.
