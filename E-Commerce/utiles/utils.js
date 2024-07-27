  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
  import { 
    getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
      } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
  import { 
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,  
  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
  import { 
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    deleteDoc
 } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
  const firebaseConfig = {
    apiKey: "AIzaSyBahC9aYr9fm6PsfPMeQjPo77Pd3MOlW0Q",
    authDomain: "e-commerce-69f31.firebaseapp.com",
    projectId: "e-commerce-69f31",
    storageBucket: "e-commerce-69f31.appspot.com",
    messagingSenderId: "1057474700002",
    appId: "1:1057474700002:web:d3dc242d215063554434bb",
    measurementId: "G-NRY0NP3TM4"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)
  const analytics = getAnalytics(app);


 export{
  auth,
  db,
  storage,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  signOut,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  deleteDoc
};