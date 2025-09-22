import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'src/config/env';
import { axiosBaseQueryWithRefreshToken, paramsSerializer } from 'src/helpers/store';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQueryWithRefreshToken({
        baseUrl: API_URL,
        paramsSerializer,
    }),
    refetchOnFocus: true,
    refetchOnMountOrArgChange: 60 * 5,
    endpoints: () => ({}),
});

export default api;
