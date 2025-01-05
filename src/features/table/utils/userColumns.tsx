import { ColumnDef, RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterKey?: keyof TData
    filterVariant?: 'text' | 'number'
  }
}

export const USER_COLUMNS: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: () => <span>ID</span>,
    meta: { filterKey: 'id', filterVariant: 'number' },
  },
  {
    accessorKey: 'name',
    header: () => <span>Name</span>,
    meta: { filterKey: 'name' },
  },
  {
    accessorKey: 'performerId',
    header: () => <span>performerId</span>,
    meta: { filterKey: 'performerId' },
  },
  {
    accessorKey: 'categories',
    header: () => <span>categories</span>,
    meta: { filterKey: 'categories' },
  },
  {
    accessorKey: 'created_at',
    header: () => <span>Created At</span>,
    meta: { filterKey: 'created_at' },
  }
]
