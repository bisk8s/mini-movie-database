import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

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
    const person = await Person.create(data);
    return person;
  }
}
