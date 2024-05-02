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

  getKeysWithValueType<T extends {}, A>(
    obj: T,
    type: A extends {} ? A : never
  ) {
    const keysWithType = new Set<string>([]);
    const objectKeys = Object.keys(obj);

    objectKeys.forEach((key) => {
      if (obj[key] in type) {
        keysWithType.add(key);
      }
    });

    return Array.from(keysWithType);
  }
}
