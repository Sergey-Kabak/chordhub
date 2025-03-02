'use server'


import { createClient } from "@/app/utils/supabase/server.ts";
import {Section} from "@/app/(client)/components/section";
import List, { SongCard } from "@/app/(client)/components/list.tsx";
import {SongType} from "@/types/song.ts";

export default async function App({ searchParams }: { searchParams: Promise<{ page: unknown }> }) {
  const params = await searchParams
  const page = params?.page || '1'

  const supabase = await createClient()

  const { data, count } = await supabase
    .from('songs')
    .select(`*,
      performers (
        name
      )
    `, { count: 'exact', head: false })
    .range((+page - 1) * 12, ((+page - 1) * 12) + 11)

  const { data: categories } = await supabase
    .from('categories')
    .select('*')

  const { data: songsByCategory } = await supabase
    .from('songs')
    .select(`*,
      performers (
        name
      )
    `)
    .contains('categories', categories?.map(category => category.id) || [])
    .limit(10)

  const mappedCategories = new Map();

  categories?.forEach(category => {
    mappedCategories.set(category.id, {
      id: category.id,
      name: category.name,
      songs: songsByCategory?.filter(song => song.categories.includes(category.id)),
    });
  })

  return (
    <div>
      {
        [...mappedCategories.values()].map((value: {
          name: string,
          id: number,
          songs: SongType[]
        }) => {
          return (
              <Section key={value.id} title={value.name}>
                <List>
                  {(value?.songs || []).map(song => <SongCard key={song.id} song={song} />)}
                </List>
              </Section>
          )
        })
      }

      <Section title={'Songs'}>
        <List>
          {(data || []).map(song => <SongCard key={song.id} song={song} />)}
        </List>
      </Section>
    </div>
  );
}