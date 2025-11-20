var express = require('express');
var app = express();
var mysql = require('mysql2');
var bodyParser = require('body-parser');

// 1. Configuración de la conexión a BD
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'barbershop',
    user: 'root',
    password: 'eddy', // <--- ¡IMPORTANTE! Pon aquí TU contraseña de MySQL si tienes una [cite: 427]
});

// 2. Conectar a la BD
connection.connect(function(err) {
    if (err) throw err;
    console.log('Se conecto a la BD'); // [cite: 444]
});

// 3. Configuración del Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// 4. Crear el servidor
var server = app.listen(3000, "127.0.0.1", function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Escuchando en http://%s:%s", host, port)
});

// 5. API para obtener los libros (GET)
app.get('/books', function(req, res) {
    connection.query('select * from books', function(error, results) { // [cite: 472]
        if (error) throw error;
        res.end(JSON.stringify(results)); // [cite: 481]
    });
});
// Endpoint para obtener libros por ID
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const query = 'SELECT * FROM books WHERE id = ?';

    connection.query(query, [bookId], (error, results) => {
        if (error) {
            console.error('Error al consultar la base de datos:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        res.json(results[0]); // Devuelve solo el libro encontrado
    });
});