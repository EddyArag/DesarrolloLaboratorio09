// Importar libreria http
var http = require('http');

// Crear servidor
var server = http.createServer();

// Creación de mensaje de respuesta cuando se reciba una solicitud
function mensaje (petic, resp) {
  // Configura el encabezado de la respuesta: código 200 (OK) y tipo de contenido 'text/plain'
  resp.writeHead(200, {'content-type':'text/plain'});
  // Escribe el cuerpo de la respuesta
  resp.write('Hola Mundo');
  // Finaliza el envío de la respuesta
  resp.end();
}

// Asignando la función 'mensaje' para manejar el evento 'request' del servidor
server.on('request', mensaje);

// Levantando servidor en puerto 3000 y configurando mensaje de confirmación
server.listen(3000, function(){
  console.log('La Aplicación esta funcionando en el puerto 3000');
});