'use server'

import {currentDomain} from "@/app/utils/server";
import { Tonalities } from "@/app/(client)/list/[id]/components/tonalities.tsx";

export default async function songPage ({ params } : { params: Promise<{ id: string }> }) {
    const domain = await currentDomain()

    const routeParams = await params;

    const data = await fetch(domain + `/api/songs/${routeParams?.id}`, {
        method: 'GET'
    });

    const result = await data.json();


    return (
      <div className={'grid p-4'}>
          <Tonalities content={result.data.content} />
      </div>
    )
}