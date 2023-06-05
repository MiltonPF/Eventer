import './App.css';
import imgNF from './img/not-found.jpg'; 

function Asd() {
  return (
    <div class ="container">
        <div class="row">
            <div class = "col-12 col-md-6 col-lg-4">
                <div class= "card">
                    <img src={imgNF} style={{height: 10 + 'rem'}} class="card-img-top" alt=""/>
                    <div class= "card-body">
                        <h5 class="card-tittle">Propiedad</h5>
                        <p class = "card-text">Esta es la Descripcion</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><i class="fa-solid fa-person"></i> 4</li>
                        <li class="list-group-item"><i class="fa-solid fa-door-open"></i> 3 amb.</li>
                        <li class="list-group-item"><i class="fa-solid fa-person-swimming"></i> NO</li>
                    </ul>
                </div>
            </div>
            <div class = "col-12 col-md-6 col-lg-4">
                <div class= "card">
                    <img src={imgNF} style={{height: 10 + 'rem'}} class="card-img-top" alt=""/>
                    <div class= "card-body">
                        <h5 class="card-tittle">Propiedad</h5>
                        <p class = "card-text">Esta es la Descripcion</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><i class="fa-solid fa-person"></i> 4</li>
                        <li class="list-group-item"><i class="fa-solid fa-door-open"></i> 3 amb.</li>
                        <li class="list-group-item"><i class="fa-solid fa-person-swimming"></i> NO</li>
                    </ul>
                </div>
            </div>
            <div class = "col-12 col-md-6 col-lg-4">
                <div class= "card">
                    <img src={imgNF} style={{height: 10 + 'rem'}} class="card-img-top" alt=""/>
                    <div class= "card-body">
                        <h5 class="card-tittle">Propiedad</h5>
                        <p class = "card-text">Esta es la Descripcion</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><i class="fa-solid fa-person"></i> 4</li>
                        <li class="list-group-item"><i class="fa-solid fa-door-open"></i> 3 amb.</li>
                        <li class="list-group-item"><i class="fa-solid fa-person-swimming"></i> NO</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
  
  );
}

export default Asd;



