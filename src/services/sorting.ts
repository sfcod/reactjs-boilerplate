import lodash from 'lodash';

class Sorting {
    public makeOrder(sorting?: AnyObject): string | null {
        if (!sorting) {
            return null;
        }

        let order: string | null = null;
        lodash.forEach(sorting, (value: any, key: string) => {
            if (order === null) {
                order = '';
            }

            order += `${value === 'asc' ? '+' : '-'}${key}`;
        });

        return order;
    }
}

const sortingService = new Sorting();

export default sortingService;
