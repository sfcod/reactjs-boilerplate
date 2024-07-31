import { EndPointService } from 'src/services/api-handlers/axios';

const ROUTE = 'users';

function list(params: any) {
    return EndPointService.get(`/${ROUTE}`, params);
}

export default {
    list,
};
