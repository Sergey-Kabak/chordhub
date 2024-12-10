'use server'

import { Tonalities} from "@/app/(client)/performers/[id]/components/tonalities.tsx";
import { createClient } from "@/app/utils/supabase/server.ts";


export default async function SongPage ({ params } : { params: Promise<{ id: string }> }) {
  const routeParams = await params;

  const supabase = await createClient()

  const { data: songs } = await supabase
    .from('songs')
    .select(`*,
      performers (*, songs(count))
    `)
    .eq('id', routeParams?.id)

  return (
    <div>
      <Tonalities song={songs?.[0]} />
    </div>
  )
}