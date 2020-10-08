import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import {
  MovieCast,
  MovieProducers,
  MovieDirectors
} from 'App/Models/MoviePerson';

export default class MoviePeopleController {
  public async removeCasting({ request, auth }: HttpContextContract) {
    await auth.authenticate();
    const data = request.only(['id']);
    const relation = await MovieCast.findOrFail(parseInt(data.id));
    await relation.delete();
    return { deletedId: data.id };
  }
  public async removeProducer({ request, auth }: HttpContextContract) {
    await auth.authenticate();
    const data = request.only(['id']);
    const relation = await MovieProducers.findOrFail(parseInt(data.id));
    await relation.delete();
    return { deletedId: data.id };
  }
  public async removeDirector({ request, auth }: HttpContextContract) {
    await auth.authenticate();
    const data = request.only(['id']);
    const relation = await MovieDirectors.findOrFail(parseInt(data.id));
    await relation.delete();
    return { deletedId: data.id };
  }
}
