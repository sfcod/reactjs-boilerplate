import { combineReducers } from 'redux';
import app from './app-reducer';
import { api } from 'src/store/api';

export default combineReducers({
    app,
    [api.reducerPath]: api.reducer,
});
