import { ISerializedProduct } from '@core';
import { vndClient } from '@/api';
import useEntityFactory from '@/composables/entityFactory/useEntityFactory';

type ProductsRequestParams = Parameters<typeof vndClient.products.getMany>[0];

export const useProducts = (defaultSettings: ProductsRequestParams) => useEntityFactory<ISerializedProduct, ProductsRequestParams>(vndClient.products)(defaultSettings);
