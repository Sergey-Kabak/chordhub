'use client';

import { useCallback, useEffect, useState } from 'react';

import { omit } from 'lodash';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationOptions,
  PaginationState,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';

import { DebouncedInput } from './debouncedInput';
import {TablePagination} from "@/features/table/components/table-pagination.tsx";

type Props<T extends Record<string, string | number>> = {
  data: T[];
  columns: ColumnDef<T>[];
  pagination: PaginationState;
  paginationOptions: Pick<PaginationOptions, 'onPaginationChange' | 'rowCount'>;
  filters: Partial<T>;
  onFilterChange: (dataFilters: Partial<T>) => void;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
};

export const Table = <T extends Record<string, string | number>>({
  data,
  columns,
  pagination,
  paginationOptions,
  filters,
  sorting,
  onFilterChange,
  onSortingChange,
}: Props<T>) => {


  // console.log(pagination, paginationOptions);

  const transformFilters = useCallback(() => {
    return Object.keys(omit(filters, ['pageIndex', 'pageSize', 'sortBy'])).map((key) => {
      if (key === 'id') {
        return {
          id: key,
          value: [+filters[key], +filters[key]],
        };
      }

      return {
        id: key,
        value: filters[key],
      };
    });
  }, [filters]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(transformFilters());

  useEffect(() => {
    setColumnFilters(transformFilters());
  }, [transformFilters]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      size: 50, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
    filterFns: {},
    state: { pagination, sorting, columnFilters },
    onSortingChange,
    ...paginationOptions,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    // manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <TablePagination table={table} pagination={pagination} paginationOptions={paginationOptions} />
      <table className={'min-w-full'}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={'bg-gray-2 text-left dark:bg-meta-4'}>
              {headerGroup.headers.map((header) => {
                const fieldMeta = header.column.columnDef.meta;
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={'px-4 py-4 font-light text-black dark:text-white'}
                    style={{ width: `${header.getSize()}px` }}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'flex items-center justify-between cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() ?
                              ({
                            asc: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path d="M4 8H13" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                <path
                                  opacity="0.7"
                                  d="M6 13H13"
                                  stroke="#1C274C"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  opacity="0.4"
                                  d="M8 18H13"
                                  stroke="#1C274C"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M17 20V4L20 8"
                                  stroke="#1C274C"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ),
                            desc: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path d="M4 16L13 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                <path
                                  opacity="0.7"
                                  d="M6 11H13"
                                  stroke="#1C274C"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  opacity="0.3"
                                  d="M8 6L13 6"
                                  stroke="#1C274C"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M17 4L17 20L20 16"
                                  stroke="#1C274C"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ),
                            false: (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                  <path opacity="0.5" d="M16 18L16 6M16 6L20 10.125M16 6L12 10.125" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M8 6L8 18M8 18L12 13.875M8 18L4 13.875" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ),
                          }[header.column.getIsSorted() as string] ?? null) : null
                          }
                        </div>
                        {/*{header.column.getCanFilter() && fieldMeta?.filterKey !== undefined ? (*/}
                        {/*  <DebouncedInput*/}
                        {/*    className="p-2 w-full border shadow rounded"*/}
                        {/*    onChange={(value) => {*/}
                        {/*      onFilterChange({*/}
                        {/*        [fieldMeta.filterKey as keyof T]: value,*/}
                        {/*      } as Partial<T>);*/}
                        {/*    }}*/}
                        {/*    placeholder="Search..."*/}
                        {/*    type={fieldMeta.filterVariant === 'number' ? 'number' : 'text'}*/}
                        {/*    value={filters[fieldMeta?.filterKey] ?? ''}*/}
                        {/*  />*/}
                        {/*) : null}*/}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className={'border-b border-[#eee] p-2 dark:border-strokedark'}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
