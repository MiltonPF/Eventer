import './App.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">LOGO</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    <form className="d-flex" role="search">
        <input className="inp form-control me-2" type="search" placeholder="Buscar Propiedades..." aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Buscar</button>
      </form>
      <ul className="nvv navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Inicio</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Acerca de</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Usuario1 <i className="bi bi-person-circle"></i></a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  

  );
}

export default NavBar;
