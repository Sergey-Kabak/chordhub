import { addPerformer, getPerformers } from "@/app/api/performers/controller.ts";
import { createClient } from '@/app/utils/supabase/server'
import { NextRequest } from "next/server";



export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page")
  console.log(request.nextUrl);
  console.log(page);

  const supabase = await createClient()



  let { data: performers, count, error } = await supabase
    .from('performers')
    .select('*', { count: 'exact', head: false })
    .range(0, 9)


  // const result = await getPerformers()

  return Response.json({ data: {
      performers, count
    }  })
}

export async function POST(request: Request) {

  const performers = await request.json()

  // const supabase = await createClient()
  //
  // const { data, error } = await supabase
  //   .from('performers')
  //   .insert([
  //     ...performers
  //   ])
  //   .select()

  // const result = await addPerformer(performer)

  return Response.json({ data: [] })
}