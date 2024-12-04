'use client'

import { Pagination, Divider } from "@nextui-org/react";
import { useState } from "react";

export const Tonalities = ({ list } : { list: string[]}) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={'max-w-[640px] w-full m-auto'}>
      <Pagination
        key={'flat'}
        total={list.length}
        variant={'flat'}
        page={currentPage}
        onChange={setCurrentPage}
      />
      <Divider className={'my-4'} />
      <div dangerouslySetInnerHTML={{__html: list[currentPage - 1]}}></div>
    </div>
  )
}