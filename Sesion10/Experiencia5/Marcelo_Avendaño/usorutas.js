const express = require('express');
const app = express();
const rutas = require('./rutas.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rutas);

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log('\nPrueba estas rutas:');
    console.log(`  GET  http://localhost:${PORT}/`);
    console.log(`  GET  http://localhost:${PORT}/productos`);
    console.log(`  GET  http://localhost:${PORT}/productos?categoria=Accesorios`);
    console.log(`  GET  http://localhost:${PORT}/productos/1`);
    console.log(`  POST http://localhost:${PORT}/productos`);
    console.log(`  GET  http://localhost:${PORT}/buscar?q=laptop&categoria=electronica`);
});