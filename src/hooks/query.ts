import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export const parseSearchQuery = <T extends Record<any, any>>(search: string): T => {
    return Object.fromEntries(new URLSearchParams(search).entries()) as T;
};

export const useQuery = <T extends Record<any, any> = Record<any, any>>(): T => {
    const { search } = useLocation();

    return useMemo(() => {
        return parseSearchQuery<T>(search);
    }, [search]);
};
