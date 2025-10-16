// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyDngLl2RLCFlk8B3dv6ReUd9xg6epnfxDk",
  authDomain: "hub4talk.firebaseapp.com",
  projectId: "hub4talk",
  storageBucket: "hub4talk.firebasestorage.app",
  messagingSenderId: "1031972879755",
  appId: "1:1031972879755:web:f13e131923b62e63aa438e",
  measurementId: "G-NV0NVRCSQQ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Funciones de autenticación
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Funciones para salas
export const createRoom = async (roomData) => {
  try {
    const docRef = await addDoc(collection(db, 'rooms'), {
      ...roomData,
      createdAt: serverTimestamp(),
      participants: [],
      active: true
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

export const getRooms = async (filters = {}) => {
  try {
    let q = collection(db, 'rooms');
    
    if (filters.language) {
      q = query(q, where('language', '==', filters.language));
    }
    if (filters.level) {
      q = query(q, where('level', '==', filters.level));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting rooms:", error);
    throw error;
  }
};

export const subscribeToRooms = (callback) => {
  const q = query(collection(db, 'rooms'), where('active', '==', true));
  return onSnapshot(q, (snapshot) => {
    const rooms = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(rooms);
  });
};