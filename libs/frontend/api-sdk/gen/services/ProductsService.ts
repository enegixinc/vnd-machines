/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateManyProductEntityDto } from '../models/CreateManyProductEntityDto';
import type { CreateProductDto } from '../models/CreateProductDto';
import type { ProductEntity } from '../models/ProductEntity';
import type { SerializedProductDto } from '../models/SerializedProductDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * Retrieve a single ProductEntity
     * @param id
     * @param fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns SerializedProductDto Get one base response
     * @throws ApiError
     */
    public static getOneBaseProductsControllerProductEntity(
        id: string,
        fields?: Array<string>,
        join?: Array<string>,
        cache?: number,
        includeDeleted?: number,
    ): CancelablePromise<SerializedProductDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
                'join': join,
                'cache': cache,
                'include_deleted': includeDeleted,
            },
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Update a single ProductEntity
     * @param id
     * @param requestBody
     * @returns SerializedProductDto Response
     * @throws ApiError
     */
    public static updateOneBaseProductsControllerProductEntity(
        id: string,
        requestBody: ProductEntity,
    ): CancelablePromise<SerializedProductDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/products/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Delete a single ProductEntity
     * @param id
     * @returns any Delete one base response
     * @throws ApiError
     */
    public static deleteOneBaseProductsControllerProductEntity(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/products/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Retrieve multiple ProductEntities
     * @param fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param s Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>
     * @param filter Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>
     * @param or Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>
     * @param sort Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>
     * @param join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param limit Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>
     * @param offset Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a>
     * @param page Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>
     * @param cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns SerializedProductDto Get paginated response
     * @throws ApiError
     */
    public static getManyBaseProductsControllerProductEntity(
        fields?: Array<string>,
        s?: string,
        filter?: Array<string>,
        or?: Array<string>,
        sort?: Array<string>,
        join?: Array<string>,
        limit?: number,
        offset?: number,
        page?: number,
        cache?: number,
        includeDeleted?: number,
    ): CancelablePromise<SerializedProductDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products',
            query: {
                'fields': fields,
                's': s,
                'filter': filter,
                'or': or,
                'sort': sort,
                'join': join,
                'limit': limit,
                'offset': offset,
                'page': page,
                'cache': cache,
                'include_deleted': includeDeleted,
            },
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Create a single ProductEntity
     * @param requestBody
     * @returns SerializedProductDto Get create one base response
     * @throws ApiError
     */
    public static createOneBaseProductsControllerProductEntity(
        requestBody: CreateProductDto,
    ): CancelablePromise<SerializedProductDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Create multiple ProductEntities
     * @param requestBody
     * @returns SerializedProductDto Get create many base response
     * @throws ApiError
     */
    public static createManyBaseProductsControllerProductEntity(
        requestBody: CreateManyProductEntityDto,
    ): CancelablePromise<Array<SerializedProductDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products/bulk',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Recover one ProductEntity
     * @param id
     * @returns any Recover one base response
     * @throws ApiError
     */
    public static recoverOneBaseProductsControllerProductEntity(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/products/{id}/recover',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden.`,
            },
        });
    }
}
