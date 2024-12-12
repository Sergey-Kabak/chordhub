'use server';

import { createClient } from "@/app/utils/supabase/server.ts";
import Breadcrumb from "@/app/(dashboard)/components/Breadcrumbs/Breadcrumb.tsx";
import TableThree from "@/app/(dashboard)/components/Tables/TableThree.tsx";

export default async function DashboardCategories () {

  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select(`*`)

  return (
    <div>
      <Breadcrumb pageName="Categories" />

      <div className="flex flex-col gap-10">
        <TableThree keys={['id', 'name', 'created_at']} data={categories || []} />
      </div>
    </div>
  )
}