import { Globe, Search, Sparkles, TrendingUp } from "lucide-react";
import RoomList from "../components/room/RoomList";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import CreateRoomModal from "../components/room/CreateRoomModal";
import SignInModal from "../components/auth/SignInModal";

export default function Home() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleCreateRoom = () => {
    if (!user) {
      setShowSignInModal(true);
      return;
    }
    setShowCreateModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0f1419] text-[#E6E9ED] font-sans pt-[72px]">
      {/* HERO SECTION */}
      <section className="border-b border-[#1b2229] bg-gradient-to-b from-[#12181d] to-[#0f1419] px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0C3A4]/10 border border-[#E0C3A4]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#E0C3A4]" />
            <span className="text-sm font-medium text-[#E0C3A4]">
              Join 10,000+ language learners worldwide
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Practice Languages
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#A8C0A4] to-[#E0C3A4]">
              Community
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join live conversations in chat rooms with real people and language learners from around the world.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-xs text-gray-500">Active Rooms</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#E0C3A4]" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">25+</div>
                <div className="text-xs text-gray-500">Languages</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">4.8★</div>
                <div className="text-xs text-gray-500">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BARRA DE BÚSQUEDA - Ahora funcional */}
      <section className="border-b border-[#1b2229] bg-[#0f1419] px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9199] group-focus-within:text-[#E0C3A4] transition" />
            <input
              type="text"
              placeholder="Search by language, level, topic or username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12181d] border border-[#1b2229] rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#C7CCD1] placeholder-[#646C75] focus:outline-none focus:border-[#E0C3A4] focus:ring-2 focus:ring-[#E0C3A4]/20 transition shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header de sección */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Active Rooms
            </h2>
            <p className="text-sm text-gray-500">
              Choose a room and start practicing
            </p>
          </div>
          
          {/* Filtros rápidos - Ahora funcionales */}
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                activeFilter === "all"
                  ? "bg-[#E0C3A4]/10 text-[#E0C3A4] border-[#E0C3A4]/20"
                  : "bg-[#12181d] text-gray-400 border-[#1b2229] hover:border-[#E0C3A4]/20 hover:text-[#E0C3A4]"
              }`}
            >
              All Languages
            </button>
            <button 
              onClick={() => setLevelFilter(levelFilter === "beginner" ? "all" : "beginner")}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                levelFilter === "beginner"
                  ? "bg-[#E0C3A4]/10 text-[#E0C3A4] border-[#E0C3A4]/20"
                  : "bg-[#12181d] text-gray-400 border-[#1b2229] hover:border-[#E0C3A4]/20 hover:text-[#E0C3A4]"
              }`}
            >
              Beginner
            </button>
            <button 
              onClick={() => setActiveFilter(activeFilter === "active" ? "all" : "active")}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                activeFilter === "active"
                  ? "bg-[#E0C3A4]/10 text-[#E0C3A4] border-[#E0C3A4]/20"
                  : "bg-[#12181d] text-gray-400 border-[#1b2229] hover:border-[#E0C3A4]/20 hover:text-[#E0C3A4]"
              }`}
            >
              Active Now
            </button>
          </div>
        </div>

        {/* LISTA DE SALAS - Ahora recibe filtros */}
        <RoomList 
          searchQuery={searchQuery}
          languageFilter={activeFilter}
          levelFilter={levelFilter}
        />
      </main>

      {/* Modal para crear sala */}
      {showCreateModal && (
        <CreateRoomModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}