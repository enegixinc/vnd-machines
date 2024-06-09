import { ISerializedProduct } from '@core';
import { vndClient } from '@/api';
import useEntityFactory from '@/composables/entityFactory/useEntityFactory';

type ProductsRequestParams = Parameters<typeof vndClient.products.getMany>[0];
type ProductGetOneParams = Parameters<typeof vndClient.products.getOne>[0];
export const useProducts = (defaultSettings: ProductsRequestParams) =>
    useEntityFactory<ISerializedProduct, ProductsRequestParams, ProductGetOneParams>(vndClient.products)(defaultSettings);
