import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { stringToArray } from 'App/Middleware/Helper';
import {
  MovieCast,
  MovieProducers,
  MovieDirectors
} from 'App/Models/MoviePerson';
import Person from 'App/Models/Person';

export default class PeopleController {
  public async index() {
    const all = Person.query()
      .preload('moviesAsActor')
      .preload('moviesAsDirector')
      .preload('moviesAsProducer');
    return all;
  }
  public async store({ request, auth }: HttpContextContract) {
    await auth.authenticate();
    const data = request.only([
      'lastName',
      'firstName',
      'aliases',
      'moviesAsActor',
      'moviesAsDirector',
      'moviesAsProducer'
    ]);
    const person = await Person.firstOrCreate(data);
    if (person) {
      if (data.moviesAsActor) {
        stringToArray(data.moviesAsActor).map(movieId => {
          MovieCast.firstOrCreate({
            personId: person.id,
            movieId: parseInt(movieId)
          });
        });
      }
      if (data.moviesAsProducer) {
        stringToArray(data.moviesAsProducer).map(movieId => {
          MovieProducers.firstOrCreate({
            personId: person.id,
            movieId: parseInt(movieId)
          });
        });
      }
      if (data.moviesAsDirector) {
        stringToArray(data.moviesAsDirector).map(movieId => {
          MovieDirectors.firstOrCreate({
            personId: person.id,
            movieId: parseInt(movieId)
          });
        });
      }
    }
    return person;
  }
}
