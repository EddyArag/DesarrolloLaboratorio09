import reflex as rx

# 2. Implementar el estado local [cite: 462]
class EstadoContador(rx.State):

    conteo: int = 0
    # --- FIN DE LA CORRECCIÓN ---

    # 3. Vincular botones a funciones de estado
    def incrementar(self):
        self.conteo += 1 

    def disminuir(self):
        self.conteo -= 1 

# 1. Crear un componente `Contador` 
def contador(): 
    return rx.fragment( 
        rx.hstack(
            rx.button("Incrementar", on_click=EstadoContador.incrementar), 
            rx.text(EstadoContador.conteo),
            rx.button("Disminuir", on_click=EstadoContador.disminuir), 
        )
    )

# --- Configuración final de la App ---
# (Esto es necesario para que reflex run funcione)
app = rx.App()
app.add_page(contador, route="/")