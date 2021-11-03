import { createSlice } from '@reduxjs/toolkit';
import { login, logout, resetPasswordRequest, validateRecoveryCode } from 'src/store/thunks/auth-thunks';
import { ReducerState } from 'src/store/configure-store';
import { fulfilledActionCase, pendingActionCase, rejectedActionCase } from 'src/helpers/store';

export interface AuthState extends ReducerState {
    // inProgress: boolean;
    // authorized: boolean;
    // error: { [key: string]: any };
}

const initialState: AuthState = {
    error: '',
    loading: 'none',
    requestId: null,
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
            .addCase(login.pending, pendingActionCase)
            .addCase(login.fulfilled, fulfilledActionCase)
            .addCase(login.rejected, rejectedActionCase)
            .addCase(logout.pending, pendingActionCase)
            .addCase(logout.fulfilled, fulfilledActionCase)
            .addCase(logout.rejected, rejectedActionCase)
            .addCase(resetPasswordRequest.pending, pendingActionCase)
            .addCase(resetPasswordRequest.fulfilled, fulfilledActionCase)
            .addCase(resetPasswordRequest.rejected, rejectedActionCase)
            .addCase(validateRecoveryCode.pending, pendingActionCase)
            .addCase(validateRecoveryCode.fulfilled, fulfilledActionCase)
            .addCase(validateRecoveryCode.rejected, rejectedActionCase);
    },
});

export const {} = slice.actions;

export default slice.reducer;
