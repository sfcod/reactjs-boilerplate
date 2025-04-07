import { Route } from 'react-router';
import Authenticated from 'src/components/auth/Authenticated';
import Restricted from 'src/components/auth/Restricted';
import userRole from 'src/enumerables/user-role';
import routes from '../routes';
import UserListScreen from 'src/screens/User/screens/List';
import UserViewScreen from 'src/screens/User/screens/View/ViewScreen';
import UserEditScreen from 'src/screens/User/screens/Edit/EditScreen';
import UserCreateScreen from 'src/screens/User/screens/Create/CreateScreen';
const userRoutes = [
    <Route
        key={routes.USER_LIST}
        path={routes.USER_LIST}
        element={
            <Authenticated>
                <Restricted authParams={[{ action: userRole.ROLE_SYSTEM_ADMIN }]}>
                    <UserListScreen />
                </Restricted>
            </Authenticated>
        }
    />,
    <Route
        key={routes.USER_VIEW}
        path={routes.USER_VIEW}
        element={
            <Authenticated>
                <UserViewScreen />
            </Authenticated>
        }
    />,
    <Route
        key={routes.USER_EDIT}
        path={routes.USER_EDIT}
        element={
            <Authenticated>
                <UserEditScreen />
            </Authenticated>
        }
    />,
    <Route
        key={routes.USER_CREATE}
        path={routes.USER_CREATE}
        element={
            <Authenticated>
                <UserCreateScreen />
            </Authenticated>
        }
    />,
];

export default userRoutes;
