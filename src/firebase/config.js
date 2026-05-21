import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDDRgTAFo__-CjRnWReCQaE4Z4mIY0iMgw",
  authDomain: "aafiya-portfoli.firebaseapp.com",
  projectId: "aafiya-portfoli",
  storageBucket: "aafiya-portfoli.firebasestorage.app",
  messagingSenderId: "712675302692",
  appId: "1:712675302692:web:62383071cda1e1d88ee7b1"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)