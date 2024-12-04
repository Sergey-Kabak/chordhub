'use client'

import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image}  from "@nextui-org/react";
import NextLink from "next/link";
import { SongType } from "@/types/song.ts";

type ListProps = {
    data: SongType[],
}

export const List = ({ data }: ListProps) => {
  return data ? (
    <div className={'grid gap-2 max-w-[640px]'}>
      {
        data.map(song => (
          <Card key={song.id} className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">{song.name}</p>
                <p className="text-small text-default-500">{song.performer.name}</p>
              </div>
            </CardHeader>
            <Divider/>
            <CardBody>
              {/*<p>{song.tonalities}</p>*/}
            </CardBody>
            <Divider/>
            <CardFooter>
              <Link
                as={NextLink}
                href={`/list/${song.id}`}
              >
                client
              </Link>
              <Divider orientation={'vertical'} className={'mx-4'} />
              <Link
                as={NextLink}
                href={`/dashboard/songs/${song.id}`}
              >
                edit
              </Link>
            </CardFooter>
          </Card>
        ))
      }
    </div>
  ) : null
}