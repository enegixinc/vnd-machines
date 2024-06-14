import { ISerializedUser } from '@core';
import { vndClient } from '@/api';
import useEntityFactory from '@/composables/entityFactory/useEntityFactory';

type UsersRequestParams = Parameters<typeof vndClient.users.getMany>[0];
type UsersGetOneParams = Parameters<typeof vndClient.users.getOne>[0];
type UsersUpdateOneParams = Parameters<typeof vndClient.users.updateOne>[0];
export const useUser = (defaultSettings: UsersRequestParams) => useEntityFactory<ISerializedUser, UsersRequestParams,UsersGetOneParams,UsersUpdateOneParams>(vndClient.users)(defaultSettings);
