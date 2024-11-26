import {searchQuery} from "./controller.ts";

export async function POST(request: Request) {

    const value = await request.json()

    const result = await searchQuery(value.query);

    return Response.json({ data: result })
}