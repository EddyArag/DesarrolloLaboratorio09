const express = require('express');
const app = express();

// Middleware global de logging - registra todas las peticiones
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
};

// Middleware de tiempo de respuesta
const tiempoRespuesta = (req, res, next) => {
    const inicio = Date.now();
    res.on('finish', () => {
        const duracion = Date.now() - inicio;
        console.log(`Tiempo de respuesta: ${duracion}ms`);
    });
    next();
};

// Middleware de autenticación simulada
const autenticacion = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'Bearer token123') {
        req.usuario = { id: 1, nombre: 'Usuario Autorizado' };
        next();
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
};

// Middleware para validar datos del body
const validarDatos = (req, res, next) => {
    if (req.method === 'POST' && !req.body) {
        return res.status(400).json({ error: 'Datos requeridos' });
    }
    next();
};

// Middleware para agregar headers personalizados
const headersPersonalizados = (req, res, next) => {
    res.setHeader('X-Powered-By', 'Express-Middleware-Example');
    res.setHeader('X-Response-Time', Date.now());
    next();
};

app.use(express.json());
app.use(loggerMiddleware);
app.use(tiempoRespuesta);
app.use(headersPersonalizados);

app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'Servidor funcionando',
        info: 'Prueba diferentes rutas: /publico, /privado, /error'
    });
});

app.get('/publico', (req, res) => {
    res.json({ mensaje: 'Esta es una ruta pública' });
});

// Ruta protegida con middleware de autenticación
app.get('/privado', autenticacion, (req, res) => {
    res.json({ 
        mensaje: 'Acceso autorizado',
        usuario: req.usuario
    });
});

app.post('/datos', validarDatos, (req, res) => {
    res.json({ 
        mensaje: 'Datos recibidos',
        datos: req.body
    });
});

app.get('/error', (req, res) => {
    throw new Error('Error intencional para probar manejo de errores');
});

// Middleware de manejo de errores - debe ir al final
app.use((err, req, res, next) => {
    console.error('Error capturado:', err.message);
    res.status(500).json({ 
        error: 'Error del servidor',
        mensaje: err.message
    });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = 3006;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
    console.log(`Prueba las rutas en http://localhost:${PORT}`);
});