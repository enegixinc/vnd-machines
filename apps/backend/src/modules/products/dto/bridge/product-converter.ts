import { IProduct, MultiLang } from '@core';
import { Converter } from './converter';
import { z } from 'zod';

// TODO: check for all languages
const MultiLangSchema = z.object({
  en: z.optional(z.string()),
  ar: z.optional(z.string()),
});

export class ProductConverter extends Converter {
  toMagexProduct(vndProduct: IProduct) {
    const keysWithMultiLang = this.getKeysWithSchema(
      vndProduct,
      MultiLangSchema
    );

    const convertedProduct = this.executeConversion(
      vndProduct,
      (multiLang: MultiLang) => JSON.stringify(multiLang),
      (key) => keysWithMultiLang.includes(key)
    );

    return Object.assign(vndProduct, convertedProduct);
  }
}
