// a) CREACIÓN DE ARRAYS

// 1. Crear 3 arrays diferentes (numérico, strings y objetos) bajo los 3 métodos de creación
const numeros = [1, 2, 3, 4, 5]; // Método literal
const cadenas = new Array("uno", "dos", "tres"); // Constructor
const objetos = Array.of({ id: 1 }, { id: 2 }, { id: 3 }); // Array.of

// 2. Rutinas para el ingreso de datos a los 3 arreglos
numeros.push(6);
cadenas.push("cuatro");
objetos.push({ id: 4 });

console.log("Numeros:", numeros);
console.log("Cadenas:", cadenas);
console.log("Objetos:", objetos);

// b) MANIPULACIÓN DE ARRAYS

// Métodos comunes
numeros.pop(); // Elimina el último elemento
cadenas.shift(); // Elimina el primer elemento
objetos.unshift({ id: 0 }); // Agrega al inicio

console.log("Numeros después de manipulación:", numeros);
console.log("Cadenas después de manipulación:", cadenas);
console.log("Objetos después de manipulación:", objetos);

// c) USO DE ITERADORES DE ARRAYS

// Iteradores
numeros.forEach((num) => console.log("Número:", num));
const cadenasMayusculas = cadenas.map((cadena) => cadena.toUpperCase());
const objetosFiltrados = objetos.filter((obj) => obj.id > 1);

console.log("Cadenas en mayúsculas:", cadenasMayusculas);
console.log("Objetos filtrados:", objetosFiltrados);
