import { ISerializedContract } from '@core';
import { vndClient } from '@/api';
import useEntityFactory from '@/composables/entityFactory/useEntityFactory';

type ContractRequestParams = Parameters<typeof vndClient.contracts.getMany>[0];
type ContractGetOneParams = Parameters<typeof vndClient.contracts.getOne>[0];
type ContractUpdateOneParams = Parameters<typeof vndClient.contracts.updateOne>[0];
export const useContract = (defaultSettings: ContractRequestParams) => useEntityFactory<ISerializedContract, ContractRequestParams,ContractGetOneParams,ContractUpdateOneParams>(vndClient.contracts)(defaultSettings);
