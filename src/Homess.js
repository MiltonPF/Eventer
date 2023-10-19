import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from './service/API';
import postService from './service/post-service';

function obtenerNombreImagen(rutaCompleta) {
  const partesRuta = rutaCompleta.split('/');
  const nombreArchivo = partesRuta.pop();
  const nombreImagenConExtension = nombreArchivo.substring(nombreArchivo.lastIndexOf('/') + 1);
  return nombreImagenConExtension;
}



export function Cards() {
  const [posts, setPosts] = useState([]);
  const [inmuebles, setInmuebles] = useState([]);
  const [imagen, setimagen] = useState([]);
  const token = localStorage.getItem('token')

  useEffect(() => {
    postService.getAllInmuebles().then(
      (response) => {
        setPosts(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  console.log(imagenCadena)
  const imagenCadena = JSON.stringify(imagen);
  const imagenR = imagenCadena.replace(/\\/g, "/");
  const imagenRuta = imagenR.replace(/\"/g, "");
  console.log(imagenRuta)

  return (
    <div className="container-s">
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


export function Footer() {
  return(
    <footer class="bg-dark text-white py-4 footer">
  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <h5>Información</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida condimentum nunc, ut euismod turpis rutrum sed.</p>
      </div>
      <div class="col-lg-4 col-titulo">
        <h5>Titulo</h5>
        <ul class="list-unstyled text-footer">
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Acerca de Nosotros</a></li>
          <li><a href="#">Ejemplo</a></li>
          <li><a href="#">Ejemplo</a></li>
        </ul>
      </div>
      <div class="col-lg-4 footer-socialIcons">
        <h5>Contactanos</h5>
        <a href='#'><i class="fa-brands fa-facebook-f"></i></a>
        <a href='#'><i class="fa-brands fa-instagram"></i></a>
        <a href='#'><i class="fa-brands fa-twitter"></i></a>
        <a href='#'><i class="fa-brands fa-whatsapp"></i></a>
      </div>
    </div>
  </div>
</footer>
  )
}

