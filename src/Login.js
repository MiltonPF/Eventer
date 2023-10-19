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
      await authService.login(email, password).then(
        () => {
          navigate("/Home");
          
          window.location.reload();
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
    <div className="fondo">
      <div className={`container-login ${showLoginForm ? 'show-login' : 'show-register'}`}>
        <div className="login-container">
          
          <form className="form-container" onSubmit={handleLogin}>
          <h2>Iniciar Sesion</h2>
          <div className='input-container'>
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
            <div className='input-container'>
                <input
                  className="input-login"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="email" className="email-label">
                  Contraseña
                </label>
            </div> 
            <button className="btn-login" type="submit">Iniciar sesión</button>
            <p className="login-link">¿No tienes una cuenta? <a href="#" onClick={handleRegisterForm}>Registrar</a></p>
          </form>
        </div>
        <div className="register-container">
          
          <form className="form-container">
          <h2>Registrarse</h2>
          <div className='input-container'>
                <input
                  className="input-login"
                  type="text"
                  id="name"
                  required
                />
                <label htmlFor="email" className="email-label">
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
                <label htmlFor="email" className="email-label">
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
                <label htmlFor="email" className="email-label">
                  Contraseña
                </label>
            </div> 
            <button className="btn-login" type="submit">Registrarse</button>
            <p className="login-link">¿Ya tienes una cuenta? <a href="#" onClick={handleLoginForm}>Iniciar sesión</a></p>
          </form>
        </div>
      </div>
    </div>
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
