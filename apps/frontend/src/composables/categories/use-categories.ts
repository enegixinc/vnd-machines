import { ISerializedCategory } from '@core';
import { vndClient } from '@/api';
import useEntityFactory from '@/composables/entityFactory/useEntityFactory';

type CategoriesRequestParams = Parameters<typeof vndClient.categories.getMany>[0];
type CategoriesGetOneParams = Parameters<typeof vndClient.categories.getOne>[0];
type CategoriesUpdateOneParams = Parameters<typeof vndClient.categories.updateOne>[0];
export const useCategories = (defaultSettings: CategoriesRequestParams) => useEntityFactory<ISerializedCategory, CategoriesRequestParams,CategoriesGetOneParams,CategoriesUpdateOneParams>(vndClient.categories)(defaultSettings);
