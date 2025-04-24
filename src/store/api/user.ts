import type { ListUsersQueryParams, UpdateUserData, UpdateUserResultData, User } from 'src/types/user';
import { createTagProvider, paginatedTransformer } from '../../helpers/store';
import { api } from './';
import type { Paginated } from '../../types/common';
import { prepareQueryParams } from 'src/helpers/store';

const userApi = api.enhanceEndpoints({ addTagTypes: ['User', 'Users'] }).injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<Paginated<User>, ListUsersQueryParams>({
            query: (params) => ({
                url: `/users`,
                params: prepareQueryParams(params),
            }),
            providesTags: createTagProvider('Users', 'User'),
            transformResponse: paginatedTransformer,
        }),

        getUser: builder.query<User, string>({
            query: (id) => `/users/${id}`,
            providesTags: createTagProvider('User'),
        }),

        editUser: builder.mutation<UpdateUserResultData, UpdateUserData & Pick<User, 'id'>>({
            query: ({ id, ...data }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: createTagProvider('User'),
        }),
    }),
});

export const { useGetUserQuery, useGetUsersQuery, useEditUserMutation } = userApi;
