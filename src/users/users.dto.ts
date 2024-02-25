import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UsersDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  isAdmin = false;
}
