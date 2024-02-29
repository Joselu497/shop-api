import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Product } from '../products/products.model';
import { ProductTag } from '../relations/product-tag.model';

@Table
export class Tag extends Model {
  @Column({
    unique: true,
  })
  name: string;

  @BelongsToMany(() => Product, () => ProductTag)
  products: Product[];
}
