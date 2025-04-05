import { EndPointService } from 'src/services/api-handlers/axios';

const ROUTE = 'users';

function list(params: any) {
    return EndPointService.get(`/${ROUTE}`, params);
}

function deleteUser(id: string) {
    return EndPointService.delete(`/${ROUTE}/${id}`);
}

export default {
    list,
    deleteUser,
};
