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
    this.router.get('/teams', teamsController.getAll);
    this.router.get('/teams/:id', teamsController.getById);
    console.log('sai da rota de times');
  }
}
