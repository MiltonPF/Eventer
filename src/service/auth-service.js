import axios from "axios";
import jwtDecode from "jwt-decode";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/inmueble";
const API_URL_login = "http://localhost:8080/api/inmueble/auth/authenticate";

const signup = async (firstname, lastname,email, password) => {
  try {
    const response = await axios.post("http://localhost:8080/api/inmueble/auth/register", {
      firstname,
      lastname,
      email,
      password,
    });

    if (response.data.accessToken) {
      const decodedToken = jwtDecode(response.data.accessToken);
      const userEmail = decodedToken.sub;

      localStorage.setItem("user", JSON.stringify(response.data));

      try {
        const userDataResponse = await axios.get(`http://localhost:8080/api/user/${userEmail}`, {
          headers: authHeader(),
        });

        if (userDataResponse.data) {
          localStorage.setItem("userData", JSON.stringify(userDataResponse.data));
        }

        console.log(JSON.parse(localStorage.getItem("userData")));
      } catch (userDataError) {
        console.error('Error fetching user data:', userDataError);
      }
    }

    console.log(JSON.parse(localStorage.getItem("user")));
    return response.data;
  } catch (error) {
    alert("Inicio de sesión fallido. Credenciales incorrectas.");
    throw error; 
  }
};

const login = async (email, password) => {
  console.log(email, password);
  try {
    const response = await axios.post(API_URL_login, {
      email,
      password,
    });

    if (response.data.accessToken) {
      const decodedToken = jwtDecode(response.data.accessToken);
      const userEmail = decodedToken.sub;
      console.log(userEmail)
      localStorage.setItem("user", JSON.stringify(response.data));
      try {
        console.log('Before fetching user data');
        const userDataResponse = await axios.get(`http://localhost:8080/api/user/${userEmail}`, {
            headers: authHeader(),
        });
        console.log('After fetching user data');
    
        if (userDataResponse.data) {
            localStorage.setItem("userData", JSON.stringify(userDataResponse.data));
        }
    
        console.log(JSON.parse(localStorage.getItem("userData")));
      } catch (userDataError) {
        console.error('Error fetching user data:', userDataError);
    }    
    }

    console.log(JSON.parse(localStorage.getItem("user")));
    return response.data;
  } catch (error) {
    alert("Inicio de sesión fallido. Credenciales incorrectas.");
    throw error;
  }
};

function logout() {
  return localStorage.clear();
}

const authService = {
  signup,
  login,
  logout,
};

export default authService;
