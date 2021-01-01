import { CookieStorageService } from './storage/cookie-storage';
import { Storage } from './storage/storage.interface';
import decodeJwt from 'jwt-decode';

const LOGGED_KEY = 'logged';
const TOKEN_KEY = 'token';
const ROLES_KEY = 'roles';
const DATA_KEY = 'user_data';

export class UserAuth {
    private storage: Storage;

    public constructor(storage: Storage) {
        this.storage = storage;
    }

    public login(token: string, remember = false): void {
        this.setLoggedIn(true);
        this.setToken(token, remember ? 365 : 1);

        const decoded: { username: string; roles: string[] } = decodeJwt(token);

        this.setData({ username: decoded.username, roles: decoded.roles });
        this.setRoles(decoded.roles);
    }

    public logout(): Promise<void> {
        this.setLoggedIn(false);

        this.storage.removeItem(TOKEN_KEY);
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

    private setRoles(roles: Array<string>) {
        this.storage.setItem(ROLES_KEY, roles.join(','));
    }

    private setLoggedIn(value: boolean) {
        if (value) {
            this.storage.setItem(LOGGED_KEY, (+new Date()).toString());
        } else {
            this.storage.removeItem(LOGGED_KEY);
        }
    }
}

// const UserAuthService = new UserAuth(localStorage);
const UserAuthService = new UserAuth(CookieStorageService);

export default UserAuthService;
