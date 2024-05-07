/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { objectId } from './objectId';
import type { timestamp } from './timestamp';
export type UserEntity = {
    _id: objectId;
    /**
     * Version
     */
    __v: number;
    createdAt: timestamp;
    updatedAt: timestamp;
    deletedAt: timestamp;
    lastSyncAt: timestamp;
};

