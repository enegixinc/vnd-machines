import { ISerializedUser } from '@core';
import { vndClient } from '@/api';
import useEntityFactory from '@/composables/entityFactory/useEntityFactory';

type UsersRequestParams = Parameters<typeof vndClient.users.getMany>[0];

export const useUser = (defaultSettings: UsersRequestParams) => useEntityFactory<ISerializedUser, UsersRequestParams>(vndClient.users)(defaultSettings);
