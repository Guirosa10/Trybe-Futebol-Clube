import usersInterface from './usersInterface';

export default interface IModel {
  create(data: Omit<usersInterface, 'id'>): Promise<usersInterface>;
  list(): Promise<usersInterface[]>;
}
