// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { $OpenApiTs } from './types.gen';

export class AuthService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Login
   * @param data The data for the request.
   * @param data.formData
   * @returns unknown OK
   * @throws ApiError
   */
  public postUsersLogin(
    data: $OpenApiTs['/users/login']['post']['req'] = {}
  ): CancelablePromise<$OpenApiTs['/users/login']['post']['res'][200]> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/users/login',
      formData: data.formData,
      mediaType: 'application/x-www-form-urlencoded',
    });
  }
}

export class MachinesService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List
   * @param data The data for the request.
   * @param data.accountName
   * @param data.authToken
   * @returns unknown Successful response
   * @throws ApiError
   */
  public getGroupsAndMachinesByAccountName(
    data: $OpenApiTs['/groupsAndMachines/{accountName}']['get']['req']
  ): CancelablePromise<
    $OpenApiTs['/groupsAndMachines/{accountName}']['get']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'GET',
      url: '/groupsAndMachines/{accountName}',
      path: {
        accountName: data.accountName,
      },
      headers: {
        'auth-token': data.authToken,
      },
    });
  }

  /**
   * Edit
   * @param data The data for the request.
   * @param data.authToken
   * @param data.formData
   * @returns unknown Successful response
   * @throws ApiError
   */
  public postMachinesEdit657Ab833C7201F469894300D(
    data: $OpenApiTs['/machines/edit/657ab833c7201f469894300d']['post']['req'] = {}
  ): CancelablePromise<
    $OpenApiTs['/machines/edit/657ab833c7201f469894300d']['post']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'POST',
      url: '/machines/edit/657ab833c7201f469894300d',
      headers: {
        'auth-token': data.authToken,
      },
      formData: data.formData,
      mediaType: 'application/x-www-form-urlencoded',
    });
  }

  /**
   * View
   * @param data The data for the request.
   * @param data.serial
   * @param data.authToken
   * @returns unknown Successful response
   * @throws ApiError
   */
  public getPublicMachinesBySerial(
    data: $OpenApiTs['/public/machines/{serial}']['get']['req']
  ): CancelablePromise<
    $OpenApiTs['/public/machines/{serial}']['get']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'GET',
      url: '/public/machines/{serial}',
      path: {
        serial: data.serial,
      },
      headers: {
        'auth-token': data.authToken,
      },
    });
  }
}

