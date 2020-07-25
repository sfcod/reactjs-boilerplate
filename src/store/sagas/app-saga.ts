import { takeLatest } from 'redux-saga/effects';
import { AppMountAction } from 'src/store/actions/app-actions';
import { AppActions } from '../constants';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function* handleAppChangeState(action: AppMountAction): Iterable<any> {}

export default function* () {
    // Actions
    yield takeLatest(AppActions.APP_MOUNT, handleAppChangeState);
}
