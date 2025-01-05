import { useCallback, useEffect, useState } from 'react'
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
} from '@tanstack/react-table'
import { DebouncedInput } from './debouncedInput'


type Props<T extends Record<string, string | number>> = {
  data: T[]
  columns: ColumnDef<T>[]
  pagination: PaginationState
  paginationOptions: Pick<PaginationOptions, 'onPaginationChange' | 'rowCount'>
  filters: Partial<T>
  onFilterChange: (dataFilters: Partial<T>) => void
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
}

export const Table = <T extends Record<string, string | number>>({
                                                                           data,
                                                                           columns,
                                                                           pagination,
                                                                           paginationOptions,
                                                                           filters,
                                                                           onFilterChange,
                                                                           sorting,
                                                                           onSortingChange,
                                                                         }: Props<T>) => {

  const transformFilters = useCallback(() => {
    return Object.keys(filters).map((key) => {
      if (key === 'id') {
        return  {
          'id': key,
          'value': [+filters[key], +filters[key]]
        }
      }

      return {
        'id': key,
        'value': filters[key]
      }
    })
  }, [filters])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    transformFilters()
  )

  useEffect(() => {
    setColumnFilters(transformFilters())
  }, [transformFilters]);

  console.log('columnFilters:', columnFilters);

  const table = useReactTable({
    data,
    columns,
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
  })

  return (
    <div>
      <table >
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className={'bg-gray-2 text-left dark:bg-meta-4'}>
            {headerGroup.headers.map(header => {
              const fieldMeta = header.column.columnDef.meta
              return (
                <th key={header.id} colSpan={header.colSpan} className={'px-4 py-4 font-medium text-black dark:text-white'}>
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
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                                 fill="none">
                              <path d="M4 8H13" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                              <path opacity="0.7" d="M6 13H13" stroke="#1C274C" stroke-width="1.5"
                                    stroke-linecap="round"/>
                              <path opacity="0.4" d="M8 18H13" stroke="#1C274C" stroke-width="1.5"
                                    stroke-linecap="round"/>
                              <path d="M17 20V4L20 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"/>
                            </svg>
                          ),
                          desc: (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                                 fill="none">
                              <path d="M4 16L13 16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                              <path opacity="0.7" d="M6 11H13" stroke="#1C274C" stroke-width="1.5"
                                    stroke-linecap="round"/>
                              <path opacity="0.3" d="M8 6L13 6" stroke="#1C274C" stroke-width="1.5"
                                    stroke-linecap="round"/>
                              <path d="M17 4L17 20L20 16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"/>
                            </svg>
                          ),
                          false: (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
                                 fill="none">
                              <path d="M22 7L2 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                              <path opacity="0.5" d="M19 12L5 12" stroke="#1C274C" stroke-width="1.5"
                                    stroke-linecap="round"/>
                              <path d="M16 17H8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() &&
                      fieldMeta?.filterKey !== undefined ? (
                        <DebouncedInput
                          className="p-2 w-full border shadow rounded"
                          onChange={value => {
                            onFilterChange({
                              [fieldMeta.filterKey as keyof T]: value,
                            } as Partial<T>)
                          }}
                          placeholder="Search..."
                          type={
                            fieldMeta.filterVariant === 'number'
                              ? 'number'
                              : 'text'
                          }
                          value={filters[fieldMeta.filterKey] ?? ''}
                        />
                      ) : null}
                    </>
                  )}
                </th>
              )
            })}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => {
                return (
                  <td key={cell.id} className={'border-b border-[#eee] px-4 py-4 dark:border-strokedark'}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                )
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
      <div className="flex items-center gap-2 my-2">
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
