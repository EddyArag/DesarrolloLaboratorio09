var mysql = require('mysql2');

// Conexión
var conexion = mysql.createConnection({
    host: '127.0.0.1',
    port: '3360',
    database: 'musicdb',
    user: 'root',
    password: 'Hail100cia' 
});

conexion.connect(function(err){
    if(err){
        console.log("Error de conexion: " + err.stack);
        return;
    }
    console.log("Conectado al ID " + conexion.threadId);
});

conexion.query('SELECT * FROM albums', function(error, results){
    if(error)
        throw error;
    
    console.log("Registros encontrados:");
    results.forEach(element => {
        console.log(element);
    });
});

conexion.end();