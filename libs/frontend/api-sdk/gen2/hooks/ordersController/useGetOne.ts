import client from "../../../src/tanstack-query-client";
import { useQuery } from "@tanstack/vue-query";
import { unref } from "vue";
import type { GetOneQueryResponse, GetOnePathParams, GetOneQueryParams, GetOne403 } from "../../types/GetOne";
import type { UseQueryReturnType, QueryKey, WithRequired } from "@tanstack/vue-query";
import type { VueQueryObserverOptions } from "@tanstack/vue-query/build/lib/types";
import type { MaybeRef } from "vue";

 type GetOneClient = typeof client<GetOneQueryResponse, GetOne403, never>;
type GetOne = {
    data: GetOneQueryResponse;
    error: GetOne403;
    request: never;
    pathParams: GetOnePathParams;
    queryParams: GetOneQueryParams;
    headerParams: never;
    response: GetOneQueryResponse;
    client: {
        parameters: Partial<Parameters<GetOneClient>[0]>;
        return: Awaited<ReturnType<GetOneClient>>;
    };
};
export const getOneQueryKey = (id: MaybeRef<GetOnePathParams["id"]>, params?: MaybeRef<GetOne["queryParams"]>) => [{ url: "/orders/:id", params: { id: id } }, ...(params ? [params] : [])] as const;
export type GetOneQueryKey = ReturnType<typeof getOneQueryKey>;
export function getOneQueryOptions<TData = GetOne["response"], TQueryData = GetOne["response"]>(refId: MaybeRef<GetOnePathParams["id"]>, refParams?: MaybeRef<GetOneQueryParams>, options: GetOne["client"]["parameters"] = {}): WithRequired<VueQueryObserverOptions<GetOne["response"], GetOne["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = getOneQueryKey(refId, refParams);
    return {
        queryKey,
        queryFn: async () => {
            const id = unref(refId);
            const params = unref(refParams);
            const res = await client<GetOne["data"], GetOne["error"]>({
                method: "get",
                url: `/orders/${id}`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @link /orders/:id
 */
export function useGetOne<TData = GetOne["response"], TQueryData = GetOne["response"], TQueryKey extends QueryKey = GetOneQueryKey>(refId: GetOnePathParams["id"], refParams?: MaybeRef<GetOneQueryParams>, options: {
    query?: Partial<VueQueryObserverOptions<GetOne["response"], GetOne["error"], TData, TQueryKey>>;
    client?: GetOne["client"]["parameters"];
} = {}): UseQueryReturnType<TData, GetOne["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getOneQueryKey(refId, refParams);
    const query = useQuery<GetOne["data"], GetOne["error"], TData, any>({
        ...getOneQueryOptions<TData, TQueryData>(refId, refParams, clientOptions),
        queryKey,
        ...queryOptions
    }) as UseQueryReturnType<TData, GetOne["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}