import List, {SongCard} from "@/app/(client)/components/list.tsx";
import {Section} from "@/app/(client)/components/section";
import {createClient} from "@/app/utils/supabase/server.ts";

export default async function SongsPage ({ searchParams }: { searchParams: Promise<{ page: unknown }> }) {

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

    return (
        <Section title={'Songs'}>
            <List showPagination={true} count={count as number} page={page as string}>
                {(data || []).map(song => <SongCard key={`song_${song.id}`} song={song} />)}
            </List>
        </Section>
    )
}