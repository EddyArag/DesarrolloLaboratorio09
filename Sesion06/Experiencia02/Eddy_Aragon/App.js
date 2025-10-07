import React, { Component } from 'react';
// import './App.css'; // Si tu proyecto lo tiene, puedes dejarlo o comentarlo

class App extends Component {
    render() {
        // 2.b.2. Crea una variable de JavaScript e incrústela
        const nombre = 'Estudiante Eddy';

        return (
            // 2.b.1. Agrega una clase CSS utilizando la sintaxis 'className'
            <div className="AppContainer bg-gray-100 p-8 rounded-xl shadow-lg max-w-lg mx-auto mt-10">
                
                <header className="App-header text-center">
                    
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">
                        Práctica 02: Sintaxis JSX
                    </h1>
                    
                    {/* 2.b.2. Incrusta la variable usando llaves ({}) */}
                    <p className="text-gray-700">
                        ¡Bienvenido, {nombre}! El valor de la variable fue inyectado aquí.
                    </p>
                    
                    {/* 2.b.3. Agrega una etiqueta autocerrada (salto de línea) */}
                    <br /> 
                    
                    <p className="text-sm text-gray-500 italic">
                        Nota: La etiqueta de salto de línea (`<br />`) y las imágenes deben ser autocerradas en JSX.
                    </p>
                </header>
            </div>
        );
    }
}

export default App;