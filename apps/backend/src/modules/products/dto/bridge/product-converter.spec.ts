import { faker } from '@faker-js/faker';
import { ProductConverter } from './product-converter';

describe('ProductConverter', () => {
  test('toMagexProduct', () => {
    const mockedProduct = {
      name: {
        en: faker.lorem.words(),
        ar: faker.lorem.words(),
      },
      barcode: faker.lorem.word(),
      virtualProduct: faker.number.int(),
    };
    const convertedMockedProduct = {
      name: JSON.stringify(mockedProduct.name),
      barcode: mockedProduct.barcode,
      virtualProduct: mockedProduct.virtualProduct,
    };

    const productConverter = new ProductConverter();
    const convertedProduct = productConverter.toMagexProduct(
      mockedProduct as any
    );
    expect(convertedProduct).toEqual(convertedMockedProduct);
  });
});
