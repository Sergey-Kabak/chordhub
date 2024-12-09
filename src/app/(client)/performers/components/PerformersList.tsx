'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardHeader, CardBody, Image, Pagination, Button } from "@nextui-org/react";

import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const PerformersList = ({ list, count }: {list: Record<string, string>[], count: number}) => {
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
      <div className={'grid gap-4 grid-cols-[repeat(5,260px)] m-auto'}>
        {list.map((item) => (
          <Card key={item.id} className="py-4" as={NextLink} href={`/performers/${item.id}`}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              {/*<p className="text-tiny uppercase font-bold">Daily Mix</p>*/}
              <small className="font-bold text-sm">{item.name}</small>
              {/*<small className="text-default-500">{item.count} Tracks</small>*/}
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={item.image}
              />
            </CardBody>
          </Card>
        ))}
      </div>
      <div className={'mt-2'}></div>
      <Pagination color="secondary" page={currentPage} total={Math.floor(count / 10)} onChange={setCurrentPage} />
      <div className="flex gap-2">
        <Button
          color="secondary"
          size="sm"
          variant="flat"
          onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </Button>
        <Button
          color="secondary"
          size="sm"
          variant="flat"
          onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}