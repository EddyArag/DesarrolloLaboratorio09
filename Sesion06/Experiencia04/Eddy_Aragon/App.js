import React, { Component } from 'react';
import Table from './Table'; 
import Form from './Form'; // Lo importamos para la Práctica 4.c

class App extends Component {
    
    // 4.a.1. Inicialización del Estado
    constructor(props) {
        super(props);
        this.state = {
            // Mover el arreglo de datos ('characters') a un objeto de estado
            characters: [
                {
                    name: 'Charlie',
                    job: 'Janitor',
                },
                {
                    name: 'Mac',
                    job: 'Bouncer',
                },
                {
                    name: 'Dee',
                    job: 'Aspirator',
                },
                {
                    name: 'Dennis',
                    job: 'Bartender',
                },
            ],
        };
    }

    // 4.a.2. Método para eliminar un carácter por índice
    removeCharacter = (index) => {
        const { characters } = this.state;

        // 4.a.3. Usa this.setState() y filter() para devolver una nueva matriz sin el elemento
        this.setState({
            characters: characters.filter((character, i) => {
                return i !== index;
            }),
        });
        console.log(`Carácter en el índice ${index} eliminado.`);
    }

    // 4.c.5. Función para actualizar el estado principal agregando el nuevo carácter
    handleSubmit = (character) => {
        this.setState({ characters: [...this.state.characters, character] });
        console.log(`Nuevo carácter agregado: ${character.name}`);
    }

    render() {
        const { characters } = this.state;

        return (
            <div className="AppContainer max-w-4xl mx-auto p-8">
                <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 border-b pb-2">
                    Práctica 04: Estado, Funciones y Formularios
                </h1>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">Lista de Caracteres</h2>
                
                {/* 4.b.1. Pasar la función 'removeCharacter' al componente 'Table' como una prop */}
                <Table 
                    characterData={characters} 
                    removeCharacter={this.removeCharacter} 
                />

                <h2 className="text-2xl font-semibold mt-12 mb-4">Agregar Nuevo Carácter</h2>
                
                {/* 4.c.5. Pasar handleSubmit a Form para que pueda actualizar el estado principal */}
                <Form handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default App;
