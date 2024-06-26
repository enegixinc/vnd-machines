import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'EntityExists', async: true })
export abstract class EntityExistsValidator
  implements ValidatorConstraintInterface
{
  protected constructor(
    private readonly service: Pick<Repository<unknown>, 'findOneBy'>
  ) {}

  async validate(where: Parameters<(typeof this.service)['findOneBy']>[0]) {
    return !!(await this.service.findOneBy(where));
  }

  protected get EntityName() {
    return 'Entity';
  }

  defaultMessage() {
    return `${this.EntityName} doesn't exist`;
  }
}
