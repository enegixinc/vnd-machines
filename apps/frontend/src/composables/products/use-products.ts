import { ISerializedProduct } from '@core';
import { vndClient } from '@/api';
import useEntityFactory from '@/composables/entityFactory/useEntityFactory';

// vndClient.products.updateOne();
type ProductsRequestParams = Parameters<typeof vndClient.products.getMany>[0];
type ProductGetOneParams = Parameters<typeof vndClient.products.getOne>[0];
type productUpdateOneParams = Parameters<typeof vndClient.products.updateOne>[0];
export const useProducts = (defaultSettings: ProductsRequestParams) =>
    useEntityFactory<ISerializedProduct, ProductsRequestParams, ProductGetOneParams, productUpdateOneParams>(vndClient.products)(defaultSettings);
