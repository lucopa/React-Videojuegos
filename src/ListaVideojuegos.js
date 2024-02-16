import React, { useState, useEffect } from 'react';
import './ListaVideojuegos.css'; // Importa el archivo CSS
import data from './data.json';

const ListaVideojuegos = ({ categorias }) => {
  const [videojuegos, setVideojuegos] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

  useEffect(() => {
    setVideojuegos(data.videojuegos);
  }, []);

  const toggleCategoria = (categoria) => {
    if (categoriasSeleccionadas.includes(categoria)) {
      setCategoriasSeleccionadas(categoriasSeleccionadas.filter(cat => cat !== categoria));
    } else {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
    }
  };

  return (
    <div className="ListaVideojuegos"> {}
    <h1 style={{ fontSize:50 }}>LISTA DE VIDEOJUEGOS</h1>
    <br></br>
    <br></br>
      <div className="Categorias"> {}
        {}
        {categorias.map(categoria => (
          <label key={categoria}>
            <input
              type="checkbox"
              checked={categoriasSeleccionadas.includes(categoria)}
              onChange={() => toggleCategoria(categoria)}
            />
            {categoria}
          </label>
        ))}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        {}
        {videojuegos
          .filter(videojuego => categoriasSeleccionadas.length === 0 || videojuego.categorias.some(cat => categoriasSeleccionadas.includes(cat)))
          .map(videojuego => (
            <div key={videojuego.id} className="Videojuego"> {}
              <h2>{videojuego.nombre}</h2>
              <img src={videojuego.imagen_url} alt={videojuego.nombre} />
              <p><span className="negrita">Descripción: </span> {videojuego.descripcion}</p>
              <p><span className="negrita">Plataformas: </span> {videojuego.plataformas.join(', ')}</p>
              <p><span className="negrita">Precio: </span> {videojuego.precio}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListaVideojuegos;
