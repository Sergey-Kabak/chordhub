'use server'

import { currentDomain } from "@/app/utils/server";
import { SongEdit } from "@/app/(dashboard)/dashboard/songs/[id]/components/song-edit.tsx";

export default async function dashboardSongPage ({ params } : { params: Record<string, unknown> }) {

  const domain = await currentDomain()

  const routeParams = await params;

  const data = await fetch(domain + `/api/songs/${routeParams?.id}`, {
    method: 'GET'
  });

  const result = await data.json();

  return (
    <div>
      <SongEdit data={result.data} />
    </div>
  )
}