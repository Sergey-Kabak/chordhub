'use server'

import { Tonalities} from "@/app/(client)/performers/[id]/components/tonalities.tsx";
import { currentDomain } from "@/app/utils/server";
import { createClient } from "@/app/utils/supabase/server.ts";


export default async function SongPage ({ params } : { params: Promise<{ id: string }> }) {
  const routeParams = await params;

  const supabase = await createClient()

  let { data: songs } = await supabase
    .from('songs')
    .select('*')
    .eq('id', routeParams?.id)

  return (
    <div>
      <Tonalities content={songs?.[0]?.content} />
    </div>
  )
}