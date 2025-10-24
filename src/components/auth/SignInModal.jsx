import { X, LogIn } from "lucide-react";
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99999]">
      <div className="bg-[#14181d] border border-[#2A2E33] rounded-xl shadow-xl w-[90%] max-w-sm p-6 relative text-center">
        
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#E0C3A4] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ícono principal */}
        <div className="flex justify-center mb-4">
          <LogIn className="w-10 h-10 text-[#E0C3A4]" />
        </div>

        <h2 className="text-xl font-semibold text-[#E0C3A4] mb-2">
          Welcome to Hub4Talk
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Sign in with your Google account to join conversations and earn ranks.
        </p>

        {/* Botón de inicio de sesión */}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-md font-medium text-sm shadow-md border transition-all duration-200 ${
            loading
              ? "bg-[#E0C3A4]/40 text-gray-700 cursor-not-allowed"
              : "bg-[#E0C3A4] text-[#1b1f23] hover:bg-[#d5b78f] hover:scale-[1.03] active:scale-[0.98]"
          }`}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
