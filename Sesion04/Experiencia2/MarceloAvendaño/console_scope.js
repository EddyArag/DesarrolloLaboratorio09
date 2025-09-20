// c) USO DE CONSOLELOG Y SCOPE

console.log(variableSinAsignar); // undefined
var variableSinAsignar;

// Crear funciones anidadas y verificar el alcance
function funcionExterna() {
    var variableExterna = "Soy externa";

    function funcionInterna() {
        var variableInterna = "Soy interna";
        console.log(variableExterna); // variable externa
        console.log(variableInterna); // variable interna
    }

    funcionInterna();
    // console.log(variableInterna); // Error: variableInterna is not defined
}

funcionExterna();
