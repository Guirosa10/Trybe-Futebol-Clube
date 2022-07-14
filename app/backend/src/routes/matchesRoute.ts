import * as express from 'express';
import ValidateToken from '../middleware/tokenValidationMiddleware';
import matchesController from '../controllers/matchesController';

export default class MatchesRoute {
  router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  public routes() {
    console.log('cheguei na rota de matches');
    this.router.get('/', matchesController.getAll);
    this.router
      .post(
        '/',
        ValidateToken.tokenValidation,
        matchesController.createMatch,
      );
    this.router.patch('/:id/finish', matchesController.patchMatch);
    console.log('sai da rota de matches');
  }
}
