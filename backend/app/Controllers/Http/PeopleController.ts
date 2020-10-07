import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Person from 'App/Models/Person';

export default class PeopleController {
  public async index() {
    const all = Person.all();
    return all;
  }
  public async store({ request }: HttpContextContract) {
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
