import './login.css';
import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleLoginForm = () => {
    setShowLoginForm(true);
  };

  const handleRegisterForm = () => {
    setShowLoginForm(false);
  };


  const handleSubmit = async e => {
    e.preventDefault();
  try {
    navigate("/Home"); // Redirige a la página 2 después de agregar los datos exitosamente
  } catch (error) {
    console.error(error);
    // Maneja el error de acuerdo a tus necesidades, como mostrar un mensaje de error al usuario
  }
};


  return (
    <div className="fondo">
      <div className={`container-login ${showLoginForm ? 'show-login' : 'show-register'}`}>
        <div className="login-container">
          
          <form id="form-container" onSubmit={handleSubmit}>
          <h2>Iniciar Sesion</h2>
          <div className='input-container'>
                <input
                  className="input-login"
                  type="email"
                  id="email"
                  required
                />
                <label htmlFor="email" id="email-label">
                  Correo electrónico
                </label>
            </div>
            <div className='input-container'>
                <input
                  className="input-login"
                  type="password"
                  id="password"
                  required
                />
                <label htmlFor="email" id="email-label">
                  Contraseña
                </label>
            </div> 
            <button className="btn-login" type="submit">Iniciar sesión</button>
            <p id="login-link">¿No tienes una cuenta? <a href="#" onClick={handleRegisterForm}>Registrar</a></p>
          </form>
        </div>
        <div className="register-container">
          
          <form id="form-container">
          <h2>Registrarse</h2>
          <div className='input-container'>
                <input
                  className="input-login"
                  type="text"
                  id="name"
                  required
                />
                <label htmlFor="email" id="email-label">
                  Nombre
                </label>
            </div>
            <div className='input-container'>
                <input
                  className="input-login"
                  type="email"
                  id="email"
                  required
                />
                <label htmlFor="email" id="email-label">
                  Correo electrónico
                </label>
            </div>
            <div className='input-container'>
                <input
                  className="input-login"
                  type="password"
                  id="password"
                  required
                />
                <label htmlFor="email" id="email-label">
                  Contraseña
                </label>
            </div> 
            <button className="btn-login" type="submit">Registrarse</button>
            <p id="login-link">¿Ya tienes una cuenta? <a href="#" onClick={handleLoginForm}>Iniciar sesión</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}
/*export function ShowRegisterForm() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
  }
  
export function ShowLoginForm() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('register-container').style.display = 'none';
  }*/
