// This file is auto-generated by @hey-api/openapi-ts

export type LoginDto = {
    /**
     * Email of the user
     */
    email: string;
    password: string;
};

export type UserEntity = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
};

/**
 * Role of the user
 */
export type UserRole = 'admin' | 'supplier';

export type GetManyBrandEntityResponseDto = {
    data: Array<SerializedBrandDto>;
    count: number;
    total: number;
    page: number;
    pageCount: number;
};

export type BrandEntity = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
};

export type SharedCategoryDto = {
    totalSoldProducts: number;
    totalRevenue: number;
    totalOrders: number;
    /**
     * Name of the Category in multiple languages
     */
    name: {
        [key: string]: unknown;
    };
    auto: boolean;
    /**
     * Category picture
     */
    categoryPicture?: string;
    /**
     * Sort index
     */
    sortIndex: number;
};

export type MultiLangEntity = {
    ar: string;
    en: string;
};

export type DimensionEntity = {
    /**
     * Dimension of the product
     */
    height: number;
    /**
     * Dimension of the product
     */
    length: number;
    /**
     * Dimension of the product
     */
    width: number;
};

export type SharedProductDto = {
    /**
     * UPC of the product
     */
    upc: string;
    /**
     * Additional price of the product
     */
    additionPrice: number;
    /**
     * Age control of the product
     */
    ageControl: number;
    /**
     * Barcode of the product
     */
    barcode: string;
    /**
     * Cost price of the product
     */
    costPrice: number;
    name: MultiLangEntity;
    description: MultiLangEntity;
    detail?: MultiLangEntity;
    include?: MultiLangEntity;
    ingredients?: MultiLangEntity;
    keyFeatures?: MultiLangEntity;
    specification?: MultiLangEntity;
    dimension?: DimensionEntity;
    /**
     * Price of the product
     */
    price: number;
    /**
     * Whether the price is per kilo or not
     */
    pricePerKilo: boolean;
    /**
     * Type of the product
     */
    prodType: string;
    /**
     * Array of product picture URLs
     */
    productPictures: Array<(string)>;
    /**
     * Index for sorting the product
     */
    sortIndex: number;
    /**
     * VAT index of the product
     */
    vatIndex: number;
    /**
     * Virtual product indicator
     */
    virtualProduct: number;
};

export type GetManyOrderEntityResponseDto = {
    data: Array<OrderEntity>;
    count: number;
    total: number;
    page: number;
    pageCount: number;
};

export type OrderEntity = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
    status: string;
    payment_type: string;
    lang: string;
    referTo: string;
    tax: number;
    total: number;
    currency: string;
    createdAtUtc: string;
    utcOffset: number;
    payment_transaction_id: string;
    payment_receipt: string;
    cart_number: string;
    card_number: string;
    card_department: string;
    email: string;
    reservation_code: string;
    return_code: string;
};

export type SerializedBrandDto = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
    /**
     * Name of the product in multiple languages
     */
    name: {
        [key: string]: unknown;
    };
    /**
     * Brand picture
     */
    picture?: string;
    /**
     * Brand logo
     */
    logo?: string;
    totalSoldProducts: number;
    totalRevenue: number;
    totalOrders: number;
    categories: Array<SharedCategoryDto>;
    products: Array<SharedProductDto>;
    suppliers: Array<SharedProductDto>;
    /**
     * Reference to another product
     */
    referTo: string;
    orders: Array<OrderEntity>;
};

export type GetManyContractEntityResponseDto = {
    data: Array<SerializedContractDto>;
    count: number;
    total: number;
    page: number;
    pageCount: number;
};

export type FileDto = {
    filename: string;
    originalname: string;
    size: number;
    url: string;
};

export type ContractEntity = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
    files: Array<FileDto>;
};

export type SerializedUserDto = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
    /**
     * Is the user active
     */
    active: boolean;
    /**
     * Email of the user
     */
    email: string;
    firstName: string;
    lastName: string;
    /**
     * Phone number of the user
     */
    phoneNumber: string;
    role: UserRole;
    /**
     * Business name of the user
     */
    businessName: string | null;
    totalSoldProducts: number;
    totalRevenue: number;
    totalOrders: number;
    brand: Array<SerializedBrandDto>;
    contracts: Array<SerializedContractDto>;
};

