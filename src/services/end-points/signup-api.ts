import type { AxiosPromise } from 'axios';
import { EndPointService } from 'src/services/api-handlers/axios';

function signup(payload: {
    email: string;
    password: string;
    phoneNumber: string;
    repeatPassword: string;
}): AxiosPromise<any> {
    return EndPointService.post('/auths/signup', payload);
}

export default {
    signup,
};
