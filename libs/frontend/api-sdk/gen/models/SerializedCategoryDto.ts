/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { objectId } from './objectId';
import type { OmitTypeClass } from './OmitTypeClass';
import type { timestamp } from './timestamp';
export type SerializedCategoryDto = {
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
     * Name of the Category in multiple languages
     */
    name: Record<string, any>;
    auto: boolean;
    /**
     * Category picture
     */
    categoryPicture: string;
    /**
     * Email of the owner
     */
    referTo: string;
    /**
     * Sort index
     */
    sortIndex: number;
    products: Array<OmitTypeClass>;
    suppliers: Array<OmitTypeClass>;
    brands: Array<OmitTypeClass>;
};

