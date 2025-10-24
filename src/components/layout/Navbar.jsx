import {
  Plus,
  Coffee,
  Globe,
  User,
  LogOut,
  Settings,
  Palette,
  Star,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useRoom } from "../../context/RoomContext";
import { createRoom } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import AuthPromptModal from "../auth/AuthPromptModal";

// ⭐ rango por estrellas (puedes seguir usando tu lógica actual)
function getRank(stars) {
  if (stars >= 100) return { name: "Language Commander", color: "#FFD700" };
  if (stars >= 50)  return { name: "Polyglot Lieutenant", color: "#DAA520" };
  if (stars >= 25)  return { name: "Fluent Sergeant", color: "#C68642" };
  if (stars >= 10)  return { name: "Language Cadet", color: "#E0C3A4" };
  return { name: "Learner Recruit", color: "#9CA3AF" };
}

import RankBadge from "../profile/RankBadge"; // 👈 nueva medalla pro

export default function Navbar() {
  const { user, signIn, signOut } = useAuth();
  const { setCurrentRoom } = useRoom();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [creating, setCreating] = useState(false);
  const menuRef = useRef(null);

  // DEMO supporter/rango/estrellas
  const isSupporter = true;
  const stars = 23;
  const rank = getRank(stars);

  const handleSignIn = async () => {
    try {
      await signIn();
      console.log("✅ Login successful!");
    } catch (error) {
      console.error("❌ Login failed:", error);
      alert("No se pudo iniciar sesión.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("✅ Logout successful!");
      setMenuOpen(false);
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  const handleCreateRoom = async () => {
    console.log("🟡 Click en Create Room");
    if (!user) {
      console.log("🔒 No logueado → mostrar AuthPrompt");
      setShowAuthPrompt(true);
      return;
    }

    try {
      setCreating(true);
      console.log("🛠️ Creando sala en Firestore…");
      const roomId = await createRoom({
        topic: "English Practice Room",
        language: "English",
        level: "Intermediate",
      });
      console.log("✅ Sala creada:", roomId);
      setCurrentRoom(roomId);
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error("❌ Error creating room:", error);
      if (error?.code === "permission-denied") {
        alert("Permiso denegado por reglas de Firestore. Revisa las reglas o el login.");
      } else {
        alert("No se pudo crear la sala. Revisa la consola para detalles.");
      }
    } finally {
      setCreating(false);
    }
  };

  // cerrar dropdown al click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {showAuthPrompt && (
        <AuthPromptModal
          onClose={() => setShowAuthPrompt(false)}
          onSignIn={() => {
            setShowAuthPrompt(false);
            handleSignIn();
          }}
        />
      )}

      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-[#0f1419]/90 backdrop-blur-md shadow-sm border-b border-[#2A2E33]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Globe className="w-8 h-8 text-[#E0C3A4]" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full ring-1 ring-[#0f1419]" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg text-[#E0C3A4]">Hub4Talk</span>
              <span className="text-xs text-gray-400">Connect & Learn</span>
            </div>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-3">
            {/* Create Room */}
            <button
              onClick={handleCreateRoom}
              disabled={creating}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border border-[#2A2E33] font-medium text-sm transition
                ${creating ? "bg-[#202830] text-gray-500 cursor-not-allowed"
                           : "bg-[#1c232b] text-gray-200 hover:bg-[#242c35]"}`}
            >
              <Plus className="w-4 h-4 text-[#E0C3A4]" />
              {creating ? "Creating…" : "Create Room"}
            </button>

            {/* Support */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-[#E0C3A4]/30 text-[#E0C3A4] font-medium text-sm bg-[#181B1F]/60 hover:bg-[#E0C3A4]/10 hover:border-[#E0C3A4]/50 transition">
              <Coffee className="w-4 h-4" />
              Support
            </button>

            {/* Usuario */}
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[#E0C3A4]/10 transition"
                >
                  {isSupporter && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full border border-[#E0C3A4]/40"
                    />
                  )}
                  <span className="text-sm text-[#E0C3A4]/90 font-medium hidden sm:block">
                    {user.displayName?.split(" ")[0] || user.email}
                  </span>
                  <svg
                    className={`w-4 h-4 text-[#E0C3A4]/70 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#14181d] border border-[#2A2E33] rounded-xl shadow-xl py-3 z-50 text-[#E0C3A4]">
                    <div className="flex flex-col items-center text-center pb-3 border-b border-[#2A2E33] px-4">
                      {isSupporter && (
                        <img
                          src={user.photoURL}
                          alt="User Avatar"
                          className="w-16 h-16 rounded-full border border-[#E0C3A4]/40 mb-3"
                        />
                      )}

                      {/* ⭐ número de estrellas */}
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Star className="w-5 h-5 text-[#E0C3A4]" fill="#E0C3A4" />
                        <span className="text-sm font-semibold text-[#E0C3A4]">{stars}</span>
                        <span className="text-xs text-gray-400">Recognition Stars</span>
                      </div>

                      {/* 🏅 medalla pro (SVG con glow y degradado) */}
                      <RankBadge label={getRank(stars).name} color={rank.color} />
                    </div>

                    {/* Opciones */}
                    <button className="w-full flex items-center gap-2 px-5 py-2 text-sm text-[#E0C3A4]/80 hover:bg-[#E0C3A4]/10 transition">
                      <User className="w-4 h-4 text-[#E0C3A4]" /> My Profile
                    </button>
                    <button className="w-full flex items-center gap-2 px-5 py-2 text-sm text-[#E0C3A4]/80 hover:bg-[#E0C3A4]/10 transition">
                      <Settings className="w-4 h-4 text-[#E0C3A4]" /> Supporter Settings
                    </button>
                    <button className="w-full flex items-center gap-2 px-5 py-2 text-sm text-[#E0C3A4]/80 hover:bg-[#E0C3A4]/10 transition">
                      <Palette className="w-4 h-4 text-[#E0C3A4]" /> Theme
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-5 py-2 text-sm text-[#E76F51] hover:bg-[#E76F51]/10 transition"
                    >
                      <LogOut className="w-4 h-4 text-[#E76F51]" /> Logout
                    </button>

                    <div className="px-5 mt-2 text-xs text-gray-500">Version 5.3.8 build 1</div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="px-5 py-2 rounded-md bg-[#E0C3A4] text-[#1b1f23] font-semibold text-sm border border-[#E0C3A4]/50 shadow-md hover:bg-[#d5b78f] hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-out"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
