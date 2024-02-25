import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class SalesDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
