import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { API_URL } from '../../config/env';
import UserAuthService from '../user-auth';

// Set default params and headers for axios
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.common.Accept = 'application/json';

class Axios {
    // private authorizationToken = '';
    //
    // // Set authorization token
    // public setAuthorizationToken(token: string): void {
    //     this.authorizationToken = token;
    // }
    //
    // // Drop authorization token
    // public dropAuthorizationToken(): void {
    //     this.authorizationToken = '';
    // }

    public get(endPoint: string, config: AnyObject = {}): AxiosPromise {
        return axios.get(endPoint, this.addHeaders(config));
    }

    public post(endPoint: string, params: AnyObject = {}, config: AnyObject = {}): AxiosPromise {
        return axios.post(endPoint, params, this.addHeaders(config));
    }

    public put(endPoint: string, params: AnyObject = {}, config: AnyObject = {}): AxiosPromise {
        return axios.put(endPoint, params, this.addHeaders(config));
    }

    public patch(endPoint: string, params: AnyObject = {}, config: AnyObject = {}): AxiosPromise {
        return axios.patch(endPoint, params, this.addHeaders(config));
    }

    public delete(endPoint: string, config: AnyObject = {}): AxiosPromise {
        return axios.delete(endPoint, this.addHeaders(config));
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public delay(time: number, args?: any): AxiosPromise {
        return new Promise((resolve) => {
            setTimeout(resolve.bind(null, args), time);
        });
    }

    public axios(config: AxiosRequestConfig): AxiosPromise {
        const resultConfig = this.addHeaders(config);

        return axios(resultConfig);
    }

    private addHeaders(userConfig: any): AnyObject {
        let requestHeaders: AnyObject = {
            // Some custom request headers
        };

        // if (this.authorizationToken) {
        //     requestHeaders = { Authorization: `Bearer ${this.authorizationToken}` };
        // }

        if (UserAuthService.isLoggedIn()) {
            requestHeaders = { Authorization: `Bearer ${UserAuthService.getToken()}` };
        }

        const { headers, ...restConfigs } = userConfig;

        // Return extended config
        return {
            headers: {
                ...requestHeaders,
                ...headers,
            },
            ...restConfigs,
        };
    }
}

const EndPointService = new Axios();

export { Axios, EndPointService };
