import {returnResult} from './returnResult';

class Api {
  constructor(apiSettings) {
    this._baseUrl = apiSettings.baseUrl;
    this._headers = apiSettings.headers
  }

  signup(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      // credentials: 'include',
      referrer: 'unsafe-url',
      headers: this._headers,
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password
      })
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