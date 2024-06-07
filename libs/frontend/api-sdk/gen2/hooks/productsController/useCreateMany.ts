import client from "../../../src/tanstack-query-client";
import { useMutation } from "@tanstack/vue-query";
import type { CreateManyMutationRequest, CreateManyMutationResponse, CreateMany403 } from "../../types/CreateMany";
import type { UseMutationReturnType } from "@tanstack/vue-query";
import type { VueMutationObserverOptions } from "@tanstack/vue-query/build/lib/useMutation";

 type CreateManyClient = typeof client<CreateManyMutationResponse, CreateMany403, CreateManyMutationRequest>;
type CreateMany = {
    data: CreateManyMutationResponse;
    error: CreateMany403;
    request: CreateManyMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: CreateManyMutationResponse;
    client: {
        parameters: Partial<Parameters<CreateManyClient>[0]>;
        return: Awaited<ReturnType<CreateManyClient>>;
    };
};
/**
 * @link /products/bulk
 */
export function useCreateMany(options: {
    mutation?: VueMutationObserverOptions<CreateMany["response"], CreateMany["error"], CreateMany["request"], unknown>;
    client?: CreateMany["client"]["parameters"];
} = {}): UseMutationReturnType<CreateMany["response"], CreateMany["error"], CreateMany["request"], unknown> {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation<CreateMany["response"], CreateMany["error"], CreateMany["request"], unknown>({
        mutationFn: async (data) => {
            const res = await client<CreateMany["data"], CreateMany["error"], CreateMany["request"]>({
                method: "post",
                url: `/products/bulk`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}