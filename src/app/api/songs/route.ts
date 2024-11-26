import {getList, addSong} from "./controller.ts";

export async function GET() {

    const songs = await getList()

    return Response.json({ data: songs })
}

export async function POST(request: Request) {

    const song = await request.json()

    const result = await addSong(song)

    return Response.json({ data: result })
}