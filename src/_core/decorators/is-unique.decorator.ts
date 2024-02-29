import { Injectable } from '@nestjs/common';
import {
  ValidateByOptions,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const { model, column } = validationArguments.constraints[0];

    const instance = await model.findOne({
      where: {
        [column]: value,
      },
    });

    return !instance;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const field: string = validationArguments.property;
    return `${field} is already exist`;
  }
}

export function isUnique(options, validationOptions?: ValidationOptions) {
  return function (object: any, property: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
