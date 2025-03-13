import type { ReactElement } from 'react';
import React from 'react';
import classNames from 'classnames';
import type { Table } from '@tanstack/react-table';

interface Props<T extends Record<any, any>> {
    table: Table<T>;
}

function Pagination<T extends Record<any, any>>({ table }: Props<T>): ReactElement {
    const { getCanPreviousPage, getCanNextPage, getPageCount, nextPage, previousPage, setPageIndex, getState } = table;

    const { pageIndex } = getState().pagination;

    const pages = React.useMemo(() => {
        const totalPages = getPageCount();
        const currentPage = pageIndex + 1;
        const visiblePages = 5;
        const halfVisible = Math.floor(visiblePages / 2);

        let startPage = currentPage - halfVisible;
        let endPage = currentPage + halfVisible;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPages, visiblePages);
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, totalPages - visiblePages + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }, [pageIndex, getPageCount()]);

    return (
        <nav>
            <ul className={classNames('pagination', 'justify-content-end', 'mb-0')}>
                <li className={classNames('page-item', { disabled: !getCanPreviousPage() })}>
                    <button
                        type="button"
                        className={classNames('page-link')}
                        onClick={() => previousPage()}
                        disabled={!getCanPreviousPage()}
                    >
                        Previous
                    </button>
                </li>
                {pages.map((page) => (
                    <li
                        key={page}
                        className={classNames('page-item', {
                            active: page === pageIndex + 1,
                        })}
                    >
                        <button
                            type="button"
                            className={classNames('page-link')}
                            onClick={() => setPageIndex(page - 1)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li className={classNames('page-item', { disabled: !getCanNextPage() })}>
                    <button
                        type="button"
                        className={classNames('page-link')}
                        onClick={() => nextPage()}
                        disabled={!getCanNextPage()}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
