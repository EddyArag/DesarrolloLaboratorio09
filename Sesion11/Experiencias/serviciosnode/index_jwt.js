const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Permitir que el servidor entienda JSON
app.use(express.json()); 

// 1. Ruta Pública (Cualquiera puede entrar)
app.get('/api', (req, res) => {
    res.json({ mensaje: "Esta es la Data de Clientes (Pública)" });
});

// 2. Ruta LOGIN (Para obtener el Token)
app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: "aruiz",
        email: "aruiz@gmail.com"
    };
    // Crear el token (Expira en 30 segundos para probar rápido)
    jwt.sign({ user }, 'secretkey', { expiresIn: '300s' }, (err, token) => {
        res.json({ token }); // Enviamos el token al usuario
    });
});

// 3. Middleware para Verificar Token (Seguridad)
function verifiToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403); // Prohibido si no hay token
    }
}

// 4. Ruta PROTEGIDA (Solo con Token)
app.post('/api/posts', verifiToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                mensaje: 'Post Creado (Ruta protegida accedida con éxito)',
                authData
            });
        }
    });
});

// Iniciar servidor en puerto 5000 (para no chocar con el otro)
app.listen(5000, () => console.log("Servidor JWT en puerto 5000"));