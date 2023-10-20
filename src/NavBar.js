import React, { useEffect, useState } from 'react';
import './App.css';
import {useNavigate } from 'react-router-dom';
import Sesion_Usuario from './service/localSesion';
import postService from './service/post-service';


function NavBar() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const handleCerrarSesion = () => {
    postService.CerrarSesion().then(
      () => {
        //navigate('/');
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <nav className="navbar nv1 navbar-expand-lg">
      <div className="container-fluid cf1">
        <a className="navbar-brand" href=" "onClick={() => { navigate('/Home');}} role="button">
          LOGO
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fa-solid fa-bars fa-lg"></i>
        </button> 
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <input
              className="inp form-control me-2"
              type="search"
              placeholder="Buscar Propiedades..."
              aria-label="Search"
            />
            <button className="btn btn2 border" type="submit">
              Buscar
            </button>
          </form>
          <ul className="nvv navbar-nav ms-auto mb-2 mb-lg-0 btn-perfil">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Acerca de
              </a>
            </li>
            <li className="nav-item email-link ">
              <a className="nav-link " href="#" id="btn-perfil" role="button">
              {Sesion_Usuario()}  <i className="bi bi-person-circle"></i>
              </a>
              <ul className="menu-vertical" id="menu-vertical">
                <li>
                  <a href=" " onClick={() => { navigate('/Perfil');}} role="button">Perfil</a>
                </li>
                <li>
                  <a href="#">Texto de Ejemplo</a>
                </li>
                <li>
                  <a href=" " onClick={handleCerrarSesion}>Cerrar Sesion</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}



export default NavBar;
