import React from 'react';
import ListaVideojuegos from './ListaVideojuegos';

const categorias = [
  "Lucha",
  "Arcade",
  "Plataformas",
  "Shooter",
  "Estrategia",
  "Simulación",
  "Deporte",
  "Aventura",
  "Rol",
  "Educación",
  "Puzzle"
];

function App() {
  return (
    <div className="App">
      <ListaVideojuegos categorias={categorias} />
    </div>
  );
}

export default App;
