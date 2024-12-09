import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from "@/firebase/config.ts";

export async function GET(req: Request) {
  const id = req.url.match(/\w+$/)?.[0];

  const docRef = doc(db, 'performers', id as string);
  const performer = await getDoc(docRef)

  const songRef = collection(db, `performers/${id}/songs`)
  const docs = await getDocs(songRef)

  const songs: Record<string, string>[] = []

  docs.forEach((doc) => {
    songs.push({
      ...doc.data(),
      id: doc.id
    })
  })

  return Response.json({ data: {
      ...performer.data(),
      songs
    }
  })
}