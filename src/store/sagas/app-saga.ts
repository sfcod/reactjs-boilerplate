import { takeLatest } from 'redux-saga/effects';
import { AppMountAction, AppRedirectToDefaultAction } from 'src/store/actions/app-actions';
import { AppActions } from '../constants';

// eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
function* handleAppChangeState(action: AppMountAction): Iterable<any> {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* handleAppRedirectToDefault(action: AppRedirectToDefaultAction): Iterable<any> {
    // const user: User | any = yield select(userSelector);

    // yield put(push(Router.generate(routes.HOME)));

    yield console.log('User logged');
}

export default function* (): Generator {
    // Actions
    yield takeLatest(AppActions.APP_MOUNT, handleAppChangeState);
    yield takeLatest(AppActions.APP_REDIRECT, handleAppRedirectToDefault);
}
