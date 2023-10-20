import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postService from '../service/post-service';
import '../App.css';

function Perfil(params) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeItem, setActiveItem] = useState('Profile'); // Mueve el estado aquí

  useEffect(() => {
    postService.GetUsuario()
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos del usuario:', error);
      });
  }, []);


  const handleItemClick = (item) => {
    setActiveItem(item);
  }

  return (
    <div className='perfil-pag'>
      <div className='row'>
        <div className="col-md-3 pr-md-4">
          <div className="" style={{ backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20210201/pngtree-colored-modern-abstract-background-image_552362.jpg)', height: '150px' }}>
            <div className="sidebar" style={{ position: 'absolute', top: '100px', left: '20px' }}>
                <p className='text-light'> Nombre Del Usuario</p>
            </div>
          </div>
          <div className="sidebar-left">
            <ul className="list-unstyled sidebar-menu pl-md-2 pr-md-0">
              <li>
                <a
                  className={`sidebar-item d-flex justify-content-between align-items-center ${activeItem === 'Profile' ? 'active' : ''}`}
                  onClick={() => handleItemClick('Profile')}
                >
                  Perfil
                  <i class="fa-solid fa-user fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  className={`sidebar-item d-flex justify-content-between align-items-center ${activeItem === 'Post' ? 'active' : ''}`}
                  onClick={() => handleItemClick('Post')}
                >
                  Casas
                  <i class="fa-solid fa-house fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  className={`sidebar-item d-flex justify-content-between align-items-center ${activeItem === 'Messages' ? 'active' : ''}`}
                  onClick={() => handleItemClick('Messages')}
                >
                  Notificaciones
                  {/*<span className="side-notif" title="1 new comment">1</span>*/}
                  <i class="fa-solid fa-bell fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  className={`sidebar-item d-flex justify-content-between align-items-center ${activeItem === 'Favorite' ? 'active' : ''}`}
                  onClick={() => handleItemClick('Favorite')}
                >
                  Favoritos
                  <i class="fa-solid fa-heart fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  className={`sidebar-item d-flex justify-content-between align-items-center ${activeItem === 'Setting' ? 'active' : ''}`}
                  onClick={() => handleItemClick('Setting')}
                >
                  Opciones
                  <i class="fa-solid fa-gears fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  className={`sidebar-item d-flex justify-content-between align-items-center ${activeItem === 'SignOut' ? 'active' : ''}`}
                  onClick={() => handleItemClick('SignOut')}
                >
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 co-2">
          <div className='contenido'>
            {/*
            <ul className='list-unstyled text-center bar-p d-flex justify-content-between'>
              <li className="active">Caracteristicas</li>
              <li>Descripcion</li>
              <li>Confirmar</li>
            </ul>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
