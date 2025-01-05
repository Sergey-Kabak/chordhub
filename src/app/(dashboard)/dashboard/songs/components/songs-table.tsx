'use client'

import { useMemo } from 'react';
import { Table } from "@/features/table";
import { createFileRoute } from '@tanstack/react-router'
import { useFilters } from '@/features/table/hooks/use-filters.tsx'
import { sortByToState, stateToSortBy } from '@/features/table/utils/tableSortMapper'
import { USER_COLUMNS } from '@/features/table/utils/userColumns'
import { usePathname } from "next/navigation";

const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_PAGE_SIZE = 10;

export const SongsTable = ({ data } : { data: Record<string, never>[]}) => {

  const pathname = usePathname()
  const { filters, resetFilters, setFilters } = useFilters(pathname)

  console.log('filters:', filters);

  // const { data } = useQuery({
  //   queryKey: ['users', filters],
  //   queryFn: () => fetchUsers(filters),
  //   placeholderData: keepPreviousData,
  // })

  const paginationState = {
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => USER_COLUMNS, [])


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
        rowCount: data?.rowCount,
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