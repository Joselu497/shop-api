import { Injectable, NotFoundException } from '@nestjs/common';
import { TagsDto } from './tags.dto';
import { Tag } from './tags.model';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/_core/base/base.service';

@Injectable()
export class TagsService extends BaseService<Tag> {
  constructor(
    @InjectModel(Tag)
    protected readonly model: typeof Tag,
  ) {
    super(model);
  }

  async create(createTagDto: TagsDto): Promise<Tag> {
    return this.model.create({
      name: createTagDto.name,
    });
  }

  async update(id: number, updateTagDto: TagsDto): Promise<Tag> {
    const model = await this.model.findByPk(id);

    if (!model) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    model.name = updateTagDto.name;

    return model.save();
  }
}
