import { Actions } from 'src/store/actions/auth-actions';

export interface AuthState {
    // inProgress: boolean;
    // authorized: boolean;
    // error: { [key: string]: any };
}

const initialState = {
    // inProgress: false,
    // authorized: false,
    // error: {},
};

export function auth(state: AuthState = initialState, action: Actions | any): AuthState {
    switch (action.type) {
        // case requestType(AuthActions.AUTH_LOGIN_STAFF):
        //     return { ...state, inProgress: true };
        // case successType(AuthActions.AUTH_LOGIN_STAFF):
        //     return { ...state, inProgress: false };
        // case failureType(AuthActions.AUTH_LOGIN_STAFF):
        //     return { ...state, inProgress: false, error: action.error };
        default:
            return state;
    }
}
