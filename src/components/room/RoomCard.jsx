import { PhoneCall, Heart } from "lucide-react";

export default function RoomCard({ room }) {
  return (
    <div className="w-[420px] bg-[#12181d] rounded-2xl border border-[#1b2229] shadow-sm hover:border-[#E0C3A4]/30 transition-all p-7 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex flex-col text-left">
          <h3 className="text-[#E0C3A4] font-semibold text-lg">{room.language}</h3>
          <span className="text-sm italic text-gray-400">{room.level}</span>
        </div>
        {room.active && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#E0C3A4]/10 text-[#E0C3A4] border border-[#E0C3A4]/20">
            Active
          </span>
        )}
      </div>

      {/* Topic */}
      <p className="text-sm text-gray-400 mb-6">{room.topic}</p>

      {/* Participants */}
      <div className="flex justify-center mb-6 gap-4">
        {room.participants.map((user, index) => (
          <div key={index} className="relative group">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full border border-[#2a2f35] object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full border border-[#2a2f35] flex items-center justify-center text-base font-semibold text-gray-300 bg-[#1b2229]">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Likes */}
      <div className="flex items-center gap-1 text-sm text-gray-500 mb-5">
        <Heart className="w-4 h-4 text-[#E0C3A4]" /> {room.likes}
      </div>

      {/* JOIN BUTTON */}
      <button className="group w-full flex items-center justify-center gap-2 border border-[#E0C3A4]/20 rounded-lg py-3 text-sm font-medium text-[#E0C3A4] hover:bg-[#E0C3A4]/10 transition">
        <PhoneCall className="w-4 h-4" />
        Join & talk now!
      </button>
    </div>
  );
}
