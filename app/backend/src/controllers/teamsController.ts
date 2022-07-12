import 'dotenv/config';
import { Request, Response } from 'express';
import teams from '../database/models/teams';

export default class teamsController {
  static async getAll(_req: Request, res: Response) {
    const results = await teams.findAll();
    return res.status(200).json(results);
  }
}
