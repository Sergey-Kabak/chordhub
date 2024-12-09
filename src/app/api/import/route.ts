import { collection, addDoc, doc, getDocs, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config.ts";
import { createClient } from "@/app/utils/supabase/server.ts";

export async function POST(request: Request) {
  const supabase = await createClient()

  const payload = await request.json();
  const dataMap = new Map()

  payload.data.forEach((row: string[]) => {
    const performerName = row?.[0]?.split('-')?.[0]?.trim();
    const songName = row?.[0]?.split('-')?.[1]?.trim();
    const songContent = `<pre>${row?.[1]}</pre>`

    if (performerName && songName && row?.[1]) {
      const currentPerformer = dataMap.get(performerName)
      if (!currentPerformer) {
        dataMap.set(performerName, [{
          name: songName,
          content: songContent
        }])
      } else {
        dataMap.set(performerName, [...currentPerformer, {
          name: songName,
          content: songContent
        }])
      }
    }
  });

  const collectionRef = collection(db, "performers");

  for (const performerName of [...dataMap.keys()]) {
    // const record = await addDoc(collectionRef, {
    //   name: performerName,
    //   image: ''
    // });

    const { data: performer } = await supabase
      .from('performers')
      .select('*')
      .eq('name', performerName)



    for (const song of dataMap.get(performerName)) {

      const { data } = await supabase
        .from('songs')
        .insert({
          name: song.name,
          content: `<pre>${song.content}</pre>`,
          performerId: performer[0]?.id || null
        })
        .select()
    }

    // const songRef = collection(db, `performers/${record.id}/songs`);

    // let index = 0;
    //
    // for (const song of dataMap.get(performerName)) {
    //   const songId = (Date.now() + index).toString()
    //   await setDoc(doc(db, `performers/${record.id}/songs`, songId), {
    //     name: song.name,
    //     content: song.content,
    //     performerId: record.id,
    //     songId
    //   })
    //
    //   index += 1;
    // }
  }

  return Response.json({ data: [] })
}