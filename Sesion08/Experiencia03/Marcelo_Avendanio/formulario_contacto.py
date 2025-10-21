import reflex as rx

class EstadoFormulario(rx.State):
    """Estado para el formulario de contacto con validaciones mejoradas"""
    nombre: str = ""
    email: str = ""
    mensaje: str = ""
    form_submitted: bool = False
    form_errors: dict[str, str] = {}
    
    def set_nombre(self, valor: str):
        self.nombre = valor
        # Limpiar error cuando el usuario empiece a escribir
        if "nombre" in self.form_errors:
            del self.form_errors["nombre"]
    
    def set_email(self, valor: str):
        self.email = valor
        # Limpiar error cuando el usuario empiece a escribir
        if "email" in self.form_errors:
            del self.form_errors["email"]
    
    def set_mensaje(self, valor: str):
        self.mensaje = valor
        # Limpiar error cuando el usuario empiece a escribir
        if "mensaje" in self.form_errors:
            del self.form_errors["mensaje"]
    
    def validar_formulario(self) -> bool:
        """Validar todos los campos del formulario"""
        self.form_errors = {}
        
        # Validar nombre
        if not self.nombre.strip():
            self.form_errors["nombre"] = "El nombre es obligatorio"
        elif len(self.nombre.strip()) < 2:
            self.form_errors["nombre"] = "El nombre debe tener al menos 2 caracteres"
        
        # Validar email
        if not self.email.strip():
            self.form_errors["email"] = "El email es obligatorio"
        elif "@" not in self.email or "." not in self.email.split("@")[-1]:
            self.form_errors["email"] = "Formato de email inválido (debe contener @ y dominio válido)"
        
        # Validar mensaje
        if not self.mensaje.strip():
            self.form_errors["mensaje"] = "El mensaje es obligatorio"
        elif len(self.mensaje.strip()) < 10:
            self.form_errors["mensaje"] = "El mensaje debe tener al menos 10 caracteres"
        
        return len(self.form_errors) == 0
    
    def enviar_formulario(self):
        """Procesar el envío del formulario"""
        if self.validar_formulario():
            self.form_submitted = True
            return rx.toast.success(
                f"¡Formulario enviado correctamente! Gracias {self.nombre}",
                position="top-right",
                duration=4000
            )
        else:
            return rx.toast.error(
                "Por favor, corrige los errores en el formulario",
                position="top-right",
                duration=3000
            )
    
    def limpiar_formulario(self):
        """Limpiar todos los campos del formulario"""
        self.nombre = ""
        self.email = ""
        self.mensaje = ""
        self.form_submitted = False
        self.form_errors = {}


def formulario_contacto():
    """Componente del formulario de contacto con validaciones"""
    return rx.cond(
        EstadoFormulario.form_submitted,
        # Pantalla de éxito
        rx.vstack(
            rx.heading("Formulario Enviado!", size="7", color="green"),
            rx.text(f"Gracias {EstadoFormulario.nombre}, hemos recibido tu mensaje.", size="4"),
            rx.vstack(
                rx.text("Resumen de datos enviados:", font_weight="bold", size="4"),
                rx.vstack(
                    rx.hstack(
                        rx.text("Nombre:", font_weight="bold"),
                        rx.text(EstadoFormulario.nombre),
                        spacing="2"
                    ),
                    rx.hstack(
                        rx.text("Email:", font_weight="bold"),
                        rx.text(EstadoFormulario.email),
                        spacing="2"
                    ),
                    rx.hstack(
                        rx.text("Mensaje:", font_weight="bold"),
                        rx.text(EstadoFormulario.mensaje),
                        spacing="2"
                    ),
                    align="start",
                    spacing="2"
                ),
                border="1px solid #e2e8f0",
                border_radius="md",
                padding="4",
                background="gray.50",
                width="100%"
            ),
            rx.button(
                "Enviar otro mensaje",
                on_click=EstadoFormulario.limpiar_formulario,
                variant="outline",
                size="3"
            ),
            spacing="5",
            align="center",
            max_width="500px",
            width="100%"
        ),
        # Formulario principal
        rx.form(
            rx.vstack(
                rx.heading("Formulario de Contacto", size="7"),
                rx.text("Completa todos los campos para enviar tu mensaje", size="4", color="gray"),
                
                # Campo Nombre
                rx.vstack(
                    rx.text("Nombre completo *", font_weight="bold"),
                    rx.input(
                        placeholder="Ej: Juan Pérez",
                        value=EstadoFormulario.nombre,
                        on_change=EstadoFormulario.set_nombre,
                        width="100%",
                        border_color=rx.cond(
                            EstadoFormulario.form_errors.contains("nombre"),
                            "red.500",
                            "gray.300"
                        )
                    ),
                    rx.cond(
                        EstadoFormulario.form_errors.contains("nombre"),
                        rx.text(
                            EstadoFormulario.form_errors["nombre"],
                            color="red.500",
                            size="2"
                        )
                    ),
                    width="100%",
                    align="start"
                ),
                
                # Campo Email
                rx.vstack(
                    rx.text("Correo electrónico *", font_weight="bold"),
                    rx.input(
                        placeholder="Ej: juan@ejemplo.com",
                        value=EstadoFormulario.email,
                        on_change=EstadoFormulario.set_email,
                        width="100%",
                        border_color=rx.cond(
                            EstadoFormulario.form_errors.contains("email"),
                            "red.500",
                            "gray.300"
                        )
                    ),
                    rx.cond(
                        EstadoFormulario.form_errors.contains("email"),
                        rx.text(
                            EstadoFormulario.form_errors["email"],
                            color="red.500",
                            size="2"
                        )
                    ),
                    width="100%",
                    align="start"
                ),
                
                # Campo Mensaje
                rx.vstack(
                    rx.text("Mensaje *", font_weight="bold"),
                    rx.text_area(
                        placeholder="Escribe tu mensaje aquí... (mínimo 10 caracteres)",
                        value=EstadoFormulario.mensaje,
                        on_change=EstadoFormulario.set_mensaje,
                        width="100%",
                        height="120px",
                        border_color=rx.cond(
                            EstadoFormulario.form_errors.contains("mensaje"),
                            "red.500",
                            "gray.300"
                        )
                    ),
                    rx.cond(
                        EstadoFormulario.form_errors.contains("mensaje"),
                        rx.text(
                            EstadoFormulario.form_errors["mensaje"],
                            color="red.500",
                            size="2"
                        )
                    ),
                    width="100%",
                    align="start"
                ),
                
                # Información de caracteres
                rx.text(
                    f"Caracteres en mensaje: {EstadoFormulario.mensaje.length()}/10 mínimo",
                    size="2",
                    color="gray"
                ),
                
                # Botones
                rx.hstack(
                    rx.button(
                        "Limpiar",
                        on_click=EstadoFormulario.limpiar_formulario,
                        variant="outline",
                        type="button"
                    ),
                    rx.button(
                        "Enviar Mensaje",
                        on_click=EstadoFormulario.enviar_formulario,
                        disabled=~(EstadoFormulario.nombre.strip() & EstadoFormulario.email.strip() & EstadoFormulario.mensaje.strip()),
                        type="submit"
                    ),
                    spacing="3",
                    justify="end",
                    width="100%"
                ),
                
                spacing="4",
                width="100%"
            ),
            width="100%",
            max_width="500px"
        )
    )


def app_formulario():
    """Aplicación completa del formulario de contacto"""
    return rx.vstack(
        formulario_contacto(),
        spacing="6",
        padding="4",
        max_width="600px",
        margin="0 auto",
        width="100%"
    )
