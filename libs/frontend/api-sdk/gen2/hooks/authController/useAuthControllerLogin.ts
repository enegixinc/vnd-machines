import client from "../../../src/tanstack-query-client";
import { useMutation } from "@tanstack/vue-query";
import type { AuthControllerLoginMutationRequest, AuthControllerLoginMutationResponse } from "../../types/AuthControllerLogin";
import type { UseMutationReturnType } from "@tanstack/vue-query";
import type { VueMutationObserverOptions } from "@tanstack/vue-query/build/lib/useMutation";

 type AuthControllerLoginClient = typeof client<AuthControllerLoginMutationResponse, never, AuthControllerLoginMutationRequest>;
type AuthControllerLogin = {
    data: AuthControllerLoginMutationResponse;
    error: never;
    request: AuthControllerLoginMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: AuthControllerLoginMutationResponse;
    client: {
        parameters: Partial<Parameters<AuthControllerLoginClient>[0]>;
        return: Awaited<ReturnType<AuthControllerLoginClient>>;
    };
};
/**
 * @link /auth/login
 */
export function useAuthControllerLogin(options: {
    mutation?: VueMutationObserverOptions<AuthControllerLogin["response"], AuthControllerLogin["error"], AuthControllerLogin["request"], unknown>;
    client?: AuthControllerLogin["client"]["parameters"];
} = {}): UseMutationReturnType<AuthControllerLogin["response"], AuthControllerLogin["error"], AuthControllerLogin["request"], unknown> {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation<AuthControllerLogin["response"], AuthControllerLogin["error"], AuthControllerLogin["request"], unknown>({
        mutationFn: async (data) => {
            const res = await client<AuthControllerLogin["data"], AuthControllerLogin["error"], AuthControllerLogin["request"]>({
                method: "post",
                url: `/auth/login`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}