'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
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
      <Pagination color="secondary" page={+currentPage} total={Math.floor(count / 10)} onChange={setCurrentPage} />
    </div>
  )
}