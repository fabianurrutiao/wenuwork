import axios from 'axios'

const API_URL = 'https://rickandmortyapi.com/api/'

class RickService {
  getCharbyPageName(name,page,status,gender){
    return axios
      .get(API_URL + 'character/' + '?name=' + name + '&page=' + page + '&status=' + status + '&gender=' + gender)
      .then(this.handleResponse)
      .then(response => {
        return response.data;
      })
  }
  logout () {
    localStorage.removeItem('user')
  }

  getAllEpisodes(page){
    return axios
      .get(API_URL + 'episode/?page=' + page)
      .then(this.handleResponse)
      .then(response => {
        return response.data;
      })
  }

  handleResponse (response) {
    //Revisar los datos
    if (response.status === 401) {
      //tengo error en la app por que no leo ver que hacer
      this.logout()
      location.reload(true)

      const error = response.data && response.data.message
      return Promise.reject(error)
    }

    return Promise.resolve(response)
  }
}

export default new RickService()