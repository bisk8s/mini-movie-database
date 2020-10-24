import { combineReducers } from 'redux';
import { MovieData, PersonData } from '../../services/Api';

import Movie from './Movie';
import Person from './Person';
import Session, { AuthData } from './Session';

const reducers = {
  movie: Movie,
  person: Person,
  session: Session
};
export type State = {
  movie: MovieData;
  person: PersonData;
  session: AuthData;
};

const combined = combineReducers(reducers);
export default combined;
