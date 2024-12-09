'use server'

import { collection, addDoc, doc, getDocs, getDoc, updateDoc, query, collectionGroup, where, documentId } from "firebase/firestore";
import { omit } from "lodash";

import { db } from '@/firebase/config.ts'
import { getPerformers } from "@/app/api/performers/controller.ts";

export const addSong = async (data: Record<string, string>) => {
    const collectionRef = collection(db, "songs");
    return new Promise((resolve) => {
        addDoc(collectionRef, data)
            .then(res => resolve(res))
    });
}

export const getPerformer = async (id: string) => {
    if (!id) return {
        name: ''
    };

    const docRef = doc(db, 'performers', id);
    const result = await getDoc(docRef)
    return {
        ...result.data()
    }
}


export const getList = async () => {
    const collectionRef = collection(db, "songs");
    const performers = await getPerformers()
    return new Promise((resolve) => {
        getDocs(collectionRef)
          .then(async (res) => {
              const docs = []
              for (const doc of res.docs) {
                  docs.push({
                      ...doc.data(),
                      id: doc.id,
                      performer: performers.find(performer => `performer/${performer.id}` === doc.data().performer) || {
                          name: ''
                      },
                  })
              }
              resolve(docs)
          })
    })
}

export const getOne = async (id: string) => {

    const songRef = query(collectionGroup(db, "songs"), where('songId', '==', id))

    const docs = await getDocs(songRef)

    let result = {}

    docs.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        result = {
            ...doc.data(),
            id: doc.id,
        }
    });

    return result
}

export const updateOne = async (id: string, data: Record<string, string>) => {
    const docRef = doc(db, "songs", id);
    await updateDoc(docRef, omit(data, ['id', 'performer']))
    // const docSnap = await getDoc(docRef)
    // const performer = await getDoc(docSnap.data()?.performer)
    // if (docSnap.exists()) {
    //     return {
    //         ...docSnap.data(),
    //         performer: {
    //             ...performer.data() as Record<string, string>,
    //             id: performer.id
    //         },
    //         id: docSnap.id
    //     }
    // }
    return {}

}