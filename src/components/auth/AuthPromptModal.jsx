import { X, LogIn } from "lucide-react";

export default function AuthPromptModal({ onClose, onSignIn }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99999]">
      <div className="bg-[#14181d] border border-[#2A2E33] rounded-xl shadow-xl w-[90%] max-w-md p-5 relative text-left">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#E0C3A4] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-[#E0C3A4] mb-3">
          Hi and welcome to <span className="text-[#E76F51]">Hub4Talk!</span>
        </h2>

        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          Please sign in to use all features and functions of Hub4Talk. 
          It's easy — all you need is a Google account (Gmail).
        </p>

        <p className="text-right text-gray-400 text-xs mb-4">Thank you!</p>

        {/* Botón principal */}
        <button
          onClick={onSignIn}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-[#E0C3A4] text-[#1b1f23] font-semibold text-sm border border-[#E0C3A4]/50 shadow-md hover:bg-[#d5b78f] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <LogIn className="w-4 h-4" />
          Sign in now!
        </button>
      </div>
    </div>
  );
}
