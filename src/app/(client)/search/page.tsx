'use server'

import { List } from '../components/list.tsx'
import { createClient } from "@/app/utils/supabase/server.ts";
import { PerformerCard } from "@/app/(client)/performers/components/performer-card.tsx";

export default async function SearchPage ({ searchParams }: { searchParams: Promise<{query: unknown}>}) {
    const _searchParams = await searchParams

    const search = _searchParams?.query

    const supabase = await createClient()

    const { data: songs } = await supabase
      .from('songs')
      .select(`*,
          performers (*)
        `)
      .ilike('name', `%${search}%`)

    const { data: performers } = await supabase
      .from('performers')
      .select('*, songs(count)')
      .ilike('name', `%${search}%`)

    return (
      <div className={'grid p-4'}>
          {songs?.length ? (
            <div>
                songs:
                <hr/>
                <List data={songs}/>
            </div>
          ) : null}

          {performers?.length ? (
            <div>
                performers:
                <hr/>
                <div className={'grid grid-cols-2 gap-4'}>
                    {performers.map((item) => (
                      <PerformerCard key={item.id} performer={item} />
                    ))}
                </div>
            </div>
          ) : null}
      </div>
    )
}