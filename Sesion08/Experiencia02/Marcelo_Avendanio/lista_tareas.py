"""Componente de Lista de Tareas - Experiencia 02"""

import reflex as rx


class EstadoTareas(rx.State):
    """Estado para el manejo de tareas"""
    tareas: list[str] = ["Tarea de ejemplo 1", "Tarea de ejemplo 2"]
    nueva_tarea_input: str = ""
    
    def agregar_tarea(self):
        """Agregar una nueva tarea a la lista"""
        if self.nueva_tarea_input.strip():
            self.tareas.append(self.nueva_tarea_input.strip())
            self.nueva_tarea_input = ""
    
    def set_nueva_tarea(self, valor: str):
        """Actualizar el valor del input de nueva tarea"""
        self.nueva_tarea_input = valor
    
    def eliminar_tarea(self, index: int):
        """Eliminar una tarea por su índice"""
        if 0 <= index < len(self.tareas):
            self.tareas.pop(index)


def lista_tareas():
    """Componente que muestra la lista de tareas"""
    return rx.vstack(
        rx.heading("Lista de Tareas", size="6"),
        rx.cond(
            EstadoTareas.tareas.length() > 0,
            rx.vstack(
                rx.foreach(
                    EstadoTareas.tareas,
                    lambda tarea, index: rx.hstack(
                        rx.text(tarea, width="100%"),
                        rx.button(
                            "Eliminar", 
                            on_click=lambda: EstadoTareas.eliminar_tarea(index),
                            size="1",
                            variant="ghost"
                        ),
                        width="100%",
                        justify="between",
                        align="center",
                        padding="2",
                        border="1px solid #e2e8f0",
                        border_radius="md"
                    )
                ),
                width="100%"
            ),
            rx.text("No hay tareas aún. ¡Agrega una!", color="gray")
        ),
        width="100%",
        max_width="500px"
    )


def agregar_tarea():
    """Componente para agregar nuevas tareas"""
    return rx.vstack(
        rx.heading("Agregar Nueva Tarea", size="5"),
        rx.hstack(
            rx.input(
                placeholder="Escribe una nueva tarea...",
                value=EstadoTareas.nueva_tarea_input,
                on_change=EstadoTareas.set_nueva_tarea,
                width="100%"
            ),
            rx.button(
                "Agregar",
                on_click=EstadoTareas.agregar_tarea,
                disabled=~EstadoTareas.nueva_tarea_input.strip()
            ),
            width="100%"
        ),
        width="100%",
        max_width="500px"
    )


def app_tareas():
    """Aplicación completa de gestión de tareas"""
    return rx.vstack(
        rx.heading("Gestor de Tareas", size="8", text_align="center"),
        rx.text("Ejemplo de Estado Global en Reflex", size="4", color="gray", text_align="center"),
        rx.divider(),
        agregar_tarea(),
        rx.divider(),
        lista_tareas(),
        spacing="6",
        padding="4",
        max_width="600px",
        margin="0 auto"
    )
