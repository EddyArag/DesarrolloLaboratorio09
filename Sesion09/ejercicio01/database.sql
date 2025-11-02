-- Crear base de datos
CREATE DATABASE IF NOT EXISTS registro_usuarios;
USE registro_usuarios;

-- Tabla para usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    direccion TEXT,
    correo_electronico VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    confirmar_contrasena VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    sexo ENUM('Hombre', 'Mujer') NOT NULL,
    temas_interes SET('Ficción', 'Acción', 'Terror', 'Comedia', 'Suspense') DEFAULT NULL,
    aficiones_seleccionadas SET('Música-Pop', 'Fotografía', 'Deportes-auto-Juego') DEFAULT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para pasajes aéreos
CREATE TABLE pasajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_pasajero VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    destino VARCHAR(255) NOT NULL,
    precio_base DECIMAL(10,2) NOT NULL,
    precio_final DECIMAL(10,2) NOT NULL,
    tipo_pasajero ENUM('Adulto', 'Menor', 'Infante') NOT NULL,
    descuento_aplicado DECIMAL(5,2) DEFAULT 0,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
