import './login.css';
import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios, { Axios } from "axios";
import authService from './service/auth-service';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      authService.login(email, password).then(
        () => {
          window.location.reload();
          navigate("/");
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password" className="email-label">
                  Contraseña
                </label>
              </div>
              <button className="btn-login"  type="submit">Iniciar Sesión</button>
              <p className="login-link">¿No tienes una cuenta? <a href="#" onClick={handleRegisterForm}>Registrar</a></p>
            </form>
          </div>
  
          <div className="register-container">
            <form className="form-container">
              <h2>Registrarse</h2>
              <div class='input-container'>
                 <input
                  className="input-login"
                  type="text"
                  id="name"
                  required
                />
                <label htmlFor="name" className="email-label">
                  Nombre                  </label>
                </div>
              <div class='input-container'>
                <input
                  className="input-login"
                  type="email"
                  id="email"
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
                    required
                  />
                  <label htmlFor="password" className="email-label">
                    Contraseña
                  </label>
                </div>
                <button className="btn-login" type="submit">Registrarse</button>
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
