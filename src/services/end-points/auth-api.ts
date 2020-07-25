import { AxiosPromise } from 'axios';
import { EndPointService } from 'src/services/api-handlers/axios';

function login(email: string, password: string): AxiosPromise {
    return EndPointService.post('/login-check', { email, password });
}

export default {
    login,
};
