// index.js (Backend)
const express = require('express');
const mysql = require('mysql2/promise'); // Usamos la versión con promesas
const cors = require('cors');
const app = express();
const PORT = 3001; // Usaremos el puerto 3001 para el backend
// 1. Middleware
app.use(cors()); // Permite que React (en otro puerto) haga peticiones
app.use(express.json());
// 2. Configuración del Pool de Conexiones
// (Reemplace con su usuario/contraseña de MySQL si es diferente)
const pool = mysql.createPool({
 host: 'localhost',
 user: 'root',
 password: 'eddy', // Su contraseña de MySQL (si tiene)
 database: 'publications'// Base de datos a usar
});
// 3. Crear el Endpoint (la ruta de la API)
app.get('/api/customers', async(req, res) => {
 try{
 console.log("Petición recibida en /api/customers");
 // Ejecutamos la consulta en la tabla 'customers'
 const [rows] = await pool.query('SELECT name, isbn FROM customers');
 res.json(rows); // Devolvemos los datos como JSON
 } catch(error) {
 console.error("Error al consultar la base de datos:", error);
 res.status(500).json({ message: "Error en el servidor"});
 }
});
// 4. Iniciar el Servidor
app.listen(PORT, () =>{
 console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
