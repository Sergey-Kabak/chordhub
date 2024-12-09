'use server'

import { createClient } from "@/app/utils/supabase/server.ts";
import { SongsList } from '@/app/(client)/components/songs-list.tsx'
export default async function App({ searchParams }: { searchParams: Record<string, unknown> }) {
  const params = await searchParams
  const page = params?.page || '1'

  const supabase = await createClient()

  let { data, count, error } = await supabase
    .from('songs')
    .select('*', { count: 'exact', head: false })
    .range((+page - 1) * 10, ((+page - 1) * 10) + 9)

  return (
    <div
      className="py-4 grid w-full h-auto items-center justify-center">
      <div className={'max-w-[1024px] px-6'}>
        <h1 className={'mb-4'}>Songs</h1>
        <SongsList list={data} count={count} />
      </div>
    </div>
  );
}