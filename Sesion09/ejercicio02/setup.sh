#!/bin/bash

echo "=== Configuración del Gestor de Archivos por Especialidad ==="
echo

# Crear directorios de upload si no existen
echo "1. Creando directorios de especialidades..."
mkdir -p uploads/Estadistica
mkdir -p uploads/DesarrolloWeb
mkdir -p uploads/Testing
mkdir -p uploads/BaseDeDatos
mkdir -p uploads/Algoritmos
echo "Directorios creados"

# Instalar dependencias del backend
echo "2. Instalando dependencias del backend..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "Dependencias del backend instaladas"
else
    echo "Error instalando dependencias del backend"
    exit 1
fi

# Instalar dependencias del frontend
echo "3. Instalando dependencias del frontend..."
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
echo "4. API disponible en: http://localhost:5001"
