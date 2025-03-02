'use server';

import List, { SongCard } from '@/app/(client)/components/list.tsx';
import { createClient } from '@/app/utils/supabase/server.ts';
import { Section } from '@/app/(client)/components/section';

export default async function PerformerPage ({ params }: { params: Promise<{ id: string; page: string }> }) {
  const routerParams = await params;
  const page = routerParams?.page || '1';

  const supabase = await createClient();

  const { data: performers } = await supabase.from('performers').select('*').eq('id', routerParams?.id);

  const { data: songs, count } = await supabase
    .from('songs')
    .select(
      `*,
      performers (*)
    `, { count: 'exact', head: false }
    )
    .eq('performerId', routerParams?.id);

  return (performers && songs) ? (
    <Section title={performers?.[0]?.name || ''}>
      <List showPagination={true} count={count as number} page={page as string}>
        {(songs || []).map((song) => (
          <SongCard key={`song_${song.id}`} song={song} />
        ))}
      </List>
    </Section>
  ) : null;
}
