'use server'

import { List } from '@/components/list.tsx';
import {currentDomain} from "@/app/utils/server";

export default async function ListPage () {
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