export class ProductsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List
   * @param data The data for the request.
   * @param data.accountName
   * @param data.authToken
   * @returns unknown Successful response
   * @throws ApiError
   */
  public getProductsByAccountName(
    data: $OpenApiTs['/products/{accountName}']['get']['req']
  ): CancelablePromise<
    $OpenApiTs['/products/{accountName}']['get']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'GET',
      url: '/products/{accountName}',
      path: {
        accountName: data.accountName,
      },
      headers: {
        'auth-token': data.authToken,
      },
    });
  }

  /**
   * View
   * @param data The data for the request.
   * @param data.id
   * @param data.authToken
   * @returns unknown Successful response
   * @throws ApiError
   */
  public getProductById(
    data: $OpenApiTs['/product/{_id}']['get']['req']
  ): CancelablePromise<$OpenApiTs['/product/{_id}']['get']['res'][200]> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/product/{_id}',
      path: {
        _id: data.id,
      },
      headers: {
        'auth-token': data.authToken,
      },
    });
  }

  /**
   * Edit
   * # Edit Product
   *
   * This endpoint allows you to edit a specific product by making an HTTP PUT request to the specified URL.
   *
   * ## Request
   *
   * The request should be made to the following URL:
   *
   * ```
   * {{baseUrl}}/products/edit/660da97f7ac1611998463602
   *
   * ```
   *
   * ### Body
   *
   * The request should include a form-data body with the following parameters:
   *
   * - `name` (text, optional): The name of the product.
   * - `description` (text, optional): The description of the product.
   * - `additionPrice` (text, optional): Additional price for the product.
   * - `upc` (text, optional): The UPC (Universal Product Code) of the product.
   * - `price` (text, optional): The price of the product.
   * - `barcode` (text, optional): The barcode of the product.
   * - `category` (text, optional): The category of the product.
   * - `referTo` (text, optional): Reference information for the product.
   * - `dimension` (text, optional): The dimensions of the product (length, height, width).
   * - `prodType` (text, optional): The type of the product.
   * - `pricePerKilo` (text, optional): The price per kilo of the product.
   * - `productPictures` (text, optional): Pictures of the product.
   * - `costPrice` (text, optional): The cost price of the product.
   * - `detail` (text, optional): Detailed information about the product.
   * - `keyFeatures` (text, optional): Key features of the product.
   * - `include` (text, optional): Inclusions with the product.
   * - `specification` (text, optional): Specifications of the product.
   * - `sortIndex` (text, optional): Sorting index for the product.
   * - `vatIndex` (text, optional): VAT index for the product.
   * - `virtualProduct` (text, optional): Indicates if the product is virtual.
   * - `ageControl` (text, optional): Age control information for the product.
   * - `ingredients` (text, optional): Ingredients used in the product.
   * - `allergens` (text, optional): Allergens related to the product.
   * - `productVideo` (text, optional): Video link for the product.
   * - `brand` (text, optional): The brand of the product.
   *
   *
   * ## Response
   *
   * Upon successful execution, the endpoint will return a status code of 200 and a JSON object with the updated details of the product.
   * @param data The data for the request.
   * @param data.authToken
   * @param data.formData
   * @returns unknown Successful response
   * @throws ApiError
   */
  public putProductsEdit660Da97F7Ac1611998463602(
    data: $OpenApiTs['/products/edit/660da97f7ac1611998463602']['put']['req'] = {}
  ): CancelablePromise<
    $OpenApiTs['/products/edit/660da97f7ac1611998463602']['put']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/products/edit/660da97f7ac1611998463602',
      headers: {
        'auth-token': data.authToken,
      },
      formData: data.formData,
      mediaType: 'multipart/form-data',
    });
  }

  /**
   * Create
   *
   * ### Create a New Product
   *
   * This endpoint allows you to create a new product.
   *
   * #### Request Body
   * - The request should be sent as a form-data with the following parameters:
   * - `category` (text)
   * - `productPictures` (file)
   * - `pricePerKilo` (text)
   * - `name` (text)
   * - `upc` (text)
   * - `barcode` (text)
   * - `price` (text)
   * - `description` (text)
   * - `productVideo` (text)
   * - `referTo` (text)
   * - `dimension` (text)
   * - `prodType` (text)
   * - `additionPrice` (text)
   * - `costPrice` (text)
   * - `detail` (text)
   * - `keyFeatures` (text)
   * - `include` (text)
   * - `specification` (text)
   * - `sortIndex` (text)
   * - `vatIndex` (text)
   * - `virtualProduct` (text)
   * - `ageControl` (text)
   * - `ingredients` (text)
   * - `brand` (text)
   * - `createdAt` (text)
   * - `updatedAt` (text)
   * - `__v` (text)
   *
   * #### Response
   * Upon successful creation, the endpoint returns a status code of 201 and a JSON object with the details of the newly created product, including its ID, name, category, price, and other attributes.
   *
   *
   * @param data The data for the request.
   * @param data.authToken
   * @param data.formData
   * @returns unknown Successful response
   * @throws ApiError
   */
  public postProductsCreate(
    data: $OpenApiTs['/products/create']['post']['req'] = {}
  ): CancelablePromise<$OpenApiTs['/products/create']['post']['res'][200]> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/products/create',
      headers: {
        'auth-token': data.authToken,
      },
      formData: data.formData,
      mediaType: 'multipart/form-data',
    });
  }

  /**
   * Delete
   * @param data The data for the request.
   * @param data.id
   * @param data.authToken
   * @returns unknown Successful response
   * @throws ApiError
   */
  public deleteProductsDeleteById(
    data: $OpenApiTs['/products/delete/{_id}']['delete']['req']
  ): CancelablePromise<
    $OpenApiTs['/products/delete/{_id}']['delete']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/products/delete/{_id}',
      path: {
        _id: data.id,
      },
      headers: {
        'auth-token': data.authToken,
      },
    });
  }
}

