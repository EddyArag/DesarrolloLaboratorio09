import React, { Component } from 'react';
// 3.a.4. Importe el componente 'Table'

import Table from './Table'; 

class App extends Component {
    render() {
        // 3.b.1. Define un arreglo de objetos ('characters')
        const characters = [
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
        ];

        return (
            <div className="AppContainer max-w-4xl mx-auto p-8">
                <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 border-b pb-2">
                    Práctica 03: Componentes y Props
                </h1>
                
                {/* 3.a.4. Renderice el componente 'Table' */}
                {/* 3.b.2. Pase el arreglo ('characters') como prop 'characterData' */}
                <Table characterData={characters} />
            </div>
        );
    }
}

export default App;
