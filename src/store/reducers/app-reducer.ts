import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        appMount: (state) => {
            console.log('App mounted');
        },
        appRedirectToDefault: (state) => {
            console.log('User logged');
        },
    },
});

export const { appMount, appRedirectToDefault } = slice.actions;

export default slice.reducer;
