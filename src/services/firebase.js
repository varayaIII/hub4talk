// src/services/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  initializeFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// ✅ ENV
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredEnvVars = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

const missing = requiredEnvVars.filter((v) => !import.meta.env[v]);
if (missing.length) {
  throw new Error(`❌ Missing Firebase env vars:\n${missing.join("\n")}`);
}

// 🚀 init
let app, analytics;
try {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  console.log("✅ Firebase initialized successfully");
} catch (e) {
  console.error("❌ Firebase initialization error:", e);
  throw e;
}

// 🔧 base services
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: true,
});
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// 🔐 auth helpers
export const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  console.log("✅ User signed in:", res.user?.email);
  return res.user;
};

export const logOut = async () => {
  await signOut(auth);
  console.log("✅ User signed out");
};

// 🚪 rooms api
export const createRoom = async (roomData) => {
  try {
    if (!auth.currentUser) throw new Error("Must be authenticated to create a room");

    const payload = {
      ...roomData,
      creatorId: auth.currentUser.uid,
      creatorName: auth.currentUser.displayName || auth.currentUser.email,
      createdAt: serverTimestamp(),
      participants: [],
      active: true,
      maxParticipants: 2,
    };

    console.log("🛠️ Creating room with data:", payload);
    const ref = await addDoc(collection(db, "rooms"), payload);
    if (!ref?.id) throw new Error("Room created but no ID returned");
    console.log("✅ Room created with ID:", ref.id);
    return ref.id;
  } catch (err) {
    console.error("❌ Error creating room:", err);
    throw err;
  }
};

export const getRooms = async (filters = {}) => {
  try {
    let q = query(collection(db, "rooms"), where("active", "==", true));
    if (filters.language) q = query(q, where("language", "==", filters.language));
    if (filters.level) q = query(q, where("level", "==", filters.level));

    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("❌ Error getting rooms:", err);
    throw err;
  }
};

export const subscribeToRooms = (callback) => {
  const q = query(collection(db, "rooms"), where("active", "==", true));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => console.error("❌ Error in room subscription:", err)
  );
};

export const getRoomById = async (roomId) => {
  const ref = doc(db, "rooms", roomId);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const updateRoom = async (roomId, updates) => {
  await updateDoc(doc(db, "rooms", roomId), updates);
};
export const deleteRoom = async (roomId) => {
  await deleteDoc(doc(db, "rooms", roomId));
};
