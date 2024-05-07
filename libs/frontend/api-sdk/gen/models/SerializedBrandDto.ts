/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { objectId } from './objectId';
import type { OmitTypeClass } from './OmitTypeClass';
import type { timestamp } from './timestamp';
export type SerializedBrandDto = {
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
     * Name of the product in multiple languages
     */
    name: Record<string, any>;
    /**
     * Email of the owner
     */
    referTo: string;
    categories: Array<OmitTypeClass>;
    products: Array<OmitTypeClass>;
    suppliers: Array<OmitTypeClass>;
    /**
     * Brand logo
     */
    logo: string;
    /**
     * Brand picture
     */
    picture: string;
};

