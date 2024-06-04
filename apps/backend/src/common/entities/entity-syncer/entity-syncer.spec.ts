import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { MagexService } from '../../../services/magex/magex.service';
import { BrandSubscriber } from '../../../modules/brands/brands.subscriber';
import { ProductSubscriber } from '../../../modules/products/products.subscriber';
import { ConfigModule, ConfigService } from '@backend/config';
import { Logger } from '@nestjs/common';

const mockRecords = [
  {
    _id: '2',
    lastSyncAt: '2021-09-01T00:00:00.000Z',
  },
  {
    _id: '3',
    lastSyncAt: '2021-09-01T00:00:00.000Z',
  },
];

const mockedMagexRecords = [
  {
    _id: '1',
    lastSyncAt: '2021-09-01T00:00:00.000Z',
  },
  {
    _id: '2',
    updatedAt: '2021-10-01T00:00:00.000Z',
  },
  {
    _id: '3',
    updatedAt: '2021-09-01T00:00:00.000Z',
  },
];

describe('EntitySyncer', () => {
  let brandSubscriber: BrandSubscriber;
  let productSubscriber: ProductSubscriber;
  let magexService: MagexService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        MagexService,
        Logger,
        ConfigService,
        {
          provide: DataSource,
          useValue: {
            manager: {
              find: jest.fn(),
              save: jest.fn(),
              create: jest.fn(),
            },
            subscribers: [],
          },
        },
        BrandSubscriber,
        ProductSubscriber,
      ],
    }).compile();

    brandSubscriber = module.get<BrandSubscriber>(BrandSubscriber);
    productSubscriber = module.get<ProductSubscriber>(ProductSubscriber);
    magexService = module.get<MagexService>(MagexService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(brandSubscriber).toBeDefined();
    expect(productSubscriber).toBeDefined();
  });

  it('should inject dependencies', () => {
    expect(brandSubscriber['magexService']).toBe(magexService);
    expect(brandSubscriber['dataSource']).toBe(dataSource);
    expect(productSubscriber['magexService']).toBe(magexService);
    expect(productSubscriber['dataSource']).toBe(dataSource);
  });

  describe('identifyOutOfSyncRecords', () => {
    it('should identify new and updated records', () => {
      // @ts-expect-error - testing
      brandSubscriber['records'] = mockRecords;
      // @ts-expect-error - testing
      brandSubscriber['magexRecords'] = mockedMagexRecords;

      const result = brandSubscriber.identifyOutOfSyncRecords();

      expect(result.newRecords).toHaveLength(1);
      expect(result.updatedRecords).toHaveLength(1);
      expect(result.newRecords[0]._id).toBe('1');
      expect(result.updatedRecords[0]._id).toBe('2');
    });
  });

  describe('prepareRecords', () => {
    it('should prepare records with updated fields', () => {
      const mockRecord = { _id: '1', name: 'Test' };
      const mockEntity = {
        _id: '1',
        name: 'Test',
        lastSyncAt: brandSubscriber['nowDate'],
      };
      dataSource.manager.create = jest.fn().mockReturnValue(mockEntity);

      const result = brandSubscriber.prepareRecords([mockRecord]);
      expect(result).toEqual([mockEntity]);
    });
  });

  // describe('syncWithMagex', () => {
  //   it('should fetch, identify, prepare, and save records', async () => {
  //     const mockMagexRecords = [{ _id: '1', updatedAt: '2022-01-01' }];
  //     const mockPreparedRecords = [{ _id: '1', lastSyncAt: '2022-01-01' }];
  //     dataSource.manager.find = jest.fn().mockResolvedValue([]);
  //     magexService.brands.getBrandsByAccountName = jest
  //       .fn()
  //       .mockResolvedValue(mockMagexRecords);
  //     brandSubscriber.prepareRecords = jest
  //       .fn()
  //       .mockReturnValue(mockPreparedRecords);
  //
  //     await brandSubscriber.syncWithMagex();
  //
  //     expect(dataSource.manager.find).toHaveBeenCalled();
  //     expect(magexService.brands.getBrandsByAccountName).toHaveBeenCalled();
  //     expect(brandSubscriber.prepareRecords).toHaveBeenCalledWith(
  //       mockMagexRecords
  //     );
  //     expect(dataSource.manager.save).toHaveBeenCalledWith(
  //       mockPreparedRecords,
  //       {
  //         listeners: false,
  //         chunk: 1000,
  //       }
  //     );
  //   });
  // });
});
