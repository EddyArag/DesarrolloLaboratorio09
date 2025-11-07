// ejemploMiddleware.js

// Importando paquete express
var express = require('express');

// creando objeto express
var app = express();

// creando el middleware
const middleware = function (req, res, next) {
    console.log('ejecutando el middleware mientras llega petición');
    next(); // Llama a la siguiente función middleware o al manejador de ruta
};

// invocando el middleware para que se ejecute en TODAS las peticiones
app.use(middleware);

// configurando manejador de rutas (Esta es la función final)
app.get('/', function (req, res) {
    res.send('Llegó petición al servidor');
});

// levantando servidor
app.listen(3000, function(){
    console.log('servidor en escucha');
});