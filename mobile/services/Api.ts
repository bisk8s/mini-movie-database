import moment from 'moment';
import { Alert } from 'react-native';
import { get } from 'lodash';
import qs from 'querystring';
import LocalStorage from './LocalStorage';

//#region helper
export const getToken = async (email: string, password: string) => {
  const token = await loginWithPassword(email, password);
  if (token) {
    LocalStorage.set('email', email);
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
export const API_DOMAIN = '192.168.1.56:3333';

export const API_URL = `${API_PROTOCOL}://${API_DOMAIN}`;
//#endregion

//#region JSON
async function fetchJSON<T>(path: string, options: RequestInit): Promise<T> {
  const basePath = API_URL;
  const jsonPath = [basePath, path].join('/');
  // console.log(`[${moment().format()}|${options.method}]`, jsonPath);
  // console.log('[REQ>>]', JSON.stringify(options, null, 4));
  return fetch(jsonPath, options)
    .then(response => {
      const json = response.json();
      return json;
    })
    .then(data => {
      //DEBUG RESPONSE
      // console.log(`[${moment().format()}|${options.method}]`, jsonPath);
      // console.log('[RES>>]', JSON.stringify(data, null, 4));
      const message = get(<AuthError>data, 'Message', false);
      if (message) {
        Alert.alert('Erro de Autorização', message);
      }
      return data;
    })
    .catch(e => {
      Alert.alert('Error', 'O serviço respondeu com: \n\n' + e);
      return null;
    });
}
//#endregion

function getFormData(object: any): FormData {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}

export type GenericError = {
  errors: { message: string }[];
};

//#region User/Login
export type LoginPasswordSuccess = {
  token: string;
  type: string;
};
export type UserData = {
  email: string;
  password: string;
};
export async function loginWithPassword(
  email: string,
  password: string
): Promise<string | null> {
  const data = getFormData({ email, password });
  const options: RequestInit = {
    method: 'POST',
    body: data
  };
  return fetchJSON<LoginPasswordSuccess>('token', options)
    .then(response => {
      const { token } = <LoginPasswordSuccess>response;
      return token;
    })
    .catch(e => {
      Alert.alert('Login failed', 'Server responded with: \n' + e);
      return null;
    });
}

export async function addUser(user: UserData): Promise<UserData | null> {
  const data = getFormData(user);
  const options: RequestInit = {
    method: 'POST',
    body: data
  };
  return fetchJSON<UserData>('user', options)
    .then(response => {
      return <UserData>response;
    })
    .catch(e => {
      Alert.alert('Login failed', 'Server responded with: \n' + e);
      return null;
    });
}
//#endregion

//#region Types
export type PeopleResponseData = {
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    previous_page_url: string;
  };
  data: PersonData[];
};
export type MoviesResponseData = {
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    previous_page_url: string;
  };
  data: MovieData[];
};
export type PersonData = {
  id: number;
  last_name: string;
  first_name: string;
  aliases: string[];
  created_at: string;
  updated_at: string;
  moviesAsProducer?: MovieData[];
  moviesAsActor?: MovieData[];
  moviesAsDirector?: MovieData[];
};
export type MovieData = {
  id: number;
  title: string;
  release_year: number;
  created_at: string;
  updated_at: string;
  releaseYearRoman: string;
  casting?: PersonData[];
  directors?: PersonData[];
  producers?: PersonData[];
};
//#endregion

//#region Person
export async function getPeople(
  searchQuery: string,
  page: number
): Promise<PeopleResponseData | null> {
  const queryString = qs.encode({
    s: searchQuery,
    page
  });
  const options: RequestInit = {
    method: 'GET'
  };
  try {
    const response = await fetchJSON<PeopleResponseData>(
      `people?${queryString}`,
      options
    );
    return <PeopleResponseData>response;
  } catch (e) {
    Alert.alert('Login failed', 'Server responded with: \n' + e);
    return null;
  }
}
export async function addPerson(
  person: PersonData
): Promise<PersonData | null> {
  const data = getFormData(person);
  const options: RequestInit = {
    method: 'POST',
    body: data
  };
  return fetchJSON<PersonData>('person', options)
    .then(response => {
      return <PersonData>response;
    })
    .catch(e => {
      Alert.alert('Login failed', 'Server responded with: \n' + e);
      return null;
    });
}
//#endregion

//#region Movie
export async function getMovies(
  searchQuery: string,
  page: number
): Promise<MoviesResponseData | null> {
  const queryString = qs.encode({
    s: searchQuery,
    page
  });
  const options: RequestInit = {
    method: 'GET'
  };
  try {
    const response = await fetchJSON<MoviesResponseData>(
      `movies?${queryString}`,
      options
    );
    return <MoviesResponseData>response;
  } catch (e) {
    Alert.alert('Login failed', 'Server responded with: \n' + e);
    return null;
  }
}
export async function addMovie(
  title: string,
  releaseYear: number,
  token: string
): Promise<MovieData | null> {
  const form = { title, releaseYear };
  const data = getFormData(form);
  const options: RequestInit = {
    method: 'POST',
    body: data,
    headers: {
      authorization: `Bearer ${token}`
    }
  };
  return fetchJSON<MovieData>('movie', options)
    .then(response => {
      return response;
    })
    .catch(e => {
      Alert.alert('Login failed', 'Server responded with: \n' + e);
      return null;
    });
}
//#endregion
