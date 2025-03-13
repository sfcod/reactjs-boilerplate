import type { ReactElement, ReactNode } from 'react';
import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    type ColumnDef,
    type SortingState,
    type FilterMeta,
    type Table,
    type Row,
    type Cell,
    flexRender,
} from '@tanstack/react-table';
import type { Paginated, PaginatedBaseMeta } from 'src/services/api-handlers/pagination';
import Pagination from './Pagination';
import type { QueryParams, SortDirection } from 'src/types/grid';
import styles from './assets/grid.module.scss';
import textFilter from './filters/text-filter';
import useMemoCompare from './hooks/memo-compare';
import GridInfo from './GridInfo';
import { faSortAlphaUp, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CustomMeta = {
    // Add any custom meta here if needed
} & Record<string, any>;

// From the docs:
// https://tanstack.com/table/v8/docs/api/core/column-def#meta
declare module '@tanstack/table-core' {
    interface ColumnMeta<TData extends unknown, TValue> extends CustomMeta {}
}

export type Column<T extends Record<any, any>> = Omit<ColumnDef<T, any>, 'cell'> & {
    cell?: ColumnDef<T, any>['cell'];
    meta?: CustomMeta;
    accessorKey?: keyof T;
    filter?: React.FunctionComponent<any>;
};

export interface Props<T extends Record<any, any>> {
    title?: ReactNode | string;
    scrollableByXAxis?: boolean;
    columns: Column<T>[];
    data: Paginated<T, PaginatedBaseMeta>;
    getData: (params: QueryParams) => void;
    className?: string;
    defaultSorting?: Partial<{ [x in keyof T]: SortDirection }>;
    renderRow?: (data: { row: Row<T>; renderedCells: ReactNode; index: number }) => ReactNode;
    renderCell?: (cell: Cell<T, any>) => ReactNode;
    pageSize?: number;
    noneText?: string;
}

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

    const defaultColumn = {
        meta: {
            Filter: textFilter<T>(),
        },
    };

    const [sorting, setSorting] = React.useState<SortingState>(() =>
        Object.entries(defaultSorting).map(([id, order]) => ({ id, desc: order === 'DESC' })),
    );

    const [columnFilters, setColumnFilters] = React.useState<{ id: string; value: any }[]>([]);

    const processedColumns = React.useMemo(
        () =>
            columns.map((col) => {
                if (col.filter) {
                    col.meta = {
                        ...col.meta,
                        Filter: col.filter,
                    };
                }

                return {
                    ...col,
                    accessorFn: col.accessorKey ? (row: T) => row[col.accessorKey] : undefined,
                };
            }) as ColumnDef<T, any>[],
        [columns],
    );

    const instance = useReactTable<T>({
        data: data.list,
        columns: processedColumns,
        initialState: {
            pagination: {
                pageIndex: data.page - 1,
                pageSize: itemsPerPage,
            },
            sorting: defaultSorting
                ? Object.entries(defaultSorting).map(([id, order]) => ({ id, desc: order === 'DESC' }))
                : undefined,
        },
        state: {
            sorting,
            columnFilters,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        pageCount: Math.max(1, data.totalPages ?? 1),
        defaultColumn: defaultColumn,
    });

    const getPreparedFilters = useCallback(() => {
        const result: any = {};
        columnFilters.forEach((filter) => {
            result[filter.id] = filter.value;
        });
        return result;
    }, [columnFilters]);

    const getPreparedSorting = useCallback(() => {
        const result: any = {};
        sorting.forEach((sort) => {
            result[sort.id] = sort.desc ? 'DESC' : 'ASC';
        });
        return result;
    }, [sorting]);

    const updatedAt = useMemoCompare(Date.now(), () => {
        return data.meta?.updatedAt !== 0;
    });

    // explicitly move to first page if some filter applied
    useEffect(() => {
        instance.setPageIndex(0);
    }, [JSON.stringify(columnFilters)]);

    useEffect(() => {
        getData({
            page: instance.getState().pagination.pageIndex + 1,
            limit: instance.getState().pagination.pageSize,
            filters: getPreparedFilters(),
            sorting: getPreparedSorting(),
        });
    }, [
        getData,
        sorting,
        JSON.stringify(columnFilters),
        instance.getState().pagination.pageIndex,
        instance.getState().pagination.pageSize,
        updatedAt,
    ]);

    return (
        <div className={classNames('card', className)}>
            {title && <div className={classNames('card-header')}>{title}</div>}
            <div className={classNames('card-body', 'p-0', scrollableByXAxis && styles.scrollableAxis)}>
                <table className={classNames(styles.table, 'table', 'mb-0')}>
                    <thead>
                        {instance.getHeaderGroups().map((headerGroup) => (
                            <React.Fragment key={headerGroup.id}>
                                <tr>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id} style={{ width: header.column.columnDef.size }}>
                                            {header.column.getCanSort() ? (
                                                <span
                                                    className={classNames(
                                                        'd-flex',
                                                        'justify-content-between',
                                                        'align-items-center',
                                                    )}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {header.column.getIsSorted() &&
                                                        (header.column.getIsSorted() === 'desc' ? (
                                                            <FontAwesomeIcon icon={faSortAlphaDown} />
                                                        ) : (
                                                            <FontAwesomeIcon icon={faSortAlphaUp} />
                                                        ))}
                                                </span>
                                            ) : (
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            )}
                                        </th>
                                    ))}
                                </tr>
                                <tr>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id} style={{ width: header.column.columnDef.size }}>
                                            {header?.column?.getCanFilter() &&
                                                header?.column?.columnDef?.meta?.Filter?.({
                                                    column: header.column,
                                                })}
                                        </th>
                                    ))}
                                </tr>
                            </React.Fragment>
                        ))}
                    </thead>
                    <tbody>
                        {data.list.length > 0 ? (
                            instance.getRowModel().rows.map((row, index) => {
                                const cells = row.getVisibleCells().map((cell) => {
                                    return renderCell ? (
                                        renderCell(cell)
                                    ) : (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    );
                                });

                                return renderRow ? (
                                    renderRow({ row, renderedCells: cells, index })
                                ) : (
                                    <tr key={row.id}>{cells}</tr>
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
            </div>
            {(data.totalPages || 0) > 0 && (
                <div className={classNames('card-footer')}>
                    <div className={classNames('row')}>
                        <div className={classNames('col-sm-12', 'col-md-5')}>
                            {!!data.list.length && (
                                <GridInfo
                                    page={instance.getState().pagination.pageIndex + 1}
                                    pageSize={instance.getState().pagination.pageSize}
                                    totalCount={data.totalCount}
                                />
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
