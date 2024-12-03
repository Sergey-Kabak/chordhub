'use server'

import { List } from '../components/list.tsx'
import {currentDomain} from "@/app/utils/server";

export default async function SearchPage ({ searchParams }: { searchParams: Promise<unknown> }) {
    const _searchParams = await searchParams
    const domain = await currentDomain()

    const data = await fetch(domain + '/api/search', {
        method: 'POST',
        body: JSON.stringify(_searchParams),
    })

    const result = await data.json()

    return (
      <div className={'grid p-4'}>
        <List data={result?.data || []}/>
      </div>
    )
}