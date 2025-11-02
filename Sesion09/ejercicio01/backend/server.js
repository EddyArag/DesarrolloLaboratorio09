const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Configuración de MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3360,
    user: 'root',
    password: 'PasswordCensurada',
    database: 'registro_usuarios'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('Conectado a MySQL exitosamente');
});

// Función para calcular edad
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    
    return edad;
}

// Función para calcular precio de pasaje
function calcularPrecioPasaje(fechaNacimiento, precioBase) {
    const edad = calcularEdad(fechaNacimiento);
    let precioFinal = precioBase;
    let tipoPasajero = 'Adulto';
    let descuento = 0;
    
    if (edad < 2) {
        precioFinal = 0;
        tipoPasajero = 'Infante';
        descuento = 100;
    } else if (edad >= 2 && edad <= 17) {
        precioFinal = precioBase * 0.75;
        tipoPasajero = 'Menor';
        descuento = 25;
    }
    
    return {
        precioFinal,
        tipoPasajero,
        descuento,
        edad
    };
}

// Función para generar matriz perfecta
function generarMatrizPerfecta(tamaño) {
    const matriz = [];
    
    // Crear matriz aleatoria
    for (let i = 0; i < tamaño; i++) {
        matriz[i] = [];
        for (let j = 0; j < tamaño; j++) {
            matriz[i][j] = Math.floor(Math.random() * 10) + 1;
        }
    }
    
    // Verificar si es perfecta (suma de filas = suma de columnas = suma diagonales)
    const sumaFilas = [];
    const sumaColumnas = new Array(tamaño).fill(0);
    let sumaDiagonalPrincipal = 0;
    let sumaDiagonalSecundaria = 0;
    
    for (let i = 0; i < tamaño; i++) {
        let sumaFila = 0;
        for (let j = 0; j < tamaño; j++) {
            sumaFila += matriz[i][j];
            sumaColumnas[j] += matriz[i][j];
            
            if (i === j) {
                sumaDiagonalPrincipal += matriz[i][j];
            }
            if (i + j === tamaño - 1) {
                sumaDiagonalSecundaria += matriz[i][j];
            }
        }
        sumaFilas.push(sumaFila);
    }
    
    const primeraSuma = sumaFilas[0];
    const esPerfecta = sumaFilas.every(suma => suma === primeraSuma) &&
                      sumaColumnas.every(suma => suma === primeraSuma) &&
                      sumaDiagonalPrincipal === primeraSuma &&
                      sumaDiagonalSecundaria === primeraSuma;
    
    return {
        matriz,
        esPerfecta,
        sumaFilas,
        sumaColumnas,
        sumaDiagonalPrincipal,
        sumaDiagonalSecundaria
    };
}

// Rutas

// Registro de usuario
app.post('/api/registro', async (req, res) => {
    try {
        const {
            nombreCompleto,
            direccion,
            correoElectronico,
            contrasena,
            confirmarContrasena,
            fechaNacimiento,
            sexo,
            temasInteres,
            aficionesSeleccionadas
        } = req.body;

        // Validaciones básicas
        if (contrasena !== confirmarContrasena) {
            return res.status(400).json({ error: 'Las contraseñas no coinciden' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Insertar usuario
        const query = `
            INSERT INTO usuarios 
            (nombre_completo, direccion, correo_electronico, contrasena, confirmar_contrasena, 
             fecha_nacimiento, sexo, temas_interes, aficiones_seleccionadas)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const temasInteresStr = temasInteres ? temasInteres.join(',') : '';
        const aficionesStr = aficionesSeleccionadas ? aficionesSeleccionadas.join(',') : '';

        db.query(query, [
            nombreCompleto,
            direccion,
            correoElectronico,
            hashedPassword,
            hashedPassword,
            fechaNacimiento,
            sexo,
            temasInteresStr,
            aficionesStr
        ], (err, result) => {
            if (err) {
                console.error('Error al insertar usuario:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
                }
                return res.status(500).json({ error: 'Error interno del servidor' });
            }

            res.json({
                success: true,
                message: 'Usuario registrado exitosamente',
                userId: result.insertId
            });
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener usuario por ID
app.get('/api/usuario/:id', (req, res) => {
    const userId = req.params.id;
    
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener usuario:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        const usuario = results[0];
        // No enviar la contraseña
        delete usuario.contrasena;
        delete usuario.confirmar_contrasena;
        
        res.json(usuario);
    });
});

// Calcular precio de pasaje
app.post('/api/calcular-pasaje', (req, res) => {
    try {
        const { fechaNacimiento, precioBase } = req.body;
        
        const resultado = calcularPrecioPasaje(fechaNacimiento, precioBase);
        
        res.json(resultado);
    } catch (error) {
        console.error('Error al calcular pasaje:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Comprar pasaje
app.post('/api/comprar-pasaje', (req, res) => {
    try {
        const { nombrePasajero, fechaNacimiento, destino, precioBase } = req.body;
        
        const { precioFinal, tipoPasajero, descuento } = calcularPrecioPasaje(fechaNacimiento, precioBase);
        
        const query = `
            INSERT INTO pasajes 
            (nombre_pasajero, fecha_nacimiento, destino, precio_base, precio_final, tipo_pasajero, descuento_aplicado)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        db.query(query, [
            nombrePasajero,
            fechaNacimiento,
            destino,
            precioBase,
            precioFinal,
            tipoPasajero,
            descuento
        ], (err, result) => {
            if (err) {
                console.error('Error al insertar pasaje:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            
            res.json({
                success: true,
                message: 'Pasaje comprado exitosamente',
                pasajeId: result.insertId,
                precioFinal,
                tipoPasajero,
                descuento
            });
        });
        
    } catch (error) {
        console.error('Error al comprar pasaje:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Generar matriz perfecta
app.get('/api/matriz-perfecta/:tamaño', (req, res) => {
    try {
        const tamaño = parseInt(req.params.tamaño);
        
        if (tamaño < 2 || tamaño > 10) {
            return res.status(400).json({ error: 'El tamaño debe estar entre 2 y 10' });
        }
        
        const resultado = generarMatrizPerfecta(tamaño);
        res.json(resultado);
        
    } catch (error) {
        console.error('Error al generar matriz:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
