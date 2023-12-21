import React, { useEffect, useState } from 'react';
import axios from 'axios';
import postService from './service/post-service';

function BuscarInmuebles() {
    const [posts, setPosts] = useState([]);
    const [val, setVal] = useState('');
  
    useEffect(() => {
      postService.getAllInmuebles().then(
        (response) => {
          setPosts(response.data);
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }, []);
  
    const data = posts.map((post) => ({
      titulo: post.titulo,
      localidad: post.localidad,
    }));
  
    return (
      <div className="main">
        <input list="data" onChange={(e) => setVal(e.target.value)} placeholder="Search" />
        <datalist id="data">
          {data.map((property, index) => (
            <option key={index} value={`${property.titulo} - ${property.localidad}`} />
          ))}
        </datalist>
  
        <h1>{val}</h1>
      </div>
    );
  }
  
  export default BuscarInmuebles;