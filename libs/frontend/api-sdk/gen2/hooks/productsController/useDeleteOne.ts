import client from "../../../src/tanstack-query-client";
import { useMutation } from "@tanstack/vue-query";
import { unref } from "vue";
import type { DeleteOneMutationResponse, DeleteOnePathParams, DeleteOne403 } from "../../types/DeleteOne";
import type { UseMutationReturnType } from "@tanstack/vue-query";
import type { VueMutationObserverOptions } from "@tanstack/vue-query/build/lib/useMutation";
import type { MaybeRef } from "vue";

 type DeleteOneClient = typeof client<DeleteOneMutationResponse, DeleteOne403, never>;
type DeleteOne = {
    data: DeleteOneMutationResponse;
    error: DeleteOne403;
    request: never;
    pathParams: DeleteOnePathParams;
    queryParams: never;
    headerParams: never;
    response: DeleteOneMutationResponse;
    client: {
        parameters: Partial<Parameters<DeleteOneClient>[0]>;
        return: Awaited<ReturnType<DeleteOneClient>>;
    };
};
/**
 * @link /products/:id
 */
export function useDeleteOne(refId: MaybeRef<DeleteOnePathParams["id"]>, options: {
    mutation?: VueMutationObserverOptions<DeleteOne["response"], DeleteOne["error"], void, unknown>;
    client?: DeleteOne["client"]["parameters"];
} = {}): UseMutationReturnType<DeleteOne["response"], DeleteOne["error"], void, unknown> {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation<DeleteOne["response"], DeleteOne["error"], void, unknown>({
        mutationFn: async (data) => {
            const id = unref(refId);
            const res = await client<DeleteOne["data"], DeleteOne["error"], DeleteOne["request"]>({
                method: "delete",
                url: `/products/${id}`,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}