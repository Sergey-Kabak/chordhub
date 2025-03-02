'use server';

import { createClient } from '@/app/utils/supabase/server.ts';
import Breadcrumb from '@/app/(dashboard)/components/Breadcrumbs/Breadcrumb.tsx';
import { CategoriesTable } from '@/app/(dashboard)/dashboard/categories/components/categories-table.tsx';
import { omit } from 'lodash';
import {PageBreadcrumbs} from "@/components/layout";
import {Button} from "@heroui/react";

type SearchProps = {
  pageIndex?: number;
  pageSize?: number;
  name?: string;
};

export default async function DashboardCategories({ searchParams }: { searchParams: Promise<SearchProps> }) {
  const supabase = await createClient();

  const params = await searchParams;
  const filters = omit(params, ['pageIndex', 'pageSize', 'sortBy']);

  const page = (+params?.pageIndex || 1) - 1;
  const pageSize = +(params?.pageSize || 10);

  const { data: categories, count } = await supabase
    .from('categories')
    .select(`*`, { count: 'exact', head: false })
    .ilike('name', `%${filters?.name || ''}%`)
    .range(+page * pageSize, +page * pageSize + pageSize)
    .order('id', { ascending: true });

  return (
    <>
      <div className={'grid grid-cols-[1fr_auto] items-center mb-8'}>
        <PageBreadcrumbs path={[
          {
            label: 'Categories',
            link: '/categories',
          }
        ]} isDashboard={true} />
        <Button size={'sm'} variant={'bordered'} radius={'full'} color={'primary'}>Create</Button>
      </div>
      <CategoriesTable data={categories || []} total={count || 0} />
    </>
  );
}
