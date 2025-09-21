// --- EXPERIENCIA DE PRÁCTICA N° 04: USO DE OBJETOS ---

console.log("--- EXPERIENCIA DE PRÁCTICA N° 04: USO DE OBJETOS ---");

// a) CREACIÓN DE OBJETOS

// 1. Agregar objetos a su proyecto utilizando iniciadores de objetos (Object Literal).
console.log("\n--- Creación de Objetos: Iniciadores de Objetos ---");
const car1 = {
    make: 'Ford',
    model: 'Mustang',
    year: 1969
};
console.log("Objeto car1 (literal):", car1);

const person1 = {
    firstName: 'Alice',
    lastName: 'Smith',
    age: 30,
    isStudent: false
};
console.log("Objeto person1 (literal):", person1);

// 2. Agregar objetos a su proyecto utilizando métodos constructores.
console.log("\n--- Creación de Objetos: Métodos Constructores ---");

// Función Constructora
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.start = function() {
        console.log(`${this.make} ${this.model} arrancó.`);
    };
}

const car2 = new Car('Honda', 'Civic', 2020);
console.log("Objeto car2 (constructor):", car2);
car2.start();

function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.greet = function() {
        console.log(`Hola, soy ${this.firstName} ${this.lastName}.`);
    };
}

const person2 = new Person('Bob', 'Johnson', 25);
console.log("Objeto person2 (constructor):", person2);
person2.greet();

// 3. Agregar objetos a su proyecto utilizando el método Object.create().
console.log("\n--- Creación de Objetos: Object.create() ---");

// Objeto prototipo para coches
const carPrototype = {
    wheels: 4,
    drive: function() {
        console.log(`Conduciendo el ${this.make} ${this.model}.`);
    }
};

const car3 = Object.create(carPrototype);
car3.make = 'Tesla';
car3.model = 'Model 3';
car3.year = 2023;
console.log("Objeto car3 (Object.create()):", car3);
car3.drive();
console.log("car3 tiene propiedad 'wheels' heredada:", car3.wheels);

// Objeto prototipo para personas
const personPrototype = {
    species: 'Homo Sapiens',
    introduce: function() {
        console.log(`Mi nombre es ${this.firstName} ${this.lastName} y soy un ${this.species}.`);
    }
};

const person3 = Object.create(personPrototype);
person3.firstName = 'Charlie';
person3.lastName = 'Brown';
person3.age = 8;
console.log("Objeto person3 (Object.create()):", person3);
person3.introduce();
console.log("person3 tiene propiedad 'species' heredada:", person3.species);


// b) AGREGANDO PROPIEDADES A LOS OBJETOS

// 1. Agregar propiedades a los objetos creados con iniciadores de objetos.
console.log("\n--- Agregando Propiedades: Iniciadores de Objetos ---");
console.log("Objeto car1 antes de agregar propiedad:", car1);
car1.color = 'Red'; // Agregando una nueva propiedad
car1.year = 1970;   // Modificando una propiedad existente
console.log("Objeto car1 después de agregar/modificar:", car1);

console.log("Objeto person1 antes de agregar propiedad:", person1);
person1.email = 'alice.s@example.com';
person1.isStudent = true;
console.log("Objeto person1 después de agregar/modificar:", person1);

// 2. Agregar propiedades a los objetos creados con métodos constructores.
console.log("\n--- Agregando Propiedades: Métodos Constructores ---");
console.log("Objeto car2 antes de agregar propiedad:", car2);
car2.transmission = 'Automatic';
car2.year = 2021;
car2.stop = function() { // Agregando un nuevo método
    console.log(`${this.make} ${this.model} se detuvo.`);
};
console.log("Objeto car2 después de agregar/modificar:", car2);
car2.stop();

console.log("Objeto person2 antes de agregar propiedad:", person2);
person2.city = 'New York';
person2.age = 26;
person2.sayGoodbye = function() { // Agregando un nuevo método
    console.log(`Adiós de ${this.firstName}.`);
};
console.log("Objeto person2 después de agregar/modificar:", person2);
person2.sayGoodbye();

// 3. Agregar propiedades a los objetos creados con Object.create().
console.log("\n--- Agregando Propiedades: Object.create() ---");
console.log("Objeto car3 antes de agregar propiedad:", car3);
car3.fuelType = 'Electric';
car3.year = 2024;
car3.charge = function() { // Agregando un nuevo método
    console.log(`${this.make} ${this.model} se está cargando.`);
};
console.log("Objeto car3 después de agregar/modificar:", car3);
car3.charge();

console.log("Objeto person3 antes de agregar propiedad:", person3);
person3.hobby = 'Drawing';
person3.age = 9;
person3.play = function() { // Agregando un nuevo método
    console.log(`${this.firstName} está jugando.`);
};
console.log("Objeto person3 después de agregar/modificar:", person3);
person3.play();

// Demostración de eliminación de propiedades (opcional, pero útil)
console.log("\n--- Demostración de Eliminación de Propiedades ---");
console.log("Objeto car1 antes de eliminar 'model':", car1);
delete car1.model;
console.log("Objeto car1 después de eliminar 'model':", car1);

console.log("Objeto person2 antes de eliminar 'city':", person2);
delete person2.city;
console.log("Objeto person2 después de eliminar 'city':", person2);

console.log("\n--- Fin de la Experiencia de Práctica N° 04 ---");