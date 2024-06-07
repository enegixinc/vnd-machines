import client from "../../../src/tanstack-query-client";
import { useQuery } from "@tanstack/vue-query";
import type { AuthControllerMeQueryResponse } from "../../types/AuthControllerMe";
import type { UseQueryReturnType, QueryKey, WithRequired } from "@tanstack/vue-query";
import type { VueQueryObserverOptions } from "@tanstack/vue-query/build/lib/types";

 type AuthControllerMeClient = typeof client<AuthControllerMeQueryResponse, never, never>;
type AuthControllerMe = {
    data: AuthControllerMeQueryResponse;
    error: never;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: AuthControllerMeQueryResponse;
    client: {
        parameters: Partial<Parameters<AuthControllerMeClient>[0]>;
        return: Awaited<ReturnType<AuthControllerMeClient>>;
    };
};
export const authControllerMeQueryKey = () => [{ url: "/auth/me" }] as const;
export type AuthControllerMeQueryKey = ReturnType<typeof authControllerMeQueryKey>;
export function authControllerMeQueryOptions<TData = AuthControllerMe["response"], TQueryData = AuthControllerMe["response"]>(options: AuthControllerMe["client"]["parameters"] = {}): WithRequired<VueQueryObserverOptions<AuthControllerMe["response"], AuthControllerMe["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = authControllerMeQueryKey();
    return {
        queryKey,
        queryFn: async () => {
            const res = await client<AuthControllerMe["data"], AuthControllerMe["error"]>({
                method: "get",
                url: `/auth/me`,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @link /auth/me
 */
export function useAuthControllerMe<TData = AuthControllerMe["response"], TQueryData = AuthControllerMe["response"], TQueryKey extends QueryKey = AuthControllerMeQueryKey>(options: {
    query?: Partial<VueQueryObserverOptions<AuthControllerMe["response"], AuthControllerMe["error"], TData, TQueryKey>>;
    client?: AuthControllerMe["client"]["parameters"];
} = {}): UseQueryReturnType<TData, AuthControllerMe["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? authControllerMeQueryKey();
    const query = useQuery<AuthControllerMe["data"], AuthControllerMe["error"], TData, any>({
        ...authControllerMeQueryOptions<TData, TQueryData>(clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryReturnType<TData, AuthControllerMe["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}