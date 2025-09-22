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
                url: `/users`,
                params: prepareQueryParams(params),
            }),
            providesTags: createTagProvider('Users'),
            transformResponse: paginatedTransformer,
        }),

        getUser: builder.query<User, string>({
            query: (id) => ({ url: `/users/${id}` }),
            providesTags: (_result, _err, id) => [{ type: 'User', id }],
        }),

        createUser: builder.mutation<User, Partial<User>>({
            query: (data) => ({ url: `/users`, method: 'POST', body: data }),
            invalidatesTags: createTagProvider('Users'),
        }),

        updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
            query: ({ id, data }) => ({ url: `/users/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: (_result, _err, arg) => [{ type: 'User', id: arg.id }, 'Users'],
        }),

        deleteUser: builder.mutation<void, string>({
            query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
            invalidatesTags: (_result, _err, id) => [{ type: 'User', id }, 'Users'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useListUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApi;
