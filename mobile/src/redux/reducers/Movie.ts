import { MovieData } from '../../services/Api';

const DEFAULT_STATE: MovieData = {
  id: 0,
  title: '',
  release_year: 0,
  created_at: '',
  updated_at: '',
  releaseYearRoman: ''
};

const Movies = (state: MovieData = DEFAULT_STATE, action: string) => {
  switch (action) {
    default:
      return state;
  }
};

export default Movies;
