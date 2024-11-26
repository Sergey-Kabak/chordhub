import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from '@/firebase/config.ts'

export const searchQuery = async (search: string) => {
    const collectionRef = collection(db, "songs")

    return new Promise(async (resolve) => {
        if (!query) {
            resolve([])
        }
        const schema = query(collectionRef, where('songName', '>=', search), where('songName', '<=', search+ '\uf8ff'))
        const querySnapshot = await getDocs(schema)
        const result: Record<string, string>[] = []
        querySnapshot.forEach((doc) => {
            result.push({...doc.data(), id: doc.id });
        })
        resolve(result)
    })

}