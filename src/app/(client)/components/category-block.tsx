'use client'

import { SongType } from "@/types/song.ts";
import { List } from "@/app/(client)/components/list.tsx";
import NextLink from "next/link";

export const CategoryBlock = ({ data }: { data: {
    name: string,
    id: number,
    songs: SongType[],
  }
}) => {
  return (
    <div className={'grid'}>
      <h2>{data.name}</h2>
      <List data={data.songs} />
      <NextLink href={`categories/${data.id}`}>view all</NextLink>
    </div>
  )
}