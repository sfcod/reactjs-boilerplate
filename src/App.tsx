import React from 'react';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router';
import routesConfig from './navigation';
import AuthProvider from './contexts/AuthProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000,
            retry: (count, err) => {
                // Retry on all errors except 401 Unauthorized
                return isAxiosError(err) && err.response?.status === 401 ? false : count < 2;
            },
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={routesConfig} />
                <ToastContainer />
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
