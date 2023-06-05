import './App.css';
import React, { useEffect, useState } from 'react';

export function API() {
    const url = "https://pokeapi.co/api/v2/pokemon"
    const [todos, setTodos] = useState()

    const fetchApi = async () => {
        const response = await fetch(url)
        console.log(response.status)
        const responseJson = await response.json()
        setTodos(responseJson)
        console.log(responseJson)
    }
    useEffect(() => {
        fetchApi()
    }, [])
    return (
        <div>
      <h1>Pokemon List</h1>
      <ul>
      {!todos ? 'Cargando...' :
          todos.results.map((pokemon) => (
            <li key={pokemon.id}>{pokemon.base_experience}</li>
          ))
        }
      </ul>
    </div>
    )
}





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
