'use server'

import { List } from '../components/list.tsx'
import { createClient } from "@/app/utils/supabase/server.ts";

export default async function SearchPage ({ searchParams }: { searchParams: Promise<unknown> }) {
    const _searchParams = await searchParams

    const search = _searchParams?.query
    console.log(_searchParams);
    const supabase = await createClient()

    let { data: songs } = await supabase
      .from('songs')
      .select('*')
      .like('name', `%${search}%`)

    return (
      <div className={'grid p-4'}>
        <List data={songs || []}/>
      </div>
    )
}