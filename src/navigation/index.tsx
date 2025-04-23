import { createBrowserRouter } from 'react-router';
import Authenticated from 'src/components/auth/Authenticated';
import Unauthenticated from 'src/components/auth/Unauthenticated';
import routes from './routes';

const lazyLoadComponent = (path: string) => async () => {
    const Component = await import(/* @vite-ignore */ path);
    return { Component: Component.default };
};

export default createBrowserRouter([
    {
        path: routes.LOGOUT,
        lazy: lazyLoadComponent('../screens/Auth/screens/Logout'),
    },
    {
        Component: Authenticated,
        children: [
            {
                path: routes.HOME,
                children: [{ index: true, lazy: lazyLoadComponent('../screens/Home') }],
            },
            {
                path: routes.PROFILE,
                children: [{ index: true, lazy: lazyLoadComponent('../screens/Profile') }],
            },
            // {
            //     Component: () => <Authorized role={UserRole.ADMIN} />,
            //     children: [
            //
            //     ]
            // },
        ],
    },
    {
        Component: Unauthenticated,
        children: [
            {
                path: routes.LOGIN,
                lazy: lazyLoadComponent('../screens/Auth/screens/Login'),
            },
            {
                path: routes.SIGNUP,
                lazy: lazyLoadComponent('../screens/Auth/screens/Signup'),
            },
            // {
            //     path: 'about',
            //     lazy: lazyLoadComponent('src/screens/Auth/screens/About'),
            // },
        ],
    },
]);
