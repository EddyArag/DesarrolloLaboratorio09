// usoRutas.js

// Importando paquete Express
var express = require('express'); // [cite: 358]

// creando aplicación en Express
var app = express(); // [cite: 360]

// invocando archivo que maneja rutas
var rutas = require('./rutas.js');
app.use('/', rutas); // Aplica todas las rutas definidas en 'rutas.js' a la raíz ('/') [cite: 362]

// El servidor de escucha que desplegará mi ruta HTTP
app.listen(3000, function(){
    console.log('La aplicación está funcionando en el puerto 3000'); // [cite: 363, 365]
});