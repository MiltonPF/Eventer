import React, { useState } from "react";
import postService from '../service/post-service';

function AgregarInmuebleForm() {
  const [nuevoInmuebleData, setNuevoInmuebleData] = useState({
    nombre: "",
    descripcion: "",
    // Agrega otros campos aquí
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoInmuebleData({
      ...nuevoInmuebleData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postService
      .AgregarInmueble(nuevoInmuebleData)
      .then((response) => {
        // Manejar la respuesta si es necesario
        console.log("Inmueble agregado exitosamente");
        
      })
      .catch((error) => {
        // Manejar los errores si es necesario
        console.error("Error al agregar el inmueble", error);
      });
  };

  return (
    <div>
      <h2>Agregar Nuevo Inmueble</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nuevoInmuebleData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={nuevoInmuebleData.descripcion}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Agrega otros campos de entrada aquí */}

        <button type="submit">Agregar Inmueble</button>
      </form>
    </div>
  );
}

export default AgregarInmuebleForm;
