import { useMutation, useQuery } from '@tanstack/react-query';
import { UserApi } from 'src/services/end-points';
import { extractData, extractPaginatedData, prepareQueryParams } from 'src/helpers/axios';
import type { ListUsersQueryParams, UpdateProfileData } from 'src/types/user';

/**
 *  Query keys are important for caching and invalidation. It is better to use
 *  such factories to generate query keys to avoid typos and simpler refactoring in the future.
 */
export const usersQueryKeys = {
    all: () => ['users'] as const,
    lists: () => [...usersQueryKeys.all(), 'list'] as const,
    details: () => [...usersQueryKeys.all(), 'detail'] as const,
    detail: (id: string) => [...usersQueryKeys.details(), id] as const,
};

export function useUsers(params: ListUsersQueryParams = {}) {
    return useQuery({
        queryKey: usersQueryKeys.lists(),
        queryFn: () => extractPaginatedData(UserApi.list(prepareQueryParams(params))),
    });
}

export function useUser(id: string) {
    return useQuery({
        queryKey: usersQueryKeys.detail(id),
        queryFn: () => extractData(UserApi.get(id)),
        enabled: !!id, // Only run query if ID exists
    });
}

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: ({ id, ...data }: { id: string } & UpdateProfileData) => extractData(UserApi.update(id, data)),
    });
};
