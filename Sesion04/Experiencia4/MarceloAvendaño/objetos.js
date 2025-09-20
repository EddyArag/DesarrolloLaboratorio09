// a) CREACIÓN DE OBJETOS

// 1. Usando iniciadores de objetos
const objetoIniciador = {
    nombre: "Objeto Iniciador",
    tipo: "Ejemplo",
    saludar: function() {
        console.log(`Hola, soy ${this.nombre} y soy un ${this.tipo}.`);
    }
};
objetoIniciador.saludar();

// 2. Usando métodos constructores
function ObjetoConstructor(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.saludar = function() {
        console.log(`Hola, soy ${this.nombre} y soy un ${this.tipo}.`);
    };
}
const objetoConstructor = new ObjetoConstructor("Objeto Constructor", "Ejemplo");
objetoConstructor.saludar();

// 3. Usando Object.create()
const prototipo = {
    saludar: function() {
        console.log(`Hola, soy ${this.nombre} y soy un ${this.tipo}.`);
    }
};
const objetoCreado = Object.create(prototipo);
objetoCreado.nombre = "Objeto Creado";
objetoCreado.tipo = "Ejemplo";
objetoCreado.saludar();

// b) AGREGANDO PROPIEDADES A LOS OBJETOS

// 1. Agregando propiedades usando iniciadores de objetos
objetoIniciador.nuevaPropiedad = "Propiedad añadida";
console.log(objetoIniciador.nuevaPropiedad);

// 2. Agregando propiedades usando métodos constructores
objetoConstructor.nuevaPropiedad = "Propiedad añadida";
console.log(objetoConstructor.nuevaPropiedad);

// 3. Agregando propiedades usando Object.create()
objetoCreado.nuevaPropiedad = "Propiedad añadida";
console.log(objetoCreado.nuevaPropiedad);
