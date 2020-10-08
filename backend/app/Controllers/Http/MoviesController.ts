import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Movie from 'App/Models/Movie';

export default class MoviesController {
  public async index() {
    const all = Movie.query()
      .preload('casting')
      .preload('directors')
      .preload('producers');
    return all;
  }
  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'releaseYear']);
    const person = await Movie.create(data);
    return person;
  }
}
