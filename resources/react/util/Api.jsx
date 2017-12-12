import _ from 'lodash';
import axios from 'axios';

class API{

  _getToken = () => {
    let jwt = getCookie('token');
    let token = null;
    if(jwt){
      jwt = JSON.parse(jwt);
      token = jwt.token;
    }
    return token;
  };

  get = (url, options) => {
    return axios.get("/api/v1" + url, _.merge(options, {
      headers: { authorization: "Bearer " + this._getToken() }
    }));
  };

  post = (url, data, options) => {
    return axios.post("/api/v1" + url, data, _.merge(options, {
      headers: { authorization: "Bearer " + this._getToken() }
    }));
  }
}

const Api = new API();

export default Api;

function getCookie(cname){
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
