import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from './NavBar';
import { Login, Rutas } from './Login';
import { Cards, Footer, Slider } from "./Home";
import axios from "axios";
import authService from "./service/auth-service";
import AgregarInmuebleForm from "./Perfil_User/Perfil_agregarInmueble";
import Perfil from "./Perfil_User/Perfil";
import RenderizarComentario, { InmuebleHome, SeccionComentarios } from "./inmueble/inmueble_principal";



function App() {
    const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);
      

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<> <NavBar/> <Slider/> <Cards/> <Footer/> </>} />
                <Route path="Perfil" element={<> <NavBar/> <Perfil/> </>} />
                <Route path="Perfil_agregarInmueble" element={<> <NavBar/> <AgregarInmuebleForm/> </>} />
                <Route path="InmuebleHome" element={<> <NavBar/> <InmuebleHome/> <SeccionComentarios/> </>} />
            </Routes>
        </Router>
    );
}

export default App;