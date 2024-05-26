import { ISerializedContract } from '@core';
import { vndClient } from '@/api';
import useEntityFactory from '@/composables/entityFactory/useEntityFactory';

type ContractRequestParams = Parameters<typeof vndClient.contracts.getMany>[0];

export const useContract = (defaultSettings: ContractRequestParams) => useEntityFactory<ISerializedContract, ContractRequestParams>(vndClient.contracts)(defaultSettings);
