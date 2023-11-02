import axios from "axios";

const API_URL = "http://localhost:8080/api/inmueble";
const API_URL_login = "http://localhost:8080/api/inmueble/auth/authenticate";


const signup = (email, password) => {
  return axios
    .post(API_URL + "/register", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL_login, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(JSON.parse(localStorage.getItem("user")))
      return response.data;
      
    });
};

function logout() {
  return localStorage.clear()
}


const authService = {
  signup,
  login,
  logout,
};

export default authService;