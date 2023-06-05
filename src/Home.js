import './App.css';
import imgNF from './img/not-found.jpg';

export function Cards() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

  const PropiedadCard = () => {
    return (
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card">
          <img src={imgNF} style={{ height: "10rem" }} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">Propiedad</h5>
            <p className="card-text">Esta es la Descripcion</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <i className="fa-solid fa-person"></i> Max: 4
            </li>
            <li className="list-group-item">
              <i className="fa-solid fa-door-open"></i> 3 amb.
            </li>
            <li className="list-group-item">
              <i className="fa-solid fa-person-swimming"></i> NO
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderPropiedadCards = () => {
    return numbers.map((number, index) => <PropiedadCard key={index} />);
  };

  return (
    <div className="container">
      <div className="row">{renderPropiedadCards()}</div>
    </div>
  );
}
