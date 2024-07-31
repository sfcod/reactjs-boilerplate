import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routesList } from './navigation';
import { Provider } from 'react-redux';
import { store } from './store/configure-store';
import NoMatch from 'src/screens/NoMatch';
import { ToastContainer } from 'react-toastify';
import { appMount } from 'src/store/reducers/app-reducer';

function App(): React.ReactElement {
    useEffect(() => {
        store.dispatch(appMount());
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    {routesList.map((route, i) => React.cloneElement(route, { key: i }))}
                    <Route path={'*'} element={<NoMatch />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </Provider>
    );
}

export default App;
