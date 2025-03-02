'use client'

import { useMemo } from 'react';
import { Table } from "@/features/table";
import { useFilters } from '@/features/table/hooks/use-filters.tsx'
import { sortByToState, stateToSortBy } from '@/features/table/utils/tableSortMapper'
import { COLUMNS } from '../songs.utils.tsx'
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_PAGE_SIZE = 10;

export const SongsTable = ({ data, total } : { data: Record<string, never>[], total: number}) => {

  const router = useRouter();
  const pathname = usePathname();
  const { filters, setFilters } = useFilters(pathname)

  const paginationState = {
    pageIndex: +(filters?.pageIndex || DEFAULT_PAGE_INDEX),
    pageSize: +(filters?.pageSize || DEFAULT_PAGE_SIZE),
  }

  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => COLUMNS(router), [])

    return (
    <Table
      data={data ?? []}
      columns={columns}
      pagination={paginationState}
      paginationOptions={{
        onPaginationChange: pagination => {
          setFilters(
            typeof pagination === 'function'
              ? pagination(paginationState)
              : pagination
          )
        },
        rowCount: total,
      }}
      filters={filters}
      onFilterChange={filters => setFilters(filters)}
      sorting={sortingState}
      onSortingChange={updaterOrValue => {
        const newSortingState =
          typeof updaterOrValue === 'function'
            ? updaterOrValue(sortingState)
            : updaterOrValue
        return setFilters({ sortBy: stateToSortBy(newSortingState) })
      }}
    />
  )
}