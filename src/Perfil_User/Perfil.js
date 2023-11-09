import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postService from '../service/post-service';
import '../App.css';

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
  
  return (
    <div className='contenedor'>
      <div className='perfil-datos cont-p'>
      <h1>Tus Datos</h1>
      <table align="center" cellPadding = "10">
 
        <tr>
        <td>Nombre de Usuario</td>
        <td><input type="text" value={userData.name} name="user_name" maxLength="30"/>
        </td>
        </tr>
        
        <tr>
        <td>Correo Electrónico</td>
        <td><input type="text" name="email" value={userData.email} maxLength="100" /></td>
        </tr>
          
        
        <tr>
        <td>Teléfono</td>
        <td>
        <input type="text" name="tel" maxLength="10" />
        </td>
        </tr>
        </table>
    </div>
    </div>
  )
  
}





function Post_Casas() {
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
    const files = Array.from(e.target.files);
    console.log(files)
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
  }
  //////////////////////////////////////////

 ////Parte para agregar el inmueble
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [files, setFiles] = useState(null);
  const [nuevoInmuebleData, setNuevoInmuebleData] = useState({
    descripcion: "",
    fechaCreacion: currentDate,
    parrilla: 0,
    pileta: 0,
    precio: "",
    localidad: "",
    titulo:"",
    ubicacion:"",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoInmuebleData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
  
      console.log("Agregando inmueble...");
      const response = await postService.AgregarInmueble(nuevoInmuebleData);
  
      // Manejar la respuesta si es necesario
      console.log("Inmueble agregado exitosamente");
      console.log(nuevoInmuebleData.id);
  
      // Esperar 5 segundos
      await new Promise((resolve) => setTimeout(resolve, 5000));
        const IdInmueble = nuevoInmuebleData.id
        console.log(IdInmueble)
  
      console.log("Subiendo imágenes...");
      await postService.subirImagen(files, IdInmueble);
  
      // Manejar la carga de imágenes si es necesario
      console.log("Imágenes cargadas exitosamente");
      setChComponent(!chComponent);
    } catch (error) {
      // Manejar los errores de manera adecuada
      console.error("Error al agregar el inmueble o cargar imágenes", error);
    }
  };
//////////////////////////////////////////////////////////////////////

  return (
    <div className='contenedor'>
      <div className='cont-p' style={{ display: chComponent ? 'none' : 'block' }}>
        {/*  Si chComponent es true, el primer div se oculta (style={{ display: 'none' }}), y si es false, se muestra (style={{ display: 'block' }}).*/}
        <h1>Estas son tus Publicaciones</h1>
        <div className='mt-5'>
          <p className='text-center'>Aún no has realizado ninguna publicación</p>
          <button className='mt-2 btn-crearPost' onClick={toggleDiv}>
            <span>Crear publicación</span>
            <div className='icono-flecha' id="dub-arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </button>
        </div>
      </div>




      {chComponent && (
        <div className='subir-casa cont-p'>
          <form onSubmit={handleSubmit}>
            <h1>Ingresa los datos para subir su Inmueble</h1>
            <div className='mt-5'>
            <div className="form-group">
              <label for="email">Nombre de la Propiedad</label>
              <input type="text" className="form-control" id="nombre" name="titulo" value={nuevoInmuebleData.titulo} onChange={handleInputChange}/>
            </div>
            <br></br>
            <label>Características</label>
            <br></br>
            <div className="form-check">
              <div className="form-check-inline">
                <input type="checkbox" name='pileta' checked={nuevoInmuebleData.pileta}  onChange={handleInputChange} className="form-check-input" id="pileta" />
                <label className="form-check-label" name="pileta"  htmlFor="piscina">Piscina</label>
              </div>
              <div className="form-check-inline">
                <input type="checkbox" name='parrilla' value={nuevoInmuebleData.parrilla === 1} onChange={handleInputChange} className="form-check-input" id="parrilla"/>
                <label className="form-check-label" name="parrilla"  htmlFor="parrilla">Parrilla Incluida</label>
              </div>
              <div className="form-check-inline">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label" for="parrilla">Wifi</label>
              </div>
              <div className="form-check-inline">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label" for="parrilla">TV</label>
              </div>
              <div className="form-check-inline">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label" for="parrilla">Salón de Fiestas</label>
              </div>
              <div className="form-check-inline">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label" for="parrilla">Cancha de Futbol</label>
              </div>
              <div className="form-group">
              <label for="habitaciones">Habitaciones</label>
              <div className="input-group">
                <input type="number" className="form-control ml-3" id="habitaciones" name="numero" min="0" max="100" step="1"/>
              </div>
            </div>

            <div className="form-group">
              <label for="banos">Baños</label>
              <div className="input-group">
                <input type="number" className="form-control ml-3" id="banos" name="numero" min="0" max="100" step="1"/>
              </div>
            </div>

            <div className="form-group">
              <label for="personas">Cantidad de Personas</label>
              <div className="input-group">
                <input type="number" className="form-control ml-3" id="personas" name="numero" min="0" max="100" step="1"/>
              </div>
            </div>
            Ubicación
              <div className="form-row border border-white p-1">
                <div className="col">
                  <input type="text" className="form-control" placeholder="Provincia"/>
                </div>
                <div className="col">
                  <input type="text" className="form-control" placeholder="Departamento" name='localidad' onChange={handleInputChange} value={nuevoInmuebleData.localidad}/>
                </div>
                <div className="col">
                  <input type="text" className="form-control" placeholder="Dirección" name='ubicacion' onChange={handleInputChange} value={nuevoInmuebleData.ubicacion}/>
                </div>
              </div>
            </div>
            <br></br>
            <div className="form-group">
              <label for="exampleFormControlTextarea1">Descripción</label>
              <textarea className="form-control" name="descripcion" value={nuevoInmuebleData.descripcion} onChange={handleInputChange} id="exampleFormControlTextarea1" rows="10"></textarea>
            </div>
            <br></br>
            <div className="form-group">
            <label className="form-label" for="customFile">Seleccione la portada</label>
            <input type="file" className="form-control" id="customFile" accept="image/*"  onChange={handleImageChange}/>
            {selectedImage && (
              <div className="card card-prev" style={{width: '18rem'}}>
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
              <input type="file" className="form-control" id="customFile" multiple accept="image/*"  onChange={handleFilesChange}/>
              <div className='row'>
              {selectedImage2.map((image, index) => (
          <div className="card card-prev" style={{width: '15rem'}} key={index}>
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
              <input type="text" name='precio' value={nuevoInmuebleData.precio} onChange={handleInputChange} className="form-control"/>
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
