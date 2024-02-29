import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Tag } from '../tags/tags.model';
import { Product } from '../products/products.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Table
export class ProductTag extends Model {
  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;
}

@Module({
  imports: [SequelizeModule.forFeature([ProductTag])],
})
export class ProductTagModule {}
