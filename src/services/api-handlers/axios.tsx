import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import UserAuthService from '../user-auth';
import { API_URL } from '../../config/env';

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

    public get(endPoint: string, params: AnyObject = {}, config: AnyObject = {}): AxiosPromise<any> {
        return axios.get(endPoint, this.addHeaders({ ...config, params }));
    }

    public post(endPoint: string, params: AnyObject = {}, config: AnyObject = {}): AxiosPromise<any> {
        return axios.post(endPoint, params, this.addHeaders(config));
    }

    public put(endPoint: string, params: AnyObject = {}, config: AnyObject = {}): AxiosPromise<any> {
        return axios.put(endPoint, params, this.addHeaders(config));
    }

    public patch(endPoint: string, params: AnyObject = {}, config: AnyObject = {}): AxiosPromise<any> {
        return axios.patch(endPoint, params, this.addHeaders(config));
    }

    public delete(endPoint: string, config: AnyObject = {}): AxiosPromise<any> {
        return axios.delete(endPoint, this.addHeaders(config));
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public delay(time: number, args?: any): AxiosPromise<any> {
        return new Promise((resolve) => {
            setTimeout(resolve.bind(null, args), time);
        });
    }

    public axios(config: AxiosRequestConfig): AxiosPromise<any> {
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
