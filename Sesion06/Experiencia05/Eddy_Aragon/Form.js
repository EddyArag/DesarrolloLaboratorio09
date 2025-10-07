import React, { Component } from 'react';

class Form extends Component {
    
    // 4.c.2. Define un estado inicial dentro de Form.js
    initialState = {
        name: '',
        job: '',
    };

    // Inicializa el estado usando el objeto initialState
    state = this.initialState;

    // 4.c.3. Implementa la función 'handleChange' para actualizar el estado local
    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    };

    // 4.c.4. Función de envío que dispara la función 'handleSubmit' de App.js
    submitForm = () => {
        // Llama a la prop (función) que viene de App.js para actualizar el estado global
        this.props.handleSubmit(this.state);
        
        // Limpia el formulario volviendo al estado inicial
        this.setState(this.initialState);
    };

    render() {
        const { name, job } = this.state;

        return (
            <form className="bg-white p-6 rounded-lg shadow-xl">
                <div className="mb-4">
                    <label 
                        htmlFor="name" 
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={this.handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ej: Eddy"
                    />
                </div>

                <div className="mb-6">
                    <label 
                        htmlFor="job" 
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Trabajo
                    </label>
                    <input
                        type="text"
                        name="job"
                        id="job"
                        value={job}
                        onChange={this.handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ej: Desarrollador"
                    />
                </div>

                {/* 4.c.4. Agrega el input de tipo 'button' con un 'onClick' */}
                <input
                    type="button"
                    value="Submit"
                    onClick={this.submitForm}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition duration-150"
                />
            </form>
        );
    }
}

export default Form;
