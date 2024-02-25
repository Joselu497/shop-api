import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Sale extends Model {
  @Column
  userId: number;

  @Column
  productId: number;

  @Column
  date: Date;
}
