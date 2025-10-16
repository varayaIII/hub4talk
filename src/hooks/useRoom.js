// src/hooks/useRooms.js
import { useState, useEffect } from 'react';
import { subscribeToRooms, createRoom as createRoomService } from '../services/firebase';

export function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToRooms((newRooms) => {
      setRooms(newRooms);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createRoom = async (roomData) => {
    try {
      const roomId = await createRoomService(roomData);
      return roomId;
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  };

  return { rooms, loading, createRoom };
}