export type SerializedContractDto = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
    totalSoldProducts: number;
    totalRevenue: number;
    totalOrders: number;
    supplier: SerializedUserDto;
};

export type Object = unknown;

export type PickTypeClass = {
    _id: string;
};

export type ProductsRequest = {
    product: PickTypeClass;
    quantity: number;
};

export type NotificationRequest = {
    email: boolean;
    whatsapp: boolean;
};

export type FillRequestDto = {
    products: Array<ProductsRequest>;
    notify: NotificationRequest;
};

export type GetManyMachineEntityResponseDto = {
    data: Array<MachineEntity>;
    count: number;
    total: number;
    page: number;
    pageCount: number;
};

export type MachineProduct = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
    id: string;
    current_stock: number;
    max_stock: number;
    upc: string;
    stock: number;
    floor: number;
    lane: number;
    name: string;
    motor: string;
    expiration_date: string;
};

export type MachineEntity = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
    productsCount: number;
    totalMaxStock: number;
    totalRevenue: number;
    totalSoldProducts: number;
    totalOrders: number;
    product: Array<MachineProduct>;
    orders: Array<OrderEntity>;
    status: boolean;
    alertSent: boolean;
    machineOnline: boolean;
    machineOnlineAlert: boolean;
    category: Array<(string)>;
    brand: Array<(string)>;
    products_bs: Array<(string)>;
    tax: number;
    group: Array<(string)>;
    stock: number;
    time_to_idle: number;
    enablePriceChange: boolean;
    alertEmail: string;
    alertEmail2: string;
    name: string;
    description: string;
    belongTo: string;
    lane: number;
    floor: number;
    laneLength: number;
    height: number;
    slot_height: number;
    step_depth: number;
    step_num: number;
    model: string;
    products_price: Array<(string)>;
    products_plan: Array<(string)>;
    stocking: string;
    active: string;
    gui_version: string;
    master_version: string;
    diff: boolean;
    screenSaver: string;
};

export type ProductEntity = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
};

export type GetManyProductEntityResponseDto = {
    data: Array<SerializedProductDto>;
    count: number;
    total: number;
    page: number;
    pageCount: number;
};

export type SharedBrandDto = {
    /**
     * Name of the product in multiple languages
     */
    name: {
        [key: string]: unknown;
    };
    /**
     * Brand picture
     */
    picture?: string;
    /**
     * Brand logo
     */
    logo?: string;
};

export type SharedUserDto = {
    /**
     * Is the user active
     */
    active: boolean;
    /**
     * Email of the user
     */
    email: string;
    firstName: string;
    lastName: string;
    /**
     * Phone number of the user
     */
    phoneNumber: string;
    role: UserRole;
    /**
     * Business name of the user
     */
    businessName: string | null;
};

export type SerializedProductDto = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
    /**
     * UPC of the product
     */
    upc: string;
    /**
     * Additional price of the product
     */
    additionPrice: number;
    /**
     * Age control of the product
     */
    ageControl: number;
    /**
     * Barcode of the product
     */
    barcode: string;
    /**
     * Cost price of the product
     */
    costPrice: number;
    name: MultiLangEntity;
    description: MultiLangEntity;
    detail?: MultiLangEntity;
    include?: MultiLangEntity;
    ingredients?: MultiLangEntity;
    keyFeatures?: MultiLangEntity;
    specification?: MultiLangEntity;
    dimension?: DimensionEntity;
    /**
     * Price of the product
     */
    price: number;
    /**
     * Whether the price is per kilo or not
     */
    pricePerKilo: boolean;
    /**
     * Type of the product
     */
    prodType: string;
    /**
     * Array of product picture URLs
     */
    productPictures: Array<(string)>;
    /**
     * Index for sorting the product
     */
    sortIndex: number;
    /**
     * VAT index of the product
     */
    vatIndex: number;
    /**
     * Virtual product indicator
     */
    virtualProduct: number;
    totalSoldProducts: number;
    totalRevenue: number;
    totalActiveRevenue: number;
    totalOrders: number;
    /**
     * Video of the product
     */
    productVideo: string;
    category: SharedCategoryDto;
    brand: SharedBrandDto;
    supplier: SharedUserDto;
    orders: Array<OrderEntity>;
    /**
     * Reference to another product
     */
    referTo: string;
};

