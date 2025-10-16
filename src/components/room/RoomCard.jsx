import { PhoneCall, Heart, Users } from "lucide-react";

// RoomCard component inline
function RoomCard({ room }) {
  // Validación de datos
  if (!room) {
    return null;
  }

  const {
    language = "Unknown Language",
    level = "Any Level",
    topic = "General Conversation",
    active = false,
    participants = [],
    likes = 0
  } = room;

  return (
    <div className="w-full max-w-[420px] bg-[#12181d] rounded-2xl border border-[#1b2229] shadow-sm hover:border-[#E0C3A4]/30 transition-all p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col">
          <h3 className="text-[#E0C3A4] font-semibold text-lg leading-tight mb-1">
            {language}
          </h3>
          <span className="text-sm text-gray-400 italic">{level}</span>
        </div>
        {active && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#E0C3A4]/10 text-[#E0C3A4] border border-[#E0C3A4]/20 font-medium">
            Active
          </span>
        )}
      </div>

      {/* Topic */}
      <p className="text-sm text-gray-400 mb-6 line-clamp-2">{topic}</p>

      {/* Participants - AVATARES MÁS GRANDES */}
      <div className="flex justify-center items-center mb-6 gap-3">
        {participants.map((user, index) => (
          <div key={index} className="relative group">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full border-2 border-[#2a2f35] object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-2 border-[#2a2f35] flex items-center justify-center text-lg font-semibold text-gray-300 bg-[#1b2229] transition-transform group-hover:scale-105">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
            
            {/* Tooltip con nombre */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1b2229] px-2 py-1 rounded text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {user.name}
            </div>
          </div>
        ))}
        
        {/* Mostrar slot vacío si solo hay 1 participante */}
        {participants.length === 1 && (
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#2a2f35] flex items-center justify-center bg-[#0f1419]">
            <Users className="w-8 h-8 text-gray-600" />
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Heart className="w-4 h-4 text-[#E0C3A4]" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Users className="w-4 h-4 text-[#E0C3A4]" />
          <span>{participants.length}/2</span>
        </div>
      </div>

      {/* JOIN BUTTON */}
      <button className="group w-full flex items-center justify-center gap-2 border border-[#E0C3A4]/20 rounded-lg py-3 text-sm font-medium text-[#E0C3A4] hover:bg-[#E0C3A4]/10 transition-all">
        <PhoneCall className="w-4 h-4 group-hover:animate-pulse" />
        Join & talk now!
      </button>
    </div>
  );
}

export default function RoomList() {
  const rooms = [
    {
      id: 1,
      language: "English + Spanish",
      level: "Intermediate",
      topic: "Daily Life & Culture",
      active: true,
      participants: [
        { name: "Carlos Mendoza", avatar: "https://i.pravatar.cc/150?img=12" },
        { name: "Maria López", avatar: "https://i.pravatar.cc/150?img=47" },
      ],
      likes: 32,
    },
    {
      id: 2,
      language: "English + Hindi",
      level: "Beginner",
      topic: "Movies & Entertainment",
      active: true,
      participants: [
        { name: "Pedro Salas", avatar: "https://i.pravatar.cc/150?img=33" },
        { name: "Sofia Alvarez", avatar: "https://i.pravatar.cc/150?img=44" },
      ],
      likes: 47,
    },
    {
      id: 3,
      language: "English + Chinese",
      level: "Elementary",
      topic: "Travel Stories & Adventures",
      active: true,
      participants: [
        { name: "Jorge Fuentes", avatar: "https://i.pravatar.cc/150?img=15" },
      ],
      likes: 18,
    },
    {
      id: 4,
      language: "English + French",
      level: "Advanced",
      topic: "Technology & Innovation",
      active: false,
      participants: [
        { name: "Lucas Martin", avatar: "https://i.pravatar.cc/150?img=68" },
        { name: "Emma Dubois", avatar: "https://i.pravatar.cc/150?img=32" },
      ],
      likes: 56,
    },
    {
      id: 5,
      language: "English + Japanese",
      level: "Intermediate",
      topic: "Anime & Manga Discussion",
      active: true,
      participants: [
        { name: "Yuki Tanaka", avatar: "https://i.pravatar.cc/150?img=25" },
      ],
      likes: 89,
    },
    {
      id: 6,
      language: "English + Arabic",
      level: "Beginner",
      topic: "Food & Cooking Recipes",
      active: true,
      participants: [
        { name: "Ahmed Ali", avatar: "https://i.pravatar.cc/150?img=59" },
        { name: "Fatima Hassan", avatar: "https://i.pravatar.cc/150?img=48" },
      ],
      likes: 23,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}