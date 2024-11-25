import {getList, addSong} from "@/firebase/addData.ts";

export async function GET() {

    const songs = await getList()

    return Response.json({ data: songs })
}

export async function POST(request: Request) {

    const song = await request.json()

    const result = await addSong(song)
    console.log(result);
    return Response.json({ data: null })
}