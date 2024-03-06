import React, { useState, useEffect } from 'react';
import './ListaVideojuegos.css'; // Importa el archivo CSS
import data from './data.json';

const ListaVideojuegos = ({ categorias }) => {
  const [videojuegos, setVideojuegos] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [plataformasSeleccionadas, setPlataformasSeleccionadas] = useState([]);

  const plataformas = [
    "PC",
    "PS5",
    "Xbox One",
    "Switch",
    "Android",
    "iOS"
  ];

  useEffect(() => {
    setVideojuegos(data.videojuegos);
  }, []);

  const toggleCategoria = (categoria) => {
    if (categoriasSeleccionadas.includes(categoria)) {
      setCategoriasSeleccionadas(categoriasSeleccionadas.filter(cat => cat !== categoria));
      setPlataformasSeleccionadas([]);
    } else {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
    }
  };

  const togglePlataforma = (plataforma) => {
    if (plataformasSeleccionadas.includes(plataforma)) {
      setPlataformasSeleccionadas(plataformasSeleccionadas.filter(plat => plat !== plataforma));
    } else {
      setPlataformasSeleccionadas([...plataformasSeleccionadas, plataforma]);
    }
  };

  const handleDelete = (id) => {
    setVideojuegos(videojuegos.filter(videojuego => videojuego.id !== id));
    
    const newData = { ...data, videojuegos: data.videojuegos.filter(videojuego => videojuego.id !== id) };
    
    fetch('/guardar-data', {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        console.log('Los datos se han guardado correctamente.');
      } else {
        console.error('Error al guardar los datos.');
      }
    })
    .catch(error => {
      console.error('Error al guardar los datos:', error);
    });
  };

  return (
    <div className="ListaVideojuegos">
      <h1 style={{ fontSize: 50 }}>LISTA DE VIDEOJUEGOS</h1>
      <br></br>
      <br></br>
      <div className="Categorias">
        {categorias.map(categoria => (
          <label key={categoria}>
            <input
              type="checkbox"
              checked={categoriasSeleccionadas.includes(categoria)}
              onChange={() => toggleCategoria(categoria)}
            />
            {categoria}
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
      <br></br>
      <br></br>
      <div className="Plataformas">
        {plataformas.map(plataforma => (
          <label key={plataforma}>
            <input
              type="checkbox"
              checked={plataformasSeleccionadas.includes(plataforma)}
              onChange={() => togglePlataforma(plataforma)}
            />
            {plataforma}
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
      <br></br>
      <br></br>
      <div>
        {videojuegos
          .filter(videojuego => {
            if (categoriasSeleccionadas.length === 0) return true;
            return videojuego.categorias.some(cat => categoriasSeleccionadas.includes(cat));
          })
          .filter(videojuego => {
            if (plataformasSeleccionadas.length === 0) return true;
            return videojuego.plataformas.some(plat => plataformasSeleccionadas.includes(plat));
          })
          .map(videojuego => (
            <div key={videojuego.id} className="Videojuego">
              <h2>{videojuego.nombre}</h2>
              <img src={videojuego.imagen_url} alt={videojuego.nombre} />
              <p><span className="negrita">Descripción: </span> {videojuego.descripcion}</p>
              <p><span className="negrita">Plataformas: </span> {videojuego.plataformas.join(', ')}</p>
              <p><span className="negrita">Precio: </span> {videojuego.precio}</p>
              <button onClick={() => handleDelete(videojuego.id)}>Borrar</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListaVideojuegos;
