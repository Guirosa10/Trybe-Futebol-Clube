import Teams from '../database/models/teams';
import matches from '../database/models/matches';

const getNames = async (team: number) => {
  const teamNames = await Teams.findOne({ where:
    { id: team },
  attributes: ['teamName'] });

  return teamNames?.teamName;
};

const getAllMatches = async () => {
  const allMatchesArray = await matches.findAll({
    where: { inProgress: false },
    include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] }],
  });
  return allMatchesArray;
};

const sumGoals = async (team : number) => {
  const allMatchesArray = await getAllMatches();
  const timeTesteconst1 = allMatchesArray.filter((match) => match.homeTeam === team);
  const timeTesteconst2 = allMatchesArray.filter((match) => match.awayTeam === team);
  const result = [...timeTesteconst1, ...timeTesteconst2];

  let goals = 0;
  if (result) {
    for (let index = 0; index < result.length; index += 1) {
      if (result[index].awayTeam === team) {
        goals += result[index].awayTeamGoals;
      }

      goals += result[index].homeTeamGoals;
    }
  }

  /*  const goalSum = result.forEach((ele) => {

  }); */
  return goals;
};

const sumAdversaryGoals = async (team : number) => {
  const allMatchesArray = await getAllMatches();
  const timeTesteconst1 = allMatchesArray.filter((match) => match.homeTeam === team);
  const timeTesteconst2 = allMatchesArray.filter((match) => match.awayTeam === team);
  const result = [...timeTesteconst1, ...timeTesteconst2];

  let goals = 0;
  if (result) {
    for (let index = 0; index < result.length; index += 1) {
      if (result[index].awayTeam === team) {
        goals += result[index].homeTeamGoals;
      }

      goals += result[index].awayTeamGoals;
    }
  }

  /*  const goalSum = result.forEach((ele) => {

  }); */
  return goals;
};

const getWinsAway = async (team : number) => {
  const allMatchesArray = await getAllMatches();
  const timeTesteconst1 = allMatchesArray.filter((match) => match.homeTeam === team);
  const timeTesteconst2 = allMatchesArray.filter((match) => match.awayTeam === team);
  const result = [...timeTesteconst1, ...timeTesteconst2];

  let wins = 0;
  if (result) {
    for (let index = 0; index < result.length; index += 1) {
      if (result[index].awayTeam === team) {
        const goalsAgainst = result[index].homeTeamGoals;
        const goalsOwn = result[index].awayTeamGoals;
        if (goalsAgainst < goalsOwn) {
          wins += 1;
        }
      }
    }
  }
  return wins;
};

const getWinsHome = async (team : number) => {
  const allMatchesArray = await getAllMatches();
  const timeTesteconst1 = allMatchesArray.filter((match) => match.homeTeam === team);
  const timeTesteconst2 = allMatchesArray.filter((match) => match.awayTeam === team);
  const result = [...timeTesteconst1, ...timeTesteconst2];

  let wins = 0;
  if (result) {
    for (let index = 0; index < result.length; index += 1) {
      if (result[index].awayTeam !== team) {
        const goalsAgainst = result[index].awayTeamGoals;
        const goalsOwn = result[index].homeTeam;
        if (goalsAgainst < goalsOwn) {
          wins += 1;
        }
      }
    }
  }
  return wins;
};

const getTotalWins = async (team: number) => {
  const results = await getWinsHome(team) + await getWinsAway(team);
  return results;
};

const getDraws = async (team : number) => {
  const allMatchesArray = await getAllMatches();
  const timeTesteconst1 = allMatchesArray.filter((match) => match.homeTeam === team);
  const timeTesteconst2 = allMatchesArray.filter((match) => match.awayTeam === team);
  const result = [...timeTesteconst1, ...timeTesteconst2];

  let draws = 0;
  if (result) {
    for (let index = 0; index < result.length; index += 1) {
      if (result[index].homeTeamGoals === result[index].awayTeamGoals) {
        draws += 1;
      }
    }
  }
  return draws;
};

const getLossesAway = async (team : number) => {
  const allMatchesArray = await getAllMatches();
  const timeTesteconst1 = allMatchesArray.filter((match) => match.homeTeam === team);
  const timeTesteconst2 = allMatchesArray.filter((match) => match.awayTeam === team);
  const result = [...timeTesteconst1, ...timeTesteconst2];

  let losses = 0;
  if (result) {
    for (let index = 0; index < result.length; index += 1) {
      if (result[index].awayTeam === team) {
        const goalsAgainst = result[index].homeTeamGoals;
        const goalsOwn = result[index].awayTeamGoals;
        if (goalsAgainst > goalsOwn) {
          losses += 1;
        }
      }
    }
  }
  return losses;
};

const getLossesHome = async (team : number) => {
  const allMatchesArray = await getAllMatches();
  const timeTesteconst1 = allMatchesArray.filter((match) => match.homeTeam === team);
  const timeTesteconst2 = allMatchesArray.filter((match) => match.awayTeam === team);
  const result = [...timeTesteconst1, ...timeTesteconst2];

  let losses = 0;
  if (result) {
    for (let index = 0; index < result.length; index += 1) {
      if (result[index].homeTeam === team) {
        const goalsAgainst = result[index].awayTeamGoals;
        const goalsOwn = result[index].homeTeam;
        if (goalsAgainst > goalsOwn) {
          losses += 1;
        }
      }
    }
  }
  return losses;
};

const getTotalLosses = async (team : number) => {
  const lossesHome = await getLossesHome(team);
  const lossesAway = await getLossesAway(team);
  const total = lossesHome + lossesAway;
  return total;
};

const getPoints = async (team: number) => {
  const result = (await getTotalWins(team) * 3) + (await getDraws(team));
  return result;
};

const testLeaderBoard = async (team : number) => {
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
  return newObj;
};

const getTeamsIds = async () => {
  const teamNames = await Teams.findAll({

    attributes: ['id'] });

  return teamNames;
};

export default getNames;
export {
  getAllMatches,
  sumGoals,
  sumAdversaryGoals,
  getWinsAway,
  getWinsHome,
  getTotalWins,
  getDraws,
  getLossesAway,
  getLossesHome,
  getTotalLosses,
  getPoints,
  testLeaderBoard,
  getTeamsIds,
};
