'use server'

import { createClient } from "@/app/utils/supabase/server.ts";
import List, { PerformerCard } from "@/app/(client)/components/list.tsx";
import {Section} from "@/app/(client)/components/section";


export default async function PerformersPage ({ searchParams }: { searchParams: Promise<{ page: unknown }> }) {

  const params = await searchParams
  const page = params?.page || '1'

  const supabase = await createClient()

  const { data, count } = await supabase
    .from('performers')
    .select('*, songs(count)', { count: 'exact', head: false })
    .range((+page - 1) * 10, ((+page - 1) * 10) + 9)

  return (
      <div>
          <Section title={'Performers'}>
              <List showPagination={true} page={page as string} count={count as number}>
                  {(data || []).map(performer => <PerformerCard key={performer.id} performer={performer} />)}
              </List>
          </Section>
          {/*<PerformersList list={data as PerformerType[]} count={count as number} />*/}
      </div>
    )
}