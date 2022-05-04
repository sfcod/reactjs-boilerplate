import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import {
    useTable,
    usePagination,
    useSortBy,
    useFilters,
    Column as ColumnType,
    TableOptions,
    UseSortByColumnOptions,
    UseFiltersColumnOptions,
    Cell,
    Row,
} from 'react-table';
import { Paginated, PaginatedBaseMeta } from 'src/services/api-handlers/pagination';
import Pagination from './Pagination';
import { QueryParams, SortDirection } from 'src/types/grid';
import styles from './assets/grid.module.scss';
import textFilter from './filters/text-filter';
import useMemoCompare from './hooks/memo-compare';
import GridInfo from './GridInfo';
import { faSortAlphaUp, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type Column<T extends Record<any, any>> = ColumnType<T> & UseSortByColumnOptions<T> & UseFiltersColumnOptions<T>;

export interface Props<T extends Record<any, any>> {
    title?: ReactNode | string;
    scrollableByXAxis?: boolean;
    columns: Column<T>[];
    data: Paginated<T, PaginatedBaseMeta>;
    getData: (params: QueryParams) => void;
    className?: string;
    defaultSorting?: Partial<{ [x in keyof T]: SortDirection }>;
    renderRow?: (data: { row: Row<T>; renderedCells: ReactNode; index: number }) => ReactNode;
    renderCell?: (cell: Cell<T>) => ReactNode;
    pageSize?: number;
    noneText?: string;
}

const defaultColumn = {
    Filter: textFilter(),
};

function Grid<T extends Record<any, any>>(props: Props<T>): ReactElement {
    const {
        columns,
        data,
        getData,
        title,
        className,
        defaultSorting = {},
        renderRow,
        renderCell,
        pageSize: itemsPerPage = 20,
        noneText = 'No results',
        scrollableByXAxis = false,
    } = props;
    const instance = useTable<T>(
        {
            columns,
            defaultColumn,
            data: data.list,
            manualSortBy: true,
            manualFilters: true,
            manualPagination: true,
            pageCount: Math.max(1, data.totalPages ?? 1),
            initialState: {
                pageIndex: data.page - 1,
                pageSize: itemsPerPage,
                sortBy: defaultSorting
                    ? Object.entries(defaultSorting).map(([id, order]) => ({ id, desc: order === 'DESC' }))
                    : undefined,
            },
        } as TableOptions<T>,
        useFilters,
        useSortBy,
        usePagination,
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state } = instance;
    const { sortBy, filters, pageIndex, pageSize } = state as any;
    const getPreparedFilters = useCallback(() => {
        const result: any = {};
        filters.forEach((filter: { id: string; value: any }) => {
            result[filter.id] = filter.value;
        });

        return result;
    }, [filters]);
    const getPreparedSorting = useCallback(() => {
        const result: any = {};
        sortBy.forEach((sort: { id: string; desc: boolean }) => {
            result[sort.id] = sort.desc ? 'DESC' : 'ASC';
        });

        return result;
    }, [sortBy]);
    const updatedAt = useMemoCompare(Date.now(), () => {
        return data.meta?.updatedAt !== 0;
    });

    // explicitly move to first page if some filter applied
    useEffect(() => {
        (instance as any).gotoPage(0);
    }, [filters]);

    useEffect(() => {
        getData({
            page: pageIndex + 1,
            limit: pageSize,
            filters: getPreparedFilters(),
            sorting: getPreparedSorting(),
        });
    }, [getData, sortBy, filters, pageIndex, pageSize, updatedAt]); // eslint-disable-line

    return (
        <div className={classNames('card', className)}>
            {title && <div className={classNames('card-header')}>{title}</div>}
            <div className={classNames('card-body', 'p-0', scrollableByXAxis && styles.scrollableAxis)}>
                {/*<div className={classNames(styles.tableResponsive, 'table-responsive')}>*/}
                <table className={classNames(styles.table, 'table', 'mb-0')} {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => {
                            const headerGroupProps = headerGroup.getHeaderGroupProps();

                            return (
                                <React.Fragment key={headerGroupProps.key}>
                                    <tr {...headerGroupProps}>
                                        {headerGroup.headers.map((column: any, i: number) => (
                                            <th key={i} {...column.getHeaderProps()} width={column.width}>
                                                {column.canSort ? (
                                                    <span
                                                        className={classNames(
                                                            'd-flex',
                                                            'justify-content-between',
                                                            'align-items-center',
                                                        )}
                                                        {...column.getSortByToggleProps()}
                                                    >
                                                        {column.render('Header')}
                                                        {column.isSorted &&
                                                            (column.isSortedDesc ? (
                                                                <FontAwesomeIcon icon={faSortAlphaDown} />
                                                            ) : (
                                                                <FontAwesomeIcon icon={faSortAlphaUp} />
                                                            ))}
                                                    </span>
                                                ) : (
                                                    <span>{column.render('Header')}</span>
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                    <tr>
                                        {headerGroup.headers.map((column: any, i: number) => (
                                            <th key={i} {...{ width: column.width }}>
                                                {column.canFilter ? column.render('Filter') : null}
                                            </th>
                                        ))}
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {data.list.length > 0 ? (
                            rows.map((row, index) => {
                                prepareRow(row);
                                const cells = row.cells.map((cell) => {
                                    return renderCell ? (
                                        renderCell(cell)
                                    ) : (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    );
                                });

                                return renderRow ? (
                                    renderRow({ row, renderedCells: cells, index })
                                ) : (
                                    <tr {...row.getRowProps()}>{cells}</tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={100} className={classNames(styles.empty, 'text-center', 'py-4')}>
                                    {noneText}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/*</div>*/}
            </div>
            {data.list.length > 0 && (data.totalPages || 0) > 0 && (
                <div className={classNames('card-footer')}>
                    <div className={classNames('row')}>
                        <div className={classNames('col-sm-12', 'col-md-5')}>
                            {!!data.list.length && (
                                <GridInfo page={pageIndex + 1} pageSize={pageSize} totalCount={data.totalCount} />
                            )}
                        </div>
                        <div className={classNames('col-sm-12', 'col-md-7')}>
                            {!!data.list.length && <Pagination<T> table={instance} />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Grid;
