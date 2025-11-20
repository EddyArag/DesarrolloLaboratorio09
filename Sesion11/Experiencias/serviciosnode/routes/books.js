const express = require('express');
const appRouter = express.Router();
const con = require("../config/connection"); // Importamos la conexión
const bodyParser = require("body-parser");

appRouter.use(bodyParser.urlencoded({ extended: true }));
appRouter.use(bodyParser.json());

// --- GET: Listar todos los libros (Usando SP) ---
appRouter.get('/books', (req, res) => {
    let sql_all = 'CALL usp_listar_books()';
    con.query(sql_all, (error, results) => {
        if (error) throw error;
        // Los SP devuelven un array de arrays, por eso enviamos results[0]
        res.send(results[0]); 
    });
});

// --- POST: Insertar un nuevo libro (Usando SP) ---
appRouter.post('/books', (req, res) => {
    let sql_insert = 'CALL usp_insertar_books(?, ?, ?)';
    // Obtenemos los datos del cuerpo de la petición
    const { book_title, book_author, book_published } = req.body;
    
    con.query(sql_insert, [book_title, book_author, book_published], (error, results) => {
        if (error) throw error;
        res.send({ mensaje: "Libro registrado correctamente", resultado: results });
    });
});

module.exports = appRouter;