export type CreateProductDto = {
    /**
     * UPC of the product
     */
    upc: string;
    /**
     * Additional price of the product
     */
    additionPrice: number;
    /**
     * Age control of the product
     */
    ageControl: number;
    /**
     * Barcode of the product
     */
    barcode: string;
    /**
     * Cost price of the product
     */
    costPrice: number;
    name: MultiLangEntity;
    description: MultiLangEntity;
    detail?: MultiLangEntity;
    include?: MultiLangEntity;
    ingredients?: MultiLangEntity;
    keyFeatures?: MultiLangEntity;
    specification?: MultiLangEntity;
    dimension?: DimensionEntity;
    /**
     * Price of the product
     */
    price: number;
    /**
     * Whether the price is per kilo or not
     */
    pricePerKilo: boolean;
    /**
     * Type of the product
     */
    prodType: string;
    /**
     * Array of product picture URLs
     */
    productPictures: Array<(string)>;
    /**
     * Index for sorting the product
     */
    sortIndex: number;
    /**
     * VAT index of the product
     */
    vatIndex: number;
    /**
     * Virtual product indicator
     */
    virtualProduct: number;
    supplier?: (PickTypeClass) | null;
    brand?: (PickTypeClass) | null;
    category?: (PickTypeClass) | null;
    productVideo?: string;
};

export type CreateManyProductEntityDto = {
    bulk: Array<CreateProductDto>;
};

export type UpdateProductDto = {
    /**
     * UPC of the product
     */
    upc?: string;
    /**
     * Additional price of the product
     */
    additionPrice?: number;
    /**
     * Age control of the product
     */
    ageControl?: number;
    /**
     * Barcode of the product
     */
    barcode?: string;
    /**
     * Cost price of the product
     */
    costPrice?: number;
    name?: MultiLangEntity;
    description?: MultiLangEntity;
    detail?: MultiLangEntity;
    include?: MultiLangEntity;
    ingredients?: MultiLangEntity;
    keyFeatures?: MultiLangEntity;
    specification?: MultiLangEntity;
    dimension?: DimensionEntity;
    /**
     * Price of the product
     */
    price?: number;
    /**
     * Whether the price is per kilo or not
     */
    pricePerKilo?: boolean;
    /**
     * Type of the product
     */
    prodType?: string;
    /**
     * Array of product picture URLs
     */
    productPictures?: Array<(string)>;
    /**
     * Index for sorting the product
     */
    sortIndex?: number;
    /**
     * VAT index of the product
     */
    vatIndex?: number;
    /**
     * Virtual product indicator
     */
    virtualProduct?: number;
    supplier?: (PickTypeClass) | null;
    brand?: (PickTypeClass) | null;
    category?: (PickTypeClass) | null;
    productVideo?: string;
};

export type CreateUserDto = {
    /**
     * Is the user active
     */
    active: boolean;
    /**
     * Email of the user
     */
    email: string;
    firstName: string;
    lastName: string;
    /**
     * Phone number of the user
     */
    phoneNumber: string;
    role: UserRole;
    /**
     * Business name of the user
     */
    businessName: string | null;
    password: string;
};

export type CreateManyUserEntityDto = {
    bulk: Array<CreateUserDto>;
};

export type UpdateUserDto = {
    /**
     * Is the user active
     */
    active?: boolean;
    /**
     * Email of the user
     */
    email?: string;
    firstName?: string;
    lastName?: string;
    /**
     * Phone number of the user
     */
    phoneNumber?: string;
    role?: UserRole;
    /**
     * Business name of the user
     */
    businessName?: string | null;
    password?: string;
};

export type GetManyFillRequestEntityResponseDto = {
    data: Array<FillRequestEntity>;
    count: number;
    total: number;
    page: number;
    pageCount: number;
};

export type FillRequestEntity = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
};

export type ProductsFillRequest = {
    product: PickTypeClass;
    quantity: number;
};

export type CreateFillRequestDto = {
    notes?: string | null;
    machine: PickTypeClass;
    products: Array<ProductsFillRequest>;
};

export type CreateManyFillRequestEntityDto = {
    bulk: Array<CreateFillRequestDto>;
};

