// a) CIUDADANO DE PRIMERA CLASE

// Código 1
const foo = () => {
    console.log("foobar");
};
foo(); // Invoke it using the variable
// Descripción: En este caso, `foo` es una función almacenada en una variable. Esto demuestra que las funciones en JavaScript son ciudadanos de primera clase, ya que pueden ser asignadas a variables.

// Código 2
function sayHello() {
    return "Hello, ";
}
function greeting(helloMessage, name) {
    console.log(helloMessage() + name);
}
greeting(sayHello, "JavaScript!");
// Descripción: Aquí, la función `sayHello` se pasa como argumento a otra función `greeting`. Esto demuestra que las funciones pueden ser tratadas como valores y pasadas como parámetros.

// Código 3
function sayHello() {
    return () => {
        console.log("Hello!");
    };
}
const helloFunc = sayHello();
helloFunc();
// Descripción: En este caso, `sayHello` devuelve otra función. Esto demuestra que las funciones pueden ser retornadas como valores.

// Condiciones para ser una función de primera clase:
// 1. Puede ser asignada a una variable.
// 2. Puede ser pasada como argumento a otra función.
// 3. Puede ser retornada desde otra función.

// b) CLOSURE
function makeFunc() {
    const name = 'Mozilla';
    function displayName() {
        console.log(name);
    }
    return displayName;
}
const myFunc = makeFunc();
myFunc();
// Descripción: Un closure es una función que recuerda el ámbito en el que fue creada. En este caso, `displayName` recuerda la variable `name` incluso después de que `makeFunc` haya terminado de ejecutarse.

// Condiciones para un closure:
// 1. Debe haber una función anidada.
// 2. La función anidada debe acceder a variables de su función contenedora.
// 3. La función contenedora debe retornar la función anidada.

// c) ÁMBITO DE FUNCIÓN

// Código 1
function exampleFunction() {
    const x = "declared inside function"; // x can only be used in exampleFunction
    console.log("Inside function");
    console.log(x);
}
exampleFunction();
// console.log(x); // Error: x is not defined
// Descripción: Las variables declaradas dentro de una función tienen un ámbito local y no son accesibles fuera de la función.

// Código 2
const x = "declared outside function";
exampleFunction();
function exampleFunction() {
    console.log("Inside function");
    console.log(x);
}
console.log("Outside function");
console.log(x);
// Descripción: En este caso, la variable `x` tiene un ámbito global y es accesible tanto dentro como fuera de la función.

// Código 3
function f() {
    try {
        console.log(0);
        throw 'bogus';
    } catch (e) {
        console.log(1);
        return true; // this return statement is suspended
        console.log(2); // not reachable
    } finally {
        console.log(3);
        return false; // overwrites the previous "return"
        console.log(4); // not reachable
    }
    console.log(5); // not reachable
}
console.log(f()); // 0, 1, 3, false
// Descripción: El bloque `finally` siempre se ejecuta después de un `try` y `catch`. Si hay un `return` en el bloque `finally`, sobrescribe cualquier `return` anterior.

// d) MANEJO DE EXCEPCIONES
function UserException(message) {
    this.message = message;
    this.name = 'UserException';
}
function getMonthName(mo) {
    mo--; // Adjust month number for array index (1 = Jan, 12 = Dec)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (months[mo] !== undefined) {
        return months[mo];
    } else {
        throw new UserException('InvalidMonthNo');
    }
}
let monthName;
try {
    // statements to try
    const myMonth = 15; // 15 is out of bound to raise the exception
    monthName = getMonthName(myMonth);
} catch (e) {
    monthName = 'unknown';
    console.error(e.message, e.name); // pass exception object to err handler
}
// Descripción: Este código demuestra cómo manejar excepciones personalizadas en JavaScript. Si se lanza una excepción, el bloque `catch` la captura y maneja el error.
