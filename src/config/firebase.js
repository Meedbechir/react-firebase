import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2iUPuLrGzQB9oTjBCt12Smx0LohWc9zE",
  authDomain: "fir-react-aa3d0.firebaseapp.com",
  projectId: "fir-react-aa3d0",
  storageBucket: "fir-react-aa3d0.appspot.com",
  messagingSenderId: "396868412078",
  appId: "1:396868412078:web:e2960aa1313dfedcf6433f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);
