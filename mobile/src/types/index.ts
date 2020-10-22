import { MovieData, PersonData } from '../services/Api';

export type RootStackParamList = {
  Internal: undefined;
  UserAdd: undefined;
  Login: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  MovieTab: undefined;
  PersonTab: undefined;
};

export type MovieTabParamList = {
  MovieHome: undefined;
  MovieDetail: { movie: MovieData };
  MovieEdit: { movie: MovieData };
  MovieAdd: undefined;
};

export type PersonTabParamList = {
  PersonHome: undefined;
  PersonDetail: { person: PersonData };
  PersonEdit: { person: PersonData };
  PersonAdd: undefined;
};
