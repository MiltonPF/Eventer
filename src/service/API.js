import axios from 'axios';

class API {
  inmgetAllurl = "http://localhost:8080/api/inmueble/getAll";
  imagegetAllurl = "http://localhost:8080/api/inmueble/1";

  async fetchInmuebles() {
    try {
      const response = await axios.get(this.inmgetAllurl);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchImage() {
    try {
      const response = await axios.get(this.imagegetAllurl);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}




export default API;
