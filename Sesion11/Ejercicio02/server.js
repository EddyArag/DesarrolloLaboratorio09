const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_por_defecto';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Middleware para parsear JSON
app.use(express.json());

// Base de datos simulada de usuarios (en producción usar una base de datos real)
const usuarios = [
  {
    id: 1,
    username: 'admin',
    // Contraseña: admin123 (hasheada con bcrypt)
    password: '$2a$10$ri2.v4eq/jsN8LdHce.Vg.TqSOrnKE/dJT6NGJKTcqVybVJU0t1bu',
    email: 'admin@example.com',
    rol: 'admin'
  },
  {
    id: 2,
    username: 'usuario',
    // Contraseña: user123 (hasheada con bcrypt)
    password: '$2a$10$76Xqk/btj4mSAEkHCNN8D.OWF3xL1EC3ANCRKKsOdxDOmZnrOm/uu',
    email: 'usuario@example.com',
    rol: 'user'
  }
];

// Datos protegidos simulados
let productos = [
  { id: 1, nombre: 'Laptop Dell', precio: 899.99, stock: 15 },
  { id: 2, nombre: 'Mouse Logitech', precio: 29.99, stock: 50 },
  { id: 3, nombre: 'Teclado Mecánico', precio: 79.99, stock: 30 }
];

let pedidos = [
  { id: 1, usuarioId: 1, productos: [1, 2], total: 929.98, fecha: '2025-11-15' },
  { id: 2, usuarioId: 2, productos: [3], total: 79.99, fecha: '2025-11-18' }
];

// MIDDLEWARE DE AUTENTICACIÓN JWT

const verificarToken = (req, res, next) => {
  // Obtener el token del header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Acceso denegado. No se proporcionó token de autenticación.'
    });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Guardar la información del usuario en el request
    req.usuario = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado. Por favor, inicia sesión nuevamente.',
        expiredAt: error.expiredAt
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({
        success: false,
        message: 'Token inválido.'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Error al verificar el token.',
      error: error.message
    });
  }
};

// Middleware para verificar rol de administrador
const verificarAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requieren permisos de administrador.'
    });
  }
  next();
};


// RUTAS PÚBLICAS (NO REQUIEREN TOKEN)

// Ruta raíz con documentación
app.get('/', (req, res) => {
  res.json({
    message: 'API REST con autenticación JWT',
    version: '1.0.0',
    endpoints: {
      publicos: {
        'POST /api/auth/login': 'Iniciar sesión y obtener token JWT',
        'POST /api/auth/register': 'Registrar nuevo usuario'
      },
      protegidos: {
        'GET /api/productos': 'Obtener todos los productos (requiere token)',
        'POST /api/productos': 'Crear producto (requiere token y rol admin)',
        'PUT /api/productos/:id': 'Actualizar producto (requiere token y rol admin)',
        'DELETE /api/productos/:id': 'Eliminar producto (requiere token y rol admin)',
        'GET /api/pedidos': 'Obtener pedidos del usuario (requiere token)',
        'POST /api/pedidos': 'Crear nuevo pedido (requiere token)',
        'GET /api/perfil': 'Obtener información del perfil (requiere token)'
      }
    },
    credenciales_prueba: {
      admin: { username: 'admin', password: 'admin123' },
      usuario: { username: 'usuario', password: 'user123' }
    }
  });
});

// LOGIN - Generar token JWT
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  // Validación
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username y password son requeridos'
    });
  }

  // Buscar usuario
  const usuario = usuarios.find(u => u.username === username);

  if (!usuario) {
    return res.status(401).json({
      success: false,
      message: 'Credenciales inválidas'
    });
  }

  // Verificar password
  const passwordValido = await bcrypt.compare(password, usuario.password);

  if (!passwordValido) {
    return res.status(401).json({
      success: false,
      message: 'Credenciales inválidas'
    });
  }

  // Crear el payload del token
  const payload = {
    id: usuario.id,
    username: usuario.username,
    email: usuario.email,
    rol: usuario.rol
  };

  // Generar token JWT
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });

  // Decodificar el token para obtener la fecha de expiración
  const decoded = jwt.decode(token);

  res.json({
    success: true,
    message: 'Login exitoso',
    token: token,
    usuario: {
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      rol: usuario.rol
    },
    expiraEn: JWT_EXPIRES_IN,
    expiraAt: new Date(decoded.exp * 1000).toISOString()
  });
});

