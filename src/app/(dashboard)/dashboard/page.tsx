'use server';

import { createClient } from "@/app/utils/supabase/server.ts";
import Breadcrumb from "@/app/(dashboard)/components/Breadcrumbs/Breadcrumb.tsx";
import TableThree from "@/app/(dashboard)/components/Tables/TableThree.tsx";

export default async function Home () {

  const supabase = await createClient()

  const { data: songs } = await supabase
    .from('songs')
    .select(`*,
      performers (*)
    `)

  return (
    <div>
      <Breadcrumb pageName="Songs" />

      <div className="flex flex-col gap-10">
        <TableThree keys={['id', 'name', 'performerId', 'categories', 'created_at']} data={songs || []} />
      </div>
    </div>
  )
}