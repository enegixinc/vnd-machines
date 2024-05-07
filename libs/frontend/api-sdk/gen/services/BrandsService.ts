/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BrandEntity } from '../models/BrandEntity';
import type { CreateBrandDto } from '../models/CreateBrandDto';
import type { CreateManyBrandEntityDto } from '../models/CreateManyBrandEntityDto';
import type { SerializedBrandDto } from '../models/SerializedBrandDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BrandsService {
    /**
     * Retrieve a single BrandEntity
     * @param id
     * @param fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns SerializedBrandDto Get one base response
     * @throws ApiError
     */
    public static getOneBaseBrandsControllerBrandEntity(
        id: string,
        fields?: Array<string>,
        join?: Array<string>,
        cache?: number,
        includeDeleted?: number,
    ): CancelablePromise<SerializedBrandDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/brands/{id}',
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
     * Update a single BrandEntity
     * @param id
     * @param requestBody
     * @returns SerializedBrandDto Response
     * @throws ApiError
     */
    public static updateOneBaseBrandsControllerBrandEntity(
        id: string,
        requestBody: BrandEntity,
    ): CancelablePromise<SerializedBrandDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/brands/{id}',
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
     * Delete a single BrandEntity
     * @param id
     * @returns any Delete one base response
     * @throws ApiError
     */
    public static deleteOneBaseBrandsControllerBrandEntity(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/brands/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Retrieve multiple BrandEntities
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
     * @returns SerializedBrandDto Get paginated response
     * @throws ApiError
     */
    public static getManyBaseBrandsControllerBrandEntity(
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
    ): CancelablePromise<SerializedBrandDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/brands',
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
     * Create a single BrandEntity
     * @param requestBody
     * @returns SerializedBrandDto Get create one base response
     * @throws ApiError
     */
    public static createOneBaseBrandsControllerBrandEntity(
        requestBody: CreateBrandDto,
    ): CancelablePromise<SerializedBrandDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/brands',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Create multiple BrandEntities
     * @param requestBody
     * @returns SerializedBrandDto Get create many base response
     * @throws ApiError
     */
    public static createManyBaseBrandsControllerBrandEntity(
        requestBody: CreateManyBrandEntityDto,
    ): CancelablePromise<Array<SerializedBrandDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/brands/bulk',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Recover one BrandEntity
     * @param id
     * @returns any Recover one base response
     * @throws ApiError
     */
    public static recoverOneBaseBrandsControllerBrandEntity(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/brands/{id}/recover',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden.`,
            },
        });
    }
}
