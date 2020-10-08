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
  public async update({ request, auth }: HttpContextContract) {
    await auth.authenticate();
    const data = request.only(['id', 'lastName', 'firstName', 'aliases']);
    const relationships = request.only([
      'moviesAsActor',
      'moviesAsDirector',
      'moviesAsProducer'
    ]);
    const person = await Person.findOrFail(parseInt(data.id));
    person.lastName = data.lastName || person.lastName;
    person.firstName = data.firstName || person.firstName;
    person.aliases = data.aliases || person.aliases;
    await person.save();
    if (person) {
      if (relationships.moviesAsActor) {
        stringToArray(relationships.moviesAsActor).map(movieId => {
          MovieCast.firstOrCreate({
            personId: person.id,
            movieId: parseInt(movieId)
          });
        });
      }
      if (relationships.moviesAsProducer) {
        stringToArray(relationships.moviesAsProducer).map(movieId => {
          MovieProducers.firstOrCreate({
            personId: person.id,
            movieId: parseInt(movieId)
          });
        });
      }
      if (relationships.moviesAsDirector) {
        stringToArray(relationships.moviesAsDirector).map(movieId => {
          MovieDirectors.firstOrCreate({
            personId: person.id,
            movieId: parseInt(movieId)
          });
        });
      }
    }
    return person;
  }
  public async remove({ request, auth }: HttpContextContract) {
    await auth.authenticate();
    const data = request.only(['id']);
    const movie = await Person.findOrFail(parseInt(data.id));
    await movie.delete();
    return { deletedId: data.id };
  }
}
