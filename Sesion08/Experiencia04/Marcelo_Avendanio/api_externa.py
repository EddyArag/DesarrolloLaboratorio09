"""
    Experiencia 04: 
    Consumo de API Externa - Datos de JSONPlaceholder
"""

import reflex as rx
import httpx
import asyncio
from typing import List, Dict, Any


class EstadoAPI(rx.State):
    
    # Estado de los datos
    posts: List[Dict[str, Any]] = []
    usuarios: List[Dict[str, Any]] = []
    comentarios: List[Dict[str, Any]] = []
    
    # Estado de carga
    cargando_posts: bool = False
    cargando_usuarios: bool = False
    cargando_comentarios: bool = False
    
    # Estado de errores
    error_posts: str = ""
    error_usuarios: str = ""
    error_comentarios: str = ""
    
    # Configuración de la API
    BASE_URL: str = "https://jsonplaceholder.typicode.com"

    async def cargar_posts(self):
        """Cargar posts desde la API de JSONPlaceholder"""
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

    def limpiar_datos(self):
        self.posts = []
        self.usuarios = []
        self.comentarios = []
        self.error_posts = ""
        self.error_usuarios = ""
        self.error_comentarios = ""


def seccion_posts():
    return rx.vstack(
        rx.hstack(
            rx.heading("Posts del Blog", size="6"),
            rx.button(
                rx.cond(
                    EstadoAPI.cargando_posts,
                    rx.spinner(size="1"),
                    "Cargar Posts"
                ),
                on_click=EstadoAPI.cargar_posts,
                disabled=EstadoAPI.cargando_posts,
                variant="outline"
            ),
            justify="between",
            align="center",
            width="100%"
        ),
        
        rx.cond(
            EstadoAPI.error_posts != "",
            rx.callout(
                EstadoAPI.error_posts,
                icon="alert-triangle",
                color_scheme="red"
            )
        ),
        
        rx.cond(
            EstadoAPI.posts.length() > 0,
            rx.vstack(
                rx.foreach(
                    EstadoAPI.posts,
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
                ~EstadoAPI.cargando_posts & (EstadoAPI.error_posts == ""),
                rx.text("No hay posts cargados. Haz clic en 'Cargar Posts'", color="gray")
            )
        ),
        
        spacing="4",
        width="100%",
        max_width="600px"
    )


def seccion_usuarios():
    """Componente para mostrar usuarios"""
    return rx.vstack(
        rx.hstack(
            rx.heading("Usuarios", size="6"),
            rx.button(
                rx.cond(
                    EstadoAPI.cargando_usuarios,
                    rx.spinner(size="1"),
                    "Cargar Usuarios"
                ),
                on_click=EstadoAPI.cargar_usuarios,
                disabled=EstadoAPI.cargando_usuarios,
                variant="outline"
            ),
            justify="between",
            align="center",
            width="100%"
        ),
        

        rx.cond(
            EstadoAPI.error_usuarios != "",
            rx.callout(
                EstadoAPI.error_usuarios,
                icon="alert-triangle",
                color_scheme="red"
            )
        ),
        

        rx.cond(
            EstadoAPI.usuarios.length() > 0,
            rx.grid(
                rx.foreach(
                    EstadoAPI.usuarios,
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
                ~EstadoAPI.cargando_usuarios & (EstadoAPI.error_usuarios == ""),
                rx.text("No hay usuarios cargados. Haz clic en 'Cargar Usuarios'", color="gray")
            )
        ),
        
        spacing="4",
        width="100%",
        max_width="600px"
    )


def seccion_comentarios():
    """Componente para mostrar comentarios"""
    return rx.vstack(
        rx.hstack(
            rx.heading("Comentarios", size="6"),
            rx.button(
                rx.cond(
                    EstadoAPI.cargando_comentarios,
                    rx.spinner(size="1"),
                    "Cargar Comentarios"
                ),
                on_click=EstadoAPI.cargar_comentarios,
                disabled=EstadoAPI.cargando_comentarios,
                variant="outline"
            ),
            justify="between",
            align="center",
            width="100%"
        ),
        

        rx.cond(
            EstadoAPI.error_comentarios != "",
            rx.callout(
                EstadoAPI.error_comentarios,
                icon="alert-triangle",
                color_scheme="red"
            )
        ),
        

        rx.cond(
            EstadoAPI.comentarios.length() > 0,
            rx.vstack(
                rx.foreach(
                    EstadoAPI.comentarios,
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
                ~EstadoAPI.cargando_comentarios & (EstadoAPI.error_comentarios == ""),
                rx.text("No hay comentarios cargados. Haz clic en 'Cargar Comentarios'", color="gray")
            )
        ),
        
        spacing="4",
        width="100%",
        max_width="600px"
    )


def app_api():
    """Aplicación completa de consumo de API externa"""
    return rx.vstack(
        rx.heading("Consumo de API Externa", size="8", text_align="center"),
        rx.text("JSONPlaceholder - API de prueba para desarrollo", size="4", color="gray", text_align="center"),
        
        rx.hstack(
            rx.button(
                "Limpiar Todos los Datos",
                on_click=EstadoAPI.limpiar_datos,
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
                seccion_posts(),
                value="posts",
            ),
            rx.tabs.content(
                seccion_usuarios(),
                value="usuarios",
            ),
            rx.tabs.content(
                seccion_comentarios(),
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
