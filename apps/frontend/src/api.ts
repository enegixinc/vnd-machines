import { VNDClient } from '@frontend/api-sdk';
import { type AxiosRequestConfig,type AxiosResponse } from 'axios';
import {useUser} from "@/stores/user"
import Swal from 'sweetalert2';
import {getTranslation} from '@/utils/i18nHelper'
const user = useUser();
// eslint-disable-next-line no-unused-vars
type Middleware<T> = (value: T) => Promise<T> | T;
export const vndClient = new VNDClient({
    BASE: import.meta.env.VITE_APP_BASE_URL,
    HEADERS: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
    },
});
const errorHandler: Middleware<AxiosResponse> = async (response) => {

    if (response.status !== 200 &&  response.status !== 201) {
        Swal.fire({
            icon: 'error',
            title: getTranslation('errors.ops'),
            text: response.data?.message || getTranslation('errors.errorHappened'),
            padding: '0',
            confirmButtonColor:'primary',
        });
    }

    // if (response.status === 401) await logout();

    return response;
};
const attachHeaders: Middleware<AxiosRequestConfig<unknown>> = async (
    request,
) => {
    return {
        ...request,
        headers: {
            ...request.headers,
            Authorization: `Bearer ${user.token}`,
        },
    };
};

vndClient.request.config.interceptors.request.use(attachHeaders);
vndClient.request.config.interceptors.response.use(errorHandler);

