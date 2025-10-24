// src/components/auth/SignInModal.jsx - VERSIÓN PREMIUM
import { X, LogIn, Users, Star, Shield, Globe } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function SignInModal({ onClose }) {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn();
      console.log("✅ Login successful!");
      onClose();
    } catch (error) {
      console.error("❌ Login failed:", error);
      alert("Error signing in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99999] px-4">
      <div className="bg-[#14181d] border border-[#2A2E33] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
        
        {/* Header con gradiente */}
        <div className="relative bg-gradient-to-br from-[#E0C3A4]/10 to-[#E76F51]/5 p-6 border-b border-[#2A2E33]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-[#E0C3A4] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo con efecto */}
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-[#E0C3A4]/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-[#E0C3A4]/10 rounded-full p-3">
                <Globe className="w-10 h-10 text-[#E0C3A4]" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-1">
            Join Hub4Talk
          </h2>
          <p className="text-center text-sm text-gray-400">
            Your global language learning community
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          
          {/* Features list */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[#E0C3A4]/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-[#E0C3A4]" />
              </div>
              <span className="text-gray-300">
                Practice with native speakers
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[#E0C3A4]/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-[#E0C3A4]" />
              </div>
              <span className="text-gray-300">
                Earn stars and achievements
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[#E0C3A4]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-[#E0C3A4]" />
              </div>
              <span className="text-gray-300">
                Safe and moderated environment
              </span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 py-3 rounded-lg font-semibold text-sm shadow-lg border-2 transition-all duration-200 ${
              loading
                ? "bg-[#E0C3A4]/40 text-gray-700 cursor-not-allowed border-[#E0C3A4]/40"
                : "bg-[#E0C3A4] text-[#1b1f23] border-[#E0C3A4] hover:bg-[#d5b78f] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-[#1b1f23] border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Security note */}
          <div className="mt-4 p-3 bg-[#1c232b] rounded-lg border border-[#2A2E33]">
            <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
              <Shield className="w-3 h-3 text-[#E0C3A4]" />
              Secure authentication powered by Google
            </p>
          </div>

          {/* Terms */}
          <p className="text-xs text-center text-gray-600 mt-4">
            By continuing, you agree to our{" "}
            <a href="#terms" className="text-[#E0C3A4] hover:underline">
              Terms
            </a>
            {" "}and{" "}
            <a href="#privacy" className="text-[#E0C3A4] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}