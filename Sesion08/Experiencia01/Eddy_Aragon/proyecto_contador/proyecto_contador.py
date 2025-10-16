import reflex as rx

# 2. Implementar el estado local [cite: 462]
class EstadoContador(rx.State):
    
    # --- LA CORRECCIÓN ESTÁ AQUÍ ---
    # Declaramos 'conteo' a nivel de clase, con su valor inicial.
    # Esto reemplaza al bloque __init__ del ejemplo de la guía [cite: 467-469].
    conteo: int = 0
    # --- FIN DE LA CORRECCIÓN ---

    # 3. Vincular botones a funciones de estado [cite: 463]
    def incrementar(self):
        self.conteo += 1 # [cite: 470]

    def disminuir(self):
        self.conteo -= 1 # [cite: 471]

# 1. Crear un componente `Contador` [cite: 461]
def contador(): # [cite: 472]
    return rx.fragment( # [cite: 473]
        rx.hstack( # [cite: 474]
            rx.button("Incrementar", on_click=EstadoContador.incrementar), # [cite: 476]
            rx.text(EstadoContador.conteo), # [cite: 476]
            rx.button("Disminuir", on_click=EstadoContador.disminuir), # [cite: 477]
        )
    )

# --- Configuración final de la App ---
# (Esto es necesario para que reflex run funcione)
app = rx.App()
app.add_page(contador, route="/")