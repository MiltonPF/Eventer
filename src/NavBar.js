import React, { useEffect, useState } from 'react';
import './App.css';
import {useNavigate } from 'react-router-dom';
import Sesion_Usuario from './service/localSesion';
import postService from './service/post-service';
import authService from './service/auth-service';
import { Link } from 'react-router-dom';
import { Login } from './Login';


function NavBar() {
  const [posts, setPosts] = useState([]);
  const [val, setVal] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  
    useEffect(() => {
      postService.getAllInmuebles().then(
        (response) => {
          setPosts(response.data);
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }, []);
  
    const data = posts.map((post) => ({
      id: post.id,
      titulo: post.titulo,
      localidad: post.localidad,
    }));

    const hnd = () => {
      const selectedPost = posts.find(post => `${post.titulo} - ${post.localidad}` === val);
      if (selectedPost) {
        setSelectedId(selectedPost.id);
        navigate(`/InmuebleHome/${selectedPost.id}`);
        setVal('');
      }
    };
    

  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("userData"))

  function Usuario_S() {
    if (userName) {
      return  <li className="nav-item email-link ml-3">
      <a className="nav-link" href="#" id="btn-perfil">
      {userName.name} <i className="bi bi-person-circle"></i>
      </a> 
      <ul className="menu-vertical" id="menu-vertical">
        <li>
          <a href=" " onClick={() => { navigate('/Perfil');}} role="button">Perfil</a>
        </li>
        <li>
          <a href=" " onClick={handleCerrarSesion}>Cerrar Sesion</a>
        </li>
      </ul>
    </li>
    } else {
      return <li className="nav-item email-link ml-3">
        <Login/>
      </li>
    }
  }

  const handleCerrarSesion = async () => {
    console.log("Cerrando sesión...");
    try {
      postService.CerrarSesion();
      console.log("Sesión cerrada correctamente.");
      console.log(localStorage.getItem("user"))
      localStorage.clear()
        // Redirigir al usuario a la página de inicio de sesión
        navigate('/')
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
      // Puedes mostrar un mensaje de error o manejar el error de otra manera aquí.
    }
  };

  return (
    <nav className="navbar nv1 navbar-expand-lg">
      <div className="container-fluid cf1">
        <Link className="navbar-brand text-white" to={`/`}><img style={{width:"30px"}} src='/logo.jpeg'></img></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-bars fa-lg"></i>
        </button> 
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <input list="data" value={val} onChange={(e) => setVal(e.target.value)}
              className="inp form-control me-2"
              type="search"
              placeholder="Buscar Propiedades..."
              aria-label="Search"
            />
            <datalist id="data">
              {data.map((property, index) => (
                <option key={index} value={`${property.titulo} - ${property.localidad}`} />
              ))}
            </datalist>
            <button className="btn btn2 border text-white" type="button" onClick={hnd}>
              Buscar
            </button>
          </form>
          <ul className="nvv navbar-nav ms-auto mb-2 mb-lg-0 btn-perfil">
            <li className="nav-item ml-3">
              <a className="nav-link is_active" aria-current="page" onClick={() => { navigate('/');}} href=" ">
                Inicio
              </a>
            </li>
            <li className="nav-item ml-3">
              <a className="nav-link is_active" aria-current="page" href="#">
                Acerca de
              </a>
            </li>
            {Usuario_S()}
          </ul>
        </div>
      </div>
    </nav>
  );
}



export default NavBar;
