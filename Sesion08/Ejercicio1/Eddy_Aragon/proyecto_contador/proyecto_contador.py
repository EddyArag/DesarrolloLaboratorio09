import reflex as rx
from typing import List, Dict

# --- Datos de ejemplo ---
DATOS_PENDIENTES = [
    {"titulo": "Tarea P-1: Definir requisitos", "estado": "Pendiente"},
    {"titulo": "Tarea P-2: Crear mockups", "estado": "Pendiente"},
]
DATOS_EN_PROGRESO = [
    {"titulo": "Tarea EP-1: Desarrollar API", "estado": "En Progreso"},
]
DATOS_COMPLETADAS = [
    {"titulo": "Tarea C-1: Configurar proyecto", "estado": "Completada"},
    {"titulo": "Tarea C-2: Instalar Reflex", "estado": "Completada"},
]

# --- Inicio del Código del Ejercicio 1 ---
# 

# a) Variable de Estado en la clase State
class State(rx.State):
    """Estado global del tablero Kanban."""
    
    # a) Variable booleana inicializada en False
    mostrar_solo_pendientes: bool = False

    # Variables de estado para las tareas base
    tareas_pendientes_base: List[Dict] = DATOS_PENDIENTES
    tareas_en_progreso_base: List[Dict] = DATOS_EN_PROGRESO
    tareas_completadas_base: List[Dict] = DATOS_COMPLETADAS

    # b) Botón para cambiar el valor a True
    def mostrar_pendientes(self):
        """Activa el filtro de solo pendientes."""
        self.mostrar_solo_pendientes = True 

    # (He añadido este botón extra para poder reiniciar el filtro)
    def mostrar_todas(self):
        """Desactiva el filtro."""
        self.mostrar_solo_pendientes = False

    # c) Lógica de Filtrado (Implementada como Computed Vars)
    #    Esto aplica el filtro reactivamente
    
    @rx.var
    def tareas_pendientes(self) -> List[Dict]:
        """Devuelve las tareas pendientes."""
        # Esta columna siempre se muestra
        return self.tareas_pendientes_base

    @rx.var
    def tareas_en_progreso(self) -> List[Dict]:
        """
        Devuelve tareas "En Progreso" O solo las pendientes 
        si el filtro está activo.
        """
        if self.mostrar_solo_pendientes: # 
            # Esta lógica devolverá una lista vacía
            return [t for t in self.tareas_en_progreso_base if t["estado"] == "Pendiente"] # [cite: 607, 627]
        return self.tareas_en_progreso_base #

    @rx.var
    def tareas_completadas(self) -> List[Dict]:
        """
        Devuelve tareas "Completadas" O solo las pendientes 
        si el filtro está activo.
        """
        if self.mostrar_solo_pendientes: 
            # Esta lógica también devolverá una lista vacía
            return [t for t in self.tareas_completadas_base if t["estado"] == "Pendiente"] # [cite: 607, 627]
        return self.tareas_completadas_base #


# Componente para la tarjeta de tarea
def tarjeta_tarea(tarea: Dict):
    """Muestra una sola tarjeta de tarea."""
    return rx.box(
        rx.text(tarea["titulo"]), #
        background="#753333",
        border="1px solid #eee",
        border_radius="md", # "md" es un valor de escala (ej: 5px)
        padding="2", # Usa la escala (ej: 0.5rem)
        width="100%",
    )

# Componente para la columna Kanban
def columna_kanban(nombre: str, tareas_lista: List[Dict]): #
    """Muestra una columna del Kanban (título + tarjetas)."""
    return rx.box(
        rx.heading(nombre, size="5"), #
        rx.vstack(
            # Usamos rx.foreach para iterar sobre la lista
            rx.foreach(
                tareas_lista, 
                tarjeta_tarea
            ),
            spacing="2",
            height="100%",
        ),
        background="#902323",
        padding="4",
        border_radius="lg",
        height="400px",
        width="300px",
    )


# --- Página Principal ---
@rx.page(route="/")
def index():
    """Página principal que muestra el tablero."""
    return rx.container(
        rx.vstack(
            rx.heading("Mi Tablero Kanban", size="7"),
            rx.hstack(
                # b) Botón "Mostrar Pendientes"
                rx.button(
                    "Mostrar Solo Pendientes", 
                    on_click=State.mostrar_pendientes
                ),
                # Mi botón extra para reiniciar
                rx.button(
                    "Mostrar Todas", 
                    on_click=State.mostrar_todas
                ),
                spacing="4",
            ),
            # El tablero con las 3 columnas
            rx.hstack(
                columna_kanban("Pendientes", State.tareas_pendientes),
                columna_kanban("En Progreso", State.tareas_en_progreso), #
                columna_kanban("Completadas", State.tareas_completadas), #
                spacing="5",
            ),
            spacing="5",
        ),
        padding_y="5",
    )

# --- Configuración final de la App ---
app = rx.App()
app.add_page(index)