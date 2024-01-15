/**
 * Mapped status item interface
 */
export interface SelectableItem {
    name: string;
    value: any;
}

/**
 * Check if value is selectable item
 *
 * @param x
 */
export function isSelectableItem(x: any): x is SelectableItem {
    return x && typeof x === 'object' && 'name' in x && 'value' in x;
}

/**
 * Abstract enumerable
 */
export abstract class EnumerableAbstract<T extends string | number = string | number> {
    protected fetchedChoices: Record<any, any> = {};

    /**
     * Name as it called on BE
     */
    public abstract getName(): string;

    /**
     * Edit default choices (they may be overridden with choices fetched from BE)
     */
    protected abstract defaultChoices(): Record<T, string>;

    /**
     * Returns resulted choices
     */
    public choices(): Record<T, any> {
        return {
            ...this.defaultChoices(),
            ...this.fetchedChoices,
        };
    }

    /**
     * Set choices fetched from BE
     *
     * @param choices
     */
    public setFetchedChoices(choices: SelectableItem[]): void {
        choices.map(({ value, name }) => {
            this.fetchedChoices[value] = name;
        });
    }

    /**
     * Get text using id
     *
     * @returns {*}
     * @param key
     */
    public getLabel(key: T): string {
        const label = this.choices()[key];

        return label !== 'undefined' ? label : String(key);
    }

    /**
     * Map status for dropdown/select
     */
    public mapData(exclude: T[] = []): SelectableItem[] {
        const data = this.choices();
        const result: SelectableItem[] = [];

        for (const key of exclude) {
            delete data[key];
        }

        // eslint-disable-next-line
        Object.keys(data).map((key: any) => {
            result.push({
                name: data[key as T],
                value: !isNaN(parseFloat(key)) && isFinite(key as any) ? parseFloat(key) : key,
            });
        });

        return result;
    }
}
