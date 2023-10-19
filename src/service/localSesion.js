import jwtDecode from 'jwt-decode';

export default function Sesion_Usuario(){
  const token = localStorage.getItem("user");
  if (token) {
     const decodedToken = jwtDecode(token);
     const userEmail = decodedToken.sub; 
     return userEmail;
  } 
  else {
    return null; 
  }
}
