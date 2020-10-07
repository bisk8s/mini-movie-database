import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');

    const user = await User.create({ email, password });
    return user;
  }
}
