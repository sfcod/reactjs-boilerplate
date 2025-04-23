import { useQuery } from '@tanstack/react-query';
import { extractData } from 'src/helpers/axios';
import { EnumApi } from 'src/services/end-points';

export const enumsQueryKeys = {
    list: () => ['users'] as const,
};

type Enums = 'UserRole' | 'UserGender';
type Result = Record<Enums, Array<{ name: string; value: string | number }>>;

export function useEnums(): ReturnType<typeof useQuery<Result, void>>;
export function useEnums<K extends Enums>(type: K): ReturnType<typeof useQuery<Result[K], void>>;
export function useEnums<K extends Enums>(type?: K): ReturnType<typeof useQuery<Result[K] | Result, void>> {
    return useQuery({
        queryKey: enumsQueryKeys.list(),
        queryFn: () => extractData<Record<Enums, Array<{ name: string; value: string | number }>>>(EnumApi.list()),
        select: (data) => (type ? (data[type] as Result[K]) : (data as Result)),
    });
}
