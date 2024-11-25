import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";

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
        getDoc(collectionRef)
            .then(res => resolve(res))
    });
}