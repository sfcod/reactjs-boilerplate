import React, { ReactElement, useCallback, useEffect } from 'react';
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
} from 'react-table';
import { Paginated, PaginatedBaseMeta } from '../../services/api-handlers/pagination';
import Pagination from './Pagination';
import { QueryParams } from '../../types/grid';
import styles from './assets/grid.module.scss';
import textFilter from './filters/text-filter';
import useMemoCompare from './hooks/memo-compare';

export type Column<T extends Record<string, unknown>> = ColumnType<T> &
    UseSortByColumnOptions<T> &
    UseFiltersColumnOptions<T>;

interface Props<T extends Record<string, unknown>> {
    columns: Column<T>[];
    data: Paginated<T, PaginatedBaseMeta>;
    getData: (params: QueryParams) => void;
}

const defaultColumn = {
    Filter: textFilter(),
};

function Grid<T extends Record<string, unknown>>(props: Props<T>): ReactElement {
    const { columns, data, getData } = props;
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
                pageSize: 20,
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
            result[sort.id] = sort.desc ? 'desc' : 'asc';
        });

        return result;
    }, [sortBy]);
    const updatedAt = useMemoCompare(Date.now(), () => {
        return data.meta?.updatedAt !== 0;
    });

    useEffect(() => {
        getData({
            page: pageIndex + 1,
            limit: pageSize,
            filters: getPreparedFilters(),
            sorting: getPreparedSorting(),
        });
    }, [getData, sortBy, filters, pageIndex, pageSize, updatedAt]); // eslint-disable-line

    return (
        <div className={classNames(styles.table, 'table-responsive')}>
            <table className={classNames('table')} {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <>
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any, i: number) => (
                                    <th key={i} {...column.getHeaderProps()} width={column.width}>
                                        {column.canSort ? (
                                            <span {...column.getSortByToggleProps()}>
                                                {column.render('Header')}
                                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
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
                        </>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {data.list.length > 0 ? (
                        rows.map((row, i) => {
                            prepareRow(row);
                            const { key, ...rest } = row.getRowProps();
                            return (
                                <tr key={i} {...rest}>
                                    {row.cells.map((cell, i: number) => {
                                        const { key, ...rest } = cell.getCellProps();
                                        return (
                                            <td key={i} {...rest}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={100} className={classNames(styles.empty, 'text-center', 'py-4')}>
                                No results
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination<T> table={instance} />
        </div>
    );
}

export default Grid;
