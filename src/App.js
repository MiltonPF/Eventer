import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from './NavBar';
import { Login, Rutas } from './Login';
import { Cards } from "./Home";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<> <NavBar/> <Cards/> </>} />
            </Routes>
        </Router>
    );
}

export default App;
