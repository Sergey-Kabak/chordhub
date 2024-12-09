'use server'

import { List } from '../components/list.tsx'
import { createClient } from "@/app/utils/supabase/server.ts";

export default async function SearchPage ({ searchParams }: { searchParams: Promise<{query: unknown}>}) {
    const _searchParams = await searchParams

    const search = _searchParams?.query

    const supabase = await createClient()

    const { data: songs } = await supabase
      .from('songs')
      .select('*')
      .ilike('name', `%${search}%`)

    return (
      <div className={'grid p-4'}>
        <List data={songs || []}/>
      </div>
    )
}