import { CookieStorageService } from './storage/cookie-storage';
import type { Storage } from './storage/storage.interface';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const DATA_KEY = 'user_data';

type Data = {
    username: string;
    roles: string[];
    id: string;
    exp: number;
};

export class UserAuth {
    private storage: Storage;

    public constructor(storage: Storage) {
        this.storage = storage;
    }

    public async login(token: string, refreshToken: string | null, remember = false): Promise<void> {
        this.setToken(token, remember ? 365 : 1);
        refreshToken && this.setRefreshToken(refreshToken, remember ? 365 : 1);
        const decoded: { username: string; roles: string[]; symbol: string; exp: number } = jwtDecode(token);
        this.setData({ id: decoded.symbol, username: decoded.username, roles: decoded.roles, exp: decoded.exp });
    }

    public async logout(): Promise<void> {
        this.storage.removeItem(TOKEN_KEY);
        this.storage.removeItem(REFRESH_TOKEN_KEY);
        this.storage.removeItem(DATA_KEY);
    }

    public getToken(): string | null {
        return this.storage.getItem(TOKEN_KEY);
    }

    public getData(): Data | null;
    public getData<K extends keyof Data>(key: K): Data[K] | null;
    public getData<K extends keyof Data>(key?: K): Data | Data[K] | null {
        const stringData = this.storage.getItem(DATA_KEY);
        const parsed = stringData ? JSON.parse(stringData) : null;
        if (!parsed) return null;

        return key ? parsed[key] : parsed;
    }

    getId(): string | null {
        return this.getData('id');
    }

    getExpiration(): number | null {
        const val = this.getData('exp');

        return val ? Number(val) : null;
    }

    getRefreshToken(): string | null {
        return this.storage.getItem(REFRESH_TOKEN_KEY);
    }

    isExpired(): boolean {
        const exp = this.getExpiration();

        if (!exp) return false;

        const timestamp = new Date().getTime() / 1000;

        return timestamp >= exp!;
    }

    public getRoles(): Array<string> {
        return this.getData('roles') || [];
    }

    public isLoggedIn(): boolean {
        const token = this.getToken();
        const isExpired = this.isExpired();

        return Boolean(token) && !isExpired;
    }

    private setData(decodedData: Data) {
        this.storage.setItem(DATA_KEY, JSON.stringify(decodedData));
    }

    private setToken(token: string, expire = 365) {
        this.storage.setItem(TOKEN_KEY, token, expire);
    }

    private setRefreshToken(token: string, expire = 365) {
        this.storage.setItem(REFRESH_TOKEN_KEY, token, expire);
    }
}

// const UserAuthService = new UserAuth(localStorage);
const UserAuthService = new UserAuth(CookieStorageService);

export default UserAuthService;
