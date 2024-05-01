
import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCinp8t6UX1RrbjSmblpuvXXm8AHRsF7h8",
    authDomain: "todo-crud-5a287.firebaseapp.com",
    projectId: "todo-crud-5a287",
    storageBucket: "todo-crud-5a287.appspot.com",
    messagingSenderId: "478725747661",
    appId: "1:478725747661:web:3309d49f357ecdf79c8a84",
    measurementId: "G-F7R3E16NFV"
}
const app = initializeApp(firebaseConfig)
const db= getFirestore(app)

export  {
  db
};