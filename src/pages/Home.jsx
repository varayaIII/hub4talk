import { Globe, Search, Plus, Coffee } from "lucide-react";
import RoomList from "../components/room/RoomList";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1419] text-[#E6E9ED] font-sans">
      {/* HEADER */}
      <header className="border-b border-[#1b2229] bg-[#0f1419]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#E0C3A4]" />
            <span className="text-lg font-semibold tracking-tight text-[#E0C3A4]">
              Hub4Talk
            </span>
          </div>

          {/* BOTONES - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/10 hover:border-white/20">
              <Plus className="w-4 h-4 inline mr-2" />
              Create Room
            </button>

            <button className="rounded-md border border-[#E0C3A4]/20 bg-[#E0C3A4]/5 px-4 py-2 text-sm font-medium text-[#E0C3A4] hover:bg-[#E0C3A4]/10 hover:border-[#E0C3A4]/30 transition">
              <Coffee className="w-4 h-4 inline mr-2" />
              Support
            </button>

            <button className="rounded-md border border-white/5 bg-white/5 px-3 py-2 text-sm text-gray-400 hover:text-[#E0C3A4] hover:bg-white/10 transition">
              Privacy
            </button>

            <button className="rounded-md bg-gradient-to-r from-[#A8C0A4]/10 to-[#E0C3A4]/10 border border-white/10 px-4 py-2 text-sm font-semibold text-gray-200 hover:border-[#E0C3A4]/30 hover:text-[#E0C3A4] transition">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-400 hover:text-[#E0C3A4]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* BARRA DE BÚSQUEDA */}
      <section className="border-b border-[#1b2229] bg-[#12181d] px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9199]" />
            <input
              type="text"
              placeholder="Search for Language, Level, Topic, Username..."
              className="w-full bg-[#0f1419] border border-[#1b2229] rounded-md py-2.5 pl-10 pr-4 text-sm text-[#C7CCD1] placeholder-[#646C75] focus:outline-none focus:border-[#E0C3A4] transition"
            />
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-xs sm:text-sm text-[#A0A6AD] uppercase tracking-widest mb-2">
            Language Practice Community
          </h1>
          <p className="text-gray-500 text-sm">
            Join live conversations with language learners worldwide
          </p>
        </div>

        {/* LISTA DE SALAS */}
        <RoomList />
      </main>
    </div>
  );
}