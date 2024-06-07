import client from "../../../src/tanstack-query-client";
import { useMutation } from "@tanstack/vue-query";
import type { RefreshTokenMutationRequest, RefreshTokenMutationResponse, RefreshToken404 } from "../../types/RefreshToken";
import type { UseMutationReturnType } from "@tanstack/vue-query";
import type { VueMutationObserverOptions } from "@tanstack/vue-query/build/lib/useMutation";

 type RefreshTokenClient = typeof client<RefreshTokenMutationResponse, RefreshToken404, RefreshTokenMutationRequest>;
type RefreshToken = {
    data: RefreshTokenMutationResponse;
    error: RefreshToken404;
    request: RefreshTokenMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: RefreshTokenMutationResponse;
    client: {
        parameters: Partial<Parameters<RefreshTokenClient>[0]>;
        return: Awaited<ReturnType<RefreshTokenClient>>;
    };
};
/**
 * @summary Refresh access token
 * @link /auth/refresh
 */
export function useRefreshToken(options: {
    mutation?: VueMutationObserverOptions<RefreshToken["response"], RefreshToken["error"], RefreshToken["request"], unknown>;
    client?: RefreshToken["client"]["parameters"];
} = {}): UseMutationReturnType<RefreshToken["response"], RefreshToken["error"], RefreshToken["request"], unknown> {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation<RefreshToken["response"], RefreshToken["error"], RefreshToken["request"], unknown>({
        mutationFn: async (data) => {
            const res = await client<RefreshToken["data"], RefreshToken["error"], RefreshToken["request"]>({
                method: "post",
                url: `/auth/refresh`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}