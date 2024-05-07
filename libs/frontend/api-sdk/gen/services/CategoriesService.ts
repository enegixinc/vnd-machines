/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryEntity } from '../models/CategoryEntity';
import type { CreateCategoryDto } from '../models/CreateCategoryDto';
import type { CreateManyCategoryEntityDto } from '../models/CreateManyCategoryEntityDto';
import type { SerializedCategoryDto } from '../models/SerializedCategoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoriesService {
    /**
     * Retrieve a single CategoryEntity
     * @param id
     * @param fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns SerializedCategoryDto Get one base response
     * @throws ApiError
     */
    public static getOneBaseCategoriesControllerCategoryEntity(
        id: string,
        fields?: Array<string>,
        join?: Array<string>,
        cache?: number,
        includeDeleted?: number,
    ): CancelablePromise<SerializedCategoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/{id}',
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
     * Update a single CategoryEntity
     * @param id
     * @param requestBody
     * @returns SerializedCategoryDto Response
     * @throws ApiError
     */
    public static updateOneBaseCategoriesControllerCategoryEntity(
        id: string,
        requestBody: CategoryEntity,
    ): CancelablePromise<SerializedCategoryDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/categories/{id}',
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
     * Delete a single CategoryEntity
     * @param id
     * @returns any Delete one base response
     * @throws ApiError
     */
    public static deleteOneBaseCategoriesControllerCategoryEntity(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/categories/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Retrieve multiple CategoryEntities
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
     * @returns SerializedCategoryDto Get paginated response
     * @throws ApiError
     */
    public static getManyBaseCategoriesControllerCategoryEntity(
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
    ): CancelablePromise<SerializedCategoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories',
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
     * Create a single CategoryEntity
     * @param requestBody
     * @returns SerializedCategoryDto Get create one base response
     * @throws ApiError
     */
    public static createOneBaseCategoriesControllerCategoryEntity(
        requestBody: CreateCategoryDto,
    ): CancelablePromise<SerializedCategoryDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/categories',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Create multiple CategoryEntities
     * @param requestBody
     * @returns SerializedCategoryDto Get create many base response
     * @throws ApiError
     */
    public static createManyBaseCategoriesControllerCategoryEntity(
        requestBody: CreateManyCategoryEntityDto,
    ): CancelablePromise<Array<SerializedCategoryDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/categories/bulk',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Recover one CategoryEntity
     * @param id
     * @returns any Recover one base response
     * @throws ApiError
     */
    public static recoverOneBaseCategoriesControllerCategoryEntity(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/categories/{id}/recover',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden.`,
            },
        });
    }
}
