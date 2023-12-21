import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postService from '../service/post-service';
import '../App.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function Perfil() {
  const navigate = useNavigate();
  
  const [activeItem, setActiveItem] = useState('Profile'); // Mueve el estado aquí

  


  const handleItemClick = (item) => {
    setActiveItem(item);
  }

  return (
    <div className='perfil-pag'>
      <div className='row'>
        <div className="col-md-3 pr-md-4">
          <div className="" style={{ backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20210201/pngtree-colored-modern-abstract-background-image_552362.jpg)', height: '150px' }}>
            <div className="sidebar" style={{ position: 'absolute', top: '100px', left: '20px' }}>
                <p className='text-light'> Nombre Del Usuario</p>
            </div>
          </div>
          <div className="sidebar-left">
            <ul className="list-unstyled sidebar-menu pl-md-2 pr-md-0">
              <li>
                <a
                  className={`sidebar-item d-flex justify-content-between align-items-center ${activeItem === 'Profile' ? 'active' : ''}`}
                  onClick={() => handleItemClick('Profile')}
                >
                  Perfil
                  <i className="fa-solid fa-user fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  className={`sidebar-item d-flex justify-content-between align-items-center ${activeItem === 'Post' ? 'active' : ''}`}
                  onClick={() => handleItemClick('Post')}
                >
                  Casas
                  <i className="fa-solid fa-house fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  className={`sidebar-item d-flex justify-content-between align-items-center ${activeItem === 'Messages' ? 'active' : ''}`}
                  onClick={() => handleItemClick('Messages')}
                >
                  Notificaciones
                  {/*<span className="side-notif" title="1 new comment">1</span>*/}
                  <i className="fa-solid fa-bell fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  className={`sidebar-item d-flex justify-content-between align-items-center ${activeItem === 'Favorite' ? 'active' : ''}`}
                  onClick={() => handleItemClick('Favorite')}
                >
                  Favoritos
                  <i className="fa-solid fa-heart fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  className={`sidebar-item d-flex justify-content-between align-items-center ${activeItem === 'Setting' ? 'active' : ''}`}
                  onClick={() => handleItemClick('Setting')}
                >
                  Opciones
                  <i className="fa-solid fa-gears fa-lg"></i>
                </a>
              </li>
              <li>
                <a
                  className={`sidebar-item d-flex justify-content-between align-items-center ${activeItem === 'SignOut' ? 'active' : ''}`}
                  onClick={() => handleItemClick('SignOut')}
                >
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-2 co-2">
          <div className='contenido'>
          {activeItem === 'Profile' && <Perfil_Datos />}
          {activeItem === 'Post' && <Post_Casas />}
          </div>
        </div>
      </div>
    </div>
  );
}




