import { Request, Response } from 'express';
import matches from '../database/models/matches';
import teams from '../database/models/teams';

export default class teamsController {
  static async getAll(_req: Request, res: Response) {
    const results = await matches.findAll({
      include: [{ model: teams, as: 'teamHome', attributes: ['teamName'] },
        { model: teams, as: 'teamAway', attributes: ['teamName'] }],
    });
    return res.status(200).json(results);
  }

  static async createMatch(req: Request, res:Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const results = await matches.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

    return res.status(201).json(results);
  }
}

// fonte para left join com sequelize https://stackoverflow.com/questions/27561915/how-can-i-use-left-join-with-sequelize;
