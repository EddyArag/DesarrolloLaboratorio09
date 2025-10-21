"""Aplicaciones de Práctica con Reflex - Sesión 08"""

import reflex as rx
import httpx
from typing import List, Dict, Any
from ..ContadorReflex.ContadorReflex.formulario_contacto import app_formulario
from ..ContadorReflex.ContadorReflex.api_externa import app_api
from rxconfig import config


class State(rx.State):
    """El estado global de la aplicación que combina todas las experiencias."""
    
    # Estados del Contador
    conteo: int = 0
    
    def incrementar(self):
        self.conteo += 1
        
    def disminuir(self):
        self.conteo -= 1
    
    # Estados de la Lista de Tareas
    tareas: list[str] = ["Tarea 1", "Tarea 2"]
    nueva_tarea_input: str = ""
    
    def agregar_tarea(self):
        if self.nueva_tarea_input.strip():
            self.tareas.append(self.nueva_tarea_input.strip())
            self.nueva_tarea_input = ""
    
    def set_nueva_tarea(self, valor: str):
        self.nueva_tarea_input = valor
    
    def eliminar_tarea(self, index: int):
        if 0 <= index < len(self.tareas):
            self.tareas.pop(index)
    
    # Estados del Formulario de Contacto
    nombre: str = ""
    email: str = ""
    mensaje: str = ""
    error_nombre: str = ""
    error_email: str = ""
    error_mensaje: str = ""
    enviando: bool = False
    
    def set_nombre(self, valor: str):
        self.nombre = valor
        self.error_nombre = ""
    
    def set_email(self, valor: str):
        self.email = valor
        self.error_email = ""
    
    def set_mensaje(self, valor: str):
        self.mensaje = valor
        self.error_mensaje = ""
    
    def validar_formulario(self) -> bool:
        es_valido = True
        
        if not self.nombre.strip():
            self.error_nombre = "El nombre es requerido"
            es_valido = False
        elif len(self.nombre.strip()) < 2:
            self.error_nombre = "El nombre debe tener al menos 2 caracteres"
            es_valido = False
        
        if not self.email.strip():
            self.error_email = "El email es requerido"
            es_valido = False
        elif "@" not in self.email or "." not in self.email:
            self.error_email = "Formato de email inválido"
            es_valido = False
        
        if not self.mensaje.strip():
            self.error_mensaje = "El mensaje es requerido"
            es_valido = False
        elif len(self.mensaje.strip()) < 10:
            self.error_mensaje = "El mensaje debe tener al menos 10 caracteres"
            es_valido = False
        
        return es_valido
    
    async def enviar_formulario(self):
        if not self.validar_formulario():
            return rx.toast.error("Por favor corrige los errores en el formulario")
        
        self.enviando = True
        
        await rx.sleep(2)
        
        self.nombre = ""
        self.email = ""
        self.mensaje = ""
        self.enviando = False
        
        return rx.toast.success("Formulario enviado exitosamente!")
    
    # Estados de la API Externa
    posts: List[Dict[str, Any]] = []
    usuarios: List[Dict[str, Any]] = []
    comentarios: List[Dict[str, Any]] = []
    
    cargando_posts: bool = False
    cargando_usuarios: bool = False
    cargando_comentarios: bool = False
    
    error_posts: str = ""
    error_usuarios: str = ""
    error_comentarios: str = ""
    
    BASE_URL: str = "https://jsonplaceholder.typicode.com"

    async def cargar_posts(self):
        self.cargando_posts = True
        self.error_posts = ""
        
        try:
            async with httpx.AsyncClient() as cliente:
                respuesta = await cliente.get(f"{self.BASE_URL}/posts?_limit=10")
                respuesta.raise_for_status()
                self.posts = respuesta.json()
                
        except httpx.HTTPError as e:
            self.error_posts = f"Error HTTP: {str(e)}"
        except Exception as e:
            self.error_posts = f"Error: {str(e)}"
        finally:
            self.cargando_posts = False

    async def cargar_usuarios(self):
        self.cargando_usuarios = True
        self.error_usuarios = ""
        
        try:
            async with httpx.AsyncClient() as cliente:
                respuesta = await cliente.get(f"{self.BASE_URL}/users")
                respuesta.raise_for_status()
                self.usuarios = respuesta.json()
                
        except httpx.HTTPError as e:
            self.error_usuarios = f"Error HTTP: {str(e)}"
        except Exception as e:
            self.error_usuarios = f"Error: {str(e)}"
        finally:
            self.cargando_usuarios = False

    async def cargar_comentarios(self):
        self.cargando_comentarios = True
        self.error_comentarios = ""
        
        try:
            async with httpx.AsyncClient() as cliente:
                respuesta = await cliente.get(f"{self.BASE_URL}/comments?_limit=15")
                respuesta.raise_for_status()
                self.comentarios = respuesta.json()
                
        except httpx.HTTPError as e:
            self.error_comentarios = f"Error HTTP: {str(e)}"
        except Exception as e:
            self.error_comentarios = f"Error: {str(e)}"
        finally:
            self.cargando_comentarios = False

    def limpiar_datos_api(self):
        self.posts = []
        self.usuarios = []
        self.comentarios = []
        self.error_posts = ""
        self.error_usuarios = ""
        self.error_comentarios = ""


