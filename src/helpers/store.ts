import {
    AsyncThunkFulfilledActionCreator,
    AsyncThunkPendingActionCreator,
    AsyncThunkRejectedActionCreator,
} from '@reduxjs/toolkit/dist/createAsyncThunk';
import { ReducerState, ThunkConfig } from 'src/store/configure-store';
import { Paginated } from 'src/services/api-handlers/pagination';
import { PayloadAction } from '@reduxjs/toolkit';

const onePendingActionCase = <
    S extends ReducerState,
    A extends ReturnType<AsyncThunkPendingActionCreator<any, ThunkConfig>>,
>(
    state: S,
    action: A,
    callback?: (state: S, action: A) => void,
) => {
    if (state.loading !== 'loading') {
        // remove all other request ids from state
        state.requestIds = [action.meta.requestId];
        state.loading = 'loading';
        state.error = '';
        callback && callback(state, action);
    }
};

const everyPendingActionCase = <
    S extends ReducerState,
    A extends ReturnType<AsyncThunkPendingActionCreator<any, ThunkConfig>>,
>(
    state: S,
    action: A,
    callback?: (state: S, action: A) => void,
) => {
    // remove all other request ids from state
    state.requestIds.push(action.meta.requestId);
    if (state.loading !== 'loading') {
        state.loading = 'loading';
        state.error = '';
        callback && callback(state, action);
    }
};

const fulfilledActionCase = <
    S extends ReducerState,
    A extends ReturnType<AsyncThunkFulfilledActionCreator<any, any, ThunkConfig>>,
>(
    state: S,
    action: A,
    callback?: (state: S, action: A) => void,
) => {
    if (state.loading === 'loading' && state.requestIds.includes(action.meta.requestId)) {
        state.loading = state.requestIds.length > 1 ? state.loading : 'loaded';
        callback && callback(state, action);
    }

    state.requestIds = state.requestIds.filter((rid) => rid !== action.meta.requestId);
};

const rejectedActionCase = <
    S extends ReducerState,
    A extends ReturnType<AsyncThunkRejectedActionCreator<any, ThunkConfig>>,
>(
    state: S,
    action: A,
    callback?: (state: S, action: A) => void,
) => {
    if (state.loading === 'loading' && state.requestIds.includes(action.meta.requestId)) {
        state.error = action.payload?.message || '';
        state.loading = state.requestIds.length > 1 ? state.loading : 'loaded';
        callback && callback(state, action);
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

const afterList = <
    Entity extends { id: string },
    Store extends { data: Paginated<Entity> },
    Action extends PayloadAction<Paginated<Entity>>,
>(
    store: Store,
    action: Action,
) => {
    store.data = action.payload;
};

const afterGet = <
    Entity extends { id: string } | null,
    Store extends { current: Entity },
    Action extends PayloadAction<Entity>,
>(
    store: Store,
    action: Action,
) => {
    store.current = action.payload;
};

const afterCreate = <
    Entity extends { id: string },
    Store extends { current: Entity | null },
    Action extends PayloadAction<Entity>,
>(
    store: Store,
    action: Action,
) => {
    store.current = action.payload;
};

const afterUpdate = <
    Entity extends { id: string },
    Store extends { current?: Entity | null; data?: Paginated<Entity> },
    Action extends PayloadAction<Entity>,
>(
    store: Store,
    action: Action,
) => {
    const entity = action.payload;
    if (store.current && store.current.id === entity.id) {
        store.current = entity;
    }
    const index = store.data?.list.findIndex(({ id }) => id === entity.id);
    if (store.data && index !== -1) {
        store.data.list[index as number] = entity;
    }
};

const afterDelete = <
    Store extends { current?: any | null; data?: Paginated<any> },
    Action extends PayloadAction<any, any, { arg: string }>,
>(
    store: Store,
    action: Action,
) => {
    const deletedId = action.meta.arg;
    if (store.current && store.current.id === deletedId) {
        store.current = null;
    }
    const filtered = store.data?.list.filter(({ id }) => id !== deletedId);

    if (store.data && filtered && store.data.list.length > filtered.length) {
        store.data.list = filtered;
        store.data.totalCount = (store.data.totalCount as number) - 1;
    }
};

export const crudHelpers = {
    afterList,
    afterGet,
    afterCreate,
    afterUpdate,
    afterDelete,
};
