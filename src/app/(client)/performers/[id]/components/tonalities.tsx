'use client'

import { Divider } from "@nextui-org/react";
import { SongType } from "@/types/song.ts";
import { PerformerCard } from '@/app/(client)/performers/components/performer-card.tsx'

export const Tonalities = ({ song } : { song: SongType}) => {
  return  (
    <div className={'max-w-[640px] py-4 w-full m-auto'}>
      <h1 className={'mb-4'}>{song.name}</h1>
      <PerformerCard performer={song.performers} />
      <Divider className={'my-4'} />
      <div dangerouslySetInnerHTML={{__html: song.content}}></div>
    </div>
  )
}