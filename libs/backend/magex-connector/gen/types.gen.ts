// This file is auto-generated by @hey-api/openapi-ts

import { LoginResponse } from '../types/user-login';
import { CreateUserBody } from '../types/create-user';

export type $OpenApiTs = {
  '/users/login': {
    post: {
      req: {
        formData?: {
          email?: string;
          password?: string;
        };
      };
      res: {
        /**
         * OK
         */
        200: LoginResponse;
      };
    };
  };
  '/groupsAndMachines/{accountName}': {
    get: {
      req: {
        accountName: string;
        authToken?: string;
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/machines/edit/657ab833c7201f469894300d': {
    post: {
      req: {
        authToken?: string;
        formData?: {
          description?: string;
          tax?: number;
          name?: number;
        };
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/public/machines/{serial}': {
    get: {
      req: {
        authToken?: string;
        serial: number;
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/products/{accountName}': {
    get: {
      req: {
        accountName: string;
        authToken?: string;
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/product/{_id}': {
    get: {
      req: {
        authToken?: string;
        id: string;
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/products/edit/660da97f7ac1611998463602': {
    put: {
      req: {
        authToken?: string;
        formData?: {
          name?: string;
          description?: string;
          detail?: string;
          ingredients?: string;
          allergens?: string;
          referTo?: string;
          auto?: boolean;
          upc?: number;
          barcode?: string;
          price?: number;
          pricePerKilo?: boolean;
          category?: string;
          brand?: string;
          pp?: string;
          length?: number;
          width?: number;
          height?: number;
          preImage1?: string;
          ageControl?: number;
          vatIndex?: number;
          virtualProduct?: number;
          sortIndex?: number;
        };
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/products/create': {
    post: {
      req: {
        authToken?: string;
        formData?: {
          name?: string;
          description?: string;
          referTo?: string;
          auto?: boolean;
          upc?: number;
          barcode?: number;
          price?: number;
          costPrice?: number;
          pricePerKilo?: boolean;
          ingredients?: string;
          allergens?: string;
          detail?: string;
          category?: string;
          brand?: string;
          pp?: string;
          length?: number;
          width?: number;
          height?: number;
          ageControl?: number;
          vatIndex?: number;
          virtualProduct?: number;
          sortIndex?: number;
          image1?: Blob | File;
        };
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/products/delete/{_id}': {
    delete: {
      req: {
        authToken?: string;
        id: string;
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/categories/{accountName}': {
    get: {
      req: {
        accountName: string;
        authToken?: string;
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/categories/edit/{_id}': {
    put: {
      req: {
        authToken?: string;
        formData?: {
          name?: string;
          referTo?: string;
          auto?: string;
          sortIndex?: number;
        };
        id: string;
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/categories/create': {
    post: {
      req: {
        authToken?: string;
        formData?: {
          name?: string;
          referTo?: string;
          auto?: boolean;
          sortIndex?: number;
          categoryPicture?: Blob | File;
        };
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/groupsAndMachinesForReport/{accountEmail}': {
    get: {
      req: {
        accountEmail: string;
        authToken?: string;
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/orders': {
    post: {
      req: {
        authToken?: string;
        formData?: {
          start?: string;
          end?: string;
          id?: string;
          /**
           * Comma separated Machine IDs
           */
          ids?: string;
        };
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/users/getAllEmployees': {
    post: {
      req: {
        authToken?: string;
        formData?: {
          id?: string;
        };
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/users/create': {
    post: {
      req: {
        authToken?: string;
        requestBody: CreateUserBody;
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/stockLog/{machine_id}/{from_date}/{to_date}': {
    get: {
      req: {
        authToken?: string;
        fromDate: string;
        machineId: string;
        toDate: string;
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/brands/{accountName}': {
    get: {
      req: {
        accountName: string;
        authToken?: string;
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/brands/edit/{_id}': {
    post: {
      req: {
        authToken?: string;
        formData?: {
          name?: string;
          referTo?: string;
        };
        /**
         * Brand ID
         */
        id: string;
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
  '/brands/create': {
    post: {
      req: {
        authToken?: string;
        formData?: {
          name?: string;
          referTo?: string;
          picture?: Blob | File;
        };
      };
      res: {
        /**
         * Successful response
         */
        200: unknown;
      };
    };
  };
};