export class CategoriesService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List
   * @param data The data for the request.
   * @param data.accountName
   * @param data.authToken
   * @returns unknown Successful response
   * @throws ApiError
   */
  public getCategoriesByAccountName(
    data: $OpenApiTs['/categories/{accountName}']['get']['req']
  ): CancelablePromise<
    $OpenApiTs['/categories/{accountName}']['get']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'GET',
      url: '/categories/{accountName}',
      path: {
        accountName: data.accountName,
      },
      headers: {
        'auth-token': data.authToken,
      },
    });
  }

  /**
   * Edit
   * ### Update Category
   *
   * This endpoint allows the user to update a specific category by providing the category ID and the updated information.
   *
   * #### Request
   *
   * - Method: PUT
   * - URL: {{baseUrl}}/categories/edit/:_id
   * - Body (form-data):
   * - `name` (text): The updated name of the category.
   * - `referTo` (text): The reference information for the category.
   * - `auto` (text): Indicates if the category is set to auto.
   * - `sortIndex` (text): The updated sort index of the category.
   *
   * #### Response
   *
   * - Status: 200
   * - Content-Type: application/json
   * - Body:
   *
   * ``` json
   * {
   * "name": {
   * "ar": ""
   * },
   * "sortIndex": 0
   * }
   *
   * ```
   * @param data The data for the request.
   * @param data.id
   * @param data.authToken
   * @param data.formData
   * @returns unknown Successful response
   * @throws ApiError
   */
  public putCategoriesEditById(
    data: $OpenApiTs['/categories/edit/{_id}']['put']['req']
  ): CancelablePromise<
    $OpenApiTs['/categories/edit/{_id}']['put']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/categories/edit/{_id}',
      path: {
        _id: data.id,
      },
      headers: {
        'auth-token': data.authToken,
      },
      formData: data.formData,
      mediaType: 'multipart/form-data',
    });
  }

  /**
   * Create
   * This endpoint makes an HTTP POST request to create a new category. The request should be sent to {{baseUrl}}/categories/create with a form-data request body type.
   *
   * ### Request Body
   *
   * - No specific parameters were provided for the form-data request body.
   *
   *
   * ### Response
   *
   * - **Status**: 201
   * - **Content-Type**: application/json
   * - The response will contain the newly created category object with the following properties:
   * - `newCategory`: An object representing the new category with properties such as `machines`, `_id`, `name`, `referTo`, `categoryPicture`, `sortIndex`, `createdAt`, `updatedAt`, and `__v`.
   * @param data The data for the request.
   * @param data.authToken
   * @param data.formData
   * @returns unknown Successful response
   * @throws ApiError
   */
  public postCategoriesCreate(
    data: $OpenApiTs['/categories/create']['post']['req'] = {}
  ): CancelablePromise<$OpenApiTs['/categories/create']['post']['res'][200]> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/categories/create',
      headers: {
        'auth-token': data.authToken,
      },
      formData: data.formData,
      mediaType: 'multipart/form-data',
    });
  }
}

export class ReportsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Machines Groups
   * # Get Groups and Machines for Report
   *
   * This endpoint retrieves the groups and machines associated with a specific account for reporting purposes.
   *
   * ## Request
   *
   * ### URL
   *
   * - `GET` {{baseUrl}}/groupsAndMachinesForReport/{{accountEmail}}
   *
   *
   * ## Response
   *
   * - Status: 200
   * - Content-Type: application/json
   *
   *
   * ``` json
   * {
   * "groups": [],
   * "machines": [
   * {
   * "group": [],
   * "currency": {
   * "code": "",
   * "name": "",
   * "Symbol": ""
   * },
   * "stock": 0,
   * "_id": "",
   * "name": "",
   * "description": "",
   * "product": [
   * {
   * "current_stock": 0,
   * "_id": "",
   * "id": {
   * "name": {
   * "ar": ""
   * },
   * "category": [""],
   * "productPictures": [""],
   * "_id": "",
   * "upc": "",
   * "price": 0,
   * "referTo": ""
   * },
   * "max_stock": 0,
   * "upc": "",
   * "stock": 0,
   * "floor": 0,
   * "lane": 0,
   * "name": "",
   * "motor": ""
   * }
   * ],
   * "products_min": [],
   * "diff": true
   * }
   * ]
   * }
   *
   * ```
   * @param data The data for the request.
   * @param data.accountEmail
   * @param data.authToken
   * @returns unknown Successful response
   * @throws ApiError
   */
  public getGroupsAndMachinesForReportByAccountEmail(
    data: $OpenApiTs['/groupsAndMachinesForReport/{accountEmail}']['get']['req']
  ): CancelablePromise<
    $OpenApiTs['/groupsAndMachinesForReport/{accountEmail}']['get']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'GET',
      url: '/groupsAndMachinesForReport/{accountEmail}',
      path: {
        accountEmail: data.accountEmail,
      },
      headers: {
        'auth-token': data.authToken,
      },
    });
  }
}

