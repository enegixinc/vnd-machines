import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isStartDateValid', async: false })
export class IsStartDateValidConstraint
  implements ValidatorConstraintInterface
{
  validate(startDate: string, args: ValidationArguments) {
    const currentDate = new Date();
    const parsedStartDate = new Date(startDate);
    return parsedStartDate >= currentDate;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Start date must be now or in the future';
  }
}

export function IsStartDateValid(validationOptions?: { message?: string }) {
  return Validate(IsStartDateValidConstraint, validationOptions);
}
