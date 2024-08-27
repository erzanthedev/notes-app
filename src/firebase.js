import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBitxjExesnGmK8Ng4hjlpKl8ubU_ZF1Vg",
  authDomain: "react-notes-e79b0.firebaseapp.com",
  projectId: "react-notes-e79b0",
  storageBucket: "react-notes-e79b0.appspot.com",
  messagingSenderId: "211526449896",
  appId: "1:211526449896:web:d0170e1739148d8594a75d",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const notesCollection = collection(database, "notes");
