import { Storage } from './storage.interface';

class CookieStorage implements Storage {
    public length = 0;
    private readonly prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    clear(): void {
        throw Error('Not supported.');
    }

    getItem(key: string): string | null {
        const name = this.addPrefix(key) + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }

        return '';
    }

    key(index: number): string | null {
        throw Error('Not supported.');
    }

    removeItem(key: string): void {
        if (this.getItem(key)) {
            this.setItem(key, '', -1);

            this.length = Math.max(0, this.length - 1);
        }
    }

    setItem(key: string, value: string, expire = 365): void {
        const date = new Date();
        date.setTime(date.getTime() + expire * 24 * 60 * 60 * 1000);

        const expires = 'expires=' + date.toUTCString();
        document.cookie = this.addPrefix(key) + '=' + value + ';' + expires + ';path=/';

        if (value) {
            this.length += 1;
        }
    }

    private addPrefix(key: string): string {
        return this.prefix + key;
    }
}

const CookieStorageService = new CookieStorage('rma_');

export { CookieStorageService };
