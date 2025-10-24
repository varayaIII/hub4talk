// src/pages/RoomDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  ArrowLeft,
  Users,
  Globe,
  Send,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  AlertCircle,
  Loader,
  Crown,
  Star,
} from "lucide-react";

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Subscribe to room data
  useEffect(() => {
    if (!id) return;

    const roomRef = doc(db, "rooms", id);
    const unsubscribe = onSnapshot(
      roomRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setRoom({ id: snapshot.id, ...snapshot.data() });
          setLoading(false);
        } else {
          setError("Room not found");
          setLoading(false);
        }
      },
      (err) => {
        console.error("Error fetching room:", err);
        setError("Failed to load room");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);

  // Subscribe to messages
  useEffect(() => {
    if (!id) return;

    const messagesRef = collection(db, "rooms", id, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [id]);

  // Join room
  const handleJoinRoom = async () => {
    if (!user) {
      alert("Please sign in to join the room");
      return;
    }

    if (room.participants?.length >= room.maxParticipants) {
      alert("Room is full");
      return;
    }

    try {
      const roomRef = doc(db, "rooms", id);
      await updateDoc(roomRef, {
        participants: arrayUnion({
          uid: user.uid,
          name: user.displayName || user.email,
          avatar: user.photoURL,
          joinedAt: new Date().toISOString(),
        }),
      });
      setIsJoined(true);
    } catch (err) {
      console.error("Error joining room:", err);
      alert("Failed to join room");
    }
  };

  // Leave room
  const handleLeaveRoom = async () => {
    if (!user) return;

    try {
      const roomRef = doc(db, "rooms", id);
      const participant = room.participants.find((p) => p.uid === user.uid);
      
      if (participant) {
        await updateDoc(roomRef, {
          participants: arrayRemove(participant),
        });
      }
      
      setIsJoined(false);
      navigate("/");
    } catch (err) {
      console.error("Error leaving room:", err);
    }
  };

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user) return;

    try {
      const messagesRef = collection(db, "rooms", id, "messages");
      await addDoc(messagesRef, {
        text: newMessage.trim(),
        userId: user.uid,
        userName: user.displayName || user.email,
        userAvatar: user.photoURL,
        timestamp: serverTimestamp(),
      });

      setNewMessage("");
      messageInputRef.current?.focus();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f1419]">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#E0C3A4] animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading room...</p>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f1419]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            {error || "Room not found"}
          </h2>
          <button onClick={() => navigate("/")} className="btn-primary mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isCreator = user?.uid === room.creatorId;
  const isParticipant = room.participants?.some((p) => p.uid === user?.uid);

  return (
    <div className="min-h-screen bg-[#0f1419] pt-20">
      {/* Header */}
      <div className="bg-[#12181d] border-b border-[#1b2229] sticky top-[72px] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-[#E0C3A4] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {isParticipant && (
              <button
                onClick={handleLeaveRoom}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
              >
                <PhoneOff className="w-4 h-4" />
                Leave Room
              </button>
            )}
          </div>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">
                  {room.topic}
                </h1>
                {room.active && (
                  <span className="badge-active">Active</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#E0C3A4]" />
                  <span>{room.language}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#E0C3A4]" />
                  <span className="capitalize">{room.level}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#E0C3A4]" />
                  <span>
                    {room.participants?.length || 0}/{room.maxParticipants}
                  </span>
                </div>
                {isCreator && (
                  <div className="flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400">Host</span>
                  </div>
                )}
              </div>

              {room.description && (
                <p className="text-sm text-gray-500 mt-2">
                  {room.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video/Audio Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Grid */}
            <div className="card p-6">
              <div className="aspect-video bg-[#0f1419] rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Video call feature coming soon
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    For now, use the chat to practice!
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-4 rounded-full transition ${
                    isMuted
                      ? "bg-red-500 text-white"
                      : "bg-[#1c232b] text-gray-300 hover:bg-[#242c35]"
                  }`}
                >
                  {isMuted ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-4 rounded-full transition ${
                    isVideoOff
                      ? "bg-red-500 text-white"
                      : "bg-[#1c232b] text-gray-300 hover:bg-[#242c35]"
                  }`}
                >
                  {isVideoOff ? (
                    <VideoOff className="w-5 h-5" />
                  ) : (
                    <Video className="w-5 h-5" />
                  )}
                </button>

                {!isParticipant && (
                  <button onClick={handleJoinRoom} className="btn-primary">
                    Join Room
                  </button>
                )}
              </div>
            </div>

            {/* Chat */}
            <div className="card p-0 overflow-hidden">
              <div className="p-4 border-b border-[#1b2229]">
                <h3 className="font-semibold text-white">Chat</h3>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No messages yet</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Be the first to say hello!
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isOwn = msg.userId === user?.uid;
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${
                          isOwn ? "flex-row-reverse" : ""
                        }`}
                      >
                        <img
                          src={
                            msg.userAvatar ||
                            `https://ui-avatars.com/api/?name=${msg.userName}`
                          }
                          alt={msg.userName}
                          className="avatar-sm flex-shrink-0"
                        />
                        <div
                          className={`flex-1 ${
                            isOwn ? "text-right" : ""
                          }`}
                        >
                          <div className="text-xs text-gray-500 mb-1">
                            {msg.userName}
                          </div>
                          <div
                            className={`inline-block px-4 py-2 rounded-lg ${
                              isOwn
                                ? "bg-[#E0C3A4] text-[#1b1f23]"
                                : "bg-[#1c232b] text-gray-200"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              {isParticipant ? (
                <form onSubmit={handleSendMessage} className="p-4 border-t border-[#1b2229]">
                  <div className="flex gap-2">
                    <input
                      ref={messageInputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="form-input flex-1"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="btn-primary px-4"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 border-t border-[#1b2229] text-center">
                  <p className="text-sm text-gray-500">
                    Join the room to participate in chat
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participants */}
            <div className="card p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#E0C3A4]" />
                Participants ({room.participants?.length || 0})
              </h3>

              {room.participants && room.participants.length > 0 ? (
                <div className="space-y-3">
                  {room.participants.map((participant) => (
                    <div
                      key={participant.uid}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1c232b] transition"
                    >
                      <img
                        src={
                          participant.avatar ||
                          `https://ui-avatars.com/api/?name=${participant.name}`
                        }
                        alt={participant.name}
                        className="avatar-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white truncate">
                            {participant.name}
                          </span>
                          {participant.uid === room.creatorId && (
                            <Crown className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          {participant.uid === user?.uid ? "You" : "Participant"}
                        </p>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No participants yet</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Be the first to join!
                  </p>
                </div>
              )}
            </div>

            {/* Room Info */}
            <div className="card p-6">
              <h3 className="font-semibold text-white mb-4">Room Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Created by:</span>
                  <p className="text-white font-medium mt-1">
                    {room.creatorName}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Language:</span>
                  <p className="text-white font-medium mt-1">
                    {room.language}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Level:</span>
                  <p className="text-white font-medium mt-1 capitalize">
                    {room.level}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Max Participants:</span>
                  <p className="text-white font-medium mt-1">
                    {room.maxParticipants}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Created:</span>
                  <p className="text-white font-medium mt-1">
                    {room.createdAt
                      ? new Date(
                          room.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "Just now"}
                  </p>
                </div>
              </div>
            </div>

            {/* Room Guidelines */}
            <div className="card p-6">
              <h3 className="font-semibold text-white mb-4">Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-[#E0C3A4]">•</span>
                  <span>Be respectful and patient</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#E0C3A4]">•</span>
                  <span>Help others learn</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#E0C3A4]">•</span>
                  <span>Don't worry about mistakes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#E0C3A4]">•</span>
                  <span>Have fun and enjoy!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}