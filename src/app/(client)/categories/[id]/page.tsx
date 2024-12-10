'use server'

import { createClient } from "@/app/utils/supabase/server.ts";
import { List } from "@/app/(client)/components/list.tsx";
import { SongType } from "@/types/song.ts";

export default async function CategoryPage ({ params }: { params: Promise<{ id: string }>}) {
  const _params = await params;

  const id = _params.id

  const supabase = await createClient()

  const { data: category } = await supabase
    .from('categories')
    .select(`*`)
    .eq('id', id)

  const { data } = await supabase
    .from('songs')
    .select(`*,
      performers (*)
    `)
    .contains('categories', [id])
    .limit(10)

  return (
    <div>
      {category?.[0]?.name}
      {data ? (
        <div className={'grid p-4'}>
          <List data={data as SongType[]}/>
        </div>
      ) : null}
    </div>
  )
}