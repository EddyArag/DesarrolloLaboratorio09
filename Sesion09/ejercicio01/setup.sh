#!/bin/bash

echo "=== Configuración de la Aplicación de Registro y Pasajes ==="
echo

# Verificar si MySQL está corriendo
echo "1. Verificando conexión a MySQL..."
mysql -h 127.0.0.1 -P 3360 -u root -pPasswordCensurada -e "SELECT 'Conexión exitosa' as status;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "MySQL está accesible"
    
    # Crear base de datos
    echo "2. Creando base de datos..."
    mysql -h 127.0.0.1 -P 3360 -u root -pPasswordCensurada < database.sql
    echo "Base de datos configurada"
else
    echo "Error: No se puede conectar a MySQL"
    echo "Verifique que MySQL esté corriendo en 127.0.0.1:3360"
    exit 1
fi

# Instalar dependencias del backend
echo "3. Instalando dependencias del backend..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "Dependencias del backend instaladas"
else
    echo "Error instalando dependencias del backend"
    exit 1
fi

# Instalar dependencias del frontend
echo "4. Instalando dependencias del frontend..."
cd ../frontend
npm install
if [ $? -eq 0 ]; then
    echo "Dependencias del frontend instaladas"
else
    echo "Error instalando dependencias del frontend"
    exit 1
fi

echo
echo "=== Configuración completada ==="
echo
echo "Para ejecutar la aplicación:"
echo "1. Terminal 1 - Backend:"
echo "   cd backend && npm start"
echo
echo "2. Terminal 2 - Frontend:"
echo "   cd frontend && npm start"
echo
echo "3. Abrir navegador en: http://localhost:3000"
