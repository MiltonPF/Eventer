import React, { Component, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import postService from '../service/post-service';

export default class Prov extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 0
    };
  }

  incrementarContador = () => {
    this.setState(prevState => ({
      contador: prevState.contador + 1
    }));
  }

  render() {
    const contador = this.state.contador;

    return (
      <div>
        <SeccionComentarios key={contador} />
        <p>Contador: {contador}</p>

        <button onClick={this.incrementarContador}>
          Aumentar contador y actualizar SeccionComentarios
        </button>
      </div>
    );
  }
}




export function InmuebleHome() {
  const { inmuebleId } = useParams();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const [inmuebleData, setInmuebleData] = useState({});
  const [inmuebleCalif, setInmuebleCalif] = useState({});

  function recortarUrl(url) {
    if (!url) {
      return null;
    }
    const imagenCadena = JSON.stringify(url);
    const partes = imagenCadena.split('\\');
    const ultimaPalabra = partes[partes.length - 1];
    const resultadoSinComillas = ultimaPalabra.replace(/["']/g, '');
    console.log(inmuebleCalif)
    return resultadoSinComillas;
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        scrollToTop();
        if (inmuebleId != null) {
          const inmuebleResponse = await postService.getInmueble(inmuebleId);
          setInmuebleData(inmuebleResponse.data);
  
          const calificacionResponse = await postService.calificacionInm(inmuebleId);
          setInmuebleCalif(calificacionResponse)
        } else {
          console.log("Error al hacerlo");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [inmuebleId]);
  

    return(
        <div className="container" style={{backgroundColor: "#eee9f2", paddingTop:"3px"}}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1 style={{ color: '', marginLeft:"10em" }}>
                    {inmuebleData.titulo} 
                </h1>
                <h1 style={{ color: ''}}>
                  {Math.round(inmuebleCalif.data)}<i class="fa-solid fa-star" style={{color:"#ffd500"}}></i>
                </h1>
            </div>
            <div id="carouselExampleIndicators" class="carousel slide mt-3" data-ride="carousel">
                <ol className="carousel-indicators">
                  {inmuebleData.filePath?.map((image, index) => (
                    <li
                      key={index}
                      data-target="#carouselExampleIndicators"
                      data-slide-to={index}
                      className={index === 0 ? 'active' : ''}
                    ></li>
                  ))}
                </ol>
                <div className="carousel-inner">
                  {inmuebleData.filePath?.length > 0 ? (
                    inmuebleData.filePath.map((image, index) => (
                      <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img className="d-block w-100" style={{ height: "25rem"}} src={`../img/${(recortarUrl(image))}`} alt={`Imagen ${index + 1}`} />
                      </div>
                    ))
                  ) : (
                    <div>No hay imágenes cargadas</div>
                  )}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className='mt-3 ml-3'>
              {inmuebleData.filePath?.length > 0 ? (
                inmuebleData.filePath.map((image, index) => (
                  <div className='img-Container' key={index} style={{backgroundColor: "#000"}}>
                    <img style={{ width: "100%", height: "5rem" }} src={`../img/${(recortarUrl(image))}`} alt={`Imagen ${index + 1}`} />
                  </div>
                ))
              ) : (
                <div>No hay imágenes cargadas</div>
              )}
            </div>
            <div className='container mt-4'>
                <h3 className='text-center'>Características y Datos</h3>
                <div>
                  <div className="row mt-3 text-center" >
                      <div className="columna-c col-12 col-md-6 col-lg-2 p-2">
                          Example <i className=" ml-2 fa-solid fa-person-swimming"></i>
                      </div>
                      <div className="columna-c col-12 col-md-6 col-lg-2 p-2">
                          Example <i class="ml-2 bi bi-arrows-angle-expand"></i>
                      </div>
                      <div className="columna-c col-12 col-md-6 col-lg-2 p-2">
                          Example <i class="ml-2 bi bi-wifi"></i>
                      </div>
                      <div className="columna-c col-12 col-md-6 col-lg-2 p-2">
                          Example <i class="ml-2 bi bi-people"></i>
                      </div>
                      <div className="columna-c col-12 col-md-6 col-lg-2 p-2">
                          Example <i class="ml-2 bi bi-people"></i>
                      </div>
                      <div className="columna-c col-12 col-md-6 col-lg-2 p-2">
                          Example <i class="ml-2 bi bi-people"></i>
                      </div>
                      <div className="columna-c col-12 col-md-6 col-lg-2 p-2">
                          Example <i class="ml-2 bi bi-people"></i>
                      </div>
                      <div className="columna-c col-12 col-md-6 col-lg-2 p-2">
                          Example <i class="ml-2 bi bi-people"></i>
                      </div>
                  </div>
                </div>
                
                <div className='text-center'>
                  <p className='mt-2' style={{fontSize:"20px"}}>Ubicación : {inmuebleData.localidad}, {inmuebleData.ubicacion}</p>
                  <div id="mapa" style={{ height:"100%" }}>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13155.683357341622!2d-58.54236660285917!3d-34.47953236944883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb03cd891437f%3A0xab3b49e671350275!2sSan%20Isidro%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1699929341707!5m2!1ses-419!2sar"
                        width="600"
                        height="250"
                        style={{ border: 0 }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                </div>
            </div>
            <div className='mt-5 text-center' style={{display:"flex"}}>
              <div className='owner-cont' style={{width:"90rem",height:"20rem", border:"2px solid"}}>
                  <h3 className="mt-3 text-">Datos del Propietario</h3>
                  <p className="mt-4 text-">Nombre del Usuario: {inmuebleData.nombreUsuario}</p>
              </div>
              <div className='ml-3' style={{minWidth: "673px",}}>
                  <h3 className="mt-3 text-">Descripción</h3>
                  <p className="mt-3 text-">{inmuebleData.descripcion}</p>
              </div>
            </div>
        </div>
    )
}


export function SeccionComentarios() {
  const location = useLocation();
  const {inmuebleId} = useParams()
  const [valoracion, setValoracion] = useState({
    calificacion: 1,
  });

  const [comentario, setComentario] = useState({
    contenido: '',
  });
  const [comentarios, setComentarios] = useState([]);
  const [actualizarComentarios, setActualizarComentarios] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComentario({
      ...comentario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const [comentarioResponse, calificacionResponse] = await Promise.all([
        postService.agregarComentario(comentario, inmuebleId),
        postService.calificacion(valoracion, inmuebleId)
      ]);
      console.log('Comentario agregado exitosamente', comentarioResponse);
      setComentario({ contenido: '' });
      setTimeout(() => {
        setActualizarComentarios(!actualizarComentarios);
        setIsLoading(false);
      }, 4000);
    } catch (error) {
      console.error('Error al agregar el comentario o la calificación', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    postService.GetComentario(inmuebleId)
      .then((response) => {
        setComentarios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [inmuebleId, actualizarComentarios]); 

  return (
    <div className="container" style={{backgroundColor: "#eee9f2",display: "inline-block"}}>
      <div className="contenedor-com text-">
        <h3>Comentarios</h3>
        <form style={{paddingBottom:"2em"}} className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contenido text-">Deja tu Comentario:</label>
            <textarea
              className="form-control"
              name="contenido"
              id="contenido"
              value={comentario.contenido}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>
          <div className='container-stars' style={{display:"flex", alignItems:"center"}}>
            <p className='mr-3'>VALORACION (debe dar almenos una estrella): </p>
              <span id="estrellas">
                <p class="clasificacion">
                  <input id="radio1" type="radio" name="estrellas" value="5" onChange={() => setValoracion(5)}/>
                  <label for="radio1">&#9733;</label>
                  <input id="radio2" type="radio" name="estrellas" value="4" onChange={() => setValoracion(4)}/>
                  <label for="radio2">&#9733;</label>
                  <input id="radio3" type="radio" name="estrellas" value="3" onChange={() => setValoracion(3)}/>
                  <label for="radio3">&#9733;</label>
                  <input id="radio4" type="radio" name="estrellas" value="2" onChange={() => setValoracion(2)}/>
                  <label for="radio4">&#9733;</label>
                  <input id="radio5" type="radio" name="estrellas" value="1" onChange={() => setValoracion(1)} required/>
                  <label for="radio5">&#9733;</label>
                </p>
              </span>     
          </div>
          <button type="submit" id="load1" className={`btn ${isLoading ? 'disabled' : ''} btn-primary`} disabled={isLoading}>
            {isLoading ? (
              <>
                Cargando...<i class="fa-solid fa-rotate fa-spin"></i>
              </>
            ) : (
              'Agregar Comentario'
            )}
          </button>
        </form>
        {comentarios && comentarios.content && comentarios.content.length > 0 ? (
          <ul style={{ listStyleType: 'none', borderTop:"2px solid" }}>
            {comentarios.content.map((comentario, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', marginLeft:"2em", paddingBottom:"2em"}}>
                <i className="bi bi-person-circle" style={{ fontSize: '25px' }}></i>
                <div className="comment-box">
                  <form id="miFormulario" method="post" action="URL_PARA_ELIMINAR_COMENTARIO">
                    <div className="comment-head">
                      <strong>{comentario.nombreUsuario}</strong>
                      {/* {<button type="submit"><i className="bi bi-trash"></i></button>} */}
                    </div>
                    <div className="comment-content">
                      {comentario.contenido}
                      <input type="hidden" name="comentario_id" value={comentario.id} />
                    </div>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 mb-4">No hay comentarios</div>
        )}
      </div>
    </div>
  );
}
