import { NextFunction, Request, Response } from 'express';
import teams from '../database/models/teams';

class validateTeams {
  static async checkNullorEqualTeams(req: Request, res:Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    const validateHomeTeam = await teams.findOne({ where: { teamName: homeTeam } });
    const validateAwayTeam = await teams.findOne({ where: { teamName: awayTeam } });
    if (!validateAwayTeam || !validateHomeTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (homeTeam as string === awayTeam as string) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}

export default validateTeams;
