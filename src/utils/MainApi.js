import {returnResult} from './returnResult';

class Api {
  constructor(apiSettings) {
    this._baseUrl = apiSettings.baseUrl;
    this._headers = apiSettings.headers
  }

  // validateLogin() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: 'GET',
  //     headers: this._headers,
  //     credentials: 'include',
  //     // withCredentials: true,
  //   })
  //     .then(res => { return returnResult(res) })
  // }


  validateLogin() {
    console.log('attempting login')
    return fetch(`${this._baseUrl}/auth`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
      withCredentials: true,
    })
      .then(res => { return returnResult(res) })
  }

  signup(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password
      })
    })
      .then(res => { return returnResult(res) })
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    })
      .then(res => { return returnResult(res) })
  }

  signout() {
    // return fetch(`${this._baseUrl}/signout`, {
    //   method: 'POST',
    //   headers: this._headers,
    // })
    //   .then(res => { return returnResult(res) })
  }

  editProfile(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        'name': name,
        'email': email
      })
    })
      .then(res => { return returnResult(res) })
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
  })
    .then(res => { return returnResult(res) })
  }

  likeMovie({country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, id}) {
    return fetch(`${this._baseUrl}/movies/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'country': country,
        'director': director,
        'duration': duration,
        'year': year,
        'description': description,
        'image': image,
        'trailer': trailer,
        'nameRU': nameRU,
        'nameEN': nameEN,
        'thumbnail': thumbnail,
        'movieId': id
      })
    })
      .then(res => { return returnResult(res) })
  }

  dislikeMovie(movie) {
    return fetch(`${this._baseUrl}/movies/${movie.id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => { return returnResult(res) })
  }
}

const apiSettings = {
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.bitfilms.nomoredomains.monster',
  headers: {
      'Content-Type': 'application/json',
  },
};

const api = new Api(apiSettings);
export default api;