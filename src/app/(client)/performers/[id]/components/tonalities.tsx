'use client'

import { Divider } from "@nextui-org/react";

export const Tonalities = ({ content } : { content: string}) => {
  return  (
    <div className={'max-w-[640px] w-full m-auto'}>
      <Divider className={'my-4'} />
      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
  )
}