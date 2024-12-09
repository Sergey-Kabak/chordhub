'use client'

import { Pagination, Divider } from "@nextui-org/react";
import { useState } from "react";

export const Tonalities = ({ content } : { content: string}) => {
  // const [currentPage, setCurrentPage] = useState(1);

  console.log(content);
  return  (
    <div className={'max-w-[640px] w-full m-auto'}>
      {/*<Pagination*/}
      {/*  key={'flat'}*/}
      {/*  total={list.length}*/}
      {/*  variant={'flat'}*/}
      {/*  page={currentPage}*/}
      {/*  onChange={setCurrentPage}*/}
      {/*/>*/}
      <Divider className={'my-4'} />
      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
  )
}