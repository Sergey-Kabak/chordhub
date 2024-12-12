'use server';

import { createClient } from "@/app/utils/supabase/server.ts";
import Breadcrumb from "@/app/(dashboard)/components/Breadcrumbs/Breadcrumb.tsx";
import TableThree from "@/app/(dashboard)/components/Tables/TableThree.tsx";

export default async function DashboardCategories () {

  const supabase = await createClient()

  const { data: performers } = await supabase
    .from('performers')
    .select(`*`)

  return (
    <div>
      <Breadcrumb pageName="Performers" />

      <div className="flex flex-col gap-10">
        <TableThree keys={['id', 'image', 'name', 'description', 'created_at']} data={performers || []} />
      </div>
    </div>
  )
}