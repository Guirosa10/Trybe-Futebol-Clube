import { Request, Response } from 'express';
/* import Teams from '../database/models/teams';
import matches from '../database/models/matches'; */
import getNames, {
  getAllMatches,
  getDraws,
  getPoints,
  getTeamsIds,
  getTotalLosses,
  getTotalWins,
  sumAdversaryGoals,
  sumGoals,
  testLeaderBoard } from '../utils/leaderBoardFunctions';

export default class LeaderBoardController {
  static async testsssLeaderBoard(_req: Request, res: Response) {
    const team = 12;
    const allMatchesArray = await getAllMatches();
    const result = allMatchesArray
      .filter((match) => match.homeTeam === team || match.awayTeam === team);
    const newObj = {
      team: await getNames(team),
      totalGames: result.length,
      totalVictories: await getTotalWins(team),
      totalPoints: await getPoints(team),
      totalDraws: await getDraws(team),
      totalLosses: await getTotalLosses(team),
      goalsFavor: await sumGoals(team),
      goalsOwn: await sumAdversaryGoals(team),
      goalsBalance: await sumGoals(team) - await sumAdversaryGoals(team),
      efficiency: (((await getPoints(team)) / (result.length * 3)) * 100).toFixed(2),
    };
    return res.status(200).json(newObj);
  }

  static async getTeamIds(_req: Request, res: Response) {
    const response = await getTeamsIds();
    const results = response.map((elem) => elem.id);
    const resultsTeam = results.map(testLeaderBoard);
    return res.status(200).json((await Promise.all(resultsTeam))
      .sort((a, b) => b.totalPoints - a.totalPoints));
  }
}

/* interface teamModel {
  team: {
    id: number,
    teamName: string
  },
} */
