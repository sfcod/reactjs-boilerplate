import { Route } from 'react-router';
import Authenticated from 'src/components/auth/Authenticated';
import Restricted from 'src/components/auth/Restricted';
import userRole from 'src/enumerables/user-role';
import routes from '../routes';
import UserListScreen from 'src/screens/User/screens/List';

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
];

export default userRoutes;
