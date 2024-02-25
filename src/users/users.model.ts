import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    unique: true,
  })
  name: string;

  @Column({
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column
  password: string;

  @Column
  isAdmin: boolean;
}
