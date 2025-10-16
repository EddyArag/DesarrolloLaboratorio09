import reflex as rx

# --- Inicio del Código de la Práctica 2 ---

# 2. Implementar el estado global
class EstadoTareas(rx.State):
    """
    Estado global para almacenar la lista de tareas
    y el texto de la nueva tarea.
    """
    # Variable de estado para la lista
    tareas: list[str] = ["Tarea 1", "Tarea 2"]
    
    # Variable de estado para el campo de texto (input)
    nueva_tarea_texto: str = ""

    def set_nueva_tarea_texto(self, texto: str):
        """Actualiza la variable 'nueva_tarea_texto' cada vez que el usuario escribe."""
        self.nueva_tarea_texto = texto

    def agregar_tarea_a_lista(self):
        """
        Agrega la nueva tarea del input a la lista
        y limpia el campo de texto.
        """
        if self.nueva_tarea_texto.strip():
            self.tareas.append(self.nueva_tarea_texto.strip())
            self.nueva_tarea_texto = ""

# 1. Crear componente 'ListaTareas'
def lista_tareas():
    """Muestra la lista de tareas."""
    return rx.fragment(
        rx.heading("Lista de Tareas"),
        rx.ordered_list(
            rx.foreach(
                EstadoTareas.tareas,
                lambda tarea: rx.list_item(tarea)
            )
        )
    )

# 1. Crear componente 'AgregarTarea'
def agregar_tarea():
    """Muestra el input y el botón para agregar tareas."""
    return rx.fragment(
        rx.input(
            placeholder="Agregar tarea...",
            # El valor del input es la variable de estado
            value=EstadoTareas.nueva_tarea_texto,
            # on_change actualiza la variable de estado
            on_change=EstadoTareas.set_nueva_tarea_texto,
        ),
        rx.button(
            "Agregar",
            # on_click llama al método del estado
            on_click=EstadoTareas.agregar_tarea_a_lista,
        ),
    )

# --- Página Principal ---
# Esto combina los dos componentes en una sola vista
@rx.page(route="/")
def index():
    # Usamos vstack para apilarlos verticalmente
    return rx.vstack( 
        lista_tareas(),     # Componente 1
        agregar_tarea()     # Componente 2
    )

# --- Configuración final de la App ---
app = rx.App()
app.add_page(index)