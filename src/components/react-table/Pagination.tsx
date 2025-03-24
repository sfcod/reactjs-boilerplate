import type { ReactElement } from 'react';
import React from 'react';
import classNames from 'classnames';
import type { Table } from '@tanstack/react-table';
import PageItem from './PageItem';
import styles from './assets/pagination.module.scss';

interface Props<T extends Record<any, any>> {
    table: Table<T>;
    marginPagesDisplayed?: number;
}

function Pagination<T extends Record<any, any>>({ table, marginPagesDisplayed = 2 }: Props<T>): ReactElement {
    const { getCanPreviousPage, getCanNextPage, getPageCount, nextPage, previousPage, setPageIndex, getState } = table;
    const { pageIndex } = getState().pagination;
    const totalPages = getPageCount();
    const currentPage = pageIndex + 1;
    const pagesRangeDisplayed = marginPagesDisplayed * 2 + 1;

    const pages = React.useMemo(() => {
        const halfVisible = Math.floor(pagesRangeDisplayed / 2);
        let startPage = currentPage - halfVisible;
        let endPage = currentPage + halfVisible;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPages, pagesRangeDisplayed);
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, totalPages - pagesRangeDisplayed + 1);
        }

        const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

        // Handle ellipsis logic
        if (totalPages <= pagesRangeDisplayed) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        return pageNumbers;
    }, [pageIndex, getPageCount, pagesRangeDisplayed, totalPages]);

    const showLeftEllipsis = pages[0] > 1;
    const showRightEllipsis = pages[pages.length - 1] < totalPages;

    return (
        <nav className={classNames(styles.pagination)}>
            <ul className={classNames('pagination', 'mb-0')}>
                <PageItem
                    pageIndex={pageIndex - 1}
                    gotoPage={previousPage}
                    text="Previous"
                    className={!getCanPreviousPage() ? 'disabled' : ''}
                />

                {showLeftEllipsis && (
                    <>
                        <PageItem pageIndex={0} gotoPage={setPageIndex} />
                        <PageItem pageIndex={0} text="..." className="disabled" />
                    </>
                )}

                {pages.map((page) => (
                    <PageItem
                        key={page}
                        pageIndex={page - 1}
                        gotoPage={setPageIndex}
                        className={page === currentPage ? 'active' : ''}
                    />
                ))}

                {showRightEllipsis && (
                    <>
                        <PageItem pageIndex={0} text="..." className="disabled" />
                        <PageItem pageIndex={totalPages - 1} gotoPage={setPageIndex} />
                    </>
                )}

                <PageItem
                    pageIndex={pageIndex + 1}
                    gotoPage={nextPage}
                    text="Next"
                    className={!getCanNextPage() ? 'disabled' : ''}
                />
            </ul>
        </nav>
    );
}

export default Pagination;
