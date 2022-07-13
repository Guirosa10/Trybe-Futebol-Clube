import { Model, DataTypes } from 'sequelize';
import IMatchesInterface from '../../interfaces/IMatchesInterface';
import sequelize from './index';

export default class matches extends Model implements IMatchesInterface {
  id!: number;
  homeTeam!: string;
  homeTeamGoals: number;
  awayTeam!: string;
  awayTeamGoals: number;
  inProgress: boolean;
}

matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: DataTypes.STRING,
  homeTeamGoals: DataTypes.NUMBER,
  awayTeam: DataTypes.STRING,
  awayTeamGoals: DataTypes.NUMBER,
  inProgress: DataTypes.BOOLEAN,
}, {
  sequelize,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});
