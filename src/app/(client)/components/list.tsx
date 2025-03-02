'use client';

import { Card, CardHeader, CardBody, Divider, Image } from '@heroui/react';
import NextLink from 'next/link';
import { SongType } from '@/types/song.ts';
import { Suspense } from 'react';

type ListProps = {
  data: SongType[];
};

export const List = ({ data }: ListProps) => {
  return data ? (
    <div className={'grid grid-cols-4 gap-4'}>
      {data.map((song) => (
        <Card key={song.id} className="" as={NextLink} href={`/songs/${song.id}`}>
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div>
              <p>{song.name}</p>
              <p className={'text-sm text-foreground-500'}>{song?.performers?.name}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Suspense>
              <div
                className={
                  '[&_pre]:text-sm [&_pre]:overflow-hidden [&_pre]:-webkit-box [&_pre]:max-w-[200px] [&_pre]:line-clamp-[6] [&_pre]:-webkit-box-orient-[vertical]'
                }
                dangerouslySetInnerHTML={{ __html: song.content }}
              ></div>
            </Suspense>
          </CardBody>
          <Divider />
        </Card>
      ))}
    </div>
  ) : null;
};
