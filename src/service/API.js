import axios from 'axios';
import React, { useEffect, useState } from 'react';



function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"))

  if (user && user.accessToken) {
    return { "x-auth-token" : user.accessToken}
    
  } else {
    return {}
  }
}

class API {
  inmgetAllurl = "http://localhost:8080/api/inmueble/getAll";
  imagegetAllurl = "http://localhost:8080/api/inmueble/1";


  async fetchInmuebles() {
    try {
      const response = await axios.get(this.inmgetAllurl, {headers: authHeader()});
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

  async fetchImage() {
    try {
      const response = await axios.get(this.imagegetAllurl);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async BuscarInmueble(nombre) {
    try {
      const response = await axios.get(this.inmgetAllurl);
      const data = response.data;
      const inmueblesFiltrados = data.filter((inmueble) => inmueble.nombre.includes(nombre));
      return inmueblesFiltrados; // Devuelve los inmuebles filtrados
    } catch (error) {
      console.error('Error al buscar inmuebles:', error);
      throw error;
    }
  }


  

  //Post

  async PostInmuebles(data) {
    try {
      const response = await axios.post("http://localhost:8080/api/inmueble", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  

}


export default API;
