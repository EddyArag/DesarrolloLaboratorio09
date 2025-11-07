// index.js (Versión mejorada)

// Importar paquetes http y fs
var http = require('http'),
    fs = require('fs');

// Creación de plantilla: Lee el archivo index.html
var html = fs.readFileSync("./index.html");

// Crear servidor
var server = http.createServer(function(req, res) {
    // Configura el encabezado (opcional, pero buena práctica)
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    res.write(html);
    res.end();
});

// Ponerlo a la escucha y desplegar mensaje de confirmación
server.listen(3000, function() {
    console.log('El Servidor Node/HTML está funcionando en http://localhost:3000');
});