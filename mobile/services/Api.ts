import moment from 'moment';
import { Alert } from 'react-native';
import { first, get, isEmpty } from 'lodash';
import LocalStorage from './LocalStorage';

//#region helper
export const getToken = async (username: string, password: string) => {
  const token = await loginWithPassword(username, password);
  if (token) {
    LocalStorage.set('username', username);
    LocalStorage.set('password', password);
  }
  return token;
};
//#endregion

type AuthError = {
  Message: string;
};

//#region Config
export const API_PROTOCOL = 'http';
export const API_DOMAIN = 'localhost:3333';

export const API_URL = `${API_PROTOCOL}://${API_DOMAIN}`;
//#endregion

//#region JSON
async function fetchJSON(path: string, options: RequestInit): Promise<any> {
  const basePath = API_URL;
  const jsonPath = [basePath, path].join('/');
  console.log(`[${moment().format()}|${options.method}]`, jsonPath);
  console.log('[REQ>>]', JSON.stringify(options, null, 4));
  return fetch(jsonPath, options)
    .then(response => {
      const json = response.json();
      return json;
    })
    .then(data => {
      //DEBUG RESPONSE
      console.log(`[${moment().format()}|${options.method}]`, jsonPath);
      console.log('[RES>>]', JSON.stringify(data, null, 4));
      const message = get(<AuthError>data, 'Message', false);
      if (message) {
        Alert.alert('Erro de Autorização', message);
      }
      return data;
    })
    .catch(e => {
      Alert.alert('Erro de Parsing', 'O serviço respondeu com: \n\n' + e);
      return null;
    });
}
//#endregion

function getFormData(object: any): FormData {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}

//#region Login
type LoginPasswordError = {
  errors: { message: string }[];
};
type LoginPasswordSuccess = {
  token: string;
  type: string;
};
export async function loginWithPassword(
  email: string,
  password: string
): Promise<string | null> {
  const data = getFormData({ email, password });
  console.log(data);

  const options: RequestInit = {
    method: 'POST',
    body: data
  };
  return fetchJSON('token', options)
    .then(response => {
      if (response.token) {
        const { token } = <LoginPasswordSuccess>response;
        return token;
      } else {
        const { errors } = <LoginPasswordError>response;
        Alert.alert('Error', first(errors)?.message || 'Unkow nerror.');
      }
      return null;
    })
    .catch(e => {
      Alert.alert('Login failed', 'Server responded with: \n' + e);
      return null;
    });
}
//#endregion
