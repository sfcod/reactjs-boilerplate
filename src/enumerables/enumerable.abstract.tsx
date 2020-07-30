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
    return typeof x === 'object' && Object.keys(x).length === 2 && 'name' in x && 'value' in x;
}

/**
 * Abstract enumerable
 */
export abstract class EnumerableAbstract {
    /**
     * List status
     */
    public abstract listData(): { [key: number]: any };

    /**
     * Get text using id
     *
     * @returns {*}
     * @param key
     */
    public getLabel(key: number): string {
        const label = this.listData()[key];

        return label !== 'undefined' ? label : key;
    }

    /**
     * Map status for dropdown/select
     */
    public mapData(exclude: number[] = []): SelectableItem[] {
        const data = this.listData();
        const result: SelectableItem[] = [];

        for (const key of exclude) {
            delete data[key];
        }

        // eslint-disable-next-line
        Object.keys(data).map((key: any) => {
            result.push({
                name: data[key],
                value: !isNaN(parseFloat(key)) && isFinite(key as any) ? parseFloat(key) : key,
            });
        });

        return result;
    }
}
