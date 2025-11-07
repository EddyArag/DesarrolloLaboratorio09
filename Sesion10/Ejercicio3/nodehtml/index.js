var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res) {

    // Si pide una imagen o archivo dentro de /img
    if (req.url.startsWith("/img/")) {
        var filePath = "." + req.url; // "./img/gtav.jpg"
        var ext = path.extname(filePath).toLowerCase();

        // Tipos MIME básicos
        var mimeTypes = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png"
        };

        fs.readFile(filePath, function(err, data) {
            if (err) {
                res.writeHead(404);
                res.end("Imagen no encontrada");
            } else {
                res.writeHead(200, {"Content-Type": mimeTypes[ext]});
                res.end(data);
            }
        });
        return; // <- importante, para que no siga a index.html
    }

    // Si no es imagen, devolver el HTML
    fs.readFile("./index.html", function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });

});

server.listen(3000, function() {
    console.log("Servidor funcionando en http://localhost:3000");
});