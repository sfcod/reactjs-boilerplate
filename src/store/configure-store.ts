import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, StoreState } from './reducers';
import rootSaga from './sagas';
import { routerMiddleware } from 'connected-react-router';
import history from '../navigation/history';

export function configureStore(initialState?: Partial<StoreState>) {
    // Create saga middleware
    // const sagaMonitor = Reactotron.createSagaMonitor();
    const sagaMiddleware = createSagaMiddleware();

    const allMiddlewares = [routerMiddleware(history), sagaMiddleware];

    // Define middlewares list depending on environment
    let appliedMiddlewares;

    // tslint:disable-next-line:prefer-conditional-expression
    if (process.env.NODE_ENV === 'development') {
        // Add Redux logger
        // tslint:disable-next-line
        // allMiddlewares.push(logger as any);

        // Wrap all middlewares with Redux dev tools
        appliedMiddlewares = composeWithDevTools(
            applyMiddleware(...allMiddlewares),
            // applyMiddleware(...allMiddlewares),
        );
    } else {
        // Regular store initializing for production
        appliedMiddlewares = applyMiddleware(...allMiddlewares);
    }

    const storeInstance = createStore(rootReducer, initialState as any, appliedMiddlewares);

    // Run all sagas with saga middleware
    rootSaga.forEach((saga) => sagaMiddleware.run(saga));

    return storeInstance;
}

export const store = configureStore();
