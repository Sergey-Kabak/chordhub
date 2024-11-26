import { collection, addDoc, doc, getDocs, getDoc } from "firebase/firestore";

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
            .then(res => resolve(
                res.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
            ))
    });
}

export const getOne = async (id: string) => {
    const docRef = doc(db, "songs", id);
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return {
            ...docSnap.data(),
            id: docSnap.id
        }
    }
    return null
}