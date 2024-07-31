import lodash from 'lodash';
import type { SortDirection } from '../types/grid';

class Sorting {
    public makeOrder(sorting?: { [T: string]: SortDirection }): { [T: string]: SortDirection } {
        const order: { [T: string]: SortDirection } = {};

        if (!sorting) {
            return order;
        }

        lodash.forEach(sorting, (value: SortDirection, key: string) => {
            order[`sort[${key}]`] = value;
        });

        return order;
    }
}

const sortingService = new Sorting();

export default sortingService;
