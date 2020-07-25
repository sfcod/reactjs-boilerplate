import { useEffect, useState } from 'react';
import UserAuthService from '../services/user-auth';

interface AuthState {
    loading: boolean;
    authenticated: boolean;
}

export const useAuthState = (): AuthState => {
    const [state, setState] = useState<AuthState>({
        loading: true,
        authenticated: false,
    });

    useEffect(() => {
        setState({
            loading: false,
            authenticated: UserAuthService.isLoggedIn(),
        });
    }, [setState]);

    return state;
};
