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
    const performer = await getDoc(docSnap.data()?.performer)
    if (docSnap.exists()) {
        return {
            ...docSnap.data(),
            performer: performer.data(),
            id: docSnap.id
        }
    }
    return {}
}

export const updateOne = async (id: string, data: Record<string, string>) => {
    const docRef = doc(db, "songs", id);
    await updateDoc(docRef, omit(data, 'id'))
    const docSnap = await getDoc(docRef)
    const performer = await getDoc(docSnap.data()?.performer)
    if (docSnap.exists()) {
        return {
            ...docSnap.data(),
            performer: performer.data(),
            id: docSnap.id
        }
    }
    return {}

}