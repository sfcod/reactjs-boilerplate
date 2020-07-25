import { Storage } from './storage.interface';

class KeyValueStorage implements Storage {
    public length = 0;

    private data: { [key: string]: any } = {};

    clear(): void {
        this.data = {};
    }

    getItem(key: string): string | null {
        return this.data[key];
    }

    key(index: number): string | null {
        return Object.keys(this.data)[index];
    }

    removeItem(key: string): void {
        delete this.data[key];

        this.length = Object.values(this.data).length;
    }

    setItem(key: string, value: string): void {
        this.data[key] = value;

        this.length = Object.values(this.data).length;
    }
}

const KeyValueStorageService = new KeyValueStorage();

export { KeyValueStorageService };
