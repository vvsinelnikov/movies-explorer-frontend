import {returnResult} from './returnResult';

class Api {
  constructor(apiSettings) {
    this._baseUrl = apiSettings.baseUrl;
  }

  getMyProfile (jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
  }

  signup(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => {
        return returnResult(res) })
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
          return data;
        }
      })
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => { return returnResult(res) })
      .then((data) => {
        if (data.jwt){
          localStorage.setItem('jwt', data.jwt);
          return data;
        }
      })
  }

  editProfile(name, email, jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        'name': name,
        'email': email
      })
    })
      .then(res => { return returnResult(res) })
  }

  getLikedMovies(jwt) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
  })
    .then(res => { return returnResult(res) })
  }

  likeMovie(jwt, movie) {
    return fetch(`${this._baseUrl}/movies/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(movie)
    })
      .then(res => { return returnResult(res) })
  }

  dislikeMovie(jwt, movie) {
    return fetch(`${this._baseUrl}/movies/${movie.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    })
      .then(res => { return returnResult(res) })
  }
}

const apiSettings = {
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.bitfilms.nomoredomains.monster',
};

const api = new Api(apiSettings);
export default api;