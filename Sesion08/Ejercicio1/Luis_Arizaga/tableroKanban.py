import reflex as rx
from typing import List, Dict

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

class State(rx.State):
    
    mostrar_solo_pendientes: bool = False

    tareas_pendientes_base: List[Dict] = DATOS_PENDIENTES
    tareas_en_progreso_base: List[Dict] = DATOS_EN_PROGRESO
    tareas_completadas_base: List[Dict] = DATOS_COMPLETADAS

    def mostrar_pendientes(self):
        self.mostrar_solo_pendientes = True 

    def mostrar_todas(self):
        self.mostrar_solo_pendientes = False

    @rx.var
    def tareas_pendientes(self) -> List[Dict]:
        return self.tareas_pendientes_base

    @rx.var
    def tareas_en_progreso(self) -> List[Dict]:
        if self.mostrar_solo_pendientes: 
            return [t for t in self.tareas_en_progreso_base if t["estado"] == "Pendiente"] 
        return self.tareas_en_progreso_base 

    @rx.var
    def tareas_completadas(self) -> List[Dict]:
        if self.mostrar_solo_pendientes: 
            return [t for t in self.tareas_completadas_base if t["estado"] == "Pendiente"] 
        return self.tareas_completadas_base 

def tarjeta_tarea(tarea: Dict):
    return rx.box(
        rx.text(tarea["titulo"], weight="medium"),
        background_color="var(--gray-1)",
        border="1px solid var(--gray-4)",
        border_radius="var(--radius-3)",
        padding_x="4",
        padding_y="2",
        width="100%",
    )

def columna_kanban(nombre: str, tareas_lista: List[Dict]):
    return rx.box(
        rx.heading(nombre, size="5", margin_bottom="3"),
        rx.vstack(
            rx.foreach(
                tareas_lista, 
                tarjeta_tarea
            ),
            spacing="3",
            height="350px",
            overflow_y="auto",
            padding="1",
        ),
        background_color="var(--gray-2)",
        padding="4",
        border_radius="var(--radius-4)",
        width="300px",
    )

@rx.page(route="/")
def index():
    return rx.container(
        rx.vstack(
            rx.heading(
                "Tablero Kanban", 
                size="8", 
                weight="bold", 
                margin_top="4",
                color="black"  # Título en color negro
            ),
            rx.hstack(
                rx.button(
                    "Mostrar Solo Pendientes", 
                    on_click=State.mostrar_pendientes,
                    variant="soft",
                    color_scheme="blue",
                ),
                rx.button(
                    "Mostrar Todas", 
                    on_click=State.mostrar_todas,
                    variant="outline",
                ),
                spacing="4",
                justify="center",
                width="100%",
                margin_y="4",
            ),
            rx.hstack(
                columna_kanban("Pendientes", State.tareas_pendientes),
                columna_kanban("En Progreso", State.tareas_en_progreso),
                columna_kanban("Completadas", State.tareas_completadas),
                spacing="5",
                align="start",
            ),
            spacing="5",
            align="center",
            width="100%",
        ),
        max_width="1000px",
    )

# Configuración de la App con fondo blanco (light mode)
app = rx.App(
    theme=rx.theme(
        appearance="light",
    )
)
app.add_page(index)