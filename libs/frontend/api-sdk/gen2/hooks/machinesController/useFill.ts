import client from "../../../src/tanstack-query-client";
import { useMutation } from "@tanstack/vue-query";
import { unref } from "vue";
import type { FillMutationRequest, FillMutationResponse, FillPathParams, Fill403 } from "../../types/Fill";
import type { UseMutationReturnType } from "@tanstack/vue-query";
import type { VueMutationObserverOptions } from "@tanstack/vue-query/build/lib/useMutation";
import type { MaybeRef } from "vue";

 type FillClient = typeof client<FillMutationResponse, Fill403, FillMutationRequest>;
type Fill = {
    data: FillMutationResponse;
    error: Fill403;
    request: FillMutationRequest;
    pathParams: FillPathParams;
    queryParams: never;
    headerParams: never;
    response: FillMutationResponse;
    client: {
        parameters: Partial<Parameters<FillClient>[0]>;
        return: Awaited<ReturnType<FillClient>>;
    };
};
/**
 * @link /machines/fill/:machineId
 */
export function useFill(refMachineId: MaybeRef<FillPathParams["machineId"]>, options: {
    mutation?: VueMutationObserverOptions<Fill["response"], Fill["error"], Fill["request"], unknown>;
    client?: Fill["client"]["parameters"];
} = {}): UseMutationReturnType<Fill["response"], Fill["error"], Fill["request"], unknown> {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation<Fill["response"], Fill["error"], Fill["request"], unknown>({
        mutationFn: async (data) => {
            const machineId = unref(refMachineId);
            const res = await client<Fill["data"], Fill["error"], Fill["request"]>({
                method: "post",
                url: `/machines/fill/${machineId}`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}