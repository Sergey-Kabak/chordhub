'use client'

import { useEffect, useState } from 'react'
import { Pagination, Button } from "@heroui/react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PerformerType } from "@/types/performer.ts";
import { PerformerCard } from "@/app/(client)/performers/components/performer-card.tsx";

export const PerformersList = ({ list, count }: {list: PerformerType[], count: number}) => {
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
  }, [router, pathname, currentPage])

  return (
    <div>
      <div className={'block columns-4 [&>a]:mb-4'}>
        {list.map((item) => (
          <PerformerCard key={item.id} performer={item} />
        ))}
      </div>
      <div className={'mt-2'}></div>
      <Pagination color="secondary" page={+currentPage} total={Math.floor(count / 10)} onChange={setCurrentPage} />
      <div className="flex gap-2">
        <Button
          color="secondary"
          size="sm"
          variant="flat"
          onPress={() => setCurrentPage((prev) => (prev as number > 1 ? prev as number - 1 : prev))}
        >
          Previous
        </Button>
        <Button
          color="secondary"
          size="sm"
          variant="flat"
          onPress={() => setCurrentPage((prev) => (prev as number < 10 ? prev as number + 1 : prev))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}