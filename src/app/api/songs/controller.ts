'use server'

import { collection, addDoc, doc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { omit } from "lodash";

import { db } from '@/firebase/config.ts'

export const addSong = async (data: Record<string, string>) => {
    const collectionRef = collection(db, "songs");
    return new Promise((resolve) => {
        addDoc(collectionRef, data)
            .then(res => resolve(res))
    });
}

export const getList = async () => {
    const collectionRef = collection(db, "songs");
    return new Promise((resolve) => {
        getDocs(collectionRef)
          .then(async (res) => {
              const docs = []
              for (const doc of res.docs) {
                  const performer = await getDoc(doc.data()?.performer);
                  docs.push({
                      ...doc.data(),
                      performer: {
                          ...performer.data() as Record<string, string>,
                          id: performer.id
                      },
                      id: doc.id,
                  })
              }
              resolve(docs)
          })
    })
}

export const getOne = async (id: string) => {
    const docRef = doc(db, "songs", id);
    const docSnap = await getDoc(docRef)
    const performer = await getDoc(docSnap.data()?.performer)
    if (docSnap.exists()) {
        return {
            ...docSnap.data(),
            performer: {
                ...performer.data() as Record<string, string>,
                id: performer.id
            },
            id: docSnap.id
        }
    }
    return {}
}

export const updateOne = async (id: string, data: Record<string, string>) => {
    const docRef = doc(db, "songs", id);
    await updateDoc(docRef, omit(data, ['id', 'performer']))
    const docSnap = await getDoc(docRef)
    const performer = await getDoc(docSnap.data()?.performer)
    if (docSnap.exists()) {
        return {
            ...docSnap.data(),
            performer: {
                ...performer.data() as Record<string, string>,
                id: performer.id
            },
            id: docSnap.id
        }
    }
    return {}

}