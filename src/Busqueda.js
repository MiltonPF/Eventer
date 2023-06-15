import React, { useState } from 'react';
import axios from 'axios';

function BuscarInmuebles() {
  const [nombre, setNombre] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscarInmuebles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/inmueble/getAll');
      const data = response.data;
      const inmueblesFiltrados = data.filter((inmueble) => inmueble.nombre.includes(nombre));
      setResultados(inmueblesFiltrados);
    } catch (error) {
      console.error('Error al buscar inmuebles:', error);
    }
  };

  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscarInmuebles();
  };

  return (
    <div>
      <h1>Buscar Inmuebles</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nombre} onChange={handleChangeNombre} placeholder="Nombre del inmueble" />
        <button type="submit">Buscar</button>
      </form>
      <div>
        {resultados.length > 0 ? (
          <ul>
            {resultados.map((inmueble) => (
              <li key={inmueble.id}>
                <p>Nombre: {inmueble.nombre}</p>
                <p>Descripcion: {inmueble.descripcion}</p>
                {/* Mostrar más información del inmueble */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}

export default BuscarInmuebles;
