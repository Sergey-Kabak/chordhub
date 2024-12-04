'use server'

import { currentDomain } from "@/app/utils/server";
import { List } from "@/app/(client)/components/list.tsx";

export default async function DashboardSongs () {
    const domain = await currentDomain()
    const data = await fetch(domain + '/api/songs', {
        method: 'GET'
    })

    const result = await data.json()

    return (
      <div className={'grid p-4'}>
          <List data={result?.data || []} />
      </div>
    )
}