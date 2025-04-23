import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthProvider';

export const useAuth = () => {
    return useContext(AuthContext);
};
