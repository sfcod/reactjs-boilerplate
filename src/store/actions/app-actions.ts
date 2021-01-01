import { AppActions } from 'src/store/constants';

export interface AppMountAction {
    type: string;
    payload: AnyObject;
}

export function appMount(): AppMountAction {
    return {
        type: AppActions.APP_MOUNT,
        payload: {},
    };
}

export interface AppRedirectToDefaultAction {
    type: typeof AppActions.APP_REDIRECT;
    payload: AnyObject;
}

export function appRedirectToDefault(): AppRedirectToDefaultAction {
    return {
        type: AppActions.APP_REDIRECT,
        payload: {},
    };
}

export type Actions = AppMountAction | AppRedirectToDefaultAction;