function Perfil_Datos() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData)
  const [editedUserData, setEditedUserData] = useState({
    name: userData.name,
    lastName : userData.lastname,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditarClick = (e) => {
    e.preventDefault()
    console.log('Datos editados:', editedUserData);
    postService.putUser(editedUserData)
    .then((response) => {
      new Promise(resolve => setTimeout(resolve, 2000));
        window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
  };
  
  return (
    <div className='contenedor text-center'>
      <div className='perfil-datos cont-p '>
        <h1>Tus Datos</h1>
        <div className="campo">
          <label htmlFor="user_name">Nombre de Usuario</label>
          <input
            type="text"
            id="user_name"
            name="name"
            value={editedUserData.name || userData.name}
            maxLength="30"
            onChange={handleInputChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="user_lastname">Nombre de Usuario</label>
          <input
            type="text"
            id="lastname"
            name="lastName"
            value={editedUserData.lastName || userData.lastname}
            maxLength="30"
            onChange={handleInputChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="text"
            id="email"
            name="email"
            value={editedUserData.email || userData.email}
            maxLength="100"
            onChange={handleInputChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="tel">Teléfono</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={editedUserData.phoneNumber || userData.phoneNumber}
            maxLength="10"
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{
            borderRadius: '8px',
            fontSize: '20px',
            padding: '5px 20px',
            backgroundColor: 'green',
            border: 'none',
            color: 'white',
          }}
        >
          Editar
        </button>
      </div>
      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              ¿Está Seguro de Editar su Perfil?
            </div>
            <div className="modal-footer align-center" style={{ justifyContent: "center" }}>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button type="button" className="btn btn-success" onClick={handleEditarClick}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




function Post_Casas() {
  const [inmuebleData, setInmuebleData] = useState([]);

  useEffect(() => {
    postService.getInmuebleUser().then(
      (response) => {
        setInmuebleData(response.data);
        console.log(response)
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  function recortarUrl(url) {
    if (!url) {
      return null;
    }
    const imagenCadena = JSON.stringify(url);
    const partes = imagenCadena.split('\\');
    const ultimaPalabra = partes[partes.length - 1];
    const resultadoSinComillas = ultimaPalabra.replace(/["']/g, '');
    console.log(resultadoSinComillas)
    return resultadoSinComillas;
  }

  const [chComponent, setChComponent] = useState(false);

  const toggleDiv = () => {
    // La función toggleDiv se utiliza para cambiar el estado chComponent.
    setChComponent(!chComponent);
    // Se invierte el valor actual de chComponent al hacer clic en el botón.
  };

////////////Previsualizar Imagen

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState([]);

  const handleImageChange = (e) => {
    const photo = e.target.files;
    setPortada(photo);
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageChange2 = (e) => {
    const photos = e.target.files;
    setSelectedFiles(photos);
    const files = Array.from(photos).map((file) => file);
    const imagePreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.push(e.target.result);
        if (imagePreviews.length === files.length) {
          setSelectedImage2(imagePreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const EliminarFoto = (indiceImg) =>{
    const updatedImages = [...selectedImage2];
    updatedImages.splice(indiceImg, 1);
    setSelectedImage2(updatedImages);
    const nuevasImagenes = [...selectedFiles];
    nuevasImagenes.splice(indiceImg, 1);
    setSelectedFiles(nuevasImagenes);
  }
  //////////////////////////////////////////

 ////Parte para agregar el inmueble
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [portada, setPortada] = useState([]);
  const [caractData, setCaractData] = useState({
    banios : 0,
    cantidadPersonas: 0,
    habitaciones:0,
    parrilla: 0,
    piscina: 0,
    tv:0,
    wifi:0,
  });
  const [nuevoInmuebleData, setNuevoInmuebleData] = useState({
    descripcion: "",
    fechaCreacion: currentDate,
    precio: "",
    localidad: "",
    titulo:"",
    ubicacion:"",
  });
  const [modalIdElim, setModalIdElim] = useState(null);


  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setNuevoInmuebleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange2 = (e) => {
    console.log(caractData)
    const { name, value, type, checked } = e.target;
    setCaractData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Agregando inmueble...");
    postService.AgregarInmueble(nuevoInmuebleData)
      .then((response) => {
        console.log("Esperando 5 segundos...");
        // Return a promise to wait for 5 seconds
        return new Promise(resolve => setTimeout(resolve, 5000));
      })
      .then(() => {
        console.log("Subiendo imágenes...");
        return Promise.all([
          postService.subirPortada(portada),
          postService.subirImagen(selectedFiles),
          postService.caractInm(caractData)
        ]);
      })
      .then(() => {
        setChComponent(!chComponent);
      })
      .catch((error) => {
        console.error("Error al agregar el inmueble o cargar imágenes", error);
      });
  };

  const DelInm = () => {
    postService.DelInmueble(modalIdElim)
    .then((response) => {
      console.log("Inmueble Eliminado");
      window.location.reload()
    })
    .catch((error) => {
      console.error("Error al Eliminar", error);
    });
  }
  
//////////////////////////////////////////////////////////////////////

  return (
    <div className='contenedor'>
      <div className='cont-p' style={{ display: chComponent ? 'none' : 'block' }}>
        {/*  Si chComponent es true, el primer div se oculta (style={{ display: 'none' }}), y si es false, se muestra (style={{ display: 'block' }}).*/}
        <h1 className='mb-5'>Estas son tus Publicaciones</h1>
        {inmuebleData.length === 0 ? (
          <div className=''>
            <p className='text-center'>Aún no has realizado ninguna publicación</p>
          </div>
        ) : (
          inmuebleData.map(inmueble =>(
            <div className='mb-3' key={inmueble.id}>
              <div className='row'>
                <div className="card col-md-10 mb-3" style={{ cursor: "pointer" }}>
                  <Link to={`/InmuebleHome/${inmueble.id}`} style={{ textDecoration: 'none' }}>
                    <div className="row g-0">
                      <div className="col-md-3 justify-content-start">
                        <img src={`img/Portadas/${recortarUrl(inmueble.portada)}`} style={{ width: "100%", height: '8rem' }} className="img-fluid rounded-start" alt="" />
                      </div>
                      <div className="col-md-9">
                        <div className="card-body">
                          <h5 className="card-title" style={{ color: 'black' }}>{inmueble.titulo}</h5>
                          <p className="card-text" style={{ color: 'black' }}>{inmueble.localidad}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="d-flex col-md-2 justify-content-center" style={{flexDirection:"column"}}>
                  <button className="btn btn-primary mx-1">Editar</button>
                  <button className="btn btn-danger mx-1" data-bs-toggle="modal"
                  data-bs-target="#exampleModal" onClick={() => setModalIdElim(inmueble.id)}>Eliminar</button>
                </div>
              </div>
              {/* Modal */}
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content align-center text-center">
                    <div className="modal-body">
                      <h4 style={{color:"black"}}>¿Está Seguro de Eliminar su Inmueble? </h4>
                      
                    </div>
                    <div className="modal-footer align-center"  style={{ justifyContent: "center" }}>
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        Cerrar
                      </button>
                      <button type="button" className="btn btn-danger" onClick={DelInm}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
          <button className='mt-2 btn-crearPost' onClick={toggleDiv}>
            <span>Crear publicación</span>
            <div className='icono-flecha' id="dub-arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
        </button>
      </div>
    

      {chComponent && (
        <div className='subir-casa cont-p'>
          <form onSubmit={handleSubmit}>
            <h1>Ingresa los datos para subir su Inmueble</h1>
            <div className='mt-5'>
            <div className="form-group">
              <label for="email">Nombre de la Propiedad</label>
              <input type="text" style={{width:"100%"}} className="form-control" id="nombre" name="titulo" value={nuevoInmuebleData.titulo} onChange={handleInputChange} required/>
            </div>
            <br></br>
            <label>Características</label>
            <br></br>
             <div className="form-check">
              <div id="app-cover">
                <div class="row">
                  <div class="col toggle-button-cover text-center" style={{alignItems:"center"}}>
                    <div class="button-cover">
                      <div class="button r" id="button-1">
                        <input type="checkbox" class="checkbox" name='piscina' checked={caractData.piscina}  onChange={handleInputChange2} id="piscina"/>
                        <div class="knobs"></div>
                        <div class="layer"></div>
                      </div>
                    </div>
                    <div style={{margin:"30px", paddingLeft:"30px"}}>
                      <i style={{fontSize:"45px"}} className=" ml-2 fa-solid fa-person-swimming"></i>
                    </div>
                  </div>
                  <div class="col toggle-button-cover text-center" style={{alignItems:"center"}}>
                    <div class="button-cover">
                      <div class="button r" id="button-1">
                        <input type="checkbox" class="checkbox" name='parrilla' value={caractData.parrilla === 1} onChange={handleInputChange2} id="parrilla"/>
                        <div class="knobs"></div>
                        <div class="layer"></div>
                      </div>
                    </div>
                    <div style={{margin:"30px", paddingLeft:"30px"}}>
                      <p>Parrilla</p>
                    </div>
                  </div>
                  <div class="col toggle-button-cover text-center" style={{alignItems:"center"}}>
                    <div class="button-cover">
                      <div class="button r" id="button-1">
                        <input type="checkbox" class="checkbox" name='wifi' checked={caractData.wifi}  onChange={handleInputChange2} id="wifi"/>
                        <div class="knobs"></div>
                        <div class="layer"></div>
                      </div>
                    </div>
                    <div style={{margin:"25px", paddingLeft:"30px"}}>
                      <i style={{fontSize:"45px"}} className="fa-solid fa-wifi"></i>
                    </div>
                  </div>
                  <div class="col toggle-button-cover text-center" style={{alignItems:"center"}}>
                    <div class="button-cover">
                      <div class="button r" id="button-1">
                        <input type="checkbox" class="checkbox" name='tv' checked={caractData.tv}  onChange={handleInputChange2} id="tv"/>
                        <div class="knobs"></div>
                        <div class="layer"></div>
                      </div>
                    </div>
                    <div style={{margin:"30px", paddingLeft:"30px"}}>
                      <i style={{fontSize:"40px"}} class="fa-solid fa-tv"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
              <label for="habitaciones">Habitaciones</label>
              <div className="input-group">
                <input type="number" className="form-control ml-3" value={caractData.habitaciones} id="habitaciones" onChange={handleInputChange2} name="habitaciones" min="0" max="100" step="1" required/>
              </div>
            </div>

            <div className="form-group">
              <label for="banos">Baños</label>
              <div className="input-group">
                <input type="number" className="form-control ml-3" value={caractData.banios} id="banios" onChange={handleInputChange2} name="banios" min="0" max="100" step="1" required/>
              </div>
            </div>

            <div className="form-group">
              <label for="personas">Cantidad de Personas</label>
              <div className="input-group">
                <input type="number" className="form-control ml-3" value={caractData.cantidadPersonas} id="cantidadPersonas" onChange={handleInputChange2} name="cantidadPersonas" min="0" max="100" step="1" required/>
              </div>
            </div>

            Ubicación
              <div className="form-row border border-white p-1">
                <div style={{width:"50%"}}>
                  <input style={{width:"90%"}} type="text" className="form-control" required placeholder="Provincia" name='localidad' onChange={handleInputChange} value={nuevoInmuebleData.localidad}/>
                </div>
                <div style={{width:"50%"}}>
                  <input style={{width:"90%"}} type="text" className="form-control" required placeholder="Dirección" name='ubicacion' onChange={handleInputChange} value={nuevoInmuebleData.ubicacion}/>
                </div>
              </div>
            </div>
            <br></br>
            <div className="form-group">
              <label for="exampleFormControlTextarea1">Descripción</label>
              <textarea className="form-control" required name="descripcion" value={nuevoInmuebleData.descripcion} onChange={handleInputChange} id="exampleFormControlTextarea1" rows="10"></textarea>
            </div>
            <br></br>
            <div className="form-group">
            <label className="form-label" for="customFile">Seleccione la portada</label>
            <input type="file" className="form-control" id="customFile" accept="image/*"  onChange={handleImageChange}/>
            {selectedImage && (
              <div className="card card-prev mt-4 ml-2 mr-3" style={{width: '15rem'}}>
                <img
                  className='prev-img'
                  src={selectedImage}
                  alt="Preview"
                  style={{ maxWidth: '300px' }}
                />
                <i className="bi bi-trash"></i>
              </div>
        )}
            </div>
            <div className="form-group">
              <label className="form-label" for="customFile">Seleccione las fotos</label>
              <input type="file" className="form-control" id="customFile" multiple accept="image/*"  onChange={handleImageChange2}/>
              <div className='row'>
              {selectedImage2.map((image, index) => (
              <div className="card card-prev mt-4 ml-4 mr-4" style={{width: '15rem'}} key={index}>
                <img
                  className="prev-img"
                  src={image}
                  alt={`Preview ${index + 1}`}
                  style={{ width: '100%' , height: '15rem'}}
                  onClick={() => EliminarFoto(index)} // Handle click on the image
                />
                <i className="bi bi-trash"></i>
              </div>))}
              </div>
              
      
            </div>
            <br></br>
            <br></br>
            <div className='form-group'>
              <label>Precio</label>
              <select className='ml-3'>
                <option>Por día</option>
                <option>Por hora</option>
              </select>
              <input type="text" name='precio' required value={nuevoInmuebleData.precio} onChange={handleInputChange} className="form-control"/>
            </div>

            <button type='submit' className='mt-2 btn-crearPost'>
                <span>Crear publicación</span>
                <div className='icono-flecha' id="dub-arrow">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
            </button>
            </div>
          </form>
          
        </div>
      )}
    </div>
  );
}






export default Perfil;
