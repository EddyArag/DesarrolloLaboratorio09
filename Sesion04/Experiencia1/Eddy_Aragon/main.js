
// Ejemplo: Mostrar información de un planeta al hacer clic en su nombre
document.querySelectorAll('#planetas ul li').forEach(function(li) {
    li.style.cursor = 'pointer';
    li.onclick = function() {
        alert(`Has seleccionado el planeta: ${li.textContent}`);
    };
});

// Ejemplo: Cambiar el color de fondo al pasar el mouse por la galería
const galeria = document.getElementById('galeria');
galeria.onmouseenter = function() {
    galeria.style.background = '    #6a879eff';
};
galeria.onmouseleave = function() {
    galeria.style.background = 'transparent';
};