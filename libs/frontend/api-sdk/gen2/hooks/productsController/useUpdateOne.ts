import client from "../../../src/tanstack-query-client";
import { useMutation } from "@tanstack/vue-query";
import { unref } from "vue";
import type { UpdateOneMutationRequest, UpdateOneMutationResponse, UpdateOnePathParams, UpdateOne403 } from "../../types/UpdateOne";
import type { UseMutationReturnType } from "@tanstack/vue-query";
import type { VueMutationObserverOptions } from "@tanstack/vue-query/build/lib/useMutation";
import type { MaybeRef } from "vue";

 type UpdateOneClient = typeof client<UpdateOneMutationResponse, UpdateOne403, UpdateOneMutationRequest>;
type UpdateOne = {
    data: UpdateOneMutationResponse;
    error: UpdateOne403;
    request: UpdateOneMutationRequest;
    pathParams: UpdateOnePathParams;
    queryParams: never;
    headerParams: never;
    response: UpdateOneMutationResponse;
    client: {
        parameters: Partial<Parameters<UpdateOneClient>[0]>;
        return: Awaited<ReturnType<UpdateOneClient>>;
    };
};
/**
 * @link /products/:id
 */
export function useUpdateOne(refId: MaybeRef<UpdateOnePathParams["id"]>, options: {
    mutation?: VueMutationObserverOptions<UpdateOne["response"], UpdateOne["error"], UpdateOne["request"], unknown>;
    client?: UpdateOne["client"]["parameters"];
} = {}): UseMutationReturnType<UpdateOne["response"], UpdateOne["error"], UpdateOne["request"], unknown> {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation<UpdateOne["response"], UpdateOne["error"], UpdateOne["request"], unknown>({
        mutationFn: async (data) => {
            const id = unref(refId);
            const res = await client<UpdateOne["data"], UpdateOne["error"], UpdateOne["request"]>({
                method: "patch",
                url: `/products/${id}`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}