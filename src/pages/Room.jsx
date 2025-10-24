import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Room() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const roomRef = doc(db, "rooms", id);

    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        setRoom(snapshot.data());
      } else {
        setRoom(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading room...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-400">
        Room not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1419] flex flex-col items-center justify-center text-center text-[#E0C3A4] p-6">
      <h1 className="text-3xl font-bold mb-2">{room.topic || "Untitled Room"}</h1>
      <p className="text-gray-400 mb-1">
        Language: <span className="text-[#E0C3A4]">{room.language}</span>
      </p>
      <p className="text-gray-400 mb-6">
        Created by <span className="text-[#E0C3A4]">{room.creatorName}</span>
      </p>

      <div className="border border-[#2A2E33] bg-[#181B1F]/60 rounded-xl px-6 py-3 text-sm text-gray-300">
        Room ID: <span className="text-[#E0C3A4]">{id}</span>
      </div>
    </div>
  );
}
