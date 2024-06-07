import client from "../../../src/tanstack-query-client";
import { useMutation } from "@tanstack/vue-query";
import { unref } from "vue";
import type { RecoverOneMutationResponse, RecoverOnePathParams, RecoverOne403 } from "../../types/RecoverOne";
import type { UseMutationReturnType } from "@tanstack/vue-query";
import type { VueMutationObserverOptions } from "@tanstack/vue-query/build/lib/useMutation";
import type { MaybeRef } from "vue";

 type RecoverOneClient = typeof client<RecoverOneMutationResponse, RecoverOne403, never>;
type RecoverOne = {
    data: RecoverOneMutationResponse;
    error: RecoverOne403;
    request: never;
    pathParams: RecoverOnePathParams;
    queryParams: never;
    headerParams: never;
    response: RecoverOneMutationResponse;
    client: {
        parameters: Partial<Parameters<RecoverOneClient>[0]>;
        return: Awaited<ReturnType<RecoverOneClient>>;
    };
};
/**
 * @link /categories/:id/recover
 */
export function useRecoverOne(refId: MaybeRef<RecoverOnePathParams["id"]>, options: {
    mutation?: VueMutationObserverOptions<RecoverOne["response"], RecoverOne["error"], void, unknown>;
    client?: RecoverOne["client"]["parameters"];
} = {}): UseMutationReturnType<RecoverOne["response"], RecoverOne["error"], void, unknown> {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation<RecoverOne["response"], RecoverOne["error"], void, unknown>({
        mutationFn: async (data) => {
            const id = unref(refId);
            const res = await client<RecoverOne["data"], RecoverOne["error"], RecoverOne["request"]>({
                method: "patch",
                url: `/categories/${id}/recover`,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}