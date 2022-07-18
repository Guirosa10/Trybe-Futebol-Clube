import { Request, Response } from 'express';
import {

  getTeamsIds,

  testLeaderBoard } from '../utils/leaderBoardFunctions';

export default class LeaderBoardController {
  static async getTeamIds(_req: Request, res: Response) {
    const response = await getTeamsIds();
    const results = response.map((elem) => elem.id);
    const resultsTeam = results.map(testLeaderBoard);
    return res.status(200).json((await Promise.all(resultsTeam))
      .sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn));
  }
}

// mega sort fonte: https://stackoverflow.com/questions/4576714/sort-by-two-values-prioritizing-on-one-of-them
