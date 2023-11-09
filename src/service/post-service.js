import axios from "axios";
import authHeader from "./auth-header";
import Sesion_Usuario from "./localSesion";

const inmgetAllurl = "http://localhost:8080/api/inmueble/getAll";
const inmueblePost = "http://localhost:8080/api/inmueble/user";
const id = "http://localhost:8080/api/inmueble"

const email = Sesion_Usuario();


const getAllInmuebles = () => {
  return axios.get(inmgetAllurl);
};

const AgregarInmueble = (nuevoInmuebleData) => {
  const params = { email };
  return axios.post(inmueblePost, nuevoInmuebleData, {
    headers: authHeader(),
    params: params,
  });


};

const subirImagen = (files, IdInmueble) => {
  const formData = new FormData();
        formData.append("files", files);
        formData.append('IdInmueble', IdInmueble);
  console.log(formData)
  return axios.post("http://localhost:8080/api/imagen", formData,{
    headers: authHeader(),
  })
}

const GetUsuario = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/user/${email}`, {
      headers: authHeader(),
    });

    if (response.data) {
      localStorage.setItem("userData", JSON.stringify(response.data));
    }
    console.log(JSON.parse(localStorage.getItem("userData")));
    return console.log("0101");
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
  }
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
const CerrarSesion = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user && user.accessToken;

  if (accessToken) {
    return axios.post('http://localhost:8080/api/logout', null, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  } 
}



const postService = {
  getAllInmuebles,
  AgregarInmueble,
  GetUsuario,
  getInmueble,
  agregarComentario,
  GetComentario,
  CerrarSesion,
  subirImagen,
};

export default postService;
