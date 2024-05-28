import { ISerializedBrand } from '@core';
import { vndClient } from '@/api';
import useEntityFactory from '@/composables/entityFactory/useEntityFactory';

type BrandsRequestParams = Parameters<typeof vndClient.brands.getMany>[0];

export const useBrands = (defaultSettings: BrandsRequestParams) => useEntityFactory<ISerializedBrand, BrandsRequestParams>(vndClient.brands)(defaultSettings);
