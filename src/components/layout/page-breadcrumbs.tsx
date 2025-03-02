'use client'

import {Breadcrumbs, BreadcrumbItem, BreadcrumbsProps } from "@heroui/react";


export const PageBreadcrumbs = ({ isDashboard = false, path = [] }: { isDashboard?: boolean, path?: Record<string, string>}[] ) => {
    const basePath = isDashboard ? '/dashboard' : '/';

    const defaultPath = [
        {
            label: isDashboard ? 'Dashboard' : process.env.NEXT_PUBLIC_PROJECT_NAME,
            link: '',
        }
    ]

    return (
        <Breadcrumbs variant={'light'}>
            {
                [...defaultPath, ...path].map((item, key) => (
                    <BreadcrumbItem key={`breadcrumb_${key}`} href={basePath + item.link}>{item.label}</BreadcrumbItem>
                ))
            }
        </Breadcrumbs>
    )
}