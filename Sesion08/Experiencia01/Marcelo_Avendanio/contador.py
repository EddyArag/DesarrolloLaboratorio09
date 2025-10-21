import reflex as rx

class EstadoContador(rx.State):
    conteo: int = 0
    
    def incrementar(self):
        self.conteo += 1
        
    def disminuir(self):
        self.conteo -= 1

def contador():
    return rx.fragment(
        rx.hstack(
            rx.button("Incrementar", on_click=EstadoContador.incrementar),
            rx.text(EstadoContador.conteo),
            rx.button("Disminuir", on_click=EstadoContador.disminuir),
        )
    )
