const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Base de datos simulada en memoria
let usuarios = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', edad: 25 },
  { id: 2, nombre: 'María García', email: 'maria@example.com', edad: 30 },
  { id: 3, nombre: 'Carlos López', email: 'carlos@example.com', edad: 28 }
];

let tareas = [
  { id: 1, titulo: 'Aprender Node.js', completada: false, usuarioId: 1 },
  { id: 2, titulo: 'Crear API REST', completada: true, usuarioId: 1 },
  { id: 3, titulo: 'Estudiar Express', completada: false, usuarioId: 2 }
];

// GET - Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  res.json({
    success: true,
    data: usuarios,
    total: usuarios.length
  });
});

// GET - Obtener un usuario por ID
app.get('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  
  if (!usuario) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado'
    });
  }
  
  res.json({
    success: true,
    data: usuario
  });
});

// POST - Crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, email, edad } = req.body;
  
  // Validación básica
  if (!nombre || !email) {
    return res.status(400).json({
      success: false,
      message: 'Nombre y email son requeridos'
    });
  }
  
  const nuevoUsuario = {
    id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
    nombre,
    email,
    edad: edad || null
  };
  
  usuarios.push(nuevoUsuario);
  
  res.status(201).json({
    success: true,
    message: 'Usuario creado exitosamente',
    data: nuevoUsuario
  });
});

// PUT - Actualizar un usuario completo
app.put('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, email, edad } = req.body;
  
  const index = usuarios.findIndex(u => u.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado'
    });
  }
  
  // Validación básica
  if (!nombre || !email) {
    return res.status(400).json({
      success: false,
      message: 'Nombre y email son requeridos'
    });
  }
  
  usuarios[index] = {
    id,
    nombre,
    email,
    edad: edad || null
  };
  
  res.json({
    success: true,
    message: 'Usuario actualizado exitosamente',
    data: usuarios[index]
  });
});

// DELETE - Eliminar un usuario
app.delete('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado'
    });
  }
  
  const usuarioEliminado = usuarios.splice(index, 1)[0];
  
  res.json({
    success: true,
    message: 'Usuario eliminado exitosamente',
    data: usuarioEliminado
  });
});

// GET - Obtener todas las tareas
app.get('/api/tareas', (req, res) => {
  res.json({
    success: true,
    data: tareas,
    total: tareas.length
  });
});

// GET - Obtener una tarea por ID
app.get('/api/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = tareas.find(t => t.id === id);
  
  if (!tarea) {
    return res.status(404).json({
      success: false,
      message: 'Tarea no encontrada'
    });
  }
  
  res.json({
    success: true,
    data: tarea
  });
});

// POST - Crear una nueva tarea
app.post('/api/tareas', (req, res) => {
  const { titulo, completada, usuarioId } = req.body;
  
  // Validación básica
  if (!titulo) {
    return res.status(400).json({
      success: false,
      message: 'El título es requerido'
    });
  }
  
  const nuevaTarea = {
    id: tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1,
    titulo,
    completada: completada || false,
    usuarioId: usuarioId || null
  };
  
  tareas.push(nuevaTarea);
  
  res.status(201).json({
    success: true,
    message: 'Tarea creada exitosamente',
    data: nuevaTarea
  });
});

// PUT - Actualizar una tarea completa
app.put('/api/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, completada, usuarioId } = req.body;
  
  const index = tareas.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Tarea no encontrada'
    });
  }
  
  // Validación básica
  if (!titulo) {
    return res.status(400).json({
      success: false,
      message: 'El título es requerido'
    });
  }
  
  tareas[index] = {
    id,
    titulo,
    completada: completada !== undefined ? completada : false,
    usuarioId: usuarioId || null
  };
  
  res.json({
    success: true,
    message: 'Tarea actualizada exitosamente',
    data: tareas[index]
  });
});

// DELETE - Eliminar una tarea
app.delete('/api/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tareas.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Tarea no encontrada'
    });
  }
  
  const tareaEliminada = tareas.splice(index, 1)[0];
  
  res.json({
    success: true,
    message: 'Tarea eliminada exitosamente',
    data: tareaEliminada
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API REST con Node.js',
    endpoints: {
      usuarios: {
        'GET /api/usuarios': 'Obtener todos los usuarios',
        'GET /api/usuarios/:id': 'Obtener un usuario por ID',
        'POST /api/usuarios': 'Crear un nuevo usuario',
        'PUT /api/usuarios/:id': 'Actualizar un usuario',
        'DELETE /api/usuarios/:id': 'Eliminar un usuario'
      },
      tareas: {
        'GET /api/tareas': 'Obtener todas las tareas',
        'GET /api/tareas/:id': 'Obtener una tarea por ID',
        'POST /api/tareas': 'Crear una nueva tarea',
        'PUT /api/tareas/:id': 'Actualizar una tarea',
        'DELETE /api/tareas/:id': 'Eliminar una tarea'
      }
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}`);
});
