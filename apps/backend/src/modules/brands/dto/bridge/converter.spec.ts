import { Converter } from './converter';
import { z } from 'zod';

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

  describe('getKeysWithSchema', () => {
    it('should return keys with values of the specified type', () => {
      const MultiLangSchema = z.object({
        en: z.optional(z.string()),
        ar: z.optional(z.string()),
      });
      const obj = {
        name: {
          en: 'John',
          ar: 'جون',
        },
        age: 30,
      };

      const result = converter.getKeysWithSchema(obj, MultiLangSchema);

      expect(result).toEqual(['name']);
    });
  });
});
