import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from './service/API';
import postService from './service/post-service';
import {useNavigate } from 'react-router-dom';
import Slider1 from './imgHome/Slider1.jpeg';
import Slider2 from './imgHome/Slider2.jpeg';
import Slider4 from './imgHome/Slider4.jpeg';
import { Link } from 'react-router-dom';


function obtenerNombreImagen(rutaCompleta) {
  const partesRuta = rutaCompleta.split('/');
  const nombreArchivo = partesRuta.pop();
  const nombreImagenConExtension = nombreArchivo.substring(nombreArchivo.lastIndexOf('/') + 1)
  return nombreImagenConExtension;
}


export function Slider() {
  return (
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src={Slider1} style={{ height: "20rem" }} alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={Slider2}  style={{ height: "20rem" }} alt="Second slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={Slider4} style={{ height: "20rem" }} alt="Third slide"/>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
  )
}


export function Cards(idInmueble) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [inmuebles, setInmuebles] = useState([]);

  useEffect(() => {
    postService.getAllInmuebles().then(
      (response) => {
        setPosts(response.data);
        console.log(response)
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  function recortarUrl(url) {
    const imagenCadena = JSON.stringify(url);
    const imagenR = imagenCadena.replace(/\\/g, "/");
    const imagenR2 = imagenR.replace(/]/g, "");
    const imagenRuta = imagenR2.replace(/\"/g, "");
    return imagenRuta
  }

  return (
    <div className="container-s">
      <div className="row">
        {posts.length === 0 ? (
          <div>Cargando...</div>
        ) : (
          posts.map(inmueble => (
            <div className="col-12 col-md-6 col-lg-4" key={inmueble.id}>
              <div className="card">
               <Link to={`/InmuebleHome/${inmueble.id}`} style={{ textDecoration: 'none' }}>
                  <img src={`img/${obtenerNombreImagen(recortarUrl(inmueble.filePath))}`} style={{ height: "10rem" }} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title"  style={{ color: 'black' }}>{inmueble.titulo}</h5>
                    <p className="card-text"  style={{ color: 'black' }}>{inmueble.localidad}</p>
                    {/*<p className="card-text">{inmueble.descripcion}</p> */}
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
                </Link>
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
    <footer className="bg-dark text-white py-4 footer">
  <div className="container">
    <div className="row">
      <div className="col-lg-4">
        <h5>Información</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida condimentum nunc, ut euismod turpis rutrum sed.</p>
      </div>
      <div className="col-lg-4 col-titulo">
        <h5>Titulo</h5>
        <ul className="list-unstyled text-footer">
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Acerca de Nosotros</a></li>
          <li><a href="#">Ejemplo</a></li>
          <li><a href="#">Ejemplo</a></li>
        </ul>
      </div>
      <div className="col-lg-4 footer-socialIcons">
        <h5>Contactanos</h5>
        <a href='#'><i className="fa-brands fa-facebook-f"></i></a>
        <a href='#'><i className="fa-brands fa-instagram"></i></a>
        <a href='#'><i className="fa-brands fa-twitter"></i></a>
        <a href='#'><i className="fa-brands fa-whatsapp"></i></a>
      </div>
    </div>
  </div>
</footer>
  )
}



