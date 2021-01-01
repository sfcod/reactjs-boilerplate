import { useEffect, useRef } from 'react';

/**
 * Returns previous value if compare function returns "true"
 *
 * @param value
 * @param compare
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useMemoCompare(value: any, compare: (previous: any, value: any) => boolean): any {
    const previousRef = useRef();
    const previous = previousRef.current;

    const isEqual = compare(previous, value);

    useEffect(() => {
        if (!isEqual) {
            previousRef.current = value;
        }
    });

    return isEqual ? previous : value;
}
