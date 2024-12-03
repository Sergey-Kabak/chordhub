'use server'

import {currentDomain} from "@/app/utils/server";

export default async function songPage ({ params } : { params: Promise<{ id: string }> }) {
    const domain = await currentDomain()

    const routeParams = await params;

    const data = await fetch(domain + `/api/songs/${routeParams?.id}`, {
        method: 'GET'
    });

    const result = await data.json();


    return (
      <div className={'grid p-4'}>
          <div className={'max-w-[640px] w-full m-auto'}>
              <div dangerouslySetInnerHTML={{__html: result?.data?.content}}></div>
          </div>
      </div>
    )
}