import { combineReducers } from 'redux';
import app from './app-reducer';
import auth from './auth-reducer';
import user from './user-reducer';

export default combineReducers({
    app,
    auth,
    user,
});
