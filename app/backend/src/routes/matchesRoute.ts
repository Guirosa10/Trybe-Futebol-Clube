import * as express from 'express';
import ValidateToken from '../middleware/tokenValidationMiddleware';
import matchesController from '../controllers/matchesController';
import validateTeams from '../middleware/teamEqualityValidationMiddleware';

export default class MatchesRoute {
  router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  public routes() {
    console.log('cheguei na rota de matches');
    this.router.get('/matches', matchesController.getAll);
    this.router
      .post(
        '/matches',
        ValidateToken.tokenValidation,
        validateTeams.checkNullorEqualTeams,
        matchesController.createMatch,
      );
    this.router.patch('/macthes/:id', matchesController.patchMatchById);
    this.router.patch('/matches/:id/finish', matchesController.patchMatch);
    console.log('sai da rota de matches');
  }
}
