'use client';

import { FC } from 'react';
import {Card, CardHeader, CardBody, Divider, Image, Pagination} from '@heroui/react';
import NextLink from 'next/link';
import { SongType } from '@/types/song.ts';
import { PerformerType } from '@/types/performer.ts';
import {PropsWithChildren, Suspense, useEffect, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";

type ListProps = {
  showPagination?: boolean;
  count?: number;
  page?: string;
};

const List: FC<PropsWithChildren<ListProps>> = ({ children, showPagination = false, count = 0, page = '1' }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(page || 1);
    useEffect(() => {
    const createQueryString =
        (name: string, value: string) => {
          const params = new URLSearchParams();
          params.set(name, value)
          const search = params.toString();
          const query = search ? `?${search}` : "";
          router.push(`${pathname}${query}`);
        }

    if (currentPage == 1) {
      router.push(pathname)
    } else {
      createQueryString('page', currentPage.toString())
    }
  }, [router, pathname, currentPage])



  return (
    <>
        <div className={'grid grid-cols-4 gap-4'}>
            {children}
        </div>
        {showPagination && (
            <Pagination className={'mt-8'} variant={'light'} showControls={true} page={+currentPage} total={Math.floor(count / 10)} onChange={setCurrentPage} />
        )}
    </>
  );
};


export const SongCard = ({ song }: { song: SongType }) => {
    return (
        <Card key={song.id} className="" as={NextLink} href={`/songs/${song.id}`}>
            <CardHeader className="flex gap-3">
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
                            '[&_pre]:text-sm [&_pre]:font-thin [&_pre]:overflow-hidden [&_pre]:-webkit-box [&_pre]:max-w-[200px] [&_pre]:line-clamp-[5] [&_pre]:-webkit-box-orient-[vertical]'
                        }
                        dangerouslySetInnerHTML={{ __html: song.content }}
                    ></div>
                </Suspense>
            </CardBody>
            <Divider />
        </Card>
    )
}

export const PerformerCard = ({ performer }: { performer: PerformerType }) => {
    return (
        <Card className="py-4" as={NextLink} href={`/performers/${performer?.id}`}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <small className="font-bold text-sm">{performer?.name}</small>
                <small className="text-default-500">{performer?.songs?.[0]?.count} Tracks</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={performer?.image}
                />
            </CardBody>
        </Card>
    )
}

export default List;