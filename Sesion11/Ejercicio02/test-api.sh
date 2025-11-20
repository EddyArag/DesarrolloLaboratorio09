#!/bin/bash

# Script para probar la API con JWT
# Este script demuestra el flujo completo de autenticación

BASE_URL="http://localhost:3001"

echo "======================================"
echo "Probando API con JWT"
echo "======================================"
echo ""

# 1. Login y obtener token
echo "1: Haciendo login como admin..."
echo "POST ${BASE_URL}/api/auth/login"
echo ""

LOGIN_RESPONSE=$(curl -s -X POST ${BASE_URL}/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')

echo "$LOGIN_RESPONSE" | jq '.'
echo ""

# Extraer el token
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo "Error: No se pudo obtener el token"
  exit 1
fi

echo "Check: Token obtenido exitosamente"
echo "Token: ${TOKEN:0:50}..."
echo ""
echo "======================================"

# 2. Acceder a ruta protegida - Productos
echo ""
echo "2:  Accediendo a ruta protegida: /api/productos"
echo "GET ${BASE_URL}/api/productos"
echo ""

curl -s ${BASE_URL}/api/productos \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""
echo "======================================"

# 3. Crear un producto (requiere rol admin)
echo ""
echo "3: Creando un producto (requiere rol admin)..."
echo "POST ${BASE_URL}/api/productos"
echo ""

curl -s -X POST ${BASE_URL}/api/productos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nombre": "Monitor 4K Samsung",
    "precio": 449.99,
    "stock": 20
  }' | jq '.'
echo ""
echo "======================================"

# 4. Ver perfil del usuario
echo ""
echo "4:  Viendo perfil del usuario autenticado..."
echo "GET ${BASE_URL}/api/perfil"
echo ""

curl -s ${BASE_URL}/api/perfil \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""
echo "======================================"

# 5. Crear un pedido
echo ""
echo "5:  Creando un pedido..."
echo "POST ${BASE_URL}/api/pedidos"
echo ""

curl -s -X POST ${BASE_URL}/api/pedidos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "productos": [1, 2],
    "total": 929.98
  }' | jq '.'
echo ""
echo "======================================"

# 6. Listar pedidos del usuario
echo ""
echo "6:  Listando pedidos del usuario..."
echo "GET ${BASE_URL}/api/pedidos"
echo ""

curl -s ${BASE_URL}/api/pedidos \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""
echo "======================================"

# 7. Intentar acceder sin token
echo ""
echo "7:  Intentando acceder sin token (debe fallar)..."
echo "GET ${BASE_URL}/api/productos"
echo ""

curl -s ${BASE_URL}/api/productos | jq '.'
echo ""
echo "======================================"

# 8. Intentar acceder con token inválido
echo ""
echo "8:  Intentando acceder con token inválido (debe fallar)..."
echo "GET ${BASE_URL}/api/productos"
echo ""

curl -s ${BASE_URL}/api/productos \
  -H "Authorization: Bearer token_invalido_123" | jq '.'
echo ""
echo "======================================"

echo ""
echo "Check: Pruebas completadas"
echo ""