export type CreateContractDto = {
    description?: string;
    feePerSale: number;
    feeType: 'percentage' | 'fixed';
    startDate: string;
    endDate: string;
    status?: 'active' | 'expired' | 'terminated';
    supplier: PickTypeClass;
};

export type feeType = 'percentage' | 'fixed';

export type status = 'active' | 'expired' | 'terminated';

export type UpdateContractDto = {
    description?: string;
    feePerSale?: number;
    feeType?: 'percentage' | 'fixed';
    startDate?: string;
    endDate?: string;
    status?: 'active' | 'expired' | 'terminated';
    supplier?: PickTypeClass;
};

export type GetManyCategoryEntityResponseDto = {
    data: Array<SerializedCategoryDto>;
    count: number;
    total: number;
    page: number;
    pageCount: number;
};

export type CategoryEntity = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
};

export type SerializedCategoryDto = {
    _id: string;
    /**
     * Version
     */
    __v: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastSyncAt: string | null;
    totalSoldProducts: number;
    totalRevenue: number;
    totalOrders: number;
    /**
     * Name of the Category in multiple languages
     */
    name: {
        [key: string]: unknown;
    };
    auto: boolean;
    /**
     * Category picture
     */
    categoryPicture?: string;
    /**
     * Sort index
     */
    sortIndex: number;
    products: Array<SharedProductDto>;
    suppliers: Array<SharedUserDto>;
    brands: Array<SharedBrandDto>;
    orders: Array<OrderEntity>;
    /**
     * Email of the owner
     */
    referTo: string;
};

export type CreateCategoryDto = {
    totalSoldProducts: number;
    totalRevenue: number;
    totalOrders: number;
    /**
     * Name of the Category in multiple languages
     */
    name: {
        [key: string]: unknown;
    };
    auto: boolean;
    /**
     * Category picture
     */
    categoryPicture?: string;
    /**
     * Sort index
     */
    sortIndex: number;
};

export type CreateManyCategoryEntityDto = {
    bulk: Array<CreateCategoryDto>;
};

export type UpdateCategoryDto = {
    totalSoldProducts?: number;
    totalRevenue?: number;
    totalOrders?: number;
    /**
     * Name of the Category in multiple languages
     */
    name?: {
        [key: string]: unknown;
    };
    auto?: boolean;
    /**
     * Category picture
     */
    categoryPicture?: string;
    /**
     * Sort index
     */
    sortIndex?: number;
};

export type CreateBrandDto = {
    /**
     * Name of the product in multiple languages
     */
    name: {
        [key: string]: unknown;
    };
    /**
     * Brand picture
     */
    picture?: string;
    /**
     * Brand logo
     */
    logo?: string;
};

export type CreateManyBrandEntityDto = {
    bulk: Array<CreateBrandDto>;
};

export type UpdateBrandDto = {
    /**
     * Name of the product in multiple languages
     */
    name?: {
        [key: string]: unknown;
    };
    /**
     * Brand picture
     */
    picture?: string;
    /**
     * Brand logo
     */
    logo?: string;
};

export type AuthControllerLoginData = {
    requestBody: LoginDto;
};

export type AuthControllerLoginResponse = unknown;

export type AuthControllerMeResponse = SerializedUserDto;

export type RefreshTokenData = {
    requestBody: Object;
};

export type RefreshTokenResponse = {
    accessToken?: string;
    refreshToken?: string;
};

export type FillData = {
    machineId: string;
    requestBody: FillRequestDto;
};

export type FillResponse = unknown;

export type GetOneData = {
    /**
     * Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     */
    cache?: number;
    /**
     * Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     */
    fields?: Array<(string)>;
    id: string;
    /**
     * Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     */
    includeDeleted?: number;
    /**
     * Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     */
    join?: Array<(string)>;
};

export type GetOneResponse = MachineEntity;

export type GetManyData = {
    /**
     * Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>
     */
    cache?: number;
    /**
     * Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
     */
    fields?: Array<(string)>;
    /**
     * Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>
     */
    filter?: Array<(string)>;
    /**
     * Include deleted. <a href="https://github.com/nestjsx/crud/wiki/Requests#includeDeleted" target="_blank">Docs</a>
     */
    includeDeleted?: number;
    /**
     * Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
     */
    join?: Array<(string)>;
    /**
     * Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>
     */
    limit?: number;
    /**
     * Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a>
     */
    offset?: number;
    /**
     * Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>
     */
    or?: Array<(string)>;
    /**
     * Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>
     */
    page?: number;
    /**
     * Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>
     */
    s?: string;
    /**
     * Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>
     */
    sort?: Array<(string)>;
};

