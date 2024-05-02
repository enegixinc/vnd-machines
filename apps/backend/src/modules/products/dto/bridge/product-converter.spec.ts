import { faker } from '@faker-js/faker';
import { CreateProductDto } from '../request/create-product.dto';
import { ProductConverter } from './product-converter';

describe('ProductConverter', () => {
  let mockedProduct: CreateProductDto;

  beforeEach(() => {
    const mockedMultiLang = () => ({
      en: faker.lorem.words(),
      ar: faker.lorem.words(),
    });
    mockedProduct = {
      name: mockedMultiLang(),
      barcode: faker.lorem.word(),
      brand: faker.lorem.word(),
      category: faker.lorem.word(),
      costPrice: faker.number.int(),
      description: mockedMultiLang(),
      additionPrice: faker.number.int(),
      ageControl: faker.number.int(),
      detail: mockedMultiLang(),
      dimension: {
        length: faker.number.int(),
        height: faker.number.int(),
        width: faker.number.int(),
      },
      include: mockedMultiLang(),
      ingredients: mockedMultiLang(),
      keyFeatures: mockedMultiLang(),
      price: faker.number.int(),
      pricePerKilo: faker.datatype.boolean(),
      prodType: faker.lorem.word(),
      productPictures: [faker.image.url()],
      productVideo: faker.image.url(),
      referTo: faker.lorem.word(),
      sortIndex: faker.number.int(),
      upc: faker.lorem.word(),
      specification: mockedMultiLang(),
      suppliers: [],
      vatIndex: faker.number.int(),
      virtualProduct: faker.number.int(),
    };
  });

  test('toMagexProduct', () => {
    const productConverter = new ProductConverter();
    const convertedProduct = productConverter.toMagexProduct(mockedProduct);
    console.log(convertedProduct);
    // expect(convertedProduct).toEqual();
  });
});