export class OrdersService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List
   * ## Add Order
   *
   * This endpoint allows you to list all orders and transactions for specified mchaine ids.
   *
   * ### Request Body
   *
   * - `start` (text): The starting location for the order.
   * - `end` (text): The destination location for the order.
   * - `id` (text): The ID of the order.
   * - `ids` (text): Comma separated Machine IDs.
   *
   *
   * ### Response
   *
   * - Status: 200
   * - Content Type: application/json
   * - Body:
   *
   * ``` json
   * [
   * {
   * "status": "",
   * "payment_type": "",
   * "lang": "",
   * "_id": "",
   * "machineID": {
   * "_id": "",
   * "name": "",
   * "description": ""
   * },
   * "products": [
   * {
   * "quantity": 0,
   * "discount": 0,
   * "proposed": true,
   * "_id": "",
   * "product": {
   * "name": {
   * "ar": ""
   * },
   * "category": [""],
   * "_id": "",
   * "upc": "",
   * "price": 0
   * },
   * "upc": "",
   * "name": "",
   * "lane": "",
   * "detail": "",
   * "soldPrice": 0,
   * "tax_amount": 0,
   * "retail_price": 0,
   * "row_number": ""
   * }
   * ],
   * "referTo": "",
   * "tax": 0,
   * "total": 0,
   * "currency": "",
   * "createdAt": "",
   * "createdAtUtc": "",
   * "utcOffset": 0,
   * "payment_transaction_id": "",
   * "payment_receipt": "",
   * "cart_number": "",
   * "card_number": "",
   * "card_department": "",
   * "email": "",
   * "reservation_code": "",
   * "return_code": "",
   * "__v": 0
   * }
   * ]
   *
   * ```
   * @param data The data for the request.
   * @param data.authToken
   * @param data.formData
   * @returns unknown Successful response
   * @throws ApiError
   */
  public postOrders(
    data: $OpenApiTs['/orders']['post']['req'] = {}
  ): CancelablePromise<$OpenApiTs['/orders']['post']['res'][200]> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/orders',
      headers: {
        'auth-token': data.authToken,
      },
      formData: data.formData,
      mediaType: 'application/x-www-form-urlencoded',
    });
  }
}

export class UsersService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List
   * @param data The data for the request.
   * @param data.authToken
   * @param data.formData
   * @returns unknown Successful response
   * @throws ApiError
   */
  public postUsersGetAllEmployees(
    data: $OpenApiTs['/users/getAllEmployees']['post']['req'] = {}
  ): CancelablePromise<
    $OpenApiTs['/users/getAllEmployees']['post']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'POST',
      url: '/users/getAllEmployees',
      headers: {
        'auth-token': data.authToken,
      },
      formData: data.formData,
      mediaType: 'application/x-www-form-urlencoded',
    });
  }

  /**
   * Create
   * @param data The data for the request.
   * @param data.authToken
   * @param data.requestBody
   * @returns unknown Successful response
   * @throws ApiError
   */
  public postUsersCreate(
    data: $OpenApiTs['/users/create']['post']['req']
  ): CancelablePromise<$OpenApiTs['/users/create']['post']['res'][200]> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/users/create',
      headers: {
        'auth-token': data.authToken,
      },
      body: data.requestBody,
      mediaType: '*/*',
    });
  }
}

