'use client'

import { List } from './components/list.tsx';
import {useEffect, useState} from "react";

export default function ListPage () {

    const [list, setList] = useState<Record<string, string>[]>([])

    console.log(list);

    useEffect(() => {
        fetch('http://localhost:3000/api/songs', { method: 'GET' })
            .then(res => res.json()
                .then(({data}) => setList(data)));

    }, []);

    return (
        <div className={'grid p-4'}>
            <List data={list} />
        </div>
    )
}