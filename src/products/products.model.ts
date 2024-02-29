import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Tag } from '../tags/tags.model';
import { ProductTag } from '../_relations/product-tag.model';

@Table
export class Product extends Model {
  @Column
  pic: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  price: number;

  @BelongsToMany(() => Tag, () => ProductTag)
  tags: Tag[];
}
