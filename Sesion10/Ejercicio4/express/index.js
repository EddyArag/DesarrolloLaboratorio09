var express = require('express');
var app = express();

app.use(express.static(__dirname)); // permite servir index.html e imágenes

var bicicletas = [
    { id: 1, modelo: "Mountain Pro X", precio: 850, oferta: false },
    { id: 2, modelo: "Speed Road 3000", precio: 1200, oferta: true },
    { id: 3, modelo: "EcoBike City", precio: 680, oferta: false },
    { id: 4, modelo: "TrailMaster 500", precio: 950, oferta: true }
];

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/bicicletas.html");
});

app.get('/bicicletas', function(req, res) {
    res.json(bicicletas);
});

app.get('/bicicletas/:id', function(req, res) {
    var id = parseInt(req.params.id);
    var bici = bicicletas.find(b => b.id === id);

    if (bici) {
        res.json(bici);
    } else {
        res.status(404).send("Bicicleta no encontrada");
    }
});

app.get('/ofertas', function(req, res) {
    res.json(bicicletas.filter(b => b.oferta));
});

app.get('/contacto', function(req, res) {
    res.send("Página de contacto de la tienda de bicicletas");
});

app.listen(3000, function() {
    console.log("Servidor Express funcionando en http://localhost:3000");
});