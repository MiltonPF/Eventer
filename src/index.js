import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './NavBar';
import FormLogin, {API} from './FormLogin';
import {Cards} from './Home';
import Asd from './Asd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <FormLogin />
  <API />
  </>
);

