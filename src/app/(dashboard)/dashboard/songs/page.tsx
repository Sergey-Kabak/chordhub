'use server';

import { createClient } from "@/app/utils/supabase/server.ts";
import { PageBreadcrumbs } from "@/components/layout";
import { SongsTable } from "@/app/(dashboard)/dashboard/songs/components/songs-table.tsx";
import { omit } from "lodash";
import { Button } from "@heroui/react";

type SearchProps = {
  pageIndex?: number,
  pageSize?: number,
  name?: string,
  sortBy?: string
}
export default async function SongsPage ({ searchParams }: { searchParams: Promise<SearchProps> }) {

  const supabase = await createClient();
  const params = await searchParams

  const filters = omit(params, ['pageIndex', 'pageSize', 'sortBy'])
  const appliedSort = params?.sortBy
  const sort = {
    prop: appliedSort?.split('.')?.[0] || 'id',
    type: appliedSort ? (appliedSort?.split('.')?.[1] === 'asc' ? true : false) : true,
  }

  const page = (+params?.pageIndex || 1) - 1;
  const pageSize = +(params?.pageSize || 10);

  const { data: songs, count } = await supabase
    .from('songs')
    .select(
      `*,
      performers (*)
    `,
      { count: 'exact', head: false },
    )
    .ilike('name', `%${filters?.name || ''}%`)
    .range(+page * pageSize, +page * pageSize + pageSize)
    .order(sort.prop, { ascending: sort.type });

  return (
    <>
      <div className={'grid grid-cols-[1fr_auto] items-center mb-8'}>
        <PageBreadcrumbs path={[
          {
            label: 'Songs',
            link: '/songs',
          }
        ]} isDashboard={true} />
        <Button size={'sm'} variant={'bordered'} radius={'full'} color={'primary'}>Create</Button>
      </div>
      <SongsTable data={songs || []} total={count || 0} />
    </>
  )
}