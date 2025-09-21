// --- EXPERIENCIA DE PRÁCTICA N° 05: USO DE ARRAYS ---

console.log("--- EXPERIENCIA DE PRÁCTICA N° 05: USO DE ARRAYS ---");

// Función para actualizar el contenido de los divs en la página
function updateOutput(id, content) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = content;
    }
}

function runArrayRoutines() {
    let numericOutput = "<h4>Creación y Manipulación de Arrays Numéricos:</h4>";
    let stringOutput = "<h4>Creación y Manipulación de Arrays de Strings:</h4>";
    let objectOutput = "<h4>Creación y Manipulación de Arrays de Objetos:</h4>";

    // a) CREACIÓN DE ARRAYS

    // 1. Crear 3 arrays diferentes (numérico, strings y objetos) bajo los 3 métodos de creación que existen para los arreglos.

    // --- Arrays Numéricos ---
    console.log("\n--- Arrays Numéricos ---");
    numericOutput += "<p><strong>Creación:</strong></p>";

    // Método 1: Literal de Array
    let numbersLiteral = [10, 20, 30, 40, 50];
    console.log("numbersLiteral (literal):", numbersLiteral);
    numericOutput += `<p>Literal: [${numbersLiteral.join(', ')}]</p>`;

    // Método 2: Constructor Array()
    let numbersConstructor = new Array(60, 70, 80);
    console.log("numbersConstructor (constructor):", numbersConstructor);
    numericOutput += `<p>Constructor: [${numbersConstructor.join(', ')}]</p>`;

    // Método 3: Array.from() o Array.of() (usaremos Array.from para un ejemplo más práctico)
    let numbersFrom = Array.from({ length: 5 }, (_, i) => (i + 1) * 100); // [100, 200, 300, 400, 500]
    console.log("numbersFrom (Array.from):", numbersFrom);
    numericOutput += `<p>Array.from: [${numbersFrom.join(', ')}]</p>`;

    // --- Arrays de Strings ---
    console.log("\n--- Arrays de Strings ---");
    stringOutput += "<p><strong>Creación:</strong></p>";

    // Método 1: Literal de Array
    let fruitsLiteral = ["Manzana", "Banana", "Cereza"];
    console.log("fruitsLiteral (literal):", fruitsLiteral);
    stringOutput += `<p>Literal: [${fruitsLiteral.join(', ')}]</p>`;

    // Método 2: Constructor Array()
    let colorsConstructor = new Array("Rojo", "Verde", "Azul");
    console.log("colorsConstructor (constructor):", colorsConstructor);
    stringOutput += `<p>Constructor: [${colorsConstructor.join(', ')}]</p>`;

    // Método 3: Array.of()
    let animalsOf = Array.of("Perro", "Gato", "Pájaro");
    console.log("animalsOf (Array.of):", animalsOf);
    stringOutput += `<p>Array.of: [${animalsOf.join(', ')}]</p>`;

    // --- Arrays de Objetos ---
    console.log("\n--- Arrays de Objetos ---");
    objectOutput += "<p><strong>Creación:</strong></p>";

    // Método 1: Literal de Array
    let usersLiteral = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ];
    console.log("usersLiteral (literal):", usersLiteral);
    objectOutput += `<p>Literal: ${JSON.stringify(usersLiteral)}</p>`;

    // Método 2: Constructor Array() (con objetos predefinidos)
    let productsConstructor = new Array(
        { code: "A1", item: "Laptop" },
        { code: "B2", item: "Mouse" }
    );
    console.log("productsConstructor (constructor):", productsConstructor);
    objectOutput += `<p>Constructor: ${JSON.stringify(productsConstructor)}</p>`;

    // Método 3: Array.from() (para generar objetos)
    let tasksFrom = Array.from({ length: 3 }, (_, i) => ({ taskId: i + 1, description: `Tarea ${i + 1}` }));
    console.log("tasksFrom (Array.from):", tasksFrom);
    objectOutput += `<p>Array.from: ${JSON.stringify(tasksFrom)}</p>`;


    // 2. Hacer rutinas para el ingreso de datos a los 3 arreglos.
    console.log("\n--- Ingreso de Datos (simulado) ---");
    numericOutput += "<p><strong>Ingreso de Datos (simulado):</strong></p>";
    stringOutput += "<p><strong>Ingreso de Datos (simulado):</strong></p>";
    objectOutput += "<p><strong>Ingreso de Datos (simulado):</strong></p>";

    // Ingreso a numbersLiteral
    numbersLiteral.push(60);
    console.log("numbersLiteral después de push:", numbersLiteral);
    numericOutput += `<p>numbersLiteral.push(60): [${numbersLiteral.join(', ')}]</p>`;

    // Ingreso a fruitsLiteral
    fruitsLiteral.unshift("Naranja");
    console.log("fruitsLiteral después de unshift:", fruitsLiteral);
    stringOutput += `<p>fruitsLiteral.unshift("Naranja"): [${fruitsLiteral.join(', ')}]</p>`;

    // Ingreso a usersLiteral
    usersLiteral.push({ id: 3, name: "Charlie" });
    console.log("usersLiteral después de push:", usersLiteral);
    objectOutput += `<p>usersLiteral.push({ id: 3, name: "Charlie" }): ${JSON.stringify(usersLiteral)}</p>`;


    // b) MANIPULACIÓN DE ARRAYS

    console.log("\n--- Manipulación de Arrays ---");
    numericOutput += "<p><strong>Manipulación:</strong></p>";
    stringOutput += "<p><strong>Manipulación:</strong></p>";
    objectOutput += "<p><strong>Manipulación:</strong></p>";

    // --- Manipulación de Arrays Numéricos ---
    // Acceder a un elemento
    let firstNum = numbersLiteral[0];
    console.log("Primer número de numbersLiteral:", firstNum);
    numericOutput += `<p>Primer elemento de numbersLiteral: ${firstNum}</p>`;

    // Eliminar el último elemento
    let lastNumRemoved = numbersLiteral.pop();
    console.log("numbersLiteral después de pop:", numbersLiteral, "Elemento eliminado:", lastNumRemoved);
    numericOutput += `<p>numbersLiteral.pop(): [${numbersLiteral.join(', ')}] (eliminado: ${lastNumRemoved})</p>`;

    // Eliminar el primer elemento
    let firstNumRemoved = numbersLiteral.shift();
    console.log("numbersLiteral después de shift:", numbersLiteral, "Elemento eliminado:", firstNumRemoved);
    numericOutput += `<p>numbersLiteral.shift(): [${numbersLiteral.join(', ')}] (eliminado: ${firstNumRemoved})</p>`;

    // Encontrar el índice de un elemento
    let index20 = numbersLiteral.indexOf(20);
    console.log("Índice de 20 en numbersLiteral:", index20);
    numericOutput += `<p>Índice de 20 en numbersLiteral: ${index20}</p>`;

    // Concatenar arrays
    let combinedNumbers = numbersLiteral.concat(numbersConstructor);
    console.log("Arrays numéricos combinados:", combinedNumbers);
    numericOutput += `<p>Arrays numéricos combinados: [${combinedNumbers.join(', ')}]</p>`;

    // Slice (copiar una porción)
    let slicedNumbers = combinedNumbers.slice(1, 3); // Elementos en índice 1 y 2
    console.log("Números rebanados (slice):", slicedNumbers);
    numericOutput += `<p>Números rebanados (slice(1,3)): [${slicedNumbers.join(', ')}]</p>`;

    // Splice (cambiar contenido de un array)
    let splicedNumbers = [...combinedNumbers]; // Crear una copia para no modificar el original
    splicedNumbers.splice(1, 1, 25, 35); // Elimina 1 elemento desde el índice 1, añade 25 y 35
    console.log("Números con splice:", splicedNumbers);
    numericOutput += `<p>Números con splice (1, 1, 25, 35): [${splicedNumbers.join(', ')}]</p>`;


    // --- Manipulación de Arrays de Strings ---
    // Acceder a un elemento
    let secondFruit = fruitsLiteral[1];
    console.log("Segundo elemento de fruitsLiteral:", secondFruit);
    stringOutput += `<p>Segundo elemento de fruitsLiteral: ${secondFruit}</p>`;

    // Eliminar un elemento por índice (splice)
    let removedFruit = fruitsLiteral.splice(1, 1); // Elimina "Banana"
    console.log("fruitsLiteral después de splice:", fruitsLiteral, "Elemento eliminado:", removedFruit);
    stringOutput += `<p>fruitsLiteral.splice(1, 1): [${fruitsLiteral.join(', ')}] (eliminado: ${removedFruit})</p>`;

    // Unir elementos en un string
    let fruitsString = fruitsLiteral.join(" - ");
    console.log("Fruits unidos:", fruitsString);
    stringOutput += `<p>fruitsLiteral.join(' - '): "${fruitsString}"</p>`;

    // Invertir el orden
    let reversedColors = [...colorsConstructor].reverse(); // Copia para no modificar el original
    console.log("Colores invertidos:", reversedColors);
    stringOutput += `<p>colorsConstructor.reverse(): [${reversedColors.join(', ')}]</p>`;

    // Ordenar alfabéticamente
    let sortedAnimals = [...animalsOf].sort(); // Copia para no modificar el original
    console.log("Animales ordenados:", sortedAnimals);
    stringOutput += `<p>animalsOf.sort(): [${sortedAnimals.join(', ')}]</p>`;


    // --- Manipulación de Arrays de Objetos ---
    // Acceder a un objeto y su propiedad
    let firstUser = usersLiteral[0];
    console.log("Primer usuario:", firstUser.name);
    objectOutput += `<p>Primer usuario (usersLiteral[0].name): ${firstUser.name}</p>`;

    // Encontrar un objeto por propiedad (find)
    let foundProduct = productsConstructor.find(p => p.code === "B2");
    console.log("Producto encontrado (code B2):", foundProduct);
    objectOutput += `<p>Producto encontrado (code B2): ${JSON.stringify(foundProduct)}</p>`;

    // Eliminar un objeto (filtrando)
    let filteredUsers = usersLiteral.filter(user => user.id !== 2);
    console.log("usersLiteral después de filtrar (sin id 2):", filteredUsers);
    objectOutput += `<p>usersLiteral.filter(id !== 2): ${JSON.stringify(filteredUsers)}</p>`;

    // Modificar una propiedad de un objeto dentro del array
    tasksFrom[0].description = "Tarea 1 Completada";
    console.log("tasksFrom después de modificar tarea 1:", tasksFrom);
    objectOutput += `<p>tasksFrom[0].description = "Tarea 1 Completada": ${JSON.stringify(tasksFrom)}</p>`;


    // c) USO DE ITERADORES DE ARRAYS

    console.log("\n--- Iteradores de Arrays ---");
    numericOutput += "<p><strong>Iteradores:</strong></p>";
    stringOutput += "<p><strong>Iteradores:</strong></p>";
    objectOutput += "<p><strong>Iteradores:</strong></p>";

    // --- Iteradores para Arrays Numéricos ---
    numericOutput += `<p><strong>forEach (numbersLiteral):</strong></p><ul>`;
    console.log("forEach (numbersLiteral):");
    numbersLiteral.forEach((num, index) => {
        console.log(`Índice: ${index}, Valor: ${num}`);
        numericOutput += `<li>Índice: ${index}, Valor: ${num}</li>`;
    });
    numericOutput += `</ul>`;

    numericOutput += `<p><strong>map (numbersLiteral * 2):</strong></p>`;
    let doubledNumbers = numbersLiteral.map(num => num * 2);
    console.log("map (numbersLiteral * 2):", doubledNumbers);
    numericOutput += `<p>[${doubledNumbers.join(', ')}]</p>`;

    numericOutput += `<p><strong>filter (numbersLiteral > 30):</strong></p>`;
    let filteredLargeNumbers = numbersLiteral.filter(num => num > 30);
    console.log("filter (numbersLiteral > 30):", filteredLargeNumbers);
    numericOutput += `<p>[${filteredLargeNumbers.join(', ')}]</p>`;

    numericOutput += `<p><strong>reduce (sum of numbersLiteral):</strong></p>`;
    let sumNumbers = numbersLiteral.reduce((acc, curr) => acc + curr, 0);
    console.log("reduce (sum of numbersLiteral):", sumNumbers);
    numericOutput += `<p>Suma: ${sumNumbers}</p>`;

    // --- Iteradores para Arrays de Strings ---
    stringOutput += `<p><strong>for...of (fruitsLiteral):</strong></p><ul>`;
    console.log("for...of (fruitsLiteral):");
    for (const fruit of fruitsLiteral) {
        console.log(`Fruta: ${fruit}`);
        stringOutput += `<li>Fruta: ${fruit}</li>`;
    }
    stringOutput += `</ul>`;

    stringOutput += `<p><strong>map (fruitsLiteral a mayúsculas):</strong></p>`;
    let upperCaseFruits = fruitsLiteral.map(fruit => fruit.toUpperCase());
    console.log("map (fruitsLiteral a mayúsculas):", upperCaseFruits);
    stringOutput += `<p>[${upperCaseFruits.join(', ')}]</p>`;

    stringOutput += `<p><strong>filter (fruitsLiteral con 'a'):</strong></p>`;
    let fruitsWithA = fruitsLiteral.filter(fruit => fruit.includes('a') || fruit.includes('A'));
    console.log("filter (fruitsLiteral con 'a'):", fruitsWithA);
    stringOutput += `<p>[${fruitsWithA.join(', ')}]</p>`;

    // --- Iteradores para Arrays de Objetos ---
    objectOutput += `<p><strong>forEach (usersLiteral):</strong></p><ul>`;
    console.log("forEach (usersLiteral):");
    usersLiteral.forEach(user => {
        console.log(`Usuario ID: ${user.id}, Nombre: ${user.name}`);
        objectOutput += `<li>ID: ${user.id}, Nombre: ${user.name}</li>`;
    });
    objectOutput += `</ul>`;

    objectOutput += `<p><strong>map (productsConstructor a solo nombres):</strong></p>`;
    let productNames = productsConstructor.map(product => product.item);
    console.log("map (productsConstructor a solo nombres):", productNames);
    objectOutput += `<p>[${productNames.join(', ')}]</p>`;

    objectOutput += `<p><strong>filter (tasksFrom con taskId > 1):</strong></p>`;
    let importantTasks = tasksFrom.filter(task => task.taskId > 1);
    console.log("filter (tasksFrom con taskId > 1):", importantTasks);
    objectOutput += `<p>${JSON.stringify(importantTasks)}</p>`;

    objectOutput += `<p><strong>find (tasksFrom con taskId 3):</strong></p>`;
    let task3 = tasksFrom.find(task => task.taskId === 3);
    console.log("find (tasksFrom con taskId 3):", task3);
    objectOutput += `<p>${JSON.stringify(task3)}</p>`;


    // Actualizar el DOM con los resultados
    updateOutput('numeric-array-output', numericOutput);
    updateOutput('string-array-output', stringOutput);
    updateOutput('object-array-output', objectOutput);

    console.log("\n--- Fin de la Experiencia de Práctica N° 05 ---");
}

// Ejecutar las rutinas al cargar la página o al hacer clic en el botón
document.addEventListener('DOMContentLoaded', runArrayRoutines);