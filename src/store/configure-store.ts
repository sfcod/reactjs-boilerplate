import rootReducer from './reducers';
import type { createAsyncThunk } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        });
    },
    devTools: process.env.NODE_ENV === 'development',
});

export type StoreState = ReturnType<typeof store.getState>;
export type ReducerState = {
    loading: 'loading' | 'loaded' | 'none';
    requestIds: Record<string, string[]>;
    errors: Record<string, string>;
};
export type AppDispatch = typeof store.dispatch;

export type ThunkConfig = {
    state: StoreState;
    rejectValue: any; // TODO: think about type here
};

type ThunkApiConfig<State, Extra, Dispatch> = {
    state: State;
    dispatch: Dispatch;
    extra: Extra;
};

type CreateThunk<T> = typeof createAsyncThunk<T>;
export type BaseThunkAPI<S, T, D> = Parameters<Parameters<CreateThunk<ThunkApiConfig<S, T, D>>>[1]>[1];
