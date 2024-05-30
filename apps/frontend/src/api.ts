import { VNDClient } from '@frontend/api-sdk';
import { type AxiosRequestConfig } from 'axios';
import { useUser } from '@/stores/user';

const user = useUser();
// eslint-disable-next-line no-unused-vars
type Middleware<T> = (value: T) => Promise<T> | T;
export const vndClient = new VNDClient({
    // TODO: fix env not working
    // BASE: import.meta.env.VITE_APP_BASE_URL,
    BASE: 'http://localhost:3000',
    HEADERS: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
    },
});

const attachHeaders: Middleware<AxiosRequestConfig<unknown>> = async (request) => {
    return {
        ...request,
        headers: {
            ...request.headers,
            Authorization: `Bearer ${user.token}`,
        },
    };
};
vndClient.request.config.interceptors.request.use(attachHeaders);
