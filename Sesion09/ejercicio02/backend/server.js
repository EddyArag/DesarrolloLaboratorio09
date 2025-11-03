const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Especialidades disponibles
const especialidades = [
    'Estadistica',
    'DesarrolloWeb', 
    'Testing',
    'BaseDeDatos',
    'Algoritmos'
];

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // La especialidad viene en el campo especialidad del form
        const especialidad = req.body.especialidad || 'Otros';
        const uploadPath = path.join(__dirname, '..', 'uploads', especialidad);
        
        // Crear directorio si no existe
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Mantener el nombre original del archivo con timestamp
        const timestamp = Date.now();
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, `${timestamp}_${originalName}`);
    }
});

const upload = multer({ 
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            // Usar directorio temporal primero
            const tempPath = path.join(__dirname, '..', 'uploads', 'temp');
            if (!fs.existsSync(tempPath)) {
                fs.mkdirSync(tempPath, { recursive: true });
            }
            cb(null, tempPath);
        },
        filename: function (req, file, cb) {
            const timestamp = Date.now();
            const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
            cb(null, `${timestamp}_${originalName}`);
        }
    }),
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB límite
    },
    fileFilter: function (req, file, cb) {
        // Permitir todos los tipos de archivo
        cb(null, true);
    }
});

// Función para obtener información del archivo
function getFileInfo(filePath) {
    const stats = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    
    return {
        nombre: path.basename(filePath),
        tamaño: stats.size,
        fechaCreacion: stats.birthtime,
        fechaModificacion: stats.mtime,
        extension: ext,
        tipo: getFileType(ext)
    };
}

// Función para determinar el tipo de archivo
function getFileType(extension) {
    const tipos = {
        '.pdf': 'PDF',
        '.doc': 'Word',
        '.docx': 'Word',
        '.txt': 'Texto',
        '.jpg': 'Imagen',
        '.jpeg': 'Imagen',
        '.png': 'Imagen',
        '.gif': 'Imagen',
        '.mp4': 'Video',
        '.avi': 'Video',
        '.mov': 'Video',
        '.zip': 'Archivo',
        '.rar': 'Archivo',
        '.js': 'JavaScript',
        '.html': 'HTML',
        '.css': 'CSS',
        '.py': 'Python',
        '.java': 'Java',
        '.sql': 'SQL',
        '.json': 'JSON',
        '.xml': 'XML'
    };
    
    return tipos[extension] || 'Otro';
}

// Función para leer contenido de archivos de texto
function leerContenidoArchivo(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const textExtensions = ['.txt', '.js', '.html', '.css', '.py', '.java', '.sql', '.json', '.xml', '.md'];
    
    if (textExtensions.includes(ext)) {
        try {
            return fs.readFileSync(filePath, 'utf8');
        } catch (error) {
            return 'Error al leer el archivo';
        }
    }
    
    return 'Este tipo de archivo no se puede mostrar como texto';
}

// Rutas

// Obtener lista de especialidades
app.get('/api/especialidades', (req, res) => {
    res.json(especialidades);
});

// Subir archivo
app.post('/api/upload', upload.single('archivo'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
        }

        const { especialidad } = req.body;
        
        if (!especialidades.includes(especialidad)) {
            // Eliminar archivo temporal
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'Especialidad no válida' });
        }

        // Mover archivo de temporal a la carpeta correcta
        const tempPath = req.file.path;
        const finalPath = path.join(__dirname, '..', 'uploads', especialidad, req.file.filename);
        
        // Crear directorio de destino si no existe
        const destDir = path.join(__dirname, '..', 'uploads', especialidad);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        
        // Mover archivo
        fs.renameSync(tempPath, finalPath);
        
        const fileInfo = getFileInfo(finalPath);
        
        res.json({
            success: true,
            message: 'Archivo subido exitosamente',
            archivo: {
                ...fileInfo,
                especialidad: especialidad,
                ruta: finalPath
            }
        });

    } catch (error) {
        console.error('Error al subir archivo:', error);
        // Limpiar archivo temporal si existe
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener archivos de una especialidad
app.get('/api/archivos/:especialidad', (req, res) => {
    try {
        const { especialidad } = req.params;
        
        if (!especialidades.includes(especialidad)) {
            return res.status(400).json({ error: 'Especialidad no válida' });
        }

        const uploadPath = path.join(__dirname, '..', 'uploads', especialidad);
        
        if (!fs.existsSync(uploadPath)) {
            return res.json([]);
        }

        const archivos = fs.readdirSync(uploadPath);
        const archivosInfo = archivos.map(archivo => {
            const filePath = path.join(uploadPath, archivo);
            return {
                ...getFileInfo(filePath),
                especialidad: especialidad,
                id: archivo
            };
        });

        res.json(archivosInfo);

    } catch (error) {
        console.error('Error al obtener archivos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener todos los archivos de todas las especialidades
app.get('/api/archivos', (req, res) => {
    try {
        let todosLosArchivos = [];

        especialidades.forEach(especialidad => {
            const uploadPath = path.join(__dirname, '..', 'uploads', especialidad);
            
            if (fs.existsSync(uploadPath)) {
                const archivos = fs.readdirSync(uploadPath);
                const archivosInfo = archivos.map(archivo => {
                    const filePath = path.join(uploadPath, archivo);
                    return {
                        ...getFileInfo(filePath),
                        especialidad: especialidad,
                        id: archivo
                    };
                });
                todosLosArchivos = todosLosArchivos.concat(archivosInfo);
            }
        });

        res.json(todosLosArchivos);

    } catch (error) {
        console.error('Error al obtener todos los archivos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ver contenido de un archivo
app.get('/api/archivo/:especialidad/:archivo', (req, res) => {
    try {
        const { especialidad, archivo } = req.params;
        
        if (!especialidades.includes(especialidad)) {
            return res.status(400).json({ error: 'Especialidad no válida' });
        }

        const filePath = path.join(__dirname, '..', 'uploads', especialidad, archivo);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }

        const fileInfo = getFileInfo(filePath);
        const contenido = leerContenidoArchivo(filePath);

        res.json({
            ...fileInfo,
            especialidad: especialidad,
            contenido: contenido,
            puedeVisualizarse: contenido !== 'Este tipo de archivo no se puede mostrar como texto'
        });

    } catch (error) {
        console.error('Error al leer archivo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Descargar archivo
app.get('/api/download/:especialidad/:archivo', (req, res) => {
    try {
        const { especialidad, archivo } = req.params;
        
        if (!especialidades.includes(especialidad)) {
            return res.status(400).json({ error: 'Especialidad no válida' });
        }

        const filePath = path.join(__dirname, '..', 'uploads', especialidad, archivo);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }

        // Obtener el nombre original del archivo (sin timestamp)
        const nombreOriginal = archivo.substring(archivo.indexOf('_') + 1);
        
        res.download(filePath, nombreOriginal);

    } catch (error) {
        console.error('Error al descargar archivo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar archivo
app.delete('/api/archivo/:especialidad/:archivo', (req, res) => {
    try {
        const { especialidad, archivo } = req.params;
        
        if (!especialidades.includes(especialidad)) {
            return res.status(400).json({ error: 'Especialidad no válida' });
        }

        const filePath = path.join(__dirname, '..', 'uploads', especialidad, archivo);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }

        fs.unlinkSync(filePath);

        res.json({
            success: true,
            message: 'Archivo eliminado exitosamente'
        });

    } catch (error) {
        console.error('Error al eliminar archivo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
