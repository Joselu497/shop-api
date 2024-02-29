import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Product } from '../products/products.model';

@Table
export class Sale extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @Column
  date: Date;
}
