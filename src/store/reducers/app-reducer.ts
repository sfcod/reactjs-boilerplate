import { createSlice } from '@reduxjs/toolkit';

export interface BaseConfig {}

export interface AppState {
    baseConfig: BaseConfig;
}

// Define initial state
const initialState: AppState = {
    baseConfig: {},
};

export const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        appMount: () => {
            console.log('App mounted');
        },
        appRedirectToDefault: () => {
            console.log('User logged');
        },
    },
});

export const { appMount, appRedirectToDefault } = slice.actions;

export default slice.reducer;
