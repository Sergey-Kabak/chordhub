import { List } from '@/app/list/components/list.tsx'



export default async function SearchPage ({ searchParams }) {

    const params = await searchParams

    const data = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        body: JSON.stringify(params),
    })

    const result = await data.json()

    return (
        <div>
            <List data={result?.data || []} />
        </div>
    )
}