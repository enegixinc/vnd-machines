import { ISerializedCategory } from '@core';
import { vndClient } from '@/api';
import useEntityFactory from '@/composables/entityFactory/useEntityFactory';

type CategoriesRequestParams = Parameters<typeof vndClient.categories.getMany>[0];

export const useCategories = (defaultSettings: CategoriesRequestParams) => useEntityFactory<ISerializedCategory, CategoriesRequestParams>(vndClient.categories)(defaultSettings);
