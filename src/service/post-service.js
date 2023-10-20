import axios from "axios";
import authHeader from "./auth-header";
import Sesion_Usuario from "./localSesion";

const inmgetAllurl = "http://localhost:8080/api/inmueble/getAll";
const inmueblePost = "http://localhost:8080/api/inmueble/user";
const id = "http://localhost:8080/api/inmueble"

const email = Sesion_Usuario();


const getAllInmuebles = () => {
  return axios.get(inmgetAllurl, { headers: authHeader() });
};

const AgregarInmueble = (nuevoInmuebleData) => {
  const params = { email };

  return axios.post(inmueblePost, nuevoInmuebleData, {
    headers: authHeader(),
    params: params,
  });
};

function GetUsuario(){
  const userEmail = email
  const params = { email };
  return axios.get('http://localhost:8080/api/user', { headers: authHeader(), params: params, });
}

const getInmueble = (id) => {
  const params = { id }; // Pasa id como parámetro.
  return axios.get(`http://localhost:8080/api/inmueble`, {
    headers: authHeader(), 
    params: params,
  });
};

const agregarComentario = (nuevoComentario, inmuebleId) => {
  const params = { email, inmuebleId }; // Combinar ambos parámetros en un solo objeto
  return axios.post('http://localhost:8080/api/comentario/user/inmueble', nuevoComentario, {
    headers: authHeader(),
    params: params, // Utiliza el objeto de parámetros combinado
  });
};

const GetComentario = (id) =>{
  const params = {id}
  return axios.get('http://localhost:8080/api/comentario/inmueble', {
    headers: authHeader(), 
    params: params,
  })
}
const CerrarSesion = () =>{
  return axios.post('http://localhost:8080/api/logout' , {
    headers: authHeader(),
  })
}



const postService = {
  getAllInmuebles,
  AgregarInmueble,
  GetUsuario,
  getInmueble,
  agregarComentario,
  GetComentario,
  CerrarSesion,
};

export default postService;
