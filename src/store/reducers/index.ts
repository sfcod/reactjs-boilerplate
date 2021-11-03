import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../../navigation/history';
import app from './app-reducer';
import auth from './auth-reducer';

export default combineReducers({
    app,
    auth,
    router: connectRouter(history),
});
