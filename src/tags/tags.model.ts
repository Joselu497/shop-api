import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Product } from '../products/products.model';
import { ProductTag } from '../_relations/product-tag.model';

@Table
export class Tag extends Model {
  @Column
  name: string;

  @BelongsToMany(() => Product, () => ProductTag)
  products: Product[];
}
