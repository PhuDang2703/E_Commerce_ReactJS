import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCJAIO-IMtoGJK3UfTlrywMhT2aLBM3ZKs",
  authDomain: "eshop-8038d.firebaseapp.com",
  projectId: "eshop-8038d",
  storageBucket: "eshop-8038d.appspot.com",
  messagingSenderId: "37436610363",
  appId: "1:37436610363:web:c0588e60540bc4186f091e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;