// REGISTER - Registrar nuevo usuario
app.post('/api/auth/register', async (req, res) => {
  const { username, password, email } = req.body;

  // Validación
  if (!username || !password || !email) {
    return res.status(400).json({
      success: false,
      message: 'Username, password y email son requeridos'
    });
  }

  // Verificar si el usuario ya existe
  if (usuarios.find(u => u.username === username)) {
    return res.status(400).json({
      success: false,
      message: 'El username ya está en uso'
    });
  }

  if (usuarios.find(u => u.email === email)) {
    return res.status(400).json({
      success: false,
      message: 'El email ya está registrado'
    });
  }

  // Hashear password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear nuevo usuario
  const nuevoUsuario = {
    id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
    username,
    password: hashedPassword,
    email,
    rol: 'user' // Por defecto, los nuevos usuarios son 'user'
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({
    success: true,
    message: 'Usuario registrado exitosamente',
    usuario: {
      id: nuevoUsuario.id,
      username: nuevoUsuario.username,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol
    }
  });
});


// RUTAS PROTEGIDAS - PRODUCTOS (REQUIEREN JWT)

// GET - Obtener todos los productos (requiere token)
app.get('/api/productos', verificarToken, (req, res) => {
  res.json({
    success: true,
    usuario: req.usuario.username,
    data: productos,
    total: productos.length
  });
});

// POST - Crear producto (requiere token y rol admin)
app.post('/api/productos', verificarToken, verificarAdmin, (req, res) => {
  const { nombre, precio, stock } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({
      success: false,
      message: 'Nombre y precio son requeridos'
    });
  }

  const nuevoProducto = {
    id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
    nombre,
    precio,
    stock: stock || 0
  };

  productos.push(nuevoProducto);

  res.status(201).json({
    success: true,
    message: 'Producto creado exitosamente',
    data: nuevoProducto
  });
});

// PUT - Actualizar producto (requiere token y rol admin)
app.put('/api/productos/:id', verificarToken, verificarAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio, stock } = req.body;

  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Producto no encontrado'
    });
  }

  productos[index] = {
    id,
    nombre: nombre || productos[index].nombre,
    precio: precio !== undefined ? precio : productos[index].precio,
    stock: stock !== undefined ? stock : productos[index].stock
  };

  res.json({
    success: true,
    message: 'Producto actualizado exitosamente',
    data: productos[index]
  });
});

// DELETE - Eliminar producto (requiere token y rol admin)
app.delete('/api/productos/:id', verificarToken, verificarAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Producto no encontrado'
    });
  }

  const productoEliminado = productos.splice(index, 1)[0];

  res.json({
    success: true,
    message: 'Producto eliminado exitosamente',
    data: productoEliminado
  });
});

// RUTAS PROTEGIDAS - PEDIDOS (REQUIEREN JWT)

// GET - Obtener pedidos del usuario autenticado (requiere token)
app.get('/api/pedidos', verificarToken, (req, res) => {
  // Filtrar pedidos del usuario autenticado
  const pedidosUsuario = pedidos.filter(p => p.usuarioId === req.usuario.id);

  res.json({
    success: true,
    usuario: req.usuario.username,
    data: pedidosUsuario,
    total: pedidosUsuario.length
  });
});

// POST - Crear nuevo pedido (requiere token)
app.post('/api/pedidos', verificarToken, (req, res) => {
  const { productos: productosIds, total } = req.body;

  if (!productosIds || !Array.isArray(productosIds) || productosIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Debe especificar al menos un producto'
    });
  }

  const nuevoPedido = {
    id: pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id)) + 1 : 1,
    usuarioId: req.usuario.id,
    productos: productosIds,
    total: total || 0,
    fecha: new Date().toISOString().split('T')[0]
  };

  pedidos.push(nuevoPedido);

  res.status(201).json({
    success: true,
    message: 'Pedido creado exitosamente',
    data: nuevoPedido
  });
});


// RUTA PROTEGIDA - PERFIL (REQUIERE JWT)

// GET - Obtener información del perfil del usuario autenticado
app.get('/api/perfil', verificarToken, (req, res) => {
  const usuario = usuarios.find(u => u.id === req.usuario.id);

  if (!usuario) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado'
    });
  }

  res.json({
    success: true,
    data: {
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      rol: usuario.rol
    },
    tokenInfo: {
      expiraEn: new Date(req.usuario.exp * 1000).toISOString(),
      emitidoEn: new Date(req.usuario.iat * 1000).toISOString()
    }
  });
});

 
// MANEJO DE ERRORES


// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

 
// INICIAR SERVIDOR
 

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
  console.log(` Documentación disponible en http://localhost:${PORT}`);
  console.log(` Autenticación JWT habilitada`);
  console.log(` Tokens expiran en: ${JWT_EXPIRES_IN}`);
  console.log(' Usuarios de prueba:');
  console.log(' Admin: username="admin", password="admin123"');
  console.log(' Usuario: username="usuario", password="user123"');
});
