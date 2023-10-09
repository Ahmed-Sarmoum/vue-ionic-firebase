import { defineStore } from 'pinia'
import { database } from '@/firebase'

import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

export const userStore = defineStore('user', {
    state: () => ({
        records: []
    }),
    actions: {
        async fetchDataFromDB() {
            const docRef = doc(database, "users", "e8dzHPQHZHembWcXOtik");

            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log("docSnap", docSnap.data().records);                
                this.records = docSnap.data().records
            } else {
                console.log('no sutch data');
            }
        },

        async addRecorsToStore(record: never) {
            this.records.push(record)
            const recordReference = doc(database, 'users', 'e8dzHPQHZHembWcXOtik')

            await updateDoc(recordReference, {
                records: arrayUnion(record)
            })
        }
    }
})