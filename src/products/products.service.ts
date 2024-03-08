import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsDto } from './products.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { Tag } from 'src/tags/tags.model';
import { BaseService } from 'src/_core/base/base.service';

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(
    @InjectModel(Product)
    protected readonly model: typeof Product,
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
  ) {
    super(model);
  }

  async create(createProductDto: ProductsDto): Promise<Product> {
    return this.model.create({
      pic: createProductDto.pic,
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
    });
  }

  async update(id: number, updateProductDto: ProductsDto): Promise<Product> {
    const model = await this.model.findByPk(id);

    if (!model) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    model.pic = updateProductDto.pic;
    model.name = updateProductDto.name;
    model.description = updateProductDto.description;
    model.price = updateProductDto.price;

    return model.save();
  }

  async addTag(id: number, tagId: number): Promise<void> {
    const product = await this.model.findByPk(id);
    const tag = await this.tagModel.findByPk(tagId);

    if (!!product && !!tag) {
      await product.$add('tags', tag);
    } else {
      throw new NotFoundException('Product or tag not found');
    }
  }

  async removeTag(id: number, tagId: number): Promise<void> {
    const product = await this.model.findByPk(id);
    const tag = await this.tagModel.findByPk(tagId);

    if (!!product && !!tag) {
      await product.$remove('tags', tag);
    } else {
      throw new NotFoundException('Product or tag not found');
    }
  }

  async getTags(id: number): Promise<Tag[]> {
    const product = await this.model.findByPk(id);

    if (!!product) {
      return await product.$get('tags');
    } else {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
