import client from "../../../src/tanstack-query-client";
import { useQuery } from "@tanstack/vue-query";
import { unref } from "vue";
import type { GetManyQueryResponse, GetManyQueryParams, GetMany403 } from "../../types/GetMany";
import type { UseQueryReturnType, QueryKey, WithRequired } from "@tanstack/vue-query";
import type { VueQueryObserverOptions } from "@tanstack/vue-query/build/lib/types";
import type { MaybeRef } from "vue";

 type GetManyClient = typeof client<GetManyQueryResponse, GetMany403, never>;
type GetMany = {
    data: GetManyQueryResponse;
    error: GetMany403;
    request: never;
    pathParams: never;
    queryParams: GetManyQueryParams;
    headerParams: never;
    response: GetManyQueryResponse;
    client: {
        parameters: Partial<Parameters<GetManyClient>[0]>;
        return: Awaited<ReturnType<GetManyClient>>;
    };
};
export const getManyQueryKey = (params?: MaybeRef<GetMany["queryParams"]>) => [{ url: "/products" }, ...(params ? [params] : [])] as const;
export type GetManyQueryKey = ReturnType<typeof getManyQueryKey>;
export function getManyQueryOptions<TData = GetMany["response"], TQueryData = GetMany["response"]>(refParams?: MaybeRef<GetManyQueryParams>, options: GetMany["client"]["parameters"] = {}): WithRequired<VueQueryObserverOptions<GetMany["response"], GetMany["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = getManyQueryKey(refParams);
    return {
        queryKey,
        queryFn: async () => {
            const params = unref(refParams);
            const res = await client<GetMany["data"], GetMany["error"]>({
                method: "get",
                url: `/products`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @link /products
 */
export function useGetMany<TData = GetMany["response"], TQueryData = GetMany["response"], TQueryKey extends QueryKey = GetManyQueryKey>(refParams?: MaybeRef<GetManyQueryParams>, options: {
    query?: Partial<VueQueryObserverOptions<GetMany["response"], GetMany["error"], TData, TQueryKey>>;
    client?: GetMany["client"]["parameters"];
} = {}): UseQueryReturnType<TData, GetMany["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getManyQueryKey(refParams);
    const query = useQuery<GetMany["data"], GetMany["error"], TData, any>({
        ...getManyQueryOptions<TData, TQueryData>(refParams, clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryReturnType<TData, GetMany["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}