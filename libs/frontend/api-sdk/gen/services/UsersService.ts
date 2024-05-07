/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateManyUserEntityDto } from '../models/CreateManyUserEntityDto';
import type { CreateUserDto } from '../models/CreateUserDto';
import type { SerializedUserDto } from '../models/SerializedUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Retrieve a single UserEntity
     * @param id
     * @param fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns SerializedUserDto Get one base response
     * @throws ApiError
     */
    public static getOneBaseUsersControllerUserEntity(
        id: string,
        fields?: Array<string>,
        join?: Array<string>,
        cache?: number,
        includeDeleted?: number,
    ): CancelablePromise<SerializedUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
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
     * Update a single UserEntity
     * @param id
     * @param requestBody
     * @returns SerializedUserDto Response
     * @throws ApiError
     */
    public static updateOneBaseUsersControllerUserEntity(
        id: string,
        requestBody: UpdateUserDto,
    ): CancelablePromise<SerializedUserDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{id}',
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
     * Delete a single UserEntity
     * @param id
     * @returns any Delete one base response
     * @throws ApiError
     */
    public static deleteOneBaseUsersControllerUserEntity(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Retrieve multiple UserEntities
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
     * @returns SerializedUserDto Get paginated response
     * @throws ApiError
     */
    public static getManyBaseUsersControllerUserEntity(
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
    ): CancelablePromise<SerializedUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
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
     * Create a single UserEntity
     * @param requestBody
     * @returns SerializedUserDto Get create one base response
     * @throws ApiError
     */
    public static createOneBaseUsersControllerUserEntity(
        requestBody: CreateUserDto,
    ): CancelablePromise<SerializedUserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Create multiple UserEntities
     * @param requestBody
     * @returns SerializedUserDto Get create many base response
     * @throws ApiError
     */
    public static createManyBaseUsersControllerUserEntity(
        requestBody: CreateManyUserEntityDto,
    ): CancelablePromise<Array<SerializedUserDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/bulk',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden.`,
            },
        });
    }
    /**
     * Recover one UserEntity
     * @param id
     * @returns any Recover one base response
     * @throws ApiError
     */
    public static recoverOneBaseUsersControllerUserEntity(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{id}/recover',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden.`,
            },
        });
    }
}
