import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { routesList } from './navigation';
import { Provider } from 'react-redux';
import { store } from './store/configure-store';
import NoMatch from 'src/screens/NoMatch';
import history from './navigation/history';
import { ConnectedRouter } from 'connected-react-router';
import { ToastContainer } from 'react-toastify';
import { appMount } from './store/actions/app-actions';

function App(): React.ReactElement {
    const dispatch = store.dispatch;

    useEffect(() => {
        dispatch(appMount());
    }, []);

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    {routesList.map((route, i) => React.cloneElement(route, { key: i }))}
                    <Route component={NoMatch} />
                </Switch>
            </ConnectedRouter>
            <ToastContainer />
        </Provider>
    );
}

export default App;
