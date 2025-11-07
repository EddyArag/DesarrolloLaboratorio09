// Solicitando paquete de Mysql
var mysql = require('mysql2');

// Configurando parámetros de conexión (puede variar segun instalación)
var conexion = mysql.createConnection({
  host: 'localhost',
  port: 3306, // ¡Asegúrate de usar el puerto correcto para tu servidor! (el ejemplo usa 8889) 
  database: 'musicdb',
  user: 'root',
  password: 'eddy',
});

// Realizando conexión o verificando si sucedió un error
conexion.connect(function(err) {
  if (err) {
    console.log("Error de conexion" + err.stack);
    return;
  }
  console.log("Conectado al ID " + conexion.threadId);

  // Realizando la consulta a la tabla 'Albums'
  conexion.query('select * from albums', function (error, results) { // Corregido el SQL a 'select * from albums'
    if (error)
      throw error;

    // Iterando y mostrando los resultados
    results.forEach(element => {
      console.log(element);
    });

    // Cerrando la conexión
    conexion.end();
  });
});