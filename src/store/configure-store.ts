import rootReducer from './reducers';
import { routerMiddleware } from 'connected-react-router';
import history from '../navigation/history';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(routerMiddleware(history));
    },
    devTools: process.env.NODE_ENV === 'development',
});

export type StoreState = ReturnType<typeof store.getState>;
export type ReducerState = {
    loading: 'loading' | 'loaded' | 'none';
    requestId: string | null;
    error: string;
};
export type AppDispatch = typeof store.dispatch;

export type ThunkConfig = {
    state: StoreState;
    rejectValue: any; // TODO: think about type here
};
