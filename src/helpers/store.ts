import {
    AsyncThunkFulfilledActionCreator,
    AsyncThunkPendingActionCreator,
    AsyncThunkRejectedActionCreator,
} from '@reduxjs/toolkit/dist/createAsyncThunk';
import { ReducerState, ThunkConfig } from 'src/store/configure-store';

export const pendingActionCase = (
    state: ReducerState,
    action: ReturnType<AsyncThunkPendingActionCreator<any, ThunkConfig>>,
    callback?: () => void,
) => {
    if (state.loading !== 'loading') {
        state.loading = 'loading';
        state.requestId = action.meta.requestId;
        state.error = '';
        callback && callback();
    }
};

export const fulfilledActionCase = (
    state: ReducerState,
    action: ReturnType<AsyncThunkFulfilledActionCreator<any, any, ThunkConfig>>,
    callback?: () => void,
) => {
    if (state.loading === 'loading' && state.requestId === action.meta.requestId) {
        state.loading = 'loaded';
        state.requestId = null;
        callback && callback();
    }
};

export const rejectedActionCase = (
    state: ReducerState,
    action: ReturnType<AsyncThunkRejectedActionCreator<any, ThunkConfig>>,
    callback?: () => void,
) => {
    if (state.loading === 'loading' && state.requestId === action.meta.requestId) {
        state.loading = 'loaded';
        state.error = action.payload?.message || '';
        state.requestId = null;
        callback && callback();
    }
};
