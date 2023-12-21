import './login.css';
import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import authService from './service/auth-service';
import postService from './service/post-service';

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        setIsLoading(true)
        await authService.login(formData.email, formData.password);
        await new Promise(resolve => setTimeout(resolve, 3000));
          window.location.reload();
    } catch (err) {
        console.log(err);
    }
    finally {
      setIsLoading(false);
    }
};

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await authService.signup(formData.firstname, formData.lastname, formData.email, formData.password);
      await new Promise(resolve => setTimeout(resolve, 3000));
        window.location.reload();
    } catch (err) {
    }
    finally {
      setIsLoading(false);
    }
  };

  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleLoginForm = () => {
    setShowLoginForm(true);
  };

  const handleRegisterForm = () => {
    setShowLoginForm(false);
  };

  return ( 
    <div>
    <button type="button" className="btn btn-info center-block" data-toggle="modal" data-target="#exampleModal">
      Ingresar
    </button>
  
    <div class="modal fade overlay" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div className={`modal-content container-login ${showLoginForm ? 'show-login' : 'show-register'}`}>
          <div className="login-container">
            <form className="form-container" onSubmit={handleLogin}>
              <h2>Iniciar Sesión</h2>
              <div class='input-container'>
                <input
                  className="input-login"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email" className="email-label">
                  Correo electrónico
                </label>
              </div>
              <div class='input-container'>
                <input
                  className="input-login"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password" className="email-label">
                  Contraseña
                </label>
              </div>
              <button className={`btn-login ${isLoading ? 'disabled' : ''}`} disabled={isLoading} type="submit">
                {isLoading ? (
                  <>
                    Cargando... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </>
                ) : (
                  <>
                    Iniciar Sesión
                  </>
                )}
                </button>
              <p className="login-link">¿No tienes una cuenta? <a href="#" onClick={handleRegisterForm}>Registrar</a></p>
            </form>
          </div>
                  
          <div className="register-container">
            <form className="form-container" onSubmit={handleRegister}>
              <h2>Registrarse</h2>
              <div class='input-container'>
                 <input
                  className="input-login"
                  type="text"
                  id="firstname"
                  name="firstname"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name" className="email-label">
                  Nombre                  </label>
              </div>
              <div class='input-container'>
                 <input
                  className="input-login"
                  type="text"
                  id="lastname"
                  name="lastname"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name" className="email-label">
                  Apellido</label>
              </div>
              <div class='input-container'>
                <input
                  className="input-login"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange} 
                  required
                />
                <label htmlFor="email" className="email-label">
                   Correo electrónico
                </label>
             </div>
                <div class='input-container'>
                  <input
                    className="input-login"
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password" className="email-label">
                    Contraseña
                  </label>
                </div>
                <button className={`btn-login ${isLoading ? 'disabled' : ''}`} disabled={isLoading} type="submit">
                {isLoading ? (
                  <>
                    Cargando... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </>
                ) : (
                  <>
                    Registrarse
                  </>
                )}
                </button>
                <p className="login-link">¿Ya tienes una cuenta? <a href="#" onClick={handleLoginForm}>Iniciar Sesión</a></p>
              </form>
            </div>
        </div>
      </div>
    </div>
  </div>/* 
    <div className="fondo">
      
        
        
    </div>*/
  );
}
/*export function ShowRegisterForm() {
    document.getElementByclassName('login-container').style.display = 'none';
    document.getElementByclassName('register-container').style.display = 'block';
  }
  
export function ShowLoginForm() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('register-container').style.display = 'none';
  }*/
