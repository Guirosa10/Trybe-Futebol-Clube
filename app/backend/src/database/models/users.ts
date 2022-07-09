import { Model, DataTypes } from 'sequelize';
import usersInterface from '../../interfaces/usersInterface';
import sequelize from './index';

class users extends Model implements usersInterface {
  id!: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'users',
  timestamps: false,
});

export default users;

// https://www.youtube.com/watch?v=VyEKwp6Q4fY
// ajuda para elaborção de sequelize em typescript
