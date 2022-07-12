import * as express from 'express';
import validateLogin from '../middleware/loginValidationMiddleware';
import LoginController from '../controllers/loginController';
import ValidateToken from '../middleware/tokenValidationMiddleware';

export default class LoginRoute {
  router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  public routes() {
    this.router.post('/', validateLogin.validateLoginBody, LoginController.login);
    this.router.get('/validate', ValidateToken.tokenValidation, LoginController.validateRole);
  }
}
