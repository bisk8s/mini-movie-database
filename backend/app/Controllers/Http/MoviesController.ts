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
  public async store({ request, auth }: HttpContextContract) {
    await auth.authenticate();
    const data = request.only(['title', 'releaseYear']);
    const relationships = request.only(['casting', 'producers', 'directors']);
    const movie = await Movie.firstOrCreate(data);
    if (movie) {
      if (relationships.casting) {
        stringToArray(relationships.casting).map(personId => {
          MovieCast.firstOrCreate({
            movieId: movie.id,
            personId: parseInt(personId)
          });
        });
      }
      if (relationships.producers) {
        stringToArray(relationships.producers).map(personId => {
          MovieProducers.firstOrCreate({
            movieId: movie.id,
            personId: parseInt(personId)
          });
        });
      }
      if (relationships.directors) {
        stringToArray(relationships.directors).map(personId => {
          MovieDirectors.create({
            movieId: movie.id,
            personId: parseInt(personId)
          });
        });
      }
    }
    return movie;
  }
  public async update({ request, auth }: HttpContextContract) {
    await auth.authenticate();
    const data = request.only([
      'id',
      'title',
      'releaseYear',
      'casting',
      'producers',
      'directors'
    ]);
    const movie = await Movie.findOrFail(parseInt(data.id));
    movie.title = data.title || movie.title;
    movie.releaseYear = data.releaseYear || movie.releaseYear;
    await movie.save();
    if (movie) {
      if (data.casting) {
        stringToArray(data.casting).map(personId => {
          MovieCast.firstOrCreate({
            movieId: movie.id,
            personId: parseInt(personId)
          });
        });
      }
      if (data.producers) {
        stringToArray(data.producers).map(personId => {
          MovieProducers.firstOrCreate({
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
