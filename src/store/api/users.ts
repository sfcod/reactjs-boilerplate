import { api } from './';
import { createTagProvider, paginatedTransformer, prepareQueryParams } from 'src/helpers/store';
import type { Paginated } from 'src/services/api-handlers/pagination';
import type { User } from 'src/types/user';
import type { SortDirection } from 'src/types/grid';

export type ListUsersParams = {
    page?: number;
    limit?: number;
    filters?: Record<string, any>;
    sorting?: Record<string, SortDirection>;
};

export const usersApi = api.enhanceEndpoints({ addTagTypes: ['Users', 'User'] }).injectEndpoints({
    endpoints: (builder) => ({
        listUsers: builder.query<Paginated<User>, ListUsersParams | void>({
            query: (params) => ({
                url: `/user/list`,
                params: prepareQueryParams(params),
            }),
            providesTags: createTagProvider('Users'),
            transformResponse: paginatedTransformer,
        }),
    }),
    overrideExisting: false,
});

export const { useListUsersQuery } = usersApi;
