import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './NavBar';
import FormLogin, {InmueblesList} from './FormLogin';
import {Cards} from './Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <NavBar/>
  <Cards/>
  </>
);

