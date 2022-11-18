// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPREtcYXDe0fWuZh0n2ThCieVZrMO5FmQ",
  authDomain: "e-commerce-3913f.firebaseapp.com",
  projectId: "e-commerce-3913f",
  storageBucket: "e-commerce-3913f.appspot.com",
  messagingSenderId: "54943731801",
  appId: "1:54943731801:web:0df619a57fb702fb616148"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}