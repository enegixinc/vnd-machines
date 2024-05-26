// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { AuthControllerLoginData, AuthControllerLoginResponse, AuthControllerMeResponse, RefreshTokenData, RefreshTokenResponse, FillData, FillResponse, GetOneData, GetOneResponse, UpdateOneData, UpdateOneResponse, DeleteOneData, DeleteOneResponse, GetManyData, GetManyResponse, CreateOneData, CreateOneResponse, CreateManyData, CreateManyResponse, RecoverOneData, RecoverOneResponse } from './types.gen';

export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) { }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown
     * @throws ApiError
     */
    public authControllerLogin(data: AuthControllerLoginData): CancelablePromise<AuthControllerLoginResponse> {
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
    public authControllerMe(): CancelablePromise<AuthControllerMeResponse> {
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
    public refreshToken(data: RefreshTokenData): CancelablePromise<RefreshTokenResponse> {
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

export class MachinesService {
    constructor(public readonly httpRequest: BaseHttpRequest) { }
    
    /**
     * @param data The data for the request.
     * @param data.machineId
     * @param data.requestBody
     * @returns unknown
     * @throws ApiError
     */
    public fill(data: FillData): CancelablePromise<FillResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/fill/{machineId}',
            path: {
                machineId: data.machineId
            },
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
    public getOne(data: GetOneData): CancelablePromise<GetOneResponse> {
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
    public updateOne(data: UpdateOneData): CancelablePromise<UpdateOneResponse> {
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
    public deleteOne(data: DeleteOneData): CancelablePromise<DeleteOneResponse> {
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
    public getMany(data: GetManyData = {}): CancelablePromise<GetManyResponse> {
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
    public createOne(data: CreateOneData): CancelablePromise<CreateOneResponse> {
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
    public createMany(data: CreateManyData): CancelablePromise<CreateManyResponse> {
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
    public recoverOne(data: RecoverOneData): CancelablePromise<RecoverOneResponse> {
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
    public getOne(data: GetOneData): CancelablePromise<GetOneResponse> {
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
    public updateOne(data: UpdateOneData): CancelablePromise<UpdateOneResponse> {
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
    public deleteOne(data: DeleteOneData): CancelablePromise<DeleteOneResponse> {
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
    public getMany(data: GetManyData = {}): CancelablePromise<GetManyResponse> {
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
    public createOne(data: CreateOneData): CancelablePromise<CreateOneResponse> {
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
    public createMany(data: CreateManyData): CancelablePromise<CreateManyResponse> {
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
    public recoverOne(data: RecoverOneData): CancelablePromise<RecoverOneResponse> {
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
    public getOne(data: GetOneData): CancelablePromise<GetOneResponse> {
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
    public updateOne(data: UpdateOneData): CancelablePromise<UpdateOneResponse> {
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
     * @param data.id
     * @returns unknown Delete one base response
     * @throws ApiError
     */
    public deleteOne(data: DeleteOneData): CancelablePromise<DeleteOneResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/contracts/{id}',
            path: {
                id: data.id
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
     * @returns GetManyContractEntityResponseDto Get paginated response
     * @throws ApiError
     */
    public getMany(data: GetManyData = {}): CancelablePromise<GetManyResponse> {
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
    public createOne(data: CreateOneData): CancelablePromise<CreateOneResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/contracts',
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns unknown Recover one base response
     * @throws ApiError
     */
    public recoverOne(data: RecoverOneData): CancelablePromise<RecoverOneResponse> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/contracts/{id}/recover',
            path: {
                id: data.id
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
    public getOne(data: GetOneData): CancelablePromise<GetOneResponse> {
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
    public updateOne(data: UpdateOneData): CancelablePromise<UpdateOneResponse> {
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
    public deleteOne(data: DeleteOneData): CancelablePromise<DeleteOneResponse> {
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
    public getMany(data: GetManyData = {}): CancelablePromise<GetManyResponse> {
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
    public createOne(data: CreateOneData): CancelablePromise<CreateOneResponse> {
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
    public createMany(data: CreateManyData): CancelablePromise<CreateManyResponse> {
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
    public recoverOne(data: RecoverOneData): CancelablePromise<RecoverOneResponse> {
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
    public getOne(data: GetOneData): CancelablePromise<GetOneResponse> {
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
    public updateOne(data: UpdateOneData): CancelablePromise<UpdateOneResponse> {
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
    public deleteOne(data: DeleteOneData): CancelablePromise<DeleteOneResponse> {
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
    public getMany(data: GetManyData = {}): CancelablePromise<GetManyResponse> {
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
    public createOne(data: CreateOneData): CancelablePromise<CreateOneResponse> {
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
    public createMany(data: CreateManyData): CancelablePromise<CreateManyResponse> {
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
    public recoverOne(data: RecoverOneData): CancelablePromise<RecoverOneResponse> {
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