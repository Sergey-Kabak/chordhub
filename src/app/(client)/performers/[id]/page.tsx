'use server'

import {currentDomain} from "@/app/utils/server";
import { List } from '@/app/(client)/components/list.tsx'
import { createClient } from "@/app/utils/supabase/server.ts";

export default async function songPage ({ params } : { params: Promise<{ id: string }> }) {

    const routeParams = await params;

  const supabase = await createClient()

  let { data: performer } = await supabase
    .from('performers')
    .select('*')
    .eq('id', routeParams?.id)

  let { data: songs } = await supabase
    .from('songs')
    .select('*')
    .eq('performerId', routeParams?.id)

  console.log(songs);

  return (
      <div className={'grid p-4'}>
        {performer?.[0]?.name}
          <List data={songs} />
      </div>
    )
}