/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PickTypeClass } from './PickTypeClass';
export type CreateBrandDto = {
    /**
     * Name of the product in multiple languages
     */
    name: Record<string, any>;
    /**
     * Email of the owner
     */
    referTo: string;
    suppliers: Array<PickTypeClass>;
    /**
     * Brand picture
     */
    picture: string;
    products: Array<PickTypeClass>;
    categories: Array<PickTypeClass>;
    /**
     * Brand logo
     */
    logo: string;
};

