const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());

// Importar Rutas
const bookRouter = require('./routes/books');

// Usar las rutas con el prefijo /api
app.use('/api', bookRouter);

// Iniciar servidor
app.listen('3000', () => {
    console.log("Servidor en ejecución (Puerto 3000)");
});