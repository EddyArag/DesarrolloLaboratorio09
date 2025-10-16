import reflex as rx
import httpx
from typing import List, Dict, Any

# 1. Usamos una API pública real (JSONPlaceholder)
API_URL = "https://jsonplaceholder.typicode.com/todos"

# 3. Implementar la lógica de la solicitud
async def obtener_datos_api():
    """Realiza la solicitud GET a la API."""
    try:
        async with httpx.AsyncClient() as cliente:
            respuesta = await cliente.get(API_URL) #
            respuesta.raise_for_status() # Verifica si hay errores HTTP
            return respuesta.json() # Devuelve los datos como JSON
    except httpx.HTTPStatusError as e:
        print(f"Error HTTP al contactar la API: {e}")
        return rx.window_alert(f"Error al cargar datos: {e.response.status_code}")
    except Exception as e:
        print(f"Error inesperado: {e}")
        return rx.window_alert("Error inesperado. Revisa la consola.")

class EstadoDatosAPI(rx.State):
    """Estado para manejar la lista de datos de la API."""
    
    # Variable de estado a nivel de clase
    datos: List[Dict[str, Any]] = [] 

    # Evento para cargar los datos
    async def cargar_datos(self): 
        self.datos = [] 
        datos_cargados = await obtener_datos_api() 
        
        if isinstance(datos_cargados, list):
            self.datos = datos_cargados
        else:
            print("Los datos recibidos de la API no son una lista.")


# 2. Crear un componente para mostrar los datos
def mostrar_datos_api(): 
    """Componente UI que muestra el botón y la lista."""
    return rx.fragment(
        rx.button(
            "Cargar Datos", 
            on_click=EstadoDatosAPI.cargar_datos 
        ),
        
        # --- LÍNEA CORREGIDA ---
        # 4. Manejar la respuesta (mostramos el 'title')
        rx.ordered_list(
            # Usamos rx.foreach para iterar sobre la variable de estado
            rx.foreach(
                EstadoDatosAPI.datos,
                lambda dato: rx.list_item(dato["title"])
            )
        )
        # --- FIN DE LA CORRECCIÓN ---
    )

# --- Página Principal ---
@rx.page(route="/")
def index():
    return rx.container(
        rx.vstack(
            rx.heading("Práctica 4: Consumo de API"),
            mostrar_datos_api(),
            spacing="4", # Espaciado numérico
            align="start" # Alinea los elementos a la izquierda
        ),
        padding_top="5",
        max_width="800px"
    )

# --- Configuración final de la App ---
app = rx.App()
app.add_page(index)