import { EndPointService } from 'src/services/api-handlers/axios';

const ROUTE = 'users';

function list(params: any) {
    return EndPointService.get(`/${ROUTE}`, params);
}

function deleteUser(id: string) {
    return EndPointService.delete(`/${ROUTE}/${id}`);
}

function getUser(id: string) {
    return EndPointService.get(`/${ROUTE}/${id}`);
}

function updateUser(id: string, data: any) {
    return EndPointService.patch(`/${ROUTE}/${id}`, data);
}

function createUser(data: any) {
    return EndPointService.post(`/${ROUTE}`, data);
}

export default {
    list,
    deleteUser,
    getUser,
    updateUser,
    createUser,
};
