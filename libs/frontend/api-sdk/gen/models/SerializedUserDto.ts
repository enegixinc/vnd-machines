/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { objectId } from './objectId';
import type { SerializedProductDto } from './SerializedProductDto';
import type { timestamp } from './timestamp';
import type { UserRole } from './UserRole';
export type SerializedUserDto = {
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
    products: Array<SerializedProductDto>;
};

