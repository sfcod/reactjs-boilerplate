import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { createContext } from 'react';
import React from 'react';
import UserAuthService from 'src/services/user-auth';
import type { User } from 'src/types/user';
import { useUser } from 'src/react-query/user';

interface Props {}

type Data = {
    user: User | null;
    loading: boolean;
    login: (...args: Parameters<typeof UserAuthService.login>) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<Data>({
    user: null,
    loading: true,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

const AuthProvider: React.FC<PropsWithChildren<Props>> = ({ children }) => {
    const [id, setId] = useState(UserAuthService.getId());
    const { data = null, isLoading, error } = useUser(id as string);

    const login: Data['login'] = async (token: string, refreshToken: string | null, remember?: boolean) => {
        await UserAuthService.login(token, refreshToken, remember || false);
        setId(UserAuthService.getId());
    };

    const logout: Data['logout'] = async () => {
        await UserAuthService.logout();
        setId(null);
    };

    const contextValue: Data = useMemo(() => {
        return { user: data, loading: isLoading, login, logout };
    }, [data, isLoading]);

    useEffect(() => {
        if (error) {
            logout();
        }
    }, [error]);

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
