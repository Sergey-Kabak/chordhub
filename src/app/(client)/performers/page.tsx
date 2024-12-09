'use server'

import {currentDomain} from "@/app/utils/server";
import { PerformersList } from "@/app/(client)/performers/components/PerformersList.tsx";
import { createClient } from "@/app/utils/supabase/server.ts";


export default async function PerformersPage ({ searchParams }) {

  const params = await searchParams
  const page = params?.page || '1'

  const supabase = await createClient()

  let { data, count, error } = await supabase
    .from('performers')
    .select('*', { count: 'exact', head: false })
    .range((+page - 1) * 10, ((+page - 1) * 10) + 9)

    return (
      <div className={'grid p-4'}>
          <PerformersList list={data} count={count} />
      </div>
    )
}