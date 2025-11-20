const mysql = require('mysql2');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'eddy', // <--- Coloca tu contraseña aquí si tienes una (ej: '123456')
    database: 'biblioteca'
});

con.connect((err) => {
    if (err) {
        console.error('Error conectando: ' + err.stack);
        return;
    }
    console.log("Conectado exitosamente a la BD biblioteca");
});

module.exports = con;