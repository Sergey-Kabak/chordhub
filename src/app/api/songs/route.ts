import { getList, addSong, updateOne } from "./controller.ts";
import { NextRequest } from "next/server";

export async function GET() {

    const songs = await getList()

    return Response.json({ data: songs })
}

export async function POST(request: Request) {
    const song = await request.json()

    const result = await addSong(song)

    return Response.json({ data: result })
}

export async function PUT(request: Request) {
    const song = await request.json()

    const result = await updateOne(song.id, song)

    return Response.json({ data: result })
}