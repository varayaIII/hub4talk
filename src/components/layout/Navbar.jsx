// src/components/layout/Navbar.jsx
import { LogIn, Globe } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#181B1F]/90 backdrop-blur-md border-b border-[#2A2E33] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-[#F4A261]">
          <Globe className="w-7 h-7 text-[#E76F51]" />
          Hub4Talk
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-[#D1D5DB] font-medium">
          <a href="#rooms" className="hover:text-[#F4A261] transition">Salas</a>
          <a href="#how-it-works" className="hover:text-[#F4A261] transition">Cómo funciona</a>
          <a href="#premium" className="hover:text-[#F4A261] transition">Premium</a>
        </div>

        {/* Botón */}
        <button className="flex items-center gap-2 bg-[#F4A261]/20 text-[#F4A261] font-semibold px-5 py-2 rounded-lg hover:bg-[#F4A261]/30 transition">
          <LogIn className="w-5 h-5" />
          Iniciar sesión
        </button>
      </div>
    </nav>
  );
}
