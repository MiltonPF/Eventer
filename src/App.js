import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavBar from './NavBar';
import { Login, Rutas } from './Login';
import { Cards, Footer, Slider } from "./Home";
import authService from "./service/auth-service";
import AgregarInmuebleForm from "./Perfil_User/Perfil_agregarInmueble";
import Perfil from "./Perfil_User/Perfil";
import RenderizarComentario, { InmuebleHome, SeccionComentarios } from "./inmueble/inmueble_principal";
import BuscarInmuebles from "./Busqueda";

function App() {
  const token = localStorage.getItem("user");
  const isAuthenticated = !!token;

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<><NavBar /><Slider /><Cards /><Footer /></>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/busq" element={<BuscarInmuebles />} />
        <Route path="/InmuebleHome/:inmuebleId" element={<><NavBar /><div className="inm-container container"><InmuebleHome /><SeccionComentarios /><Footer /></div></>} />

        {/* Protected routes */}
        {isAuthenticated ? (
          <>
            <Route path="/Perfil" element={<><NavBar /><Perfil /></>} />
            <Route path="/Perfil_agregarInmueble" element={<><NavBar /><AgregarInmuebleForm /></>} />
            <Route path="/InmuebleHome/:inmuebleId"/>
          </>
        ) : (
          // Redirect to "/" if there is no valid token
          <Route path="*" element={<Navigate to="/" />} />
        )}

      </Routes>
    </Router>
  );
}

export default App;
