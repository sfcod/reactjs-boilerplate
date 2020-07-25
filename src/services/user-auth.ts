import { CookieStorageService } from './storage/cookie-storage';
import { Storage } from './storage/storage.interface';
import decodeJwt from 'jwt-decode';

const LOGGED_KEY = 'logged';
const TOKEN_KEY = 'token';
const ROLES_KEY = 'roles';
const USERNAME_KEY = 'username';

class UserAuth {
    private storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    // login(email: string, password: string, remember: boolean = false) {
    //     const request = new Request(`${API_URL}/login`, {
    //         method: 'POST',
    //         body: JSON.stringify({ email, password }),
    //         headers: new Headers({ 'Content-Type': 'application/json' }),
    //     });
    //
    //     return fetch(request)
    //         .then((response) => {
    //             if (response.status < 200 || response.status >= 300) {
    //                 throw new Error("Incorrect email or password");
    //             }
    //
    //             return response.json();
    //         })
    //         .then((response: {token: string}) => {
    //             this.setLoggedIn(true);
    //             this.setToken(response.token, remember ? 365 : 1);
    //
    //             const decoded: {username: string, roles: string[]} = decodeJwt(response.token);
    //
    //             this.setUsername(decoded.username);
    //             this.setRoles(decoded.roles);
    //
    //             return response;
    //         });
    // }

    login(token: string, remember = false) {
        this.setLoggedIn(true);
        this.setToken(token, remember ? 365 : 1);

        const decoded: { username: string; roles: string[] } = decodeJwt(token);

        this.setUsername(decoded.username);
        this.setRoles(decoded.roles);
    }

    logout() {
        this.setLoggedIn(false);

        this.storage.removeItem(TOKEN_KEY);
        this.storage.removeItem(ROLES_KEY);
        this.storage.removeItem(USERNAME_KEY);

        return Promise.resolve();
    }

    setToken(token: string, expire = 365) {
        this.storage.setItem(TOKEN_KEY, token, expire);
    }

    getToken(): string | null {
        return this.storage.getItem(TOKEN_KEY);
    }

    setUsername(username: string) {
        this.storage.setItem(USERNAME_KEY, username);
    }

    getUsername(): string | null {
        return this.storage.getItem(USERNAME_KEY);
    }

    setRoles(roles: Array<string>) {
        this.storage.setItem(ROLES_KEY, roles.join(','));
    }

    getRoles(): Array<string> {
        const roles = this.storage.getItem(ROLES_KEY);

        return roles ? roles.split(',') : [];
    }

    setLoggedIn(value: boolean) {
        if (value) {
            this.storage.setItem(LOGGED_KEY, (+new Date()).toString());
        } else {
            this.storage.removeItem(LOGGED_KEY);
        }
    }

    isLoggedIn(): boolean {
        return !!this.storage.getItem(TOKEN_KEY) && !!this.storage.getItem(LOGGED_KEY);
    }
}

// const UserAuthService = new UserAuth(localStorage);
const UserAuthService = new UserAuth(CookieStorageService);

export default UserAuthService;
