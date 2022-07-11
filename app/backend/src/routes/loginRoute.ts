import * as express from 'express';
import validateLogin from '../middleware/loginValidationMiddleware';
import LoginController from '../controllers/loginController';

export default class LoginRoute {
  router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  public routes() {
    console.log('cheguei na rota');
    this.router.post('/', validateLogin.validateLoginBody, LoginController.login);
    console.log('sai da rota');
  }
}
