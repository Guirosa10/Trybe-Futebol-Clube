import * as express from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';

export default class LeaderBoardRoute {
  router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  public routes() {
    this.router.get('/leaderboard/home', LeaderBoardController.getTeamIds);
  }
}
