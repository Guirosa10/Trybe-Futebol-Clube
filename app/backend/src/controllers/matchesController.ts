import { Request, Response } from 'express';
import matches from '../database/models/matches';
import teams from '../database/models/teams';

export default class teamsController {
  static async getAll(_req: Request, res: Response) {
    const results = await matches.findAll({
      include: [{ model: teams, attributes: ['teamName'] }],
    });
    return res.status(200).json(results);
  }
}

// fonte para left join com sequelize https://stackoverflow.com/questions/27561915/how-can-i-use-left-join-with-sequelize;
