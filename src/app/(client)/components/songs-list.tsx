'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pagination } from "@heroui/react";
import { List } from "@/app/(client)/components/list.tsx";
import { SongType } from '@/types/song.ts'

export const SongsList = ({ list, count }: { list: SongType[], count: number }) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams()

  const page = searchParams.get('page')

  const [currentPage, setCurrentPage] = useState(page || 1);

  useEffect(() => {
    const createQueryString =
      (name: string, value: string) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
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
  }, [pathname, router, currentPage])

  return (
    <div>
      <List data={list || []}/>
      <div className={'p-4'}></div>
      <Pagination
          classNames={{ base: 'm-0'}} variant={'light'}
          showControls page={+currentPage} total={Math.floor(count / 12)} onChange={setCurrentPage}/>
    </div>
  )
}