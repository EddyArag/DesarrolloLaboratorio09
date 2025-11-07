// Importando paquete Express
var express = require('express'); 

// Creando aplicación en Express
var app = express(); 

// Creando manejadores de rutas

// 1) Ruta principal ('/')
app.get('/', function(req, res) {
  res.send('Hola mundo desde Express');
});

// 2) Ruta de login ('/login')
app.get('/login', function(req, res) {
  res.send('Aqui se mostraria la pagina del login'); 
});

// El servidor de escucha que desplegará mi ruta HTTP
app.listen(3000, function() {
  // Nota: La guía original tenía un error de sintaxis en el callback de listen, 
  // aquí está corregido y usando el puerto 3000
  console.log('La aplicación está funcionando en el puerto 3000'); 
});