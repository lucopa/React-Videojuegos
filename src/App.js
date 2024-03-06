
import React, { useState, useEffect } from 'react';
import ListaVideojuegos from './ListaVideojuegos';
import SearchBar from './SearchBar'; 
import data from './data.json';

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
  const [videojuegos, setVideojuegos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setVideojuegos(data.videojuegos);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} /> 
      <ListaVideojuegos videojuegos={videojuegos} categorias={categorias} searchQuery={searchQuery} />
    </div>
  );
}

export default App;
