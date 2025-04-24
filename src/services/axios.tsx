import type { AxiosPromise, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { isAxiosError } from 'axios';
import axios from 'axios';
import UserAuthService from './user-auth';
import { API_URL } from 'src/config/env';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        common: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
        },
    },
});

type Config = AxiosRequestConfig & { handleRefreshTokens?: boolean };

class Axios {
    private isRefreshing = false;
    private refreshQueue: Array<{
        resolve: (value: string) => void;
        reject: (reason: any) => void;
    }> = [];

    public request({ handleRefreshTokens, ...config }: Config): AxiosPromise<any> {
        const promise = axiosInstance(config);
        return handleRefreshTokens ? this.handleRefreshToken(promise) : promise;
    }

    public get(
        endPoint: string,
        params: AnyObject = {},
        { handleRefreshTokens = true, ...config }: Config = {},
    ): AxiosPromise<any> {
        const promise = axiosInstance.get(endPoint, this.addHeaders({ ...config, params }));
        return handleRefreshTokens ? this.handleRefreshToken(promise) : promise;
    }

    public post(
        endPoint: string,
        params: AnyObject = {},
        { handleRefreshTokens = true, ...config }: Config = {},
    ): AxiosPromise<any> {
        const promise = axiosInstance.post(endPoint, params, this.addHeaders(config));
        return handleRefreshTokens ? this.handleRefreshToken(promise) : promise;
    }

    public put(
        endPoint: string,
        params: AnyObject = {},
        { handleRefreshTokens = true, ...config }: Config = {},
    ): AxiosPromise<any> {
        const promise = axiosInstance.put(endPoint, params, this.addHeaders(config));
        return handleRefreshTokens ? this.handleRefreshToken(promise) : promise;
    }

    public patch(
        endPoint: string,
        params: AnyObject = {},
        { handleRefreshTokens = true, ...config }: Config = {},
    ): AxiosPromise<any> {
        const promise = axiosInstance.patch(endPoint, params, this.addHeaders(config));
        return handleRefreshTokens ? this.handleRefreshToken(promise) : promise;
    }

    public delete(endPoint: string, { handleRefreshTokens = true, ...config }: Config = {}): AxiosPromise<any> {
        const promise = axiosInstance.delete(endPoint, this.addHeaders(config));
        return handleRefreshTokens ? this.handleRefreshToken(promise) : promise;
    }

    public delay(time: number, args?: any): AxiosPromise<any> {
        return new Promise((resolve) => {
            setTimeout(resolve.bind(null, args), time);
        });
    }

    public refresh(refreshToken: string): AxiosPromise<any> {
        return axiosInstance.post('/auths/refresh', { refreshToken });
    }

    private addHeaders(userConfig: AxiosRequestConfig): AxiosRequestConfig {
        let requestHeaders: AnyObject = {};

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

    private async handleRefreshToken(promise: AxiosPromise<any>) {
        try {
            return await promise;
        } catch (error: any) {
            if (!isAxiosError(error)) {
                return Promise.reject(error);
            }

            const originalRequest = error.config as InternalAxiosRequestConfig;
            if (error.response?.status !== 401) {
                return Promise.reject(error);
            }

            const onSuccess = (token: string) => {
                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                }
                return axiosInstance(originalRequest); // Retry the original request
            };

            const onError = async (error: any) => {
                this.processRefreshQueue({ error, token: null });
                await UserAuthService.logout();
                window.location.reload();
                return Promise.reject(error);
            };

            const delayedRequest = new Promise<string>((resolve, reject) => {
                this.refreshQueue.push({ resolve, reject });
            })
                .then(onSuccess)
                .catch((err) => Promise.reject(err));

            if (this.isRefreshing) {
                return delayedRequest;
            }

            this.isRefreshing = true;
            const currentRefreshToken = UserAuthService.getRefreshToken();

            if (!currentRefreshToken) {
                this.isRefreshing = false;
                return onError(error);
            }

            try {
                const { data } = await this.refresh(currentRefreshToken);
                await UserAuthService.login(data.token, data.refreshToken, true);
                this.processRefreshQueue({ error: null, token: data.token });
                this.isRefreshing = false;

                return delayedRequest;
            } catch (error: any) {
                this.isRefreshing = false;
                return onError(error);
            }
        }
    }

    private processRefreshQueue({ error, token }: { error: Error | null; token: string | null }) {
        this.refreshQueue.forEach((item) => {
            error || !token ? item.reject(error) : item.resolve(token);
        });
        this.refreshQueue = [];
    }
}

const EndPointService = new Axios();

export { EndPointService };
