import * as express from 'express';
import LoginRoute from './routes/loginRoute';
import TeamRoute from './routes/teamRoute';
import MatchesRoute from './routes/matchesRoute';
import LeaderBoardRoute from './routes/leaderBoardRoutes';

const teamEntity = new TeamRoute();
const userEntity = new LoginRoute();
const matchesEntity = new MatchesRoute();
const leaderboardEntity = new LeaderBoardRoute();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(userEntity.router);
    this.app.use(teamEntity.router);
    this.app.use(matchesEntity.router);
    this.app.use(leaderboardEntity.router);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
