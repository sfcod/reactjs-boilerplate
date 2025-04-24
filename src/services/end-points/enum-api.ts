import { EndPointService } from 'src/services/axios';

const ROUTE = 'enums';

function list() {
    return EndPointService.get(`/${ROUTE}`);
}

export default {
    list,
};
