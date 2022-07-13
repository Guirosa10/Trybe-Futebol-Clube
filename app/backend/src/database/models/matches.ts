import { Model, DataTypes } from 'sequelize';
import IMatchesInterface from '../../interfaces/matchesInterface';
import teams from './teams';
import sequelize from './index';

export default class matches extends Model implements IMatchesInterface {
  id!: number;
  homeTeam!: number;
  homeTeamGoals: number;
  awayTeam!: number;
  awayTeamGoals: number;
  inProgress: number;
}

matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.TINYINT,
}, {
  sequelize,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

matches.belongsTo(
  teams,
  {
    foreignKey: 'homeTeam',
    as: 'teamHome',
  },
);

matches.belongsTo(
  teams,
  {
    foreignKey: 'awayTeam',
    as: 'teamAway',
  },
);
