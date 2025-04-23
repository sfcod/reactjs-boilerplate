import { EndPointService } from 'src/services/api-handlers/axios';

const ROUTE = 'enums';

function list() {
    return EndPointService.get(`/${ROUTE}`);
}

export default {
    list,
};
