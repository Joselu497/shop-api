import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsDto } from './products.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { FindAndCountOptions, FindOptions } from 'sequelize';
import { Tag } from 'src/tags/tags.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly model: typeof Product,
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
  ) {}

  async create(createProductDto: ProductsDto): Promise<Product> {
    return this.model.create({
      pic: createProductDto.pic,
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
    });
  }

  async findAll(
    options: FindOptions<any> | Omit<FindAndCountOptions<any>, 'group'>,
    pagination = true,
  ): Promise<{ rows: Product[]; count: number } | Product[]> {
    return pagination
      ? this.model.findAndCountAll(options)
      : this.model.findAll();
  }

  async findOne(id: number): Promise<Product> {
    const data = await this.model.findByPk(id);

    if (!data) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return data;
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

  async remove(id: number): Promise<void> {
    const model = await this.model.findByPk(id);

    if (!model) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return model.destroy();
  }

  async addTag(id: number, tagId: number): Promise<void> {
    const product = await this.model.findByPk(id);
    const tag = await this.tagModel.findByPk(tagId);

    if (!!product && !!tag) {
      await product.$add('tags', tag);
    } else {
      throw new Error('Product or tag not found');
    }
  }

  async removeTag(id: number, tagId: number): Promise<void> {
    const product = await this.model.findByPk(id);
    const tag = await this.tagModel.findByPk(tagId);

    if (!!product && !!tag) {
      await product.$remove('tags', tag);
    } else {
      throw new Error('Product or tag not found');
    }
  }

  async getTags(id: number): Promise<Tag[]> {
    const product = await this.model.findByPk(id);

    if (!!product) {
      return await product.$get('tags');
    } else {
      throw new Error('Product not found');
    }
  }
}
