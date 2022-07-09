import * as express from 'express';
import LoginController from '../controllers/loginController';

export default class LoginRoute {
  router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  public routes() {
    console.log('cheguei na rota');
    this.router.post('/', LoginController.login);
    console.log('sai da rota');
  }
}
