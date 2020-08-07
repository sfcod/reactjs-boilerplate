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

export type Actions = AppMountAction;
