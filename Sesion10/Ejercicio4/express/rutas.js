// rutas.js

// creando gestionador de rutas
var express = require('express');
var router = express.Router(); // Crea una instancia de Router para manejar las rutas

// Creando manejadores de rutas
router.get('/', function(req, res) {
    res.send('Pagina principal');
}); // [cite: 346, 347]

router.get('/login', function (req, res) {
    res.send('Inicia sesion');
}); // [cite: 348, 349]

router.get('/productos', function (req, res) {
    res.send('catalogo de productos');
}); // [cite: 350, 351]

router.get('/productos/compra', function (req, res) {
    res.send('Aqui puedes comprar tus productos');
}); // [cite: 352, 353]

// Exporta el objeto router para que sea accesible desde otros archivos
module.exports = router; // [cite: 354, 355]