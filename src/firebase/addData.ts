import { collection, addDoc, doc, setDoc, getDocs } from "firebase/firestore";

import { db } from './config.ts'

export const addSong = async (data) => {
    const collectionRef = collection(db, "songs");
    return new Promise((resolve, reject) => {
        addDoc(collectionRef, data)
            .then(res => resolve(res))
    });
}

export const getList = async () => {
    const collectionRef = collection(db, "songs");
    return new Promise((resolve, reject) => {
        getDocs(collectionRef)
            .then(res => resolve(
                res.docs.map((doc) => ({
                    ...doc.data()
                }))
            ))
    });
}