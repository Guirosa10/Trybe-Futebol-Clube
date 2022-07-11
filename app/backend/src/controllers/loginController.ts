import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import comparison from '../utils/bcryptComparison';
import users from '../database/models/users';

dotenv.config();

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log('cheguei no controller');

    const findUser = await users.findOne({ where: { email } });
    console.log('cheguei no controller 2');

    if (!findUser) {
      return res.status(401).send({ message: 'Incorrect email or password' });
    }
    const results = await comparison(password, findUser.password);
    if (!results) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const secret : string = process.env.JWT_SECRET as string;
    const token = jwt.sign({ email }, secret);

    return res.status(200).json({ token });
  }
}
