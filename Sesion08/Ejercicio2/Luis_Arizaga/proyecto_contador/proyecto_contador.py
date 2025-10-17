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

    @rx.var
    def todas_las_tareas(self) -> List[Dict]:
        return self.tareas_pendientes_base + self.tareas_en_progreso_base + self.tareas_completadas_base

    @rx.var
    def contadores_por_estado(self) -> Dict[str, int]:
        contadores = {}
        for tarea in self.todas_las_tareas: 
            estado = tarea["estado"]
            if estado in contadores:
                contadores[estado] += 1
            else:
                contadores[estado] = 1
        return contadores

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
                color="black"
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
                    color_scheme="gray"
                ),
                spacing="4",
                justify="center",
                width="100%",
                margin_y="4",
            ),
            # Columnas Kanban
            rx.hstack(
                columna_kanban("Pendientes", State.tareas_pendientes),
                columna_kanban("En Progreso", State.tareas_en_progreso),
                columna_kanban("Completadas", State.tareas_completadas),
                spacing="5",
                align="start",
            ),
            
            # Cuadro de Resumen de Tareas
            rx.card(
                rx.vstack(
                    rx.heading("Resumen de Tareas", size="4", margin_top="2"),
                    rx.text(
                        f"Pendientes: {State.contadores_por_estado.get('Pendiente', 0)}",
                        weight="bold"
                    ),
                    rx.text(
                        f"En Progreso: {State.contadores_por_estado.get('En Progreso', 0)}",
                        weight="bold"
                    ),
                    rx.text(
                        f"Completadas: {State.contadores_por_estado.get('Completada', 0)}",
                        weight="bold"
                    ),
                    spacing="2",
                    align="center",
                ),
                margin_top="4",
                background_color="var(--gray-1)",
                border="1px solid var(--gray-4)",
            ),

            spacing="5",
            align="center",
            width="100%",
            padding_bottom="5", 
        ),
        max_width="1000px",
    )

app = rx.App(
    theme=rx.theme(
        appearance="light",
    )
)
app.add_page(index)