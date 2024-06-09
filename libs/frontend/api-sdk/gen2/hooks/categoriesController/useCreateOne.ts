import client from "../../../src/tanstack-query-client";
import { useMutation } from "@tanstack/vue-query";
import type { CreateOneMutationRequest, CreateOneMutationResponse, CreateOne403 } from "../../types/CreateOne";
import type { UseMutationReturnType } from "@tanstack/vue-query";
import type { VueMutationObserverOptions } from "@tanstack/vue-query/build/lib/useMutation";

 type CreateOneClient = typeof client<CreateOneMutationResponse, CreateOne403, CreateOneMutationRequest>;
type CreateOne = {
    data: CreateOneMutationResponse;
    error: CreateOne403;
    request: CreateOneMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: CreateOneMutationResponse;
    client: {
        parameters: Partial<Parameters<CreateOneClient>[0]>;
        return: Awaited<ReturnType<CreateOneClient>>;
    };
};
/**
 * @link /categories
 */
export function useCreateOne(options: {
    mutation?: VueMutationObserverOptions<CreateOne["response"], CreateOne["error"], CreateOne["request"], unknown>;
    client?: CreateOne["client"]["parameters"];
} = {}): UseMutationReturnType<CreateOne["response"], CreateOne["error"], CreateOne["request"], unknown> {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation<CreateOne["response"], CreateOne["error"], CreateOne["request"], unknown>({
        mutationFn: async (data) => {
            const res = await client<CreateOne["data"], CreateOne["error"], CreateOne["request"]>({
                method: "post",
                url: `/categories`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}