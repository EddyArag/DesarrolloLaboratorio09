// a) USO DE OBJETO WINDOW

function visualizarWindow() {
    console.log("Propiedades del objeto Window:", Object.keys(window));

    // Uso de algunos métodos del objeto Window
    console.log("Altura de la ventana:", window.innerHeight);
    console.log("Anchura de la ventana:", window.innerWidth);
    alert("Este es un ejemplo de uso del objeto Window");
}
visualizarWindow();

// b) USO DEL OBJETO ARRAY

function visualizarArray() {
    console.log("Propiedades del objeto Array:", Object.getOwnPropertyNames(Array.prototype));

    // Uso de algunos métodos del objeto Array
    const ejemploArray = [1, 2, 3, 4, 5];
    console.log("Array original:", ejemploArray);
    console.log("Array invertido:", ejemploArray.reverse());
    console.log("Array con elementos duplicados:", ejemploArray.map(x => x * 2));
}
visualizarArray();

// c) USO DE OBJETO NUMBER

function visualizarNumber() {
    console.log("Propiedades del objeto Number:", Object.getOwnPropertyNames(Number));

    // Uso de algunos métodos del objeto Number
    console.log("Número máximo representable:", Number.MAX_VALUE);
    console.log("Número mínimo representable:", Number.MIN_VALUE);
    console.log("¿Es finito 123?", Number.isFinite(123));
    console.log("¿Es NaN 'texto'?", Number.isNaN("texto"));
}
visualizarNumber();
