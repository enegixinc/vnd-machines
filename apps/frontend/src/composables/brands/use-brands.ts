import { ISerializedBrand } from '@core';
import { vndClient } from '@/api';
import useEntityFactory from '@/composables/entityFactory/useEntityFactory';

type BrandsRequestParams = Parameters<typeof vndClient.brands.getMany>[0];
type BrandsGetOneParams = Parameters<typeof vndClient.brands.getOne>[0];
type BrandsUpdateOneParams = Parameters<typeof vndClient.brands.updateOne>[0];
export const useBrands = (defaultSettings: BrandsRequestParams) => useEntityFactory<ISerializedBrand, BrandsRequestParams,BrandsGetOneParams,BrandsUpdateOneParams>(vndClient.brands)(defaultSettings);
