import Teams from '../database/models/teams';
import matches from '../database/models/matches';

const getNames = async (team: number) => {
  const teamNames = await Teams.findOne({ where:
    { id: team } });

  return teamNames?.teamName;
};

const getAllMatches = async () => {
  const allMatchesArray = await matches.findAll({
    where: { inProgress: false },
  });
  return allMatchesArray;
};

const sumGoals = (array : matches[]) => {
  let goals = 0;

  for (let index = 0; index < array.length; index += 1) {
    goals += array[index].homeTeamGoals;
  }
  return goals;
};

const sumAdversaryGoals = (array : matches[]) => {
  let goals = 0;

  for (let index = 0; index < array.length; index += 1) {
    goals += array[index].awayTeamGoals;
  }
  return goals;
};

const getWinsHome = (array: matches[]) => {
  const wins = array.reduce((acc, cur) => {
    if (cur.homeTeamGoals > cur.awayTeamGoals) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return wins;
};

const getDraws = (array: matches[]) => {
  const draws = array.reduce((acc, cur) => {
    if (cur.homeTeamGoals === cur.awayTeamGoals) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return draws;
};

const getLossesHome = (array: matches[]) => {
  const losses = array.reduce((acc, cur) => {
    if (cur.homeTeamGoals < cur.awayTeamGoals) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return losses;
};

const getPoints = (array: matches[]) => {
  const result = (getWinsHome(array) * 3) + (getDraws(array));
  return result;
};

const testLeaderBoard = async (team : number) => {
  const allMatchesArray = await getAllMatches();
  const result = allMatchesArray
    .filter((match) => match.homeTeam === team);
  const newObj = {
    name: await getNames(team),
    totalPoints: getPoints(result),
    totalGames: result.length,
    totalVictories: getWinsHome(result),
    totalDraws: getDraws(result),
    totalLosses: getLossesHome(result),
    goalsFavor: sumGoals(result),
    goalsOwn: sumAdversaryGoals(result),
    goalsBalance: sumGoals(result) - sumAdversaryGoals(result),
    efficiency: +(((getPoints(result)) / (result.length * 3)) * 100).toFixed(2),
  };
  return newObj;
};

const getTeamsIds = async () => {
  const teamNames = await Teams.findAll();

  return teamNames;
};

export default getNames;
export {
  getAllMatches,
  sumGoals,
  sumAdversaryGoals,
  getWinsHome,
  getDraws,
  getLossesHome,
  getPoints,
  testLeaderBoard,
  getTeamsIds,
};
