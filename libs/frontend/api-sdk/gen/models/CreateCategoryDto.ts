/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from './File';
export type CreateCategoryDto = {
    /**
     * Name of the Category in multiple languages
     */
    name: Record<string, any>;
    auto: boolean;
    /**
     * Category picture
     */
    categoryPicture: File;
    /**
     * Email of the owner
     */
    referTo: string;
    /**
     * Sort index
     */
    sortIndex: number;
};

