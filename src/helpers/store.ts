import {
    AsyncThunkFulfilledActionCreator,
    AsyncThunkPendingActionCreator,
    AsyncThunkRejectedActionCreator,
} from '@reduxjs/toolkit/dist/createAsyncThunk';
import { ReducerState, ThunkConfig } from 'src/store/configure-store';

const onePendingActionCase = (
    state: ReducerState,
    action: ReturnType<AsyncThunkPendingActionCreator<any, ThunkConfig>>,
    callback?: () => void,
) => {
    if (state.loading !== 'loading') {
        // remove all other request ids from state
        state.requestIds = [action.meta.requestId];
        state.loading = 'loading';
        state.error = '';
        callback && callback();
    }
};

const everyPendingActionCase = (
    state: ReducerState,
    action: ReturnType<AsyncThunkPendingActionCreator<any, ThunkConfig>>,
    callback?: () => void,
) => {
    // remove all other request ids from state
    state.requestIds.push(action.meta.requestId);
    if (state.loading !== 'loading') {
        state.loading = 'loading';
        state.error = '';
        callback && callback();
    }
};

const fulfilledActionCase = (
    state: ReducerState,
    action: ReturnType<AsyncThunkFulfilledActionCreator<any, any, ThunkConfig>>,
    callback?: () => void,
) => {
    if (state.loading === 'loading' && state.requestIds.includes(action.meta.requestId)) {
        state.loading = state.requestIds.length > 1 ? state.loading : 'loaded';
        callback && callback();
    }

    state.requestIds = state.requestIds.filter((rid) => rid !== action.meta.requestId);
};

const rejectedActionCase = (
    state: ReducerState,
    action: ReturnType<AsyncThunkRejectedActionCreator<any, ThunkConfig>>,
    callback?: () => void,
) => {
    if (state.loading === 'loading' && state.requestIds.includes(action.meta.requestId)) {
        state.error = action.payload?.message || '';
        state.loading = state.requestIds.length > 1 ? state.loading : 'loaded';
        callback && callback();
    }

    state.requestIds = state.requestIds.filter((rid) => rid !== action.meta.requestId);
};

export const takeOne = {
    pendingActionCase: onePendingActionCase,
    fulfilledActionCase,
    rejectedActionCase,
};

export const takeEvery = {
    pendingActionCase: everyPendingActionCase,
    fulfilledActionCase,
    rejectedActionCase,
};
