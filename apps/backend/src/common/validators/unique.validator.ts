import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { BaseEntity, EntityManager, EntityTarget } from 'typeorm';

export type IsUniqueInterface<T extends BaseEntity = BaseEntity> = {
  entity: EntityTarget<T>;
  column: string;
};

export function IsUnique(
  options: IsUniqueInterface,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const { entity, column }: IsUniqueInterface<BaseEntity> =
      args.constraints[0];

    const dataExist = await this.entityManager
      .getRepository(entity)
      .findOne({ where: { [column]: value } });

    return !dataExist;
  }

  defaultMessage(args: ValidationArguments): string {
    const field: string = args.property;
    return `${field} already exists`;
  }
}
