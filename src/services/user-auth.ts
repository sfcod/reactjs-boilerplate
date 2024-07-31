import { CookieStorageService } from './storage/cookie-storage';
import type { Storage } from './storage/storage.interface';
import { jwtDecode } from 'jwt-decode';

const LOGGED_KEY = 'logged';
const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const ROLES_KEY = 'roles';
const DATA_KEY = 'user_data';
const ID_KEY = 'id';
const EXP_KEY = 'exp';

export class UserAuth {
    private storage: Storage;

    public constructor(storage: Storage) {
        this.storage = storage;
    }

    public login(token: string, refreshToken: string | null, remember = false): void {
        this.setLoggedIn(true);
        this.setToken(token, remember ? 365 : 1);
        refreshToken && this.setRefreshToken(refreshToken, remember ? 365 : 1);
        const decoded: { username: string; roles: string[]; symbol: string; exp: number } = jwtDecode(token);

        this.setId(decoded.symbol);
        this.setData({ username: decoded.username, roles: decoded.roles });
        decoded.roles && this.setRoles(decoded.roles);
        this.setExpiration(decoded.exp);
    }

    public logout(): Promise<void> {
        this.setLoggedIn(false);

        this.storage.removeItem(TOKEN_KEY);
        this.storage.removeItem(REFRESH_TOKEN_KEY);
        this.storage.removeItem(ROLES_KEY);
        this.storage.removeItem(DATA_KEY);

        return Promise.resolve();
    }

    public getToken(): string | null {
        return this.storage.getItem(TOKEN_KEY);
    }

    public getData(): AnyObject | null {
        const stringData = this.storage.getItem(DATA_KEY);
        return stringData ? JSON.parse(stringData) : stringData;
    }

    public getRoles(): Array<string> {
        const roles = this.storage.getItem(ROLES_KEY);

        return roles ? roles.split(',') : [];
    }

    public isLoggedIn(): boolean {
        return !!this.storage.getItem(TOKEN_KEY) && !!this.storage.getItem(LOGGED_KEY);
    }

    private setData(decodedData: AnyObject) {
        this.storage.setItem(DATA_KEY, JSON.stringify(decodedData));
    }

    private setToken(token: string, expire = 365) {
        this.storage.setItem(TOKEN_KEY, token, expire);
    }

    private setRefreshToken(token: string, expire = 365) {
        this.storage.setItem(REFRESH_TOKEN_KEY, token, expire);
    }

    private setRoles(roles: Array<string>) {
        this.storage.setItem(ROLES_KEY, roles.join(','));
    }

    setId(id: string) {
        this.storage.setItem(ID_KEY, id);
    }

    getId(): string | null {
        return this.storage.getItem(ID_KEY);
    }

    setExpiration(expiration: number) {
        this.storage.setItem(EXP_KEY, String(expiration));
    }

    getExpiration(): number | null {
        const val = this.storage.getItem(EXP_KEY);

        return val ? Number(val) : null;
    }

    private setLoggedIn(value: boolean) {
        if (value) {
            this.storage.setItem(LOGGED_KEY, (+new Date()).toString());
        } else {
            this.storage.removeItem(LOGGED_KEY);
        }
    }

    getRefreshToken(): string | null {
        return this.storage.getItem(REFRESH_TOKEN_KEY);
    }

    isExpired(): boolean {
        const exp = this.getExpiration();

        if (!exp) return false;

        const timestamp = new Date().getTime() / 1000;

        return timestamp >= exp;
    }

    isFullyAuthenticated(): boolean {
        if (this.isLoggedIn()) {
            const token = this.storage.getItem(TOKEN_KEY) as string;
            const { fullyAuthenticated = false } = jwtDecode(token) as any;

            return fullyAuthenticated;
        }

        return false;
    }
}

// const UserAuthService = new UserAuth(localStorage);
const UserAuthService = new UserAuth(CookieStorageService);

export default UserAuthService;
