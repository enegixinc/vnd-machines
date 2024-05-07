/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRole } from './UserRole';
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
    /**
     * id of the products
     */
    products: Array<string>;
    documents: Array<string>;
    password: string;
};

