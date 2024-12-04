'use client'

import { Listbox, ListboxItem } from '@nextui-org/react';
import NextLink from "next/link";

export const Navigation = () => {
    const links = [
        {
            path: 'categories',
            label: 'categories'
        },
        {
            path: 'performers',
            label: 'performers'
        },
        {
            path: 'albums',
            label: 'albums'
        },
        {
            path: 'songs',
            label: 'songs'
        },
        {
            path: 'import',
            label: 'import'
        },

    ]
    return (
        <Listbox aria-label="dashboard-navigation" classNames={{
            base: 'border-r-1'
        }}>
            {links.map(link => (
                <ListboxItem key={link.path} as={NextLink} href={`/dashboard/${link.path}`}>
                    {link.label}
                </ListboxItem>
            ))}
        </Listbox>
    )
}