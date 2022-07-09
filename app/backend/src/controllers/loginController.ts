import { Request, Response } from 'express';
import comparison from '../utils/bcryptComparison';
import users from '../database/models/users';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log('cheguei no controller');

    const findUser = await users.findOne({ where: { email } });
    console.log('cheguei no controller 2');

    if (!findUser) {
      return res.status(400).send('User or Password are incorrect');
    }
    const results = await comparison(password, findUser.password);
    if (!results) {
      return res.status(400).json('User or Password are invalid');
    }
    return res.status(200).json('Logged In successfully');
  }
}
