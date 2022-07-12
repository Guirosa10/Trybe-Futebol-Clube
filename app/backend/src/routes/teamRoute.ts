import * as express from 'express';
import teamsController from '../controllers/teamsController';

export default class TeamRoute {
  router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  public routes() {
    console.log('cheguei na rota de times');
    this.router.get('/', teamsController.getAll);
  }
}
