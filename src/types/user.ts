import type { QueryParams, SortDirection } from './common';

export interface User {
    // id: number;
    // username: string;
    // email: string;
    // roles: string[];
    // createdAt: string;

    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    dob: string;
    phoneNumber: string;
    gender: 'male' | 'female' | 'other';
}

export type UpdateUserData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
};

export type UpdateUserResultData = User;

export type FilterUsersData = Partial<{
    id: string;
    email: string;
    name: string;
    status: number[];
    phoneNumber: string;
}>;

export type ListUsersQueryParams = QueryParams<
    {
        id: string;
        email: string;
        name: string;
        status: number[];
        phoneNumber: string;
    },
    Record<'email' | 'name' | 'createdAt' | 'updatedAt', SortDirection>
>;
