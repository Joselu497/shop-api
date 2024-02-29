import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { isUnique } from 'src/_core/decorators/is-unique.decorator';
import { User } from './users.model';

export class UsersDto {
  @IsString()
  @IsNotEmpty()
  @isUnique({ model: User, column: 'name' })
  @Length(4, 64)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @isUnique({ model: User, column: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsOptional()
  isAdmin = false;
}
