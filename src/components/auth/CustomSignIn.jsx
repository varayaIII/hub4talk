// src/components/auth/CustomSignIn.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Globe, Sparkles } from "lucide-react";
import { signInWithGoogle } from "../../services/firebase";

export default function CustomSignIn({ onClose }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      console.log("✅ Login successful!");
      onClose();
      navigate("/");
    } catch (error) {
      console.error("❌ Login failed:", error);
      alert("Error signing in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#14181d] border border-[#2A2E33] rounded-2xl shadow-2xl w-[90%] max-w-md overflow-hidden">
        {/* Header con diseño mejorado */}
        <div className="relative bg-gradient-to-br from-[#E0C3A4]/10 to-[#E76F51]/5 p-8 border-b border-[#2A2E33]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-[#E0C3A4] transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-center mb-4">
            <div className="relative">
              <Globe className="w-16 h-16 text-[#E0C3A4]" />
              <Sparkles className="w-6 h-6 text-[#E76F51] absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-2">
            Welcome to Hub4Talk
          </h2>
          <p className="text-center text-sm text-gray-400">
            Connect with language learners worldwide
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-[#E0C3A4]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#E0C3A4] text-xs">✓</span>
              </div>
              <div>
                <p className="text-white font-medium">Practice with real people</p>
                <p className="text-gray-400 text-xs">Join live conversation rooms</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-[#E0C3A4]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#E0C3A4] text-xs">✓</span>
              </div>
              <div>
                <p className="text-white font-medium">Earn recognition stars</p>
                <p className="text-gray-400 text-xs">Track your progress and rank up</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-[#E0C3A4]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#E0C3A4] text-xs">✓</span>
              </div>
              <div>
                <p className="text-white font-medium">100% Free forever</p>
                <p className="text-gray-400 text-xs">No credit card required</p>
              </div>
            </div>
          </div>

          {/* Botón de Google - Personalizado */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-lg font-medium text-sm shadow-lg border transition-all duration-200 bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <path
                  d="M17.6 9.2l-.1-1.8H9v3.4h4.8C13.6 12 13 13 12 13.6v2.2h3a8.8 8.8 0 0 0 2.6-6.6z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18c2.4 0 4.5-.8 6-2.2l-3-2.2a5.4 5.4 0 0 1-8-2.9H1V13a9 9 0 0 0 8 5z"
                  fill="#34A853"
                />
                <path
                  d="M4 10.7a5.4 5.4 0 0 1 0-3.4V5H1a9 9 0 0 0 0 8l3-2.3z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.6c1.3 0 2.5.4 3.4 1.3L15 2.3A9 9 0 0 0 1 5l3 2.4a5.4 5.4 0 0 1 5-3.7z"
                  fill="#EA4335"
                />
              </g>
            </svg>
            {loading ? "Signing in..." : "Continue with Google"}
          </button>

          {/* Términos */}
          <p className="text-xs text-center text-gray-500 mt-4">
            By continuing, you agree to our{" "}
            <a href="#terms" className="text-[#E0C3A4] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#privacy" className="text-[#E0C3A4] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}