import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/fav/";

class RicklocalService {
  getall(name, page, status, gender) {
    return axios
      .post(
        API_URL + "getall",
        {
          name,
          page,
          status,
          gender
        },
        { headers: authHeader() }
      )
      .then(this.handleResponse)
      .then(response => {
        return response.data;
      });
  }
  getallwp() {
    return axios
      .post(API_URL + "getallwp",{}, { headers: authHeader() })
      .then(this.handleResponse)
      .then(response => {
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  saveone(id, image, name, status, gender, species) {
    return axios
      .post(
        API_URL,
        {
          id_char: id,
          image,
          name,
          status,
          gender,
          species
        },
        { headers: authHeader() }
      )
      .then(this.handleResponse)
      .then(response => {
        return response.data;
      });
  }

  deleteone(id, image, name, status, gender, species) {
    return axios
      .post(
        API_URL + "del",
        {
          id_char: id,
          image,
          name,
          status,
          gender,
          species
        },
        { headers: authHeader() }
      )
      .then(this.handleResponse)
      .then(response => {
        return response.data;
      });
  }
  handleResponse(response) {
    if (response.status === 401) {
      this.logout();
      location.reload(true);

      const error = response.data && response.data.message;
      return Promise.reject(error);
    }

    return Promise.resolve(response);
  }
}

export default new RicklocalService();
