// --- EXPERIENCIA DE PRÁCTICA N° 06: USO DE OBJETOS GLOBALES ---

console.log("--- EXPERIENCIA DE PRÁCTICA N° 06: USO DE OBJETOS GLOBALES ---");

// Función auxiliar para actualizar el contenido de los divs en la página
function updateOutput(id, content) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = content;
    }
}

// a) USO DE OBJETO WINDOW
function exploreWindowObject() {
    let output = "<h4>Propiedades y Métodos del Objeto Window:</h4>";
    console.log("\n--- Explorando el Objeto Window ---");

    // 1. Visualizar algunas propiedades del objeto Window
    output += `<p><strong>Algunas Propiedades:</strong></p><ul>`;
    output += `<li><code>window.innerWidth</code>: ${window.innerWidth}px (Ancho del viewport)</li>`;
    output += `<li><code>window.innerHeight</code>: ${window.innerHeight}px (Alto del viewport)</li>`;
    output += `<li><code>window.location.href</code>: ${window.location.href} (URL actual)</li>`;
    output += `<li><code>window.navigator.userAgent</code>: ${window.navigator.userAgent} (Agente de usuario)</li>`;
    output += `<li><code>window.document.title</code>: ${window.document.title} (Título del documento)</li>`;
    output += `<li><code>window.screen.width</code>: ${window.screen.width}px (Ancho de la pantalla)</li>`;
    output += `<li><code>window.screen.height</code>: ${window.screen.height}px (Alto de la pantalla)</li>`;
    output += `</ul>`;

    console.log("window.innerWidth:", window.innerWidth);
    console.log("window.location.href:", window.location.href);
    console.log("window.navigator.userAgent:", window.navigator.userAgent);

    // 2. Agregar el uso de algunos métodos del objeto Window
    output += `<p><strong>Algunos Métodos:</strong></p><ul>`;

    // window.alert() - Ya lo conocemos, pero lo mencionamos
    // alert("¡Hola desde window.alert()!"); // Descomentar para probar el alert

    // window.confirm()
    const userConfirmed = window.confirm("¿Deseas continuar con la demostración de window.confirm()?");
    output += `<li><code>window.confirm()</code>: El usuario ${userConfirmed ? 'confirmó' : 'canceló'}.</li>`;
    console.log("window.confirm() resultado:", userConfirmed);

    // window.prompt()
    const userName = window.prompt("Por favor, ingresa tu nombre para window.prompt():", "Invitado");
    output += `<li><code>window.prompt()</code>: Nombre ingresado: "${userName || 'Ninguno'}"</li>`;
    console.log("window.prompt() nombre:", userName);

    // window.setTimeout()
    output += `<li><code>window.setTimeout()</code>: Se ejecutará un console.log en 2 segundos.</li>`;
    setTimeout(() => {
        console.log("Mensaje de setTimeout después de 2 segundos.");
        // Puedes actualizar el DOM aquí también si quieres mostrar el mensaje en la página
    }, 2000);

    // window.open() - Abre una nueva ventana/pestaña (puede ser bloqueado por el navegador)
    // const newWindow = window.open("https://www.google.com", "_blank", "width=600,height=400");
    // if (newWindow) {
    //     output += `<li><code>window.open()</code>: Se intentó abrir una nueva ventana a Google.</li>`;
    // } else {
    //     output += `<li><code>window.open()</code>: El navegador bloqueó la apertura de la nueva ventana.</li>`;
    // }

    output += `</ul>`;

    updateOutput('window-output', output);
}