export class StockingService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Log
   * # Retrieve Stock Log by Machine and Date Range
   *
   * This endpoint allows you to retrieve the stock log for a specific machine within a given date range.
   *
   * ## Request
   *
   * ### Endpoint
   *
   * `GET /stockLog/:machine_id/:from_date/:to_date`
   *
   * ### Parameters
   *
   * - `machine_id` (required, string) - The unique identifier of the machine.
   * - `from_date` (required, string) - The start date of the date range in the format YYYY-MM-DD.
   * - `to_date` (required, string) - The end date of the date range in the format YYYY-MM-DD.
   *
   *
   * ## Response
   *
   * - Status: 200 OK
   * - Content-Type: application/json
   *
   *
   * ``` json
   * [
   * {
   * "_id": "",
   * "machine": "",
   * "user": null,
   * "prods": [
   * {
   * "_id": "",
   * "id": null,
   * "pos": "",
   * "current_stock": 0,
   * "pre_stock": 0,
   * "motor": "",
   * "stock": 0,
   * "row": 0,
   * "lane": 0,
   * "upc": "",
   * "name": ""
   * }
   * ],
   * "localDate": "",
   * "createdAt": "",
   * "updatedAt": "",
   * "__v": 0
   * }
   * ]
   *
   * ```
   *
   * The response contains an array of stock log entries for the specified machine within the provided date range. Each entry includes details such as machine ID, user, product details, local date, and timestamps.
   * @param data The data for the request.
   * @param data.machineId
   * @param data.fromDate
   * @param data.toDate
   * @param data.authToken
   * @returns unknown Successful response
   * @throws ApiError
   */
  public getStockLogByMachineIdByFromDateByToDate(
    data: $OpenApiTs['/stockLog/{machine_id}/{from_date}/{to_date}']['get']['req']
  ): CancelablePromise<
    $OpenApiTs['/stockLog/{machine_id}/{from_date}/{to_date}']['get']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'GET',
      url: '/stockLog/{machine_id}/{from_date}/{to_date}',
      path: {
        machine_id: data.machineId,
        from_date: data.fromDate,
        to_date: data.toDate,
      },
      headers: {
        'auth-token': data.authToken,
      },
    });
  }
}

export class BrandsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List
   * This endpoint retrieves information about a specific brand associated with the account.
   *
   * ### Request
   *
   * `GET /brands/{{accountName}}`
   *
   * ### Response
   *
   * - Status: 200
   * - Content-Type: application/json
   *
   *
   * Example response body:
   *
   * ``` json
   * [
   * {
   * "name": {
   * "en": ""
   * },
   * "_id": "",
   * "referTo": "",
   * "picture": "",
   * "logo": "",
   * "createdAt": "",
   * "updatedAt": "",
   * "__v": 0
   * }
   * ]
   *
   * ```
   * @param data The data for the request.
   * @param data.accountName
   * @param data.authToken
   * @returns unknown Successful response
   * @throws ApiError
   */
  public getBrandsByAccountName(
    data: $OpenApiTs['/brands/{accountName}']['get']['req']
  ): CancelablePromise<$OpenApiTs['/brands/{accountName}']['get']['res'][200]> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/brands/{accountName}',
      path: {
        accountName: data.accountName,
      },
      headers: {
        'auth-token': data.authToken,
      },
    });
  }

  /**
   * Edit
   * @param data The data for the request.
   * @param data.id Brand ID
   * @param data.authToken
   * @param data.formData
   * @returns unknown Successful response
   * @throws ApiError
   */
  public postBrandsEditById(
    data: $OpenApiTs['/brands/edit/{_id}']['post']['req']
  ): CancelablePromise<$OpenApiTs['/brands/edit/{_id}']['post']['res'][200]> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/brands/edit/{_id}',
      path: {
        _id: data.id,
      },
      headers: {
        'auth-token': data.authToken,
      },
      formData: data.formData,
      mediaType: 'multipart/form-data',
    });
  }

  /**
   * Create
   * @param data The data for the request.
   * @param data.authToken
   * @param data.formData
   * @returns unknown Successful response
   * @throws ApiError
   */
  public postBrandsCreate(
    data: $OpenApiTs['/brands/create']['post']['req'] = {}
  ): CancelablePromise<$OpenApiTs['/brands/create']['post']['res'][200]> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/brands/create',
      headers: {
        'auth-token': data.authToken,
      },
      formData: data.formData,
      mediaType: 'multipart/form-data',
    });
  }
}