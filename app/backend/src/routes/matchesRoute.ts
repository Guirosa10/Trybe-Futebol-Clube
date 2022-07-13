import * as express from 'express';
import matchesController from '../controllers/matchesController';

export default class TeamRoute {
  router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  public routes() {
    console.log('cheguei na rota de matches');
    this.router.get('/', matchesController.getAll);
    console.log('sai da rota de matches');
  }
}
