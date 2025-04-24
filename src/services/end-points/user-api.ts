import { EndPointService } from 'src/services/axios';
import type { User } from '../../types/user';
import type { AxiosPromise } from 'axios';

const ROUTE = 'users';

function list(params: any): AxiosPromise<User[]> {
    return EndPointService.get(`/${ROUTE}`, params);
}

function get(id: string): AxiosPromise<User> {
    return EndPointService.get(`/${ROUTE}/${id}`);
}

function update(id: string, data: any): AxiosPromise<User> {
    return EndPointService.patch(`/${ROUTE}/${id}`, data);
}

export default {
    list,
    get,
    update,
};