// b) USO DEL OBJETO ARRAY
function exploreArrayObject() {
    let output = "<h4>Propiedades y Métodos del Objeto Global Array:</h4>";
    console.log("\n--- Explorando el Objeto Global Array ---");

    // 1. Visualizar algunas propiedades del objeto Array
    output += `<p><strong>Propiedades Estáticas:</strong></p><ul>`;
    output += `<li><code>Array.prototype</code>: Es el objeto prototipo del constructor Array.</li>`;
    output += `<li><code>Array.length</code>: ${Array.length} (Siempre 1 para el constructor Array)</li>`;
    output += `</ul>`;
    console.log("Array.prototype:", Array.prototype);
    console.log("Array.length:", Array.length);

    // 2. Agregar el uso de algunos métodos del objeto Array (estáticos y de instancia)
    output += `<p><strong>Métodos Estáticos:</strong></p><ul>`;

    // Array.isArray()
    const isArr = Array.isArray([1, 2, 3]);
    const isNotArr = Array.isArray({});
    output += `<li><code>Array.isArray([1,2,3])</code>: ${isArr}</li>`;
    output += `<li><code>Array.isArray({})</code>: ${isNotArr}</li>`;
    console.log("Array.isArray([1,2,3]):", isArr);
    console.log("Array.isArray({}):", isNotArr);

    // Array.from()
    const newArrayFrom = Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']
    output += `<li><code>Array.from("hello")</code>: [${newArrayFrom.join(', ')}]</li>`;
    console.log("Array.from('hello'):", newArrayFrom);

    // Array.of()
    const newArrayOf = Array.of(1, 2, 3, "cuatro"); // [1, 2, 3, "cuatro"]
    output += `<li><code>Array.of(1,2,3,"cuatro")</code>: [${newArrayOf.join(', ')}]</li>`;
    console.log("Array.of(1,2,3,'cuatro'):", newArrayOf);

    output += `</ul>`;

    output += `<p><strong>Métodos de Instancia (aplicados a un array):</strong></p><ul>`;
    const myArr = [10, 20, 30, 40];
    output += `<li>Array de ejemplo: <code>[${myArr.join(', ')}]</code></li>`;

    // myArr.push()
    myArr.push(50);
    output += `<li><code>myArr.push(50)</code>: <code>[${myArr.join(', ')}]</code></li>`;
    console.log("myArr.push(50):", myArr);

    // myArr.pop()
    const popped = myArr.pop();
    output += `<li><code>myArr.pop()</code>: <code>[${myArr.join(', ')}]</code> (elemento: ${popped})</li>`;
    console.log("myArr.pop():", myArr, "popped:", popped);

    // myArr.indexOf()
    const index = myArr.indexOf(20);
    output += `<li><code>myArr.indexOf(20)</code>: ${index}</li>`;
    console.log("myArr.indexOf(20):", index);

    // myArr.map()
    const mappedArr = myArr.map(x => x * 2);
    output += `<li><code>myArr.map(x => x * 2)</code>: <code>[${mappedArr.join(', ')}]</code></li>`;
    console.log("myArr.map(x => x * 2):", mappedArr);

    // myArr.filter()
    const filteredArr = myArr.filter(x => x > 20);
    output += `<li><code>myArr.filter(x => x > 20)</code>: <code>[${filteredArr.join(', ')}]</code></li>`;
    console.log("myArr.filter(x => x > 20):", filteredArr);

    output += `</ul>`;

    updateOutput('array-output', output);
}

