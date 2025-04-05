import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, listUsers } from 'src/store/thunks/user-thunks';
import type { ReducerState } from 'src/store/configure-store';
import { takeOne } from 'src/helpers/store';
import type { Paginated } from 'src/services/api-handlers/pagination';
import type { User } from 'src/types/user';

export interface UserState extends ReducerState {
    data: Paginated<User>;
}

const initialState: UserState = {
    errors: {},
    loading: 'none',
    requestIds: {},
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
            .addCase(listUsers.rejected, takeOne.rejectedActionCase)

            .addCase(deleteUser.pending, takeOne.pendingActionCase)
            .addCase(deleteUser.fulfilled, takeOne.fulfilledActionCase)
            .addCase(deleteUser.rejected, takeOne.rejectedActionCase);
    },
});

export const {} = slice.actions;

export default slice.reducer;
