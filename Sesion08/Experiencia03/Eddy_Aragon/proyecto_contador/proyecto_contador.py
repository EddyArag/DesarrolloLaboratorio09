import reflex as rx

# --- Inicio del Código de la Práctica 3 ---
# [cite: 527-561]

# 1. Definir el Estado del Formulario
class EstadoFormulario(rx.State):
    """Estado para manejar los campos del formulario."""
    
    # Variables de estado definidas a nivel de clase
    nombre: str = ""
    email: str = ""
    mensaje: str = ""

    # Setters para vincular a los inputs (método moderno)
    def set_nombre(self, valor: str):
        self.nombre = valor

    def set_email(self, valor: str):
        self.email = valor

    def set_mensaje(self, valor: str):
        self.mensaje = valor

    # 3. Manejar el envío y la validación
    def enviar_formulario(self):
        """
        Valida el email y muestra un mensaje.
        """
        # 2. Implementar validación básica
        if "@" not in self.email: #
            # Usamos window_alert (estándar) en lugar de notify
            return rx.window_alert("Error: Dirección de correo electrónico no válida") #
        else:
            #
            return rx.window_alert("Formulario enviado correctamente") 

# 1. Crear el componente FormularioContacto
def formulario_contacto():
    """Componente visual del formulario."""
    return rx.fragment(
        rx.heading("Formulario de Contacto"), #
        
        # rx.form envuelve los campos
        rx.form(
            rx.vstack( # Apila los campos verticalmente
                rx.input(
                    placeholder="Nombre", #
                    # Vincula on_change al setter
                    on_change=EstadoFormulario.set_nombre, #
                ),
                rx.input(
                    placeholder="Correo electrónico", #
                    on_change=EstadoFormulario.set_email, #
                ),
                
                # --- LÍNEA CORREGIDA ---
                # Se cambió rx.textarea por rx.text_area
                rx.text_area(
                    placeholder="Mensaje", #
                    on_change=EstadoFormulario.set_mensaje, #
                ),
                # --- FIN DE LA CORRECCIÓN ---

                rx.button(
                    "Enviar", 
                    on_click=EstadoFormulario.enviar_formulario #
                ),
                # Usamos la escala numérica para el espaciado
                spacing="4", 
            ),
        )
    )

# --- Página Principal ---
@rx.page(route="/")
def index():
    # Centramos el formulario
    return rx.container(
        formulario_contacto(),
        padding_top="5", # Usa escala numérica
        max_width="600px"
    )

# --- Configuración final de la App ---
app = rx.App()
app.add_page(index)