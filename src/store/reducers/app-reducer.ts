import { Actions } from 'src/store/actions/app-actions';

export interface BaseConfig {}

export interface AppState {
    baseConfig: BaseConfig;
}

// Define initial state
const initialState = {
    baseConfig: {},
};

export function app(state: AppState = initialState, action: Actions | any): AppState {
    switch (action.type) {
        default:
            return state;
    }
}
