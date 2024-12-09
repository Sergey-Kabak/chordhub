import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  getCountFromServer,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
  startAt,
  limit,
  orderBy,
  query, collectionGroup, where,
} from "firebase/firestore";
import { db } from "@/firebase/config.ts";
import { omit } from "lodash";

export const addPerformer = async (data: Record<string, string>) => {
  const collectionRef = collection(db, "performers");

  const docRef = await addDoc(collectionRef, data)
  return {
    id: docRef.id
  }
}

export const getPerformers = async () => {
  const collectionRef = collection(db, "performers");
  const next = query(collectionRef, orderBy("count"), startAt(0), limit(5))

  const list = await getDocs(next);

  const result: Record<string, string>[] = []

  list?.forEach(item => {
    console.log(item.data());
    result.push({
      ...item.data(),
      id: item.id
    })
  })

  return result
}

export const updateSongsCount = async () => {
  const collectionRef = collection(db, "performers");
  const performers = await getDocs(collectionRef);

  const arrayOfDocs: Record<string, string>[] = [];

  performers.forEach(item => arrayOfDocs.push({
    ...item.data(),
    id: item.id
  }))

  for (const performer of arrayOfDocs) {
      const performerQuery = query(collectionGroup(db, "songs"), where('performerId', '==', performer.id))

      const  snapshot = await getDocs(performerQuery)

      const docRef = doc(db, "performers", performer.id);
      await updateDoc(docRef, {
        ...omit(performer, ['id']),
        count: snapshot.size
      })
  }
}