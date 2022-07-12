import { Model, DataTypes } from 'sequelize';
import ITeamInterface from '../../interfaces/teamsInterface';
import sequelize from './index';

class teams extends Model implements ITeamInterface {
  id!: number;
  teamName: string;
}

teams.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'teams',
  timestamps: false,
});

export default teams;
