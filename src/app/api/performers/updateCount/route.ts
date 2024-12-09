import { updateSongsCount } from "@/app/api/performers/controller.ts";

export async function GET () {
  await updateSongsCount()
  return Response.json({ status: 'ok' })
}