import React, { useEffect, useState } from 'react';
import {  Routes,Route, Link, useNavigate } from 'react-router-dom';
import API from './service/API';
import { useLocation} from 'react-router-dom';
import axios from 'axios';

export function Pagina1() {
  const api = new API();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.PostInmuebles(formData);
      const inmuebleId = response.id;
      console.log(response);

      //buscar la casa
      api.BuscarInmueble(formData.nombre) // Realiza la búsqueda después de agregar los datos
      .then(data => {
        console.log(data);
        setFormData(data); // Actualiza los datos filtrados en el estado
      })
      .catch(error => {
        console.error(error);
      });
      // Aquí puedes realizar alguna acción adicional después de agregar los datos, como redirigir a otra página
      navigate("/CargarImg", { state: { inmuebleId, formData } }); // Redirige a la página 2 después de agregar los datos exitosamente
    } catch (error) {
      console.error(error);
      // Maneja el error de acuerdo a tus necesidades, como mostrar un mensaje de error al usuario
    }
  };

  return(
    <div>
    <form onSubmit={handleSubmit}>
      Nombre de la Casa: <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
      Descripcion: <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} />
      {/* ... otros campos del formulario */}
      <button type="submit">Enviar</button>
    </form>
  </div>

  )
}

export function Pagina2() {
  const [image, setImage] = useState([]);
  const location = useLocation();
  const { inmuebleId, formData } = location.state;

  function handleImage(e) {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  }

  function PostImagen() {
    const formData1 = new FormData();
    formData1.append("files", image);
    formData1.append("idInmueble", inmuebleId);

    axios
      .post("http://localhost:8080/api/imagen", formData1)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <h2>Página 2</h2>
      <p>Has llegado a la segunda página.</p>
      <p>ID del Inmueble: {inmuebleId}</p>
      <p>Nombre: {formData.nombre}</p>
      <p>Descripción: {formData.descripcion}</p>
      <input type="file" name="file" onChange={handleImage} />
      <button onClick={PostImagen}>Enviar</button>
    </div>
  );
}




export function Rutas(){
    const navigate = useNavigate();

    const handleButtonClick2 = () => {
        navigate("/CargarImg");
    };
    const handleButtonClick1 = () => {
        navigate("/");
    };
    return(
  <div>
    <button onClick={handleButtonClick2}>Ir 2 pagina</button>
    <button onClick={handleButtonClick1}>Ir 1 pagina</button>
  </div>)
};