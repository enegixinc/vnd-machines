import { IProduct, MultiLang } from '@core';
import { Converter } from './converter';
import { z } from 'zod';
import { CreateMagexProduct } from './magex-product';
import { ICreateMagexProduct } from '../../../../../../../libs/backend/magex-connector/types/create-product';

// TODO: check for all languages
const MultiLangSchema = z.object({
  en: z.optional(z.string()),
  ar: z.optional(z.string()),
});

export class ProductConverter extends Converter {
  toMagexProduct(vndProduct: IProduct): ICreateMagexProduct {
    const keysWithMultiLang = this.getKeysWithSchema(
      vndProduct,
      MultiLangSchema
    );

    const convertedProduct = this.executeConversion(
      vndProduct,
      (multiLang: MultiLang) => JSON.stringify(multiLang),
      (key) => keysWithMultiLang.includes(key)
    );

    const converted = Object.assign(vndProduct, convertedProduct);

    return new CreateMagexProduct(converted);
  }
}
