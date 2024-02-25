import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Product extends Model {
  @Column({
    unique: true,
  })
  name: string;

  @Column
  description: string;

  @Column
  price: number;
}
