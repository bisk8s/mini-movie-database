import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { stringToArray } from 'App/Middleware/Helper';
import {
  MovieCast,
  MovieProducers,
  MovieDirectors
} from 'App/Models/MoviePerson';
import Movie from 'App/Models/Movie';

export default class MoviesController {
  public async index() {
    const all = Movie.query()
      .preload('casting')
      .preload('producers')
      .preload('directors');
    return all;
  }
  public async store({ request }: HttpContextContract) {
    const data = request.only([
      'title',
      'releaseYear',
      'casting',
      'producers',
      'directors'
    ]);
    const movie = await Movie.create(data);
    if (movie) {
      if (data.casting) {
        stringToArray(data.casting).map(personId => {
          MovieCast.create({
            movieId: movie.id,
            personId: parseInt(personId)
          });
        });
      }
      if (data.producers) {
        stringToArray(data.producers).map(personId => {
          MovieProducers.create({
            movieId: movie.id,
            personId: parseInt(personId)
          });
        });
      }
      if (data.directors) {
        stringToArray(data.directors).map(personId => {
          MovieDirectors.create({
            movieId: movie.id,
            personId: parseInt(personId)
          });
        });
      }
    }

    return movie;
  }
}
