import { combineReducers } from 'redux';
import { app, AppState } from 'src/store/reducers/app-reducer';
import { AppActions } from 'src/store/constants';
import { connectRouter, RouterState } from 'connected-react-router';
import history from '../../navigation/history';
import { auth, AuthState } from './auth-reducer';

export interface StoreState {
    app: AppState;
    auth: AuthState;
    router: RouterState;
}

const appReducer = combineReducers<StoreState>({
    app,
    auth,
    router: connectRouter(history),
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const rootReducer = (state: any, action: any): StoreState => {
    if (action.type === AppActions.APP_RESET) {
        state = undefined;
    }

    return appReducer(state, action);
};