def contador():
    return rx.fragment(
        rx.hstack(
            rx.button("Incrementar", on_click=State.incrementar),
            rx.text(State.conteo),
            rx.button("Disminuir", on_click=State.disminuir),
        )
    )

def lista_tareas():
    return rx.vstack(
        rx.heading("Lista de Tareas", size="6"),
        rx.cond(
            State.tareas.length() > 0,
            rx.vstack(
                rx.foreach(
                    State.tareas,
                    lambda tarea, index: rx.hstack(
                        rx.text(tarea, width="100%"),
                        rx.button(
                            "Eliminar", 
                            on_click=lambda: State.eliminar_tarea(index),
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
    return rx.vstack(
        rx.heading("Agregar Nueva Tarea", size="5"),
        rx.hstack(
            rx.input(
                placeholder="Escribe una nueva tarea...",
                value=State.nueva_tarea_input,
                on_change=State.set_nueva_tarea,
                width="100%"
            ),
            rx.button(
                "Agregar",
                on_click=State.agregar_tarea,
                disabled=~State.nueva_tarea_input.strip()
            ),
            width="100%"
        ),
        width="100%",
        max_width="500px"
    )

def app_tareas():
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


def formulario_contacto():
    """Componente del formulario de contacto con Estado unificado"""
    return rx.vstack(
        rx.heading("Formulario de Contacto", size="8", text_align="center"),
        rx.text("Validación en tiempo real", size="4", color="gray", text_align="center"),
        rx.divider(),
        
        rx.vstack(
            rx.vstack(
                rx.text("Nombre", size="3", weight="medium"),
                rx.input(
                    placeholder="Tu nombre completo",
                    value=State.nombre,
                    on_change=State.set_nombre,
                    width="100%"
                ),
                rx.cond(
                    State.error_nombre != "",
                    rx.text(State.error_nombre, color="red", size="2")
                ),
                align="start",
                width="100%"
            ),
            
            rx.vstack(
                rx.text("Email", size="3", weight="medium"),
                rx.input(
                    placeholder="tu@email.com",
                    value=State.email,
                    on_change=State.set_email,
                    width="100%"
                ),
                rx.cond(
                    State.error_email != "",
                    rx.text(State.error_email, color="red", size="2")
                ),
                align="start",
                width="100%"
            ),
            
            rx.vstack(
                rx.text("Mensaje", size="3", weight="medium"),
                rx.text_area(
                    placeholder="Escribe tu mensaje aquí...",
                    value=State.mensaje,
                    on_change=State.set_mensaje,
                    width="100%",
                    min_height="120px"
                ),
                rx.cond(
                    State.error_mensaje != "",
                    rx.text(State.error_mensaje, color="red", size="2")
                ),
                align="start",
                width="100%"
            ),
            
            rx.button(
                rx.cond(
                    State.enviando,
                    rx.hstack(
                        rx.spinner(size="1"),
                        rx.text("Enviando..."),
                        spacing="2"
                    ),
                    "Enviar Mensaje"
                ),
                on_click=State.enviar_formulario,
                disabled=State.enviando,
                width="100%"
            ),
            
            spacing="4",
            width="100%",
            max_width="400px"
        ),
        
        spacing="6",
        padding="4",
        max_width="500px",
        margin="0 auto"
    )


def seccion_posts_api():
    """Sección de posts con Estado unificado"""
    return rx.vstack(
        rx.hstack(
            rx.heading("Posts del Blog", size="6"),
            rx.button(
                rx.cond(
                    State.cargando_posts,
                    rx.spinner(size="1"),
                    "Cargar Posts"
                ),
                on_click=State.cargar_posts,
                disabled=State.cargando_posts,
                variant="outline"
            ),
            justify="between",
            align="center",
            width="100%"
        ),
        
        rx.cond(
            State.error_posts != "",
            rx.callout(
                State.error_posts,
                icon="triangle_alert",
                color_scheme="red"
            )
        ),
        
        rx.cond(
            State.posts.length() > 0,
            rx.vstack(
                rx.foreach(
                    State.posts,
                    lambda post: rx.box(
                        rx.vstack(
                            rx.heading(post["title"], size="4"),
                            rx.text(post["body"], color="gray"),
                            rx.text(f"ID: {post['id']} | User ID: {post['userId']}", size="2", color="slate"),
                            align="start",
                            spacing="2"
                        ),
                        padding="4",
                        border="1px solid #e2e8f0",
                        border_radius="md",
                        width="100%"
                    )
                ),
                spacing="3",
                width="100%"
            ),
            rx.cond(
                ~State.cargando_posts & (State.error_posts == ""),
                rx.text("No hay posts cargados. Haz clic en 'Cargar Posts'", color="gray")
            )
        ),
        
        spacing="4",
        width="100%",
        max_width="600px"
    )


def seccion_usuarios_api():
    """Sección de usuarios con Estado unificado"""
    return rx.vstack(
        rx.hstack(
            rx.heading("Usuarios", size="6"),
            rx.button(
                rx.cond(
                    State.cargando_usuarios,
                    rx.spinner(size="1"),
                    "Cargar Usuarios"
                ),
                on_click=State.cargar_usuarios,
                disabled=State.cargando_usuarios,
                variant="outline"
            ),
            justify="between",
            align="center",
            width="100%"
        ),
        
        rx.cond(
            State.error_usuarios != "",
            rx.callout(
                State.error_usuarios,
                icon="triangle_alert",
                color_scheme="red"
            )
        ),
        
        rx.cond(
            State.usuarios.length() > 0,
            rx.grid(
                rx.foreach(
                    State.usuarios,
                    lambda usuario: rx.box(
                        rx.vstack(
                            rx.heading(usuario["name"], size="4"),
                            rx.text(f"@{usuario['username']}", color="blue"),
                            rx.text(usuario["email"], size="2"),
                            rx.text(f"Teléfono: {usuario['phone']}", size="2", color="gray"),
                            rx.text(f"Sitio web: {usuario['website']}", size="2", color="gray"),
                            align="start",
                            spacing="1"
                        ),
                        padding="3",
                        border="1px solid #e2e8f0",
                        border_radius="md",
                        width="100%"
                    )
                ),
                columns="2",
                spacing="3",
                width="100%"
            ),
            rx.cond(
                ~State.cargando_usuarios & (State.error_usuarios == ""),
                rx.text("No hay usuarios cargados. Haz clic en 'Cargar Usuarios'", color="gray")
            )
        ),
        
        spacing="4",
        width="100%",
        max_width="600px"
    )


def seccion_comentarios_api():
    """Sección de comentarios con Estado unificado"""
    return rx.vstack(
        rx.hstack(
            rx.heading("Comentarios", size="6"),
            rx.button(
                rx.cond(
                    State.cargando_comentarios,
                    rx.spinner(size="1"),
                    "Cargar Comentarios"
                ),
                on_click=State.cargar_comentarios,
                disabled=State.cargando_comentarios,
                variant="outline"
            ),
            justify="between",
            align="center",
            width="100%"
        ),
        
        rx.cond(
            State.error_comentarios != "",
            rx.callout(
                State.error_comentarios,
                icon="triangle_alert",
                color_scheme="red"
            )
        ),
        
        rx.cond(
            State.comentarios.length() > 0,
            rx.vstack(
                rx.foreach(
                    State.comentarios,
                    lambda comentario: rx.box(
                        rx.vstack(
                            rx.hstack(
                                rx.heading(comentario["name"], size="3"),
                                rx.text(f"Post #{comentario['postId']}", size="2", color="blue"),
                                justify="between",
                                align="center",
                                width="100%"
                            ),
                            rx.text(comentario["email"], size="2", color="gray"),
                            rx.text(comentario["body"], size="2"),
                            align="start",
                            spacing="2"
                        ),
                        padding="3",
                        border="1px solid #e2e8f0",
                        border_radius="md",
                        width="100%"
                    )
                ),
                spacing="3",
                width="100%"
            ),
            rx.cond(
                ~State.cargando_comentarios & (State.error_comentarios == ""),
                rx.text("No hay comentarios cargados. Haz clic en 'Cargar Comentarios'", color="gray")
            )
        ),
        
        spacing="4",
        width="100%",
        max_width="600px"
    )


def app_api_unificada():
    """Aplicación de API con Estado unificado"""
    return rx.vstack(
        rx.heading("Consumo de API Externa", size="8", text_align="center"),
        rx.text("JSONPlaceholder - API de prueba para desarrollo", size="4", color="gray", text_align="center"),
        
        rx.hstack(
            rx.button(
                "Limpiar Todos los Datos",
                on_click=State.limpiar_datos_api,
                variant="soft",
                color_scheme="red"
            ),
            justify="center",
            width="100%"
        ),
        
        rx.divider(),
        
        rx.tabs.root(
            rx.tabs.list(
                rx.tabs.trigger("Posts", value="posts"),
                rx.tabs.trigger("Usuarios", value="usuarios"),
                rx.tabs.trigger("Comentarios", value="comentarios"),
            ),
            rx.tabs.content(
                seccion_posts_api(),
                value="posts",
            ),
            rx.tabs.content(
                seccion_usuarios_api(),
                value="usuarios",
            ),
            rx.tabs.content(
                seccion_comentarios_api(),
                value="comentarios",
            ),
            default_value="posts",
            width="100%"
        ),
        
        spacing="6",
        padding="4",
        max_width="800px",
        margin="0 auto",
        width="100%"
    )


def index() -> rx.Component:
    """Página principal con selección de experiencias."""
    return rx.container(
        rx.color_mode.button(position="top-right"),
        rx.vstack(
            rx.heading("Sesión 08 - Reflex", size="9"),
            rx.text("Experiencias de Práctica con Estado", size="5", color="gray"),
            rx.divider(),
            
            rx.vstack(
                rx.link(
                    rx.button(
                        rx.vstack(
                            rx.heading("Experiencia 01", size="5"),
                            rx.text("Contador con Estado Local", size="3", color="gray"),
                            spacing="2",
                            align="center"
                        ),
                        width="100%",
                        max_width="400px",
                        height="80px",
                        variant="outline"
                    ),
                    href="/contador",
                    width="100%"
                ),
                
                rx.link(
                    rx.button(
                        rx.vstack(
                            rx.heading("Experiencia 02", size="5"),
                            rx.text("Lista de Tareas - Estado Global", size="3", color="gray"),
                            spacing="2",
                            align="center"
                        ),
                        width="100%",
                        max_width="400px",
                        height="80px",
                        variant="outline"
                    ),
                    href="/tareas",
                    width="100%"
                ),
                
                rx.link(
                    rx.button(
                        rx.vstack(
                            rx.heading("Experiencia 03", size="5"),
                            rx.text("Formulario con Validación", size="3", color="gray"),
                            spacing="2",
                            align="center"
                        ),
                        width="100%",
                        max_width="400px",
                        height="80px",
                        variant="outline"
                    ),
                    href="/formulario",
                    width="100%"
                ),
                
                rx.link(
                    rx.button(
                        rx.vstack(
                            rx.heading("Experiencia 04", size="5"),
                            rx.text("Consumo de API Externa", size="3", color="gray"),
                            spacing="2",
                            align="center"
                        ),
                        width="100%",
                        max_width="400px",
                        height="80px",
                        variant="outline"
                    ),
                    href="/api",
                    width="100%"
                ),
                spacing="4",
                width="100%",
                max_width="400px"
            ),
            
            spacing="6",
            justify="center",
            align="center",
            min_height="85vh",
        ),
    )


def pagina_contador() -> rx.Component:
    """Página de la experiencia del contador."""
    return rx.container(
        rx.color_mode.button(position="top-right"),
        rx.vstack(
            rx.link(
                rx.button("Volver al Menú", variant="ghost"),
                href="/"
            ),
            rx.heading("Experiencia 01: Contador", size="8"),
            rx.text("Estado Local con rx.State", size="4", color="gray"),
            rx.divider(),
            contador(),
            rx.divider(),
            rx.vstack(
                rx.heading("Qué aprendemos aquí", size="5"),
                rx.unordered_list(
                    rx.list_item("Crear componentes con estado local"),
                    rx.list_item("Usar rx.State para manejar variables"),
                    rx.list_item("Vincular eventos on_click a funciones de estado"),
                    rx.list_item("Actualización reactiva de la interfaz")
                ),
                align="start",
                width="100%",
                max_width="500px"
            ),
            spacing="6",
            justify="center",
            align="center",
            min_height="85vh",
        ),
    )


def pagina_tareas() -> rx.Component:
    """Página de la experiencia de lista de tareas."""
    return rx.container(
        rx.color_mode.button(position="top-right"),
        rx.vstack(
            rx.link(
                rx.button("Volver al Menú", variant="ghost"),
                href="/"
            ),
            rx.heading("Experiencia 02: Lista de Tareas", size="8"),
            rx.text("Estado Global Compartido", size="4", color="gray"),
            rx.divider(),
            app_tareas(),
            rx.divider(),
            rx.vstack(
                rx.heading("Qué aprendemos aquí", size="5"),
                rx.unordered_list(
                    rx.list_item("Estado global compartido entre componentes"),
                    rx.list_item("Sincronización automática de la UI"),
                    rx.list_item("Manejo de listas dinámicas"),
                    rx.list_item("Inputs controlados y validación"),
                    rx.list_item("Operaciones CRUD básicas")
                ),
                align="start",
                width="100%",
                max_width="500px"
            ),
            spacing="6",
            justify="center",
            align="center",
            min_height="85vh",
        ),
    )


def pagina_formulario() -> rx.Component:
    """Página de la experiencia del formulario de contacto."""
    return rx.container(
        rx.color_mode.button(position="top-right"),
        rx.vstack(
            rx.link(
                rx.button("Volver al Menú", variant="ghost"),
                href="/"
            ),
            rx.heading("Experiencia 03: Formulario de Contacto", size="8"),
            rx.text("Validación de Formularios en Reflex", size="4", color="gray"),
            rx.divider(),
            formulario_contacto(),
            rx.divider(),
            rx.vstack(
                rx.heading("Qué aprendemos aquí", size="5"),
                rx.unordered_list(
                    rx.list_item("Crear formularios con campos controlados"),
                    rx.list_item("Implementar validaciones en tiempo real"),
                    rx.list_item("Mostrar mensajes de error específicos"),
                    rx.list_item("Manejar el envío y estado del formulario"),
                    rx.list_item("Usar notificaciones toast"),
                    rx.list_item("Validar formatos (email, longitud, etc.)")
                ),
                align="start",
                width="100%",
                max_width="500px"
            ),
            spacing="6",
            justify="center",
            align="center",
            min_height="85vh",
        ),
    )


def pagina_api() -> rx.Component:
    """Página de la experiencia de consumo de API externa."""
    return rx.container(
        rx.color_mode.button(position="top-right"),
        rx.vstack(
            rx.link(
                rx.button("Volver al Menú", variant="ghost"),
                href="/"
            ),
            rx.heading("Experiencia 04: Consumo de API Externa", size="8"),
            rx.text("Integración con JSONPlaceholder API", size="4", color="gray"),
            rx.divider(),
            app_api_unificada(),
            rx.divider(),
            rx.vstack(
                rx.heading("Qué aprendemos aquí", size="5"),
                rx.unordered_list(
                    rx.list_item("Realizar solicitudes HTTP asíncronas con httpx"),
                    rx.list_item("Manejar respuestas JSON de APIs externas"),
                    rx.list_item("Implementar estados de carga y manejo de errores"),
                    rx.list_item("Mostrar datos dinámicos en la interfaz"),
                    rx.list_item("Organizar componentes con tabs"),
                    rx.list_item("Trabajar con APIs REST públicas")
                ),
                align="start",
                width="100%",
                max_width="500px"
            ),
            spacing="6",
            justify="center",
            align="center",
            min_height="85vh",
        ),
    )


app = rx.App()
app.add_page(index, route="/")
app.add_page(pagina_contador, route="/contador")
app.add_page(pagina_tareas, route="/tareas")
app.add_page(pagina_formulario, route="/formulario")
app.add_page(pagina_api, route="/api")
