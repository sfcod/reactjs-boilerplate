import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'src/store/configure-store';
import { Paginated, PaginationService } from 'src/services/api-handlers/pagination';
import { QueryParams } from 'src/types/grid';
import SortingService from '../../services/sorting';
import { User } from 'src/types/user';
import { UserApi } from 'src/services/end-points';

export const listUsers = createAsyncThunk<Paginated<User>, QueryParams, ThunkConfig>(
    'user/list',
    async (payload, thunkAPI) => {
        const { getState } = thunkAPI;
        const { user } = getState();
        const { filters, sorting, ...rest } = payload;
        console.log({
            ...filters,
            ...SortingService.makeOrder(sorting),
            ...rest,
        });
        return PaginationService.resolveApiCall(
            thunkAPI,
            user,
            async () =>
                UserApi.list({
                    ...filters,
                    ...SortingService.makeOrder(sorting),
                    ...rest,
                }),
            payload.page,
            user.data,
        );
    },
);
