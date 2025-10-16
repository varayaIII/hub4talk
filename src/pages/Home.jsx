import { Globe, Search, Plus, Coffee } from "lucide-react";
import RoomList from "../components/room/RoomList";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1419] text-[#E6E9ED] font-sans">
      {/* HEADER */}
      <header className="border-b border-[#1b2229] bg-[#0f1419]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#E0C3A4]" />
            <span className="text-lg font-semibold tracking-tight text-[#E0C3A4]">
              Hub4Talk
            </span>
          </div>

          {/* BOTONES */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button className="group relative overflow-hidden rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/10 hover:border-white/20">
              <span className="relative z-10 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#E0C3A4]" /> Create Room
              </span>
            </button>

            <button className="group relative overflow-hidden rounded-md border border-[#E0C3A4]/20 bg-[#E0C3A4]/5 px-4 py-2 text-sm font-medium text-[#E0C3A4] hover:bg-[#E0C3A4]/10 hover:border-[#E0C3A4]/30 transition">
              <span className="relative z-10 flex items-center gap-2">
                <Coffee className="w-4 h-4" /> Support
              </span>
            </button>

            {["Privacy", "Discord", "Facebook"].map((label) => (
              <button
                key={label}
                className="rounded-md border border-white/5 bg-white/5 px-3 py-2 text-sm text-gray-400 hover:text-[#E0C3A4] hover:bg-white/10 transition"
              >
                {label}
              </button>
            ))}

            <button className="rounded-md bg-gradient-to-r from-[#A8C0A4]/10 to-[#E0C3A4]/10 border border-white/10 px-4 py-2 text-sm font-semibold text-gray-200 hover:border-[#E0C3A4]/30 hover:text-[#E0C3A4] transition">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* BARRA DE BÚSQUEDA */}
      <section className="border-b border-[#1b2229] bg-[#12181d] px-6 py-4 flex justify-center">
        <div className="relative w-full max-w-3xl">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8A9199]" />
          <input
            type="text"
            placeholder="Search for Language, Level, Topic, Username..."
            className="w-full bg-[#0f1419] border border-[#1b2229] rounded-md py-2 pl-9 pr-4 text-sm text-[#C7CCD1] placeholder-[#646C75] focus:outline-none focus:border-[#E0C3A4] transition"
          />
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-10 text-center">
        <h2 className="text-sm text-[#A0A6AD] uppercase tracking-widest mb-10">
          Language Practice Community
        </h2>

        {/* LISTA DE SALAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 justify-items-center">
          <RoomList />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#1b2229] bg-[#0f1419] mt-16">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Globe className="w-5 h-5 text-[#E0C3A4]" />
            <span className="text-[#E0C3A4] font-semibold">Hub4Talk</span>
            <span className="text-gray-500">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>

          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-[#E0C3A4] transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#E0C3A4] transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#E0C3A4] transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