// c) USO DE OBJETO NUMBER
function exploreNumberObject() {
    let output = "<h4>Propiedades y Métodos del Objeto Global Number:</h4>";
    console.log("\n--- Explorando el Objeto Global Number ---");

    // 1. Visualizar algunas propiedades del objeto Number
    output += `<p><strong>Propiedades Estáticas:</strong></p><ul>`;
    output += `<li><code>Number.MAX_VALUE</code>: ${Number.MAX_VALUE} (Máximo valor representable)</li>`;
    output += `<li><code>Number.MIN_VALUE</code>: ${Number.MIN_VALUE} (Mínimo valor positivo representable)</li>`;
    output += `<li><code>Number.NaN</code>: ${Number.NaN} (Not-a-Number)</li>`;
    output += `<li><code>Number.POSITIVE_INFINITY</code>: ${Number.POSITIVE_INFINITY}</li>`;
    output += `<li><code>Number.NEGATIVE_INFINITY</code>: ${Number.NEGATIVE_INFINITY}</li>`;
    output += `<li><code>Number.EPSILON</code>: ${Number.EPSILON} (Diferencia mínima entre 1 y el siguiente valor flotante)</li>`;
    output += `</ul>`;

    console.log("Number.MAX_VALUE:", Number.MAX_VALUE);
    console.log("Number.MIN_VALUE:", Number.MIN_VALUE);
    console.log("Number.NaN:", Number.NaN);

    // 2. Agregar el uso de algunos métodos del objeto Number (estáticos y de instancia)
    output += `<p><strong>Métodos Estáticos:</strong></p><ul>`;

    // Number.isFinite()
    output += `<li><code>Number.isFinite(123)</code>: ${Number.isFinite(123)}</li>`;
    output += `<li><code>Number.isFinite(Infinity)</code>: ${Number.isFinite(Infinity)}</li>`;
    console.log("Number.isFinite(123):", Number.isFinite(123));
    console.log("Number.isFinite(Infinity):", Number.isFinite(Infinity));

    // Number.isInteger()
    output += `<li><code>Number.isInteger(10)</code>: ${Number.isInteger(10)}</li>`;
    output += `<li><code>Number.isInteger(10.5)</code>: ${Number.isInteger(10.5)}</li>`;
    console.log("Number.isInteger(10):", Number.isInteger(10));
    console.log("Number.isInteger(10.5):", Number.isInteger(10.5));

    // Number.parseFloat()
    output += `<li><code>Number.parseFloat("123.45")</code>: ${Number.parseFloat("123.45")}</li>`;
    output += `<li><code>Number.parseFloat("123.45abc")</code>: ${Number.parseFloat("123.45abc")}</li>`;
    console.log("Number.parseFloat('123.45'):", Number.parseFloat("123.45"));

    // Number.parseInt()
    output += `<li><code>Number.parseInt("123")</code>: ${Number.parseInt("123")}</li>`;
    output += `<li><code>Number.parseInt("123.45")</code>: ${Number.parseInt("123.45")}</li>`;
    output += `<li><code>Number.parseInt("0xFF", 16)</code>: ${Number.parseInt("0xFF", 16)}</li>`;
    console.log("Number.parseInt('123'):", Number.parseInt("123"));
    console.log("Number.parseInt('0xFF', 16):", Number.parseInt("0xFF", 16));

    output += `</ul>`;

    output += `<p><strong>Métodos de Instancia (aplicados a un número):</strong></p><ul>`;
    const myNum = 123.45678;
    output += `<li>Número de ejemplo: <code>${myNum}</code></li>`;

    // myNum.toFixed()
    output += `<li><code>myNum.toFixed(2)</code>: "${myNum.toFixed(2)}" (string)</li>`;
    console.log("myNum.toFixed(2):", myNum.toFixed(2));

    // myNum.toPrecision()
    output += `<li><code>myNum.toPrecision(4)</code>: "${myNum.toPrecision(4)}" (string)</li>`;
    console.log("myNum.toPrecision(4):", myNum.toPrecision(4));

    // myNum.toString()
    output += `<li><code>myNum.toString()</code>: "${myNum.toString()}" (string)</li>`;
    output += `<li><code>(255).toString(16)</code>: "${(255).toString(16)}" (hexadecimal)</li>`;
    console.log("myNum.toString():", myNum.toString());
    console.log("(255).toString(16):", (255).toString(16));

    output += `</ul>`;

    updateOutput('number-output', output);
}

// No ejecutamos las funciones automáticamente al cargar la página para que el usuario
// pueda hacer clic en los botones y ver los resultados de forma interactiva.
// Si quisieras que se ejecuten al cargar, descomenta las siguientes líneas:
// document.addEventListener('DOMContentLoaded', () => {
//     exploreWindowObject();
//     exploreArrayObject();
//     exploreNumberObject();
// });