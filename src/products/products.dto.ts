import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class ProductsDto {
  @IsString()
  @IsOptional()
  pic: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
