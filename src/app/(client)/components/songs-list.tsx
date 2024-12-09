'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { List } from "@/app/(client)/components/list.tsx";

export const SongsList = ({ list, count }: { list: unknown[], count: number }) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams()

  const page = searchParams.get('page')

  const [currentPage, setCurrentPage] = useState(page || 1);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set(name, value)
      const search = params.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    },
    [searchParams]
  )

  useEffect(() => {
    console.log(currentPage);
    if (currentPage == 1) {
      router.push(pathname)
    } else {
      createQueryString('page', currentPage.toString())
    }
  }, [currentPage])

  return (
    <div>
      <List data={list || []}/>
      <Pagination color="secondary" page={+currentPage} total={Math.floor(count / 10)} onChange={setCurrentPage} />
    </div>
  )
}