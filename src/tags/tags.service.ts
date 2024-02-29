import { Injectable, NotFoundException } from '@nestjs/common';
import { TagsDto } from './tags.dto';
import { Tag } from './tags.model';
import { InjectModel } from '@nestjs/sequelize';
import { FindAndCountOptions, FindOptions } from 'sequelize';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag)
    private readonly model: typeof Tag,
  ) {}

  async create(createTagDto: TagsDto): Promise<Tag> {
    return this.model.create({
      name: createTagDto.name,
    });
  }

  async findAll(
    options: FindOptions<any> | Omit<FindAndCountOptions<any>, 'group'>,
    pagination = true,
  ): Promise<{ rows: Tag[]; count: number } | Tag[]> {
    return pagination
      ? this.model.findAndCountAll(options)
      : this.model.findAll();
  }

  async findOne(id: number): Promise<Tag> {
    const data = await this.model.findByPk(id);

    if (!data) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
    return data;
  }

  async update(id: number, updateTagDto: TagsDto): Promise<Tag> {
    const model = await this.model.findByPk(id);

    if (!model) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    model.name = updateTagDto.name;

    return model.save();
  }

  async remove(id: number): Promise<void> {
    const model = await this.model.findByPk(id);

    if (!model) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return model.destroy();
  }
}
