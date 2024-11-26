import {getOne} from "../controller.ts";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest, res: Response) {
    const id = req.url.match(/\w+$/)?.[0]
    const song = await getOne(id as string)

    return Response.json({ data: song })
}