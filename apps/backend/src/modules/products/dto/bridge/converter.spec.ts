import { Converter } from './converter';
import { faker } from '@faker-js/faker';

describe('Converter', () => {
  let converter: Converter;

  beforeEach(() => {
    converter = new Converter();
  });

  describe('executeConversion', () => {
    it('should convert object values according to the conversion callback', () => {
      const obj = {
        name: 'John',
        age: 30,
        email: 'john@example.com',
      };
      const conversionCallback = (value: any) => value.toString().toUpperCase();
      const result = converter.executeConversion(obj, conversionCallback);
      console.log(result);
      const expected = {
        name: 'JOHN',
        age: '30',
        email: 'JOHN@EXAMPLE.COM',
      };
      expect(result).toEqual(expected);
    });

    it('should convert only keys that satisfy the condition', () => {
      const obj = {
        name: 'John',
        age: 30,
        email: 'john@example.com',
      };
      const conversionCallback = (value: any) => value.toString().toUpperCase();
      const conditionToConvertKey = (key: keyof typeof obj) => key !== 'age';
      const result = converter.executeConversion(
        obj,
        conversionCallback,
        conditionToConvertKey
      );
      const expected = {
        name: 'JOHN',
        age: 30,
        email: 'JOHN@EXAMPLE.COM',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('getKeysWithValueType', () => {
    it('should return keys with values of the specified type', () => {
      const obj = {
        name: faker.person.firstName(),
        age: faker.number.int(),
        email: faker.internet.email(),
      };
      const result = converter.getKeysWithValueType(obj, 'string');
      expect(result).toContain('name');
      expect(result).toContain('email');
      expect(result).not.toContain('age');
    });

    it('should return an empty array if no keys match the specified type', () => {
      const obj = {
        age: faker.number.int(),
        height: faker.number.int(),
        weight: faker.number.int(),
      };
      const result = converter.getKeysWithValueType(obj, 'string');
      expect(result).toEqual([]);
    });
  });
});
