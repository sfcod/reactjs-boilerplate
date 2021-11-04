import { createSlice } from '@reduxjs/toolkit';
import { listUsers } from 'src/store/thunks/user-thunks';
import { ReducerState } from 'src/store/configure-store';
import { takeOne } from 'src/helpers/store';
import { Paginated } from 'src/services/api-handlers/pagination';
import { User } from 'src/types/user';

export interface UserState extends ReducerState {
    data: Paginated<User>;
}

const initialState: UserState = {
    error: '',
    loading: 'none',
    requestIds: [],
    data: {
        list: [],
        page: 1,
        meta: {
            updatedAt: null,
        },
    },
};

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listUsers.pending, takeOne.pendingActionCase)
            .addCase(listUsers.fulfilled, (state, action) => {
                takeOne.fulfilledActionCase(state, action);
                state.data = action.payload;
            })
            .addCase(listUsers.rejected, takeOne.rejectedActionCase);
    },
});

export const {} = slice.actions;

export default slice.reducer;
