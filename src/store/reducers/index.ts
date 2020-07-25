import { combineReducers } from 'redux';
import { app, AppState } from 'src/store/reducers/app-reducer';
import { AppActions } from 'src/store/constants';
import { FormStateMap, reducer as form } from 'redux-form';
import { connectRouter, RouterState } from 'connected-react-router';
import history from '../../navigation/history';
import { auth, AuthState } from './auth-reducer';

export interface StoreState {
    app: AppState;
    auth: AuthState;
    form: FormStateMap;
    router: RouterState;
}

const appReducer = combineReducers<StoreState>({
    app,
    auth,
    form,
    router: connectRouter(history),
});

export const rootReducer = (state: any, action: any): StoreState => {
    if (action.type === AppActions.APP_RESET) {
        state = undefined;
    }

    return appReducer(state, action);
};
