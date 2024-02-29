import { IsNotEmpty, IsString } from 'class-validator';

export class TagsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
