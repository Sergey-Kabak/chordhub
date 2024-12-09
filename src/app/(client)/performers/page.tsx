'use server'

import { PerformersList } from "@/app/(client)/performers/components/PerformersList.tsx";
import { createClient } from "@/app/utils/supabase/server.ts";
import { PerformerType } from "@/types/performer.ts";


export default async function PerformersPage ({ searchParams }: { searchParams: Promise<{ page: unknown }> }) {

  const params = await searchParams
  const page = params?.page || '1'

  const supabase = await createClient()

  const { data, count } = await supabase
    .from('performers')
    .select('*', { count: 'exact', head: false })
    .range((+page - 1) * 10, ((+page - 1) * 10) + 9)

    return (
      <div className={'grid p-4'}>
          <PerformersList list={data as PerformerType[]} count={count as number} />
      </div>
    )
}