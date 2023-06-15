import React, { useEffect } from 'react';
import './App.css';

function NavBar() {
  useEffect(() => {
    // Obtén las referencias a los elementos del DOM
    const menuToggle = document.getElementById('btn-perfil');
    const menu = document.getElementById('menu-vertical');

    // Agrega un evento click al botón del menú
    menuToggle.addEventListener('click', function () {
      if (menu.style.display === 'none') {
        menu.style.display = 'block';
      } else {
        menu.style.display = 'none';
      }
    });

    return () => {
      // Eliminar el event listener al desmontar el componente
      menuToggle.removeEventListener('click');
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          LOGO
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <form className="d-flex" role="search">
            <input
              className="inp form-control me-2"
              type="search"
              placeholder="Buscar Propiedades..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
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
            <li className="nav-item ">
              <a className="nav-link" href="#" id="btn-perfil" role="button">
                Usuario1<i className="bi bi-person-circle"></i>
              </a>
              <ul className="menu-vertical" id="menu-vertical" style={{ display: "none" }}>
                <li>
                  <a href="#">Perfil</a>
                </li>
                <li>
                  <a href="#">Otra Cosa</a>
                </li>
                <li>
                  <a href="#">Cerrar Sesion</a>
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
