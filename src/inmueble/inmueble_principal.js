import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    const location = useLocation();
  const inmuebleId = location.state.id;
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const [inmuebleData, setInmuebleData] = useState({});
  
  useEffect(() => {
    scrollToTop();
    // Llama a la función getInmueble pasando el inmuebleId
    postService.getInmueble(inmuebleId).then(
      (response) => {
        setInmuebleData(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
   
  }, []);

    return(
        <div className="container">
            <div>
                <h1>
                    {inmuebleData.nombre} 
                </h1>
            </div>
            <div id="carouselExampleIndicators" class="carousel slide mt-3" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100 imgSlider" style={{ height: "25rem" }} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100 imgSlider" style={{ height: "25rem" }} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100 imgSlider" style={{ height: "25rem" }} alt="Third slide"/>
                    </div>
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
            <div className='container'>
                <div className="row mt-3 text-center">
                    <div className="columna-c col p-2">
                        Example <i className=" ml-2 fa-solid fa-person-swimming"></i>
                    </div>
                    <div className="columna-c col p-2">
                        Example <i class="ml-2 bi bi-arrows-angle-expand"></i>
                    </div>
                    <div className="columna-c col p-2">
                        Example <i class="ml-2 bi bi-wifi"></i>
                    </div>
                    <div className="columna-c col p-2">
                        Example <i class="ml-2 bi bi-people"></i>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="mt-3">Descripción</h3>
                <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices gravida dictum fusce ut placerat. Vestibulum sed arcu non odio euismod lacinia at. Quis hendrerit dolor magna eget est lorem ipsum dolor. Eros donec ac odio tempor orci. Eget mauris pharetra et ultrices neque ornare. Laoreet non curabitur gravida arcu ac tortor dignissim convallis. Sed turpis tincidunt id aliquet risus feugiat in. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Tincidunt id aliquet risus feugiat in ante. Tortor condimentum lacinia quis vel eros. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Sed ullamcorper morbi tincidunt </p>
                <p className='mt-4'>ornare massa eget. Eu non diam phasellus vestibulum lorem sed risus ultricies tristique. Duis tristique sollicitudin nibh sit amet commodo nulla. Porttitor rhoncus dolor purus non. Nunc scelerisque viverra mauris in aliquam sem fringilla ut. Mauris augue neque gravida in. Scelerisque in dictum non consectetur a erat nam at. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet.</p>
                <p className='mt-4'>Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Tincidunt id aliquet risus feugiat in ante. Tortor condimentum lacinia quis vel eros. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Sed ullamcorper morbi tincidunt</p>
            </div>
        </div>
    )
}


export function SeccionComentarios() {
  const location = useLocation();
  const inmuebleId = location.state.id;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    postService
      .agregarComentario(comentario, inmuebleId)
      .then((response) => {
        console.log('Comentario agregado exitosamente');
        setComentario({ contenido: '' });
        setTimeout(() => {
          setActualizarComentarios(!actualizarComentarios);
          setIsLoading(false);
        }, 4000);
      })
      .catch((error) => {
        console.error('Error al agregar el comentario', error);
      });
  };

  useEffect(() => {
    postService.GetComentario(inmuebleId)
      .then((response) => {
        setComentarios(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [inmuebleId, actualizarComentarios]); // Agregamos actualizarComentarios como dependencia

  return (
    <div className="container">
      <div className="contenedor-com">
        <h3>Comentarios</h3>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contenido">Deja tu Comentario:</label>
            <textarea
              className="form-control"
              name="contenido"
              id="contenido"
              value={comentario.contenido}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
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
          comentarios.content.map((comentario, index) => (
            <div key={index} className="mt-4 mb-4">
              <div className="media mt-2">
                <div className="media-body">
                  <h6 className="mt-0" style={{ fontSize: '15px' }}>
                    <i className="bi bi-person-circle"></i> {comentario.nombreUsuario}
                  </h6>
                  <p>{comentario.contenido}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="mt-4 mb-4">No hay comentarios</div>
        )}
      </div>
    </div>
  );
}