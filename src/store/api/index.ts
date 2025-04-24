import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQueryWithRefreshToken } from '../../helpers/store';
import { API_URL } from '../../config/env';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQueryWithRefreshToken({ baseUrl: API_URL }),
    endpoints: () => ({}),
});
