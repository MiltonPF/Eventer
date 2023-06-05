import './App.css';

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">LOGO</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <form class="d-flex" role="search">
        <input class="inp form-control me-2" type="search" placeholder="Buscar Propiedades..." aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>
      <ul class="nvv navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Acerca de</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Usuario1 <i class="bi bi-person-circle"></i></a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  

  );
}

export default NavBar;
