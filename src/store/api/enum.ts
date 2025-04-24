import { createTagProvider } from '../../helpers/store';
import { api } from './';

type Enums = 'UserRole' | 'UserGender';
type Result = Record<Enums, Array<{ name: string; value: string | number }>>;

const enumApi = api.enhanceEndpoints({ addTagTypes: ['Enum'] }).injectEndpoints({
    endpoints: (builder) => ({
        enums: builder.query<Result, void>({
            query: () => `/enums`,
            providesTags: createTagProvider('Enum'),
        }),
    }),
});

export const { useEnumsQuery } = enumApi;
