import {returnResult} from './returnResult';

class MoviesApi {
  constructor(apiSettings) {
    this.serverUrl = apiSettings.serverUrl;
    this._baseUrl = apiSettings.baseUrl;
    this._headers = apiSettings.headers
  }

  getMovies() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => { return returnResult(res) })
  }
}

const apiSettings = {
  serverUrl: 'https://api.nomoreparties.co',
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
      'Content-Type': 'application/json',
  },
};

const moviesApi = new MoviesApi(apiSettings);
export default moviesApi;