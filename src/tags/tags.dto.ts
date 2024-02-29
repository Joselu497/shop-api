import { IsNotEmpty, IsString, Length } from 'class-validator';
import { isUnique } from 'src/_core/decorators/is-unique.decorator';
import { Tag } from './tags.model';

export class TagsDto {
  @IsString()
  @IsNotEmpty()
  @isUnique({ model: Tag, column: 'name' })
  @Length(4, 64)
  name: string;
}
