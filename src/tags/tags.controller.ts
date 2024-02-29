import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsDto } from './tags.dto';
import { Tag } from './tags.model';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: TagsDto): Promise<Tag> {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll(@Req() req): Promise<{ rows: Tag[]; count: number } | Tag[]> {
    const pagination = req.pagination === 'false' ? false : true;
    return this.tagsService.findAll(req.options, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tag> {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: TagsDto): Promise<Tag> {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tagsService.remove(+id);
  }
}
