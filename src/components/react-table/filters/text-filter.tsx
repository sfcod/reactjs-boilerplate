import * as React from 'react';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import type { Column } from '@tanstack/react-table';

let timeoutInstance: any = null;

function textFilter<T extends Record<string, unknown>>(type: 'text' | 'number' = 'text', timeout = 500) {
    return function TextFilter({ column }: { column: Column<T, unknown> }) {
        const [state, setState] = useState(column.getFilterValue() as string);

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            setState(event.target.value);
        };

        useEffect(() => {
            if (state !== undefined) {
                if (timeoutInstance) {
                    clearTimeout(timeoutInstance);
                }

                timeoutInstance = setTimeout(() => {
                    column.setFilterValue(state);
                }, timeout);
            }
        }, [state, column]);

        return (
            <input
                type={type}
                className={classNames('form-control', 'input-sm')}
                onChange={handleChange}
                value={state ?? ''}
            />
        );
    };
}

export default textFilter;
