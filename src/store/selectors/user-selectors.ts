import type { StoreState } from 'src/store/configure-store';
import type { Paginated } from 'src/services/api-handlers/pagination';
import type { User } from 'src/types/user';

export const usersSelector = (state: StoreState): Paginated<User> => state.user.data;
// export const usersErrorSelector = (state: StoreState): string => state.user.error;
// export const usersLoadedSelector = (state: StoreState): boolean => state.user.loading === 'loaded';
// export const usersLoadingSelector = (state: StoreState): boolean => state.user.loading === 'loading';
