import { Pagination, Select, SelectItem } from '@heroui/react';
import { useState } from 'react';

import { PaginationState, PaginationOptions, Table } from '@tanstack/react-table';

type TablePaginationProps = {
  pagination: PaginationState;
  paginationOptions: PaginationOptions;
  table: Table<any>;
};

export const pageSizes = [
  { key: '10', label: '10' },
  { key: '25', label: '25' },
  { key: '50', label: '50' },
];

export const TablePagination = ({ pagination, paginationOptions, table }: TablePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(pagination.pageIndex || 1);
  const [value, setValue] = useState(new Set([(pagination.pageSize || pageSizes[0].key).toString()]));

  const setPage = (page: number) => {
    setCurrentPage(page);
    table.setPageIndex(page);
  };

  const setSize = (size: any) => {
    setValue(size);
    table.setPageIndex(0);
    table.setPageSize(Number(size.currentKey));
  };

  return (
    <div className="grid grid-cols-[auto_128px_1fr] gap-4 items-center py-2">
      <Pagination
        key={'top-pagination'}
        variant={'light'}
        showControls
        page={currentPage}
        onChange={setPage}
        total={table.getPageCount()}
      />
      <Select
        className={'relative top-[-8px]'}
        label="К-сть рядків"
        labelPlacement={'outside'}
        selectedKeys={value}
        size={'sm'}
        variant="bordered"
        onSelectionChange={setSize}
      >
        {pageSizes.map((size) => (
          <SelectItem key={size.key}>{size.label}</SelectItem>
        ))}
      </Select>
      <span className={'ml-auto'}>Total: <b>{paginationOptions.rowCount}</b></span>
    </div>
  );
};
