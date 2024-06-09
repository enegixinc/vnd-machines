import client from "../../../src/tanstack-query-client";
import { useMutation } from "@tanstack/vue-query";
import { unref } from "vue";
import type { RecoverOneMutationResponse, RecoverOnePathParams } from "../../types/RecoverOne";
import type { UseMutationReturnType } from "@tanstack/vue-query";
import type { VueMutationObserverOptions } from "@tanstack/vue-query/build/lib/useMutation";
import type { MaybeRef } from "vue";

 type RecoverOneClient = typeof client<RecoverOneMutationResponse, never, never>;
type RecoverOne = {
    data: RecoverOneMutationResponse;
    error: never;
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
 * @link /contracts/:id/recover
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
                url: `/contracts/${id}/recover`,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}