import { createSlice } from '@reduxjs/toolkit';
import { login, logout, resetPasswordRequest, validateRecoveryCode } from 'src/store/thunks/auth-thunks';
import { ReducerState } from 'src/store/configure-store';
import { takeOne } from 'src/helpers/store';

export interface AuthState extends ReducerState {
    // inProgress: boolean;
    // authorized: boolean;
    // error: { [key: string]: any };
}

const initialState: AuthState = {
    error: '',
    loading: 'none',
    requestIds: [],
    // inProgress: false,
    // authorized: false,
    // error: {},
};

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, takeOne.pendingActionCase)
            .addCase(login.fulfilled, takeOne.fulfilledActionCase)
            .addCase(login.rejected, takeOne.rejectedActionCase)
            .addCase(logout.pending, takeOne.pendingActionCase)
            .addCase(logout.fulfilled, takeOne.fulfilledActionCase)
            .addCase(logout.rejected, takeOne.rejectedActionCase)
            .addCase(resetPasswordRequest.pending, takeOne.pendingActionCase)
            .addCase(resetPasswordRequest.fulfilled, takeOne.fulfilledActionCase)
            .addCase(resetPasswordRequest.rejected, takeOne.rejectedActionCase)
            .addCase(validateRecoveryCode.pending, takeOne.pendingActionCase)
            .addCase(validateRecoveryCode.fulfilled, takeOne.fulfilledActionCase)
            .addCase(validateRecoveryCode.rejected, takeOne.rejectedActionCase);
    },
});

export const {} = slice.actions;

export default slice.reducer;
