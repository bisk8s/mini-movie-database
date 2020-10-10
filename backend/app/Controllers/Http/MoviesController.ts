import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { stringToArray } from 'App/Middleware/Helper';
import {
  MovieCast,
  MovieProducers,
  MovieDirectors
} from 'App/Models/MoviePerson';
import Movie from 'App/Models/Movie';

export default class MoviesController {
  public async index({ request }) {
    const { s, page } = request.only(['s', 'page']);
    let filtered = Movie.query();
    if (s && s.length) {
      const searchQuery = s.split(/\s/i).map((queryPart: string) => {
        return `%${queryPart.trim()}%`;
      });
      searchQuery.forEach((term: string) => {
        filtered = filtered.orWhereRaw(
          `lower(title) like '${term.toLowerCase()}'`
        );
        filtered = filtered.orWhereRaw(
          `lower (cast(release_year as text)) like '${term.toLowerCase()}'`
        );
      });
    }

    const preloaded = filtered
      .preload('casting')
      .preload('producers')
      .preload('directors')
      .paginate(page || 1);
    return preloaded;
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
  public async remove({ request, auth }: HttpContextContract) {
    await auth.authenticate();
    const data = request.only(['id']);
    const movie = await Movie.findOrFail(parseInt(data.id));
    await movie.delete();
    return { deletedId: data.id };
  }
}
