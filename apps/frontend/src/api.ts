import {VNDClient} from "@frontend/api-sdk";
// import { type AxiosRequestConfig } from 'axios';
// import {useUser} from "@/stores/user"
// const user = useUser();
// // eslint-disable-next-line no-unused-vars
// type Middleware<T> = (value: T) => Promise<T> | T;
export const vndClient = new VNDClient({
    BASE: 'https://vnd-api.5ostudios.com',
    HEADERS:{
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-type': 'application/json',
    },

});
// ----------------- this give core error now
// const attachHeaders: Middleware<AxiosRequestConfig<unknown>> = async (
//     request,
// ) => {
//     return {
//         ...request,
//         headers: {
//             ...request.headers,
//             Authorization: `Bearer ${user.token}`,
//         },
//     };
// };
// vndClient.request.config.interceptors.request.use(attachHeaders);
