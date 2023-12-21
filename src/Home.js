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
      <img className="d-block w-100" src={Slider1} style={{ height: "40rem" }} alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={Slider2}  style={{ height: "40rem" }} alt="Second slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={Slider4} style={{ height: "40rem" }} alt="Third slide"/>
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
  const [mostrarTarjetas, setMostrarTarjetas] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 10;

  const toggleTarjetas = () => {
    setMostrarTarjetas(!mostrarTarjetas);
  };
  
  useEffect(() => {
    postService.getAllInmuebles(currentPage, postsPerPage).then(
      (response) => {
        setPosts(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [currentPage]);

  function recortarUrl(url) {
    if (!url) {
      return null;
    }
    const imagenCadena = JSON.stringify(url);
    const partes = imagenCadena.split('\\');
    const ultimaPalabra = partes[partes.length - 1];
    const resultadoSinComillas = ultimaPalabra.replace(/["']/g, '');
    return resultadoSinComillas;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); 
  };



  return (
    <div>
      <div className="container-s">
      <div class="l-navbar mt-4" id="nav-bar">
        <div>
        <div style={{display:"flex"}}>
          <i class="fa-solid fa-filter mt-1" style={{fontSize:"20px"}}></i><h4 style={{ color: 'black', marginLeft:"5%", paddingBottom:"10%" }}>Filtros</h4>
        </div>
        <button className='btn-viewCards btn btn-secondary mb-3' onClick={toggleTarjetas} style={{width: "100%", fontSize: "15px"}}>
          {mostrarTarjetas ? <><i class="fa-solid fa-list"></i> Lista</> : <><i className="far fa-hard-drive"></i> Tarjetas</>}
        </button>
       </div>
        <div >
          <nav class="nav">
            <div>
              <div class="dropdown mb-5">
                <button style={{width: "100%", fontSize: "15px"}} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Ordenar por:
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Más reciente</a>
                  <a class="dropdown-item" href="#">Mejor valorado</a>
                </div>
              </div>
              <div class="nav_list" style={{borderTop:"1px solid"}}>
                <h5 className='text-center mt-2'>Filtrar por</h5>
                <div style={{borderBottom: "1px solid"}}>
                    <input type="checkbox" style={{width: "1rem", height: "1rem", verticalAlign: "middle"}}/>
                    <label className="ml-2 mt-2" style={{fontSize: "15px", verticalAlign: "middle"}}>Parrilla</label>
                </div>  
                <div style={{borderBottom: "1px solid"}}>
                    <input type="checkbox" style={{width: "1rem", height: "1rem", verticalAlign: "middle"}}/>
                    <label className="ml-2 mt-2" style={{fontSize: "15px", verticalAlign: "middle"}}>Piscina</label>
                </div>  
                <div style={{borderBottom: "1px solid"}}>
                    <input type="checkbox" style={{width: "1rem", height: "1rem", verticalAlign: "middle"}}/>
                    <label className="ml-2 mt-2" style={{fontSize: "15px", verticalAlign: "middle"}}>Wifi</label>
                </div>  
                <div style={{borderBottom: "1px solid"}}>
                    <input type="checkbox" style={{width: "1rem", height: "1rem", verticalAlign: "middle"}}/>
                    <label className="ml-2 mt-2" style={{fontSize: "15px", verticalAlign: "middle"}}>TV</label>
                </div>
              </div>
              <button className='btn-viewCards btn btn-secondary mt-5' style={{width: "100%", fontSize: "15px"}}>
                Filtrar
              </button>
              </div>
            </nav>
          </div>
         <div>
        </div>
      </div>
      {mostrarTarjetas ? (
        <div className='container-cards mt-2 mr-3 ml-3' style={{width: "100%"}}>
          {posts.length === 0 ? (
            <div>Cargando...</div>
          ) : (
            posts.map(inmueble => (
              <div className="col-12 col-md-6 col-lg-4" style={{display: "inline-block"}} key={inmueble.id}>
                <div className="card card-home" style={{marginTop: "6%"}}>
                  <Link to={`/InmuebleHome/${inmueble.id}`} style={{ textDecoration: 'none' }}>
                    <img
                      src={`img/Portadas/${recortarUrl(inmueble.portada)}`}
                      style={{ height: '10rem' }}
                      className="card-img-top"
                      alt=""
                    />
                    <div className="card-body">
                      <h5 className="card-title" style={{ color: 'black' }}>
                        {inmueble.titulo}
                      </h5>
                      <p className="card-text" style={{ color: 'black' }}>
                        {inmueble.localidad}
                      </p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <i className="fa-solid fa-person"></i> Max: {inmueble.cantidadPersonas}
                      </li>
                      <li className="list-group-item">
                        <i className="fa-solid fa-door-open"></i> {inmueble.habitaciones} hab.
                      </li>
                    </ul>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        
        <div className='container-list mr-3 mt-4' style={{ width: "100%" }}>
        {posts.length === 0 ? (
          <div>Cargando...</div>
        ) : (
          posts.map(inmueble => (
            <div className="col-12" key={inmueble.id}>
              <div className="card card-home mr-4 ml-4">
                <Link to={`/InmuebleHome/${inmueble.id}`} style={{ textDecoration: 'none' }}>
                  <div className="row g-0">
                    <div className="col-md-2">
                      <img src={`img/Portadas/${recortarUrl(inmueble.portada)}`} style={{width: "100%", height: '8rem' }} className="img-fluid rounded-start" alt="" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title" style={{ color: 'black' }}>{inmueble.titulo}</h5>
                        <p className="card-text" style={{ color: 'black' }}>{inmueble.localidad}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    )}
    </div>
    <nav aria-label="Page navigation example">
        <ul className="pagination mt-4" style={{ justifyContent: "center" }}>
          <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          </li>
          
          {[...Array(Math.ceil(posts.length / 5)).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(number + 1)}>{number + 1}</button>
            </li>
          ))}
          {console.log([...Array(Math.ceil(posts.length / 5)).keys()])}
          <li className={`page-item ${currentPage === Math.ceil(posts.length / 5) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
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



