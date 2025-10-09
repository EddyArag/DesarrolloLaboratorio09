import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  const nombre = 'Estudiante, Marcelo Avendaño'; // 2. Variable JavaScript

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* 1. Usar className */}
          <img src={logo} className="App-logo" alt="logo" />
          <p className="parrafo-bienvenida">
            ¡Bienvenido, {nombre}! {/* 2. Incrustar variable en JSX */}
          </p>
          {/* 3. Etiqueta autocerrada */}
          <br />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {/* 3. Otra etiqueta autocerrada */}
          <img src={logo} alt="logo pequeño" width={50} height={50} />
        </header>
        <nav>
          <Link to="/home">Inicio</Link> | <Link to="/about">Acerca de</Link>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;