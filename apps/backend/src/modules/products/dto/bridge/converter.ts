import { ZodSchema } from 'zod';

export class Converter {
  executeConversion<ObjectType extends Record<string, any>, ConvertedValue>(
    objToConvert: ObjectType,
    conversionCallback: (obj: ObjectType[keyof ObjectType]) => ConvertedValue,
    conditionToConvertKey?: (key: keyof ObjectType) => boolean
  ) {
    const convertedObj: { [key: string]: ConvertedValue } = {};

    const objectKeys = Object.keys(objToConvert);
    objectKeys.forEach((key) => {
      if (!conditionToConvertKey || conditionToConvertKey(key)) {
        const valueToConvert = objToConvert[key];
        convertedObj[key] = conversionCallback(valueToConvert);
      } else {
        convertedObj[key] = objToConvert[key];
      }
    });

    return convertedObj;
  }

  getKeysWithSchema<T extends {}>(obj: T, type: ZodSchema<any, any>) {
    return Object.keys(obj).filter((key) => {
      const value = obj[key];
      return type.safeParse(value).success;
    });
  }
}
