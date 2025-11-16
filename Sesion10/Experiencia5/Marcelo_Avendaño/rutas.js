const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ 
        mensaje: 'API de Productos',
        rutas_disponibles: [
            'GET /',
            'GET /productos',
            'GET /productos/:id',
            'POST /productos',
            'PUT /productos/:id',
            'DELETE /productos/:id',
            'GET /buscar?categoria=...',
            'GET /usuarios/:id/pedidos'
        ]
    });
});

// Rutas para productos
router.get('/productos', (req, res) => {
    const { categoria, precio_max } = req.query;
    
    let productos = [
        { id: 1, nombre: 'Laptop', precio: 1200, categoria: 'Electrónica' },
        { id: 2, nombre: 'Mouse', precio: 25, categoria: 'Accesorios' },
        { id: 3, nombre: 'Teclado', precio: 80, categoria: 'Accesorios' }
    ];

    if (categoria) {
        productos = productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }
    if (precio_max) {
        productos = productos.filter(p => p.precio <= parseInt(precio_max));
    }

    res.json({ productos, total: productos.length });
});

// Ruta con parámetro de URL
router.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    res.json({ 
        mensaje: `Detalles del producto ${id}`,
        producto: { id, nombre: 'Producto ejemplo', precio: 100 }
    });
});

router.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    res.status(201).json({ 
        mensaje: 'Producto creado',
        producto: nuevoProducto
    });
});

router.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    res.json({ 
        mensaje: `Producto ${id} actualizado`,
        datos: datosActualizados
    });
});

router.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    res.json({ mensaje: `Producto ${id} eliminado` });
});

// Ruta con múltiples parámetros
router.get('/usuarios/:userId/pedidos', (req, res) => {
    const { userId } = req.params;
    res.json({ 
        usuario: userId,
        pedidos: [
            { id: 1, total: 150 },
            { id: 2, total: 200 }
        ]
    });
});

// Ruta con parámetros opcionales
router.get('/buscar', (req, res) => {
    const { q, categoria, orden } = req.query;
    res.json({ 
        busqueda: q,
        categoria: categoria || 'todas',
        orden: orden || 'relevancia',
        resultados: []
    });
});

router.get('/login', (req, res) => {
    res.json({ 
        mensaje: 'Página de inicio de sesión',
        metodos: ['POST /login para autenticar']
    });
});

router.post('/login', (req, res) => {
    const { usuario, password } = req.body;
    if (usuario && password) {
        res.json({ 
            mensaje: 'Login exitoso',
            token: 'token_ejemplo_123'
        });
    } else {
        res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }
});

module.exports = router;