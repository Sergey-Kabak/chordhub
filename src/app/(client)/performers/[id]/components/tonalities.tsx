'use client'

import { Divider, Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { SongType } from "@/types/song.ts";
import { PerformerCard } from '@/app/(client)/performers/components/performer-card.tsx'
import { ReactNode } from "react";
import parse, { DOMNode, Element } from 'html-react-parser';

export const TestEl = ({ initialValue } : { initialValue: string }): ReactNode => {
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button>{initialValue}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">{initialValue}</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const Tonalities = ({ song } : { song: SongType}) => {


  const options = {
    replace(domNode: DOMNode) {
      if (domNode instanceof Element && domNode?.attribs?.['data-chord']) {
        return <TestEl initialValue={Object.values(domNode?.attribs)[0] as string}/>
      }
    },
  };

  return  (
    <div className={'max-w-[640px] py-4 w-full m-auto'}>
      <h1 className={'mb-4'}>{song.name}</h1>
      <PerformerCard performer={song.performers} />
      <Divider className={'my-4'} />
      {/*<div dangerouslySetInnerHTML={{__html: song.content}}></div>*/}
      {parse(song.content, options)}
    </div>
  )
}