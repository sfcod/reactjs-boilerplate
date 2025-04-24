import React from 'react';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router';
import routesConfig from './navigation';
import AuthProvider from './contexts/AuthProvider.tsx';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <RouterProvider router={routesConfig} />
                <ToastContainer />
            </AuthProvider>
        </Provider>
    );
}

export default App;
