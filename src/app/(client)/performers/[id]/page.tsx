'use server'

import { List } from '@/app/(client)/components/list.tsx'
import { createClient } from "@/app/utils/supabase/server.ts";
import { SongType } from "@/types/song.ts";

export default async function songPage ({ params } : { params: Promise<{ id: string }> }) {

    const routeParams = await params;

  const supabase = await createClient()

  const { data: performers } = await supabase
    .from('performers')
    .select('*')
    .eq('id', routeParams?.id)

  const { data: songs } = await supabase
    .from('songs')
    .select('*')
    .eq('performerId', routeParams?.id)

  return (
      <div className={'grid p-4'}>
        {performers?.[0]?.name}
          <List data={songs as SongType[]} />
      </div>
    )
}