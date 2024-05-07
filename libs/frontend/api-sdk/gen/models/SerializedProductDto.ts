/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { objectId } from './objectId';
import type { OmitTypeClass } from './OmitTypeClass';
import type { timestamp } from './timestamp';
export type SerializedProductDto = {
    _id: objectId;
    /**
     * Version
     */
    __v: number;
    createdAt: timestamp;
    updatedAt: timestamp;
    deletedAt: timestamp;
    lastSyncAt: timestamp;
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
     * Name of the product in multiple languages
     */
    name: Record<string, any>;
    /**
     * Barcode of the product
     */
    barcode: string;
    /**
     * Cost price of the product
     */
    costPrice: number;
    /**
     * Description of the product in multiple languages
     */
    description: Record<string, any>;
    /**
     * Description of the product in multiple languages
     */
    detail: Record<string, any>;
    /**
     * Description of the product in multiple languages
     */
    include: Record<string, any>;
    /**
     * Description of the product in multiple languages
     */
    ingredients: Record<string, any>;
    /**
     * Description of the product in multiple languages
     */
    keyFeatures: Record<string, any>;
    /**
     * Description of the product in multiple languages
     */
    specification: Record<string, any>;
    /**
     * Dimensions of the product
     */
    dimension: Record<string, any>;
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
    productPictures: Array<string>;
    /**
     * Reference to another product
     */
    referTo: string;
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
    category: Array<OmitTypeClass>;
    brand: Array<OmitTypeClass>;
    suppliers: Array<OmitTypeClass>;
    /**
     * Video of the product
     */
    productVideo: string;
};

