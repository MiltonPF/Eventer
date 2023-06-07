import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from './service/API';


export const InmueblesList = () => {
  const [inmuebles, setInmuebles] = useState([]);

  useEffect(() => {
    const api = new API;
    api.fetchInmuebles()
      .then(data => {
        console.log(data);
        setInmuebles(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Inmuebles List</h1>
      <ul>
        {!inmuebles ? 'Cargando...' : inmuebles.map((inmueble) => <li key={inmueble.id}>{inmueble.nombre}</li>)}
      </ul>
    </div>
  );
};


export function FormLogin() {
  return (
    <div className='FormLog'>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Nombre de Usuario o Email</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
        </div>
        <div class="mb-3">
            <label for="inputPassword5" class="form-label">Contraseña</label>
            <input type="password" id="inputPassword5" class="form-control" aria-labelledby="passwordHelpBlock"/>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
            <label class="form-check-label" for="flexCheckDefault">
                Recuerdame
            </label>
        </div>
    </div>
  );
}

export default FormLogin;
