import { X, Globe, Users, MessageSquare } from "lucide-react";
import { useState } from "react";
import { createRoom } from "../../services/firebase";

export default function CreateRoomModal({ onClose }) {
  const [formData, setFormData] = useState({
    language: "",
    level: "",
    topic: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);

  const languages = [
    "English", "Spanish", "French", "German", "Italian", 
    "Portuguese", "Japanese", "Korean", "Chinese", "Arabic",
    "Russian", "Hindi", "Turkish", "Dutch", "Swedish"
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "Native"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.language || !formData.level || !formData.topic) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const roomId = await createRoom(formData);
      console.log("✅ Room created:", roomId);
      alert("Room created successfully!");
      onClose();
      // Aquí podrías redirigir a la sala: navigate(`/room/${roomId}`)
    } catch (error) {
      console.error("❌ Error creating room:", error);
      alert("Error creating room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#14181d] border border-[#2A2E33] rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2E33]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E0C3A4]/10 rounded-lg">
              <Globe className="w-5 h-5 text-[#E0C3A4]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create New Room</h2>
              <p className="text-xs text-gray-400">Set up your practice session</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2A2E33] rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Language Select */}
          <div>
            <label className="block text-sm font-medium text-[#E0C3A4] mb-2">
              <Globe className="w-4 h-4 inline mr-1" />
              Language *
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              className="w-full bg-[#1c232b] border border-[#2A2E33] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E0C3A4] focus:ring-2 focus:ring-[#E0C3A4]/20 transition"
            >
              <option value="">Select a language</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Level Select */}
          <div>
            <label className="block text-sm font-medium text-[#E0C3A4] mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Level *
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full bg-[#1c232b] border border-[#2A2E33] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E0C3A4] focus:ring-2 focus:ring-[#E0C3A4]/20 transition"
            >
              <option value="">Select your level</option>
              {levels.map(level => (
                <option key={level} value={level.toLowerCase()}>{level}</option>
              ))}
            </select>
          </div>

          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium text-[#E0C3A4] mb-2">
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Topic *
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="e.g., Travel, Movies, Daily Life..."
              required
              maxLength={50}
              className="w-full bg-[#1c232b] border border-[#2A2E33] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#E0C3A4] focus:ring-2 focus:ring-[#E0C3A4]/20 transition"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-medium text-[#E0C3A4] mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add more details about what you'd like to discuss..."
              rows={3}
              maxLength={200}
              className="w-full bg-[#1c232b] border border-[#2A2E33] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#E0C3A4] focus:ring-2 focus:ring-[#E0C3A4]/20 transition resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/200 characters
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-[#2A2E33] text-gray-300 font-medium hover:bg-[#2A2E33] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#E0C3A4] text-[#1b1f23] font-semibold hover:bg-[#d5b78f] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}