export type GetManyResponse = GetManyMachineEntityResponseDto;

export type ProductsControllerSearchData = {
    query: string;
};

export type ProductsControllerSearchResponse = Array<ProductEntity>;

export type UpdateOneData = {
    id: string;
    requestBody: UpdateProductDto;
};

export type UpdateOneResponse = SerializedProductDto;

export type DeleteOneData = {
    id: string;
};

export type DeleteOneResponse = unknown;

export type CreateOneData = {
    requestBody: CreateProductDto;
};

export type CreateOneResponse = SerializedProductDto;

export type CreateManyData = {
    requestBody: CreateManyProductEntityDto;
};

export type CreateManyResponse = Array<SerializedProductDto>;

export type RecoverOneData = {
    id: string;
};

export type RecoverOneResponse = unknown;

export type FilesControllerUploadFilesResponse = unknown;

export type $OpenApiTs = {
    '/auth/login': {
        post: {
            req: AuthControllerLoginData;
            res: {
                201: unknown;
            };
        };
    };
    '/auth/me': {
        get: {
            res: {
                200: SerializedUserDto;
            };
        };
    };
    '/auth/refresh': {
        post: {
            req: RefreshTokenData;
            res: {
                /**
                 * Refresh token
                 */
                200: {
                    accessToken?: string;
                    refreshToken?: string;
                };
                /**
                 * Invalid refresh token
                 */
                404: unknown;
            };
        };
    };
    '/machines/fill/{machineId}': {
        post: {
            req: FillData;
            res: {
                201: unknown;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/machines/{id}': {
        get: {
            req: GetOneData;
            res: {
                /**
                 * Get one base response
                 */
                200: MachineEntity;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/machines': {
        get: {
            req: GetManyData;
            res: {
                /**
                 * Get paginated response
                 */
                200: GetManyMachineEntityResponseDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/products/search': {
        get: {
            req: ProductsControllerSearchData;
            res: {
                /**
                 * Search products
                 */
                200: Array<ProductEntity>;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/products/{id}': {
        get: {
            req: GetOneData;
            res: {
                /**
                 * Get one base response
                 */
                200: SerializedProductDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        patch: {
            req: UpdateOneData;
            res: {
                /**
                 * Response
                 */
                200: SerializedProductDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        delete: {
            req: DeleteOneData;
            res: {
                /**
                 * Delete one base response
                 */
                200: unknown;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/products': {
        get: {
            req: GetManyData;
            res: {
                /**
                 * Get paginated response
                 */
                200: GetManyProductEntityResponseDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        post: {
            req: CreateOneData;
            res: {
                /**
                 * Get create one base response
                 */
                201: SerializedProductDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/products/bulk': {
        post: {
            req: CreateManyData;
            res: {
                /**
                 * Get create many base response
                 */
                201: Array<SerializedProductDto>;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/products/{id}/recover': {
        patch: {
            req: RecoverOneData;
            res: {
                /**
                 * Recover one base response
                 */
                200: unknown;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/users/{id}': {
        get: {
            req: GetOneData;
            res: {
                /**
                 * Get one base response
                 */
                200: SerializedUserDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        patch: {
            req: UpdateOneData;
            res: {
                /**
                 * Response
                 */
                200: UserEntity;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        delete: {
            req: DeleteOneData;
            res: {
                /**
                 * Delete one base response
                 */
                200: unknown;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/users': {
        get: {
            req: GetManyData;
            res: {
                /**
                 * Get paginated response
                 */
                200: SerializedUserDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        post: {
            req: CreateOneData;
            res: {
                /**
                 * Get create one base response
                 */
                201: SerializedUserDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/users/bulk': {
        post: {
            req: CreateManyData;
            res: {
                /**
                 * Get create many base response
                 */
                201: Array<SerializedUserDto>;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/users/{id}/recover': {
        patch: {
            req: RecoverOneData;
            res: {
                /**
                 * Recover one base response
                 */
                200: unknown;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/requests/{id}': {
        get: {
            req: GetOneData;
            res: {
                /**
                 * Get one base response
                 */
                200: FillRequestEntity;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        patch: {
            req: UpdateOneData;
            res: {
                /**
                 * Response
                 */
                200: FillRequestEntity;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        delete: {
            req: DeleteOneData;
            res: {
                /**
                 * Delete one base response
                 */
                200: unknown;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/requests': {
        get: {
            req: GetManyData;
            res: {
                /**
                 * Get paginated response
                 */
                200: GetManyFillRequestEntityResponseDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        post: {
            req: CreateOneData;
            res: {
                /**
                 * Get create one base response
                 */
                201: FillRequestEntity;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/requests/bulk': {
        post: {
            req: CreateManyData;
            res: {
                /**
                 * Get create many base response
                 */
                201: Array<FillRequestEntity>;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/requests/{id}/recover': {
        patch: {
            req: RecoverOneData;
            res: {
                /**
                 * Recover one base response
                 */
                200: unknown;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/contracts/{id}': {
        get: {
            req: GetOneData;
            res: {
                /**
                 * Get one base response
                 */
                200: SerializedContractDto;
            };
        };
        patch: {
            req: UpdateOneData;
            res: {
                /**
                 * Response
                 */
                200: ContractEntity;
            };
        };
        delete: {
            req: DeleteOneData;
            res: {
                /**
                 * Delete one base response
                 */
                200: unknown;
            };
        };
    };
    '/contracts': {
        get: {
            req: GetManyData;
            res: {
                /**
                 * Get paginated response
                 */
                200: GetManyContractEntityResponseDto;
            };
        };
        post: {
            req: CreateOneData;
            res: {
                /**
                 * Get create one base response
                 */
                201: SerializedContractDto;
            };
        };
    };
    '/categories/{id}': {
        get: {
            req: GetOneData;
            res: {
                /**
                 * Get one base response
                 */
                200: SerializedCategoryDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        patch: {
            req: UpdateOneData;
            res: {
                /**
                 * Response
                 */
                200: SerializedCategoryDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        delete: {
            req: DeleteOneData;
            res: {
                /**
                 * Delete one base response
                 */
                200: unknown;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/categories': {
        get: {
            req: GetManyData;
            res: {
                /**
                 * Get paginated response
                 */
                200: GetManyCategoryEntityResponseDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        post: {
            req: CreateOneData;
            res: {
                /**
                 * Get create one base response
                 */
                201: SerializedCategoryDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/categories/bulk': {
        post: {
            req: CreateManyData;
            res: {
                /**
                 * Get create many base response
                 */
                201: Array<SerializedCategoryDto>;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/categories/{id}/recover': {
        patch: {
            req: RecoverOneData;
            res: {
                /**
                 * Recover one base response
                 */
                200: unknown;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/brands/{id}': {
        get: {
            req: GetOneData;
            res: {
                /**
                 * Get one base response
                 */
                200: SerializedBrandDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        patch: {
            req: UpdateOneData;
            res: {
                /**
                 * Response
                 */
                200: SerializedBrandDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        delete: {
            req: DeleteOneData;
            res: {
                /**
                 * Delete one base response
                 */
                200: unknown;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/brands': {
        get: {
            req: GetManyData;
            res: {
                /**
                 * Get paginated response
                 */
                200: GetManyBrandEntityResponseDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
        post: {
            req: CreateOneData;
            res: {
                /**
                 * Get create one base response
                 */
                201: SerializedBrandDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/brands/bulk': {
        post: {
            req: CreateManyData;
            res: {
                /**
                 * Get create many base response
                 */
                201: Array<SerializedBrandDto>;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/brands/{id}/recover': {
        patch: {
            req: RecoverOneData;
            res: {
                /**
                 * Recover one base response
                 */
                200: unknown;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/orders/{id}': {
        get: {
            req: GetOneData;
            res: {
                /**
                 * Get one base response
                 */
                200: OrderEntity;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/orders': {
        get: {
            req: GetManyData;
            res: {
                /**
                 * Get paginated response
                 */
                200: GetManyOrderEntityResponseDto;
                /**
                 * Forbidden.
                 */
                403: unknown;
            };
        };
    };
    '/files/upload': {
        post: {
            res: {
                201: unknown;
            };
        };
    };
};