import React from 'react';
import classNames from 'classnames';
import { TableInstance } from 'react-table';
import PageItem from './PageItem';
import styles from './assets/pagination.module.scss';

interface Props<T extends Record<string, unknown>> {
    table: TableInstance<T>;
    marginPagesDisplayed?: number;
}

function Pagination<T extends Record<string, unknown>>({ table, marginPagesDisplayed = 2 }: Props<T>) {
    const {
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = table as any;
    const currentPage = pageIndex + 1;

    let pageDiff = pageCount - currentPage;
    if (pageDiff < 0) {
        pageDiff = 0;
        previousPage();
    }
    const pagesBefore = Array.from(Array(pageIndex), (value: any, index: number) => index);
    const pagesAfter = Array.from(Array(pageDiff), (value: any, index: number) => index + currentPage);
    const pagesRangeDisplayed = marginPagesDisplayed * 2 + 1;

    return (
        <div className={classNames(styles.pagination)}>
            <ul className={classNames('pagination')}>
                <PageItem
                    pageIndex={pageIndex - 1}
                    gotoPage={previousPage}
                    text="Previous"
                    className={!canPreviousPage ? 'disabled' : ''}
                />
                {pagesBefore.length <= pagesRangeDisplayed ? (
                    <>
                        {pagesBefore.map((value: number) => (
                            <PageItem key={value} pageIndex={value} gotoPage={gotoPage} />
                        ))}
                    </>
                ) : (
                    <>
                        {pagesBefore.slice(0, marginPagesDisplayed).map((value: number) => (
                            <PageItem key={value} pageIndex={value} gotoPage={gotoPage} />
                        ))}
                        <PageItem pageIndex={0} text="..." className="disabled" />
                        {pagesBefore.slice(pageIndex - marginPagesDisplayed).map((value: number) => (
                            <PageItem key={value} pageIndex={value} gotoPage={gotoPage} />
                        ))}
                    </>
                )}
                <PageItem pageIndex={pageIndex} gotoPage={gotoPage} className="active" />
                {pagesAfter.length <= pagesRangeDisplayed ? (
                    <>
                        {pagesAfter.map((value: number) => (
                            <PageItem key={value} pageIndex={value} gotoPage={gotoPage} />
                        ))}
                    </>
                ) : (
                    <>
                        {pagesAfter.slice(0, marginPagesDisplayed).map((value: number) => (
                            <PageItem key={value} pageIndex={value} gotoPage={gotoPage} />
                        ))}
                        <PageItem pageIndex={0} text="..." className="disabled" />
                        {pagesAfter.slice(pagesAfter.length - marginPagesDisplayed).map((value: number) => (
                            <PageItem key={value} pageIndex={value} gotoPage={gotoPage} />
                        ))}
                    </>
                )}
                <PageItem
                    pageIndex={pageIndex + 1}
                    gotoPage={nextPage}
                    text="Next"
                    className={!canNextPage ? 'disabled' : ''}
                />
            </ul>
        </div>
    );
}

export default Pagination;
