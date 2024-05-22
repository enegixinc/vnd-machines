// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { $OpenApiTs } from './types.gen';

export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) { }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown
     * @throws ApiError
     */
    public authControllerLogin(data: $OpenApiTs['/auth/login']['post']['req']): CancelablePromise<$OpenApiTs['/auth/login']['post']['res'][201]> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    
    /**
     * @returns SerializedUserDto
     * @throws ApiError
     */
    public authControllerMe(): CancelablePromise<$OpenApiTs['/auth/me']['get']['res'][200]> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/me'
        });
    }
    
    /**
     * Refresh access token
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown Refresh token
     * @throws ApiError
     */
    public refreshToken(data: $OpenApiTs['/auth/refresh']['post']['req']): CancelablePromise<$OpenApiTs['/auth/refresh']['post']['res'][200]> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/refresh',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                404: 'Invalid refresh token'
            }
        });
    }
    
}

export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) { }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @param data.fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param data.join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param data.cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param data.includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns SerializedUserDto Get one base response
     * @throws ApiError
     */
    public getOne(data: $OpenApiTs['/users/{id}']['get']['req']): CancelablePromise<$OpenApiTs['/users/{id}']['get']['res'][200]> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{id}',
            path: {
                id: data.id
            },
            query: {
                fields: data.fields,
                join: data.join,
                cache: data.cache,
                include_deleted: data.includeDeleted
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @param data.requestBody
     * @returns SharedUserDto Response
     * @throws ApiError
     */
    public updateOne(data: $OpenApiTs['/users/{id}']['patch']['req']): CancelablePromise<$OpenApiTs['/users/{id}']['patch']['res'][200]> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/users/{id}',
            path: {
                id: data.id
            },
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns unknown Delete one base response
     * @throws ApiError
     */
    public deleteOne(data: $OpenApiTs['/users/{id}']['delete']['req']): CancelablePromise<$OpenApiTs['/users/{id}']['delete']['res'][200]> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users/{id}',
            path: {
                id: data.id
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param data.s Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>
     * @param data.filter Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>
     * @param data.or Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>
     * @param data.sort Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>
     * @param data.join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param data.limit Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>
     * @param data.offset Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a>
     * @param data.page Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>
     * @param data.cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param data.includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns SerializedUserDto Get paginated response
     * @throws ApiError
     */
    public getMany(data: $OpenApiTs['/users']['get']['req'] = {}): CancelablePromise<$OpenApiTs['/users']['get']['res'][200]> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users',
            query: {
                fields: data.fields,
                s: data.s,
                filter: data.filter,
                or: data.or,
                sort: data.sort,
                join: data.join,
                limit: data.limit,
                offset: data.offset,
                page: data.page,
                cache: data.cache,
                include_deleted: data.includeDeleted
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SerializedUserDto Get create one base response
     * @throws ApiError
     */
    public createOne(data: $OpenApiTs['/users']['post']['req']): CancelablePromise<$OpenApiTs['/users']['post']['res'][201]> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SerializedUserDto Get create many base response
     * @throws ApiError
     */
    public createMany(data: $OpenApiTs['/users/bulk']['post']['req']): CancelablePromise<$OpenApiTs['/users/bulk']['post']['res'][201]> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users/bulk',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns unknown Recover one base response
     * @throws ApiError
     */
    public recoverOne(data: $OpenApiTs['/users/{id}/recover']['patch']['req']): CancelablePromise<$OpenApiTs['/users/{id}/recover']['patch']['res'][200]> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/users/{id}/recover',
            path: {
                id: data.id
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
}

export class ContractsService {
    constructor(public readonly httpRequest: BaseHttpRequest) { }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @param data.fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param data.join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param data.cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param data.includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns SerializedContractDto Get one base response
     * @throws ApiError
     */
    public getOne(data: $OpenApiTs['/contracts/{id}']['get']['req']): CancelablePromise<$OpenApiTs['/contracts/{id}']['get']['res'][200]> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/contracts/{id}',
            path: {
                id: data.id
            },
            query: {
                fields: data.fields,
                join: data.join,
                cache: data.cache,
                include_deleted: data.includeDeleted
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @param data.requestBody
     * @returns ContractEntity Response
     * @throws ApiError
     */
    public updateOne(data: $OpenApiTs['/contracts/{id}']['patch']['req']): CancelablePromise<$OpenApiTs['/contracts/{id}']['patch']['res'][200]> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/contracts/{id}',
            path: {
                id: data.id
            },
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param data.s Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>
     * @param data.filter Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>
     * @param data.or Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>
     * @param data.sort Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>
     * @param data.join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param data.limit Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>
     * @param data.offset Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a>
     * @param data.page Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>
     * @param data.cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param data.includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns GetManyContractEntityResponseDto Get paginated response
     * @throws ApiError
     */
    public getMany(data: $OpenApiTs['/contracts']['get']['req'] = {}): CancelablePromise<$OpenApiTs['/contracts']['get']['res'][200]> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/contracts',
            query: {
                fields: data.fields,
                s: data.s,
                filter: data.filter,
                or: data.or,
                sort: data.sort,
                join: data.join,
                limit: data.limit,
                offset: data.offset,
                page: data.page,
                cache: data.cache,
                include_deleted: data.includeDeleted
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SerializedContractDto Get create one base response
     * @throws ApiError
     */
    public createOne(data: $OpenApiTs['/contracts']['post']['req']): CancelablePromise<$OpenApiTs['/contracts']['post']['res'][201]> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/contracts',
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    
}

export class ProductsService {
    constructor(public readonly httpRequest: BaseHttpRequest) { }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @param data.fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param data.join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param data.cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param data.includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns SerializedProductDto Get one base response
     * @throws ApiError
     */
    public getOne(data: $OpenApiTs['/products/{id}']['get']['req']): CancelablePromise<$OpenApiTs['/products/{id}']['get']['res'][200]> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/products/{id}',
            path: {
                id: data.id
            },
            query: {
                fields: data.fields,
                join: data.join,
                cache: data.cache,
                include_deleted: data.includeDeleted
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @param data.requestBody
     * @returns SerializedProductDto Response
     * @throws ApiError
     */
    public updateOne(data: $OpenApiTs['/products/{id}']['patch']['req']): CancelablePromise<$OpenApiTs['/products/{id}']['patch']['res'][200]> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/products/{id}',
            path: {
                id: data.id
            },
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns unknown Delete one base response
     * @throws ApiError
     */
    public deleteOne(data: $OpenApiTs['/products/{id}']['delete']['req']): CancelablePromise<$OpenApiTs['/products/{id}']['delete']['res'][200]> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/products/{id}',
            path: {
                id: data.id
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param data.s Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>
     * @param data.filter Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>
     * @param data.or Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>
     * @param data.sort Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>
     * @param data.join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param data.limit Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>
     * @param data.offset Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a>
     * @param data.page Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>
     * @param data.cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param data.includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns GetManyProductEntityResponseDto Get paginated response
     * @throws ApiError
     */
    public getMany(data: $OpenApiTs['/products']['get']['req'] = {}): CancelablePromise<$OpenApiTs['/products']['get']['res'][200]> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/products',
            query: {
                fields: data.fields,
                s: data.s,
                filter: data.filter,
                or: data.or,
                sort: data.sort,
                join: data.join,
                limit: data.limit,
                offset: data.offset,
                page: data.page,
                cache: data.cache,
                include_deleted: data.includeDeleted
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SerializedProductDto Get create one base response
     * @throws ApiError
     */
    public createOne(data: $OpenApiTs['/products']['post']['req']): CancelablePromise<$OpenApiTs['/products']['post']['res'][201]> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/products',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SerializedProductDto Get create many base response
     * @throws ApiError
     */
    public createMany(data: $OpenApiTs['/products/bulk']['post']['req']): CancelablePromise<$OpenApiTs['/products/bulk']['post']['res'][201]> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/products/bulk',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns unknown Recover one base response
     * @throws ApiError
     */
    public recoverOne(data: $OpenApiTs['/products/{id}/recover']['patch']['req']): CancelablePromise<$OpenApiTs['/products/{id}/recover']['patch']['res'][200]> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/products/{id}/recover',
            path: {
                id: data.id
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
}

export class CategoriesService {
    constructor(public readonly httpRequest: BaseHttpRequest) { }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @param data.fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param data.join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param data.cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param data.includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns SerializedCategoryDto Get one base response
     * @throws ApiError
     */
    public getOne(data: $OpenApiTs['/categories/{id}']['get']['req']): CancelablePromise<$OpenApiTs['/categories/{id}']['get']['res'][200]> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/categories/{id}',
            path: {
                id: data.id
            },
            query: {
                fields: data.fields,
                join: data.join,
                cache: data.cache,
                include_deleted: data.includeDeleted
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @param data.requestBody
     * @returns SerializedCategoryDto Response
     * @throws ApiError
     */
    public updateOne(data: $OpenApiTs['/categories/{id}']['patch']['req']): CancelablePromise<$OpenApiTs['/categories/{id}']['patch']['res'][200]> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/categories/{id}',
            path: {
                id: data.id
            },
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns unknown Delete one base response
     * @throws ApiError
     */
    public deleteOne(data: $OpenApiTs['/categories/{id}']['delete']['req']): CancelablePromise<$OpenApiTs['/categories/{id}']['delete']['res'][200]> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/categories/{id}',
            path: {
                id: data.id
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param data.s Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>
     * @param data.filter Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>
     * @param data.or Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>
     * @param data.sort Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>
     * @param data.join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param data.limit Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>
     * @param data.offset Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a>
     * @param data.page Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>
     * @param data.cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param data.includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns GetManyCategoryEntityResponseDto Get paginated response
     * @throws ApiError
     */
    public getMany(data: $OpenApiTs['/categories']['get']['req'] = {}): CancelablePromise<$OpenApiTs['/categories']['get']['res'][200]> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/categories',
            query: {
                fields: data.fields,
                s: data.s,
                filter: data.filter,
                or: data.or,
                sort: data.sort,
                join: data.join,
                limit: data.limit,
                offset: data.offset,
                page: data.page,
                cache: data.cache,
                include_deleted: data.includeDeleted
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SerializedCategoryDto Get create one base response
     * @throws ApiError
     */
    public createOne(data: $OpenApiTs['/categories']['post']['req']): CancelablePromise<$OpenApiTs['/categories']['post']['res'][201]> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/categories',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SerializedCategoryDto Get create many base response
     * @throws ApiError
     */
    public createMany(data: $OpenApiTs['/categories/bulk']['post']['req']): CancelablePromise<$OpenApiTs['/categories/bulk']['post']['res'][201]> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/categories/bulk',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns unknown Recover one base response
     * @throws ApiError
     */
    public recoverOne(data: $OpenApiTs['/categories/{id}/recover']['patch']['req']): CancelablePromise<$OpenApiTs['/categories/{id}/recover']['patch']['res'][200]> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/categories/{id}/recover',
            path: {
                id: data.id
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
}

export class BrandsService {
    constructor(public readonly httpRequest: BaseHttpRequest) { }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @param data.fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param data.join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param data.cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param data.includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns SerializedBrandDto Get one base response
     * @throws ApiError
     */
    public getOne(data: $OpenApiTs['/brands/{id}']['get']['req']): CancelablePromise<$OpenApiTs['/brands/{id}']['get']['res'][200]> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/brands/{id}',
            path: {
                id: data.id
            },
            query: {
                fields: data.fields,
                join: data.join,
                cache: data.cache,
                include_deleted: data.includeDeleted
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @param data.requestBody
     * @returns SerializedBrandDto Response
     * @throws ApiError
     */
    public updateOne(data: $OpenApiTs['/brands/{id}']['patch']['req']): CancelablePromise<$OpenApiTs['/brands/{id}']['patch']['res'][200]> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/brands/{id}',
            path: {
                id: data.id
            },
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns unknown Delete one base response
     * @throws ApiError
     */
    public deleteOne(data: $OpenApiTs['/brands/{id}']['delete']['req']): CancelablePromise<$OpenApiTs['/brands/{id}']['delete']['res'][200]> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/brands/{id}',
            path: {
                id: data.id
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.fields Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     * @param data.s Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>
     * @param data.filter Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>
     * @param data.or Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>
     * @param data.sort Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>
     * @param data.join Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     * @param data.limit Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>
     * @param data.offset Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a>
     * @param data.page Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>
     * @param data.cache Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     * @param data.includeDeleted Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     * @returns GetManyBrandEntityResponseDto Get paginated response
     * @throws ApiError
     */
    public getMany(data: $OpenApiTs['/brands']['get']['req'] = {}): CancelablePromise<$OpenApiTs['/brands']['get']['res'][200]> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/brands',
            query: {
                fields: data.fields,
                s: data.s,
                filter: data.filter,
                or: data.or,
                sort: data.sort,
                join: data.join,
                limit: data.limit,
                offset: data.offset,
                page: data.page,
                cache: data.cache,
                include_deleted: data.includeDeleted
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SerializedBrandDto Get create one base response
     * @throws ApiError
     */
    public createOne(data: $OpenApiTs['/brands']['post']['req']): CancelablePromise<$OpenApiTs['/brands']['post']['res'][201]> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/brands',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SerializedBrandDto Get create many base response
     * @throws ApiError
     */
    public createMany(data: $OpenApiTs['/brands/bulk']['post']['req']): CancelablePromise<$OpenApiTs['/brands/bulk']['post']['res'][201]> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/brands/bulk',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns unknown Recover one base response
     * @throws ApiError
     */
    public recoverOne(data: $OpenApiTs['/brands/{id}/recover']['patch']['req']): CancelablePromise<$OpenApiTs['/brands/{id}/recover']['patch']['res'][200]> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/brands/{id}/recover',
            path: {
                id: data.id
            },
            errors: {
                403: 'Forbidden.'
            }
        });
    }
    
}