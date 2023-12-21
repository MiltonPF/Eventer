import axios from "axios";
import authHeader from "./auth-header";
import Sesion_Usuario from "./localSesion";
import Cookies from "js-cookie";

const inmgetAllurl = "http://localhost:8080/api/inmueble/getAll";
const inmueblePost = "http://localhost:8080/api/inmueble/user";

const email = Sesion_Usuario();


const getAllInmuebles = () => {
  return axios.get(inmgetAllurl);
};

const AgregarInmueble = async (nuevoInmuebleData) => {
  try {
  const params = { email };
  const response = await axios.post(inmueblePost, nuevoInmuebleData, {
    headers: authHeader(),
    params: params,
  });
  if (response.data) {
    console.log("Inmueble agregado exitosamente");
    Cookies.set('IdInmuebleCookie', JSON.stringify(response.data.id), { expires: 40 / (60 * 60 * 24) });
    return response.data;
  }
  }catch (error) {
    console.error('Error al crear el inmueble', error);
  }

};

const subirImagen = async (selectedFiles) => {
  try {
    console.log(selectedFiles);
    const idInmueble = Cookies.get("IdInmuebleCookie");

    if (!idInmueble) {
      console.error('IdInmuebleCookie no está definida.');
      // Puedes lanzar un error o manejar esto de acuerdo a tus necesidades
      return;
    }
    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    formData.append('idInmueble', idInmueble);

    // Asegúrate de que authHeader() devuelve los encabezados correctamente
    const headers = authHeader();

    const response = await axios.post("http://localhost:8080/api/imagen", formData, {
      headers: headers,
    });

    // Hacer algo con la respuesta si es necesario
    console.log('Respuesta del servidor:', response.data);

    return response.data;
  } catch (error) {
    // Capturar y manejar errores
    if (error.response) {
      // El servidor respondió con un código de estado diferente de 2xx
      console.error('Respuesta del servidor con error:', error.response.data);
      console.error('Código de estado:', error.response.status);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      // Algo ocurrió en la configuración de la solicitud que provocó un error
      console.error('Error durante la configuración de la solicitud:', error.message);
    }

    // Devolver el error para que pueda ser manejado por el código que llamó a subirImagen
    throw error;
  }
};

const subirPortada = async (portada) => {
  try {
    console.log(portada);
    const idInmueble = Cookies.get("IdInmuebleCookie");

    if (!idInmueble) {
      console.error('IdInmuebleCookie no está definida.');
      // Puedes lanzar un error o manejar esto de acuerdo a tus necesidades
      return;
    }
    const formData = new FormData();

    for (let i = 0; i < portada.length; i++) {
      formData.append('file', portada[i]);
    }

    formData.append('idInmueble', idInmueble);

    // Asegúrate de que authHeader() devuelve los encabezados correctamente
    const headers = authHeader();

    const response = await axios.post("http://localhost:8080/api/portada/", formData, {
      headers: headers,
    });

    // Hacer algo con la respuesta si es necesario
    console.log('Respuesta del servidor:', response.data);

    return response.data;
  } catch (error) {
    // Capturar y manejar errores
    if (error.response) {
      // El servidor respondió con un código de estado diferente de 2xx
      console.error('Respuesta del servidor con error:', error.response.data);
      console.error('Código de estado:', error.response.status);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      // Algo ocurrió en la configuración de la solicitud que provocó un error
      console.error('Error durante la configuración de la solicitud:', error.message);
    }

    // Devolver el error para que pueda ser manejado por el código que llamó a subirImagen
    throw error;
  }
};

const caractInm = async (caractData) => {
  console.log(caractData)
  try {
    const id = Cookies.get("IdInmuebleCookie");

    if (!id) {
      console.error('IdInmuebleCookie no está definida.');
      return;
    }
    const params = { id };
    const response = await axios.post('http://localhost:8080/api/caracteristicas/inmueble', caractData, {
      headers: authHeader(),
      params: params,
  });
  if (response.data) {
    console.log("caracteristicas agregadas exitosamente");
    return response.data;
  }
  }catch (error) {
    console.error('Error al crear el inmueble', error);
  }
}



const getInmueble = (id) => {
  return axios.get(`http://localhost:8080/api/inmueble/${id}`, {
    headers: authHeader(), 
  });
};

const DelInmueble = (id) => {
  return axios.delete(`http://localhost:8080/api/inmueble/${id}`, {
    headers: authHeader(), 
  });
}

const getInmuebleUser = () => {
  return axios.get(`http://localhost:8080/api/inmueble/user/${email}`, {
    headers: authHeader(), 
  });
};

const putUser = async (data) => {
  console.log(data)
  try {
    const response = await axios.put(`http://localhost:8080/api/user/${email}`, data, {
      headers: authHeader(),
    });
    localStorage.setItem("userData", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud PUT:', error);
    throw error;
  }
};

const getUser = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/user/${email}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud GET:', error);
    throw error;
  }
};


const agregarComentario = (nuevoComentario, inmuebleId) => {
  const params = { email, inmuebleId }; // Combinar ambos parámetros en un solo objeto
  return axios.post('http://localhost:8080/api/comentario/user/inmueble', nuevoComentario, {
    headers: authHeader(),
    params: params, // Utiliza el objeto de parámetros combinado
  });
};

const calificacion = (calificacion, idInmueble) => {
  const idInmuebleEntero = parseInt(idInmueble, 10);
  console.log(idInmuebleEntero)
  const params = { calificacion, idInmueble: idInmuebleEntero };
  return axios.post('http://localhost:8080/api/calificacion', null, {
    headers: authHeader(),
    params: params,
  });
};

const calificacionInm = (idInmueble) => {
  const params = { idInmueble }
  return axios.get('http://localhost:8080/api/calificacion/inmueble', {
    headers: authHeader(),
    params: params,
  });
}

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
  getInmueble,
  agregarComentario,
  GetComentario,
  CerrarSesion,
  subirImagen,
  subirPortada,
  getInmuebleUser,
  getUser,
  putUser,
  caractInm,
  DelInmueble,
  calificacion,
  calificacionInm,
};

export default postService;
