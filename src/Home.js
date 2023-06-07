import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from './service/API';

function obtenerNombreImagen(rutaCompleta) {
  const partesRuta = rutaCompleta.split('/');
  const nombreArchivo = partesRuta.pop();
  const nombreImagenConExtension = nombreArchivo.substring(nombreArchivo.lastIndexOf('/') + 1);
  return nombreImagenConExtension;
}



export function Cards() {
  const [inmuebles, setInmuebles] = useState([]);
  const [imagen, setimagen] = useState([]);

  useEffect(() => {
    const api2 = new API
    api2.fetchImage()
      .then(data => {
        console.log(data);
        setimagen(data.pathImagenes[0]);
      })
      .catch(error => {
        console.error(error);
      });
    const api = new API();
    api.fetchInmuebles()
      .then(data => {
        console.log(data);
        setInmuebles(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const imagenCadena = JSON.stringify(imagen);
  const imagenR = imagenCadena.replace(/\\/g, "/");
  const imagenRuta = imagenR.replace(/\"/g, "");

  return (
    <div className="container">
      <div className="row">
        {inmuebles.length === 0 ? (
          <div>Cargando...</div>
        ) : (
          inmuebles.map(inmueble => (
            <div className="col-12 col-md-6 col-lg-4" key={inmueble.id}>
              <div className="card">
                <img src={`./img/${obtenerNombreImagen(imagenRuta)}`} style={{ height: "10rem" }} className="card-img-top" alt="" />
                <div className="card-body">
                  <h5 className="card-title">{inmueble.nombre}</h5>
                  <p className="card-text">{inmueble.descripcion}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="fa-solid fa-person"></i> Max: 4
                  </li>
                  <li className="list-group-item">
                    <i className="fa-solid fa-door-open"></i> 3 amb.
                  </li>
                  <li className="list-group-item">
                    <i className="fa-solid fa-person-swimming"></i> NO
                  </li>
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
