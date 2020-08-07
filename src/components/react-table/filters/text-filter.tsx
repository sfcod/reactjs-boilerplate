import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { FilterProps } from './types';

let timeoutInstance: any = null;

function textFilter<T extends Record<string, unknown>>(
    type: 'text' | 'number' = 'text',
    timeout = 500,
): React.FunctionComponent<FilterProps<T>> {
    return React.memo(({ column: { filterValue, setFilter } }: FilterProps<T>) => {
        const [state, setState] = useState(filterValue);
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            setState(event.target.value);
        };

        useEffect(() => {
            if (state !== undefined) {
                if (timeoutInstance) {
                    clearTimeout(timeoutInstance);
                }

                timeoutInstance = setTimeout(() => {
                    setFilter(state);
                }, timeout);
            }
        }, [state]); // eslint-disable-line

        return (
            <input
                type={type}
                className={classNames('form-control', 'input-sm')}
                onChange={handleChange}
                value={state}
            />
        );
    });
}

export default textFilter;
