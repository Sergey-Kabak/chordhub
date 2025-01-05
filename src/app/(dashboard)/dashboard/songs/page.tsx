'use server';

import { createClient } from "@/app/utils/supabase/server.ts";
import Breadcrumb from "@/app/(dashboard)/components/Breadcrumbs/Breadcrumb.tsx";
import { SongsTable } from "@/app/(dashboard)/dashboard/songs/components/songs-table.tsx";

export default async function SongsPage () {

  const supabase = await createClient()
  const page = 1;
  const { data: songs, count } = await supabase
    .from('songs')
    .select(`*,
      performers (*)
    `, { count: 'exact', head: false })
    .range((+page - 1) * 10, ((+page - 1) * 10) + 9)
    .order('id', { ascending: true })

  console.log(count);

  return (
    <div>
      <Breadcrumb pageName="Songs" />

      <div className="flex flex-col gap-10">
        <div
          className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <SongsTable data={songs || []}/>
          </div>
        </div>
        {/*<TableThree keys={['id', 'name', 'performerId', 'categories', 'created_at']} data={songs || []}/>*/}
      </div>
    </div>
  )
}