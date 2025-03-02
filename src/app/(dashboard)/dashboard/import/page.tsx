'use server'

import { ImportComponent } from "@/app/(dashboard)/dashboard/import/components/import.tsx";
import {PageBreadcrumbs} from "@/components/layout";

export default async function ImportPage () {
  return (
    <>
        <div className={'grid grid-cols-[1fr_auto] items-center mb-8'}>
            <PageBreadcrumbs path={[
                {
                    label: 'Import',
                    link: '/import',
                }
            ]} isDashboard={true} />
        </div>

      <ImportComponent/>
    </>
  )
}