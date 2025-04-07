import type { AxiosResponse } from 'axios';

// TODO: validate
export interface ResourceCallbacks<T = any> {
    success?: (value?: T | PromiseLike<T>) => void;
    failure?: (response?: AxiosResponse) => void;
}
