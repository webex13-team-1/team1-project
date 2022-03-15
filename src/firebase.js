import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAzOeGISdXVx8E6bOnxPM_2H9QnmyxMaP4",
  authDomain: "webex-team1-project.firebaseapp.com",
  projectId: "webex-team1-project",
  storageBucket: "webex-team1-project.appspot.com",
  messagingSenderId: "136442920603",
  appId: "1:136442920603:web:55c873c1a2d3fa183d903e",
  measurementId: "G-C7D6E0T0B3",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

//以下ログイン機能のため
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

export const createUser = createUserWithEmailAndPassword()
export const auth = getAuth()
//
